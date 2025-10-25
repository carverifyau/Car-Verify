import puppeteer from 'puppeteer';

export interface CarHistoryData {
  success: boolean;
  make?: string;
  model?: string;
  year?: number;
  vin?: string;
  bodyType?: string;
  colour?: string;
  registrationStatus?: string;
  error?: string;
}

export interface CarHistoryRequest {
  rego: string;
  state: string;
}

class CarHistoryService {
  private baseUrl = 'https://www.carhistory.com.au';

  async lookupVehicle(request: CarHistoryRequest): Promise<CarHistoryData> {
    console.log(`🚗 CarHistory lookup for: ${request.rego} (${request.state})`);

    let browser;
    try {
      // Launch browser with options for server environment
      browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ]
      });

      const page = await browser.newPage();

      // Set user agent to avoid detection
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

      // Navigate to CarHistory
      console.log('🌐 Navigating to CarHistory website...');
      await page.goto(this.baseUrl, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Wait for page to load
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Take screenshot for debugging
      await page.screenshot({ path: 'carhistory-debug.png', fullPage: true });

      // Find and fill the registration input
      console.log(`📝 Entering registration: ${request.rego}`);

      // Look for registration input field - try multiple approaches
      const regoSelectors = [
        'input[placeholder*="Registration"]',
        'input[placeholder*="registration"]',
        'input[placeholder*="rego"]',
        'input[name*="registration"]',
        'input[name*="rego"]',
        'input[id*="registration"]',
        'input[id*="rego"]'
      ];

      let inputFound = false;

      // Try specific selectors first
      for (const selector of regoSelectors) {
        try {
          const input = await page.$(selector);
          if (input) {
            await input.click({ clickCount: 3 }); // Select all
            await input.type(request.rego.toUpperCase());
            inputFound = true;
            console.log(`✅ Found registration input with selector: ${selector}`);
            break;
          }
        } catch (error) {
          continue;
        }
      }

      // If no specific selector worked, try all text inputs and pick the right one
      if (!inputFound) {
        const textInputs = await page.$$('input[type="text"]');
        console.log(`🔍 Found ${textInputs.length} text inputs, trying each one`);

        for (let i = 0; i < textInputs.length; i++) {
          try {
            const input = textInputs[i];
            const placeholder = await page.evaluate(el => el.placeholder || '', input);
            const name = await page.evaluate(el => el.name || '', input);
            const id = await page.evaluate(el => el.id || '', input);

            console.log(`🔍 Input ${i}: placeholder="${placeholder}", name="${name}", id="${id}"`);

            // Skip inputs that look like they're for other purposes
            if (placeholder.toLowerCase().includes('email') ||
                placeholder.toLowerCase().includes('phone') ||
                name.toLowerCase().includes('email')) {
              continue;
            }

            // Try this input if it looks promising or if it's one of the last options
            if (placeholder.toLowerCase().includes('registration') ||
                placeholder.toLowerCase().includes('rego') ||
                name.toLowerCase().includes('registration') ||
                name.toLowerCase().includes('rego') ||
                i >= textInputs.length - 2) { // Try last 2 inputs as fallback

              await input.click({ clickCount: 3 }); // Select all
              await input.type(request.rego.toUpperCase());
              inputFound = true;
              console.log(`✅ Used input ${i} for registration (${placeholder || name || id})`);
              break;
            }
          } catch (error) {
            console.log(`❌ Failed with input ${i}:`, error.message);
            continue;
          }
        }
      }

      if (!inputFound) {
        throw new Error('Could not find registration input field');
      }

      // Find and select state dropdown
      console.log(`📍 Selecting state: ${request.state}`);

      const stateSelectors = [
        'select[name*="state"]',
        'select[id*="state"]',
        'select'
      ];

      let stateSelected = false;
      for (const selector of stateSelectors) {
        try {
          const dropdown = await page.$(selector);
          if (dropdown) {
            // Check what options are available
            const options = await page.$$eval(`${selector} option`, opts =>
              opts.map(opt => ({ value: opt.value, text: opt.textContent?.trim() }))
            );
            console.log(`🔍 Found dropdown options:`, options);

            // Try to select the state
            try {
              await dropdown.select(request.state.toUpperCase());
              stateSelected = true;
              console.log(`✅ Selected state by value: ${request.state.toUpperCase()}`);
              break;
            } catch (error) {
              // Try other variations
              const stateVariations = [
                request.state.toLowerCase(),
                request.state,
                request.state.charAt(0).toUpperCase() + request.state.slice(1).toLowerCase()
              ];

              for (const variation of stateVariations) {
                try {
                  await dropdown.select(variation);
                  stateSelected = true;
                  console.log(`✅ Selected state by value: ${variation}`);
                  break;
                } catch (e) {
                  continue;
                }
              }

              if (!stateSelected) {
                console.log(`❌ Could not select state with selector: ${selector}`);
              }
            }

            if (stateSelected) break;
          }
        } catch (error) {
          console.log(`❌ Error with selector ${selector}:`, error.message);
          continue;
        }
      }

      if (!stateSelected) {
        console.log('⚠️ Could not select state, proceeding anyway...');
      }

      // Find and click submit button
      console.log('🔍 Looking for submit button...');

      const submitSelectors = [
        'button[type="submit"]',
        'input[type="submit"]',
        '.btn-primary',
        'button'
      ];

      let submitClicked = false;
      for (const selector of submitSelectors) {
        try {
          const elements = await page.$$(selector.replace(':contains', ''));
          for (const element of elements) {
            const text = await page.evaluate(el => el.textContent || el.value || '', element);
            if (text && (text.toLowerCase().includes('search') ||
                        text.toLowerCase().includes('check') ||
                        text.toLowerCase().includes('report') ||
                        text.toLowerCase().includes('get'))) {
              await element.click();
              submitClicked = true;
              console.log(`✅ Clicked submit button: "${text}"`);
              break;
            }
          }
          if (submitClicked) break;
        } catch (error) {
          continue;
        }
      }

      if (!submitClicked) {
        // Try first submit button as fallback
        const submitButtons = await page.$$('button[type="submit"], input[type="submit"]');
        if (submitButtons.length > 0) {
          await submitButtons[0].click();
          submitClicked = true;
          console.log('✅ Clicked first submit button');
        }
      }

      if (!submitClicked) {
        throw new Error('Could not find submit button');
      }

      // Wait for results page to load (CarHistory takes time to process)
      console.log('⏳ Waiting for CarHistory to complete search...');

      // Wait for the "Searching" overlay to disappear and results to appear
      try {
        // Wait for the search to complete (up to 30 seconds)
        await page.waitForFunction(() => {
          const searchingText = document.body.textContent || '';
          return !searchingText.includes('Searching');
        }, { timeout: 30000 });

        console.log('✅ Search completed, results should be available');

        // Wait a bit more for content to fully render
        await new Promise(resolve => setTimeout(resolve, 3000));

      } catch (error) {
        console.log('⚠️ Timeout waiting for search to complete, proceeding anyway...');
        // Continue anyway in case the search completed but we couldn't detect it
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Take screenshot of results
      await page.screenshot({ path: 'carhistory-results.png', fullPage: true });

      // Check if we're on an error page or results page
      const pageContent = await page.content();
      console.log('📄 Current page URL:', page.url());

      // Look for common error indicators
      if (pageContent.includes('error') || pageContent.includes('not found') || pageContent.includes('invalid')) {
        console.log('⚠️ Detected potential error page');
      }

      // Extract vehicle data with comprehensive debugging
      const vehicleData = await page.evaluate(() => {
        console.log('🔍 Starting data extraction on CarHistory results page');

        // First, let's see what we're working with
        const pageText = document.body.textContent || '';
        const pageHTML = document.body.innerHTML;

        console.log('📄 Page text preview:', pageText.substring(0, 500));
        console.log('🏷️ Page HTML preview:', pageHTML.substring(0, 800));

        // Look for all text content that might contain vehicle info
        const allElements = Array.from(document.querySelectorAll('*'));
        const vehicleKeywords = ['make', 'model', 'year', 'vin', 'body', 'colour', 'color', 'registration', 'rego'];

        console.log('🔎 Scanning for vehicle-related elements...');
        const relevantElements = [];

        allElements.forEach(element => {
          const text = element.textContent?.toLowerCase().trim() || '';
          const tagName = element.tagName.toLowerCase();

          // Look for elements containing vehicle keywords
          for (const keyword of vehicleKeywords) {
            if (text.includes(keyword) && text.length < 200 && text.length > 0) {
              relevantElements.push({
                tagName,
                className: element.className,
                id: element.id,
                text: element.textContent?.trim(),
                innerHTML: element.innerHTML,
                parent: element.parentElement?.tagName,
                siblings: Array.from(element.parentElement?.children || []).map(child => child.textContent?.trim())
              });
              break;
            }
          }
        });

        console.log('🎯 Found relevant elements:', relevantElements);

        // Try different extraction strategies
        const extractionResults = {
          strategy1: {},
          strategy2: {},
          strategy3: {}
        };

        // Strategy 1: Look for colon-separated values
        console.log('📋 Strategy 1: Colon-separated values');
        const lines = pageText.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        for (const line of lines) {
          if (line.includes(':')) {
            const [key, value] = line.split(':').map(s => s.trim());
            const keyLower = key.toLowerCase();

            if (keyLower.includes('make') && value) extractionResults.strategy1.make = value;
            if (keyLower.includes('model') && value) extractionResults.strategy1.model = value;
            if (keyLower.includes('year') && value) extractionResults.strategy1.year = value;
            if (keyLower.includes('vin') && value) extractionResults.strategy1.vin = value;
            if (keyLower.includes('body') && value) extractionResults.strategy1.bodyType = value;
            if ((keyLower.includes('colour') || keyLower.includes('color')) && value) extractionResults.strategy1.colour = value;
            if ((keyLower.includes('registration') || keyLower.includes('rego')) && value) extractionResults.strategy1.registration = value;
          }
        }

        // Strategy 2: Look for table-like structures
        console.log('📊 Strategy 2: Table structures');
        const tables = document.querySelectorAll('table, .table, [class*="table"]');
        tables.forEach(table => {
          const rows = table.querySelectorAll('tr, .row, [class*="row"]');
          rows.forEach(row => {
            const cells = Array.from(row.querySelectorAll('td, th, .cell, .col, [class*="col"]'));
            if (cells.length >= 2) {
              const label = cells[0].textContent?.toLowerCase().trim() || '';
              const value = cells[1].textContent?.trim() || '';

              if (label.includes('make') && value) extractionResults.strategy2.make = value;
              if (label.includes('model') && value) extractionResults.strategy2.model = value;
              if (label.includes('year') && value) extractionResults.strategy2.year = value;
              if (label.includes('vin') && value) extractionResults.strategy2.vin = value;
              if (label.includes('body') && value) extractionResults.strategy2.bodyType = value;
              if ((label.includes('colour') || label.includes('color')) && value) extractionResults.strategy2.colour = value;
              if ((label.includes('registration') || label.includes('rego')) && value) extractionResults.strategy2.registration = value;
            }
          });
        });

        // Strategy 3: Look for div/span pairs or label/value structures
        console.log('🏗️ Strategy 3: Label-value pairs');
        for (const element of relevantElements) {
          const text = element.text?.toLowerCase() || '';
          const siblings = element.siblings || [];

          // Find the value in siblings
          const valueElement = siblings.find(sibling =>
            sibling &&
            sibling.toLowerCase() !== text &&
            sibling.length > 0 &&
            sibling.length < 100
          );

          if (valueElement) {
            if (text.includes('make')) extractionResults.strategy3.make = valueElement;
            if (text.includes('model')) extractionResults.strategy3.model = valueElement;
            if (text.includes('year')) extractionResults.strategy3.year = valueElement;
            if (text.includes('vin')) extractionResults.strategy3.vin = valueElement;
            if (text.includes('body')) extractionResults.strategy3.bodyType = valueElement;
            if (text.includes('colour') || text.includes('color')) extractionResults.strategy3.colour = valueElement;
            if (text.includes('registration') || text.includes('rego')) extractionResults.strategy3.registration = valueElement;
          }
        }

        console.log('📈 Extraction results:', extractionResults);

        // Combine best results from all strategies
        const finalData = {
          make: extractionResults.strategy1.make || extractionResults.strategy2.make || extractionResults.strategy3.make || '',
          model: extractionResults.strategy1.model || extractionResults.strategy2.model || extractionResults.strategy3.model || '',
          year: extractionResults.strategy1.year || extractionResults.strategy2.year || extractionResults.strategy3.year || '',
          vin: extractionResults.strategy1.vin || extractionResults.strategy2.vin || extractionResults.strategy3.vin || '',
          bodyType: extractionResults.strategy1.bodyType || extractionResults.strategy2.bodyType || extractionResults.strategy3.bodyType || '',
          colour: extractionResults.strategy1.colour || extractionResults.strategy2.colour || extractionResults.strategy3.colour || '',
          registration: extractionResults.strategy1.registration || extractionResults.strategy2.registration || extractionResults.strategy3.registration || '',
          debugInfo: {
            relevantElementsCount: relevantElements.length,
            pageTextLength: pageText.length,
            extractionResults,
            pageUrl: window.location.href
          },
          pageContent: pageHTML.substring(0, 2000),
          fullText: pageText.substring(0, 4000)
        };

        console.log('✅ Final extracted data:', finalData);

        return {
          ...finalData,
          year: finalData.year ? parseInt(finalData.year.replace(/[^\d]/g, '')) : undefined
        };
      });

      console.log('📊 Extracted vehicle data:', vehicleData);

      // Check if we got an error
      if (vehicleData.errorMessage) {
        return {
          success: false,
          error: vehicleData.errorMessage
        };
      }

      // Check if we got valid vehicle data
      if (vehicleData.make || vehicleData.model || vehicleData.vin) {
        return {
          success: true,
          make: vehicleData.make || undefined,
          model: vehicleData.model || undefined,
          year: vehicleData.year || undefined,
          vin: vehicleData.vin || undefined,
          bodyType: vehicleData.bodyType || undefined,
          colour: vehicleData.colour || undefined,
          registrationStatus: 'Active' // Assume active if found
        };
      }

      // If no data found, return unsuccessful result
      return {
        success: false,
        error: 'No vehicle data found for this registration'
      };

    } catch (error) {
      console.error('CarHistory Service error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  // Test method for debugging
  async testConnection(): Promise<boolean> {
    try {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(this.baseUrl, { timeout: 10000 });
      const title = await page.title();
      await browser.close();
      console.log('✅ CarHistory Service connection test successful. Page title:', title);
      return true;
    } catch (error) {
      console.error('❌ CarHistory Service connection test failed:', error);
      return false;
    }
  }
}

export const carHistoryService = new CarHistoryService();
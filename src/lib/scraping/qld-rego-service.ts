import puppeteer from 'puppeteer';

export interface QldRegoData {
  success: boolean;
  registrationNumber?: string;
  make?: string;
  model?: string;
  bodyType?: string;
  year?: number;
  registrationStatus?: string;
  registrationExpiry?: string;
  inspectionDue?: string;
  error?: string;
}

export interface QldRegoRequest {
  rego: string;
}

class QldRegoService {
  private baseUrl = 'https://www.service.transport.qld.gov.au/checkrego/public/Welcome.xhtml';

  async lookupVehicle(request: QldRegoRequest): Promise<QldRegoData> {
    console.log(`🔍 QLD Rego lookup for: ${request.rego}`);

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

      // Navigate to the QLD rego check page
      console.log('🌐 Navigating to QLD Transport website...');
      await page.goto(this.baseUrl, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // Wait for the page to fully load
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('📄 Step 1: On about page, looking for Continue button');

      // Click the Continue button to proceed to the actual form
      const continueSelectors = [
        'button[type="submit"]',
        'input[type="submit"]',
        'button.btn',
        '.btn-primary',
        'a[href*="continue"]',
        'button',
        'input[value*="Continue"]'
      ];

      let continueClicked = false;
      for (const selector of continueSelectors) {
        try {
          const elements = await page.$$(selector);
          for (const element of elements) {
            const text = await page.evaluate(el => el.textContent || el.value || '', element);
            if (text && text.toLowerCase().includes('continue')) {
              await element.click();
              continueClicked = true;
              console.log(`✅ Clicked Continue button: "${text}"`);
              break;
            }
          }
          if (continueClicked) break;
        } catch (error) {
          continue;
        }
      }

      if (!continueClicked) {
        throw new Error('Could not find Continue button on about page');
      }

      // Wait for navigation to next step
      await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 });
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('📄 Step 2: Checking current page');
      await page.screenshot({ path: 'qld-step2.png', fullPage: true });

      const pageTitle = await page.title();
      console.log('📄 Page title:', pageTitle);

      // Check if we're on Terms of Use page (Step 2 of 5)
      const pageText = await page.evaluate(() => document.body.textContent || '');
      if (pageText.includes('Agree to terms of use') || pageText.includes('Step 2 of 5')) {
        console.log('📄 Step 2: On Terms of Use page, looking for Accept button');

        // Find and click Accept button
        const acceptSelectors = [
          'button:contains("Accept")',
          'input[value="Accept"]',
          'button[type="submit"]',
          '.btn',
          'button'
        ];

        let acceptClicked = false;
        for (const selector of acceptSelectors) {
          try {
            const elements = await page.$$(selector.replace(':contains("Accept")', ''));
            for (const element of elements) {
              const text = await page.evaluate(el => el.textContent || el.value || '', element);
              if (text && text.toLowerCase().includes('accept')) {
                await element.click();
                acceptClicked = true;
                console.log(`✅ Clicked Accept button: "${text}"`);
                break;
              }
            }
            if (acceptClicked) break;
          } catch (error) {
            continue;
          }
        }

        if (!acceptClicked) {
          throw new Error('Could not find Accept button on terms page');
        }

        // Wait for navigation to actual registration form
        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 });
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      console.log('📄 Step 3: On registration form page');
      await page.screenshot({ path: 'qld-form.png', fullPage: true });

      const formTitle = await page.title();
      console.log('📄 Form page title:', formTitle);

      // Find and fill the registration input
      console.log(`📝 Entering registration: ${request.rego}`);

      // Add debug logging for all inputs on the page
      const allInputs = await page.$$eval('input', inputs =>
        inputs.map(input => ({
          type: input.type,
          id: input.id || '',
          name: input.name || '',
          placeholder: input.placeholder || '',
          className: input.className || '',
          value: input.value || ''
        }))
      );
      console.log('🔍 All inputs found:', JSON.stringify(allInputs, null, 2));

      // Try to find the registration number input specifically
      // Based on the screenshot, it should be the first text input
      let inputFound = false;

      // Strategy 1: Look for registration-specific attributes
      const registrationSelectors = [
        'input[placeholder*="Enter without dashes"]',
        'input[placeholder*="example, 123"]',
        'input[placeholder*="registration"]',
        'input[name*="registration"]',
        'input[id*="registration"]',
        'input[name*="rego"]',
        'input[id*="rego"]'
      ];

      for (const selector of registrationSelectors) {
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
          console.log(`❌ Failed with selector ${selector}:`, error.message);
        }
      }

      // Strategy 2: If no specific selector worked, try the first text input
      if (!inputFound) {
        try {
          const textInputs = await page.$$('input[type="text"]');
          console.log(`🔍 Found ${textInputs.length} text inputs`);

          if (textInputs.length > 0) {
            // Try the first text input (should be registration number)
            await textInputs[0].click({ clickCount: 3 }); // Select all
            await textInputs[0].type(request.rego.toUpperCase());
            inputFound = true;
            console.log('✅ Used first text input for registration');
          }
        } catch (error) {
          console.log('❌ Failed to use first text input:', error.message);
        }
      }

      // Strategy 3: If still no input found, try a more general approach
      if (!inputFound) {
        try {
          const allInputsElements = await page.$$('input');
          console.log(`🔍 Found ${allInputsElements.length} total inputs`);

          for (let i = 0; i < allInputsElements.length; i++) {
            const input = allInputsElements[i];
            const inputType = await page.evaluate(el => el.type, input);

            if (inputType === 'text') {
              await input.click({ clickCount: 3 });
              await input.type(request.rego.toUpperCase());
              inputFound = true;
              console.log(`✅ Used input at index ${i} for registration`);
              break;
            }
          }
        } catch (error) {
          console.log('❌ Failed with general approach:', error.message);
        }
      }

      if (!inputFound) {
        throw new Error('Could not find registration input field');
      }

      // Find and click the Search button
      console.log('🔍 Looking for Search button...');

      // Add debug logging for all buttons
      const allButtons = await page.$$eval('button, input[type="submit"], input[type="button"]', buttons =>
        buttons.map(button => ({
          tagName: button.tagName,
          type: button.type || '',
          id: button.id || '',
          name: button.name || '',
          className: button.className || '',
          textContent: button.textContent?.trim() || '',
          value: button.value || ''
        }))
      );
      console.log('🔍 All buttons found:', JSON.stringify(allButtons, null, 2));

      let submitClicked = false;

      // Strategy 1: Look for Search button specifically
      const searchSelectors = [
        'button:contains("Search")',
        'input[value="Search"]',
        'button[type="submit"]',
        'input[type="submit"]'
      ];

      for (const selector of searchSelectors) {
        try {
          const elements = await page.$$(selector.replace(':contains("Search")', ''));
          for (const element of elements) {
            const text = await page.evaluate(el => el.textContent || el.value || '', element);
            if (text && text.toLowerCase().includes('search')) {
              await element.click();
              submitClicked = true;
              console.log(`✅ Clicked Search button: "${text}"`);
              break;
            }
          }
          if (submitClicked) break;
        } catch (error) {
          console.log(`❌ Failed with selector ${selector}:`, error.message);
        }
      }

      // Strategy 2: Try any submit button
      if (!submitClicked) {
        try {
          const submitButtons = await page.$$('button[type="submit"], input[type="submit"]');
          console.log(`🔍 Found ${submitButtons.length} submit buttons`);

          if (submitButtons.length > 0) {
            await submitButtons[0].click();
            submitClicked = true;
            console.log('✅ Clicked first submit button');
          }
        } catch (error) {
          console.log('❌ Failed to click submit button:', error.message);
        }
      }

      // Strategy 3: Try any button that looks like it submits
      if (!submitClicked) {
        try {
          const allButtonElements = await page.$$('button');
          console.log(`🔍 Found ${allButtonElements.length} total buttons`);

          for (let i = 0; i < allButtonElements.length; i++) {
            const button = allButtonElements[i];
            const text = await page.evaluate(el => el.textContent || '', button);

            if (text && (text.toLowerCase().includes('search') ||
                        text.toLowerCase().includes('submit') ||
                        text.toLowerCase().includes('check'))) {
              await button.click();
              submitClicked = true;
              console.log(`✅ Clicked button at index ${i}: "${text}"`);
              break;
            }
          }
        } catch (error) {
          console.log('❌ Failed with general button approach:', error.message);
        }
      }

      if (!submitClicked) {
        throw new Error('Could not find submit button');
      }

      // Wait for results
      console.log('⏳ Waiting for results...');
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Try to extract vehicle data from results
      const vehicleData = await page.evaluate(() => {
        // Common patterns for extracting vehicle information
        const getText = (selectors: string[]) => {
          for (const selector of selectors) {
            const element = document.querySelector(selector);
            if (element) {
              return element.textContent?.trim() || '';
            }
          }
          return '';
        };

        // Look for vehicle details in various possible locations
        const make = getText([
          '[id*="make"]',
          '[class*="make"]',
          'td:contains("Make") + td',
          'span:contains("Make") + span'
        ]);

        const model = getText([
          '[id*="model"]',
          '[class*="model"]',
          'td:contains("Model") + td',
          'span:contains("Model") + span'
        ]);

        const bodyType = getText([
          '[id*="body"]',
          '[class*="body"]',
          'td:contains("Body") + td',
          'span:contains("Body") + span'
        ]);

        const year = getText([
          '[id*="year"]',
          '[class*="year"]',
          'td:contains("Year") + td',
          'span:contains("Year") + span'
        ]);

        const status = getText([
          '[id*="status"]',
          '[class*="status"]',
          'td:contains("Status") + td',
          'span:contains("Status") + span'
        ]);

        const expiry = getText([
          '[id*="expiry"]',
          '[class*="expiry"]',
          'td:contains("Expiry") + td',
          'span:contains("Expiry") + span'
        ]);

        // Check for error messages
        const errorSelectors = [
          '[class*="error"]',
          '[id*="error"]',
          '[class*="warning"]',
          '.ui-messages-error',
          '.alert-danger'
        ];

        let errorMessage = '';
        for (const selector of errorSelectors) {
          const errorElement = document.querySelector(selector);
          if (errorElement && errorElement.textContent) {
            errorMessage = errorElement.textContent.trim();
            break;
          }
        }

        return {
          make,
          model,
          bodyType,
          year: year ? parseInt(year) : undefined,
          status,
          expiry,
          errorMessage,
          pageContent: document.body.innerHTML.substring(0, 1000) // Debug info
        };
      });

      console.log('📊 Extracted data:', vehicleData);

      // Check if we got an error
      if (vehicleData.errorMessage) {
        return {
          success: false,
          error: vehicleData.errorMessage
        };
      }

      // Check if we got valid vehicle data
      if (vehicleData.make || vehicleData.model) {
        return {
          success: true,
          registrationNumber: request.rego.toUpperCase(),
          make: vehicleData.make || undefined,
          model: vehicleData.model || undefined,
          bodyType: vehicleData.bodyType || undefined,
          year: vehicleData.year || undefined,
          registrationStatus: vehicleData.status || undefined,
          registrationExpiry: vehicleData.expiry || undefined
        };
      }

      // If no data found, return unsuccessful result
      return {
        success: false,
        error: 'No vehicle data found for this registration'
      };

    } catch (error) {
      console.error('QLD Rego Service error:', error);
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
      console.log('✅ QLD Rego Service connection test successful. Page title:', title);
      return true;
    } catch (error) {
      console.error('❌ QLD Rego Service connection test failed:', error);
      return false;
    }
  }
}

export const qldRegoService = new QldRegoService();
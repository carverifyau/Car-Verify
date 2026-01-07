import axios from 'axios';

export interface CarsalesListing {
  title?: string;
  price?: string;
  year?: string;
  make?: string;
  model?: string;
  odometer?: string;
  bodyType?: string;
  transmission?: string;
  fuelType?: string;
  engineSize?: string;
  colour?: string;
  location?: string;
  seller?: string;
  description?: string;
  features?: string[];
  images?: string[];
}

export interface ScrappeyResponse {
  solution: {
    verified: boolean;
    currentUrl: string;
    statusCode: number;
    innerText: string;
    response: string;
    cookies: any[];
  };
  session: string;
  timeElapsed: number;
  data: string;
}

export interface MarketDataResult {
  success: boolean;
  retailValue?: string;
  privateValue?: string;
  tradeValue?: string;
  averagePrice?: string;
  listingsFound?: number;
  prices?: number[];
  error?: string;
}

class ScrappeyCarSalesService {
  private apiKey: string;
  private baseUrl = 'https://publisher.scrappey.com/api/v1';

  constructor() {
    this.apiKey = process.env.SCRAPPEY_API_KEY || '';
    if (!this.apiKey) {
      console.warn('⚠️ SCRAPPEY_API_KEY not found in environment variables');
    }
  }

  /**
   * Scrape a specific Carsales listing URL
   */
  async scrapeListing(carsalesUrl: string): Promise<CarsalesListing & { success: boolean; error?: string }> {
    console.log(`🔍 Scrappey: Scraping Carsales listing: ${carsalesUrl}`);

    if (!this.apiKey) {
      return {
        success: false,
        error: 'Scrappey API key not configured'
      };
    }

    try {
      const response = await axios.post<ScrappeyResponse>(
        `${this.baseUrl}?key=${this.apiKey}`,
        {
          cmd: 'request.get',
          url: carsalesUrl,
          datadomeBypass: true, // Bypass Datadome protection on Carsales
          browserActions: [
            {
              type: 'wait',
              wait: 3
            }
          ]
        },
        {
          timeout: 60000 // 60 second timeout
        }
      );

      console.log('✅ Scrappey response received');
      console.log(`📊 Status: ${response.data.solution.statusCode}`);
      console.log(`⏱️ Time elapsed: ${response.data.timeElapsed}ms`);

      if (!response.data.solution.verified) {
        return {
          success: false,
          error: 'Scrappey failed to verify the response'
        };
      }

      // Extract data from the response HTML
      const htmlContent = response.data.solution.response;
      const textContent = response.data.solution.innerText;

      // Parse listing data
      const listingData = this.parseListingData(htmlContent, textContent);

      return {
        success: true,
        ...listingData
      };

    } catch (error) {
      console.error('❌ Scrappey error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get market data by searching Google for Carsales listings
   * This avoids Carsales' anti-bot protection by scraping Google instead
   */
  async getMarketData(make: string, model: string, year: string): Promise<MarketDataResult> {
    console.log(`📊 Scrappey: Getting market data for ${year} ${make} ${model}`);

    if (!this.apiKey) {
      return {
        success: false,
        error: 'Scrappey API key not configured'
      };
    }

    try {
      // Search Google for Carsales listings instead of scraping Carsales directly
      const searchQuery = `site:carsales.com.au ${year} ${make} ${model}`;
      const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}&num=20`;

      console.log(`🔍 Searching Google: ${searchQuery}`);

      const requestBody = {
        cmd: 'request.get',
        url: googleUrl,
        browserActions: [
          {
            type: 'wait',
            wait: 3
          }
        ]
      };

      const response = await axios.post<ScrappeyResponse>(
        `${this.baseUrl}?key=${this.apiKey}`,
        requestBody,
        {
          timeout: 30000
        }
      );

      console.log('✅ Scrappey response received');

      if (!response.data?.solution?.verified) {
        console.log('❌ Response not verified');
        return this.generateEstimatedValues(make, year);
      }

      // Extract prices from Google search results
      const textContent = response.data.solution.innerText;
      console.log('📄 Google results preview:', textContent.substring(0, 300));
      const prices = this.extractPrices(textContent);

      console.log(`💰 Found ${prices.length} prices from Google results:`, prices.slice(0, 10));

      if (prices.length < 3) {
        // Not enough data from Google, use estimation
        return this.generateEstimatedValues(make, year);
      }

      // Calculate market values from actual prices
      const sortedPrices = prices.sort((a, b) => a - b);
      const average = Math.round(sortedPrices.reduce((a, b) => a + b, 0) / sortedPrices.length);
      const median = sortedPrices[Math.floor(sortedPrices.length / 2)];

      const retailValue = Math.round(sortedPrices[Math.floor(sortedPrices.length * 0.75)]); // 75th percentile
      const privateValue = median;
      const tradeValue = Math.round(sortedPrices[Math.floor(sortedPrices.length * 0.25)]); // 25th percentile

      return {
        success: true,
        retailValue: `$${retailValue.toLocaleString()}`,
        privateValue: `$${privateValue.toLocaleString()}`,
        tradeValue: `$${tradeValue.toLocaleString()}`,
        averagePrice: `$${average.toLocaleString()}`,
        listingsFound: prices.length,
        prices: sortedPrices
      };

    } catch (error) {
      console.error('❌ Scrappey market data error:', error);
      return this.generateEstimatedValues(make, year);
    }
  }

  /**
   * Extract prices from Carsales page text
   */
  private extractPrices(text: string): number[] {
    const prices: number[] = [];
    const foundPrices = new Set<number>();

    // Match Australian dollar prices: $XX,XXX or $XXX,XXX
    const patterns = [
      /\$(\d{1,3}(?:,\d{3})+)/g,  // $XX,XXX format
      /\$(\d{5,6})/g,              // $XXXXX format
    ];

    for (const pattern of patterns) {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        const priceStr = match[1].replace(/,/g, '');
        const price = parseInt(priceStr);

        // Car price range: $5k - $500k
        if (price >= 5000 && price <= 500000) {
          foundPrices.add(price);
        }
      }
    }

    return Array.from(foundPrices).sort((a, b) => a - b);
  }

  /**
   * Parse listing data from HTML content
   */
  private parseListingData(html: string, text: string): CarsalesListing {
    // This is a basic parser - you may need to adjust based on actual HTML structure
    const data: CarsalesListing = {};

    // Extract price
    const priceMatch = text.match(/\$(\d{1,3}(?:,\d{3})+)/);
    if (priceMatch) {
      data.price = priceMatch[0];
    }

    // Extract odometer
    const odoMatch = text.match(/([\d,]+)\s*km/i);
    if (odoMatch) {
      data.odometer = `${odoMatch[1]} km`;
    }

    // Extract year (4 digits)
    const yearMatch = text.match(/\b(19|20)\d{2}\b/);
    if (yearMatch) {
      data.year = yearMatch[0];
    }

    // Extract transmission
    if (text.toLowerCase().includes('automatic')) {
      data.transmission = 'Automatic';
    } else if (text.toLowerCase().includes('manual')) {
      data.transmission = 'Manual';
    }

    // Extract fuel type
    const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'LPG'];
    for (const fuel of fuelTypes) {
      if (text.toLowerCase().includes(fuel.toLowerCase())) {
        data.fuelType = fuel;
        break;
      }
    }

    return data;
  }

  /**
   * Generate estimated market values based on vehicle depreciation
   */
  private generateEstimatedValues(make: string, year: string): MarketDataResult {
    console.log('📈 Generating estimated values (no listings found)');

    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - parseInt(year);

    // Brand multipliers and base values (luxury brands start higher and hold value better)
    const brandData: Record<string, { base: number, multiplier: number }> = {
      'porsche': { base: 140000, multiplier: 0.94 }, // Sports cars depreciate slower and hold value well
      'ferrari': { base: 300000, multiplier: 0.95 },
      'lamborghini': { base: 350000, multiplier: 0.94 },
      'bmw': { base: 80000, multiplier: 0.87 },
      'mercedes': { base: 85000, multiplier: 0.87 },
      'mercedes-benz': { base: 85000, multiplier: 0.87 },
      'audi': { base: 75000, multiplier: 0.88 },
      'lexus': { base: 70000, multiplier: 0.90 }, // Holds value well
      'toyota': { base: 45000, multiplier: 0.88 },
      'land rover': { base: 90000, multiplier: 0.82 },
      'range rover': { base: 120000, multiplier: 0.82 },
      'jaguar': { base: 80000, multiplier: 0.83 },
      'mazda': { base: 40000, multiplier: 0.85 },
      'honda': { base: 42000, multiplier: 0.87 },
      'ford': { base: 55000, multiplier: 0.88 }, // Rangers and popular models hold value well
      'holden': { base: 38000, multiplier: 0.80 },
      'hyundai': { base: 38000, multiplier: 0.84 },
      'kia': { base: 36000, multiplier: 0.84 },
      'nissan': { base: 42000, multiplier: 0.84 },
      'volkswagen': { base: 48000, multiplier: 0.86 },
      'subaru': { base: 45000, multiplier: 0.87 },
    };

    const makeLower = make.toLowerCase();
    const brand = brandData[makeLower] || { base: 50000, multiplier: 0.85 };

    // Calculate value with compound depreciation
    let baseValue = brand.base;
    for (let i = 0; i < vehicleAge; i++) {
      baseValue *= brand.multiplier; // Annual retention rate
    }

    // Ensure minimum values based on age
    const minValue = vehicleAge > 15 ? 5000 : 10000;
    baseValue = Math.max(baseValue, minValue);

    const estimatedPrivate = Math.round(baseValue);
    const estimatedRetail = Math.round(baseValue * 1.15);
    const estimatedTrade = Math.round(baseValue * 0.85);

    return {
      success: true,
      retailValue: `$${estimatedRetail.toLocaleString()}`,
      privateValue: `$${estimatedPrivate.toLocaleString()}`,
      tradeValue: `$${estimatedTrade.toLocaleString()}`,
      averagePrice: `$${estimatedPrivate.toLocaleString()}`,
      listingsFound: 0,
      prices: []
    };
  }

  /**
   * Test the Scrappey connection
   */
  async testConnection(): Promise<boolean> {
    if (!this.apiKey) {
      console.error('❌ No Scrappey API key configured');
      return false;
    }

    try {
      console.log('🔍 Testing Scrappey connection...');
      const response = await axios.post(
        `${this.baseUrl}?key=${this.apiKey}`,
        {
          cmd: 'request.get',
          url: 'https://httpbin.org/get'
        },
        {
          timeout: 30000
        }
      );

      const success = response.data.solution?.verified === true;
      console.log(success ? '✅ Scrappey connection test successful' : '❌ Scrappey connection test failed');
      return success;
    } catch (error) {
      console.error('❌ Scrappey connection test failed:', error);
      return false;
    }
  }
}

export const scrappeyCarSalesService = new ScrappeyCarSalesService();

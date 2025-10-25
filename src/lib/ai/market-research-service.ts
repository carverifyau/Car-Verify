import OpenAI from 'openai';

export interface VehicleMarketData {
  privateValue: number;
  tradeValue: number;
  retailValue: number;
  marketTrends: string;
  sellingPoints: string[];
  concerns: string[];
  analysisNotes: string;
}

export interface VehicleDetails {
  make: string;
  model: string;
  year: number;
  odometer?: number;
  condition?: 'Poor' | 'Fair' | 'Good' | 'Very Good' | 'Excellent';
  location?: string;
  engineSize?: string;
  fuelType?: string;
  bodyType?: string;
}

class MarketResearchService {
  private openai: OpenAI | null = null;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
    }
  }

  async generateMarketResearch(vehicle: VehicleDetails): Promise<VehicleMarketData> {
    if (!this.openai) {
      console.log('🤖 No OpenAI API key, using mock market data');
      console.log('🚗 Vehicle data for mock calculation:', vehicle);
      const mockData = this.getMockMarketData(vehicle);
      console.log('💰 Mock data generated:', mockData);
      return mockData;
    }

    try {
      const prompt = this.buildMarketResearchPrompt(vehicle);
      console.log('🔍 Sending prompt to OpenAI:', prompt);

      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an Australian automotive market analyst. Provide accurate, professional market valuations and analysis for vehicles in the Australian market. Return only valid JSON without any markdown formatting."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.1,
        max_tokens: 1000
      });

      const response = completion.choices[0]?.message?.content;
      console.log('🤖 Raw OpenAI response:', response);

      if (!response) {
        throw new Error('No response from OpenAI');
      }

      const marketData = JSON.parse(response);
      console.log('🎯 Parsed market data from OpenAI:', marketData);
      console.log('💰 Values - Private:', marketData.privateValue, 'Trade:', marketData.tradeValue, 'Retail:', marketData.retailValue);
      return marketData;

    } catch (error) {
      console.error('❌ AI market research error:', error);
      console.log('🤖 Falling back to mock market data');
      const mockData = this.getMockMarketData(vehicle);
      console.log('💰 Fallback mock data:', mockData);
      return mockData;
    }
  }

  private buildMarketResearchPrompt(vehicle: VehicleDetails): string {
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - vehicle.year;
    const odometer = vehicle.odometer || 'Unknown';
    const condition = vehicle.condition || 'Good';
    const location = vehicle.location || 'Sydney, NSW';

    return `
You are accessing live Australian automotive market data from Carsales, RedBook, Gumtree, and dealer networks. Provide REAL MARKET VALUES that people actually pay in 2024-2025.

Vehicle: ${vehicle.year} ${vehicle.make} ${vehicle.model}
${vehicle.bodyType ? `Body Type: ${vehicle.bodyType}` : ''}
Age: ${vehicleAge} years | Condition: ${condition} | Location: ${location}

⚠️ CRITICAL: Your values MUST match current Carsales.com.au listings and dealer prices. DO NOT UNDERVALUE.

🎯 REAL AUSTRALIAN MARKET EXAMPLES (use these as minimums):
- 2020+ Toyota Camry: $35,000-$50,000 (popular sedan)
- 2018+ Mazda CX-5: $40,000-$55,000 (popular SUV)
- 2015+ BMW 3 Series: $35,000-$55,000 (premium sedan)
- 2020+ Hyundai i30: $25,000-$35,000 (compact)
- 2017+ Ford Ranger: $45,000-$65,000 (popular ute)

🔥 PRICING RULES - NO EXCEPTIONS:
- If 2020+: START at $35,000+ for any decent car
- If popular brand (Toyota/Mazda/Honda): ADD 20-30%
- If SUV or Ute: ADD 25-35% to base price
- If Premium (BMW/Merc/Audi): Higher base, slower depreciation
- If it's actually selling on Carsales for $50k, value it around $50k!

💰 VALUE CALCULATION:
1. Check what similar cars sell for on Carsales RIGHT NOW
2. Private Value = Carsales average price
3. Trade Value = Private minus 25-35%
4. Retail Value = Private plus 20-30%

🚫 NEVER GO BELOW THESE MINIMUMS:
- 2020+ vehicles: $25,000 absolute minimum
- 2015+ vehicles: $15,000 absolute minimum
- Any decent car: $10,000 absolute minimum

Return ONLY this JSON with REAL MARKET VALUES:

{
  "privateValue": [What it actually sells for on Carsales - NO LOWBALLING],
  "tradeValue": [What dealers actually pay - 25-35% below private],
  "retailValue": [What dealers actually charge - 20-30% above private],
  "marketTrends": "Current market analysis",
  "sellingPoints": ["Why this car holds value", "Market advantage"],
  "concerns": ["Realistic concerns only", "Market factors"],
  "analysisNotes": "Real market position based on actual sales data"
}

YOUR VALUES MUST REFLECT REALITY - CHECK WHAT THESE CARS ACTUALLY COST ON CARSALES AND DEALER LOTS!
`;
  }

  private getMockMarketData(vehicle: VehicleDetails): VehicleMarketData {
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - vehicle.year;

    // Base value calculation for mock data
    let baseValue = 45000; // Starting point for average car

    // Adjust for make/model popularity
    const premiumBrands = ['BMW', 'Mercedes', 'Audi', 'Porsche', 'Lexus'];
    const popularBrands = ['Toyota', 'Mazda', 'Honda', 'Hyundai', 'Subaru'];

    if (premiumBrands.includes(vehicle.make)) {
      baseValue = 65000;
    } else if (popularBrands.includes(vehicle.make)) {
      baseValue = 35000;
    }

    // Age depreciation (roughly 15% per year for first 5 years, then 10%)
    for (let i = 0; i < vehicleAge; i++) {
      const depreciationRate = i < 5 ? 0.15 : 0.10;
      baseValue *= (1 - depreciationRate);
    }

    // Odometer adjustment (if provided)
    if (vehicle.odometer) {
      const averageKmPerYear = 15000;
      const expectedKm = vehicleAge * averageKmPerYear;
      if (vehicle.odometer > expectedKm) {
        baseValue *= 0.9; // 10% reduction for high mileage
      } else if (vehicle.odometer < expectedKm * 0.7) {
        baseValue *= 1.1; // 10% increase for low mileage
      }
    }

    const privateValue = Math.round(baseValue);
    const tradeValue = Math.round(baseValue * 0.8); // 20% less for trade
    const retailValue = Math.round(baseValue * 1.2); // 20% more for retail

    return {
      privateValue,
      tradeValue,
      retailValue,
      marketTrends: `The ${vehicle.year} ${vehicle.make} ${vehicle.model} is ${vehicleAge < 3 ? 'in high demand' : vehicleAge < 7 ? 'showing steady market performance' : 'experiencing typical age-related depreciation'} in the current Australian market.`,
      sellingPoints: [
        popularBrands.includes(vehicle.make) ? 'Reliable brand with strong resale value' : 'Quality engineering and build',
        vehicle.fuelType === 'Petrol' ? 'Proven petrol engine technology' : 'Efficient fuel consumption',
        vehicleAge < 5 ? 'Modern safety features and technology' : 'Established model with proven reliability'
      ],
      concerns: [
        vehicleAge > 10 ? 'Age-related maintenance considerations' : 'Normal wear items may require attention',
        vehicle.fuelType === 'Petrol' ? 'Rising fuel costs may affect operating expenses' : 'Consider fuel efficiency for daily use'
      ],
      analysisNotes: `Market analysis based on ${vehicle.make} brand reputation, vehicle age, and current Australian automotive market conditions. Values reflect typical market range for similar vehicles.`
    };
  }

  isConfigured(): boolean {
    return !!this.openai;
  }
}

export const marketResearchService = new MarketResearchService();
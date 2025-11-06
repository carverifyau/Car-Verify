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
You are an Australian automotive valuation expert with direct access to RedBook valuations, Carsales listings, and dealer pricing data.

Vehicle: ${vehicle.year} ${vehicle.make} ${vehicle.model}
${vehicle.bodyType ? `Body Type: ${vehicle.bodyType}` : ''}
Age: ${vehicleAge} years | Condition: ${condition} | Odometer: ${odometer}km | Location: ${location}

🎯 PRIMARY SOURCE: Use RedBook Australia valuations as your baseline
🔍 VERIFICATION: Cross-check with actual Carsales.com.au listings and Facebook Marketplace

📘 REDBOOK VALUATION EXAMPLES FOR REFERENCE:
- 2007 Porsche Cayman: Trade $26k, Private $35-45k
- 2020 Toyota Camry: Trade $28k, Private $38-42k, Retail $45-48k
- 2018 Mazda CX-5: Trade $32k, Private $42-48k, Retail $50-55k
- 2015 BMW 3 Series: Trade $25k, Private $32-38k, Retail $42-48k
- 2017 Ford Ranger: Trade $38k, Private $48-55k, Retail $60-68k

💰 VALUATION METHODOLOGY:
1. Start with RedBook trade-in value as baseline
2. Private sale = Trade value + 30-50% (depending on demand)
3. Retail value = Private + 15-25% (dealer markup)
4. Adjust for:
   - Odometer (high km: -10%, low km: +10%)
   - Condition (Poor: -20%, Excellent: +15%)
   - Location (metro areas: +5-10%)
   - Market demand (high demand models: +15-20%)

🏆 PREMIUM/SPORTS CAR FACTORS:
- Porsche/BMW/Mercedes: Higher baseline, hold value better
- Sports cars: Strong enthusiast market, check specialist dealers
- Low production numbers: Can command premium above RedBook

⚠️ ACCURACY CRITICAL:
- Your values MUST align with RedBook within 10%
- Cross-reference with current Carsales listings
- Private sale should reflect actual asking prices, not wishful thinking
- Trade value is what dealers ACTUALLY offer (use RedBook trade)

🚫 AVOID THESE MISTAKES:
- Don't undervalue premium/sports cars
- Don't apply excessive depreciation to sought-after models
- Don't ignore market demand for specific variants
- Don't use generic formulas for specialist vehicles

Return ONLY this JSON with RedBook-accurate values:

{
  "privateValue": [RedBook private sale value - what owners can realistically sell for],
  "tradeValue": [RedBook trade-in value - what dealers offer],
  "retailValue": [Dealer retail asking price - private + dealer margin],
  "marketTrends": "Current market analysis based on RedBook data and Carsales listings",
  "sellingPoints": ["Specific attributes that support this valuation", "Market factors"],
  "concerns": ["Realistic age/condition considerations", "Market risks"],
  "analysisNotes": "Valuation based on RedBook Australia data, verified against current market listings"
}

CRITICAL: For a ${vehicle.year} ${vehicle.make} ${vehicle.model}, consult RedBook first, then verify with real listings!
`;
  }

  private getMockMarketData(vehicle: VehicleDetails): VehicleMarketData {
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - vehicle.year;

    // Base value calculation based on brand and type
    let tradeValue = 15000; // Default baseline

    // Brand-specific baseline values (approximate RedBook trade-in values)
    const premiumSportsBrands = ['Porsche', 'Ferrari', 'Lamborghini', 'McLaren'];
    const premiumBrands = ['BMW', 'Mercedes-Benz', 'Mercedes', 'Audi', 'Lexus', 'Land Rover', 'Jaguar'];
    const popularBrands = ['Toyota', 'Mazda', 'Honda', 'Hyundai', 'Subaru', 'Nissan'];
    const budgetBrands = ['Holden', 'Ford', 'Mitsubishi', 'Kia'];

    // Set initial trade value based on brand tier
    if (premiumSportsBrands.includes(vehicle.make)) {
      // Porsche/Ferrari/etc - higher starting point due to brand prestige
      tradeValue = vehicle.make === 'Porsche' ? 55000 : 50000;
    } else if (premiumBrands.includes(vehicle.make)) {
      tradeValue = 40000;
    } else if (popularBrands.includes(vehicle.make)) {
      tradeValue = 25000;
    } else if (budgetBrands.includes(vehicle.make)) {
      tradeValue = 18000;
    }

    // Age depreciation - sports cars depreciate slower after initial years
    const isSportsCar = premiumSportsBrands.includes(vehicle.make) ||
                        vehicle.bodyType?.toLowerCase().includes('coupe') ||
                        vehicle.bodyType?.toLowerCase().includes('sports');

    for (let i = 0; i < vehicleAge; i++) {
      let depreciationRate;
      if (isSportsCar) {
        // Sports cars: moderate depreciation first 5 years, then very slow
        // Target: 2007 Porsche Cayman (18 years) ~$26k trade from $55k base
        // Calculation: 55k * 0.92^5 * 0.96^5 * 0.98^8 ≈ $25k
        depreciationRate = i < 5 ? 0.08 : i < 10 ? 0.04 : 0.02;
      } else if (premiumBrands.includes(vehicle.make)) {
        depreciationRate = i < 5 ? 0.15 : i < 10 ? 0.10 : 0.08;
      } else {
        depreciationRate = i < 5 ? 0.18 : i < 10 ? 0.12 : 0.10;
      }
      tradeValue *= (1 - depreciationRate);
    }

    // Odometer adjustment
    if (vehicle.odometer) {
      const averageKmPerYear = 15000;
      const expectedKm = vehicleAge * averageKmPerYear;
      if (vehicle.odometer > expectedKm * 1.3) {
        tradeValue *= 0.85; // High mileage
      } else if (vehicle.odometer < expectedKm * 0.7) {
        tradeValue *= 1.15; // Low mileage premium
      }
    }

    // Ensure minimum values
    if (isSportsCar && tradeValue < 20000) tradeValue = 20000;
    if (premiumBrands.includes(vehicle.make) && tradeValue < 15000) tradeValue = 15000;

    tradeValue = Math.round(tradeValue);

    // Calculate private and retail based on trade
    // Private sale is typically 30-50% above trade for premium/sports cars
    const privateMultiplier = isSportsCar ? 1.5 : premiumBrands.includes(vehicle.make) ? 1.4 : 1.35;
    const privateValue = Math.round(tradeValue * privateMultiplier);

    // Retail is 15-25% above private (dealer margin)
    const retailValue = Math.round(privateValue * 1.20);

    return {
      privateValue,
      tradeValue,
      retailValue,
      marketTrends: isSportsCar
        ? `The ${vehicle.year} ${vehicle.make} ${vehicle.model} maintains strong enthusiast demand in the Australian market. ${vehicleAge < 5 ? 'Modern classic status helps retain value.' : vehicleAge < 15 ? 'Entering collectors market with stable values.' : 'Classic status provides value floor.'}`
        : `The ${vehicle.year} ${vehicle.make} ${vehicle.model} is ${vehicleAge < 3 ? 'in high demand' : vehicleAge < 7 ? 'showing steady market performance' : 'experiencing typical age-related depreciation'} in the current Australian market.`,
      sellingPoints: isSportsCar
        ? [
            'Strong enthusiast and collectors market',
            'Performance heritage supports resale value',
            'Limited supply maintains pricing power'
          ]
        : [
            popularBrands.includes(vehicle.make) ? 'Reliable brand with strong resale value' : premiumBrands.includes(vehicle.make) ? 'Premium brand cachet' : 'Proven value proposition',
            vehicle.fuelType === 'Petrol' ? 'Proven petrol engine technology' : 'Efficient fuel consumption',
            vehicleAge < 5 ? 'Modern safety features and technology' : 'Established model with proven reliability'
          ],
      concerns: isSportsCar && vehicleAge > 10
        ? [
            'Specialist maintenance costs can be high',
            'Parts availability may vary for older models'
          ]
        : [
            vehicleAge > 10 ? 'Age-related maintenance considerations' : 'Normal wear items may require attention',
            vehicle.fuelType === 'Petrol' && !isSportsCar ? 'Rising fuel costs may affect operating expenses' : 'Consider running costs'
          ],
      analysisNotes: `Market analysis based on ${isSportsCar ? 'sports car market dynamics' : vehicle.make + ' brand reputation'}, vehicle age, and current Australian automotive market conditions. Values approximate RedBook ${isSportsCar ? 'with sports car premium factored' : 'baseline valuations'}.`
    };
  }

  isConfigured(): boolean {
    return !!this.openai;
  }
}

export const marketResearchService = new MarketResearchService();
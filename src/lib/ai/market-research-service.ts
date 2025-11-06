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
      const errorMsg = '❌ OPENAI_API_KEY is not configured. Cannot generate market research. Please add the API key to your environment variables.';
      console.error(errorMsg);
      throw new Error('OpenAI API key not configured. AI market research is unavailable.');
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

      // Determine error type and throw with clear message
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          throw new Error(`OpenAI API key error: ${error.message}`);
        } else if (error.message.includes('quota') || error.message.includes('rate limit')) {
          throw new Error(`OpenAI API quota/rate limit exceeded: ${error.message}`);
        } else if (error.message.includes('JSON')) {
          throw new Error(`Failed to parse OpenAI response: ${error.message}`);
        }
      }

      // Generic error
      throw new Error(`AI market research failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
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


  isConfigured(): boolean {
    return !!this.openai;
  }
}

export const marketResearchService = new MarketResearchService();
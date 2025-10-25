import { NextRequest, NextResponse } from 'next/server';
import { marketResearchService, VehicleDetails } from '@/lib/ai/market-research-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vehicle } = body as { vehicle: VehicleDetails };

    if (!vehicle || !vehicle.make || !vehicle.model || !vehicle.year) {
      return NextResponse.json({
        success: false,
        error: 'Missing required vehicle information (make, model, year)'
      }, { status: 400 });
    }

    console.log(`🔍 Generating market research for ${vehicle.year} ${vehicle.make} ${vehicle.model}`);

    const marketData = await marketResearchService.generateMarketResearch(vehicle);

    return NextResponse.json({
      success: true,
      marketData,
      aiGenerated: marketResearchService.isConfigured()
    });

  } catch (error) {
    console.error('Market research API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to generate market research'
    }, { status: 500 });
  }
}
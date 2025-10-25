import { NextRequest, NextResponse } from 'next/server';
import { carHistoryService } from '@/lib/scraping/carhistory-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { rego, state } = body;

    if (!rego || !state) {
      return NextResponse.json({
        success: false,
        error: 'Registration number and state are required'
      }, { status: 400 });
    }

    console.log(`🚗 CarHistory check for ${rego} (${state})`);

    // Validate basic rego format
    if (rego.length < 3 || rego.length > 8) {
      return NextResponse.json({
        success: false,
        error: 'Invalid registration format'
      }, { status: 400 });
    }

    // Perform the lookup
    const result = await carHistoryService.lookupVehicle({
      rego: rego.toUpperCase(),
      state: state.toUpperCase()
    });

    if (result.success) {
      console.log(`✅ CarHistory found vehicle: ${result.make} ${result.model}`);

      return NextResponse.json({
        success: true,
        vehicle: {
          registration: rego.toUpperCase(),
          make: result.make,
          model: result.model,
          year: result.year,
          vin: result.vin,
          bodyType: result.bodyType,
          colour: result.colour,
          registrationStatus: result.registrationStatus,
          state: state.toUpperCase(),
          dataSource: 'CarHistory (Free Preview)',
          disclaimer: 'Vehicle data sourced from CarHistory for preview purposes.'
        }
      });
    } else {
      console.log(`⚠️ No vehicle found for ${rego}: ${result.error}`);

      return NextResponse.json({
        success: false,
        error: result.error || 'Vehicle not found',
        suggestion: 'Please check the registration number and state, then try again.'
      }, { status: 404 });
    }

  } catch (error) {
    console.error('CarHistory check API error:', error);

    return NextResponse.json({
      success: false,
      error: 'Service temporarily unavailable. Please try again later.'
    }, { status: 500 });
  }
}

// Health check endpoint
export async function GET() {
  try {
    // Test the CarHistory service connection
    const isConnected = await carHistoryService.testConnection();

    return NextResponse.json({
      status: isConnected ? 'healthy' : 'degraded',
      services: {
        carhistory: isConnected ? 'operational' : 'unavailable'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      error: 'Service check failed',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
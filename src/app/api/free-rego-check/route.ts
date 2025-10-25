import { NextRequest, NextResponse } from 'next/server';
import { qldRegoService } from '@/lib/scraping/qld-rego-service';

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

    console.log(`🔍 Free rego check for ${rego} (${state})`);

    // Currently only supporting QLD
    if (state.toUpperCase() !== 'QLD') {
      return NextResponse.json({
        success: false,
        error: 'Currently only QLD registrations are supported for free lookup'
      }, { status: 400 });
    }

    // Validate QLD rego format (basic validation)
    const qldRegoPattern = /^[0-9]{3}[A-Z]{3}$|^[A-Z]{3}[0-9]{3}$|^[0-9]{1,3}[A-Z]{2,3}$/i;
    if (!qldRegoPattern.test(rego)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid QLD registration format'
      }, { status: 400 });
    }

    // Perform the lookup
    const result = await qldRegoService.lookupVehicle({ rego: rego.toUpperCase() });

    if (result.success) {
      console.log(`✅ Successfully found vehicle: ${result.make} ${result.model}`);

      return NextResponse.json({
        success: true,
        vehicle: {
          registration: result.registrationNumber,
          make: result.make,
          model: result.model,
          bodyType: result.bodyType,
          year: result.year,
          registrationStatus: result.registrationStatus,
          registrationExpiry: result.registrationExpiry,
          state: state.toUpperCase(),
          dataSource: 'QLD Transport (Free)',
          disclaimer: 'This is a free lookup service. For comprehensive vehicle history reports, purchase a full report.'
        }
      });
    } else {
      console.log(`⚠️ No vehicle found for ${rego}: ${result.error}`);

      return NextResponse.json({
        success: false,
        error: result.error || 'Vehicle not found',
        suggestion: 'Please check the registration number and try again. For comprehensive vehicle history, consider purchasing a full report.'
      }, { status: 404 });
    }

  } catch (error) {
    console.error('Free rego check API error:', error);

    return NextResponse.json({
      success: false,
      error: 'Service temporarily unavailable. Please try again later.'
    }, { status: 500 });
  }
}

// Health check endpoint
export async function GET() {
  try {
    // Test the QLD service connection
    const isConnected = await qldRegoService.testConnection();

    return NextResponse.json({
      status: isConnected ? 'healthy' : 'degraded',
      services: {
        qld: isConnected ? 'operational' : 'unavailable'
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
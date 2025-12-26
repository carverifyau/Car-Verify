'use client'

import CustomVehicleReport from '@/components/CustomVehicleReport'

export default function ReportPreviewPage() {
  // Sample data to show how the report looks
  const sampleClearReport = {
    rego: 'ABC123',
    state: 'VIC',
    vin: 'WBAJA7105VB123456',
    make: 'Toyota',
    model: 'Ranger',
    year: '2018',
    color: 'White',
    bodyType: 'Dual Cab Ute',
    ppsrStatus: {
      hasFinance: false,
      isStolen: false,
      isWrittenOff: false,
      securityInterests: 0
    },
    marketData: {
      retailValue: '$35,900',
      privateValue: '$32,500',
      tradeValue: '$29,800',
      priceChange: '+1.2%',
      listingsFound: 127
    },
    reportId: 'CVR-2024-001-ABC123',
    searchDate: new Date().toISOString(),
    certificateNumber: 'PPSR-20241226-XYZ789'
  }

  const sampleAlertReport = {
    rego: 'DEF456',
    state: 'NSW',
    vin: 'JH4KA8170NC123789',
    make: 'Honda',
    model: 'Civic',
    year: '2019',
    color: 'Blue',
    bodyType: 'Sedan',
    ppsrStatus: {
      hasFinance: true,
      financeAmount: '$12,450',
      financier: 'Toyota Finance',
      isStolen: false,
      isWrittenOff: false,
      securityInterests: 1
    },
    marketData: {
      retailValue: '$22,900',
      privateValue: '$20,500',
      tradeValue: '$18,200',
      priceChange: '-0.8%',
      listingsFound: 89
    },
    reportId: 'CVR-2024-002-DEF456',
    searchDate: new Date().toISOString(),
    certificateNumber: 'PPSR-20241226-ABC123'
  }

  const sampleWriteOffReport = {
    rego: 'GHI789',
    state: 'QLD',
    vin: '1HGBH41JXMN109876',
    make: 'Mazda',
    model: '3',
    year: '2017',
    color: 'Red',
    bodyType: 'Hatchback',
    ppsrStatus: {
      hasFinance: false,
      isStolen: false,
      isWrittenOff: true,
      writeOffCategory: 'Repairable Write-Off',
      securityInterests: 0
    },
    marketData: {
      retailValue: '$14,500',
      privateValue: '$12,200',
      tradeValue: '$10,500',
      priceChange: '-3.5%',
      listingsFound: 34
    },
    reportId: 'CVR-2024-003-GHI789',
    searchDate: new Date().toISOString(),
    certificateNumber: 'PPSR-20241226-DEF456'
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-2">Custom Vehicle Report Preview</h1>
        <p className="text-center text-gray-600 mb-12">See how your beautiful reports will look</p>

        {/* Clear Report */}
        <div className="mb-16">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-t-lg">
            <h2 className="text-lg font-bold">Example 1: All Clear (Best Case)</h2>
          </div>
          <div className="shadow-2xl">
            <CustomVehicleReport {...sampleClearReport} />
          </div>
        </div>

        {/* Alert Report */}
        <div className="mb-16">
          <div className="bg-yellow-600 text-white px-4 py-2 rounded-t-lg">
            <h2 className="text-lg font-bold">Example 2: Finance Owing (Common Issue)</h2>
          </div>
          <div className="shadow-2xl">
            <CustomVehicleReport {...sampleAlertReport} />
          </div>
        </div>

        {/* Write-off Report */}
        <div className="mb-16">
          <div className="bg-red-600 text-white px-4 py-2 rounded-t-lg">
            <h2 className="text-lg font-bold">Example 3: Written Off (Serious Alert)</h2>
          </div>
          <div className="shadow-2xl">
            <CustomVehicleReport {...sampleWriteOffReport} />
          </div>
        </div>

        <div className="text-center mt-12 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">Ready to integrate?</h3>
          <p className="text-gray-700 mb-4">
            This report component is ready to be integrated into your payment flow.
            <br />
            It will replace the ugly PPSR certificate with this beautiful, professional report.
          </p>
          <p className="text-sm text-gray-500">
            Navigate to <code className="bg-gray-100 px-2 py-1 rounded">/report-preview</code> to see this page
          </p>
        </div>
      </div>
    </div>
  )
}

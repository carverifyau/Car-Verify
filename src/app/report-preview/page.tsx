'use client'

import CustomVehicleReport from '@/components/CustomVehicleReport'

export default function ReportPreviewPage() {
  // Sample data to show how the report looks
  const sampleClearReport = {
    rego: 'ABC123',
    state: 'VIC',
    regoExpiry: '2025-06-15',
    vin: 'WBAJA7105VB123456',
    chassis: 'WBAJA7105VB123456',
    engine: 'ABC123456',
    make: 'Ford',
    model: 'Ranger',
    year: '2018',
    variant: 'XLT',
    series: '3.2 (4x4)',
    color: 'White',
    bodyType: 'Dual Cab Ute',
    transmissionType: 'Automatic',
    fuelType: 'Diesel',
    engineCapacity: '3200cc',
    cylinders: '5',
    complianceDate: '2018-03-15',
    buildDate: '2018-02-20',
    manufacturerCode: 'FORD-AU',
    nvic: 'AFJP02E',
    tareWeight: '2115 kg',
    gvm: '3200 kg',
    gcm: '6000 kg',
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
    certificateNumber: 'PPSR-20241226-XYZ789',
    ppsrSearchNumber: 'SEARCH-2024-12345'
  }

  const sampleAlertReport = {
    rego: 'DEF456',
    state: 'NSW',
    regoExpiry: '2025-09-30',
    vin: 'JH4KA8170NC123789',
    chassis: 'JH4KA8170NC123789',
    engine: 'HND789012',
    make: 'Honda',
    model: 'Civic',
    year: '2019',
    variant: 'VTi-S',
    series: 'MY19',
    color: 'Blue',
    bodyType: 'Sedan',
    transmissionType: 'Manual',
    fuelType: 'Petrol',
    engineCapacity: '1800cc',
    cylinders: '4',
    complianceDate: '2019-01-10',
    buildDate: '2018-12-15',
    manufacturerCode: 'HONDA-JP',
    nvic: 'HJCV19M',
    tareWeight: '1320 kg',
    gvm: '1750 kg',
    gcm: '3000 kg',
    ppsrStatus: {
      hasFinance: true,
      financeAmount: '$12,450',
      financier: 'Toyota Finance',
      securedParty: 'Toyota Finance Australia Ltd',
      registrationDate: '2023-06-15',
      expiryDate: '2026-06-15',
      isStolen: false,
      isWrittenOff: false,
      securityInterests: 1,
      encumbrances: [
        {
          type: 'Security Interest',
          registeredBy: 'Toyota Finance Australia Ltd',
          amount: '$12,450',
          date: '2023-06-15'
        }
      ]
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
    certificateNumber: 'PPSR-20241226-ABC123',
    ppsrSearchNumber: 'SEARCH-2024-67890'
  }

  const sampleWriteOffReport = {
    rego: 'GHI789',
    state: 'QLD',
    regoExpiry: '2025-03-20',
    vin: '1HGBH41JXMN109876',
    chassis: '1HGBH41JXMN109876',
    engine: 'MZD345678',
    make: 'Mazda',
    model: '3',
    year: '2017',
    variant: 'Neo',
    series: 'BN',
    color: 'Red',
    bodyType: 'Hatchback',
    transmissionType: 'Automatic',
    fuelType: 'Petrol',
    engineCapacity: '2000cc',
    cylinders: '4',
    complianceDate: '2017-02-08',
    buildDate: '2017-01-20',
    manufacturerCode: 'MAZDA-JP',
    nvic: 'MBNE17A',
    tareWeight: '1295 kg',
    gvm: '1655 kg',
    gcm: '2700 kg',
    ppsrStatus: {
      hasFinance: false,
      isStolen: false,
      isWrittenOff: true,
      writeOffCategory: 'Repairable Write-Off',
      writeOffDate: '2022-08-15',
      jurisdiction: 'QLD',
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
    certificateNumber: 'PPSR-20241226-DEF456',
    ppsrSearchNumber: 'SEARCH-2024-11111'
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

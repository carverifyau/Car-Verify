'use client'

import { VehicleReport } from '@/types/vehicle-report'

interface ReportTemplateProps {
  report: Partial<VehicleReport>
  templateType?: 'basic' | 'comprehensive' | 'premium'
}

export default function ReportTemplate({ report, templateType = 'comprehensive' }: ReportTemplateProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white p-8 print:p-4">
      {/* Header */}
      <div className="border-b-2 border-blue-600 pb-6 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Car Verify</h1>
            <p className="text-gray-600">Official Vehicle History Report</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">AUTHORISED</div>
            <div className="text-sm text-gray-500">PPSR PROVIDER</div>
            <div className="text-xs text-gray-400 mt-2">Report #{report.id || 'DRAFT'}</div>
          </div>
        </div>
      </div>

      {/* Vehicle Summary */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Vehicle Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm font-medium text-gray-500">Registration</div>
            <div className="text-lg font-bold">{report.vehicleDetails?.registrationNumber || 'N/A'}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">State</div>
            <div className="text-lg font-bold">{report.vehicleDetails?.state || 'N/A'}</div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Make/Model</div>
            <div className="text-lg font-bold">
              {report.vehicleDetails?.make} {report.vehicleDetails?.model}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-500">Year</div>
            <div className="text-lg font-bold">{report.vehicleDetails?.year}</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-sm font-medium text-gray-500">VIN</div>
          <div className="text-lg font-mono">{report.vehicleDetails?.vin || 'Not Available'}</div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Risk Assessment</h2>
        <div className="flex items-center space-x-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">✓</span>
          </div>
          <div>
            <div className="text-lg font-bold text-green-800">LOW RISK VEHICLE</div>
            <div className="text-green-700">No major red flags detected in this report</div>
          </div>
        </div>
      </div>

      {/* PPSR Security Interests */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">PPSR Security Interests</h2>
        {report.securityInterests && report.securityInterests.length > 0 ? (
          <div className="space-y-4">
            {report.securityInterests.map((interest, index) => (
              <div key={interest.id} className="border border-gray-200 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-500">Secured Party</div>
                    <div className="font-bold">{interest.securedParty}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Date Registered</div>
                    <div>{new Date(interest.dateRegistered).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500">Status</div>
                    <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      interest.status === 'Registered' ? 'bg-yellow-100 text-yellow-800' :
                      interest.status === 'Discharged' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {interest.status}
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-sm font-medium text-gray-500">Interest Type</div>
                  <div>{interest.type}</div>
                </div>
                {interest.amount && (
                  <div className="mt-2">
                    <div className="text-sm font-medium text-gray-500">Amount</div>
                    <div className="font-bold">${interest.amount.toLocaleString()}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <div className="font-bold text-green-800">No Security Interests Found</div>
                <div className="text-green-700 text-sm">No financial encumbrances registered against this vehicle</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Vehicle Details */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Vehicle Details</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium text-gray-500">Body Type</div>
                <div>{report.vehicleDetails?.bodyType || 'Not specified'}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Colour</div>
                <div>{report.vehicleDetails?.colour || 'Not specified'}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Engine Capacity</div>
                <div>{report.vehicleDetails?.engineCapacityLitres || 'Not specified'}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Fuel Type</div>
                <div>{report.vehicleDetails?.fuelType || 'Not specified'}</div>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium text-gray-500">Transmission</div>
                <div>{report.vehicleDetails?.transmission || 'Not specified'}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Seats</div>
                <div>{report.vehicleDetails?.seats || 'Not specified'}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-500">Registration Status</div>
                <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                  report.vehicleDetails?.registrationStatus === 'Current' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {report.vehicleDetails?.registrationStatus || 'Unknown'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Valuation */}
      {templateType !== 'basic' && report.marketValuation && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Market Valuation</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500 mb-2">Retail Value</div>
                <div className="text-2xl font-bold text-blue-600">
                  ${report.marketValuation.retailValue.average.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  ${report.marketValuation.retailValue.low.toLocaleString()} - ${report.marketValuation.retailValue.high.toLocaleString()}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500 mb-2">Trade Value</div>
                <div className="text-2xl font-bold text-green-600">
                  ${report.marketValuation.tradeValue.average.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  ${report.marketValuation.tradeValue.low.toLocaleString()} - ${report.marketValuation.tradeValue.high.toLocaleString()}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500 mb-2">Private Sale</div>
                <div className="text-2xl font-bold text-purple-600">
                  ${report.marketValuation.privateValue.average.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  ${report.marketValuation.privateValue.low.toLocaleString()} - ${report.marketValuation.privateValue.high.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 text-center">
              <div className="text-xs text-gray-500">
                Valuation Date: {new Date(report.marketValuation.valuationDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Accident History */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Accident History</h2>
        {report.accidentHistory && report.accidentHistory.length > 0 ? (
          <div className="space-y-4">
            {report.accidentHistory.map((accident, index) => (
              <div key={accident.id} className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-xs">!</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-orange-800">
                      {accident.severity} Accident - {new Date(accident.accidentDate).toLocaleDateString()}
                    </div>
                    <div className="text-orange-700 mt-1">{accident.damageDescription}</div>
                    {accident.estimatedRepairCost && (
                      <div className="text-sm text-orange-600 mt-2">
                        Estimated Repair Cost: ${accident.estimatedRepairCost.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <div className="font-bold text-green-800">No Accident History</div>
                <div className="text-green-700 text-sm">No accident records found for this vehicle</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recalls */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recalls & Safety</h2>
        {report.recalls && report.recalls.length > 0 ? (
          <div className="space-y-4">
            {report.recalls.map((recall, index) => (
              <div key={recall.id} className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-yellow-800">{recall.component}</div>
                    <div className="text-yellow-700 mt-1">{recall.defectDescription}</div>
                    <div className="text-sm text-yellow-600 mt-2">
                      Recall Date: {new Date(recall.recallDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    recall.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    recall.status === 'Outstanding' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {recall.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <div className="font-bold text-green-800">No Outstanding Recalls</div>
                <div className="text-green-700 text-sm">No outstanding safety recalls for this vehicle</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 pt-6 mt-8">
        <div className="text-center text-sm text-gray-500">
          <div className="mb-2">
            <strong>Car Verify</strong> - Official Australian Vehicle History Reports
          </div>
          <div className="mb-2">
            Authorised PPSR Provider | AFCA Member | Comprehensive Vehicle Data
          </div>
          <div>
            Report generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </div>
          <div className="mt-4 text-xs">
            This report contains information from official government databases and private data sources.
            Data accuracy is subject to source reliability and timing of updates.
          </div>
        </div>
      </div>
    </div>
  )
}
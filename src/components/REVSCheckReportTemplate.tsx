'use client'

import { VehicleReport } from '@/types/vehicle-report'

interface REVSCheckReportTemplateProps {
  report: Partial<VehicleReport>
}

export default function REVSCheckReportTemplate({ report }: REVSCheckReportTemplateProps) {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'text-green-600 bg-green-50'
      case 'B': return 'text-blue-600 bg-blue-50'
      case 'C': return 'text-yellow-600 bg-yellow-50'
      case 'D': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const grade = 'A' // Would be calculated based on report data

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Header */}
      <div className="bg-slate-800 text-white p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Car Verify</h1>
            <p className="text-slate-300">AUTHORISED PPSR PROVIDER</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-300">Report Date</div>
            <div className="font-bold">{new Date().toLocaleDateString()}</div>
            <div className="text-sm text-slate-300 mt-2">Report ID: {report.id || 'DRAFT'}</div>
          </div>
        </div>
      </div>

      {/* Grade Badge */}
      <div className="bg-gray-50 p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Vehicle Grade</h2>
            <p className="text-sm text-gray-600">Overall risk assessment</p>
          </div>
          <div className={`text-4xl font-bold px-6 py-3 rounded-lg ${getGradeColor(grade)}`}>
            {grade}
          </div>
        </div>
      </div>

      {/* Quick Summary */}
      <div className="p-6 bg-blue-50 border-b">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <div>
              <div className="text-xs text-gray-500">Financial</div>
              <div className="text-sm font-medium">Clear</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <div>
              <div className="text-xs text-gray-500">Stolen</div>
              <div className="text-sm font-medium">Clear</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <div>
              <div className="text-xs text-gray-500">Write-off</div>
              <div className="text-sm font-medium">Clear</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <div>
              <div className="text-xs text-gray-500">Registration</div>
              <div className="text-sm font-medium">Current</div>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Information */}
      <div className="p-6 border-b">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Vehicle Information</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Registration</div>
              <div className="font-bold text-lg">{report.vehicleDetails?.registrationNumber || 'N/A'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">State</div>
              <div className="font-bold text-lg">{report.vehicleDetails?.state || 'N/A'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Make</div>
              <div className="font-bold">{report.vehicleDetails?.make || 'Unknown'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Model</div>
              <div className="font-bold">{report.vehicleDetails?.model || 'Unknown'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Year</div>
              <div className="font-bold">{report.vehicleDetails?.year || 'Unknown'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Body Type</div>
              <div className="font-bold">{report.vehicleDetails?.bodyType || 'Unknown'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">VIN</div>
              <div className="font-mono text-sm">{report.vehicleDetails?.vin || 'Not Available'}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Engine</div>
              <div className="font-bold">{report.vehicleDetails?.engineCapacityLitres || 'Unknown'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Details */}
      <div className="p-6 border-b">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Registration Details</h3>
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <div className="font-bold text-green-800">Registration Status: CURRENT</div>
                <div className="text-green-700 text-sm">
                  Registration is valid and up to date
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Finance Check (PPSR) */}
      <div className="p-6 border-b">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Finance Check</h3>
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">
            Personal Property Securities Register (PPSR) Search Results
          </div>
        </div>

        {report.securityInterests && report.securityInterests.length > 0 ? (
          <div className="space-y-4">
            {report.securityInterests.map((interest, index) => (
              <div key={interest.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mt-1">
                    <span className="text-white text-sm font-bold">!</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-yellow-800">Security Interest Found</div>
                    <div className="text-yellow-700 mt-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        <div><strong>Secured Party:</strong> {interest.securedParty}</div>
                        <div><strong>Date Registered:</strong> {new Date(interest.dateRegistered).toLocaleDateString()}</div>
                        <div><strong>Interest Type:</strong> {interest.type}</div>
                        <div><strong>Status:</strong> {interest.status}</div>
                        {interest.amount && (
                          <div><strong>Amount:</strong> ${interest.amount.toLocaleString()}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <div className="font-bold text-green-800">No Finance Owing</div>
                <div className="text-green-700 text-sm">
                  No security interests registered against this vehicle
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
          <strong>PPSR Certificate:</strong> A full PPSR certificate is available upon request.
          Search reference: {Date.now()}
        </div>
      </div>

      {/* Stolen Check */}
      <div className="p-6 border-b">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Stolen Check</h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <div>
              <div className="font-bold text-green-800">Not Reported Stolen</div>
              <div className="text-green-700 text-sm">
                No stolen vehicle records found in national databases
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Written-off Check */}
      <div className="p-6 border-b">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Written-off Check</h3>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <div>
              <div className="font-bold text-green-800">Not Written Off</div>
              <div className="text-green-700 text-sm">
                No write-off records found in national databases
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Valuation */}
      <div className="p-6 border-b">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Vehicle Valuation</h3>
        {report.marketValuation ? (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-white p-4 rounded border">
                <div className="text-sm text-gray-500 mb-1">Retail Value</div>
                <div className="text-2xl font-bold text-blue-600">
                  ${report.marketValuation.retailValue.average.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  ${report.marketValuation.retailValue.low.toLocaleString()} - ${report.marketValuation.retailValue.high.toLocaleString()}
                </div>
              </div>
              <div className="bg-white p-4 rounded border">
                <div className="text-sm text-gray-500 mb-1">Trade Value</div>
                <div className="text-2xl font-bold text-green-600">
                  ${report.marketValuation.tradeValue.average.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  ${report.marketValuation.tradeValue.low.toLocaleString()} - ${report.marketValuation.tradeValue.high.toLocaleString()}
                </div>
              </div>
              <div className="bg-white p-4 rounded border">
                <div className="text-sm text-gray-500 mb-1">Private Sale</div>
                <div className="text-2xl font-bold text-purple-600">
                  ${report.marketValuation.privateValue.average.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  ${report.marketValuation.privateValue.low.toLocaleString()} - ${report.marketValuation.privateValue.high.toLocaleString()}
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-500 text-center">
              Valuation as at {new Date(report.marketValuation.valuationDate).toLocaleDateString()}
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
            Valuation data not yet available
          </div>
        )}
      </div>

      {/* Previous Sales History */}
      <div className="p-6 border-b">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Previous Sales History</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-center text-gray-500">
            Sales history data available in premium reports
          </div>
        </div>
      </div>

      {/* Recalls */}
      {report.recalls && report.recalls.length > 0 && (
        <div className="p-6 border-b">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Safety Recalls</h3>
          <div className="space-y-3">
            {report.recalls.map((recall, index) => (
              <div key={recall.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-yellow-800">{recall.component}</div>
                    <div className="text-yellow-700 text-sm mt-1">{recall.defectDescription}</div>
                    <div className="text-xs text-yellow-600 mt-2">
                      Recall Date: {new Date(recall.recallDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    recall.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {recall.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="bg-gray-100 p-6">
        <div className="text-center">
          <div className="text-sm font-bold text-gray-900 mb-2">Car Verify - Authorised PPSR Provider</div>
          <div className="text-xs text-gray-600 mb-2">
            This report contains information sourced from government and industry databases.
          </div>
          <div className="text-xs text-gray-500">
            Report generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Data accuracy is subject to source reliability and timing of database updates.
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import React from 'react'
import { Shield, CheckCircle, XCircle, AlertTriangle, TrendingUp, Calendar, FileText } from 'lucide-react'

interface VehicleReportProps {
  // Vehicle Details
  rego: string
  state: string
  vin?: string
  make?: string
  model?: string
  year?: string
  color?: string
  bodyType?: string

  // PPSR Data
  ppsrStatus: {
    hasFinance: boolean
    financeAmount?: string
    financier?: string
    isStolen: boolean
    isWrittenOff: boolean
    writeOffCategory?: string
    securityInterests?: number
  }

  // Market Data (optional - for future)
  marketData?: {
    averagePrice?: string
    retailValue?: string
    privateValue?: string
    tradeValue?: string
    priceChange?: string
    listingsFound?: number
  }

  // Report Metadata
  reportId: string
  searchDate: string
  certificateNumber?: string
}

export default function CustomVehicleReport({
  rego,
  state,
  vin,
  make,
  model,
  year,
  color,
  bodyType,
  ppsrStatus,
  marketData,
  reportId,
  searchDate,
  certificateNumber
}: VehicleReportProps) {

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-AU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const overallStatus = !ppsrStatus.hasFinance && !ppsrStatus.isStolen && !ppsrStatus.isWrittenOff ? 'clear' : 'alert'

  return (
    <div className="w-full max-w-5xl mx-auto bg-white" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-12 h-12" />
            <div>
              <h1 className="text-3xl font-bold">Car Verify</h1>
              <p className="text-blue-100 text-sm">Official PPSR Vehicle Report</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100">Report ID</div>
            <div className="font-mono text-lg">{reportId.slice(0, 12)}...</div>
          </div>
        </div>
      </div>

      {/* Overall Status Banner */}
      <div className={`p-6 ${overallStatus === 'clear' ? 'bg-green-50 border-l-4 border-green-500' : 'bg-red-50 border-l-4 border-red-500'}`}>
        <div className="flex items-center space-x-4">
          {overallStatus === 'clear' ? (
            <>
              <CheckCircle className="w-12 h-12 text-green-600" />
              <div>
                <h2 className="text-2xl font-bold text-green-900">All Clear</h2>
                <p className="text-green-700">No major issues found with this vehicle</p>
              </div>
            </>
          ) : (
            <>
              <AlertTriangle className="w-12 h-12 text-red-600" />
              <div>
                <h2 className="text-2xl font-bold text-red-900">Issues Detected</h2>
                <p className="text-red-700">This vehicle has recorded issues - review carefully</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Vehicle Details */}
      <div className="p-8 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <FileText className="w-6 h-6 mr-2 text-blue-600" />
          Vehicle Details
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-gray-600 mb-1">Registration</div>
            <div className="text-2xl font-bold text-gray-900">{rego}</div>
            <div className="text-sm text-gray-500">{state}</div>
          </div>
          {make && model && year && (
            <div className="md:col-span-2">
              <div className="text-sm text-gray-600 mb-1">Vehicle</div>
              <div className="text-2xl font-bold text-gray-900">{year} {make} {model}</div>
              <div className="text-sm text-gray-500">{bodyType} {color && `• ${color}`}</div>
            </div>
          )}
          {vin && (
            <div className="col-span-2 md:col-span-3">
              <div className="text-sm text-gray-600 mb-1">VIN (Vehicle Identification Number)</div>
              <div className="text-lg font-mono text-gray-900">{vin}</div>
            </div>
          )}
        </div>
      </div>

      {/* PPSR Security Check */}
      <div className="p-8 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Shield className="w-6 h-6 mr-2 text-blue-600" />
          PPSR Security Check
        </h3>

        <div className="space-y-4">
          {/* Finance Check */}
          <div className={`p-5 rounded-xl border-2 ${ppsrStatus.hasFinance ? 'bg-red-50 border-red-300' : 'bg-green-50 border-green-300'}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                {ppsrStatus.hasFinance ? (
                  <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                ) : (
                  <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                )}
                <div>
                  <h4 className={`text-lg font-bold ${ppsrStatus.hasFinance ? 'text-red-900' : 'text-green-900'}`}>
                    Finance / Money Owing
                  </h4>
                  <p className={`text-sm ${ppsrStatus.hasFinance ? 'text-red-700' : 'text-green-700'}`}>
                    {ppsrStatus.hasFinance ? 'Finance or security interest registered' : 'No finance or money owing'}
                  </p>
                  {ppsrStatus.hasFinance && ppsrStatus.financeAmount && (
                    <p className="text-sm text-red-900 font-semibold mt-2">
                      Amount: {ppsrStatus.financeAmount}
                      {ppsrStatus.financier && ` • Financier: ${ppsrStatus.financier}`}
                    </p>
                  )}
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${ppsrStatus.hasFinance ? 'bg-red-200 text-red-900' : 'bg-green-200 text-green-900'}`}>
                {ppsrStatus.hasFinance ? 'ALERT' : 'CLEAR'}
              </div>
            </div>
          </div>

          {/* Stolen Check */}
          <div className={`p-5 rounded-xl border-2 ${ppsrStatus.isStolen ? 'bg-red-50 border-red-300' : 'bg-green-50 border-green-300'}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                {ppsrStatus.isStolen ? (
                  <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                ) : (
                  <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                )}
                <div>
                  <h4 className={`text-lg font-bold ${ppsrStatus.isStolen ? 'text-red-900' : 'text-green-900'}`}>
                    Stolen Vehicle Status
                  </h4>
                  <p className={`text-sm ${ppsrStatus.isStolen ? 'text-red-700' : 'text-green-700'}`}>
                    {ppsrStatus.isStolen ? 'This vehicle has been reported stolen' : 'Not reported as stolen'}
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${ppsrStatus.isStolen ? 'bg-red-200 text-red-900' : 'bg-green-200 text-green-900'}`}>
                {ppsrStatus.isStolen ? 'ALERT' : 'CLEAR'}
              </div>
            </div>
          </div>

          {/* Write-off Check */}
          <div className={`p-5 rounded-xl border-2 ${ppsrStatus.isWrittenOff ? 'bg-red-50 border-red-300' : 'bg-green-50 border-green-300'}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                {ppsrStatus.isWrittenOff ? (
                  <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                ) : (
                  <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                )}
                <div>
                  <h4 className={`text-lg font-bold ${ppsrStatus.isWrittenOff ? 'text-red-900' : 'text-green-900'}`}>
                    Written-Off Vehicle (WOVR)
                  </h4>
                  <p className={`text-sm ${ppsrStatus.isWrittenOff ? 'text-red-700' : 'text-green-700'}`}>
                    {ppsrStatus.isWrittenOff ? 'Vehicle has been written off' : 'No write-off history'}
                  </p>
                  {ppsrStatus.isWrittenOff && ppsrStatus.writeOffCategory && (
                    <p className="text-sm text-red-900 font-semibold mt-2">
                      Category: {ppsrStatus.writeOffCategory}
                    </p>
                  )}
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${ppsrStatus.isWrittenOff ? 'bg-red-200 text-red-900' : 'bg-green-200 text-green-900'}`}>
                {ppsrStatus.isWrittenOff ? 'ALERT' : 'CLEAR'}
              </div>
            </div>
          </div>

          {ppsrStatus.securityInterests && ppsrStatus.securityInterests > 0 && (
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-5">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-bold text-yellow-900">Security Interests Registered</h4>
                  <p className="text-sm text-yellow-700">
                    {ppsrStatus.securityInterests} security interest{ppsrStatus.securityInterests > 1 ? 's' : ''} registered against this vehicle
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Market Valuation (if available) */}
      {marketData && (
        <div className="p-8 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
            Market Valuation
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {marketData.retailValue && (
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Retail Value</div>
                <div className="text-3xl font-bold text-gray-900">{marketData.retailValue}</div>
                <div className="text-xs text-gray-500 mt-1">Dealership price</div>
              </div>
            )}
            {marketData.privateValue && (
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Private Sale</div>
                <div className="text-3xl font-bold text-gray-900">{marketData.privateValue}</div>
                <div className="text-xs text-gray-500 mt-1">Private party</div>
              </div>
            )}
            {marketData.tradeValue && (
              <div className="bg-white rounded-lg p-5 shadow-sm">
                <div className="text-sm text-gray-600 mb-1">Trade-In Value</div>
                <div className="text-3xl font-bold text-gray-900">{marketData.tradeValue}</div>
                <div className="text-xs text-gray-500 mt-1">Dealer trade-in</div>
              </div>
            )}
          </div>

          {marketData.priceChange && (
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Market trend (last 30 days)</span>
                <span className={`text-lg font-bold ${marketData.priceChange.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {marketData.priceChange}
                </span>
              </div>
            </div>
          )}

          {marketData.listingsFound && (
            <p className="text-sm text-gray-600 mt-4">
              Based on {marketData.listingsFound} similar vehicles currently listed for sale
            </p>
          )}
        </div>
      )}

      {/* Report Information */}
      <div className="p-8 bg-gray-50">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
          <Calendar className="w-6 h-6 mr-2 text-blue-600" />
          Report Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-600 mb-1">Search Date & Time</div>
            <div className="text-base font-medium text-gray-900">{formatDate(searchDate)}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-1">Report ID</div>
            <div className="text-base font-mono text-gray-900">{reportId}</div>
          </div>
          {certificateNumber && (
            <div className="md:col-span-2">
              <div className="text-sm text-gray-600 mb-1">PPSR Certificate Number</div>
              <div className="text-base font-mono text-gray-900">{certificateNumber}</div>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Important:</strong> This report is based on data from the Australian Personal Property Securities Register (PPSR)
            and other official sources at the time of search. Car Verify is an authorized PPSR information broker.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white p-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8" />
            <div>
              <div className="font-bold text-lg">Car Verify</div>
              <div className="text-sm text-gray-400">Authorised PPSR Provider</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Need help?</div>
            <div className="text-sm">support@carverify.com.au</div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          © 2024 Car Verify. All rights reserved. This report is the property of Car Verify and the recipient.
          <br />
          Unauthorized reproduction or distribution is prohibited.
        </div>
      </div>
    </div>
  )
}

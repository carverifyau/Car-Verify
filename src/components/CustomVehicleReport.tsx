'use client'

import React from 'react'
import { Shield, CheckCircle, XCircle, AlertTriangle, TrendingUp, Calendar, FileText, Car, Gauge, Wrench, Info } from 'lucide-react'

interface VehicleReportProps {
  // Vehicle Registration Details
  rego: string
  state: string
  regoExpiry?: string

  // Vehicle Identification
  vin?: string
  chassis?: string
  engine?: string

  // Vehicle Specifications
  make?: string
  model?: string
  year?: string
  variant?: string
  series?: string
  color?: string
  bodyType?: string
  transmissionType?: string
  fuelType?: string
  engineCapacity?: string
  cylinders?: string

  // Compliance & Build
  complianceDate?: string
  buildDate?: string
  manufacturerCode?: string
  nvic?: string

  // Weights & Capacity
  tareWeight?: string
  gvm?: string // Gross Vehicle Mass
  gcm?: string // Gross Combination Mass

  // PPSR Security Data
  ppsrStatus: {
    hasFinance: boolean
    financeAmount?: string
    financier?: string
    securedParty?: string
    registrationDate?: string
    expiryDate?: string
    isStolen: boolean
    stolenDate?: string
    isWrittenOff: boolean
    writeOffCategory?: string
    writeOffDate?: string
    jurisdiction?: string
    securityInterests?: number
    encumbrances?: Array<{
      type: string
      registeredBy: string
      amount?: string
      date: string
    }>
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
  ppsrSearchNumber?: string
}

export default function CustomVehicleReport({
  rego,
  state,
  regoExpiry,
  vin,
  chassis,
  engine,
  make,
  model,
  year,
  variant,
  series,
  color,
  bodyType,
  transmissionType,
  fuelType,
  engineCapacity,
  cylinders,
  complianceDate,
  buildDate,
  manufacturerCode,
  nvic,
  tareWeight,
  gvm,
  gcm,
  ppsrStatus,
  marketData,
  reportId,
  searchDate,
  certificateNumber,
  ppsrSearchNumber
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

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const overallStatus = !ppsrStatus.hasFinance && !ppsrStatus.isStolen && !ppsrStatus.isWrittenOff ? 'clear' : 'alert'

  return (
    <div className="w-full max-w-7xl mx-auto bg-white" style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      {/* Premium Header */}
      <div className="relative bg-white border-b-2 border-gray-100">
        <div className="px-12 py-8">
          <div className="flex items-center justify-between">
            {/* Logo matching website */}
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-2.5 rounded-lg shadow-md">
                <Car className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Car Verify</h1>
                <p className="text-[11px] text-blue-600 font-semibold uppercase tracking-wider">Authorised PPSR Provider</p>
              </div>
            </div>

            {/* Report Metadata */}
            <div className="text-right space-y-1">
              <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">Report ID</div>
              <div className="font-mono text-sm text-gray-900 font-semibold">{reportId}</div>
              <div className="text-xs text-gray-500">{formatDate(searchDate)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Status Banner */}
      <div className="px-12 py-10">
        <div className={`relative overflow-hidden rounded-2xl ${overallStatus === 'clear' ? 'bg-gradient-to-br from-emerald-500 to-green-600' : 'bg-gradient-to-br from-red-500 to-rose-600'} p-10 shadow-2xl`}>
          {/* Decorative background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="bg-white/20 backdrop-blur-xl p-5 rounded-2xl">
                {overallStatus === 'clear' ? (
                  <CheckCircle className="w-16 h-16 text-white" strokeWidth={2.5} />
                ) : (
                  <AlertTriangle className="w-16 h-16 text-white" strokeWidth={2.5} />
                )}
              </div>
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">
                  {overallStatus === 'clear' ? 'All Clear' : 'Issues Detected'}
                </h2>
                <p className="text-white/90 text-lg font-medium">
                  {overallStatus === 'clear'
                    ? 'This vehicle has passed all security checks'
                    : 'This vehicle has recorded issues requiring attention'}
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl px-6 py-4 rounded-xl border border-white/20">
              <div className="text-white/80 text-sm uppercase tracking-wider mb-1">Status</div>
              <div className="text-white text-2xl font-bold">
                {overallStatus === 'clear' ? 'VERIFIED' : 'ALERT'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-12 pb-12 space-y-8">
        {/* Vehicle Details Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Car className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Vehicle Information</h3>
            </div>
          </div>
          <div className="p-8">
            {/* Hero Vehicle Info */}
            {make && model && year && (
              <div className="mb-8 pb-8 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">
                      {year} {make} {model}
                    </h2>
                    <div className="flex items-center gap-3 text-gray-600">
                      {variant && <span className="font-medium">{variant}</span>}
                      {series && variant && <span>•</span>}
                      {series && <span className="font-medium">{series}</span>}
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      {bodyType && <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm font-medium">{bodyType}</span>}
                      {color && <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm font-medium">{color}</span>}
                    </div>
                  </div>

                  <div className="text-right bg-gray-50 px-6 py-4 rounded-lg">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Registration</div>
                    <div className="text-3xl font-bold text-gray-900">{rego}</div>
                    <div className="text-sm text-gray-600 mt-1">{state}</div>
                    {regoExpiry && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="text-xs text-gray-500">Expires</div>
                        <div className="text-sm font-semibold text-gray-900">{formatDateShort(regoExpiry)}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Identification Numbers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {vin && (
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">VIN</div>
                  <div className="text-sm font-mono font-semibold text-gray-900">{vin}</div>
                </div>
              )}
              {chassis && (
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Chassis Number</div>
                  <div className="text-sm font-mono font-semibold text-gray-900">{chassis}</div>
                </div>
              )}
              {engine && (
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Engine Number</div>
                  <div className="text-sm font-mono font-semibold text-gray-900">{engine}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Technical Specifications Card */}
        {(transmissionType || fuelType || engineCapacity || cylinders) && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="px-8 py-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Gauge className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Technical Specifications</h3>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {transmissionType && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Transmission</div>
                    <div className="text-lg font-bold text-gray-900">{transmissionType}</div>
                  </div>
                )}
                {fuelType && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Fuel Type</div>
                    <div className="text-lg font-bold text-gray-900">{fuelType}</div>
                  </div>
                )}
                {engineCapacity && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Engine Size</div>
                    <div className="text-lg font-bold text-gray-900">{engineCapacity}</div>
                  </div>
                )}
                {cylinders && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Cylinders</div>
                    <div className="text-lg font-bold text-gray-900">{cylinders}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Compliance & Build Card */}
        {(complianceDate || buildDate || manufacturerCode || nvic) && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="px-8 py-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Compliance & Build Information</h3>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {complianceDate && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Compliance Date</div>
                    <div className="text-lg font-bold text-gray-900">{formatDateShort(complianceDate)}</div>
                  </div>
                )}
                {buildDate && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Build Date</div>
                    <div className="text-lg font-bold text-gray-900">{formatDateShort(buildDate)}</div>
                  </div>
                )}
                {manufacturerCode && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Manufacturer Code</div>
                    <div className="text-sm font-mono font-semibold text-gray-900">{manufacturerCode}</div>
                  </div>
                )}
                {nvic && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">NVIC</div>
                    <div className="text-sm font-mono font-semibold text-gray-900">{nvic}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Weights & Capacity Card */}
        {(tareWeight || gvm || gcm) && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="px-8 py-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <Wrench className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Weights & Capacity</h3>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {tareWeight && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Tare Weight</div>
                    <div className="text-2xl font-bold text-gray-900">{tareWeight}</div>
                  </div>
                )}
                {gvm && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">GVM</div>
                    <div className="text-2xl font-bold text-gray-900">{gvm}</div>
                    <div className="text-xs text-gray-500 mt-1">Gross Vehicle Mass</div>
                  </div>
                )}
                {gcm && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">GCM</div>
                    <div className="text-2xl font-bold text-gray-900">{gcm}</div>
                    <div className="text-xs text-gray-500 mt-1">Gross Combination Mass</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PPSR Security Check */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="px-8 py-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">PPSR Security Check</h3>
            </div>
          </div>
          <div className="p-8">
            <div className="space-y-5">
              {/* Finance Check */}
              <div className={`p-6 rounded-2xl border-2 shadow-lg ${ppsrStatus.hasFinance ? 'bg-gradient-to-br from-red-50 to-rose-50 border-red-400' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl shadow-md ${ppsrStatus.hasFinance ? 'bg-red-100' : 'bg-green-100'}`}>
                      {ppsrStatus.hasFinance ? (
                        <XCircle className="w-10 h-10 text-red-600 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="w-10 h-10 text-green-600 flex-shrink-0" />
                      )}
                    </div>
                    <div>
                      <h4 className={`text-xl font-black ${ppsrStatus.hasFinance ? 'text-red-900' : 'text-green-900'}`}>
                        Finance / Money Owing
                      </h4>
                      <p className={`text-base ${ppsrStatus.hasFinance ? 'text-red-700' : 'text-green-700'} mt-1`}>
                        {ppsrStatus.hasFinance ? 'Finance or security interest registered' : 'No finance or money owing'}
                      </p>
                      {ppsrStatus.hasFinance && (
                        <div className="mt-3 space-y-1">
                          {ppsrStatus.financeAmount && (
                            <p className="text-base text-red-900 font-bold">
                              Amount: {ppsrStatus.financeAmount}
                            </p>
                          )}
                          {ppsrStatus.financier && (
                            <p className="text-sm text-red-800 font-semibold">
                              Financier: {ppsrStatus.financier}
                            </p>
                          )}
                          {ppsrStatus.securedParty && (
                            <p className="text-sm text-red-800">
                              Secured Party: {ppsrStatus.securedParty}
                            </p>
                          )}
                          {ppsrStatus.registrationDate && (
                            <p className="text-xs text-red-700">
                              Registered: {formatDateShort(ppsrStatus.registrationDate)}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-black shadow-md ${ppsrStatus.hasFinance ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
                    {ppsrStatus.hasFinance ? 'ALERT' : 'CLEAR'}
                  </div>
                </div>
              </div>

              {/* Stolen Check */}
              <div className={`p-6 rounded-2xl border-2 shadow-lg ${ppsrStatus.isStolen ? 'bg-gradient-to-br from-red-50 to-rose-50 border-red-400' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl shadow-md ${ppsrStatus.isStolen ? 'bg-red-100' : 'bg-green-100'}`}>
                      {ppsrStatus.isStolen ? (
                        <XCircle className="w-10 h-10 text-red-600 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="w-10 h-10 text-green-600 flex-shrink-0" />
                      )}
                    </div>
                    <div>
                      <h4 className={`text-xl font-black ${ppsrStatus.isStolen ? 'text-red-900' : 'text-green-900'}`}>
                        Stolen Vehicle Status
                      </h4>
                      <p className={`text-base ${ppsrStatus.isStolen ? 'text-red-700' : 'text-green-700'} mt-1`}>
                        {ppsrStatus.isStolen ? 'This vehicle has been reported stolen' : 'Not reported as stolen'}
                      </p>
                      {ppsrStatus.isStolen && ppsrStatus.stolenDate && (
                        <p className="text-sm text-red-900 font-bold mt-2">
                          Reported stolen: {formatDateShort(ppsrStatus.stolenDate)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-black shadow-md ${ppsrStatus.isStolen ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
                    {ppsrStatus.isStolen ? 'ALERT' : 'CLEAR'}
                  </div>
                </div>
              </div>

              {/* Write-off Check */}
              <div className={`p-6 rounded-2xl border-2 shadow-lg ${ppsrStatus.isWrittenOff ? 'bg-gradient-to-br from-red-50 to-rose-50 border-red-400' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl shadow-md ${ppsrStatus.isWrittenOff ? 'bg-red-100' : 'bg-green-100'}`}>
                      {ppsrStatus.isWrittenOff ? (
                        <XCircle className="w-10 h-10 text-red-600 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="w-10 h-10 text-green-600 flex-shrink-0" />
                      )}
                    </div>
                    <div>
                      <h4 className={`text-xl font-black ${ppsrStatus.isWrittenOff ? 'text-red-900' : 'text-green-900'}`}>
                        Written-Off Vehicle (WOVR)
                      </h4>
                      <p className={`text-base ${ppsrStatus.isWrittenOff ? 'text-red-700' : 'text-green-700'} mt-1`}>
                        {ppsrStatus.isWrittenOff ? 'Vehicle has been written off' : 'No write-off history'}
                      </p>
                      {ppsrStatus.isWrittenOff && (
                        <div className="mt-2 space-y-1">
                          {ppsrStatus.writeOffCategory && (
                            <p className="text-base text-red-900 font-bold">
                              Category: {ppsrStatus.writeOffCategory}
                            </p>
                          )}
                          {ppsrStatus.writeOffDate && (
                            <p className="text-sm text-red-800">
                              Date: {formatDateShort(ppsrStatus.writeOffDate)}
                            </p>
                          )}
                          {ppsrStatus.jurisdiction && (
                            <p className="text-xs text-red-700">
                              Jurisdiction: {ppsrStatus.jurisdiction}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-sm font-black shadow-md ${ppsrStatus.isWrittenOff ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
                    {ppsrStatus.isWrittenOff ? 'ALERT' : 'CLEAR'}
                  </div>
                </div>
              </div>

              {/* Security Interests Warning */}
              {ppsrStatus.securityInterests && ppsrStatus.securityInterests > 0 && (
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-yellow-100 p-3 rounded-xl shadow-md">
                      <AlertTriangle className="w-10 h-10 text-yellow-600 flex-shrink-0" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-yellow-900">Security Interests Registered</h4>
                      <p className="text-base text-yellow-700 mt-1">
                        {ppsrStatus.securityInterests} security interest{ppsrStatus.securityInterests > 1 ? 's' : ''} registered against this vehicle
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Encumbrances Details */}
              {ppsrStatus.encumbrances && ppsrStatus.encumbrances.length > 0 && (
                <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-300 rounded-2xl p-6 shadow-lg">
                  <h4 className="text-lg font-black text-orange-900 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2" />
                    Encumbrance Details
                  </h4>
                  <div className="space-y-3">
                    {ppsrStatus.encumbrances.map((encumbrance, index) => (
                      <div key={index} className="bg-white p-4 rounded-xl border border-orange-200 shadow-sm">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600 font-semibold">Type:</span>
                            <span className="ml-2 text-gray-900 font-bold">{encumbrance.type}</span>
                          </div>
                          <div>
                            <span className="text-gray-600 font-semibold">Registered By:</span>
                            <span className="ml-2 text-gray-900 font-bold">{encumbrance.registeredBy}</span>
                          </div>
                          {encumbrance.amount && (
                            <div>
                              <span className="text-gray-600 font-semibold">Amount:</span>
                              <span className="ml-2 text-gray-900 font-bold">{encumbrance.amount}</span>
                            </div>
                          )}
                          <div>
                            <span className="text-gray-600 font-semibold">Date:</span>
                            <span className="ml-2 text-gray-900 font-bold">{formatDateShort(encumbrance.date)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Market Valuation (if available) */}
        {marketData && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="px-8 py-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-50 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Market Valuation</h3>
              </div>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {marketData.retailValue && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Retail Value</div>
                    <div className="text-4xl font-bold text-gray-900 mb-1">{marketData.retailValue}</div>
                    <div className="text-sm text-gray-600">Dealership price</div>
                  </div>
                )}
                {marketData.privateValue && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Private Sale</div>
                    <div className="text-4xl font-bold text-gray-900 mb-1">{marketData.privateValue}</div>
                    <div className="text-sm text-gray-600">Private party</div>
                  </div>
                )}
                {marketData.tradeValue && (
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Trade-In Value</div>
                    <div className="text-4xl font-bold text-gray-900 mb-1">{marketData.tradeValue}</div>
                    <div className="text-sm text-gray-600">Dealer trade-in</div>
                  </div>
                )}
              </div>

              {marketData.priceChange && (
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className={`w-6 h-6 ${marketData.priceChange.startsWith('+') ? 'text-green-600' : 'text-red-600'}`} />
                      <span className="text-base text-gray-700 font-medium">Market trend (last 30 days)</span>
                    </div>
                    <span className={`text-2xl font-bold ${marketData.priceChange.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {marketData.priceChange}
                    </span>
                  </div>
                  {marketData.listingsFound && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        Based on {marketData.listingsFound} similar vehicles currently listed for sale
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Report Information */}
      <div className="px-12 py-8 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Search Date & Time</div>
            <div className="text-sm font-medium text-gray-900">{formatDate(searchDate)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Report ID</div>
            <div className="text-sm font-mono font-semibold text-gray-900">{reportId}</div>
          </div>
          {certificateNumber && (
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">PPSR Certificate</div>
              <div className="text-sm font-mono font-semibold text-gray-900">{certificateNumber}</div>
            </div>
          )}
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-lg p-5">
          <p className="text-sm text-gray-700 leading-relaxed">
            This report is based on data from the Australian Personal Property Securities Register (PPSR) and other official sources at the time of search. Car Verify is an authorized PPSR information broker.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white px-12 py-10 border-t-2 border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-2.5 rounded-lg">
              <Car className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-xl">Car Verify</div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Authorised PPSR Provider</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">Need help?</div>
            <div className="text-sm font-semibold">support@carverify.com.au</div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
          © 2024 Car Verify. All rights reserved.
        </div>
      </div>
    </div>
  )
}

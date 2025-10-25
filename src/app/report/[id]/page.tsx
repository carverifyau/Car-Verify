'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Shield, AlertTriangle, CheckCircle, DollarSign, Download, Share } from 'lucide-react'
import Link from 'next/link'
import { VehicleReport } from '@/lib/api/report-service'

export default function ReportPage() {
  const params = useParams()
  const reportId = params.id as string
  const [report, setReport] = useState<VehicleReport | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadReport = async () => {
      try {
        // Try to load from localStorage first (for demo)
        const storedReport = localStorage.getItem('currentReport')
        if (storedReport) {
          const parsedReport = JSON.parse(storedReport)
          if (parsedReport.id === reportId) {
            setReport(parsedReport)
            setLoading(false)
            return
          }
        }

        // Otherwise, fetch from API
        const response = await fetch(`/api/reports/generate?id=${reportId}`)
        const result = await response.json()

        if (result.success) {
          setReport(result.report)
        } else {
          setError(result.error || 'Report not found')
        }
      } catch {
        setError('Failed to load report')
      } finally {
        setLoading(false)
      }
    }

    loadReport()
  }, [reportId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading report...</p>
        </div>
      </div>
    )
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Report Not Found</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    )
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'high': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'N/A'
    return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Rego Reports</span>
            </Link>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Share className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Report Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Vehicle History Report</h1>
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(report.summary.riskLevel)}`}>
              {report.summary.riskLevel.toUpperCase()} RISK
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Vehicle Information</h3>
              <div className="space-y-1 text-sm">
                {report.vehicleIdentifier.type === 'vin' ? (
                  <p><span className="text-gray-600">VIN:</span> {report.vehicleIdentifier.vin}</p>
                ) : (
                  <>
                    <p><span className="text-gray-600">Registration:</span> {report.vehicleIdentifier.rego}</p>
                    <p><span className="text-gray-600">State:</span> {report.vehicleIdentifier.state}</p>
                  </>
                )}
                {report.nevdis && (
                  <>
                    <p><span className="text-gray-600">Make:</span> {report.nevdis.make}</p>
                    <p><span className="text-gray-600">Model:</span> {report.nevdis.model}</p>
                    <p><span className="text-gray-600">Year:</span> {report.nevdis.year}</p>
                    <p><span className="text-gray-600">Body Type:</span> {report.nevdis.bodyType}</p>
                    <p><span className="text-gray-600">Colour:</span> {report.nevdis.colour}</p>
                  </>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Report Details</h3>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-600">Report Type:</span> {report.reportType}</p>
                <p><span className="text-gray-600">Generated:</span> {new Date(report.generatedAt).toLocaleString()}</p>
                <p><span className="text-gray-600">Report ID:</span> {report.id}</p>
                <p><span className="text-gray-600">Generation Time:</span> {(report.completionTime / 1000).toFixed(1)}s</p>
                <p><span className="text-gray-600">Data Quality:</span>
                  <span className={`ml-1 font-semibold ${
                    report.dataQuality === 'complete' ? 'text-green-600' :
                    report.dataQuality === 'partial' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {report.dataQuality.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className={`p-4 rounded-lg ${report.summary.isFinanceOwing ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
            <div className="flex items-center space-x-2">
              {report.summary.isFinanceOwing ? (
                <AlertTriangle className="h-5 w-5 text-red-500" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
              <span className="font-semibold">Finance</span>
            </div>
            <p className="text-sm mt-1">
              {report.summary.isFinanceOwing ? 'Finance Owing' : 'Finance Clear'}
            </p>
          </div>

          <div className={`p-4 rounded-lg ${report.summary.isStolen ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
            <div className="flex items-center space-x-2">
              {report.summary.isStolen ? (
                <AlertTriangle className="h-5 w-5 text-red-500" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
              <span className="font-semibold">Stolen</span>
            </div>
            <p className="text-sm mt-1">
              {report.summary.isStolen ? 'Reported Stolen' : 'Not Stolen'}
            </p>
          </div>

          <div className={`p-4 rounded-lg ${report.summary.isWrittenOff ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
            <div className="flex items-center space-x-2">
              {report.summary.isWrittenOff ? (
                <AlertTriangle className="h-5 w-5 text-red-500" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
              <span className="font-semibold">Write-off</span>
            </div>
            <p className="text-sm mt-1">
              {report.summary.isWrittenOff ? 'Previously Written Off' : 'No Write-off'}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-blue-500" />
              <span className="font-semibold">Market Value</span>
            </div>
            <p className="text-sm mt-1">
              {formatCurrency(report.summary.marketValue)}
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8">
          {/* PPSR Section */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              PPSR Certificate
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Search Date: {new Date(report.ppsr.searchDate).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600 mb-4">Certificate: {report.ppsr.certificateNumber}</p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-gray-50">
                    <span>Finance Owing:</span>
                    <span className={`font-semibold ${report.ppsr.isFinanceOwing ? 'text-red-600' : 'text-green-600'}`}>
                      {report.ppsr.isFinanceOwing ? 'YES' : 'NO'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-gray-50">
                    <span>Stolen:</span>
                    <span className={`font-semibold ${report.ppsr.isStolen ? 'text-red-600' : 'text-green-600'}`}>
                      {report.ppsr.isStolen ? 'YES' : 'NO'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-gray-50">
                    <span>Written Off:</span>
                    <span className={`font-semibold ${report.ppsr.isWrittenOff ? 'text-red-600' : 'text-green-600'}`}>
                      {report.ppsr.isWrittenOff ? 'YES' : 'NO'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* NEVDIS Section (if available) */}
          {report.nevdis && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                NEVDIS Vehicle Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Vehicle Details</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Make:</span> {report.nevdis.make}</p>
                    <p><span className="text-gray-600">Model:</span> {report.nevdis.model}</p>
                    <p><span className="text-gray-600">Year:</span> {report.nevdis.year}</p>
                    <p><span className="text-gray-600">Body Type:</span> {report.nevdis.bodyType}</p>
                    <p><span className="text-gray-600">Colour:</span> {report.nevdis.colour}</p>
                    <p><span className="text-gray-600">Engine:</span> {report.nevdis.engineNumber}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Status Check</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded bg-gray-50">
                      <span>Write-off Status:</span>
                      <span className={`font-semibold ${report.nevdis.isWrittenOff ? 'text-red-600' : 'text-green-600'}`}>
                        {report.nevdis.isWrittenOff ? report.nevdis.writeOffType?.toUpperCase() || 'YES' : 'CLEAR'}
                      </span>
                    </div>
                    {report.nevdis.writeOffDate && (
                      <p className="text-sm text-gray-600">Write-off Date: {report.nevdis.writeOffDate}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pricing Section (if available) */}
          {report.pricing && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Market Valuation
              </h2>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Retail Value</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(report.pricing.retailValue)}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Private Sale</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(report.pricing.privateValue)}</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-600">Trade Value</p>
                  <p className="text-2xl font-bold text-yellow-600">{formatCurrency(report.pricing.tradeValue)}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Market Analysis</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Market Position:</span> {report.pricing.marketPosition}</p>
                    <p><span className="text-gray-600">Price Confidence:</span> {report.pricing.priceConfidence}</p>
                    <p><span className="text-gray-600">Price Trend:</span> {report.pricing.priceChange}</p>
                    <p><span className="text-gray-600">Market Listings:</span> {report.pricing.marketListings}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Price History</h3>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">30 Days Ago:</span> {formatCurrency(report.pricing.price30Days)}</p>
                    <p><span className="text-gray-600">90 Days Ago:</span> {formatCurrency(report.pricing.price90Days)}</p>
                    <p><span className="text-gray-600">Data Source:</span> {report.pricing.dataSource}</p>
                    <p><span className="text-gray-600">Last Updated:</span> {new Date(report.pricing.lastUpdated).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Risk Analysis */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Risk Analysis</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2 text-red-600">Risk Factors</h3>
                {report.riskFactors.length > 0 ? (
                  <ul className="space-y-1">
                    {report.riskFactors.map((factor, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-600">No significant risk factors identified.</p>
                )}
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-blue-600">Recommendations</h3>
                <ul className="space-y-1">
                  {report.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Errors/Warnings */}
          {report.errors && report.errors.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-yellow-800 mb-2">Data Limitations</h2>
              <ul className="space-y-1">
                {report.errors.map((error, index) => (
                  <li key={index} className="text-sm text-yellow-700">• {error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="border-t pt-8">
            <p className="text-sm text-gray-600 mb-4">
              This report was generated on {new Date(report.generatedAt).toLocaleString()} and is valid for the vehicle identified above.
            </p>
            <Link href="/" className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <span>Generate Another Report</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
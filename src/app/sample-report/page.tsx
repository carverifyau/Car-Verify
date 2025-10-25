'use client'

import { useState } from 'react'
import { Shield, CheckCircle, AlertTriangle, ArrowLeft, Download, TrendingUp, Brain, Target, Star, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function SampleReportPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const sampleData = {
    vehicle: {
      rego: "DEMO123",
      state: "NSW",
      year: 2020,
      make: "Toyota",
      model: "Camry",
      variant: "Ascent Sport",
      bodyType: "Sedan",
      engine: "2.5L 4-Cylinder",
      fuel: "Petrol",
      transmission: "CVT",
      odometer: 45000,
      colour: "Silver"
    },
    status: {
      ppsr: "clear",
      stolen: "clear",
      writeOff: "clear"
    },
    valuations: {
      retail: 28500,
      private: 25800,
      trade: 22200
    },
    marketAnalysis: {
      demand: "High",
      trend: "Stable",
      reliability: "Excellent",
      marketHeat: 4,
      negotiationRange: {
        starting: 28500,
        target: 26500,
        walkaway: 24500
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">Car Verify</span>
                <div className="text-xs text-blue-600 font-medium">SAMPLE REPORT</div>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <a
                href="/api/sample-report"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </a>
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 text-sm font-medium">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Report Header */}
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Vehicle History Report</h1>
                <p className="text-gray-600">Comprehensive analysis for demonstration purposes</p>
              </div>
              <div className="text-right">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  ✓ All Clear
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500">Registration</label>
                <div className="text-lg font-semibold text-gray-900">{sampleData.vehicle.rego} ({sampleData.vehicle.state})</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Vehicle</label>
                <div className="text-lg font-semibold text-gray-900">{sampleData.vehicle.year} {sampleData.vehicle.make} {sampleData.vehicle.model}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Variant</label>
                <div className="text-lg font-semibold text-gray-900">{sampleData.vehicle.variant}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Odometer</label>
                <div className="text-lg font-semibold text-gray-900">{sampleData.vehicle.odometer.toLocaleString()} km</div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div
            className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-8">
                {[
                  { id: 'overview', label: 'Overview', icon: Shield },
                  { id: 'security', label: 'Security Checks', icon: CheckCircle },
                  { id: 'market', label: 'Market Analysis', icon: TrendingUp },
                  { id: 'pricing', label: 'Pricing & Valuations', icon: Target }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-8">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Vehicle Overview</h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Body Type:</span>
                          <span className="font-medium text-gray-900">{sampleData.vehicle.bodyType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Engine:</span>
                          <span className="font-medium text-gray-900">{sampleData.vehicle.engine}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fuel Type:</span>
                          <span className="font-medium text-gray-900">{sampleData.vehicle.fuel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Transmission:</span>
                          <span className="font-medium text-gray-900">{sampleData.vehicle.transmission}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Colour:</span>
                          <span className="font-medium text-gray-900">{sampleData.vehicle.colour}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Summary</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="text-gray-900">No finance owing (PPSR Clear)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="text-gray-900">Not reported stolen</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span className="text-gray-900">No write-off history</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Star className="h-5 w-5 text-yellow-500" />
                          <span className="text-gray-900">Excellent reliability rating</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Checks Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Security & Legal Checks</h2>

                  <div className="grid gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        <h3 className="text-lg font-semibold text-gray-900">PPSR Security Interest Check</h3>
                      </div>
                      <p className="text-gray-700 mb-3">
                        <strong>Status:</strong> Clear - No security interests registered
                      </p>
                      <p className="text-sm text-gray-600">
                        This vehicle has no money owing against it and is clear of any security interests,
                        liens, or encumbrances registered on the Personal Property Securities Register.
                      </p>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Stolen Vehicle Check</h3>
                      </div>
                      <p className="text-gray-700 mb-3">
                        <strong>Status:</strong> Not reported stolen
                      </p>
                      <p className="text-sm text-gray-600">
                        This vehicle has been checked against national stolen vehicle databases and
                        has not been reported as stolen.
                      </p>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Write-off History</h3>
                      </div>
                      <p className="text-gray-700 mb-3">
                        <strong>Status:</strong> No write-off history found
                      </p>
                      <p className="text-sm text-gray-600">
                        This vehicle has not been recorded as a statutory write-off, repairable write-off,
                        or flood damaged vehicle in our records.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Market Analysis Tab */}
              {activeTab === 'market' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Market Analysis & Intelligence</h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Heat Indicator</h3>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <div
                                key={star}
                                className={`text-2xl ${star <= sampleData.marketAnalysis.marketHeat ? 'text-orange-500' : 'text-gray-300'}`}
                              >
                                🔥
                              </div>
                            ))}
                          </div>
                          <span className="text-lg font-semibold">Hot Market</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          High demand for this vehicle model with strong market interest.
                          Expect competitive pricing and quick sales.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Reliability Rating</h3>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-6 w-6 ${star <= 5 ? 'text-green-500 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                          <span className="text-lg font-semibold">Excellent</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Toyota Camry has an outstanding reliability record with high owner satisfaction
                          and low maintenance costs.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Smart Negotiation Tips</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Research similar vehicles in your area to support your negotiation</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Get a pre-purchase inspection to identify any potential issues</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>High demand market - be prepared to act quickly and negotiate less aggressively</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Excellent reliability record - expect to pay closer to asking price</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>Be prepared to walk away if the deal doesn't meet your expectations</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Pricing Tab */}
              {activeTab === 'pricing' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Pricing & Valuations</h2>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Trade-in Value</h3>
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        ${sampleData.valuations.trade.toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-600">What a dealer would pay</p>
                    </div>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Private Sale Value</h3>
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        ${sampleData.valuations.private.toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-600">Realistic private sale price</p>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Retail Value</h3>
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        ${sampleData.valuations.retail.toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-600">Dealer selling price</p>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Negotiation Guidance</h3>
                    <div className="grid md:grid-cols-3 gap-4 text-center">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Starting Point</label>
                        <div className="text-xl font-bold text-gray-900">
                          ${sampleData.marketAnalysis.negotiationRange.starting.toLocaleString()}
                        </div>
                        <p className="text-xs text-gray-500">Initial offer range</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Target Price</label>
                        <div className="text-xl font-bold text-green-600">
                          ${sampleData.marketAnalysis.negotiationRange.target.toLocaleString()}
                        </div>
                        <p className="text-xs text-gray-500">Realistic goal</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Walk-away Price</label>
                        <div className="text-xl font-bold text-red-600">
                          ${sampleData.marketAnalysis.negotiationRange.walkaway.toLocaleString()}
                        </div>
                        <p className="text-xs text-gray-500">Maximum you should pay</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-center text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-4">Get Your Own Comprehensive Report</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              This is just a sample of what our reports include. Get a real report for any Australian vehicle
              with instant delivery and 30-day money-back guarantee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <Shield className="h-5 w-5" />
                <span>Get Real Report</span>
              </Link>
              <a
                href="/api/sample-report"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
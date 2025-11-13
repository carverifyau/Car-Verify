'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, TrendingUp, FileText, AlertTriangle, Award } from 'lucide-react'
import { useState } from 'react'

export default function CheckNowPage() {
  const [searchType, setSearchType] = useState<'rego' | 'vin'>('rego')

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-red-600">
            Car Verify
          </Link>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold text-gray-700">4.9/5 Rating</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-gray-900 text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Protect Yourself From Buying a<br />Car With Hidden Problems
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Get a complete vehicle history report including finance checks, stolen status, write-off history, and expert market valuation.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Official PPSR Database</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">10,000+ Reports Delivered</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
              <FileText className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">Instant Digital Delivery</span>
            </div>
          </div>
        </div>

        {/* Main CTA Form */}
        <div className="bg-white rounded-xl shadow-xl p-8 border border-gray-200 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Any Australian Vehicle</h2>
            <p className="text-gray-600">Enter your details below to get started</p>
          </div>

          <form action="/" method="GET" className="space-y-5">
            {/* Search Type Toggle */}
            <div className="flex gap-3 p-1 bg-gray-100 rounded-lg">
              <button
                type="button"
                onClick={() => setSearchType('rego')}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                  searchType === 'rego'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Registration Number
              </button>
              <button
                type="button"
                onClick={() => setSearchType('vin')}
                className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                  searchType === 'vin'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                VIN Number
              </button>
            </div>

            {searchType === 'rego' ? (
              <>
                {/* State Selector */}
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                    Select State
                  </label>
                  <select
                    id="state"
                    name="state"
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-900"
                    required
                  >
                    <option value="">Choose your state...</option>
                    <option value="NSW">NSW - New South Wales</option>
                    <option value="VIC">VIC - Victoria</option>
                    <option value="QLD">QLD - Queensland</option>
                    <option value="SA">SA - South Australia</option>
                    <option value="WA">WA - Western Australia</option>
                    <option value="TAS">TAS - Tasmania</option>
                    <option value="ACT">ACT - Australian Capital Territory</option>
                    <option value="NT">NT - Northern Territory</option>
                  </select>
                </div>

                {/* Rego Number */}
                <div>
                  <label htmlFor="rego" className="block text-sm font-medium text-gray-700 mb-2">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    id="rego"
                    name="rego"
                    placeholder="e.g., ABC123 or 1ABC123"
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-900 placeholder-gray-400"
                    required
                  />
                </div>
              </>
            ) : (
              <>
                {/* VIN Number */}
                <div>
                  <label htmlFor="vin" className="block text-sm font-medium text-gray-700 mb-2">
                    VIN Number (17 characters)
                  </label>
                  <input
                    type="text"
                    id="vin"
                    name="vin"
                    placeholder="e.g., 1HGBH41JXMN109186"
                    maxLength={17}
                    className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-900 placeholder-gray-400 font-mono"
                    required
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Find your VIN on the dashboard, door jamb, or registration papers
                  </p>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Shield className="h-5 w-5" />
              Get My Vehicle Report
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Secure checkout</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Instant delivery</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>Money-back guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Your Complete Vehicle History Report Includes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Finance Check */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-red-50 rounded-lg p-3 flex-shrink-0">
                  <AlertTriangle className="h-7 w-7 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Finance & Security Interest Check</h3>
                  <p className="text-gray-600 mb-3">
                    Discover if there's outstanding finance or money owing on the vehicle. If there is, the lender can legally repossess the car from you—even after you've paid for it.
                  </p>
                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-red-700">
                      1 in 4 used cars in Australia has finance owing
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stolen Check */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-orange-50 rounded-lg p-3 flex-shrink-0">
                  <Shield className="h-7 w-7 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Stolen Vehicle Status</h3>
                  <p className="text-gray-600 mb-3">
                    Verify the vehicle hasn't been reported stolen. Buying a stolen car means police will seize it immediately and you'll lose your money with no recourse.
                  </p>
                  <div className="bg-orange-50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-orange-700">
                      Over 50,000 vehicles stolen in Australia annually
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Write-Off Check */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-50 rounded-lg p-3 flex-shrink-0">
                  <FileText className="h-7 w-7 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Written-Off Vehicle History</h3>
                  <p className="text-gray-600 mb-3">
                    Check if the vehicle was previously declared a total loss by an insurance company. Write-offs can have hidden structural damage that costs thousands to repair.
                  </p>
                  <div className="bg-yellow-50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-yellow-700">
                      Statutory write-offs cannot be re-registered
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Valuation */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-green-50 rounded-lg p-3 flex-shrink-0">
                  <TrendingUp className="h-7 w-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Market Valuation</h3>
                  <p className="text-gray-600 mb-3">
                    Get an accurate market value based on make, model, year, condition, and mileage. Know if you're paying a fair price or being overcharged.
                  </p>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-sm font-semibold text-green-700">
                      Benchmarked against 100,000+ vehicle sales
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary CTA */}
          <div className="text-center mt-12">
            <a
              href="#top"
              className="inline-block bg-blue-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-md"
            >
              Check My Vehicle Now
            </a>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Trusted by 10,000+ Australian Car Buyers</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex gap-1 mb-4">
              {[1,2,3,4,5].map(i => (
                <Award key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 mb-4">
              "Report showed $18,000 in outstanding finance that the seller didn't mention. This check literally saved me from financial disaster."
            </p>
            <p className="text-sm font-semibold text-gray-900">Michael T., Melbourne VIC</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex gap-1 mb-4">
              {[1,2,3,4,5].map(i => (
                <Award key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 mb-4">
              "Discovered the car was a repairable write-off. Used the report to negotiate $5,000 off the asking price. Absolutely worth it."
            </p>
            <p className="text-sm font-semibold text-gray-900">Sarah L., Sydney NSW</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex gap-1 mb-4">
              {[1,2,3,4,5].map(i => (
                <Award key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 mb-4">
              "Report arrived within minutes. Clear, detailed, and gave me complete confidence in my purchase decision. Highly recommend."
            </p>
            <p className="text-sm font-semibold text-gray-900">James K., Brisbane QLD</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">
            Protect Your Investment
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Don't risk losing thousands on a car with hidden problems. Get the full history before you commit.
          </p>

          <a
            href="#top"
            className="inline-block bg-white text-blue-600 px-12 py-5 rounded-lg text-xl font-bold hover:bg-gray-50 transition-colors shadow-xl"
          >
            Get My Vehicle Report Now
          </a>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-blue-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Official PPSR data</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Instant delivery</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>Secure checkout</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm mb-2">
            © 2024 Car Verify Australia. All rights reserved.
          </p>
          <p className="text-xs">
            Official PPSR (Personal Property Securities Register) reports. Secure payment processing. Money-back guarantee.
          </p>
        </div>
      </footer>
    </div>
  )
}

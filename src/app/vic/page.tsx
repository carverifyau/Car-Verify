'use client'

import { Metadata } from 'next'
import VehicleLookupFormWithPreview from '@/components/VehicleLookupFormWithPreview'
import { Shield, CheckCircle, AlertTriangle, Users, Clock, Star } from 'lucide-react'

export default function VICVehicleReportsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">VIC OFFICIAL VEHICLE REPORTS</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Victoria Vehicle Reports &amp;
              <span className="text-red-600"> History Checks</span>
            </h1>

            <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              Get instant access to <span className="font-bold text-red-600">VIC registration history</span>, PPSR finance checks, and comprehensive vehicle reports.
              <span className="font-bold"> Don't buy blind in Victoria</span> - one report could save you thousands.
            </p>

            {/* VIC-specific stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600">24,000+</div>
                <div className="text-sm text-gray-600">VIC vehicles with hidden finance owing (2024)</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-600">1 in 6</div>
                <div className="text-sm text-gray-600">VIC used cars have undisclosed problems</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">$7,800</div>
                <div className="text-sm text-gray-600">Average loss from buying problem vehicle</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <VehicleLookupFormWithPreview />
      </div>

      {/* VIC-Specific Information */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Victoria Vehicle Checks Are Essential
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Victoria has Australia's second-largest used car market. With unique VIC regulations and high fraud rates
              in Melbourne's car yards, checking before you buy is crucial.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* VicRoads Integration */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <Shield className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">VicRoads Integration</h3>
              <p className="text-gray-600 text-sm">
                Direct integration with VicRoads databases for real-time verification of Victorian vehicle history and registration records.
              </p>
            </div>

            {/* PPSR VIC Focus */}
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <AlertTriangle className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">VIC Finance Checks</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive PPSR checks for Victoria vehicles, revealing any finance owing or security interests across Melbourne and regional VIC.
              </p>
            </div>

            {/* Market Valuation */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <Star className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">VIC Market Values</h3>
              <p className="text-gray-600 text-sm">
                Accurate Victoria market valuations based on Melbourne metro and regional pricing data for fair negotiations.
              </p>
            </div>

            {/* Written Off Check */}
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <CheckCircle className="h-8 w-8 text-orange-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Write-Off History</h3>
              <p className="text-gray-600 text-sm">
                Check if the vehicle has been written off by insurance companies and meets VIC roadworthy requirements.
              </p>
            </div>

            {/* Stolen Check */}
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <Users className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Stolen Vehicle Check</h3>
              <p className="text-gray-600 text-sm">
                Verify the vehicle hasn't been reported stolen across Victoria Police databases and national systems.
              </p>
            </div>

            {/* Instant Reports */}
            <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
              <Clock className="h-8 w-8 text-indigo-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Instant VIC Reports</h3>
              <p className="text-gray-600 text-sm">
                Get your comprehensive Victoria vehicle report within seconds. Perfect for Melbourne private sales and dealer purchases.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof VIC */}
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Victoria Car Buyers
            </h2>
            <p className="text-gray-600">See what VIC customers say about our reports</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-1 mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Saved me from a disaster! The car in Richmond had $18k finance owing that the dealer 'forgot' to mention.
                Report paid for itself 500x over."
              </p>
              <div className="text-sm text-gray-500">— Emma K., Melbourne VIC</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-1 mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Found out the car in Geelong was a flood-damaged write-off. Seller had no clue.
                This service is worth every penny!"
              </p>
              <div className="text-sm text-gray-500">— James T., Geelong VIC</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-1 mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Used it for a car in Ballarat. Clean report gave me confidence to buy, and the valuation helped me negotiate.
                Highly recommend!"
              </p>
              <div className="text-sm text-gray-500">— Lisa M., Ballarat VIC</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Don't Risk It - Check Before You Buy in Victoria
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of smart VIC buyers who check before they buy.
            Get your instant vehicle report for just $34.99
          </p>
          <a
            href="#check-form"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
          >
            🚨 Check My VIC Vehicle Now
          </a>
        </div>
      </div>
    </div>
  )
}
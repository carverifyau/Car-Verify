'use client'

import { Metadata } from 'next'
import VehicleLookupFormWithPreview from '@/components/VehicleLookupFormWithPreview'
import { Shield, CheckCircle, AlertTriangle, Users, Clock, Star } from 'lucide-react'

export default function NSWVehicleReportsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">NSW OFFICIAL VEHICLE REPORTS</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              NSW Vehicle Reports &amp;
              <span className="text-red-600"> History Checks</span>
            </h1>

            <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              Get instant access to <span className="font-bold text-red-600">NSW registration history</span>, PPSR finance checks, and comprehensive vehicle reports.
              <span className="font-bold"> Don't buy blind in NSW</span> - one report could save you thousands.
            </p>

            {/* NSW-specific stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600">32,000+</div>
                <div className="text-sm text-gray-600">NSW vehicles with hidden finance owing (2024)</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-600">1 in 5</div>
                <div className="text-sm text-gray-600">NSW used cars have undisclosed problems</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">$8,400</div>
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

      {/* NSW-Specific Information */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why NSW Vehicle Checks Are Critical
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              NSW has the largest used car market in Australia. With over 2.5 million vehicle transactions annually,
              the risk of fraud and hidden problems is significant.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* NSW Transport Integration */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <Shield className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">NSW Transport Integration</h3>
              <p className="text-gray-600 text-sm">
                Direct integration with NSW registration databases for real-time verification of vehicle history and ownership records.
              </p>
            </div>

            {/* PPSR NSW Focus */}
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <AlertTriangle className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">NSW Finance Checks</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive PPSR checks specifically for NSW vehicles, revealing any finance owing or security interests registered.
              </p>
            </div>

            {/* Market Valuation */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <Star className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">NSW Market Values</h3>
              <p className="text-gray-600 text-sm">
                Accurate NSW market valuations based on local pricing data, helping you negotiate the best deal in Sydney and beyond.
              </p>
            </div>

            {/* Written Off Check */}
            <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
              <CheckCircle className="h-8 w-8 text-orange-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Write-Off History</h3>
              <p className="text-gray-600 text-sm">
                Check if the vehicle has been written off by insurance companies and if it's been legally repaired for NSW roads.
              </p>
            </div>

            {/* Stolen Check */}
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
              <Users className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Stolen Vehicle Check</h3>
              <p className="text-gray-600 text-sm">
                Verify the vehicle hasn't been reported stolen across NSW and national databases before you buy.
              </p>
            </div>

            {/* Instant Reports */}
            <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
              <Clock className="h-8 w-8 text-indigo-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Instant NSW Reports</h3>
              <p className="text-gray-600 text-sm">
                Get your comprehensive NSW vehicle report within seconds, not days. Perfect for private sales and dealer purchases.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof NSW */}
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by NSW Car Buyers
            </h2>
            <p className="text-gray-600">Don't take our word for it - see what NSW customers say</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-1 mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Saved me $12,000! Found out the car I was about to buy in Sydney had $15k finance owing.
                Best $35 I've ever spent."
              </p>
              <div className="text-sm text-gray-500">— Sarah M., Sydney NSW</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-1 mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The report showed the car was a repairable write-off. The seller in Newcastle had no idea!
                Dodged a bullet."
              </p>
              <div className="text-sm text-gray-500">— Mike R., Newcastle NSW</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-1 mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Used it for a car in Wollongong. Report came back instantly and helped me negotiate $3k off the price.
                Highly recommend!"
              </p>
              <div className="text-sm text-gray-500">— David L., Wollongong NSW</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Don't Risk It - Check Before You Buy in NSW
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of smart NSW buyers who check before they buy.
            Get your instant vehicle report for just $34.99
          </p>
          <a
            href="#check-form"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
          >
            🚨 Check My NSW Vehicle Now
          </a>
        </div>
      </div>
    </div>
  )
}
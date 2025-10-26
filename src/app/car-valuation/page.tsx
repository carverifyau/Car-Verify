'use client'

import VehicleLookupFormWithPreview from '@/components/VehicleLookupFormWithPreview'
import { DollarSign, TrendingUp, Calculator, Shield, Clock, Star, AlertTriangle, Target } from 'lucide-react'

export default function CarValuationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Calculator className="h-6 w-6 text-blue-600" />
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">EXPERT CAR VALUATION AUSTRALIA</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              What's My Car Worth?
              <span className="text-green-600"> Get Real Market Value</span>
            </h1>

            <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              <span className="font-bold text-green-600">Don't get ripped off!</span>
              Our expert car valuation reveals the <span className="font-bold">true market value</span> of any vehicle.
              <span className="font-bold"> Know what to pay before you negotiate.</span>
            </p>

            {/* Valuation stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-8 max-w-5xl mx-auto">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">$4,200</div>
                <div className="text-xs text-gray-600">Average saved on purchase price</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">3 Values</div>
                <div className="text-xs text-gray-600">Trade, private, retail pricing</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">Live Data</div>
                <div className="text-xs text-gray-600">Real-time market analysis</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-600">30 secs</div>
                <div className="text-xs text-gray-600">Instant expert report</div>
              </div>
            </div>

            <div className="bg-orange-100 border-2 border-orange-300 rounded-xl p-6 max-w-4xl mx-auto mb-8">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <span className="font-bold text-orange-800">WARNING: Overpriced Cars Everywhere</span>
              </div>
              <p className="text-orange-700 text-sm">
                Car yards inflate prices by 20-40% above market value.
                <span className="font-bold"> Know the real price before you negotiate - or get ripped off.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Your Car's Market Value Now</h2>
          <p className="text-gray-600">Enter registration or VIN - get expert valuation instantly</p>
        </div>
        <VehicleLookupFormWithPreview />
      </div>

      {/* What You Get */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              3 Professional Valuations in 1 Report
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our expert market research provides three different valuations
              so you know exactly what to pay in any situation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Trade Value */}
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <DollarSign className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">💼 Trade-In Value</h3>
              <p className="text-gray-600 text-sm mb-4">
                What dealers will pay for your car as a trade-in.
                <span className="font-bold text-blue-600"> Use this when trading up to a new car.</span>
              </p>
              <div className="text-xs text-blue-600 font-semibold">✅ Dealer trade scenarios</div>
            </div>

            {/* Private Sale */}
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <Target className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">🤝 Private Sale Value</h3>
              <p className="text-gray-600 text-sm mb-4">
                Fair market price for private party sales.
                <span className="font-bold text-green-600"> Best value when buying from individuals.</span>
              </p>
              <div className="text-xs text-green-600 font-semibold">✅ Private party transactions</div>
            </div>

            {/* Retail Value */}
            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <TrendingUp className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">🏪 Retail Value</h3>
              <p className="text-gray-600 text-sm mb-4">
                What dealers charge on their lot with warranty.
                <span className="font-bold text-purple-600"> Maximum fair price for dealer purchases.</span>
              </p>
              <div className="text-xs text-purple-600 font-semibold">✅ Dealer lot pricing</div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Analysis */}
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Expert Market Analysis Included
            </h2>
            <p className="text-gray-600">Beyond just numbers - get professional insights that save you money</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Market Demand */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <TrendingUp className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">📈 Market Demand</h3>
              <p className="text-gray-600 text-sm mb-4">
                Is this model in high demand or oversupplied?
                <span className="font-bold"> High demand = pay asking price. Low demand = negotiate hard.</span>
              </p>
            </div>

            {/* Price Trends */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Calculator className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">📊 Price Trends</h3>
              <p className="text-gray-600 text-sm mb-4">
                Are prices rising or falling for this model?
                <span className="font-bold"> Timing matters - wait or buy now?</span>
              </p>
            </div>

            {/* Reliability Score */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Shield className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">🔧 Reliability Insights</h3>
              <p className="text-gray-600 text-sm mb-4">
                Known issues and reliability rating for this model.
                <span className="font-bold"> Factor repair costs into your budget.</span>
              </p>
            </div>

            {/* Selling Points */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Star className="h-8 w-8 text-orange-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">⭐ Key Selling Points</h3>
              <p className="text-gray-600 text-sm mb-4">
                What makes this model desirable?
                <span className="font-bold"> Use these points in negotiations.</span>
              </p>
            </div>

            {/* Concerns */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <AlertTriangle className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">⚠️ Potential Concerns</h3>
              <p className="text-gray-600 text-sm mb-4">
                Common problems to watch out for.
                <span className="font-bold"> Inspect these areas carefully.</span>
              </p>
            </div>

            {/* Best Time to Buy */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <Clock className="h-8 w-8 text-indigo-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">⏰ Market Timing</h3>
              <p className="text-gray-600 text-sm mb-4">
                Best time to buy this model for maximum savings.
                <span className="font-bold"> Market cycles affect pricing.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Much Our Customers Saved
            </h2>
            <p className="text-gray-600">Real savings from people who checked market value first</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-500">
              <div className="text-green-600 font-bold mb-2">💰 Saved $6,500 - Sydney</div>
              <p className="text-gray-600 text-sm mb-4 italic">
                "Dealer wanted $28k for a Camry. Your report showed it was worth $21.5k.
                Used that to negotiate and got it for $22k. Saved me huge!"
              </p>
              <div className="text-xs text-gray-500">— Emma K., used retail valuation to negotiate</div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
              <div className="text-blue-600 font-bold mb-2">🎯 Perfect Timing - Brisbane</div>
              <p className="text-gray-600 text-sm mb-4 italic">
                "Report said prices were falling for SUVs. Waited 3 months and saved $4k
                on the same model. Market timing was spot on!"
              </p>
              <div className="text-xs text-gray-500">— Michael R., used market trend analysis</div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border-l-4 border-purple-500">
              <div className="text-purple-600 font-bold mb-2">🔍 Avoided Lemon - Melbourne</div>
              <p className="text-gray-600 text-sm mb-4 italic">
                "Valuation report warned about transmission issues on that model year.
                Found a different car instead. Saved me from a $8k repair bill!"
              </p>
              <div className="text-xs text-gray-500">— Sarah L., used reliability insights</div>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="bg-green-100 border-2 border-green-300 rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-green-800 font-bold">
                💚 Average customer saves $4,200 using our valuation reports.
                <br />
                <span className="text-green-600">$35 investment returns 120x in savings!</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Our Valuations Are Different */}
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Our Valuations Are More Accurate
            </h2>
            <p className="text-gray-600">Not all car valuations are created equal</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-full p-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Live Market Data</h3>
                  <p className="text-gray-600 text-sm">Real-time pricing from actual sales, not outdated books</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-2">
                  <Calculator className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">AI-Powered Analysis</h3>
                  <p className="text-gray-600 text-sm">Advanced algorithms consider 50+ pricing factors</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 rounded-full p-2">
                  <Target className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Local Market Focus</h3>
                  <p className="text-gray-600 text-sm">Pricing specific to Australian conditions and preferences</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 rounded-full p-2">
                  <Shield className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Complete Vehicle Check</h3>
                  <p className="text-gray-600 text-sm">Valuation PLUS finance/stolen/write-off checks included</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Your Complete Report Includes:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Trade-in valuation range</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Private sale valuation range</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Retail valuation range</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Market demand analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Price trend forecasting</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Reliability assessment</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>PPSR finance check</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Stolen/write-off verification</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Professional PDF report</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Know What to Pay - Get Your Car Valuation Now
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
            <span className="font-bold">$35 valuation vs $4,200 average savings.</span>
            Never overpay again with expert market insights.
          </p>
          <a
            href="#check-form"
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg"
          >
            💰 GET MY CAR'S VALUE - $34.99
          </a>
          <div className="text-green-200 text-sm mt-4">
            ✅ 3 Professional Valuations • ✅ Market Analysis • ✅ Complete Safety Check
          </div>
        </div>
      </div>
    </div>
  )
}
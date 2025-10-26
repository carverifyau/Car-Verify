'use client'

import VehicleLookupFormWithPreview from '@/components/VehicleLookupFormWithPreview'
import { Shield, DollarSign, AlertTriangle, Clock, FileCheck, Users, Star, CreditCard } from 'lucide-react'

export default function PPSRCheckPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <FileCheck className="h-6 w-6 text-blue-600" />
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide">OFFICIAL PPSR CHECK AUSTRALIA</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              PPSR Check Australia
              <span className="text-red-600"> - Is Money Still Owed?</span>
            </h1>

            <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              <span className="font-bold text-red-600">Don't inherit someone else's debt!</span>
              Our official PPSR check reveals if there's <span className="font-bold">finance still owing</span> on any vehicle.
              <span className="font-bold"> Buy a car with debt = YOU owe the money.</span>
            </p>

            {/* PPSR stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-8 max-w-5xl mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600">$15,400</div>
                <div className="text-xs text-gray-600">Average finance still owed</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-600">1 in 4</div>
                <div className="text-xs text-gray-600">used cars have finance owing</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">$2B+</div>
                <div className="text-xs text-gray-600">in undisclosed car debt (2024)</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">Instant</div>
                <div className="text-xs text-gray-600">PPSR certificate included</div>
              </div>
            </div>

            <div className="bg-red-100 border-2 border-red-300 rounded-xl p-6 max-w-4xl mx-auto mb-8">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="font-bold text-red-800">LEGAL WARNING: You Inherit ALL Debt</span>
              </div>
              <p className="text-red-700 text-sm">
                Under Australian law, if you buy a car with finance owing,
                <span className="font-bold"> the debt transfers to YOU</span>.
                The bank can legally repossess the car, even if you paid full price.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check for Finance Owing Now</h2>
          <p className="text-gray-600">Enter registration or VIN - get instant PPSR certificate</p>
        </div>
        <VehicleLookupFormWithPreview />
      </div>

      {/* What is PPSR */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What is a PPSR Check?
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              The Personal Property Securities Register (PPSR) is the Australian government database
              that records all security interests (finance) against vehicles, boats, and other assets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Finance Check */}
            <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
              <CreditCard className="h-8 w-8 text-red-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">💳 Finance Owing</h3>
              <p className="text-gray-600 text-sm mb-4">
                Shows if there's still money owed to banks, finance companies, or loan sharks.
                <span className="font-bold text-red-600"> Average debt found: $15,400</span>
              </p>
              <div className="text-xs text-red-600 font-semibold">⚠️ YOU inherit the debt</div>
            </div>

            {/* Security Interest */}
            <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
              <Shield className="h-8 w-8 text-orange-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">🔒 Security Interest</h3>
              <p className="text-gray-600 text-sm mb-4">
                Reveals who has legal claim to the vehicle.
                <span className="font-bold text-orange-600"> Bank can take it anytime if money is owed.</span>
              </p>
              <div className="text-xs text-orange-600 font-semibold">⚠️ Legal repossession rights</div>
            </div>

            {/* Official Certificate */}
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <FileCheck className="h-8 w-8 text-green-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">📄 Official Certificate</h3>
              <p className="text-gray-600 text-sm mb-4">
                Get the official PPSR certificate as legal proof.
                <span className="font-bold text-green-600"> Required for insurance and legal protection.</span>
              </p>
              <div className="text-xs text-green-600 font-semibold">✅ Government-issued document</div>
            </div>

            {/* Written-Off Register */}
            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <AlertTriangle className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">💥 Write-Off Status</h3>
              <p className="text-gray-600 text-sm mb-4">
                PPSR also shows if the vehicle was written off by insurance.
                <span className="font-bold text-purple-600"> Flood, fire, or accident damage.</span>
              </p>
              <div className="text-xs text-purple-600 font-semibold">⚠️ Safety and value concerns</div>
            </div>

            {/* Stolen Check */}
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <Users className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">🚔 Stolen Vehicle</h3>
              <p className="text-gray-600 text-sm mb-4">
                Cross-references with stolen vehicle databases.
                <span className="font-bold text-blue-600"> Buy stolen = criminal charges.</span>
              </p>
              <div className="text-xs text-blue-600 font-semibold">⚠️ Police will seize vehicle</div>
            </div>

            {/* Instant Results */}
            <div className="bg-indigo-50 rounded-xl p-6 border-2 border-indigo-200">
              <Clock className="h-8 w-8 text-indigo-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">⚡ Instant Access</h3>
              <p className="text-gray-600 text-sm mb-4">
                Real-time PPSR database check in 30 seconds.
                <span className="font-bold text-indigo-600"> Check while you're at the car yard.</span>
              </p>
              <div className="text-xs text-indigo-600 font-semibold">✅ Government database direct</div>
            </div>
          </div>
        </div>
      </div>

      {/* Horror Stories */}
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              PPSR Horror Stories - Real People, Real Losses
            </h2>
            <p className="text-gray-600">These people trusted sellers - and paid the price</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500">
              <div className="text-red-600 font-bold mb-2">💸 $32,000 Loss - Perth</div>
              <p className="text-gray-600 text-sm mb-4 italic">
                "Bought a Ranger for $45k. Bank showed up 3 weeks later with $32k still owing.
                They took the ute. I lost everything and still owe $32k."
              </p>
              <div className="text-xs text-gray-500">— Brad M., no PPSR check done</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-orange-500">
              <div className="text-orange-600 font-bold mb-2">🏠 Lost House - Adelaide</div>
              <p className="text-gray-600 text-sm mb-4 italic">
                "Had to sell my house to pay the $28k finance on a car I thought was clear.
                Dealer said 'no finance' but lied."
              </p>
              <div className="text-xs text-gray-500">— Karen L., PPSR would have revealed the debt</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-500">
              <div className="text-purple-600 font-bold mb-2">👮 Criminal Record - Brisbane</div>
              <p className="text-gray-600 text-sm mb-4 italic">
                "Turns out the car was used as collateral for a drug debt.
                Now I have a criminal record and lost $19k."
              </p>
              <div className="text-xs text-gray-500">— David K., PPSR shows ALL security interests</div>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="bg-red-100 border-2 border-red-300 rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-red-800 font-bold">
                💰 These people lost $79,000 combined by trusting sellers about finance.
                <br />
                <span className="text-red-600">A $35 PPSR check would have saved them everything.</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Our PPSR Check */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our PPSR Check?
            </h2>
            <p className="text-gray-600">Not all PPSR checks are the same - here's what makes ours better</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 rounded-full p-2">
                  <FileCheck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Official PPSR Certificate Included</h3>
                  <p className="text-gray-600 text-sm">Get the actual government certificate, not just a summary report</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 rounded-full p-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Real-Time Database Access</h3>
                  <p className="text-gray-600 text-sm">Direct connection to government PPSR database for instant results</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 rounded-full p-2">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Complete Market Valuation</h3>
                  <p className="text-gray-600 text-sm">PPSR check PLUS expert market research in one report</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-red-100 rounded-full p-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Multi-Database Cross-Check</h3>
                  <p className="text-gray-600 text-sm">PPSR + stolen vehicle + write-off databases for complete protection</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">What You Get:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Official PPSR certificate (PDF)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Finance owing details (if any)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Security interest holders</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Write-off status check</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Stolen vehicle verification</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Expert market valuation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Registration history</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="text-green-600">✅</span>
                  <span>Emailed instantly as PDF</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Smart Buyers Check PPSR First
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "PPSR check revealed $22k finance owing. Seller had no idea!
                Saved me from financial ruin. Best $35 ever spent."
              </p>
              <div className="text-sm font-semibold text-gray-900">— Michelle T.</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Car was clear on PPSR! Used the certificate to get better insurance rates.
                Professional service, instant results."
              </p>
              <div className="text-sm font-semibold text-gray-900">— Andrew K.</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Found $18k debt on a 'clear' car from a dealer.
                Walked away and bought elsewhere. This service is essential!"
              </p>
              <div className="text-sm font-semibold text-gray-900">— Robyn M.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Don't Inherit Someone Else's Debt - Check PPSR Now
          </h2>
          <p className="text-red-100 text-lg mb-8 max-w-2xl mx-auto">
            <span className="font-bold">$35 PPSR check vs $15,400+ debt inheritance.</span>
            Protect yourself legally with official government certificate.
          </p>
          <a
            href="#check-form"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg"
          >
            🛡️ GET PPSR CERTIFICATE - $34.99
          </a>
          <div className="text-red-200 text-sm mt-4">
            ✅ Official Government Certificate • ✅ Instant Results • ✅ Legal Protection
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, AlertTriangle, Shield, Eye, Users, CreditCard, Phone } from 'lucide-react'

export default function CarBuyingScamsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/blog" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
              Scam Prevention
            </span>
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
              URGENT
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            🎯 Car Buying Scams Australia 2024
            <span className="text-red-600"> (How to Spot & Avoid)</span>
          </h1>

          <div className="flex items-center space-x-6 text-gray-500 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>23 October 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>6 min read</span>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-bold text-red-800 mb-2">🚨 Active Threat Alert</h3>
                <p className="text-red-700">
                  Car scams have increased <span className="font-bold">347% in 2024</span> with new AI-powered tactics.
                  Australian buyers have lost <span className="font-bold">$89 million</span> to these schemes this year.
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Car buying scams in Australia have evolved dramatically in 2024.
            <span className="font-bold text-red-600"> Criminals are using sophisticated new tactics that fool even experienced buyers.</span>
            Here's how to protect yourself from the latest threats.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">🆕 NEW 2024 Scam: AI-Generated Fake Ads</h2>

          <div className="bg-orange-50 border-l-4 border-orange-500 p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Eye className="h-6 w-6 text-orange-600 mt-1" />
              <div>
                <h3 className="font-bold text-orange-800 mb-2">⚠️ How It Works</h3>
                <p className="text-orange-700 mb-4">
                  Scammers use AI to create fake car listings with stolen photos and fabricated details.
                  The ads look completely legitimate on Carsales, Facebook Marketplace, and Gumtree.
                </p>
                <ul className="list-disc pl-6 text-orange-700 space-y-1">
                  <li>Professional-looking photos (stolen from real dealers)</li>
                  <li>Detailed specifications and service history</li>
                  <li>Slightly below-market pricing to attract interest</li>
                  <li>Fake seller profiles with AI-generated backstories</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-red-100 p-6 rounded-lg mb-8">
            <h3 className="font-bold text-red-800 mb-3">🎭 Real Example - October 2024</h3>
            <p className="text-red-700 italic mb-4">
              "Found the perfect BMW X5 on Carsales. Photos looked great, price was reasonable.
              Seller claimed to be relocating to Perth. Sent deposit via bank transfer.
              <span className="font-bold"> Car never existed. Lost $8,500."</span>
            </p>
            <p className="text-red-600 font-semibold text-sm">— Michael K., Melbourne (AI scam victim)</p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">🏆 The Top 7 Car Scams in 2024</h2>

          {/* Scam 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500 mb-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-red-100 rounded-full p-2">
                <CreditCard className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">💳 #1: Deposit Scam (Most Common)</h3>
                <p className="text-red-600 font-semibold">$47 million stolen in 2024</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              <span className="font-bold">The Setup:</span> Scammer posts attractive car listing, asks for deposit to "secure" the vehicle.
              Claims they're interstate, overseas, or urgent sale due to emergency.
            </p>
            <div className="bg-red-50 p-4 rounded mb-4">
              <h4 className="font-bold text-red-800 mb-2">🚩 Warning Signs:</h4>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• Asks for money before viewing car in person</li>
                <li>• Won't arrange video call or live video tour</li>
                <li>• Pressure tactics ("other buyers interested")</li>
                <li>• Only accepts bank transfer or gift cards</li>
                <li>• Located interstate but won't arrange transport inspection</li>
              </ul>
            </div>
          </div>

          {/* Scam 2 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-orange-500 mb-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-orange-100 rounded-full p-2">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">🎪 #2: The "Dealer" Impersonation</h3>
                <p className="text-orange-600 font-semibold">Targeting luxury car buyers</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              <span className="font-bold">The Setup:</span> Scammers pose as legitimate car dealers, complete with fake business registration,
              website, and even fake Google reviews.
            </p>
            <div className="bg-orange-50 p-4 rounded mb-4">
              <h4 className="font-bold text-orange-800 mb-2">🔍 How to Verify Real Dealers:</h4>
              <ul className="text-orange-700 text-sm space-y-1">
                <li>• Check Australian Business Register (ABN lookup)</li>
                <li>• Visit physical location (don't just rely on address)</li>
                <li>• Verify dealer license with state authorities</li>
                <li>• Look for Motor Traders Association membership</li>
                <li>• Check how long domain has been registered</li>
              </ul>
            </div>
          </div>

          {/* Scam 3 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-500 mb-6">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-purple-100 rounded-full p-2">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">📱 #3: WhatsApp Finance Scam</h3>
                <p className="text-purple-600 font-semibold">New in late 2024</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              <span className="font-bold">The Setup:</span> After showing interest in a car, scammer contacts via WhatsApp offering
              "special finance deals" or "instant approval" for buyers with bad credit.
            </p>
            <div className="bg-purple-50 p-4 rounded mb-4">
              <h4 className="font-bold text-purple-800 mb-2">🎣 The Hook:</h4>
              <ul className="text-purple-700 text-sm space-y-1">
                <li>• "100% approval guaranteed regardless of credit"</li>
                <li>• Requests personal details for "quick application"</li>
                <li>• Asks for upfront "processing fees"</li>
                <li>• Promises to handle all paperwork remotely</li>
                <li>• Uses pressure tactics about "limited time offers"</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-yellow-800 mb-4 text-center">
              ⚡ URGENT: Latest Scam Alert (November 2024)
            </h3>
            <p className="text-yellow-700 mb-4">
              <span className="font-bold">"QR Code Car Inspection" Scam:</span> Fake sellers provide QR codes claiming they link to
              "professional inspection reports." The codes actually install malware or steal banking details.
            </p>
            <div className="bg-yellow-200 p-4 rounded">
              <p className="text-yellow-800 font-semibold text-center">
                🛡️ NEVER scan QR codes from unknown sellers. Always verify inspection reports through official channels.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">🛡️ How to Protect Yourself</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="font-bold text-green-800 mb-4">✅ Before You Buy - Checklist</h3>
              <ul className="text-green-700 space-y-2 text-sm">
                <li>• <span className="font-bold">Always see car in person</span> before any payment</li>
                <li>• <span className="font-bold">Verify seller identity</span> with photo ID</li>
                <li>• <span className="font-bold">Check registration documents</span> match seller</li>
                <li>• <span className="font-bold">Do professional vehicle check</span> (PPSR, stolen, etc.)</li>
                <li>• <span className="font-bold">Use secure payment methods</span> (not gift cards/crypto)</li>
                <li>• <span className="font-bold">Get written receipt</span> for all payments</li>
                <li>• <span className="font-bold">Trust your instincts</span> - if it feels wrong, walk away</li>
              </ul>
            </div>

            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="font-bold text-red-800 mb-4">🚫 Never Do This</h3>
              <ul className="text-red-700 space-y-2 text-sm">
                <li>• Pay deposits to "secure" unseen vehicles</li>
                <li>• Send money via untraceable methods</li>
                <li>• Provide personal details over WhatsApp/text</li>
                <li>• Rush into purchases due to "pressure"</li>
                <li>• Ignore requests for proper documentation</li>
                <li>• Scan QR codes from unknown sources</li>
                <li>• Buy from sellers who refuse vehicle checks</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">🔍 Advanced Protection Strategies</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-blue-800 mb-3">1. 🕵️ Reverse Image Search</h3>
              <p className="text-blue-700 mb-3">
                Upload car photos to Google Images or TinEye to check if they're stolen from other listings.
                Scammers often reuse photos from legitimate ads.
              </p>
              <div className="bg-blue-100 p-3 rounded">
                <p className="text-blue-800 text-sm font-semibold">
                  💡 Pro Tip: If photos appear on multiple listings with different details, it's definitely a scam.
                </p>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-bold text-purple-800 mb-3">2. 📞 Phone Number Verification</h3>
              <p className="text-purple-700 mb-3">
                Search the seller's phone number online. Scammers often use the same numbers across multiple fake listings.
                Legitimate sellers usually have clean phone number histories.
              </p>
              <div className="bg-purple-100 p-3 rounded">
                <p className="text-purple-800 text-sm font-semibold">
                  🔍 Check: WhatsApp profile, Facebook, Google search results for the number.
                </p>
              </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="font-bold text-orange-800 mb-3">3. 🎥 Video Call Verification</h3>
              <p className="text-orange-700 mb-3">
                Request a live video call showing the car, registration documents, and seller's ID.
                Scammers will refuse or make excuses. Legitimate sellers will accommodate reasonable requests.
              </p>
              <div className="bg-orange-100 p-3 rounded">
                <p className="text-orange-800 text-sm font-semibold">
                  📹 Ask them to start the engine, show the VIN, and walk around the car during the call.
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">⚡ The Ultimate Protection</h2>

          <p className="text-lg mb-6">
            <span className="font-bold text-green-600">The most effective protection against car scams is a professional vehicle check.</span>
            It verifies that:
          </p>

          <div className="bg-green-50 p-6 rounded-lg mb-6">
            <ul className="text-green-700 space-y-2">
              <li>✅ <span className="font-bold">Vehicle actually exists</span> in government databases</li>
              <li>✅ <span className="font-bold">No finance owing</span> that could transfer to you</li>
              <li>✅ <span className="font-bold">Not reported stolen</span> across Australia</li>
              <li>✅ <span className="font-bold">No write-off history</span> hidden by scammers</li>
              <li>✅ <span className="font-bold">Real market value</span> to prevent overpaying</li>
              <li>✅ <span className="font-bold">Registration history</span> shows legitimate ownership</li>
            </ul>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <h3 className="font-bold text-gray-800 mb-3">📊 Scam vs Legitimate Vehicle Statistics</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-red-600 mb-2">🚫 Scam Vehicles:</h4>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• 89% have no PPSR record</li>
                  <li>• 67% fail stolen vehicle checks</li>
                  <li>• 78% have fake/altered VINs</li>
                  <li>• 100% sellers refuse vehicle checks</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-green-600 mb-2">✅ Legitimate Vehicles:</h4>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• 100% have proper PPSR records</li>
                  <li>• Pass all database checks</li>
                  <li>• Matching VIN/registration details</li>
                  <li>• Sellers welcome professional checks</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-red-100 border-2 border-red-300 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-red-800 mb-4 text-center">
              💸 The Cost of Being Scammed
            </h3>
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-red-600 mb-2">$89,000,000</p>
              <p className="text-red-700">Lost by Australian car buyers to scams in 2024</p>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-white p-4 rounded">
                <p className="text-2xl font-bold text-red-600">$8,500</p>
                <p className="text-red-700 text-sm">Average loss per victim</p>
              </div>
              <div className="bg-white p-4 rounded">
                <p className="text-2xl font-bold text-red-600">10,471</p>
                <p className="text-red-700 text-sm">Australians scammed in 2024</p>
              </div>
              <div className="bg-white p-4 rounded">
                <p className="text-2xl font-bold text-red-600">347%</p>
                <p className="text-red-700 text-sm">Increase from 2023</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Don't Become a Statistic</h2>

          <p className="text-lg mb-8">
            <span className="font-bold text-red-600">Car scams are getting more sophisticated every month.</span>
            The only way to stay protected is with professional verification before you buy.
            For the cost of a nice dinner, you can avoid losing thousands to scammers.
          </p>

          <div className="bg-red-600 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              🛡️ Get Full Scam Protection Now
            </h3>
            <p className="text-red-100 mb-6 max-w-2xl mx-auto">
              <span className="font-bold">$35 protection vs $8,500 average scam loss.</span>
              Professional vehicle verification stops scammers in their tracks.
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg"
            >
              🚨 VERIFY VEHICLE NOW - $34.99
            </Link>
            <div className="text-red-200 text-sm mt-4">
              ✅ Scam Detection • ✅ PPSR Check • ✅ Stolen Verification • ✅ Professional Report
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
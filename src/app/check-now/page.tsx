import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, TrendingUp, FileText, AlertTriangle, Clock, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Get Your Full Car History Report - Instant Results | $34.99',
  description: 'Complete car history check in 60 seconds. REVS check, stolen status, write-offs, price valuation & market research. Protect yourself from buying a problem car.',
  robots: 'noindex, nofollow', // Don't index landing page - only for paid traffic
}

export default function CheckNowPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Minimal Header - No distractions */}
      <header className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-red-600">
            Car Verify
          </Link>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold text-black">4.9/5 Rating</span>
          </div>
        </div>
      </header>

      {/* Hero Section - Above the fold */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-black text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Don't Buy a Car With Hidden Problems
          </h1>
          <p className="text-xl text-gray-700 mb-6 max-w-2xl mx-auto">
            Get a complete car history report in 60 seconds. Check finance owing, stolen status, write-offs, and get expert price valuation.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
              <Clock className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold text-green-700">Results in 60 Seconds</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">Official PPSR Database</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-lg border border-purple-200">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-semibold text-purple-700">10,000+ Reports Delivered</span>
            </div>
          </div>
        </div>

        {/* Main CTA Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-red-600 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              LIMITED TIME: $34.99 (Normally $49.99)
            </div>
            <h2 className="text-2xl font-bold text-black mb-2">Enter Your Car Details</h2>
            <p className="text-gray-600">VIN or Registration Number</p>
          </div>

          <form action="/" method="GET" className="space-y-4">
            <div>
              <input
                type="text"
                name="vin"
                placeholder="Enter VIN or Rego Number (e.g., ABC123 or 1HGBH41JXMN109186)"
                className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-5 rounded-lg text-xl font-bold hover:bg-red-700 transition-colors shadow-lg flex items-center justify-center gap-3"
            >
              <Shield className="h-6 w-6" />
              Get My Car Report Now - $34.99
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-600">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span>Instant digital delivery</span>
            <span>•</span>
            <span>Secure checkout</span>
            <span>•</span>
            <span>Money-back guarantee</span>
          </div>
        </div>

        {/* What's Included */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 mb-2">↓ Here's what you get in your report ↓</p>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-gray-100 to-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-black text-center mb-10">Your Complete Car History Report Includes:</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Finance Check */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 rounded-full p-3">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Finance & Encumbrance Check</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Check if there's money owing on the car. If there is, the finance company can repossess it from YOU even after you've paid.
                  </p>
                  <p className="text-sm text-red-600 font-semibold">
                    Average loss from undisclosed finance: $15,400
                  </p>
                </div>
              </div>
            </div>

            {/* Stolen Check */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 rounded-full p-3">
                  <Shield className="h-8 w-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Stolen Vehicle Check</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Verify the car hasn't been reported stolen. Buying a stolen car means police will seize it and you lose everything.
                  </p>
                  <p className="text-sm text-orange-600 font-semibold">
                    28,922 cars stolen in Australia in 2024
                  </p>
                </div>
              </div>
            </div>

            {/* Write-Off Check */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-100 rounded-full p-3">
                  <FileText className="h-8 w-8 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Written-Off Vehicle Check</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Discover if the car was previously written off by insurance. Repairable write-offs can have hidden damage that costs thousands to fix.
                  </p>
                  <p className="text-sm text-yellow-600 font-semibold">
                    Some write-offs can never be re-registered
                  </p>
                </div>
              </div>
            </div>

            {/* Price Valuation */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 rounded-full p-3">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">Expert Price Valuation</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Get the real market value based on make, model, year, and condition. Know if you're paying too much or getting a great deal.
                  </p>
                  <p className="text-sm text-green-600 font-semibold">
                    Compare against 100,000+ similar vehicles
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary CTA */}
          <div className="text-center mt-10">
            <Link
              href="#top"
              className="inline-block bg-red-600 text-white px-12 py-5 rounded-lg text-xl font-bold hover:bg-red-700 transition-colors shadow-xl"
            >
              Get My Report Now - $34.99
            </Link>
            <p className="text-sm text-gray-600 mt-4">Results delivered instantly via email</p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-black text-center mb-10">Trusted by 10,000+ Australian Car Buyers</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex gap-1 mb-3">
              {[1,2,3,4,5].map(i => (
                <Award key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 mb-4 text-sm">
              "Saved me from buying a car with $18,000 finance owing. The seller never mentioned it. This report saved my life!"
            </p>
            <p className="text-sm font-semibold text-black">- Michael T., Melbourne</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex gap-1 mb-3">
              {[1,2,3,4,5].map(i => (
                <Award key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 mb-4 text-sm">
              "Found out the car was a repairable write-off. Negotiated $5,000 off the price. Best $35 I ever spent!"
            </p>
            <p className="text-sm font-semibold text-black">- Sarah L., Sydney</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex gap-1 mb-3">
              {[1,2,3,4,5].map(i => (
                <Award key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 mb-4 text-sm">
              "Report came through in under a minute. Clear, detailed, and exactly what I needed to make an informed decision."
            </p>
            <p className="text-sm font-semibold text-black">- James K., Brisbane</p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">
            Don't Risk Losing $15,400+
          </h2>
          <p className="text-xl text-red-100 mb-8">
            One in four cars in Australia has finance owing. Protect yourself before you buy.
          </p>

          <div className="bg-white rounded-2xl p-8 inline-block shadow-2xl">
            <div className="text-5xl font-bold text-red-600 mb-2">$34.99</div>
            <div className="text-gray-700 mb-6">Complete Car History Report</div>
            <Link
              href="#top"
              className="bg-red-600 text-white px-12 py-6 rounded-lg text-2xl font-bold hover:bg-red-700 transition-colors inline-block shadow-xl"
            >
              Get My Report Now
            </Link>
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-600">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>60 second delivery</span>
              <span>•</span>
              <span>Money-back guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm mb-4">
            © 2024 Car Verify Australia. All rights reserved. | Secure checkout with Stripe | Money-back guarantee
          </p>
          <p className="text-xs">
            Official PPSR (Personal Property Securities Register) reports. Trusted by 10,000+ Australian car buyers.
          </p>
        </div>
      </footer>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, AlertTriangle, FileText, Star, Clock, Users, TrendingDown, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'REVS Check Melbourne - Instant Vehicle Finance Check VIC | From $34.99',
  description: 'Official REVS check for Melbourne & VIC vehicles. Check finance owing, stolen status, write-offs & encumbrances on any car in Melbourne. Instant REVS certificate from $34.99',
  keywords: 'revs check melbourne, revs check vic, ppsr check melbourne, melbourne car check, finance check melbourne, stolen car check melbourne, vehicle history melbourne',
  alternates: {
    canonical: 'https://carverify.com.au/revs-check-melbourne',
  },
  openGraph: {
    title: 'REVS Check Melbourne - Vehicle Finance & Stolen Car Check VIC',
    description: 'Protect yourself when buying a car in Melbourne. Official PPSR/REVS check for all VIC vehicles. Finance, stolen & write-off checks from $34.99',
    url: 'https://carverify.com.au/revs-check-melbourne',
    siteName: 'Car Verify Australia',
    type: 'website',
  },
}

export default function RevsCheckMelbournePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="relative py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-black text-4xl md:text-6xl font-bold mb-6 leading-tight">
            REVS Check Melbourne
            <span className="block text-purple-600 mt-2">Official VIC Vehicle Finance Check</span>
          </h1>
          <p className="text-xl text-black max-w-3xl mx-auto mb-8">
            Check any Melbourne or Victorian vehicle for finance owing, stolen status & write-offs. Instant REVS certificate from <strong>$34.99</strong>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold text-black">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Users className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-semibold text-black">Melbourne's #1 Check</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Clock className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold text-black">Instant VIC Results</span>
            </div>
          </div>

          <Link href="/" className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors inline-flex items-center gap-2 shadow-lg">
            <Shield className="h-5 w-5" />
            Check Melbourne Vehicle - $34.99
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6 text-center">
            <TrendingDown className="h-12 w-12 text-red-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-red-600 mb-2">$15,400</div>
            <div className="text-sm font-semibold text-black">Average Loss</div>
            <div className="text-sm text-black">Melbourne Buyers</div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-orange-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-orange-600 mb-2">1 in 4</div>
            <div className="text-sm font-semibold text-black">VIC Cars</div>
            <div className="text-sm text-black">Have Finance</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6 text-center">
            <CheckCircle className="h-12 w-12 text-purple-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-purple-600 mb-2">60 Sec</div>
            <div className="text-sm font-semibold text-black">Melbourne Check</div>
            <div className="text-sm text-black">Results</div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-l-8 border-purple-600 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-black mb-3">⚠️ Melbourne Car Buyers - Essential Protection!</h3>
            <p className="text-lg text-black mb-4">
              Consumer Affairs Victoria warns that <strong className="text-red-600">buying a Melbourne car with finance owing means YOU inherit the debt</strong>. The finance company can repossess the vehicle even though you paid for it.
            </p>
            <p className="text-black">
              In Melbourne's massive car market, a $34.99 REVS check is essential protection. Check BEFORE you buy!
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">What Melbourne Buyers Get</h2>
        </div>

        <div className="bg-white border-4 border-purple-600 rounded-lg shadow-2xl p-8">
          <div className="border-2 border-gray-300 rounded-lg p-6">
            <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Shield className="h-10 w-10 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-black">REVS CHECK - MELBOURNE</div>
                  <div className="text-sm text-black">Victoria Vehicle Report</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-semibold text-black mb-2">Melbourne Vehicle:</div>
                <div className="bg-gray-50 rounded p-3 space-y-1 text-sm">
                  <div className="text-black"><strong>Rego:</strong> 1AB2CD (VIC)</div>
                  <div className="text-black"><strong>Make:</strong> TOYOTA</div>
                  <div className="text-black"><strong>Model:</strong> RAV4</div>
                  <div className="text-black"><strong>Year:</strong> 2022</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-black mb-2">VIC Results:</div>
                <div className="bg-green-50 border-2 border-green-500 rounded p-3 space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-black font-semibold">ALL CLEAR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-black">No Finance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-black">Not Stolen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="bg-purple-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-purple-700 transition-colors inline-flex items-center gap-3 shadow-xl">
            <FileText className="h-6 w-6" />
            Check Melbourne Car Now - $34.99
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-6">
            Melbourne's Most Trusted REVS Check
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Protect yourself when buying any car in Melbourne or VIC. Instant results.
          </p>

          <div className="bg-white rounded-xl p-8 inline-block shadow-2xl">
            <div className="text-5xl font-bold text-purple-600 mb-2">$34.99</div>
            <div className="text-black mb-6">Melbourne & VIC vehicles</div>
            <Link href="/" className="bg-purple-600 text-white px-12 py-6 rounded-lg text-2xl font-bold hover:bg-purple-700 transition-colors inline-block shadow-xl">
              Check Melbourne Vehicle
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

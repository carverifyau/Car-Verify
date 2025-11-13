import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, AlertTriangle, FileText, Star, Clock, Users, TrendingDown, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'REVS Check Perth - Instant Vehicle Finance Check WA | From $34.99',
  description: 'Official REVS check for Perth & WA vehicles. Check finance owing, stolen status, write-offs & encumbrances on any car in Perth. Instant REVS certificate from $34.99',
  keywords: 'revs check perth, revs check wa, ppsr check perth, perth car check, finance check perth, stolen car check perth, vehicle history perth',
  alternates: {
    canonical: 'https://carverify.com.au/revs-check-perth',
  },
  openGraph: {
    title: 'REVS Check Perth - Vehicle Finance & Stolen Car Check WA',
    description: 'Protect yourself when buying a car in Perth. Official PPSR/REVS check for all WA vehicles. Finance, stolen & write-off checks from $34.99',
    url: 'https://carverify.com.au/revs-check-perth',
    siteName: 'Car Verify Australia',
    type: 'website',
  },
}

export default function RevsCheckPerthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="relative py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-black text-4xl md:text-6xl font-bold mb-6 leading-tight">
            REVS Check Perth
            <span className="block text-orange-600 mt-2">Official WA Vehicle Finance Check</span>
          </h1>
          <p className="text-xl text-black max-w-3xl mx-auto mb-8">
            Check any Perth or Western Australian vehicle for finance owing, stolen status & write-offs. Instant REVS certificate from <strong>$34.99</strong>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold text-black">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Users className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-semibold text-black">Perth's Trusted Check</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-semibold text-black">Instant WA Results</span>
            </div>
          </div>

          <Link href="/checkout" className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors inline-flex items-center gap-2 shadow-lg">
            <Shield className="h-5 w-5" />
            Check Perth Vehicle - $34.99
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6 text-center">
            <TrendingDown className="h-12 w-12 text-red-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-red-600 mb-2">$15,400</div>
            <div className="text-sm font-semibold text-black">Average Loss</div>
            <div className="text-sm text-black">Perth Car Buyers</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-orange-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-orange-600 mb-2">1 in 4</div>
            <div className="text-sm font-semibold text-black">WA Cars</div>
            <div className="text-sm text-black">Have Finance</div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 text-center">
            <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-blue-600 mb-2">60 Sec</div>
            <div className="text-sm font-semibold text-black">Perth Check</div>
            <div className="text-sm text-black">Results</div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-l-8 border-orange-600 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-black mb-3">⚠️ Perth Car Buyers - Don't Risk It!</h3>
            <p className="text-lg text-black mb-4">
              Consumer Protection WA warns that <strong className="text-red-600">buying a car in Perth with finance owing means YOU inherit the debt</strong>. The finance company can repossess the vehicle even though you paid for it.
            </p>
            <p className="text-black">
              A $34.99 REVS check protects you from losing $15,400+ on a Perth car purchase. Check BEFORE you buy!
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">What Perth Buyers Get</h2>
        </div>

        <div className="bg-white border-4 border-orange-600 rounded-lg shadow-2xl p-8">
          <div className="border-2 border-gray-300 rounded-lg p-6">
            <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Shield className="h-10 w-10 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold text-black">REVS CHECK - PERTH</div>
                  <div className="text-sm text-black">Western Australia Vehicle Report</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-semibold text-black mb-2">Perth Vehicle:</div>
                <div className="bg-gray-50 rounded p-3 space-y-1 text-sm">
                  <div className="text-black"><strong>Rego:</strong> 1ABC123 (WA)</div>
                  <div className="text-black"><strong>Make:</strong> FORD</div>
                  <div className="text-black"><strong>Model:</strong> RANGER</div>
                  <div className="text-black"><strong>Year:</strong> 2020</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-black mb-2">WA Results:</div>
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
          <Link href="/checkout" className="bg-orange-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-orange-700 transition-colors inline-flex items-center gap-3 shadow-xl">
            <FileText className="h-6 w-6" />
            Check Perth Car Now - $34.99
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-6">
            Perth's Most Trusted REVS Check
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Protect yourself when buying any car in Perth or WA. Instant results.
          </p>
          
          <div className="bg-white rounded-xl p-8 inline-block shadow-2xl">
            <div className="text-5xl font-bold text-orange-600 mb-2">$34.99</div>
            <div className="text-black mb-6">Perth & WA vehicles</div>
            <Link href="/checkout" className="bg-orange-600 text-white px-12 py-6 rounded-lg text-2xl font-bold hover:bg-orange-700 transition-colors inline-block shadow-xl">
              Check Perth Vehicle
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

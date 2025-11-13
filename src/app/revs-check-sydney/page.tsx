import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, AlertTriangle, FileText, Star, Clock, Users, TrendingDown, Award } from 'lucide-react'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'REVS Check Sydney - Instant Vehicle Finance Check NSW | From $34.99',
  description: 'Official REVS check for Sydney & NSW vehicles. Check finance owing, stolen status, write-offs & encumbrances on any car in Sydney. Instant REVS certificate from $34.99',
  keywords: 'revs check sydney, revs check nsw, ppsr check sydney, sydney car check, finance check sydney, stolen car check sydney, vehicle history sydney',
  alternates: {
    canonical: 'https://carverify.com.au/revs-check-sydney',
  },
  openGraph: {
    title: 'REVS Check Sydney - Vehicle Finance & Stolen Car Check NSW',
    description: 'Protect yourself when buying a car in Sydney. Official PPSR/REVS check for all NSW vehicles. Finance, stolen & write-off checks from $34.99',
    url: 'https://carverify.com.au/revs-check-sydney',
    siteName: 'Car Verify Australia',
    type: 'website',
  },
}

export default function RevsCheckSydneyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="relative py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-black text-4xl md:text-6xl font-bold mb-6 leading-tight">
            REVS Check Sydney
            <span className="block text-blue-600 mt-2">Official NSW Vehicle Finance Check</span>
          </h1>
          <p className="text-xl text-black max-w-3xl mx-auto mb-8">
            Check any Sydney or New South Wales vehicle for finance owing, stolen status & write-offs. Instant REVS certificate from <strong>$34.99</strong>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold text-black">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-semibold text-black">Sydney's #1 Check</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Clock className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold text-black">Instant NSW Results</span>
            </div>
          </div>

          <Link href="/" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2 shadow-lg">
            <Shield className="h-5 w-5" />
            Check Sydney Vehicle - $34.99
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6 text-center">
            <TrendingDown className="h-12 w-12 text-red-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-red-600 mb-2">$15,400</div>
            <div className="text-sm font-semibold text-black">Average Loss</div>
            <div className="text-sm text-black">Sydney Buyers</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-orange-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-orange-600 mb-2">1 in 4</div>
            <div className="text-sm font-semibold text-black">NSW Cars</div>
            <div className="text-sm text-black">Have Finance</div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 text-center">
            <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-blue-600 mb-2">60 Sec</div>
            <div className="text-sm font-semibold text-black">Sydney Check</div>
            <div className="text-sm text-black">Results</div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-gradient-to-r from-blue-100 to-indigo-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-l-8 border-blue-600 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-black mb-3">⚠️ Sydney Car Buyers - Essential Protection!</h3>
            <p className="text-lg text-black mb-4">
              NSW Fair Trading warns that <strong className="text-red-600">buying a Sydney car with finance owing means YOU inherit the debt</strong>. The finance company can repossess the vehicle even though you paid for it.
            </p>
            <p className="text-black">
              In Sydney's massive car market, a $34.99 REVS check is essential protection. Check BEFORE you buy!
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">What Sydney Buyers Get</h2>
        </div>

        <div className="bg-white border-4 border-blue-600 rounded-lg shadow-2xl p-8">
          <div className="border-2 border-gray-300 rounded-lg p-6">
            <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Shield className="h-10 w-10 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-black">REVS CHECK - SYDNEY</div>
                  <div className="text-sm text-black">New South Wales Vehicle Report</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-semibold text-black mb-2">Sydney Vehicle:</div>
                <div className="bg-gray-50 rounded p-3 space-y-1 text-sm">
                  <div className="text-black"><strong>Rego:</strong> ABC123 (NSW)</div>
                  <div className="text-black"><strong>Make:</strong> MAZDA</div>
                  <div className="text-black"><strong>Model:</strong> CX-5</div>
                  <div className="text-black"><strong>Year:</strong> 2021</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-black mb-2">NSW Results:</div>
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
          <Link href="/" className="bg-blue-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-blue-700 transition-colors inline-flex items-center gap-3 shadow-xl">
            <FileText className="h-6 w-6" />
            Check Sydney Car Now - $34.99
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-6">
            Sydney's Most Trusted REVS Check
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Protect yourself when buying any car in Sydney or NSW. Instant results.
          </p>
          
          <div className="bg-white rounded-xl p-8 inline-block shadow-2xl">
            <div className="text-5xl font-bold text-blue-600 mb-2">$34.99</div>
            <div className="text-black mb-6">Sydney & NSW vehicles</div>
            <Link href="/" className="bg-blue-600 text-white px-12 py-6 rounded-lg text-2xl font-bold hover:bg-blue-700 transition-colors inline-block shadow-xl">
              Check Sydney Vehicle
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, AlertTriangle, Search, FileText, DollarSign, AlertCircle, Star, Clock, Lock, Award, TrendingDown, Users, BadgeCheck, Hash } from 'lucide-react'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'VIN Check Australia - Free VIN Number Lookup & Decoder | Car Verify',
  description: 'Free VIN check & decoder for Australian vehicles. Verify VIN number, check stolen status, find finance owing, decode specs & get full vehicle history. Instant results.',
  keywords: 'vin check, vin number check, vin decoder, vin lookup, vin check australia, vehicle identification number, vin verification',
  alternates: {
    canonical: 'https://carverify.com.au/vin-check',
  },
  openGraph: {
    title: 'VIN Check Australia - Free VIN Number Lookup & Decoder',
    description: 'Decode any VIN number instantly. PPSR check, stolen car verification & full vehicle history from $34.99',
    url: 'https://carverify.com.au/vin-check',
    siteName: 'Car Verify Australia',
    type: 'website',
  },
}

export default function VINCheckPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="relative py-16 px-4 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        
        <div className="text-center mb-12">
          <div className="inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 flex items-center gap-2">
            <Hash className="h-4 w-4" />
            VIN Number Decoder & Verification
          </div>
          <h1 className="text-black text-4xl md:text-6xl font-bold mb-6 leading-tight">
            VIN Check Australia
            <span className="block text-purple-600 mt-2">Instant Vehicle Identification Number Lookup</span>
          </h1>
          <p className="text-xl text-black max-w-3xl mx-auto mb-8">
            Decode any VIN number instantly. Get comprehensive vehicle history, PPSR check, stolen car verification & market valuation from <strong>$34.99</strong>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold text-black">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <Users className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-semibold text-black">10,000+ VIN Checks</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <Clock className="h-5 w-5 text-indigo-600" />
              <span className="text-sm font-semibold text-black">Instant Decode</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <Lock className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold text-black">Secure VIN Search</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/" className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
              <Shield className="h-5 w-5" />
              Check VIN Now - $34.99
            </Link>
            <Link href="#vin-decoder" className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-purple-600 hover:bg-purple-50 transition-colors inline-flex items-center justify-center gap-2">
              <Hash className="h-5 w-5" />
              VIN Decoder
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6 text-center">
            <TrendingDown className="h-12 w-12 text-red-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-red-600 mb-2">$15,400</div>
            <div className="text-sm font-semibold text-black">Average Loss From</div>
            <div className="text-sm text-black">Buying Without VIN Check</div>
            <div className="text-xs text-red-700 mt-2 font-medium">ASIC Consumer Report</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6 text-center">
            <Hash className="h-12 w-12 text-purple-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-purple-600 mb-2">17 Digits</div>
            <div className="text-sm font-semibold text-black">Unique VIN Number</div>
            <div className="text-sm text-black">Identifies Every Vehicle</div>
            <div className="text-xs text-purple-700 mt-2 font-medium">Universal standard</div>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-xl p-6 text-center">
            <CheckCircle className="h-12 w-12 text-indigo-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-indigo-600 mb-2">Instant</div>
            <div className="text-sm font-semibold text-black">VIN Decode &</div>
            <div className="text-sm text-black">Full Vehicle History</div>
            <div className="text-xs text-indigo-700 mt-2 font-medium">60-second results</div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-gradient-to-r from-purple-100 to-indigo-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-l-8 border-purple-600 p-8 rounded-lg shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Hash className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-3">What is a VIN Number?</h3>
                <p className="text-lg text-black mb-4">
                  A VIN (Vehicle Identification Number) is a unique 17-character code that identifies every vehicle manufactured. Think of it as your car's fingerprint - no two vehicles share the same VIN.
                </p>
                <p className="text-black">
                  Our VIN check decodes this number to reveal the vehicle's complete history, including make, model, year, manufacturing details, PPSR finance check, stolen status, and write-off history.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="vin-decoder" className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">VIN Decoder - What We Check</h2>
          <p className="text-lg text-black max-w-2xl mx-auto">
            Our comprehensive VIN check reveals everything about the vehicle
          </p>
        </div>

        <div className="bg-white border-4 border-purple-600 rounded-lg shadow-2xl p-8">
          <div className="border-2 border-gray-300 rounded-lg p-6">
            <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Hash className="h-10 w-10 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-black">VIN DECODE REPORT</div>
                  <div className="text-sm text-black">Complete Vehicle History</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-semibold text-black mb-2">VIN Breakdown:</div>
                <div className="bg-gray-50 rounded p-3 space-y-1 text-sm">
                  <div className="text-black"><strong>VIN:</strong> JHMCM56557C4XXXXX</div>
                  <div className="text-black"><strong>Make:</strong> HONDA</div>
                  <div className="text-black"><strong>Model:</strong> CIVIC</div>
                  <div className="text-black"><strong>Year:</strong> 2020</div>
                  <div className="text-black"><strong>Engine:</strong> 1.8L 4-Cyl</div>
                  <div className="text-black"><strong>Country:</strong> Japan</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-black mb-2">Safety Check Results:</div>
                <div className="bg-green-50 border-2 border-green-500 rounded p-3 space-y-2">
                  <div className="flex items-center gap-2 text-green-700 font-semibold">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-black">VERIFIED CLEAN</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm text-black">No Finance Owing</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm text-black">Not Stolen</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm text-black">No Write-Offs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="bg-purple-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-purple-700 transition-colors inline-flex items-center gap-3 shadow-xl">
            <FileText className="h-6 w-6" />
            Decode VIN Now - $34.99
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">How to Check a VIN Number - 3 Easy Steps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg">1</div>
                </div>
                <div className="mt-6 text-center">
                  <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-10 w-10 text-purple-600" />
                  </div>
                  <h3 className="text-black text-xl font-bold mb-3">Enter VIN Number</h3>
                  <p className="text-black">Type in the 17-character VIN found on the dashboard, door jamb, or registration papers.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-indigo-200 hover:border-indigo-400 transition-all">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg">2</div>
                </div>
                <div className="mt-6 text-center">
                  <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-10 w-10 text-indigo-600" />
                  </div>
                  <h3 className="text-black text-xl font-bold mb-3">We Decode & Verify</h3>
                  <p className="text-black">We decode the VIN and search PPSR database, stolen vehicle records, and write-off history.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-pink-200 hover:border-pink-400 transition-all">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-pink-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg">3</div>
                </div>
                <div className="mt-6 text-center">
                  <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-10 w-10 text-pink-600" />
                  </div>
                  <h3 className="text-black text-xl font-bold mb-3">Get Full Report</h3>
                  <p className="text-black">Receive complete VIN decode report with vehicle specs and history via email in 60 seconds.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/" className="bg-purple-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-purple-700 transition-colors inline-block shadow-lg">
              Check VIN Number - $34.99
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1,2,3,4,5].map((star) => (
                <Star key={star} className="h-8 w-8 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <h2 className="text-black text-3xl md:text-4xl font-bold mb-2">VIN Check Reviews</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-black italic mb-4">
                "VIN decode showed the car was imported from USA, not local as seller claimed. Saved me from lemon!"
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">TC</div>
                <div>
                  <div className="font-semibold text-black">Tom C.</div>
                  <div className="text-sm text-black">Adelaide, SA</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-black italic mb-4">
                "Super detailed VIN report. Found $14k finance owing. Seller was shocked. Report saved me big time."
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">LW</div>
                <div>
                  <div className="font-semibold text-black">Lisa W.</div>
                  <div className="text-sm text-black">Gold Coast, QLD</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-red-50 border-2 border-pink-200 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-black italic mb-4">
                "Instant VIN decode plus PPSR check. Found previous write-off. Used report to negotiate $5k off price."
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-pink-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">PH</div>
                <div>
                  <div className="font-semibold text-black">Paul H.</div>
                  <div className="text-sm text-black">Canberra, ACT</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-6">
            Decode Any VIN Number Instantly
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Get complete vehicle history, PPSR check, and VIN decode in 60 seconds. Don't buy without checking.
          </p>
          
          <div className="bg-white rounded-xl p-8 inline-block shadow-2xl">
            <div className="text-5xl font-bold text-purple-600 mb-2">$34.99</div>
            <div className="text-black mb-6">Complete VIN check & decode</div>
            <Link href="/" className="bg-purple-600 text-white px-12 py-6 rounded-lg text-2xl font-bold hover:bg-purple-700 transition-colors inline-block shadow-xl">
              Check VIN Now
            </Link>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-black">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-purple-600" />
                <span>Instant Decode</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-purple-600" />
                <span>PPSR Included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-purple-600" />
                <span>Full History</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

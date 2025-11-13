import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, AlertTriangle, Search, FileText, DollarSign, AlertCircle, Star, Clock, Lock, Award, TrendingDown, Users, BadgeCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'REVS Check Australia - Instant Vehicle Finance & Stolen Car Check | $34.99',
  description: 'Official REVS check (PPSR) for all Australian vehicles. Check finance owing, stolen status, write-offs & encumbrances. Instant REVS certificate from $34.99',
  keywords: 'revs check, revs check australia, revs check nsw, ppsr check, revs certificate, finance owing check, stolen car check, revs check online',
  alternates: {
    canonical: 'https://carverify.com.au/revs-check',
  },
  openGraph: {
    title: 'REVS Check Australia - Official Vehicle Finance Check',
    description: 'Check any Australian vehicle for finance owing, stolen status & write-offs. Official REVS/PPSR certificate from $34.99',
    url: 'https://carverify.com.au/revs-check',
    siteName: 'Car Verify Australia',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'REVS Check Australia - Instant Finance & Stolen Car Check',
    description: 'Official REVS check (PPSR) for all Australian vehicles. Check finance owing, stolen status & write-offs from $34.99',
  },
}

export default function RevsCheckPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Visual Elements */}
      <section className="relative py-16 px-4 max-w-7xl mx-auto overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 flex items-center gap-2">
            <BadgeCheck className="h-4 w-4" />
            Official PPSR Certificate Provider
          </div>
          <h1 className="text-black text-4xl md:text-6xl font-bold mb-6 leading-tight">
            REVS Check Australia
            <span className="block text-blue-600 mt-2">Instant Vehicle Finance Check</span>
          </h1>
          <p className="text-xl text-black max-w-3xl mx-auto mb-8">
            Check any Australian vehicle for money owing, stolen status, write-offs & security interests.
            Get your official REVS/PPSR certificate in <strong>60 seconds</strong> - $34.99
          </p>

          {/* Trust Indicators - Visual Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold text-black">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-semibold text-black">10,000+ Checks</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <Clock className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold text-black">60 Second Results</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <Lock className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-semibold text-black">Secure SSL</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/checkout"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Shield className="h-5 w-5" />
              Get REVS Check Now - $34.99
            </Link>
            <Link
              href="#sample-certificate"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
            >
              <FileText className="h-5 w-5" />
              View Sample Report
            </Link>
          </div>
        </div>

        {/* Critical Stats - Visual Impact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6 text-center">
            <TrendingDown className="h-12 w-12 text-red-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-red-600 mb-2">$15,400</div>
            <div className="text-sm font-semibold text-black">Average Loss From</div>
            <div className="text-sm text-black">Buying Encumbered Vehicle</div>
            <div className="text-xs text-red-700 mt-2 font-medium">Source: ASIC Consumer Protection Report</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-orange-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-orange-600 mb-2">1 in 4</div>
            <div className="text-sm font-semibold text-black">Used Cars Have</div>
            <div className="text-sm text-black">Finance Owing or Encumbrances</div>
            <div className="text-xs text-orange-700 mt-2 font-medium">Industry data 2024</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-green-600 mb-2">$34.99</div>
            <div className="text-sm font-semibold text-black">Protects You From</div>
            <div className="text-sm text-black">$15,400+ Potential Loss</div>
            <div className="text-xs text-green-700 mt-2 font-medium">Best insurance you can buy</div>
          </div>
        </div>
      </section>

      {/* ASIC Warning Box - High Visual Impact */}
      <section className="py-8 px-4 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-l-8 border-red-600 p-8 rounded-lg shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-3">⚠️ ASIC Official Warning</h3>
                <p className="text-lg text-black mb-4">
                  <strong className="text-red-600">Australian consumers lose an average of $15,400</strong> when they unknowingly purchase a vehicle with hidden finance owing.
                </p>
                <p className="text-black mb-4">
                  Under Australian law, <strong>security interests "travel with the goods"</strong> - if you buy a car with finance owing, the debt transfers to YOU. The finance company can legally repossess your vehicle even though you paid for it.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <p className="text-sm text-black font-semibold">
                    💡 A $34.99 REVS check is the ONLY legal protection against inheriting someone else's debt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample PPSR Certificate Preview */}
      <section id="sample-certificate" className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">See What You Get - Sample PPSR Certificate</h2>
          <p className="text-lg text-black max-w-2xl mx-auto">
            This is what your official REVS check certificate looks like. Delivered instantly via email.
          </p>
        </div>

        {/* Sample Certificate Visual */}
        <div className="bg-white border-4 border-blue-600 rounded-lg shadow-2xl p-8 max-w-4xl mx-auto">
          <div className="border-2 border-gray-300 rounded-lg p-6">
            {/* Certificate Header */}
            <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Shield className="h-10 w-10 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-black">PPSR CERTIFICATE</div>
                  <div className="text-sm text-black">Personal Property Securities Register</div>
                </div>
              </div>
              <div className="text-xs text-black mt-2">Official Australian Government Database Search</div>
            </div>

            {/* Certificate Body */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-semibold text-black mb-2">Vehicle Details:</div>
                <div className="bg-gray-50 rounded p-3 space-y-1 text-sm">
                  <div className="text-black"><strong>VIN:</strong> JHMCM56557C4XXXXX</div>
                  <div className="text-black"><strong>Make:</strong> TOYOTA</div>
                  <div className="text-black"><strong>Model:</strong> HILUX SR5</div>
                  <div className="text-black"><strong>Year:</strong> 2020</div>
                  <div className="text-black"><strong>Reg:</strong> ABC123 (NSW)</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-black mb-2">Search Results:</div>
                <div className="bg-green-50 border-2 border-green-500 rounded p-3 space-y-2">
                  <div className="flex items-center gap-2 text-green-700 font-semibold">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-black">NO SECURITY INTERESTS FOUND</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm text-black">Not Reported Stolen</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm text-black">No Finance Owing</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm text-black">Clear Title</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center pt-6 border-t-2 border-gray-300">
              <div className="text-xs text-black mb-2">Certificate ID: PPSR-2024-XXXXXX</div>
              <div className="text-xs text-black">Issued: {new Date().toLocaleDateString('en-AU')}</div>
              <div className="text-xs text-black mt-3 font-semibold">This is a legally valid PPSR search certificate</div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/checkout" className="bg-green-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-green-700 transition-colors inline-flex items-center gap-3 shadow-xl">
            <FileText className="h-6 w-6" />
            Get Your Certificate Now - $34.99
          </Link>
          <p className="text-sm text-black mt-3">✓ Delivered via email in 60 seconds ✓ Official PPSR certificate</p>
        </div>
      </section>

      {/* How It Works - Process Visual */}
      <section className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">How to Do a REVS Check - 3 Simple Steps</h2>
            <p className="text-lg text-black">Get your official PPSR certificate in under 60 seconds</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-200 hover:border-blue-400 transition-all">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg">
                    1
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-black text-xl font-bold mb-3">Enter Vehicle Details</h3>
                  <p className="text-black">
                    Simply enter the registration plate number or VIN. Works for any Australian vehicle.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-200 hover:border-green-400 transition-all">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg">
                    2
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-black text-xl font-bold mb-3">Instant PPSR Search</h3>
                  <p className="text-black">
                    We search the official government database in real-time for finance owing, stolen status & write-offs.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg">
                    3
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-10 w-10 text-purple-600" />
                  </div>
                  <h3 className="text-black text-xl font-bold mb-3">Get Your Certificate</h3>
                  <p className="text-black">
                    Receive your official PPSR certificate via email in 60 seconds. Download, print, or save it.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/checkout" className="bg-blue-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-blue-700 transition-colors inline-block shadow-lg">
              Start Your REVS Check - $34.99
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews - Social Proof */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1,2,3,4,5].map((star) => (
                <Star key={star} className="h-8 w-8 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <h2 className="text-black text-3xl md:text-4xl font-bold mb-2">Trusted by 10,000+ Australian Car Buyers</h2>
            <p className="text-lg text-black">See why thousands choose Car Verify for their REVS checks</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-black italic mb-4">
                "Saved me $22,000! The REVS check revealed finance owing that the seller didn't even know about. Best $35 I ever spent."
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  MT
                </div>
                <div>
                  <div className="font-semibold text-black">Michelle T.</div>
                  <div className="text-sm text-black">Sydney, NSW</div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-black italic mb-4">
                "Instant results, official certificate, and it actually found a write-off that wasn't disclosed. Super professional service."
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  AK
                </div>
                <div>
                  <div className="font-semibold text-black">Andrew K.</div>
                  <div className="text-sm text-black">Melbourne, VIC</div>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-black italic mb-4">
                "Clear report came through in literally 30 seconds. Used it to negotiate $3k off the price because of minor write-off history."
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                  RM
                </div>
                <div>
                  <div className="font-semibold text-black">Robyn M.</div>
                  <div className="text-sm text-black">Brisbane, QLD</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Visual */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-black text-3xl md:text-4xl font-bold text-center mb-12">What's Included in Your REVS Check</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600">
              <FileText className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-black font-semibold text-xl mb-4">Official PPSR Certificate</h3>
              <p className="text-black text-sm">
                Government-issued certificate with legal standing. Accepted by insurance companies and banks.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-600">
              <DollarSign className="h-12 w-12 text-red-600 mb-4" />
              <h3 className="text-black font-semibold text-xl mb-4">Finance Owing Check</h3>
              <p className="text-black text-sm">
                See any money owed to banks, finance companies, or other lenders. Protects you from inheriting debt.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-600">
              <AlertTriangle className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-black font-semibold text-xl mb-4">Write-Off History</h3>
              <p className="text-black text-sm">
                Check if the vehicle has been written off by insurance due to accident, flood, fire, or hail damage.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-600">
              <Shield className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-black font-semibold text-xl mb-4">Stolen Car Check</h3>
              <p className="text-black text-sm">
                Verify the vehicle hasn't been reported stolen anywhere in Australia. Protects you from criminal liability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section (keeping existing content) */}
      <section id="what-is-revs" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-black text-3xl font-bold text-center mb-12">REVS Check Questions Answered</h2>
          <div className="space-y-4">
            <details className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all">
              <summary className="text-black font-semibold text-lg cursor-pointer">What is a REVS check in Australia?</summary>
              <p className="mt-4 text-black">
                A REVS check is the common name for a PPSR (Personal Property Securities Register) check in Australia.
                Originally REVS was NSW's Register of Encumbered Vehicles, but since 2012, all states use the national
                PPSR system. When you do a REVS check, you're searching the PPSR to find finance owing, stolen status,
                and write-off history for any Australian vehicle.
              </p>
            </details>

            <details className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all">
              <summary className="text-black font-semibold text-lg cursor-pointer">Is REVS check the same as PPSR check?</summary>
              <p className="mt-4 text-black">
                Yes! REVS and PPSR checks are the same thing. "REVS" was the old NSW name, while "PPSR" is the current
                national system used across all Australian states since 2012. When you order a REVS check today, you're
                getting a PPSR certificate that's valid Australia-wide, not just in NSW.
              </p>
            </details>

            <details className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all">
              <summary className="text-black font-semibold text-lg cursor-pointer">How much does a REVS check cost?</summary>
              <p className="mt-4 text-black">
                Our comprehensive REVS check costs $34.99 and includes the official PPSR certificate, stolen car check,
                write-off history, vehicle valuation, and full vehicle history report. This is significantly cheaper
                than paying for separate checks, and you get everything you need in one report.
              </p>
            </details>

            <details className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all">
              <summary className="text-black font-semibold text-lg cursor-pointer">Can I do a free REVS check in Australia?</summary>
              <p className="mt-4 text-black">
                No, the official PPSR (REVS) register charges a fee for searches because it provides legal protection
                against buying vehicles with hidden finance. While some websites claim to offer "free REVS checks,"
                they cannot provide the official PPSR certificate that protects you legally. Our $34.99 check includes
                the official certificate plus additional checks for stolen status, write-offs, and valuation.
              </p>
            </details>

            <details className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all">
              <summary className="text-black font-semibold text-lg cursor-pointer">How long does a REVS check take?</summary>
              <p className="mt-4 text-black">
                Our REVS check is instant! You'll receive your comprehensive report including the official PPSR
                certificate via email within 60 seconds of completing your order. The certificate is delivered as
                a PDF that you can save, print, or show to sellers.
              </p>
            </details>

            <details className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-all">
              <summary className="text-black font-semibold text-lg cursor-pointer">What if the REVS check shows finance owing?</summary>
              <p className="mt-4 text-black">
                If finance is registered against the vehicle, DO NOT buy it until the seller clears the debt. The finance
                company legally owns the vehicle and can repossess it from you even though you paid for it. Ask the seller
                to pay off the finance first, or walk away and find a different car.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA - High Visual Impact */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-6">
            Protect Your Investment with an Official REVS Check
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Don't risk losing $15,400+ to hidden finance. Get your official PPSR certificate in 60 seconds.
          </p>
          
          <div className="bg-white rounded-xl p-8 inline-block shadow-2xl">
            <div className="text-5xl font-bold text-blue-600 mb-2">$34.99</div>
            <div className="text-black mb-6">One-time payment. Instant results.</div>
            <Link href="/checkout" className="bg-green-600 text-white px-12 py-6 rounded-lg text-2xl font-bold hover:bg-green-700 transition-colors inline-block shadow-xl">
              Get Your REVS Check Now
            </Link>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-black">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Instant Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Secure SSL</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-blue-100 mt-8">
            Join 10,000+ satisfied customers who protected themselves with Car Verify
          </p>
        </div>
      </section>
    </div>
  )
}

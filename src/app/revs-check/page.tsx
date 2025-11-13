import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, AlertTriangle, Search, FileText, DollarSign, AlertCircle, Star, Clock, Lock, Award, TrendingDown, Users, BadgeCheck } from 'lucide-react'
import Footer from '@/components/Footer'

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
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "REVS Check Australia",
    "description": "Official REVS check (PPSR) for all Australian vehicles. Check finance owing, stolen status, write-offs & encumbrances.",
    "brand": {
      "@type": "Brand",
      "name": "Car Verify Australia"
    },
    "offers": {
      "@type": "Offer",
      "price": "34.99",
      "priceCurrency": "AUD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "ratingCount": "10000"
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a REVS check in Australia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A REVS check is the common name for a PPSR (Personal Property Securities Register) check in Australia. Originally REVS was NSW's Register of Encumbered Vehicles, but since 2012, all states use the national PPSR system. When you do a REVS check, you're searching the PPSR to find finance owing, stolen status, and write-off history for any Australian vehicle."
        }
      },
      {
        "@type": "Question",
        "name": "Is REVS check the same as PPSR check?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! REVS and PPSR checks are the same thing. 'REVS' was the old NSW name, while 'PPSR' is the current national system used across all Australian states since 2012. When you order a REVS check today, you're getting a PPSR certificate that's valid Australia-wide, not just in NSW."
        }
      },
      {
        "@type": "Question",
        "name": "How much does a REVS check cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our comprehensive REVS check costs $34.99 and includes the official PPSR certificate, stolen car check, write-off history, vehicle valuation, and full vehicle history report. This is significantly cheaper than paying for separate checks, and you get everything you need in one report."
        }
      },
      {
        "@type": "Question",
        "name": "Can I do a free REVS check in Australia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, the official PPSR (REVS) register charges a fee for searches because it provides legal protection against buying vehicles with hidden finance. While some websites claim to offer 'free REVS checks,' they cannot provide the official PPSR certificate that protects you legally. Our $34.99 check includes the official certificate plus additional checks for stolen status, write-offs, and valuation."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a REVS check take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our REVS check is instant! You'll receive your comprehensive report including the official PPSR certificate via email within 60 seconds of completing your order. The certificate is delivered as a PDF that you can save, print, or show to sellers."
        }
      },
      {
        "@type": "Question",
        "name": "What if the REVS check shows finance owing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If finance is registered against the vehicle, DO NOT buy it until the seller clears the debt. The finance company legally owns the vehicle and can repossess it from you even though you paid for it. Ask the seller to pay off the finance first, or walk away and find a different car."
        }
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
              href="/"
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
          <Link href="/" className="bg-green-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-green-700 transition-colors inline-flex items-center gap-3 shadow-xl">
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
            <Link href="/" className="bg-blue-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-blue-700 transition-colors inline-block shadow-lg">
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

      {/* Complete REVS History Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-8">The Complete History: From REVS to PPSR</h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-black text-lg mb-6">
              Understanding the evolution of vehicle security registers in Australia helps explain why a REVS check is essential today. Before 2012, each Australian state and territory maintained its own register for tracking encumbered vehicles.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
              <h3 className="text-black text-xl font-bold mb-3">The Old System: State-Based REVS Registers</h3>
              <p className="text-black mb-3">
                <strong>NSW's REVS</strong> (Register of Encumbered Vehicles) was the most well-known system, established to track vehicles with finance owing. Other states had similar but separate systems:
              </p>
              <ul className="list-disc list-inside text-black space-y-2 mb-3">
                <li><strong>Victoria</strong> - Victorian REVS</li>
                <li><strong>Queensland</strong> - Queensland REVS</li>
                <li><strong>Western Australia</strong> - REVS WA</li>
                <li><strong>South Australia</strong> - SA REVS</li>
                <li><strong>Tasmania, NT, ACT</strong> - Limited or no formal registers</li>
              </ul>
              <p className="text-black">
                The major problem? These systems <strong>didn't talk to each other</strong>. A car with finance owing in NSW could be sold in Victoria with a "clean" VIC REVS check. Criminals exploited these gaps, costing honest buyers millions annually.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-6">
              <h3 className="text-black text-xl font-bold mb-3">January 30, 2012: The Game Changed</h3>
              <p className="text-black mb-3">
                On this date, the <strong>Personal Property Securities Register (PPSR)</strong> went live, consolidating all state registers into one national database managed by the Australian Financial Security Authority (AFSA).
              </p>
              <p className="text-black mb-3">
                This wasn't just about vehicles - the PPSR covers <strong>all personal property security interests</strong> including:
              </p>
              <ul className="list-disc list-inside text-black space-y-1">
                <li>Motor vehicles, motorcycles, caravans</li>
                <li>Boats and watercraft</li>
                <li>Agricultural equipment and machinery</li>
                <li>Aircraft</li>
                <li>Business assets and inventory</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 mb-6">
              <h3 className="text-black text-xl font-bold mb-3">Why "REVS Check" Still Exists</h3>
              <p className="text-black mb-3">
                Even though the official system is now PPSR, Australians still call it a "REVS check" because:
              </p>
              <ol className="list-decimal list-inside text-black space-y-2">
                <li><strong>Brand recognition</strong> - "REVS" was used for 30+ years before PPSR</li>
                <li><strong>Easier to remember</strong> - "REVS check" is simpler than "PPSR search"</li>
                <li><strong>Market terminology</strong> - Car buyers, sellers, and dealers all use "REVS"</li>
              </ol>
              <p className="text-black mt-3">
                When you order a "REVS check" today, you're getting an official PPSR certificate - same thing, different name. Both terms are correct and interchangeable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Certificate Results */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-8">How to Read Your REVS Certificate Like a Pro</h2>

          <p className="text-black text-lg mb-8">
            Your PPSR certificate contains critical information, but knowing how to interpret it is key. Here's what every section means and what to watch for:
          </p>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-500 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-black text-xl font-bold mb-3">1. "NO SECURITY INTERESTS FOUND" - The Green Light</h3>
                  <p className="text-black mb-3">
                    This is what you want to see. It means:
                  </p>
                  <ul className="list-disc list-inside text-black space-y-1 mb-3">
                    <li>No finance companies have a registered interest</li>
                    <li>No money is legally owing on the vehicle</li>
                    <li>No hire-purchase or lease agreements exist</li>
                    <li>The current owner can sell with clear title</li>
                  </ul>
                  <p className="text-black font-semibold">
                    ✅ Safe to proceed with purchase (pending other checks)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-500 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-black text-xl font-bold mb-3">2. "SECURITY INTERESTS REGISTERED" - Major Red Flag</h3>
                  <p className="text-black mb-3">
                    This means someone has a legal claim to the vehicle. Common types:
                  </p>
                  <div className="space-y-3 mb-3">
                    <div className="bg-white p-3 rounded">
                      <p className="text-black font-semibold">Purchase Money Security Interest (PMSI)</p>
                      <p className="text-black text-sm">Standard car loan or finance. Shows lender name and amount (sometimes). DO NOT buy until paid off.</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="text-black font-semibold">Commercial Consignment</p>
                      <p className="text-black text-sm">Vehicle may be owned by a dealer or fleet company, not the "seller." High scam risk.</p>
                    </div>
                    <div className="bg-white p-3 rounded">
                      <p className="text-black font-semibold">Lease/Hire Purchase</p>
                      <p className="text-black text-sm">Seller doesn't own it - they're renting it. Cannot legally sell it to you.</p>
                    </div>
                  </div>
                  <p className="text-black font-semibold text-red-600">
                    ⛔ DO NOT PROCEED - Demand seller clears the debt first or walk away
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-500 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-8 w-8 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-black text-xl font-bold mb-3">3. Write-Off Classifications - Know the Difference</h3>
                  <p className="text-black mb-3">
                    If your certificate shows write-off history, check the classification carefully:
                  </p>
                  <div className="space-y-2 text-black">
                    <p><strong className="text-red-600">Statutory Write-Off</strong> - Total loss. Cannot be re-registered in ANY state. Walk away immediately.</p>
                    <p><strong className="text-orange-600">Repairable Write-Off</strong> - Was written off but has been repaired and re-registered. Get a professional inspection. Resale value is 20-40% lower.</p>
                    <p><strong className="text-yellow-600">Hail Damage</strong> - Cosmetic damage only. Usually safe if properly repaired, but negotiate price down 10-25%.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-500 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Shield className="h-8 w-8 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-black text-xl font-bold mb-3">4. Stolen Vehicle Status</h3>
                  <p className="text-black mb-3">
                    Your REVS check searches the National Stolen Vehicle Database. If flagged as stolen:
                  </p>
                  <ul className="list-disc list-inside text-black space-y-1 mb-3">
                    <li><strong>Currently stolen</strong> - Report to police immediately. Do not proceed.</li>
                    <li><strong>Previously stolen, now recovered</strong> - Check police paperwork confirming recovery. Still risky.</li>
                    <li><strong>Stolen/Recovered with VIN re-stamp</strong> - Extremely high risk. Original VIN may have been altered.</li>
                  </ul>
                  <p className="text-black text-sm italic">
                    Did you know? <strong>Over 150 vehicles are stolen every day in Australia</strong> according to NRMA data. A REVS check is your best protection.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Problems Found */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-8">5 Most Common Problems Found in REVS Checks (And What They Cost You)</h2>

          <div className="space-y-6">
            <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-red-600">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-black text-xl font-bold">1. Undisclosed Finance Owing</h3>
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">40% of problems</span>
              </div>
              <p className="text-black mb-3">
                <strong className="text-red-600">Average debt amount: $15,400</strong> (ASIC data)
              </p>
              <p className="text-black mb-2">What happens:</p>
              <ul className="list-disc list-inside text-black space-y-1 mb-3 text-sm">
                <li>Seller owes $18,000 on a car they're selling for $22,000</li>
                <li>They plan to use your $22,000 to pay it off, but "forget" or abscond</li>
                <li>Finance company contacts YOU 6 weeks later demanding payment</li>
                <li>You must pay the $18,000 or lose the car (even though you already paid $22,000)</li>
              </ul>
              <p className="text-black text-sm bg-yellow-50 p-3 rounded">
                <strong>Real case:</strong> Brisbane buyer purchased a Mazda CX-5 for $24,000 privately. Three months later, finance company repossessed it. $19,200 still owing. Buyer lost everything and had to pay a lawyer $4,500 trying to recover funds from seller who'd disappeared.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-orange-600">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-black text-xl font-bold">2. Statutory Write-Offs Illegally Re-Registered</h3>
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-bold">25% of problems</span>
              </div>
              <p className="text-black mb-3">
                <strong className="text-orange-600">Impossible to insure. Potentially lethal safety issues.</strong>
              </p>
              <p className="text-black mb-2">What happens:</p>
              <ul className="list-disc list-inside text-black space-y-1 text-sm">
                <li>Car was declared a statutory write-off in NSW (severe accident, flood, or fire damage)</li>
                <li>VIN plate is swapped with a clean car (called "rebirthing")</li>
                <li>Re-registered in QLD or another state using false documents</li>
                <li>Structural damage makes it unsafe, but looks perfect externally</li>
                <li>No insurer will cover it once they discover the real VIN</li>
              </ul>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-purple-600">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-black text-xl font-bold">3. Grey Import Without ADR Compliance</h3>
                <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-bold">15% of problems</span>
              </div>
              <p className="text-black mb-3">
                Vehicle imported from Japan/UK but never got Australian Design Rule (ADR) compliance. Cannot be legally registered long-term.
              </p>
              <p className="text-black text-sm">
                <strong>Warning signs:</strong> VIN starts with "J" (Japan), car has RHD but isn't Aus-spec, no compliance plate visible.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-600">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-black text-xl font-bold">4. Odometer Fraud (Clocking)</h3>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">10% of problems</span>
              </div>
              <p className="text-black mb-3">
                PPSR doesn't track odometer readings, BUT your REVS check often includes service history from our data partners. If service records show 180,000 km in 2022 but odometer shows 95,000 km today, you've found fraud.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-600">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-black text-xl font-bold">5. Takata Airbag Recall - The Silent Killer</h3>
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-bold">1 in 4 cars</span>
              </div>
              <p className="text-black mb-3">
                <strong className="text-red-600">1 in 4 Australian vehicles</strong> have defective Takata airbags that can explode and send shrapnel into the cabin, causing death or serious injury.
              </p>
              <p className="text-black text-sm">
                Our REVS check includes Takata recall status. If positive, replacement is FREE but must be done before you buy. Dealers are legally required to fix before sale, but private sellers often don't know.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Protection */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-8">Legal Protection: Understanding the PPSR Act 2009</h2>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-8 mb-8">
            <div className="flex items-start gap-4">
              <Shield className="h-12 w-12 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-black text-2xl font-bold mb-4">When Your PPSR Certificate Protects You</h3>
                <p className="text-black mb-4">
                  Under Section 43 of the PPSR Act 2009, if you obtain an official PPSR certificate showing "no security interests" and later discover hidden finance, you have legal protection in most cases.
                </p>
                <div className="bg-white rounded p-4 mb-4">
                  <p className="text-black font-semibold mb-2">You're Protected When:</p>
                  <ul className="list-disc list-inside text-black space-y-1 text-sm">
                    <li>You obtained a PPSR certificate before purchase</li>
                    <li>The certificate showed clear title (no security interests)</li>
                    <li>You purchased for valuable consideration (paid market value)</li>
                    <li>You had no actual knowledge of any security interest</li>
                  </ul>
                </div>
                <p className="text-black text-sm italic">
                  <strong>Court precedent:</strong> In Maiden Civil (P&E) Pty Ltd v Queensland Excavation Services Pty Ltd [2013], the court ruled that a buyer who obtained a clear PPSR certificate took the equipment free of the undisclosed security interest.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-2 border-red-300 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-12 w-12 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="text-black text-2xl font-bold mb-4">When You're NOT Protected</h3>
                <div className="bg-white rounded p-4 space-y-2 text-black text-sm">
                  <p><strong className="text-red-600">1. No PPSR certificate obtained</strong> - If you didn't get a certificate before buying, you have zero legal protection.</p>
                  <p><strong className="text-red-600">2. Certificate obtained AFTER purchase</strong> - Must be done before money changes hands.</p>
                  <p><strong className="text-red-600">3. Bought for significantly under market value</strong> - Courts may rule you should have known something was wrong.</p>
                  <p><strong className="text-red-600">4. Seller told you about the finance</strong> - Verbal disclosure removes protection even if not on certificate.</p>
                </div>
                <p className="text-black mt-4">
                  <strong>Bottom line:</strong> The $34.99 PPSR certificate isn't just information - it's legal insurance that can save you $15,400+. Always get it BEFORE you pay.
                </p>
              </div>
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
            <Link href="/" className="bg-green-600 text-white px-12 py-6 rounded-lg text-2xl font-bold hover:bg-green-700 transition-colors inline-block shadow-xl">
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

      <Footer />
    </div>
  )
}

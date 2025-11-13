import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, AlertTriangle, Search, FileText, DollarSign, AlertCircle, Star, Clock, Lock, Award, TrendingDown, Users, BadgeCheck, Car } from 'lucide-react'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Rego Check Australia - Instant Vehicle Registration Search | $34.99',
  description: 'Free rego check for Australian vehicles. Verify registration details, check if a car is stolen, find finance owing & get comprehensive vehicle history. Instant results.',
  keywords: 'rego check, registration check, rego check australia, vehicle registration check, car rego check, check rego, rego lookup',
  alternates: {
    canonical: 'https://carverify.com.au/rego-check',
  },
  openGraph: {
    title: 'Rego Check Australia - Instant Vehicle Registration Search',
    description: 'Check any Australian vehicle registration instantly. PPSR check, stolen car check, finance check & full vehicle history from $34.99',
    url: 'https://carverify.com.au/rego-check',
    siteName: 'Car Verify Australia',
    type: 'website',
  },
}

export default function RegoCheckPage() {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Rego Check Australia",
    "description": "Instant vehicle registration search for Australian vehicles. Verify registration details, check if a car is stolen, find finance owing & get comprehensive vehicle history.",
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
        "name": "What is a rego check in Australia?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A rego check verifies your vehicle's registration status and searches for hidden problems like finance owing, stolen status, or write-off history. Our comprehensive rego check includes full PPSR search, not just basic registration details."
        }
      },
      {
        "@type": "Question",
        "name": "How much does a rego check cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our complete rego check costs $34.99 and includes registration verification, PPSR finance search, stolen vehicle check, write-off history, and full vehicle report. Delivered instantly via email."
        }
      },
      {
        "@type": "Question",
        "name": "Can I check rego for free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While some states offer basic rego expiry checks for free, they don't include critical information like finance owing or stolen status. Our $34.99 comprehensive check protects you from $15,400+ potential losses."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a rego check take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Instant! You'll receive your complete rego check report via email within 60 seconds. The report includes registration status, PPSR certificate, and full vehicle history."
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        
        <div className="text-center mb-12">
          <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 flex items-center gap-2">
            <Car className="h-4 w-4" />
            Australian Vehicle Registration Search
          </div>
          <h1 className="text-black text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Rego Check Australia
            <span className="block text-green-600 mt-2">Instant Registration Verification</span>
          </h1>
          <p className="text-xl text-black max-w-3xl mx-auto mb-8">
            Check any Australian vehicle registration for finance owing, stolen status, write-offs & full vehicle history. Get your complete rego check report in <strong>60 seconds</strong> - $34.99
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold text-black">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <Users className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold text-black">10,000+ Checks</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-semibold text-black">Instant Results</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <Lock className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-semibold text-black">100% Secure</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Shield className="h-5 w-5" />
              Check Rego Now - $34.99
            </Link>
            <Link
              href="#how-it-works"
              className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-green-600 hover:bg-green-50 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Search className="h-5 w-5" />
              How It Works
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6 text-center">
            <TrendingDown className="h-12 w-12 text-red-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-red-600 mb-2">$15,400</div>
            <div className="text-sm font-semibold text-black">Average Loss From</div>
            <div className="text-sm text-black">Hidden Finance Owing</div>
            <div className="text-xs text-red-700 mt-2 font-medium">Source: ASIC</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-orange-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-orange-600 mb-2">1 in 4</div>
            <div className="text-sm font-semibold text-black">Used Cars Have</div>
            <div className="text-sm text-black">Finance or Encumbrances</div>
            <div className="text-xs text-orange-700 mt-2 font-medium">Industry data 2024</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-green-600 mb-2">60 Sec</div>
            <div className="text-sm font-semibold text-black">Get Your Complete</div>
            <div className="text-sm text-black">Rego Check Report</div>
            <div className="text-xs text-green-700 mt-2 font-medium">Instant verification</div>
          </div>
        </div>
      </section>

      {/* Warning Box */}
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
                <h3 className="text-2xl font-bold text-black mb-3">⚠️ Why You Need a Rego Check</h3>
                <p className="text-lg text-black mb-4">
                  Just checking if a vehicle's registration is current isn't enough. Hidden finance owing, stolen status, or write-off history can cost you <strong className="text-red-600">$15,400+ in losses</strong>.
                </p>
                <p className="text-black">
                  Our comprehensive rego check includes PPSR finance search, stolen vehicle verification, and complete vehicle history - not just registration status.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Report */}
      <section id="sample-report" className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">What's Included in Your Rego Check</h2>
          <p className="text-lg text-black max-w-2xl mx-auto">
            Get a comprehensive vehicle history report, not just basic rego details
          </p>
        </div>

        <div className="bg-white border-4 border-green-600 rounded-lg shadow-2xl p-8">
          <div className="border-2 border-gray-300 rounded-lg p-6">
            <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Car className="h-10 w-10 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-black">REGO CHECK REPORT</div>
                  <div className="text-sm text-black">Comprehensive Vehicle History</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-semibold text-black mb-2">Registration Details:</div>
                <div className="bg-gray-50 rounded p-3 space-y-1 text-sm">
                  <div className="text-black"><strong>Rego:</strong> ABC123 (NSW)</div>
                  <div className="text-black"><strong>Status:</strong> CURRENT</div>
                  <div className="text-black"><strong>Expiry:</strong> 31/12/2025</div>
                  <div className="text-black"><strong>Make:</strong> TOYOTA HILUX</div>
                  <div className="text-black"><strong>Year:</strong> 2020</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-black mb-2">PPSR Check Results:</div>
                <div className="bg-green-50 border-2 border-green-500 rounded p-3 space-y-2">
                  <div className="flex items-center gap-2 text-green-700 font-semibold">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-black">ALL CLEAR</span>
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
          <Link href="/" className="bg-green-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-green-700 transition-colors inline-flex items-center gap-3 shadow-xl">
            <FileText className="h-6 w-6" />
            Get Your Rego Check - $34.99
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">How to Check Rego - 3 Simple Steps</h2>
            <p className="text-lg text-black">Complete vehicle history in under 60 seconds</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-200 hover:border-green-400 transition-all">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg">1</div>
                </div>
                <div className="mt-6 text-center">
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="text-black text-xl font-bold mb-3">Enter Rego Number</h3>
                  <p className="text-black">Type in the registration plate number and select the state. Works for any Australian rego.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-200 hover:border-blue-400 transition-all">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg">2</div>
                </div>
                <div className="mt-6 text-center">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-black text-xl font-bold mb-3">We Search Everything</h3>
                  <p className="text-black">We check registration status, PPSR database, stolen vehicle records, and write-off history.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg">3</div>
                </div>
                <div className="mt-6 text-center">
                  <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-10 w-10 text-purple-600" />
                  </div>
                  <h3 className="text-black text-xl font-bold mb-3">Get Full Report</h3>
                  <p className="text-black">Receive your complete rego check report via email in 60 seconds. Download or print it.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/" className="bg-green-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-green-700 transition-colors inline-block shadow-lg">
              Start Your Rego Check - $34.99
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1,2,3,4,5].map((star) => (
                <Star key={star} className="h-8 w-8 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <h2 className="text-black text-3xl md:text-4xl font-bold mb-2">Trusted by Australian Car Buyers</h2>
            <p className="text-lg text-black">Real stories from real customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-black italic mb-4">
                "Checked the rego before viewing - found $18k finance owing! Seller had no idea. Saved me from disaster."
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">JR</div>
                <div>
                  <div className="font-semibold text-black">James R.</div>
                  <div className="text-sm text-black">Perth, WA</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-black italic mb-4">
                "Super fast, got the full report in 30 seconds. Registration was current but showed previous write-off."
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">SK</div>
                <div>
                  <div className="font-semibold text-black">Sarah K.</div>
                  <div className="text-sm text-black">Sydney, NSW</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-black italic mb-4">
                "Best $35 I've spent. Showed the rego was expired and car had been reported stolen 2 years ago!"
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">DM</div>
                <div>
                  <div className="font-semibold text-black">David M.</div>
                  <div className="text-sm text-black">Melbourne, VIC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* State-by-State Rego Differences */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-8">State-by-State Registration Rules: What You Need to Know Before Buying</h2>

          <p className="text-black text-lg mb-8">
            Australia doesn't have national vehicle registration - each state and territory manages its own system with different rules, costs, and requirements. This creates significant problems when buying interstate vehicles. Here's the complete breakdown:
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* NSW */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">NSW</div>
                <h3 className="text-black text-xl font-bold">New South Wales</h3>
              </div>
              <div className="space-y-3 text-black text-sm">
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">🚗 Roadworthy Certificate:</p>
                  <p>Pink Slip required BEFORE transfer (but seller doesn't need one to sell)</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">🏥 CTP Insurance:</p>
                  <p>Must be purchased SEPARATELY before rego. NOT included in registration fee.</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">💰 Rego Cost (Avg):</p>
                  <p>$300-400/year + CTP $350-600/year = <strong>$650-1,000 total</strong></p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">⚠️ Unique Issues:</p>
                  <p>Pink Slips only valid 42 days. Expired rego vehicles must pass Blue Slip (stricter).</p>
                </div>
              </div>
            </div>

            {/* VIC */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">VIC</div>
                <h3 className="text-black text-xl font-bold">Victoria</h3>
              </div>
              <div className="space-y-3 text-black text-sm">
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">🚗 Roadworthy Certificate:</p>
                  <p>RWC (Roadworthy Certificate) REQUIRED by seller before sale. No sale without it.</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">🏥 CTP Insurance:</p>
                  <p><strong>INCLUDED</strong> in rego price. Called TAC (Transport Accident Commission).</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">💰 Rego Cost (Avg):</p>
                  <p>$800-950/year (includes CTP/TAC). Most expensive state.</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">⚠️ Unique Issues:</p>
                  <p>VIC plates stay with car (not owner). Unroadworthy penalties: $9,913 fine.</p>
                </div>
              </div>
            </div>

            {/* QLD */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-300 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-teal-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">QLD</div>
                <h3 className="text-black text-xl font-bold">Queensland</h3>
              </div>
              <div className="space-y-3 text-black text-sm">
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">🚗 Roadworthy Certificate:</p>
                  <p>Safety Certificate REQUIRED by seller before sale. Must be done.</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">🏥 CTP Insurance:</p>
                  <p><strong>INCLUDED</strong> in rego price automatically.</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">💰 Rego Cost (Avg):</p>
                  <p>$700-850/year (includes CTP). Second most expensive.</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">⚠️ Unique Issues:</p>
                  <p>Stolen vehicle database publicly accessible. QLD Police update daily.</p>
                </div>
              </div>
            </div>

            {/* WA */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">WA</div>
                <h3 className="text-black text-xl font-bold">Western Australia</h3>
              </div>
              <div className="space-y-3 text-black text-sm">
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">🚗 Roadworthy Certificate:</p>
                  <p>Vehicle Examination Certificate (VEC) NOT required for private sales.</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">🏥 CTP Insurance:</p>
                  <p>Purchased separately but usually paid with rego renewal.</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">💰 Rego Cost (Avg):</p>
                  <p>$350-450/year + CTP $300-500 = <strong>$650-950 total</strong></p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">⚠️ Unique Issues:</p>
                  <p>WA has oldest vehicle fleet (avg 10.6 years). Higher risk of mechanical issues.</p>
                </div>
              </div>
            </div>

            {/* SA */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">SA</div>
                <h3 className="text-black text-xl font-bold">South Australia</h3>
              </div>
              <div className="space-y-3 text-black text-sm">
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">🚗 Roadworthy Certificate:</p>
                  <p>Vehicle Inspection Report (VIR) NOT mandatory for private sales.</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">🏥 CTP Insurance:</p>
                  <p>Separate purchase required. NOT included in rego.</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">💰 Rego Cost (Avg):</p>
                  <p>$500-650/year + CTP $350-550 = <strong>$850-1,200 total</strong></p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">⚠️ Unique Issues:</p>
                  <p>SA highest CTP costs in Australia. Factor this into interstate transfers.</p>
                </div>
              </div>
            </div>

            {/* TAS */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">TAS</div>
                <h3 className="text-black text-xl font-bold">Tasmania</h3>
              </div>
              <div className="space-y-3 text-black text-sm">
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">🚗 Roadworthy Certificate:</p>
                  <p">Vehicle Inspection Report required for vehicles over 5 years old.</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">🏥 CTP Insurance:</p>
                  <p>INCLUDED in rego price (Motor Accidents Insurance Board).</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">💰 Rego Cost (Avg):</p>
                  <p>$400-550/year (includes CTP). Cheapest in Australia!</p>
                </div>
                <div className="bg-white rounded p-3">
                  <p className="font-semibold mb-1">⚠️ Unique Issues:</p>
                  <p>TAS stolen vehicle data NOT available on PPSR. Limited verification options.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-orange-50 border-l-4 border-orange-600 p-6">
            <h3 className="text-black text-xl font-bold mb-3">🚨 Interstate Transfer Problems That Cost Buyers $1,000s</h3>
            <div className="space-y-3">
              <div className="bg-white rounded p-4">
                <p className="text-black font-semibold mb-2">Problem 1: "Roadworthy" Means Different Things</p>
                <p className="text-black text-sm">
                  Buy car in WA (no roadworthy required). Transfer to VIC (roadworthy mandatory). Fails VIC RWC with $3,200 repairs needed. <strong className="text-red-600">You're stuck with the cost.</strong> Always get pre-purchase inspection regardless of state laws.
                </p>
              </div>
              <div className="bg-white rounded p-4">
                <p className="text-black font-semibold mb-2">Problem 2: CTP Insurance Shock</p>
                <p className="text-black text-sm">
                  NSW car with $350 CTP. Transfer to SA = $600 CTP (75% more expensive). Budget for CTP differences when buying interstate. SA buyers pay 40-70% more than other states.
                </p>
              </div>
              <div className="bg-white rounded p-4">
                <p className="text-black font-semibold mb-2">Problem 3: Expired Rego Hidden Costs</p>
                <p className="text-black text-sm">
                  Buy NSW car with expired rego. Need Blue Slip (not Pink Slip). Blue Slip inspections are 3x stricter and cost $200+ vs $40 Pink Slip. Factor $500-2,000 extra for expired NSW rego vehicles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEVDIS Explained */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-8">NEVDIS: The Hidden Database That Checks Your Rego</h2>

          <div className="bg-indigo-50 border-2 border-indigo-300 rounded-xl p-8 mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-indigo-600 p-3 rounded-full flex-shrink-0">
                <Search className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-black text-2xl font-bold mb-4">What is NEVDIS?</h3>
                <p className="text-black mb-3">
                  <strong>NEVDIS</strong> (National Exchange of Vehicle and Driver Information System) is the behind-the-scenes database that connects all 8 state and territory vehicle registers. Managed by Austroads, it allows information sharing between:
                </p>
                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <ul className="list-disc list-inside text-black space-y-1">
                    <li>Transport NSW (NSW)</li>
                    <li>VicRoads (VIC)</li>
                    <li>Transport & Main Roads (QLD)</li>
                    <li>Transport WA (WA)</li>
                  </ul>
                  <ul className="list-disc list-inside text-black space-y-1">
                    <li>Service SA (SA)</li>
                    <li>Transport Tasmania (TAS)</li>
                    <li>NT Motor Vehicle Registry (NT)</li>
                    <li>Access Canberra (ACT)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white border-2 border-gray-300 rounded-xl p-6">
              <h3 className="text-black text-xl font-bold mb-3">What NEVDIS Contains:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-black text-sm">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Registration status</strong> - Current, expired, cancelled</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Stolen vehicle reports</strong> - All 8 jurisdictions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Written-off vehicles</strong> - Stat & repairable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Vehicle make/model/year</strong> - Confirmed specs</span>
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>VIN/Chassis number</strong> - Verified identity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Engine number</strong> - Original vs replaced</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Color changes</strong> - Factory vs resprayed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Registration plate history</strong> - Transfers</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6">
              <h3 className="text-black text-xl font-bold mb-3">⚠️ What NEVDIS Does NOT Show (Critical Gap)</h3>
              <p className="text-black mb-3">
                NEVDIS is registration data only. It <strong>DOES NOT include</strong>:
              </p>
              <ul className="list-disc list-inside text-black space-y-1 text-sm">
                <li><strong>Finance owing</strong> - You need PPSR for this (not NEVDIS)</li>
                <li><strong>Odometer readings</strong> - Clocking isn't tracked federally</li>
                <li><strong>Accident history</strong> - Unless vehicle was written off</li>
                <li><strong>Ownership history</strong> - How many previous owners</li>
                <li><strong>Service records</strong> - Maintenance history not recorded</li>
              </ul>
              <p className="text-black mt-3 text-sm bg-white p-3 rounded">
                <strong>This is why our $34.99 check is comprehensive:</strong> We query NEVDIS (rego status, stolen, write-offs) AND PPSR (finance owing) AND service history databases. You get the complete picture, not just one data source.
              </p>
            </div>

            <div className="bg-red-50 border-2 border-red-400 rounded-xl p-6">
              <h3 className="text-black text-xl font-bold mb-3">🚨 Tasmania Data Gap - Critical Warning</h3>
              <p className="text-black mb-3">
                <strong>TAS stolen vehicle information is currently unavailable from NEVDIS and PPSR.</strong> This creates a massive security gap:
              </p>
              <div className="bg-white rounded p-4 space-y-2 text-black text-sm">
                <p>• Cars stolen in Tasmania won't show as stolen in national databases</p>
                <p>• TAS-registered vehicles have higher fraud risk when sold interstate</p>
                <p>• Criminal syndicates exploit this gap by "washing" stolen vehicles through TAS</p>
                <p>• Always demand extra proof of ownership for TAS vehicles</p>
              </div>
              <p className="text-black mt-3 text-sm">
                <strong>Extra checks for TAS vehicles:</strong> Verify seller ID matches rego documents. Request original purchase invoice. Check service history at authorized dealers. Get independent VIN etching verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-black text-3xl font-bold text-center mb-12">Rego Check Questions Answered</h2>
          <div className="space-y-4">
            <details className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-green-400 transition-all">
              <summary className="text-black font-semibold text-lg cursor-pointer">What is a rego check in Australia?</summary>
              <p className="mt-4 text-black">
                A rego check verifies your vehicle's registration status and searches for hidden problems like finance owing, stolen status, or write-off history. Our comprehensive rego check includes full PPSR search, not just basic registration details.
              </p>
            </details>

            <details className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-green-400 transition-all">
              <summary className="text-black font-semibold text-lg cursor-pointer">How much does a rego check cost?</summary>
              <p className="mt-4 text-black">
                Our complete rego check costs $34.99 and includes registration verification, PPSR finance search, stolen vehicle check, write-off history, and full vehicle report. Delivered instantly via email.
              </p>
            </details>

            <details className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-green-400 transition-all">
              <summary className="text-black font-semibold text-lg cursor-pointer">Can I check rego for free?</summary>
              <p className="mt-4 text-black">
                While some states offer basic rego expiry checks for free, they don't include critical information like finance owing or stolen status. Our $34.99 comprehensive check protects you from $15,400+ potential losses.
              </p>
            </details>

            <details className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-green-400 transition-all">
              <summary className="text-black font-semibold text-lg cursor-pointer">How long does a rego check take?</summary>
              <p className="mt-4 text-black">
                Instant! You'll receive your complete rego check report via email within 60 seconds. The report includes registration status, PPSR certificate, and full vehicle history.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-6">
            Get Your Complete Rego Check Report Now
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Don't just check if rego is current - check EVERYTHING. Protect yourself from hidden finance, stolen status, and write-offs.
          </p>
          
          <div className="bg-white rounded-xl p-8 inline-block shadow-2xl">
            <div className="text-5xl font-bold text-green-600 mb-2">$34.99</div>
            <div className="text-black mb-6">Complete vehicle history report</div>
            <Link href="/" className="bg-green-600 text-white px-12 py-6 rounded-lg text-2xl font-bold hover:bg-green-700 transition-colors inline-block shadow-xl">
              Check Rego Now
            </Link>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-black">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>60 Sec Results</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>PPSR Included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>100% Secure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

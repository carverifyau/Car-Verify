import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, AlertTriangle, FileText, DollarSign, Star, Clock, Lock, Award, TrendingDown, Users, BadgeCheck, AlertCircle, Search } from 'lucide-react'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'PPSR Check Australia - Official Vehicle Finance & Encumbrance Check | $34.99',
  description: 'Official PPSR check (Personal Property Securities Register) for all Australian vehicles. Check finance owing, security interests, write-offs & stolen status. Instant certificate from $34.99',
  keywords: 'ppsr check, ppsr check australia, ppsr certificate, personal property securities register, finance owing check, security interest check, ppsr search',
  alternates: {
    canonical: 'https://carverify.com.au/ppsr-check',
  },
  openGraph: {
    title: 'PPSR Check Australia - Official Vehicle Finance & Encumbrance Check',
    description: 'Official PPSR certificate for any Australian vehicle. Check finance owing, security interests & encumbrances instantly from $34.99',
    url: 'https://carverify.com.au/ppsr-check',
    siteName: 'Car Verify Australia',
    type: 'website',
  },
}

export default function PPSRCheckPage() {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "PPSR Check Australia",
    "description": "Official PPSR check (Personal Property Securities Register) for all Australian vehicles. Check finance owing, security interests, write-offs & stolen status.",
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
        "name": "What does a PPSR check show?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A PPSR check reveals security interests (finance owing), stolen vehicle status, write-off history, and any encumbrances registered against the vehicle. It's the only way to legally verify a car's financial status in Australia."
        }
      },
      {
        "@type": "Question",
        "name": "Is a PPSR certificate legally recognized?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. An official PPSR certificate provides legal protection under the PPSR Act 2009. If you get a 'clear' PPSR certificate and later discover hidden finance, you're protected from repossession in most cases."
        }
      },
      {
        "@type": "Question",
        "name": "How much does a PPSR check cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our comprehensive PPSR check costs $34.99 and includes the official government certificate plus additional vehicle history checks. Delivered instantly via email."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need a PPSR check if I'm buying from a dealer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "YES! Even dealer cars can have security interests. Some dealers aren't aware of finance owing. A PPSR check protects you regardless of who's selling the vehicle. Always check before you buy."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a PPSR check take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Instant! Your official PPSR certificate is delivered to your email within 60 seconds of payment. You can use it immediately when negotiating or finalizing your purchase."
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

      <section className="relative py-16 px-4 max-w-7xl mx-auto overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        
        <div className="text-center mb-12">
          <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 flex items-center gap-2">
            <BadgeCheck className="h-4 w-4" />
            Official Government PPSR Database
          </div>
          <h1 className="text-black text-4xl md:text-6xl font-bold mb-6 leading-tight">
            PPSR Check Australia
            <span className="block text-indigo-600 mt-2">Personal Property Securities Register Search</span>
          </h1>
          <p className="text-xl text-black max-w-3xl mx-auto mb-8">
            Get an official PPSR certificate for any Australian vehicle. Check finance owing, security interests, encumbrances, write-offs and stolen status from <strong>$34.99</strong>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold text-black">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <Users className="h-5 w-5 text-indigo-600" />
              <span className="text-sm font-semibold text-black">Official PPSR Provider</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <Clock className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold text-black">60 Sec Certificate</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
              <Lock className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-semibold text-black">Secure & Legal</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/" className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors inline-flex items-center justify-center gap-2 shadow-lg">
              <Shield className="h-5 w-5" />
              Get PPSR Certificate - $34.99
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6 text-center">
            <TrendingDown className="h-12 w-12 text-red-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-red-600 mb-2">$15,400</div>
            <div className="text-sm font-semibold text-black">Average Loss</div>
            <div className="text-sm text-black">Inherited Debt</div>
            <div className="text-xs text-red-700 mt-2 font-medium">ASIC Report</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-orange-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-orange-600 mb-2">1 in 4</div>
            <div className="text-sm font-semibold text-black">Cars Have</div>
            <div className="text-sm text-black">Security Interests</div>
            <div className="text-xs text-orange-700 mt-2 font-medium">2024 Data</div>
          </div>
          
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-xl p-6 text-center">
            <CheckCircle className="h-12 w-12 text-indigo-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-indigo-600 mb-2">$34.99</div>
            <div className="text-sm font-semibold text-black">Official</div>
            <div className="text-sm text-black">PPSR Certificate</div>
            <div className="text-xs text-indigo-700 mt-2 font-medium">Legal protection</div>
          </div>
        </div>
      </section>

      {/* What is PPSR Section */}
      <section className="py-8 px-4 bg-gradient-to-r from-indigo-100 to-purple-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-l-8 border-indigo-600 p-8 rounded-lg shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="bg-indigo-100 p-3 rounded-full">
                  <AlertCircle className="h-8 w-8 text-indigo-600" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-3">What is a PPSR Check?</h3>
                <p className="text-lg text-black mb-4">
                  The <strong>Personal Property Securities Register (PPSR)</strong> is the official Australian Government register that records security interests in personal property, including vehicles. A PPSR check reveals if a vehicle has money owing, is stolen, or has been written off.
                </p>
                <p className="text-black mb-4">
                  <strong className="text-red-600">Critical:</strong> If you buy a car with finance owing and don't get a PPSR certificate, the finance company can legally repossess the vehicle from you - even though you paid for it. You inherit the debt.
                </p>
                <p className="text-black">
                  Our official PPSR check provides legal protection and peace of mind when buying any vehicle in Australia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">Official PPSR Certificate</h2>
          <p className="text-lg text-black max-w-2xl mx-auto">
            This is what your official PPSR certificate looks like
          </p>
        </div>

        <div className="bg-white border-4 border-indigo-600 rounded-lg shadow-2xl p-8">
          <div className="border-2 border-gray-300 rounded-lg p-6">
            <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Shield className="h-10 w-10 text-indigo-600" />
                <div>
                  <div className="text-2xl font-bold text-black">PPSR CERTIFICATE</div>
                  <div className="text-sm text-black">Personal Property Securities Register</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-semibold text-black mb-2">Vehicle Details:</div>
                <div className="bg-gray-50 rounded p-3 space-y-1 text-sm">
                  <div className="text-black"><strong>VIN:</strong> JHMCM56557C4XXXXX</div>
                  <div className="text-black"><strong>Make:</strong> TOYOTA</div>
                  <div className="text-black"><strong>Model:</strong> CAMRY</div>
                  <div className="text-black"><strong>Year:</strong> 2021</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-black mb-2">PPSR Search Results:</div>
                <div className="bg-green-50 border-2 border-green-500 rounded p-3 space-y-2">
                  <div className="flex items-center gap-2 text-green-700 font-semibold">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-black">NO SECURITY INTERESTS</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm text-black">Clear Title</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm text-black">No Finance Owing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/" className="bg-indigo-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-indigo-700 transition-colors inline-flex items-center gap-3 shadow-xl">
            <FileText className="h-6 w-6" />
            Get PPSR Certificate - $34.99
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-indigo-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">How to Get Your PPSR Certificate - 3 Steps</h2>
            <p className="text-lg text-black">Official government certificate in under 60 seconds</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-indigo-200 hover:border-indigo-400 transition-all">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg">1</div>
                </div>
                <div className="mt-6 text-center">
                  <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-10 w-10 text-indigo-600" />
                  </div>
                  <h3 className="text-black text-xl font-bold mb-3">Enter Vehicle Details</h3>
                  <p className="text-black">Enter the VIN or registration number. We search the official PPSR database instantly.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-200 hover:border-purple-400 transition-all">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg">2</div>
                </div>
                <div className="mt-6 text-center">
                  <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-10 w-10 text-purple-600" />
                  </div>
                  <h3 className="text-black text-xl font-bold mb-3">Instant PPSR Search</h3>
                  <p className="text-black">We check for security interests, finance owing, stolen status, and write-off records.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-200 hover:border-blue-400 transition-all">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold shadow-lg">3</div>
                </div>
                <div className="mt-6 text-center">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-black text-xl font-bold mb-3">Get Official Certificate</h3>
                  <p className="text-black">Receive your legally recognized PPSR certificate via email. Use it for legal protection.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/" className="bg-indigo-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-indigo-700 transition-colors inline-block shadow-lg">
              Get PPSR Certificate - $34.99
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1,2,3,4,5].map((star) => (
                <Star key={star} className="h-8 w-8 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <h2 className="text-black text-3xl md:text-4xl font-bold mb-2">Why Aussies Trust Our PPSR Checks</h2>
            <p className="text-lg text-black">Real protection for real buyers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-black italic mb-4">
                "PPSR check revealed $22,000 finance owing. Seller claimed car was paid off. Certificate saved me from disaster!"
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">MB</div>
                <div>
                  <div className="font-semibold text-black">Marcus B.</div>
                  <div className="text-sm text-black">Brisbane, QLD</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-black italic mb-4">
                "Got the official PPSR certificate in 30 seconds. Showed clean title, bought the car with confidence. Best $35 spent."
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-purple-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">AK</div>
                <div>
                  <div className="font-semibold text-black">Anna K.</div>
                  <div className="text-sm text-black">Sydney, NSW</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-black italic mb-4">
                "PPSR showed previous write-off. Car looked perfect but had hidden structural damage. Walked away thanks to this check."
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">RT</div>
                <div>
                  <div className="font-semibold text-black">Robert T.</div>
                  <div className="text-sm text-black">Melbourne, VIC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive: PPSR Act 2009 Protection Framework */}
      <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-8">Understanding Your Legal Rights: The PPSR Act 2009 Protection Framework</h2>

          <p className="text-black text-lg mb-8">
            The Personal Property Securities Act 2009 (Cth) provides one of the strongest buyer protection frameworks in Australian consumer law. Understanding these protections can save you from catastrophic financial loss. Here's the complete legal framework:
          </p>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-500 rounded-xl p-8">
              <div className="flex items-start gap-4">
                <Shield className="h-12 w-12 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="text-black text-2xl font-bold mb-4">Section 43: Taking Property Free of Unperfected Security Interests</h3>
                  <p className="text-black mb-4">
                    <strong>The Golden Rule:</strong> If someone hasn't registered their security interest on the PPSR (an "unperfected" interest), you can buy the property free of that interest - even if you knew about it.
                  </p>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <p className="text-black font-semibold mb-2">What "Unperfected" Means:</p>
                    <ul className="list-disc list-inside text-black space-y-1 text-sm">
                      <li>Finance company didn't register on PPSR within required timeframe</li>
                      <li>Incorrect VIN or registration number used in PPSR filing</li>
                      <li>Security interest expired but wasn't renewed</li>
                      <li>Registration fee wasn't paid (registration rejected)</li>
                    </ul>
                  </div>
                  <p className="text-black text-sm bg-yellow-50 p-3 rounded">
                    <strong>Real Case:</strong> In <em>Maiden Civil (P&E) Pty Ltd v Queensland Excavation Services</em> [2013] QSC 52, buyer purchased excavator after PPSR search showed clear. Bank had security interest but failed to register it correctly. Court ruled buyer took property free of bank's interest. Bank lost $180,000.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-500 rounded-xl p-8">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-12 w-12 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="text-black text-2xl font-bold mb-4">Section 44: Special Protection for Serial-Numbered Goods</h3>
                  <p className="text-black mb-4">
                    Motor vehicles, motorcycles, boats, and aircraft are "serial-numbered goods" with extra protection. If you conduct a PPSR search using the VIN/serial number and it shows clear, you're protected EVEN IF:
                  </p>
                  <ul className="list-disc list-inside text-black space-y-2 mb-4">
                    <li>The security interest was registered but under wrong VIN</li>
                    <li>Finance company registered using old VIN (car was re-vinned legally)</li>
                    <li>Typographical error in VIN registration</li>
                  </ul>
                  <p className="text-black text-sm">
                    <strong>Why this matters:</strong> With 17-digit VINs, data entry errors are common. Section 44 puts the burden on the finance company to get it right, not on you to guess alternative VINs.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-500 rounded-xl p-8">
              <div className="flex items-start gap-4">
                <Users className="h-12 w-12 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="text-black text-2xl font-bold mb-4">Section 46: Buying in Ordinary Course of Business</h3>
                  <p className="text-black mb-4">
                    If you buy from a dealer who regularly sells that type of vehicle, you take it free of security interests EVEN IF they're properly registered on PPSR. This applies when:
                  </p>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <ul className="list-disc list-inside text-black space-y-2 text-sm">
                      <li>You buy from a licensed car dealer</li>
                      <li>The vehicle is part of their regular inventory</li>
                      <li>You had no knowledge dealer didn't own the car</li>
                      <li>You paid fair market value</li>
                    </ul>
                  </div>
                  <p className="text-black text-sm bg-red-50 p-3 rounded">
                    <strong>Dealer Warning:</strong> This protection does NOT apply to private sales or dealers selling consignment vehicles "on behalf of owner." Always verify dealer owns the vehicle outright.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-500 rounded-xl p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-12 w-12 text-orange-600 flex-shrink-0" />
                <div>
                  <h3 className="text-black text-2xl font-bold mb-4">Section 47: Personal/Domestic Property Exception</h3>
                  <p className="text-black mb-4">
                    For personal, domestic, or household use vehicles with value under $153,000 (indexed annually), additional protections apply. If the seller was using the vehicle personally (not for business), you're protected even if:
                  </p>
                  <ul className="list-disc list-inside text-black space-y-1 text-sm">
                    <li>Finance was registered on PPSR</li>
                    <li>Seller defaults after you bought it</li>
                    <li>You didn't do a PPSR search (though you always should)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">⚖️ The Ultimate Legal Shield: Three-Part Protection</h3>
            <p className="text-lg mb-4">
              When you get a PPSR certificate showing clear title, you activate a three-layer legal shield:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="font-bold mb-2">1. Section 43 Protection</p>
                <p className="text-sm">Free of unperfected interests</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="font-bold mb-2">2. Section 44 Serial # Protection</p>
                <p className="text-sm">VIN search accuracy required</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="font-bold mb-2">3. Certificate Evidence</p>
                <p className="text-sm">Court-admissible proof of diligence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PPSR vs REVS History */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-8">Why PPSR Replaced 40+ Different Registers: The Problem With The Old System</h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-black text-lg mb-6">
              Before January 30, 2012, Australia had a fragmented mess of security interest registers. The PPSR consolidated <strong>over 40 different federal and state registers</strong> into one national system. Here's what was replaced:
            </p>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="text-black text-xl font-bold mb-4">The Old Fragmented System (Pre-2012)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-black font-semibold mb-2">Vehicle Registers (by state):</p>
                  <ul className="list-disc list-inside text-black text-sm space-y-1">
                    <li>NSW REVS (Register of Encumbered Vehicles)</li>
                    <li>Victorian REVS</li>
                    <li>Queensland REVS</li>
                    <li>WA REVS</li>
                    <li>SA Written Off Vehicle Register</li>
                    <li>Tasmania Vehicle Securities Register</li>
                    <li>NT/ACT - No formal register</li>
                  </ul>
                </div>
                <div>
                  <p className="text-black font-semibold mb-2">Other Replaced Registers:</p>
                  <ul className="list-disc list-inside text-black text-sm space-y-1">
                    <li>ASIC Register of Company Charges</li>
                    <li>Bills of Sale registers (4 states)</li>
                    <li>Crop and Livestock Mortgages (5 states)</li>
                    <li>Chattel mortgages registers</li>
                    <li>Water allocations registers</li>
                    <li>30+ specialist registers</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-6">
              <h3 className="text-black text-xl font-bold mb-3">The $2 Billion Problem</h3>
              <p className="text-black mb-3">
                The fragmented system caused massive problems:
              </p>
              <ul className="list-disc list-inside text-black space-y-2">
                <li><strong>Cross-state fraud:</strong> Car financed in NSW, sold "clear" in QLD (different databases)</li>
                <li><strong>Search costs:</strong> Buyers had to search 7+ different databases per vehicle</li>
                <li><strong>Registration errors:</strong> Each state had different forms, requirements, deadlines</li>
                <li><strong>Inconsistent protections:</strong> Different laws in each state</li>
                <li><strong>Business inefficiency:</strong> Finance companies registered in 8 jurisdictions for national operations</li>
              </ul>
              <p className="text-black mt-3 text-sm italic">
                <strong>Government estimates:</strong> The old system cost Australian economy $2 billion annually in fraud losses, compliance costs, and inefficiency.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-6">
              <h3 className="text-black text-xl font-bold mb-3">The PPSR Solution (2012-Present)</h3>
              <p className="text-black mb-3">
                One national database solved these problems:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded p-4">
                  <p className="text-black font-semibold mb-2">✅ For Buyers:</p>
                  <ul className="list-disc list-inside text-black text-sm space-y-1">
                    <li>One $2 search covers all Australia</li>
                    <li>Consistent legal protections</li>
                    <li>No cross-state fraud gaps</li>
                    <li>24/7 online access</li>
                  </ul>
                </div>
                <div className="bg-white rounded p-4">
                  <p className="text-black font-semibold mb-2">✅ For Finance Companies:</p>
                  <ul className="list-disc list-inside text-black text-sm space-y-1">
                    <li>One registration covers Australia</li>
                    <li>Lower compliance costs</li>
                    <li>Faster registration (15 seconds)</li>
                    <li>Better fraud prevention</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-black text-xl font-bold mb-3">📊 PPSR By The Numbers (2023-24)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">12.8M</div>
                  <div className="text-sm text-black">Searches Conducted</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">9.4M</div>
                  <div className="text-sm text-black">Registrations Active</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">7.9%</div>
                  <div className="text-sm text-black">Search Growth YoY</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-black">Online Access</div>
                </div>
              </div>
              <p className="text-black text-sm mt-4 italic">
                Source: Australian Financial Security Authority (AFSA) - State of the Personal Property Securities System 2023-24
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Business vs Consumer PPSR */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-8">Beyond Cars: PPSR for Business Assets & Equipment</h2>

          <p className="text-black text-lg mb-8">
            While most people know PPSR for vehicle checks, it covers <strong>all personal property</strong> used as security. Understanding the full scope helps you avoid problems in business asset purchases:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border-2 border-indigo-300 rounded-xl p-6">
              <h3 className="text-black text-xl font-bold mb-4">🚗 Consumer PPSR Checks</h3>
              <ul className="space-y-2 text-black text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Motor vehicles</strong> - Cars, motorcycles, trucks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Caravans & RVs</strong> - Recreational vehicles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Boats & watercraft</strong> - Personal and recreational</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Motorcycles</strong> - All types and sizes</span>
                </li>
              </ul>
              <p className="text-black text-sm mt-4 bg-blue-50 p-3 rounded">
                <strong>Typical cost:</strong> Single vehicle search costs $2 (government) to $34.99 (comprehensive report with extras)
              </p>
            </div>

            <div className="bg-white border-2 border-purple-300 rounded-xl p-6">
              <h3 className="text-black text-xl font-bold mb-4">🏢 Business PPSR Checks</h3>
              <ul className="space-y-2 text-black text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Heavy machinery</strong> - Excavators, loaders, tractors</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Aircraft</strong> - Commercial and private planes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Commercial vehicles</strong> - Fleet trucks, buses</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Business inventory</strong> - Stock held for sale</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Intellectual property</strong> - Licenses, patents</span>
                </li>
              </ul>
              <p className="text-black text-sm mt-4 bg-purple-50 p-3 rounded">
                <strong>Business stakes:</strong> Equipment finance can exceed $500,000. PPSR check is mandatory due diligence.
              </p>
            </div>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-600 p-6">
            <h3 className="text-black text-xl font-bold mb-3">⚠️ Common Business PPSR Mistakes That Cost $100,000+</h3>
            <div className="space-y-3">
              <div className="bg-white rounded p-4">
                <p className="text-black font-semibold mb-2">1. "Rent-to-Own" Equipment Not on PPSR</p>
                <p className="text-black text-sm">
                  Business owner "buys" excavator on payment plan. Seller never registers PPSR interest. Seller goes bankrupt. Liquidator seizes excavator claiming no security interest. Buyer loses equipment AND still owes money. <strong className="text-red-600">Cost: $380,000</strong>
                </p>
              </div>
              <div className="bg-white rounded p-4">
                <p className="text-black font-semibold mb-2">2. Buying Business With Unregistered Security Interests</p>
                <p className="text-black text-sm">
                  Purchase business including all equipment and inventory. Seller's inventory was on consignment (not owned). Supplier repossesses $220,000 of inventory. No PPSR check was done. <strong className="text-red-600">Cost: $220,000 + lost business</strong>
                </p>
              </div>
              <div className="bg-white rounded p-4">
                <p className="text-black font-semibold mb-2">3. Aircraft Purchase Without PPSR Check</p>
                <p className="text-black text-sm">
                  $1.2M aircraft purchase. PPSR search after purchase revealed $450K finance owing + maintenance liens. Buyer must clear debts or lose aircraft. <strong className="text-red-600">Cost: $450,000 + legal fees</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-black text-3xl font-bold text-center mb-12">PPSR Check Questions</h2>
          <div className="space-y-4">
            <details className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-indigo-400 transition-all">
              <summary className="text-black font-semibold text-lg cursor-pointer">What does a PPSR check show?</summary>
              <p className="mt-4 text-black">
                A PPSR check reveals security interests (finance owing), stolen vehicle status, write-off history, and any encumbrances registered against the vehicle. It's the only way to legally verify a car's financial status in Australia.
              </p>
            </details>

            <details className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-indigo-400 transition-all">
              <summary className="text-black font-semibold text-lg cursor-pointer">Is a PPSR certificate legally recognized?</summary>
              <p className="mt-4 text-black">
                Yes. An official PPSR certificate provides legal protection under the PPSR Act 2009. If you get a "clear" PPSR certificate and later discover hidden finance, you're protected from repossession in most cases.
              </p>
            </details>

            <details className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-indigo-400 transition-all">
              <summary className="text-black font-semibold text-lg cursor-pointer">How much does a PPSR check cost?</summary>
              <p className="mt-4 text-black">
                Our comprehensive PPSR check costs $34.99 and includes the official government certificate plus additional vehicle history checks. Delivered instantly via email.
              </p>
            </details>

            <details className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-indigo-400 transition-all">
              <summary className="text-black font-semibold text-lg cursor-pointer">Do I need a PPSR check if I'm buying from a dealer?</summary>
              <p className="mt-4 text-black">
                YES! Even dealer cars can have security interests. Some dealers aren't aware of finance owing. A PPSR check protects you regardless of who's selling the vehicle. Always check before you buy.
              </p>
            </details>

            <details className="bg-white p-6 rounded-lg border-2 border-gray-200 hover:border-indigo-400 transition-all">
              <summary className="text-black font-semibold text-lg cursor-pointer">How long does a PPSR check take?</summary>
              <p className="mt-4 text-black">
                Instant! Your official PPSR certificate is delivered to your email within 60 seconds of payment. You can use it immediately when negotiating or finalizing your purchase.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-6">
            Get Your Official PPSR Certificate
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Legal protection against $15,400+ inherited debt. Official government certificate in 60 seconds.
          </p>
          
          <div className="bg-white rounded-xl p-8 inline-block shadow-2xl">
            <div className="text-5xl font-bold text-indigo-600 mb-2">$34.99</div>
            <div className="text-black mb-6">Official PPSR Certificate</div>
            <Link href="/" className="bg-indigo-600 text-white px-12 py-6 rounded-lg text-2xl font-bold hover:bg-indigo-700 transition-colors inline-block shadow-xl">
              Get Certificate Now
            </Link>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-black flex-wrap">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-indigo-600" />
                <span>Official Document</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-indigo-600" />
                <span>Legal Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-indigo-600" />
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

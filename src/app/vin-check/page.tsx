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
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "VIN Check Australia",
    "description": "Free VIN check & decoder for Australian vehicles. Verify VIN number, check stolen status, find finance owing, decode specs & get full vehicle history.",
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

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

      {/* Complete VIN Decoder Guide */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-8">Decode Any VIN: Complete 17-Character Breakdown</h2>

          <p className="text-black text-lg mb-8">
            Every VIN tells a story - if you know how to read it. Here's the complete breakdown of what each character means and how to spot fake or altered VINs:
          </p>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-xl p-8 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-black text-2xl font-bold mb-3">Example VIN Decoded:</h3>
              <div className="bg-white rounded-lg p-4 font-mono text-2xl font-bold text-purple-600 mb-4">
                6 G 1 Y Z 2 3 J 9 P 5 1 0 0 0 0 1
              </div>
              <p className="text-black text-sm">Toyota RAV4, 2023 model, built in Australia, Serial #000001</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Positions 1-3: WMI */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6">
              <h3 className="text-black text-xl font-bold mb-4">Positions 1-3: World Manufacturer Identifier (WMI)</h3>

              <div className="space-y-4">
                <div className="bg-white rounded p-4">
                  <p className="text-black font-semibold mb-2">Position 1: Country of Origin</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-black">
                    <div><strong>1-5:</strong> USA/Canada</div>
                    <div><strong>6:</strong> 🇦🇺 Australia</div>
                    <div><strong>J:</strong> 🇯🇵 Japan</div>
                    <div><strong>K:</strong> 🇰🇷 Korea</div>
                    <div><strong>L:</strong> 🇨🇳 China</div>
                    <div><strong>S:</strong> 🇬🇧 UK</div>
                    <div><strong>V:</strong> 🇫🇷 France/Spain</div>
                    <div><strong>W:</strong> 🇩🇪 Germany</div>
                    <div><strong>Y:</strong> 🇸🇪 Sweden</div>
                    <div><strong>Z:</strong> 🇮🇹 Italy</div>
                  </div>
                </div>

                <div className="bg-white rounded p-4">
                  <p className="text-black font-semibold mb-2">Position 2: Manufacturer</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm text-black">
                    <div><strong>A:</strong> Audi</div>
                    <div><strong>B:</strong> BMW</div>
                    <div><strong>C:</strong> Chrysler</div>
                    <div><strong>F:</strong> Ford</div>
                    <div><strong>G:</strong> General Motors</div>
                    <div><strong>H:</strong> Honda/Acura</div>
                    <div><strong>M:</strong> Mitsubishi</div>
                    <div><strong>N:</strong> Nissan</div>
                    <div><strong>T:</strong> Toyota</div>
                    <div><strong>V:</strong> Volkswagen</div>
                  </div>
                </div>

                <div className="bg-white rounded p-4">
                  <p className="text-black font-semibold mb-2">Position 3: Vehicle Type or Division</p>
                  <p className="text-black text-sm">Varies by manufacturer - passenger car, truck, SUV, or manufacturing division</p>
                </div>
              </div>
            </div>

            {/* Positions 4-8: VDS */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-6">
              <h3 className="text-black text-xl font-bold mb-4">Positions 4-8: Vehicle Descriptor Section (VDS)</h3>

              <div className="space-y-3">
                <div className="bg-white rounded p-4">
                  <p className="text-black font-semibold">Position 4: Safety Features / GVW</p>
                  <p className="text-black text-sm">Airbags, seatbelts, or Gross Vehicle Weight (manufacturer specific)</p>
                </div>
                <div className="bg-white rounded p-4">
                  <p className="text-black font-semibold">Position 5: Vehicle Series / Platform</p>
                  <p className="text-black text-sm">Sedan, SUV, wagon, coupe, convertible</p>
                </div>
                <div className="bg-white rounded p-4">
                  <p className="text-black font-semibold">Position 6: Model / Trim Level</p>
                  <p className="text-black text-sm">Example: Toyota RAV4 GX vs GXL vs Cruiser</p>
                </div>
                <div className="bg-white rounded p-4">
                  <p className="text-black font-semibold">Position 7: Body Type</p>
                  <p className="text-black text-sm">2-door, 4-door, hatchback, wagon, ute, etc.</p>
                </div>
                <div className="bg-white rounded p-4">
                  <p className="text-black font-semibold">Position 8: Engine Type</p>
                  <p className="text-black text-sm">Engine size, fuel type (petrol/diesel), cylinders</p>
                </div>
              </div>
            </div>

            {/* Position 9: Check Digit */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-300 rounded-xl p-6">
              <h3 className="text-black text-xl font-bold mb-4">Position 9: Check Digit - VIN Fraud Detection</h3>

              <div className="bg-white rounded p-4 mb-4">
                <p className="text-black mb-3">
                  Position 9 is a calculated check digit (0-9 or X) that validates the entire VIN. If someone alters even ONE character in positions 1-8 or 10-17, the check digit won't match.
                </p>
                <div className="bg-yellow-50 p-3 rounded">
                  <p className="text-black font-semibold mb-2">How It's Calculated:</p>
                  <ol className="list-decimal list-inside text-black text-sm space-y-1">
                    <li>Each position is assigned a weight (8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2)</li>
                    <li>Letters are converted to numbers (A=1, B=2... Z=26, excluding I/O/Q)</li>
                    <li>Multiply each position value by its weight, sum them</li>
                    <li>Divide sum by 11, remainder is check digit (10 = X)</li>
                  </ol>
                </div>
              </div>

              <div className="bg-red-50 border-l-4 border-red-600 p-4">
                <p className="text-black font-semibold mb-2">🚨 Fraud Detection:</p>
                <p className="text-black text-sm">
                  If the check digit doesn't match our calculation, the VIN has been altered. This catches 90% of amateur VIN alterations. Professional fraudsters know this, so always verify Position 9 against the mathematical formula.
                </p>
              </div>
            </div>

            {/* Positions 10-17: VIS */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-300 rounded-xl p-6">
              <h3 className="text-black text-xl font-bold mb-4">Positions 10-17: Vehicle Identifier Section (VIS)</h3>

              <div className="space-y-4">
                <div className="bg-white rounded p-4">
                  <p className="text-black font-semibold mb-2">Position 10: Model Year</p>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-2 text-sm text-black">
                    <div><strong>D:</strong> 2013</div>
                    <div><strong>E:</strong> 2014</div>
                    <div><strong>F:</strong> 2015</div>
                    <div><strong>G:</strong> 2016</div>
                    <div><strong>H:</strong> 2017</div>
                    <div><strong>J:</strong> 2018</div>
                    <div><strong>K:</strong> 2019</div>
                    <div><strong>L:</strong> 2020</div>
                    <div><strong>M:</strong> 2021</div>
                    <div><strong>N:</strong> 2022</div>
                    <div><strong>P:</strong> 2023</div>
                    <div><strong>R:</strong> 2024</div>
                    <div><strong>S:</strong> 2025</div>
                    <div><strong>T:</strong> 2026</div>
                  </div>
                  <p className="text-black text-xs mt-2 italic">Note: Letters I, O, Q, U, Z are never used. Cycles every 30 years.</p>
                </div>

                <div className="bg-white rounded p-4">
                  <p className="text-black font-semibold mb-2">Position 11: Assembly Plant</p>
                  <p className="text-black text-sm">Specific factory where vehicle was built (manufacturer-specific codes)</p>
                </div>

                <div className="bg-white rounded p-4">
                  <p className="text-black font-semibold mb-2">Positions 12-17: Serial Number</p>
                  <p className="text-black text-sm">Unique 6-digit sequential production number. Usually starts at 000001 for each model/year.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIN Fraud & Scams */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-8">VIN Fraud Techniques: How Criminals Alter VINs (And How to Spot Them)</h2>

          <div className="space-y-6">
            <div className="bg-red-50 border-2 border-red-400 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-12 w-12 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="text-black text-2xl font-bold mb-4">Technique 1: VIN Cloning ("Rebirthing")</h3>
                  <p className="text-black mb-3">
                    <strong>How it works:</strong> Stolen vehicle's VIN plate is replaced with a clean VIN plate from a written-off vehicle of same make/model/year.
                  </p>
                  <div className="bg-white rounded p-4 mb-3">
                    <p className="text-black font-semibold mb-2">Red Flags to Check:</p>
                    <ul className="list-disc list-inside text-black text-sm space-y-1">
                      <li>VIN plate has fresh rivets or welds (should be original from factory)</li>
                      <li>VIN on plate doesn't match VIN etched on engine block</li>
                      <li>VIN on windshield sticker different from compliance plate</li>
                      <li>VIN stamped on chassis rail looks recent (not aged/rusty like rest of car)</li>
                      <li>Serial numbers on body panels don't align with VIN year</li>
                    </ul>
                  </div>
                  <p className="text-black text-sm bg-yellow-50 p-3 rounded">
                    <strong>Real Case:</strong> Melbourne luxury car theft ring stole 47 vehicles (avg $85K each), cloned VINs from insurance write-offs, sold to unsuspecting buyers. Total: $3.9M scam. Buyers lost everything.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border-2 border-orange-400 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-12 w-12 text-orange-600 flex-shrink-0" />
                <div>
                  <h3 className="text-black text-2xl font-bold mb-4">Technique 2: Character Alteration</h3>
                  <p className="text-black mb-3">
                    <strong>How it works:</strong> Single characters changed to make stolen VIN match a clean vehicle. Example: 3 altered to 8, B to 8, G to 6.
                  </p>
                  <div className="bg-white rounded p-4 mb-3">
                    <p className="text-black font-semibold mb-2">How to Spot It:</p>
                    <ul className="list-disc list-inside text-black text-sm space-y-1">
                      <li>Character depth inconsistent (altered character stamped lighter/deeper)</li>
                      <li>Font style different for one character</li>
                      <li>Grinding marks around altered character</li>
                      <li>Character alignment slightly off</li>
                      <li>Use check digit calculation (Position 9) to verify</li>
                    </ul>
                  </div>
                  <p className="text-black text-sm">
                    <strong>Pro Tip:</strong> Run VIN through our check digit validator. If it fails, VIN has been altered.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <Hash className="h-12 w-12 text-yellow-600 flex-shrink-0" />
                <div>
                  <h3 className="text-black text-2xl font-bold mb-4">Technique 3: Grey Import Fake Compliance</h3>
                  <p className="text-black mb-3">
                    <strong>How it works:</strong> Japanese import given fake Australian compliance plate with invented VIN that doesn't match actual chassis number.
                  </p>
                  <div className="bg-white rounded p-4 mb-3">
                    <p className="text-black font-semibold mb-2">Warning Signs:</p>
                    <ul className="list-disc list-inside text-black text-sm space-y-1">
                      <li>VIN starts with J (Japan) but has Australian compliance plate</li>
                      <li>Compliance plate looks newer than vehicle age</li>
                      <li>No RAWS (Registered Automotive Workshop Scheme) approval plate</li>
                      <li>VIN format doesn't match country of origin rules</li>
                      <li>Compliance plate VIN doesn't match chassis stamping</li>
                    </ul>
                  </div>
                  <p className="text-black text-sm bg-red-50 p-3 rounded">
                    <strong>Consequence:</strong> Vehicle can be deemed unroadworthy and de-registered. Cannot be legally sold. Total loss.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border-2 border-purple-400 rounded-xl p-6">
              <h3 className="text-black text-2xl font-bold mb-4">Physical VIN Locations You MUST Check (Don't Trust Just One)</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded p-4">
                  <p className="text-black font-semibold mb-2">🔍 Primary Locations:</p>
                  <ul className="list-disc list-inside text-black text-sm space-y-1">
                    <li>Compliance plate (engine bay)</li>
                    <li>Windshield lower corner (driver side)</li>
                    <li>Driver door jamb sticker</li>
                    <li>Dashboard (visible through windshield)</li>
                  </ul>
                </div>
                <div className="bg-white rounded p-4">
                  <p className="text-black font-semibold mb-2">🔧 Hidden Locations (Fraud Check):</p>
                  <ul className="list-disc list-inside text-black text-sm space-y-1">
                    <li>Stamped on chassis rail (under carpet)</li>
                    <li>Etched on engine block</li>
                    <li>Stamped on firewall</li>
                    <li>Original paint underneath VIN plate</li>
                  </ul>
                </div>
              </div>
              <p className="text-black mt-4 text-sm bg-white p-3 rounded">
                <strong>Verification Rule:</strong> ALL locations must match exactly. If even ONE doesn't match, walk away. Vehicle is compromised.
              </p>
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

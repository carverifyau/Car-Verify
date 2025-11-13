import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, AlertTriangle, FileText, Star, Clock, Users, TrendingDown, Award } from 'lucide-react'
import Footer from '@/components/Footer'

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
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "REVS Check Perth",
    "description": "Official REVS check for Perth & WA vehicles. Check finance owing, stolen status, write-offs & encumbrances on any car in Perth.",
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

          <Link href="/" className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors inline-flex items-center gap-2 shadow-lg">
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
          <Link href="/" className="bg-orange-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-orange-700 transition-colors inline-flex items-center gap-3 shadow-xl">
            <FileText className="h-6 w-6" />
            Check Perth Car Now - $34.99
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 bg-red-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">🚨 Perth Vehicle Theft Hotspots 2024</h2>
            <p className="text-black text-lg max-w-3xl mx-auto">
              WA Police data reveals 6,261 vehicles stolen in Western Australia in 2023. Mirrabooka, Gosnells, and Fremantle lead Perth theft statistics. Know your risk before buying.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-red-100 to-red-200 border-2 border-red-400 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-red-700 mb-2">6,261</div>
              <div className="text-sm font-semibold text-black">Vehicles Stolen</div>
              <div className="text-sm text-black">WA 2023</div>
              <div className="text-xs text-red-700 font-semibold mt-2">State-wide total</div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 border-2 border-orange-400 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-orange-700 mb-2">651</div>
              <div className="text-sm font-semibold text-black">Mirrabooka District</div>
              <div className="text-sm text-black">Highest in Perth</div>
              <div className="text-xs text-orange-700 font-semibold mt-2">2023 thefts</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-400 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-yellow-700 mb-2">VE</div>
              <div className="text-sm font-semibold text-black">Holden Commodore</div>
              <div className="text-sm text-black">Most Stolen WA</div>
              <div className="text-xs text-yellow-700 font-semibold mt-2">3 years running</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-xl border-2 border-gray-200">
            <h3 className="text-black text-2xl font-bold mb-6">High-Risk Perth Suburbs & Districts (2023 Data)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-3">
                  <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Mirrabooka District</span>
                      <span className="text-red-600 font-bold">651 thefts</span>
                    </div>
                    <p className="text-sm text-black">Highest theft district in Perth metro area</p>
                  </div>
                  <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Fremantle</span>
                      <span className="text-orange-600 font-bold">569 thefts</span>
                    </div>
                    <p className="text-sm text-black">Port area - second highest in Perth</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Joondalup</span>
                      <span className="text-yellow-600 font-bold">467 thefts</span>
                    </div>
                    <p className="text-sm text-black">Northern suburbs district - consistent activity</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Midland</span>
                      <span className="text-yellow-600 font-bold">465 thefts</span>
                    </div>
                    <p className="text-sm text-black">Eastern suburbs - elevated risk area</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-3">
                  <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Gosnells</span>
                      <span className="text-red-600 font-bold">84 thefts</span>
                    </div>
                    <p className="text-sm text-black">Highest individual suburb theft rate in Perth</p>
                  </div>
                  <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Bayswater</span>
                      <span className="text-orange-600 font-bold">65 thefts</span>
                    </div>
                    <p className="text-sm text-black">Inner eastern suburbs - second highest suburb</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Baldivis</span>
                      <span className="text-yellow-600 font-bold">61 thefts</span>
                    </div>
                    <p className="text-sm text-black">Southern suburbs - third highest suburb</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Other High-Risk Areas</span>
                      <span className="text-yellow-600 font-bold">Multiple hotspots</span>
                    </div>
                    <p className="text-sm text-black">Armadale, Rockingham showing elevated rates</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mt-6">
              <p className="text-black font-semibold mb-3">⚠️ Perth Theft Hotspot Warning:</p>
              <p className="text-black text-sm mb-2">
                <strong>Mirrabooka district (including Gosnells, Girrawheen, Balga) leads Perth vehicle theft.</strong> If buying a car from these areas or Fremantle, Joondalup, Midland, Bayswater, or Baldivis, always verify seller identity and run a REVS check.
              </p>
              <p className="text-black text-sm">
                <strong>Holden Commodore VE dominates:</strong> The Commodore VE (2006-2013) has been WA's most stolen car for 3 consecutive years. Easy to steal + high parts demand = theft magnet. Mandatory REVS check on all Commodores.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">Most Targeted Vehicles in Perth</h2>
          <p className="text-black text-lg max-w-3xl mx-auto">
            Western Australia Police data shows Holden Commodore leads Perth theft statistics. Toyota and Ford also heavily targeted.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-300 rounded-xl p-6">
            <h3 className="text-black text-xl font-bold mb-4">🚗 High-Theft Models in WA</h3>
            <div className="space-y-3">
              <div className="bg-white rounded p-3">
                <div className="font-bold text-orange-700">#1 Holden Commodore VE</div>
                <p className="text-sm text-black">2006-2013 models. Most stolen car in WA for 3 years. Easy to steal, high parts demand. Perth has large Commodore population.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-orange-700">#2 Toyota HiLux</div>
                <p className="text-sm text-black">All model years targeted. WA's mining industry creates strong parts demand. Organized theft rings target utes.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-orange-700">#3 Ford Ranger</div>
                <p className="text-sm text-black">Popular work vehicle in WA. Targeted for parts stripping and resale. High value drives theft.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-orange-700">Mining Industry Impact</div>
                <p className="text-sm text-black">WA's mining boom drives 4WD/ute theft. Parts in high demand for regional/mine site vehicles. Check all work vehicles.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-6">
            <h3 className="text-black text-xl font-bold mb-4">🔍 WA Vehicle Licensing Requirements</h3>
            <div className="space-y-3">
              <div className="bg-white rounded p-3">
                <div className="font-bold text-green-700">Vehicle Inspection (Yellow Slip)</div>
                <p className="text-sm text-black">Required for vehicles over 20 years old, interstate transfers, or rebuilt write-offs. Valid 30 days. Cost: $45 (DoT) + inspection fee.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-green-700">CTP Insurance</div>
                <p className="text-sm text-black">Compulsory Third Party included IN WA license fee (like QLD/SA). Simplifies vehicle licensing process.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-green-700">Written-Off Vehicles</div>
                <p className="text-sm text-black">Statutory write-offs CANNOT be re-registered in WA. Repairable write-offs need DoT approval + vehicle inspection.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-green-700">Interstate Transfers</div>
                <p className="text-sm text-black">Vehicles from interstate need Yellow Slip inspection. VIN verification included. Check NEVDIS before licensing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-orange-100 to-red-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">Perth Car Market Intelligence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-black text-xl font-bold mb-4">📊 Perth Market Size</h3>
              <div className="space-y-3 text-black">
                <p className="text-sm">
                  <strong>Western Australia's used car market is robust.</strong> Over 240,000 used vehicles change hands in WA annually, with Greater Perth accounting for ~190,000 of these sales.
                </p>
                <p className="text-sm">
                  <strong>Mining industry effect:</strong> WA's resources boom drives demand for 4WDs and utes. Higher average vehicle prices than eastern states. Also drives targeted theft of work vehicles.
                </p>
                <p className="text-sm">
                  <strong>Average Perth used car price:</strong> $34,600 (2024) - highest in Australia due to mining demand. A $34.99 REVS check protects against $15,400+ loss from undisclosed finance.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-black text-xl font-bold mb-4">🏙️ Perth Dealership Zones</h3>
              <div className="space-y-3 text-black text-sm">
                <div className="bg-orange-50 rounded p-3">
                  <p className="font-semibold mb-1">Great Eastern Highway</p>
                  <p>Major dealer corridor (Midvale, Belmont). Mix of reputable and budget dealers. Run REVS on every vehicle.</p>
                </div>
                <div className="bg-orange-50 rounded p-3">
                  <p className="font-semibold mb-1">Mirrabooka & Balcatta</p>
                  <p>Budget dealer concentration. Higher risk area. Walk away if paperwork isn't perfect or seller hesitates.</p>
                </div>
                <div className="bg-orange-50 rounded p-3">
                  <p className="font-semibold mb-1">Fremantle & Osborne Park</p>
                  <p>Established dealer hubs. Check for grey imports and ex-mine vehicles with hidden damage.</p>
                </div>
                <div className="bg-orange-50 rounded p-3">
                  <p className="font-semibold mb-1">Online Marketplaces</p>
                  <p>Growing market. Meet at seller's registered address. Gosnells/Mirrabooka online listings = extra caution.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-l-8 border-orange-600 rounded-lg p-8 mt-8 shadow-xl">
            <h3 className="text-black text-2xl font-bold mb-4">💡 Perth Buyer's Checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Run REVS check on VIN + Rego (WA format: 1ABC123)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Verify seller ID matches vehicle license (WA rego)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Check if Yellow Slip required (20+ years, interstate, rebuilt)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Holden Commodore VE = mandatory REVS check (most stolen)</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Avoid Gosnells, Mirrabooka vehicles with unclear history</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Check for ex-mine vehicles (hidden damage common)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Never pay cash - use bank transfer for paper trail</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Inspect VIN plate for tampering (check rivets are original)</span>
                </div>
              </div>
            </div>
          </div>
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
            <Link href="/" className="bg-orange-600 text-white px-12 py-6 rounded-lg text-2xl font-bold hover:bg-orange-700 transition-colors inline-block shadow-xl">
              Check Perth Vehicle
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

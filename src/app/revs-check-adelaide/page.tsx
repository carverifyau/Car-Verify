import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, AlertTriangle, FileText, Star, Clock, Users, TrendingDown, Award } from 'lucide-react'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'REVS Check Adelaide - Instant Vehicle Finance Check SA | From $34.99',
  description: 'Official REVS check for Adelaide & SA vehicles. Check finance owing, stolen status, write-offs & encumbrances on any car in Adelaide. Instant REVS certificate from $34.99',
  keywords: 'revs check adelaide, revs check sa, ppsr check adelaide, adelaide car check, finance check adelaide, stolen car check adelaide, vehicle history adelaide',
  alternates: {
    canonical: 'https://carverify.com.au/revs-check-adelaide',
  },
  openGraph: {
    title: 'REVS Check Adelaide - Vehicle Finance & Stolen Car Check SA',
    description: 'Protect yourself when buying a car in Adelaide. Official PPSR/REVS check for all SA vehicles. Finance, stolen & write-off checks from $34.99',
    url: 'https://carverify.com.au/revs-check-adelaide',
    siteName: 'Car Verify Australia',
    type: 'website',
  },
}

export default function RevsCheckAdelaidePage() {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "REVS Check Adelaide",
    "description": "Official REVS check for Adelaide & SA vehicles. Check finance owing, stolen status, write-offs & encumbrances on any car in Adelaide.",
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
            REVS Check Adelaide
            <span className="block text-red-600 mt-2">Official SA Vehicle Finance Check</span>
          </h1>
          <p className="text-xl text-black max-w-3xl mx-auto mb-8">
            Check any Adelaide or South Australian vehicle for finance owing, stolen status & write-offs. Instant REVS certificate from <strong>$34.99</strong>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold text-black">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Users className="h-5 w-5 text-red-600" />
              <span className="text-sm font-semibold text-black">Adelaide's Trusted Check</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Clock className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold text-black">Instant SA Results</span>
            </div>
          </div>

          <Link href="/" className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center gap-2 shadow-lg">
            <Shield className="h-5 w-5" />
            Check Adelaide Vehicle - $34.99
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6 text-center">
            <TrendingDown className="h-12 w-12 text-red-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-red-600 mb-2">$15,400</div>
            <div className="text-sm font-semibold text-black">Average Loss</div>
            <div className="text-sm text-black">Adelaide Buyers</div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-orange-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-orange-600 mb-2">1 in 4</div>
            <div className="text-sm font-semibold text-black">SA Cars</div>
            <div className="text-sm text-black">Have Finance</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 text-center">
            <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-blue-600 mb-2">60 Sec</div>
            <div className="text-sm font-semibold text-black">Adelaide Check</div>
            <div className="text-sm text-black">Results</div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-gradient-to-r from-red-100 to-orange-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-l-8 border-red-600 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-black mb-3">⚠️ Adelaide Car Buyers - Essential Check!</h3>
            <p className="text-lg text-black mb-4">
              Consumer and Business Services SA warns that <strong className="text-red-600">buying an Adelaide car with finance owing means YOU inherit the debt</strong>. The finance company can repossess the vehicle even though you paid for it.
            </p>
            <p className="text-black">
              A $34.99 REVS check protects you from losing $15,400+ on an Adelaide car purchase. Check BEFORE you buy!
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">What Adelaide Buyers Get</h2>
        </div>

        <div className="bg-white border-4 border-red-600 rounded-lg shadow-2xl p-8">
          <div className="border-2 border-gray-300 rounded-lg p-6">
            <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Shield className="h-10 w-10 text-red-600" />
                <div>
                  <div className="text-2xl font-bold text-black">REVS CHECK - ADELAIDE</div>
                  <div className="text-sm text-black">South Australia Vehicle Report</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-semibold text-black mb-2">Adelaide Vehicle:</div>
                <div className="bg-gray-50 rounded p-3 space-y-1 text-sm">
                  <div className="text-black"><strong>Rego:</strong> S123ABC (SA)</div>
                  <div className="text-black"><strong>Make:</strong> MITSUBISHI</div>
                  <div className="text-black"><strong>Model:</strong> TRITON</div>
                  <div className="text-black"><strong>Year:</strong> 2020</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-black mb-2">SA Results:</div>
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
          <Link href="/" className="bg-red-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-red-700 transition-colors inline-flex items-center gap-3 shadow-xl">
            <FileText className="h-6 w-6" />
            Check Adelaide Car Now - $34.99
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 bg-red-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">🚨 Adelaide Vehicle Theft Hotspots 2024</h2>
            <p className="text-black text-lg max-w-3xl mx-auto">
              South Australia Police data shows Adelaide CBD leads state vehicle theft rates. Northern suburbs showing concerning growth. Know your risk before buying any Adelaide car.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-red-100 to-red-200 border-2 border-red-400 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-red-700 mb-2">157</div>
              <div className="text-sm font-semibold text-black">Adelaide CBD Thefts</div>
              <div className="text-sm text-black">2023 Data</div>
              <div className="text-xs text-red-700 font-semibold mt-2">Highest in SA</div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 border-2 border-orange-400 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-orange-700 mb-2">Rising</div>
              <div className="text-sm font-semibold text-black">Northern Suburbs</div>
              <div className="text-sm text-black">Elizabeth, Salisbury</div>
              <div className="text-xs text-orange-700 font-semibold mt-2">Increasing trend</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-400 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-yellow-700 mb-2">VE</div>
              <div className="text-sm font-semibold text-black">Holden Commodore</div>
              <div className="text-sm text-black">Most Stolen SA</div>
              <div className="text-xs text-yellow-700 font-semibold mt-2">2006-2013 models</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-xl border-2 border-gray-200">
            <h3 className="text-black text-2xl font-bold mb-6">High-Risk Adelaide Suburbs (2023 Data)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-3">
                  <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Adelaide CBD</span>
                      <span className="text-red-600 font-bold">157 thefts</span>
                    </div>
                    <p className="text-sm text-black">Highest theft area in South Australia - street parking targeted</p>
                  </div>
                  <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Port Lincoln</span>
                      <span className="text-orange-600 font-bold">52 thefts</span>
                    </div>
                    <p className="text-sm text-black">Regional SA - second highest theft rate</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Morphett Vale</span>
                      <span className="text-yellow-600 font-bold">50 thefts</span>
                    </div>
                    <p className="text-sm text-black">Southern suburbs - consistent theft activity</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Mount Gambier</span>
                      <span className="text-yellow-600 font-bold">48 thefts</span>
                    </div>
                    <p className="text-sm text-black">South-East SA regional center</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-3">
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Salisbury</span>
                      <span className="text-yellow-600 font-bold">47 thefts</span>
                    </div>
                    <p className="text-sm text-black">Northern Adelaide - elevated risk area</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Parafield Gardens</span>
                      <span className="text-yellow-600 font-bold">42 thefts</span>
                    </div>
                    <p className="text-sm text-black">Northern suburbs - watch this area</p>
                  </div>
                  <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Elizabeth & Port Adelaide</span>
                      <span className="text-orange-600 font-bold">Rising Rates</span>
                    </div>
                    <p className="text-sm text-black">Northern suburbs showing concerning growth trend</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">North Adelaide</span>
                      <span className="text-yellow-600 font-bold">37 thefts</span>
                    </div>
                    <p className="text-sm text-black">Inner city area - opportunistic theft</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mt-6">
              <p className="text-black font-semibold mb-3">⚠️ Adelaide Northern Suburbs Warning:</p>
              <p className="text-black text-sm mb-2">
                <strong>Northern Adelaide suburbs are showing increasing vehicle theft rates.</strong> If buying a car from Elizabeth, Port Adelaide, Salisbury, or Parafield Gardens, always verify seller identity matches rego documents and run a REVS check.
              </p>
              <p className="text-black text-sm">
                <strong>Adelaide CBD leads SA:</strong> 157 vehicles stolen from Adelaide CBD in 2023. Street-parked cars and short-term parking areas near nightlife districts are primary targets. Check any CBD-based vehicle's history.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">Most Targeted Vehicles in Adelaide</h2>
          <p className="text-black text-lg max-w-3xl mx-auto">
            South Australia follows national trends with Holden Commodore leading theft statistics. Check these models carefully.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-xl p-6">
            <h3 className="text-black text-xl font-bold mb-4">🚗 High-Theft Models in SA</h3>
            <div className="space-y-3">
              <div className="bg-white rounded p-3">
                <div className="font-bold text-red-700">#1 Holden Commodore VE</div>
                <p className="text-sm text-black">2006-2013 models most stolen car in Australia. Easy to steal, high parts demand. Adelaide has significant Commodore population.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-red-700">#2 Toyota HiLux</div>
                <p className="text-sm text-black">Utes targeted across Adelaide. Strong resale value + parts demand = theft magnet. All model years at risk.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-red-700">#3 Ford Ranger PX</div>
                <p className="text-sm text-black">2011+ Rangers popular in SA. Targeted for parts stripping and interstate resale.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-red-700">Regional SA Risk</div>
                <p className="text-sm text-black">Port Lincoln, Mount Gambier show elevated 4WD theft. Rural areas = less security, higher opportunity for thieves.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-6">
            <h3 className="text-black text-xl font-bold mb-4">🔍 SA Vehicle Inspection Requirements</h3>
            <div className="space-y-3">
              <div className="bg-white rounded p-3">
                <div className="font-bold text-green-700">Vehicle Inspection Report (VIR)</div>
                <p className="text-sm text-black">SA roadworthy certificate. Required BEFORE transfer. Valid 30 days for private sale, 3 months for dealer. Cost: $80-$150.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-green-700">CTP Insurance</div>
                <p className="text-sm text-black">Compulsory Third Party included IN SA rego fee (like QLD). Simplifies registration process.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-green-700">Written-Off Vehicles</div>
                <p className="text-sm text-black">Statutory write-offs CANNOT be re-registered in SA. Repairable write-offs need VIR inspection + SAPOL approval.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-green-700">Interstate Transfers</div>
                <p className="text-sm text-black">Vehicles from interstate need SA VIR inspection. VIN verification included in inspection process.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-red-100 to-orange-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">Adelaide Car Market Intelligence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-black text-xl font-bold mb-4">📊 Adelaide Market Size</h3>
              <div className="space-y-3 text-black">
                <p className="text-sm">
                  <strong>South Australia's used car market is modest but active.</strong> Over 180,000 used vehicles change hands in SA annually, with Greater Adelaide accounting for ~140,000 of these sales.
                </p>
                <p className="text-sm">
                  <strong>Holden's legacy:</strong> Adelaide was home to Holden manufacturing until 2017. High Commodore ownership means elevated Commodore theft - always check VE models (2006-2013).
                </p>
                <p className="text-sm">
                  <strong>Average Adelaide used car price:</strong> $29,800 (2024) - slightly lower than eastern states. However, a $34.99 REVS check still protects against $15,400+ average loss from undisclosed finance.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-black text-xl font-bold mb-4">🏙️ Adelaide Dealership Zones</h3>
              <div className="space-y-3 text-black text-sm">
                <div className="bg-red-50 rounded p-3">
                  <p className="font-semibold mb-1">Main North Road</p>
                  <p>Major dealer strip (Gepps Cross, Enfield). Mix of quality dealers. Still run REVS check on every vehicle.</p>
                </div>
                <div className="bg-red-50 rounded p-3">
                  <p className="font-semibold mb-1">Port Road</p>
                  <p>Budget dealers, higher risk of vehicles with undisclosed issues. Verify all paperwork thoroughly.</p>
                </div>
                <div className="bg-red-50 rounded p-3">
                  <p className="font-semibold mb-1">Northern Suburbs (Elizabeth, Salisbury)</p>
                  <p>Budget end of market. Walk away if seller hesitates on providing rego docs or VIN verification.</p>
                </div>
                <div className="bg-red-50 rounded p-3">
                  <p className="font-semibold mb-1">Online Marketplaces</p>
                  <p>Growing market in Adelaide. Meet at seller's registered address, never public locations after dark.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-l-8 border-red-600 rounded-lg p-8 mt-8 shadow-xl">
            <h3 className="text-black text-2xl font-bold mb-4">💡 Adelaide Buyer's Checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Run REVS check on VIN + Rego (SA format: S123ABC)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Verify seller ID matches rego certificate</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Get Vehicle Inspection Report (30-day validity for private)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Holden Commodore VE = mandatory REVS check</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Avoid Elizabeth, Salisbury cars with unclear provenance</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Check VIN plate hasn't been tampered with</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Never pay cash - use bank transfer for paper trail</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Be extra cautious with CBD or Port Adelaide vehicles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-6">
            Adelaide's Most Trusted REVS Check
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Protect yourself when buying any car in Adelaide or SA. Instant results.
          </p>

          <div className="bg-white rounded-xl p-8 inline-block shadow-2xl">
            <div className="text-5xl font-bold text-red-600 mb-2">$34.99</div>
            <div className="text-black mb-6">Adelaide & SA vehicles</div>
            <Link href="/" className="bg-red-600 text-white px-12 py-6 rounded-lg text-2xl font-bold hover:bg-red-700 transition-colors inline-block shadow-xl">
              Check Adelaide Vehicle
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

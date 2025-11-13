import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, AlertTriangle, FileText, Star, Clock, Users, TrendingDown, Award } from 'lucide-react'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'REVS Check Melbourne - Instant Vehicle Finance Check VIC | From $34.99',
  description: 'Official REVS check for Melbourne & VIC vehicles. Check finance owing, stolen status, write-offs & encumbrances on any car in Melbourne. Instant REVS certificate from $34.99',
  keywords: 'revs check melbourne, revs check vic, ppsr check melbourne, melbourne car check, finance check melbourne, stolen car check melbourne, vehicle history melbourne',
  alternates: {
    canonical: 'https://carverify.com.au/revs-check-melbourne',
  },
  openGraph: {
    title: 'REVS Check Melbourne - Vehicle Finance & Stolen Car Check VIC',
    description: 'Protect yourself when buying a car in Melbourne. Official PPSR/REVS check for all VIC vehicles. Finance, stolen & write-off checks from $34.99',
    url: 'https://carverify.com.au/revs-check-melbourne',
    siteName: 'Car Verify Australia',
    type: 'website',
  },
}

export default function RevsCheckMelbournePage() {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "REVS Check Melbourne",
    "description": "Official REVS check for Melbourne & VIC vehicles. Check finance owing, stolen status, write-offs & encumbrances on any car in Melbourne.",
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
            REVS Check Melbourne
            <span className="block text-purple-600 mt-2">Official VIC Vehicle Finance Check</span>
          </h1>
          <p className="text-xl text-black max-w-3xl mx-auto mb-8">
            Check any Melbourne or Victorian vehicle for finance owing, stolen status & write-offs. Instant REVS certificate from <strong>$34.99</strong>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold text-black">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Users className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-semibold text-black">Melbourne's #1 Check</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Clock className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold text-black">Instant VIC Results</span>
            </div>
          </div>

          <Link href="/" className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors inline-flex items-center gap-2 shadow-lg">
            <Shield className="h-5 w-5" />
            Check Melbourne Vehicle - $34.99
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6 text-center">
            <TrendingDown className="h-12 w-12 text-red-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-red-600 mb-2">$15,400</div>
            <div className="text-sm font-semibold text-black">Average Loss</div>
            <div className="text-sm text-black">Melbourne Buyers</div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-orange-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-orange-600 mb-2">1 in 4</div>
            <div className="text-sm font-semibold text-black">VIC Cars</div>
            <div className="text-sm text-black">Have Finance</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6 text-center">
            <CheckCircle className="h-12 w-12 text-purple-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-purple-600 mb-2">60 Sec</div>
            <div className="text-sm font-semibold text-black">Melbourne Check</div>
            <div className="text-sm text-black">Results</div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-l-8 border-purple-600 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-black mb-3">⚠️ Melbourne Car Buyers - Essential Protection!</h3>
            <p className="text-lg text-black mb-4">
              Consumer Affairs Victoria warns that <strong className="text-red-600">buying a Melbourne car with finance owing means YOU inherit the debt</strong>. The finance company can repossess the vehicle even though you paid for it.
            </p>
            <p className="text-black">
              In Melbourne's massive car market, a $34.99 REVS check is essential protection. Check BEFORE you buy!
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">What Melbourne Buyers Get</h2>
        </div>

        <div className="bg-white border-4 border-purple-600 rounded-lg shadow-2xl p-8">
          <div className="border-2 border-gray-300 rounded-lg p-6">
            <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Shield className="h-10 w-10 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-black">REVS CHECK - MELBOURNE</div>
                  <div className="text-sm text-black">Victoria Vehicle Report</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-semibold text-black mb-2">Melbourne Vehicle:</div>
                <div className="bg-gray-50 rounded p-3 space-y-1 text-sm">
                  <div className="text-black"><strong>Rego:</strong> 1AB2CD (VIC)</div>
                  <div className="text-black"><strong>Make:</strong> TOYOTA</div>
                  <div className="text-black"><strong>Model:</strong> RAV4</div>
                  <div className="text-black"><strong>Year:</strong> 2022</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-black mb-2">VIC Results:</div>
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
          <Link href="/" className="bg-purple-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-purple-700 transition-colors inline-flex items-center gap-3 shadow-xl">
            <FileText className="h-6 w-6" />
            Check Melbourne Car Now - $34.99
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 bg-red-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">🚨 Melbourne Car Theft Crisis 2024</h2>
            <p className="text-black text-lg max-w-3xl mx-auto">
              Victoria Police data reveals Melbourne is experiencing the worst car theft epidemic in 22 years. Before buying any car in Melbourne, understand the risks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-red-100 to-red-200 border-2 border-red-400 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-red-700 mb-2">28,922</div>
              <div className="text-sm font-semibold text-black">Vehicle Thefts (2024)</div>
              <div className="text-sm text-black">Highest in 22 Years</div>
              <div className="text-xs text-red-700 font-semibold mt-2">+41% from 2023</div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 border-2 border-orange-400 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-orange-700 mb-2">26,951</div>
              <div className="text-sm font-semibold text-black">Number Plate Thefts</div>
              <div className="text-sm text-black">Victoria (2024)</div>
              <div className="text-xs text-orange-700 font-semibold mt-2">+46% from 2023</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-400 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-yellow-700 mb-2">1 in 5</div>
              <div className="text-sm font-semibold text-black">Electronic Hacking</div>
              <div className="text-sm text-black">OBD Port Attacks</div>
              <div className="text-xs text-yellow-700 font-semibold mt-2">Push-start targets</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-xl border-2 border-gray-200">
            <h3 className="text-black text-2xl font-bold mb-6">High-Risk Melbourne Suburbs (2024 Data)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-3">
                  <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Melbourne CBD</span>
                      <span className="text-red-600 font-bold">1,633 thefts</span>
                    </div>
                    <p className="text-sm text-black">Highest theft area in Victoria</p>
                  </div>
                  <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Casey</span>
                      <span className="text-orange-600 font-bold">1,537 thefts</span>
                    </div>
                    <p className="text-sm text-black">Berwick, Cranbourne, Narre Warren areas</p>
                  </div>
                  <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Hume</span>
                      <span className="text-orange-600 font-bold">1,413 thefts</span>
                    </div>
                    <p className="text-sm text-black">Broadmeadows, Craigieburn, Sunbury areas</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Wyndham</span>
                      <span className="text-yellow-600 font-bold">1,398 thefts</span>
                    </div>
                    <p className="text-sm text-black">Werribee, Point Cook, Hoppers Crossing</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-3">
                  <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Whittlesea</span>
                      <span className="text-red-600 font-bold">+73.2%</span>
                    </div>
                    <p className="text-sm text-black">Sharpest rise in Melbourne - Mill Park, South Morang</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Dandenong</span>
                      <span className="text-yellow-600 font-bold">High Risk</span>
                    </div>
                    <p className="text-sm text-black">Consistent top 10 theft area</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Frankston</span>
                      <span className="text-yellow-600 font-bold">High Risk</span>
                    </div>
                    <p className="text-sm text-black">Southern suburbs theft hotspot</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Broadmeadows</span>
                      <span className="text-yellow-600 font-bold">High Risk</span>
                    </div>
                    <p className="text-sm text-black">Northern suburbs elevated risk</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mt-6">
              <p className="text-black font-semibold mb-3">⚠️ Melbourne Car Theft Warning:</p>
              <p className="text-black text-sm mb-2">
                If buying a car from Casey, Hume, Wyndham, Whittlesea, Dandenong, Frankston, or Broadmeadows areas, <strong>ALWAYS run a REVS check</strong>. These suburbs have significantly higher rates of stolen vehicles being sold.
              </p>
              <p className="text-black text-sm">
                <strong>Electronic hacking alert:</strong> 1 in 5 stolen Melbourne cars are now taken using OBD port hacking. If the seller has a push-start vehicle, verify they have BOTH keys and can demonstrate keyless entry works with both fobs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">Most Targeted Vehicles in Melbourne</h2>
          <p className="text-black text-lg max-w-3xl mx-auto">
            Victoria Police intelligence shows these vehicles are prime targets for Melbourne car thieves. If buying one of these models, a REVS check is critical.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-300 rounded-xl p-6">
            <h3 className="text-black text-xl font-bold mb-4">🚗 High-Theft Models</h3>
            <div className="space-y-3">
              <div className="bg-white rounded p-3">
                <div className="font-bold text-purple-700">Push-Start Vehicles</div>
                <p className="text-sm text-black">Any vehicle with keyless entry/start - targeted via OBD port hacking. Toyota RAV4, Mazda CX-5, Honda CR-V especially vulnerable.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-purple-700">Toyota HiLux</div>
                <p className="text-sm text-black">Consistently stolen across Melbourne. Strong resale value makes them targets for organized theft rings.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-purple-700">Holden Commodore VE</div>
                <p className="text-sm text-black">2006-2013 models most stolen car in Australia. Easy to steal, high parts demand.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-purple-700">Ford Ranger</div>
                <p className="text-sm text-black">Utes targeted for parts and export. Strong demand in theft market.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="text-black text-xl font-bold mb-4">🔍 VIC Roadworthy Requirements</h3>
            <div className="space-y-3">
              <div className="bg-white rounded p-3">
                <div className="font-bold text-blue-700">VicRoads Certificate</div>
                <p className="text-sm text-black">Seller doesn't need roadworthy to sell, but buyer needs it to transfer rego. Valid 30 days. Cost: $100-$200.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-blue-700">Stolen Vehicle Check</div>
                <p className="text-sm text-black">VicRoads will NOT transfer rego if vehicle is flagged as stolen on NEVDIS. Run REVS check before paying.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-blue-700">Written-Off Vehicles</div>
                <p className="text-sm text-black">Statutory write-offs CANNOT be re-registered in VIC. Repairable write-offs need VicRoads inspection ($215).</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-blue-700">Interstate Transfers</div>
                <p className="text-sm text-black">Vehicles from interstate need VIC roadworthy + identity inspection if VIN discrepancies exist.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">Melbourne Car Market Intelligence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-black text-xl font-bold mb-4">📊 Melbourne Market Size</h3>
              <div className="space-y-3 text-black">
                <p className="text-sm">
                  <strong>Victoria has Australia's largest used car market.</strong> Over 850,000 used vehicles change hands in VIC annually, with Melbourne metro accounting for ~650,000 of these sales.
                </p>
                <p className="text-sm">
                  <strong>Private sales dominate:</strong> 62% of Melbourne used car sales are private (not dealer). This is where REVS checks are most critical - dealers must disclose encumbrances, private sellers often don't.
                </p>
                <p className="text-sm">
                  <strong>Average Melbourne used car price:</strong> $32,500 (2024). With the median loss from buying a car with undisclosed finance at $15,400, a $34.99 REVS check has a 440:1 protection ratio.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-black text-xl font-bold mb-4">🏙️ Melbourne Dealership Zones</h3>
              <div className="space-y-3 text-black text-sm">
                <div className="bg-purple-50 rounded p-3">
                  <p className="font-semibold mb-1">Eastern Suburbs (Ringwood, Box Hill)</p>
                  <p>High concentration of prestige dealers. Check for grey imports with fake compliance plates.</p>
                </div>
                <div className="bg-purple-50 rounded p-3">
                  <p className="font-semibold mb-1">South-East (Dandenong, Springvale)</p>
                  <p>Wholesale car yards - higher risk of vehicles with undisclosed finance or stolen history.</p>
                </div>
                <div className="bg-purple-50 rounded p-3">
                  <p className="font-semibold mb-1">Western Suburbs (Sunshine, Footscray)</p>
                  <p>Budget dealers, watch for odometer rollbacks and "repairable write-offs" sold as clean.</p>
                </div>
                <div className="bg-purple-50 rounded p-3">
                  <p className="font-semibold mb-1">Online Marketplaces (Gumtree, Facebook)</p>
                  <p>Highest scam risk. 34% of Melbourne car scams originate on Facebook Marketplace.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-l-8 border-purple-600 rounded-lg p-8 mt-8 shadow-xl">
            <h3 className="text-black text-2xl font-bold mb-4">💡 Melbourne Buyer's Checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Run REVS check on VIN + Rego number</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Verify seller ID matches rego papers</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Check VIN plate hasn't been tampered with</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Get VicRoads roadworthy certificate (30-day validity)</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Inspect both key fobs work (if push-start)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Walk away from Casey/Hume/Wyndham cars with unclear history</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Never pay cash - use bank transfer for paper trail</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Inspect at seller's address, not public car park</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-6">
            Melbourne's Most Trusted REVS Check
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Protect yourself when buying any car in Melbourne or VIC. Instant results.
          </p>

          <div className="bg-white rounded-xl p-8 inline-block shadow-2xl">
            <div className="text-5xl font-bold text-purple-600 mb-2">$34.99</div>
            <div className="text-black mb-6">Melbourne & VIC vehicles</div>
            <Link href="/" className="bg-purple-600 text-white px-12 py-6 rounded-lg text-2xl font-bold hover:bg-purple-700 transition-colors inline-block shadow-xl">
              Check Melbourne Vehicle
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

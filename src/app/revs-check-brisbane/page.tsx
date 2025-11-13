import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, AlertTriangle, FileText, Star, Clock, Users, TrendingDown, Award } from 'lucide-react'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'REVS Check Brisbane - Instant Vehicle Finance Check QLD | From $34.99',
  description: 'Official REVS check for Brisbane & QLD vehicles. Check finance owing, stolen status, write-offs & encumbrances on any car in Brisbane. Instant REVS certificate from $34.99',
  keywords: 'revs check brisbane, revs check qld, ppsr check brisbane, brisbane car check, finance check brisbane, stolen car check brisbane, vehicle history brisbane',
  alternates: {
    canonical: 'https://carverify.com.au/revs-check-brisbane',
  },
  openGraph: {
    title: 'REVS Check Brisbane - Vehicle Finance & Stolen Car Check QLD',
    description: 'Protect yourself when buying a car in Brisbane. Official PPSR/REVS check for all QLD vehicles. Finance, stolen & write-off checks from $34.99',
    url: 'https://carverify.com.au/revs-check-brisbane',
    siteName: 'Car Verify Australia',
    type: 'website',
  },
}

export default function RevsCheckBrisbanePage() {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "REVS Check Brisbane",
    "description": "Official REVS check for Brisbane & QLD vehicles. Check finance owing, stolen status, write-offs & encumbrances on any car in Brisbane.",
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
            REVS Check Brisbane
            <span className="block text-teal-600 mt-2">Official QLD Vehicle Finance Check</span>
          </h1>
          <p className="text-xl text-black max-w-3xl mx-auto mb-8">
            Check any Brisbane or Queensland vehicle for finance owing, stolen status & write-offs. Instant REVS certificate from <strong>$34.99</strong>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold text-black">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Users className="h-5 w-5 text-teal-600" />
              <span className="text-sm font-semibold text-black">Brisbane's Trusted Check</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-semibold text-black">Instant QLD Results</span>
            </div>
          </div>

          <Link href="/" className="bg-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-colors inline-flex items-center gap-2 shadow-lg">
            <Shield className="h-5 w-5" />
            Check Brisbane Vehicle - $34.99
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6 text-center">
            <TrendingDown className="h-12 w-12 text-red-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-red-600 mb-2">$15,400</div>
            <div className="text-sm font-semibold text-black">Average Loss</div>
            <div className="text-sm text-black">Brisbane Car Buyers</div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-orange-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-orange-600 mb-2">1 in 4</div>
            <div className="text-sm font-semibold text-black">QLD Cars</div>
            <div className="text-sm text-black">Have Finance</div>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-200 rounded-xl p-6 text-center">
            <CheckCircle className="h-12 w-12 text-teal-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-teal-600 mb-2">60 Sec</div>
            <div className="text-sm font-semibold text-black">Brisbane Check</div>
            <div className="text-sm text-black">Results</div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-gradient-to-r from-teal-100 to-cyan-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-l-8 border-teal-600 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-black mb-3">⚠️ Brisbane Car Buyers - Don't Risk It!</h3>
            <p className="text-lg text-black mb-4">
              Office of Fair Trading QLD warns that <strong className="text-red-600">buying a car in Brisbane with finance owing means YOU inherit the debt</strong>. The finance company can repossess the vehicle even though you paid for it.
            </p>
            <p className="text-black">
              A $34.99 REVS check protects you from losing $15,400+ on a Brisbane car purchase. Check BEFORE you buy!
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">What Brisbane Buyers Get</h2>
        </div>

        <div className="bg-white border-4 border-teal-600 rounded-lg shadow-2xl p-8">
          <div className="border-2 border-gray-300 rounded-lg p-6">
            <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Shield className="h-10 w-10 text-teal-600" />
                <div>
                  <div className="text-2xl font-bold text-black">REVS CHECK - BRISBANE</div>
                  <div className="text-sm text-black">Queensland Vehicle Report</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-semibold text-black mb-2">Brisbane Vehicle:</div>
                <div className="bg-gray-50 rounded p-3 space-y-1 text-sm">
                  <div className="text-black"><strong>Rego:</strong> 123ABC (QLD)</div>
                  <div className="text-black"><strong>Make:</strong> HOLDEN</div>
                  <div className="text-black"><strong>Model:</strong> COLORADO</div>
                  <div className="text-black"><strong>Year:</strong> 2021</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-black mb-2">QLD Results:</div>
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
          <Link href="/" className="bg-teal-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-teal-700 transition-colors inline-flex items-center gap-3 shadow-xl">
            <FileText className="h-6 w-6" />
            Check Brisbane Car Now - $34.99
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 bg-red-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">🚨 Brisbane: Biggest Car Theft Spike in Australia</h2>
            <p className="text-black text-lg max-w-3xl mx-auto">
              RACQ data reveals Queensland has suffered a 101% car theft increase since 2015 - the worst of any Australian state. Youth crime and organized theft rings target Brisbane suburbs. Protect yourself with a REVS check.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-red-100 to-red-200 border-2 border-red-400 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-red-700 mb-2">+101%</div>
              <div className="text-sm font-semibold text-black">Car Theft Increase</div>
              <div className="text-sm text-black">2015 to 2024</div>
              <div className="text-xs text-red-700 font-semibold mt-2">Worst in Australia</div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 border-2 border-orange-400 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-orange-700 mb-2">$113M</div>
              <div className="text-sm font-semibold text-black">Stolen Vehicle Value</div>
              <div className="text-sm text-black">Queensland 2024</div>
              <div className="text-xs text-orange-700 font-semibold mt-2">+305% vs 2015</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-400 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-yellow-700 mb-2">1,459</div>
              <div className="text-sm font-semibold text-black">RACQ Theft Claims</div>
              <div className="text-sm text-black">QLD 2024</div>
              <div className="text-xs text-yellow-700 font-semibold mt-2">Down 10% from 2023</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-xl border-2 border-gray-200">
            <h3 className="text-black text-2xl font-bold mb-6">High-Risk Brisbane & QLD Suburbs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-3">
                  <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Logan</span>
                      <span className="text-red-600 font-bold">Very High Risk</span>
                    </div>
                    <p className="text-sm text-black">Brisbane's theft epicenter - Logan Central, Woodridge, Kingston</p>
                  </div>
                  <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Ipswich</span>
                      <span className="text-orange-600 font-bold">High Risk</span>
                    </div>
                    <p className="text-sm text-black">Western Brisbane - Ipswich CBD, Goodna, Leichhardt areas</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Inala</span>
                      <span className="text-yellow-600 font-bold">High Risk</span>
                    </div>
                    <p className="text-sm text-black">South-West Brisbane hotspot for youth car theft</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Brisbane Inner City</span>
                      <span className="text-yellow-600 font-bold">103 claims (2023-24)</span>
                    </div>
                    <p className="text-sm text-black">CBD and surrounding suburbs - opportunistic theft</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-3">
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Brisbane South</span>
                      <span className="text-yellow-600 font-bold">134 claims (2023-24)</span>
                    </div>
                    <p className="text-sm text-black">Southern suburbs showing elevated theft rates</p>
                  </div>
                  <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Gold Coast (Pimpama)</span>
                      <span className="text-orange-600 font-bold">Highest Rate</span>
                    </div>
                    <p className="text-sm text-black">Pimpama & Surfers Paradise high per-capita theft</p>
                  </div>
                  <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Townsville (Kirwan)</span>
                      <span className="text-orange-600 font-bold">Regional Hotspot</span>
                    </div>
                    <p className="text-sm text-black">North QLD - Kirwan highest rate per capita</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Cairns</span>
                      <span className="text-yellow-600 font-bold">High Claims</span>
                    </div>
                    <p className="text-sm text-black">Far North QLD - tourist areas targeted</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mt-6">
              <p className="text-black font-semibold mb-3">⚠️ Brisbane Youth Crime Crisis:</p>
              <p className="text-black text-sm mb-2">
                <strong>Queensland Police report a sharp spike in youth-related car thefts.</strong> Logan, Ipswich, and Inala have seen organized groups of juveniles targeting vehicles for joyrides and resale. If buying from these areas, verify the seller's address matches rego docs.
              </p>
              <p className="text-black text-sm">
                <strong>101% increase since 2015:</strong> Brisbane has the worst car theft growth in Australia. The majority of stolen vehicles are 4WDs and utes (LandCruiser, HiLux, Ranger) due to strong export demand. Always check these models.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">Most Stolen Vehicles in Brisbane</h2>
          <p className="text-black text-lg max-w-3xl mx-auto">
            RACQ 2024 data shows these vehicles are prime targets for Queensland car thieves. 4WDs and utes lead theft statistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-300 rounded-xl p-6">
            <h3 className="text-black text-xl font-bold mb-4">🚗 Most Stolen Models in QLD</h3>
            <div className="space-y-3">
              <div className="bg-white rounded p-3">
                <div className="font-bold text-teal-700">#1 Toyota LandCruiser</div>
                <p className="text-sm text-black">Most commonly stolen vehicle in Queensland 2024. Strong export market drives organized theft. All models targeted (70, 100, 200 series).</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-teal-700">#2 Toyota HiLux</div>
                <p className="text-sm text-black">Second most stolen in QLD. All model years targeted. Parts demand + resale value = high theft risk.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-teal-700">#3 Ford Ranger</div>
                <p className="text-sm text-black">Utes dominate Brisbane theft stats. Rangers targeted for parts stripping and interstate resale.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-teal-700">Why 4WDs & Utes?</div>
                <p className="text-sm text-black">Queensland's mining & rural industries create strong demand for parts. Stolen 4WDs often stripped and parts sold online.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-6">
            <h3 className="text-black text-xl font-bold mb-4">🔍 QLD Safety Certificate Requirements</h3>
            <div className="space-y-3">
              <div className="bg-white rounded p-3">
                <div className="font-bold text-green-700">Safety Certificate (QLD Roadworthy)</div>
                <p className="text-sm text-black">Required BEFORE transfer. Valid 2 months (extendable to 3 if extended). Costs $60-$120 from approved examiner.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-green-700">Blue Slip (QLD Vehicle Identity)</div>
                <p className="text-sm text-black">Required for interstate vehicles, grey imports, rebuilt write-offs. Includes VIN verification. Cost: $60-$100.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-green-700">CTP Insurance</div>
                <p className="text-sm text-black">Compulsory Third Party included IN QLD rego fee (unlike NSW). One-stop payment at QLD Transport.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-green-700">Written-Off Vehicles</div>
                <p className="text-sm text-black">Statutory write-offs CANNOT be re-registered in QLD. Repairable write-offs need engineer's report + safety certificate.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-teal-100 to-cyan-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">Brisbane Car Market Intelligence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-black text-xl font-bold mb-4">📊 Brisbane Market Size</h3>
              <div className="space-y-3 text-black">
                <p className="text-sm">
                  <strong>Queensland is Australia's third-largest used car market.</strong> Over 580,000 used vehicles change hands in QLD annually, with Greater Brisbane accounting for ~380,000 of these sales.
                </p>
                <p className="text-sm">
                  <strong>4WD & Ute dominance:</strong> Queensland has the highest proportion of 4WD/ute sales in Australia (42% of market vs 34% national average). This drives targeted theft of LandCruisers, HiLuxes, Rangers.
                </p>
                <p className="text-sm">
                  <strong>Average Brisbane used car price:</strong> $33,200 (2024) - higher than national due to 4WD demand. With $113M in thefts (2024), a $34.99 REVS check is essential for any Brisbane purchase.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-black text-xl font-bold mb-4">🏙️ Brisbane Dealership Zones</h3>
              <div className="space-y-3 text-black text-sm">
                <div className="bg-teal-50 rounded p-3">
                  <p className="font-semibold mb-1">Archerfield & Moorooka</p>
                  <p>Major used car dealer hub. Mix of reputable and budget dealers. Always run REVS check regardless.</p>
                </div>
                <div className="bg-teal-50 rounded p-3">
                  <p className="font-semibold mb-1">Logan & Ipswich</p>
                  <p>Budget dealers, higher risk areas. Walk away if seller can't provide clean paperwork or refuses REVS check.</p>
                </div>
                <div className="bg-teal-50 rounded p-3">
                  <p className="font-semibold mb-1">Gold Coast (Southport, Burleigh)</p>
                  <p>Tourist area - higher scam risk. Verify seller's QLD address. Be wary of interstate sellers operating in QLD.</p>
                </div>
                <div className="bg-teal-50 rounded p-3">
                  <p className="font-semibold mb-1">Online Marketplaces (Gumtree, Facebook)</p>
                  <p>Youth theft rings often advertise stolen vehicles online. Never buy without REVS check + verified ID.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-l-8 border-teal-600 rounded-lg p-8 mt-8 shadow-xl">
            <h3 className="text-black text-2xl font-bold mb-4">💡 Brisbane Buyer's Checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Run REVS check on VIN + Rego (QLD format: 123ABC)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Verify seller ID + address matches rego documents</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Get QLD Safety Certificate (2-3 month validity)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Inspect VIN plate for tampering (especially 4WDs)</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Avoid Logan, Ipswich, Inala cars with unclear history</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">LandCruiser/HiLux/Ranger = mandatory REVS check</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Never pay cash - use bank transfer for paper trail</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Meet at seller's home, not public car park (youth theft risk)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-teal-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-6">
            Brisbane's Most Trusted REVS Check
          </h2>
          <p className="text-xl text-teal-100 mb-8">
            Protect yourself when buying any car in Brisbane or QLD. Instant results.
          </p>

          <div className="bg-white rounded-xl p-8 inline-block shadow-2xl">
            <div className="text-5xl font-bold text-teal-600 mb-2">$34.99</div>
            <div className="text-black mb-6">Brisbane & QLD vehicles</div>
            <Link href="/" className="bg-teal-600 text-white px-12 py-6 rounded-lg text-2xl font-bold hover:bg-teal-700 transition-colors inline-block shadow-xl">
              Check Brisbane Vehicle
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

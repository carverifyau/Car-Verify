import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, AlertTriangle, FileText, Star, Clock, Users, TrendingDown, Award } from 'lucide-react'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'REVS Check Sydney - Instant Vehicle Finance Check NSW | From $34.99',
  description: 'Official REVS check for Sydney & NSW vehicles. Check finance owing, stolen status, write-offs & encumbrances on any car in Sydney. Instant REVS certificate from $34.99',
  keywords: 'revs check sydney, revs check nsw, ppsr check sydney, sydney car check, finance check sydney, stolen car check sydney, vehicle history sydney',
  alternates: {
    canonical: 'https://carverify.com.au/revs-check-sydney',
  },
  openGraph: {
    title: 'REVS Check Sydney - Vehicle Finance & Stolen Car Check NSW',
    description: 'Protect yourself when buying a car in Sydney. Official PPSR/REVS check for all NSW vehicles. Finance, stolen & write-off checks from $34.99',
    url: 'https://carverify.com.au/revs-check-sydney',
    siteName: 'Car Verify Australia',
    type: 'website',
  },
}

export default function RevsCheckSydneyPage() {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "REVS Check Sydney",
    "description": "Official REVS check for Sydney & NSW vehicles. Check finance owing, stolen status, write-offs & encumbrances on any car in Sydney.",
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
            REVS Check Sydney
            <span className="block text-blue-600 mt-2">Official NSW Vehicle Finance Check</span>
          </h1>
          <p className="text-xl text-black max-w-3xl mx-auto mb-8">
            Check any Sydney or New South Wales vehicle for finance owing, stolen status & write-offs. Instant REVS certificate from <strong>$34.99</strong>
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold text-black">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-semibold text-black">Sydney's #1 Check</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm">
              <Clock className="h-5 w-5 text-green-600" />
              <span className="text-sm font-semibold text-black">Instant NSW Results</span>
            </div>
          </div>

          <Link href="/" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2 shadow-lg">
            <Shield className="h-5 w-5" />
            Check Sydney Vehicle - $34.99
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 rounded-xl p-6 text-center">
            <TrendingDown className="h-12 w-12 text-red-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-red-600 mb-2">$15,400</div>
            <div className="text-sm font-semibold text-black">Average Loss</div>
            <div className="text-sm text-black">Sydney Buyers</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-orange-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-orange-600 mb-2">1 in 4</div>
            <div className="text-sm font-semibold text-black">NSW Cars</div>
            <div className="text-sm text-black">Have Finance</div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 text-center">
            <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <div className="text-4xl font-bold text-blue-600 mb-2">60 Sec</div>
            <div className="text-sm font-semibold text-black">Sydney Check</div>
            <div className="text-sm text-black">Results</div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-gradient-to-r from-blue-100 to-indigo-100">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border-l-8 border-blue-600 p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-black mb-3">⚠️ Sydney Car Buyers - Essential Protection!</h3>
            <p className="text-lg text-black mb-4">
              NSW Fair Trading warns that <strong className="text-red-600">buying a Sydney car with finance owing means YOU inherit the debt</strong>. The finance company can repossess the vehicle even though you paid for it.
            </p>
            <p className="text-black">
              In Sydney's massive car market, a $34.99 REVS check is essential protection. Check BEFORE you buy!
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">What Sydney Buyers Get</h2>
        </div>

        <div className="bg-white border-4 border-blue-600 rounded-lg shadow-2xl p-8">
          <div className="border-2 border-gray-300 rounded-lg p-6">
            <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Shield className="h-10 w-10 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-black">REVS CHECK - SYDNEY</div>
                  <div className="text-sm text-black">New South Wales Vehicle Report</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-semibold text-black mb-2">Sydney Vehicle:</div>
                <div className="bg-gray-50 rounded p-3 space-y-1 text-sm">
                  <div className="text-black"><strong>Rego:</strong> ABC123 (NSW)</div>
                  <div className="text-black"><strong>Make:</strong> MAZDA</div>
                  <div className="text-black"><strong>Model:</strong> CX-5</div>
                  <div className="text-black"><strong>Year:</strong> 2021</div>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-black mb-2">NSW Results:</div>
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
          <Link href="/" className="bg-blue-600 text-white px-10 py-5 rounded-lg text-xl font-bold hover:bg-blue-700 transition-colors inline-flex items-center gap-3 shadow-xl">
            <FileText className="h-6 w-6" />
            Check Sydney Car Now - $34.99
          </Link>
        </div>
      </section>

      <section className="py-16 px-4 bg-red-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">🚨 Sydney Car Theft: 70% Stolen With Keys</h2>
            <p className="text-black text-lg max-w-3xl mx-auto">
              NSW Bureau of Crime Statistics reveals a shocking trend: 70% of Sydney car thefts involve the owner's keys. Western Sydney leads NSW in vehicle theft. Know the risks before buying.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-red-100 to-red-200 border-2 border-red-400 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-red-700 mb-2">14,516</div>
              <div className="text-sm font-semibold text-black">Cars Stolen (2023-24)</div>
              <div className="text-sm text-black">NSW Total</div>
              <div className="text-xs text-red-700 font-semibold mt-2">+2.1% vs 5 years ago</div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 border-2 border-orange-400 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-orange-700 mb-2">70%</div>
              <div className="text-sm font-semibold text-black">Stolen With Keys</div>
              <div className="text-sm text-black">Sydney Cars</div>
              <div className="text-xs text-orange-700 font-semibold mt-2">Home break-ins rising</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-400 rounded-xl p-6 text-center">
              <div className="text-5xl font-bold text-yellow-700 mb-2">+36%</div>
              <div className="text-sm font-semibold text-black">Penrith Thefts</div>
              <div className="text-sm text-black">2022 to 2023</div>
              <div className="text-xs text-yellow-700 font-semibold mt-2">Fastest growing</div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-xl border-2 border-gray-200">
            <h3 className="text-black text-2xl font-bold mb-6">High-Risk Sydney Suburbs (2023 Data)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-3">
                  <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Blacktown City</span>
                      <span className="text-red-600 font-bold">799 thefts</span>
                    </div>
                    <p className="text-sm text-black">+24.4% from 2022 - Western Sydney epicenter</p>
                  </div>
                  <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Central Coast</span>
                      <span className="text-orange-600 font-bold">587 thefts</span>
                    </div>
                    <p className="text-sm text-black">+35.2% from 2022 - Sharp spike in coastal area</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Penrith</span>
                      <span className="text-yellow-600 font-bold">535 thefts</span>
                    </div>
                    <p className="text-sm text-black">+36.1% from 2022 - Highest growth in Sydney</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Canterbury-Bankstown</span>
                      <span className="text-yellow-600 font-bold">527 thefts</span>
                    </div>
                    <p className="text-sm text-black">South-West Sydney hotspot</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-3">
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Lake Macquarie</span>
                      <span className="text-yellow-600 font-bold">503 thefts</span>
                    </div>
                    <p className="text-sm text-black">+22.6% from 2022 - Hunter region risk</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Cumberland</span>
                      <span className="text-yellow-600 font-bold">458 thefts</span>
                    </div>
                    <p className="text-sm text-black">+21.4% from 2022 - Western Sydney growth</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Parramatta</span>
                      <span className="text-yellow-600 font-bold">443 thefts</span>
                    </div>
                    <p className="text-sm text-black">+20.7% from 2022 - CBD area elevated risk</p>
                  </div>
                  <div className="bg-orange-50 border-l-4 border-orange-600 p-4 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-black font-bold">Liverpool & Campbelltown</span>
                      <span className="text-orange-600 font-bold">High Risk</span>
                    </div>
                    <p className="text-sm text-black">Consistently high theft rates</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6 mt-6">
              <p className="text-black font-semibold mb-3">⚠️ Sydney Western Suburbs Warning:</p>
              <p className="text-black text-sm mb-2">
                <strong>Western and South-Western Sydney account for over 50% of NSW vehicle thefts.</strong> If buying a car from Blacktown, Penrith, Canterbury-Bankstown, Cumberland, Parramatta, Liverpool, or Campbelltown, always run a REVS check.
              </p>
              <p className="text-black text-sm">
                <strong>70% of Sydney cars stolen with keys:</strong> Thieves break into homes to steal car keys. If the seller has a recent model (2018+), ask where they park overnight. Cars parked on street in Western Sydney have 3x higher theft risk.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">Most Targeted Vehicles in Sydney</h2>
          <p className="text-black text-lg max-w-3xl mx-auto">
            NSW Police data shows these brands and models are prime targets for Sydney car thieves. Run a REVS check if buying any of these.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl p-6">
            <h3 className="text-black text-xl font-bold mb-4">🚗 High-Theft Brands & Models</h3>
            <div className="space-y-3">
              <div className="bg-white rounded p-3">
                <div className="font-bold text-blue-700">#1 Toyota</div>
                <p className="text-sm text-black">Most stolen brand in NSW. HiLux, Camry, Corolla, RAV4 targeted. Strong resale value drives theft demand.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-blue-700">#2 Holden</div>
                <p className="text-sm text-black">Commodore VE (2006-2013) consistently most stolen car in Australia. Easy to steal, high parts demand.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-blue-700">#3 Ford</div>
                <p className="text-sm text-black">Ranger utes targeted for parts and export. Strong theft market across Western Sydney.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-blue-700">Fastest Growing Thefts</div>
                <p className="text-sm text-black"><strong>Kia, Jeep, Isuzu, Land Rover, Volkswagen</strong> - Largest percentage increases in 5 years to March 2023.</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-6">
            <h3 className="text-black text-xl font-bold mb-4">🔍 NSW Pink Slip Requirements</h3>
            <div className="space-y-3">
              <div className="bg-white rounded p-3">
                <div className="font-bold text-green-700">Pink Slip (eSafety Check)</div>
                <p className="text-sm text-black">Required BEFORE transfer. Valid 42 days. Costs $40-$60 from authorized inspection station. Seller doesn't need one to sell.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-green-700">Blue Slip (Vehicle Identity)</div>
                <p className="text-sm text-black">Required if: NSW rego expired &gt;3 months, interstate vehicle, or rebuilt write-off. Stricter than Pink Slip. Cost: $40-$60.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-green-700">CTP Insurance (Green Slip)</div>
                <p className="text-sm text-black">Compulsory Third Party. Must be purchased SEPARATELY before rego. NOT included in registration fee. Sydney: $350-$600/year.</p>
              </div>
              <div className="bg-white rounded p-3">
                <div className="font-bold text-green-700">Written-Off Vehicles</div>
                <p className="text-sm text-black">Statutory write-offs CANNOT be re-registered in NSW. Repairable write-offs need Blue Slip identity inspection.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-blue-100 to-indigo-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-black text-3xl md:text-4xl font-bold mb-4">Sydney Car Market Intelligence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-black text-xl font-bold mb-4">📊 Sydney Market Size</h3>
              <div className="space-y-3 text-black">
                <p className="text-sm">
                  <strong>NSW is Australia's second-largest used car market.</strong> Over 720,000 used vehicles change hands in NSW annually, with Greater Sydney accounting for ~550,000 of these sales.
                </p>
                <p className="text-sm">
                  <strong>Private sales dominate:</strong> 58% of Sydney used car sales are private (not dealer). Private sellers don't have the same disclosure obligations as licensed dealers - REVS checks are critical.
                </p>
                <p className="text-sm">
                  <strong>Average Sydney used car price:</strong> $31,800 (2024). With 70% of stolen Sydney cars taken with keys (often sold quickly), a $34.99 REVS check protects against a $15,400+ average loss.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-black text-xl font-bold mb-4">🏙️ Sydney Dealership Zones</h3>
              <div className="space-y-3 text-black text-sm">
                <div className="bg-blue-50 rounded p-3">
                  <p className="font-semibold mb-1">Parramatta Road Corridor</p>
                  <p>Australia's longest car dealer strip. Mix of reputable and dodgy dealers. Check REVS on ALL cars here.</p>
                </div>
                <div className="bg-blue-50 rounded p-3">
                  <p className="font-semibold mb-1">Western Sydney (Liverpool, Blacktown)</p>
                  <p>Budget dealers, higher risk of vehicles with undisclosed finance. Walk away if paperwork isn't perfect.</p>
                </div>
                <div className="bg-blue-50 rounded p-3">
                  <p className="font-semibold mb-1">North Shore (Chatswood, St Leonards)</p>
                  <p>Prestige dealers. Check for grey imports with fake compliance. VIN verification critical.</p>
                </div>
                <div className="bg-blue-50 rounded p-3">
                  <p className="font-semibold mb-1">Online Marketplaces (Gumtree, Facebook)</p>
                  <p>Highest scam risk. Never inspect at night. Always meet at seller's registered address.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-l-8 border-blue-600 rounded-lg p-8 mt-8 shadow-xl">
            <h3 className="text-black text-2xl font-bold mb-4">💡 Sydney Buyer's Checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Run REVS check on VIN + Rego number (NSW rego format: ABC123 or AB12CD)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Verify seller ID matches rego papers exactly</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Get Pink Slip (42-day validity) - walk away if seller refuses</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Check VIN plate for tampering (rivets should be original factory)</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Avoid cars from Blacktown, Penrith, Liverpool with unclear history</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Ask where car is parked overnight (street parking = higher theft risk)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Never pay cash - use bank transfer for paper trail</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-black">Verify BOTH keys present (70% of Sydney thefts use stolen keys)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <Award className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-white text-3xl md:text-5xl font-bold mb-6">
            Sydney's Most Trusted REVS Check
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Protect yourself when buying any car in Sydney or NSW. Instant results.
          </p>
          
          <div className="bg-white rounded-xl p-8 inline-block shadow-2xl">
            <div className="text-5xl font-bold text-blue-600 mb-2">$34.99</div>
            <div className="text-black mb-6">Sydney & NSW vehicles</div>
            <Link href="/" className="bg-blue-600 text-white px-12 py-6 rounded-lg text-2xl font-bold hover:bg-blue-700 transition-colors inline-block shadow-xl">
              Check Sydney Vehicle
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, AlertTriangle, FileCheck, Wrench, Eye, DollarSign, Key } from 'lucide-react'

export const metadata: Metadata = {
  title: 'What to Check When Buying a Used Car in Australia - Complete 2025 Guide',
  description: 'Complete checklist of everything to check when buying a used car in Australia. PPSR check, mechanical inspection, test drive, paperwork, and red flags to avoid costly mistakes.',
  keywords: 'what to check when buying used car, buying used car checklist, used car inspection checklist, what to look for buying used car, used car buying guide australia',
  alternates: {
    canonical: 'https://carverify.com.au/blog/what-to-check-when-buying-used-car',
  },
  openGraph: {
    title: 'What to Check When Buying a Used Car - Complete Australian Guide',
    description: 'Don't get ripped off! Complete checklist of everything to check when buying a used car in Australia. PPSR, inspections, test drives & more.',
    url: 'https://carverify.com.au/blog/what-to-check-when-buying-used-car',
    siteName: 'Car Verify Australia',
    type: 'article',
  },
}

export default function WhatToCheckBuyingUsedCarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <article className="py-16 px-4 max-w-4xl mx-auto">
        <header className="mb-12">
          <div className="text-sm text-blue-600 font-semibold mb-3">CAR BUYING GUIDE</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What to Check When Buying a Used Car in Australia - Complete 2025 Checklist
          </h1>
          <p className="text-xl text-black">
            Buying a used car can save you thousands, but only if you know what to check. This comprehensive guide covers everything you need to verify before handing over your money - from PPSR checks to test drives.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-700">
                  <strong>Critical First Step:</strong> Before even inspecting a used car, always run a PPSR check. ASIC reports Australians lose an average of $15,400 when they unknowingly buy a vehicle with finance owing. Don't be a statistic.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Table of Contents */}
        <nav className="bg-blue-50 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Complete Used Car Buying Checklist:</h2>
          <ol className="space-y-2 text-black">
            <li>1. PPSR Check (Finance & Stolen Status)</li>
            <li>2. Exterior Inspection</li>
            <li>3. Interior Inspection</li>
            <li>4. Under the Hood Check</li>
            <li>5. Test Drive Evaluation</li>
            <li>6. Documentation Verification</li>
            <li>7. Mechanical Inspection</li>
            <li>8. Price Negotiation</li>
            <li>9. Red Flags to Walk Away From</li>
            <li>10. Final Purchase Checklist</li>
          </ol>
        </nav>

        {/* 1. PPSR Check */}
        <section className="mb-12">
          <div className="flex items-center mb-4">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">1. PPSR Check - Your First and Most Important Step</h2>
          </div>
          <div className="prose prose-lg max-w-none text-black">
            <p className="mb-4">
              Before you even look at the car in person, conduct a PPSR check (Personal Property Securities Register). This official government database search reveals:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Finance owing:</strong> Whether the car has outstanding loans (you inherit this debt if you buy)</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Stolen status:</strong> If the vehicle has been reported stolen anywhere in Australia</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Write-off history:</strong> Whether it's been deemed a total loss by insurance</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Encumbrances:</strong> Any legal claims or security interests registered against it</span>
              </li>
            </ul>
            
            <div className="bg-red-50 border-l-4 border-red-400 p-4 my-6">
              <p className="text-sm text-red-700">
                <strong>Why this matters:</strong> Under Australian law, if you buy a car with finance owing, the debt transfers to YOU. The finance company can legally repossess the vehicle even though you paid for it. A PPSR check costs $34.99 - far cheaper than losing $15,400+ to an encumbered vehicle.
              </p>
            </div>

            <div className="text-center my-8">
              <Link href="/checkout" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 inline-block">
                Run PPSR Check Now - $34.99
              </Link>
              <p className="text-sm text-black mt-2">Instant results • Official certificate • Essential first step</p>
            </div>
          </div>
        </section>

        {/* 2. Exterior Inspection */}
        <section className="mb-12">
          <div className="flex items-center mb-4">
            <Eye className="h-8 w-8 text-purple-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">2. Exterior Inspection - What to Look For</h2>
          </div>
          <div className="prose prose-lg max-w-none text-black">
            <p className="mb-4">
              Walk around the car in good lighting (daylight is best) and check systematically:
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Paint and Panels</h3>
            <ul className="space-y-2 mb-4">
              <li><strong>Colour consistency:</strong> Look for mismatched paint colours between panels (indicates accident repair)</li>
              <li><strong>Orange peel texture:</strong> Uneven paint texture suggests poor quality respray work</li>
              <li><strong>Panel gaps:</strong> Uneven gaps between doors, bonnet, and boot suggest frame damage or poor repairs</li>
              <li><strong>Overspray:</strong> Paint on rubber seals, trim, or windows indicates careless repair work</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Body Damage</h3>
            <ul className="space-y-2 mb-4">
              <li><strong>Rust:</strong> Check wheel arches, door sills, under doors, and boot floor for rust bubbles</li>
              <li><strong>Dents and scratches:</strong> Minor cosmetic damage is normal, but major dents may indicate accident history</li>
              <li><strong>Cracked or chipped windscreen:</strong> Can be expensive to replace, use as negotiation leverage</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Tyres and Wheels</h3>
            <ul className="space-y-2 mb-4">
              <li><strong>Tread depth:</strong> Minimum legal tread is 1.6mm in Australia, but 3mm+ is ideal</li>
              <li><strong>Even wear:</strong> Uneven tyre wear suggests alignment issues or suspension problems</li>
              <li><strong>Matching tyres:</strong> All four tyres should be the same brand and similar age for best safety</li>
              <li><strong>Wheel damage:</strong> Curb rash, dents, or buckles indicate poor driving or accidents</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Lights and Glass</h3>
            <ul className="space-y-2 mb-4">
              <li><strong>All lights working:</strong> Headlights (high and low beam), indicators, brake lights, reverse lights</li>
              <li><strong>Condensation in lights:</strong> Moisture inside headlights or tail lights indicates seal failure</li>
              <li><strong>Cracked glass:</strong> Windscreen, windows, and mirrors should be crack-free</li>
            </ul>
          </div>
        </section>

        {/* 3. Interior Inspection */}
        <section className="mb-12">
          <div className="flex items-center mb-4">
            <Eye className="h-8 w-8 text-orange-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">3. Interior Inspection - Signs of True Condition</h2>
          </div>
          <div className="prose prose-lg max-w-none text-black">
            <p className="mb-4">
              The interior reveals how well the previous owner maintained the car. Here's what to check:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Odometer and Mileage</h3>
            <ul className="space-y-2 mb-4">
              <li><strong>Check the odometer:</strong> Average is 15,000-20,000km per year in Australia</li>
              <li><strong>Service history:</strong> Compare odometer reading with service book stamps</li>
              <li><strong>Wear vs mileage:</strong> Low mileage but heavily worn pedals/steering wheel = odometer tampering</li>
              <li><strong>Digital odometer check:</strong> Some mechanics can verify if it's been rolled back</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Seats and Upholstery</h3>
            <ul className="space-y-2 mb-4">
              <li><strong>Tears and stains:</strong> Check all seats for rips, burns, or permanent stains</li>
              <li><strong>Seat adjustment:</strong> All power seat functions should work smoothly</li>
              <li><strong>Smell:</strong> Musty or mouldy smell indicates water leaks or flood damage</li>
              <li><strong>Carpet wetness:</strong> Feel carpets for dampness, especially in boot and under floor mats</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Dashboard and Controls</h3>
            <ul className="space-y-2 mb-4">
              <li><strong>Warning lights:</strong> When you turn ignition on, all warning lights should illuminate then go off</li>
              <li><strong>Air conditioning:</strong> Test both heating and cooling - should blow cold within 30 seconds</li>
              <li><strong>All switches:</strong> Windows, mirrors, locks, wipers, lights - everything should work</li>
              <li><strong>Infotainment system:</strong> Test radio, Bluetooth, navigation, and touchscreen response</li>
              <li><strong>Airbag light:</strong> If it stays on, airbag may be faulty (expensive repair)</li>
            </ul>
          </div>
        </section>

        {/* 4. Under the Hood */}
        <section className="mb-12">
          <div className="flex items-center mb-4">
            <Wrench className="h-8 w-8 text-red-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">4. Under the Hood - Engine Bay Inspection</h2>
          </div>
          <div className="prose prose-lg max-w-none text-black">
            <p className="mb-4">
              Even if you're not mechanically minded, there are clear warning signs to look for under the bonnet:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Engine Condition</h3>
            <ul className="space-y-2 mb-4">
              <li><strong>Oil level and colour:</strong> Check dipstick - oil should be golden brown, not black or milky</li>
              <li><strong>Coolant level:</strong> Should be between min and max marks, green/pink colour (not brown or rusty)</li>
              <li><strong>Belt condition:</strong> Look for cracks, fraying, or wear on drive belts</li>
              <li><strong>Hoses:</strong> Check for cracks, bulges, or wetness around hose connections</li>
              <li><strong>Battery:</strong> Check for corrosion on terminals, loose connections, or bulging case</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Leak Detection</h3>
            <ul className="space-y-2 mb-4">
              <li><strong>Oil leaks:</strong> Dark stains on engine or ground underneath indicate oil leaks</li>
              <li><strong>Coolant leaks:</strong> Green/pink puddles or stains mean cooling system leak</li>
              <li><strong>Power steering fluid:</strong> Reddish fluid leaks near front of engine</li>
              <li><strong>Engine bay cleanliness:</strong> Suspiciously clean engine may be hiding leaks</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Start the Engine</h3>
            <ul className="space-y-2 mb-4">
              <li><strong>Cold start:</strong> Engine should start within 2-3 seconds without hesitation</li>
              <li><strong>Idle:</strong> Should idle smoothly without shaking or unusual noises</li>
              <li><strong>Exhaust smoke:</strong> Blue smoke = burning oil, white smoke = coolant leak, black smoke = running rich</li>
              <li><strong>Unusual noises:</strong> Knocking, ticking, or grinding sounds are red flags</li>
            </ul>
          </div>
        </section>

        {/* 5. Test Drive */}
        <section className="mb-12">
          <div className="flex items-center mb-4">
            <Key className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">5. Test Drive - Critical Performance Checks</h2>
          </div>
          <div className="prose prose-lg max-w-none text-black">
            <p className="mb-4">
              Always insist on a proper test drive of at least 15-20 minutes. Here's what to evaluate:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Before You Start Driving</h3>
            <ul className="space-y-2 mb-4">
              <li><strong>Insurance check:</strong> Verify you're covered to drive it (bring your license)</li>
              <li><strong>Seat position:</strong> Adjust seat, mirrors, steering wheel for comfort</li>
              <li><strong>Warning lights:</strong> Check dashboard - any warnings that stay on after start?</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">During the Drive</h3>
            <ul className="space-y-2 mb-4">
              <li><strong>Acceleration:</strong> Car should accelerate smoothly without jerking or hesitation</li>
              <li><strong>Transmission:</strong> Automatic should shift smoothly; manual clutch shouldn't slip or judder</li>
              <li><strong>Steering:</strong> Should feel responsive with no play, pulling, or vibration</li>
              <li><strong>Brakes:</strong> Should stop straight without pulling left/right, no grinding or squealing</li>
              <li><strong>Suspension:</strong> Go over speed bumps - no excessive bouncing or clunking noises</li>
              <li><strong>Highway test:</strong> Drive at 100km/h to check for vibrations or pulling</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">What to Listen For</h3>
            <ul className="space-y-2 mb-4">
              <li><strong>Grinding when turning:</strong> CV joint or differential issues</li>
              <li><strong>Clunking over bumps:</strong> Worn suspension bushes or ball joints</li>
              <li><strong>Squealing on acceleration:</strong> Slipping drive belt</li>
              <li><strong>Whistling or roaring:</strong> Wheel bearing failure</li>
            </ul>
          </div>
        </section>

        {/* 6. Documentation */}
        <section className="mb-12">
          <div className="flex items-center mb-4">
            <FileCheck className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">6. Documentation - What Paperwork to Verify</h2>
          </div>
          <div className="prose prose-lg max-w-none text-black">
            <p className="mb-4">
              Proper documentation proves the car's history and legal status. Always verify:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Essential Documents</h3>
            <ul className="space-y-2 mb-4">
              <li><strong>Registration papers:</strong> Should match seller's ID and car's VIN/chassis number</li>
              <li><strong>Service history:</strong> Logbook with stamps from dealers/mechanics showing regular servicing</li>
              <li><strong>Owner's manual:</strong> Original handbook shows car was well-maintained</li>
              <li><strong>Warranty documents:</strong> If any factory or extended warranty is remaining</li>
              <li><strong>Previous registration transfers:</strong> Shows how many owners the car has had</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">VIN Verification</h3>
            <ul className="space-y-2 mb-4">
              <li><strong>Check VIN matches everywhere:</strong> Registration papers, chassis plate, windscreen, engine bay</li>
              <li><strong>No signs of tampering:</strong> VIN plate should be securely riveted, not screwed on</li>
              <li><strong>Run PPSR check with VIN:</strong> Verifies car isn't stolen or rebirthed</li>
            </ul>

            <div className="text-center my-8">
              <Link href="/checkout" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 inline-block">
                Verify VIN with PPSR Check - $34.99
              </Link>
              <p className="text-sm text-black mt-2">Instant verification • Official government check</p>
            </div>
          </div>
        </section>

        {/* 7. Mechanical Inspection */}
        <section className="mb-12">
          <div className="flex items-center mb-4">
            <Wrench className="h-8 w-8 text-orange-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">7. Professional Mechanical Inspection</h2>
          </div>
          <div className="prose prose-lg max-w-none text-black">
            <p className="mb-4">
              Before finalizing any purchase over $10,000, always get a pre-purchase mechanical inspection from a qualified mechanic. This costs $150-$300 but can save you thousands.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">What a Mechanic Checks</h3>
            <ul className="space-y-2 mb-4">
              <li><strong>Compression test:</strong> Reveals engine wear and potential rebuilds needed</li>
              <li><strong>Brake measurements:</strong> Exact pad and rotor thickness remaining</li>
              <li><strong>Suspension bushes:</strong> Wear that you can't see during test drive</li>
              <li><strong>Fluid leaks:</strong> On a hoist, they can see leaks you'd miss</li>
              <li><strong>Exhaust condition:</strong> Rust, holes, or upcoming replacement needs</li>
              <li><strong>Frame/chassis inspection:</strong> Accident damage or rust in critical areas</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <p className="text-sm text-blue-700">
                <strong>Pro tip:</strong> If a seller refuses to let you get a mechanic's inspection, walk away immediately. This is a massive red flag that they're hiding something expensive.
              </p>
            </div>
          </div>
        </section>

        {/* 8. Price Negotiation */}
        <section className="mb-12">
          <div className="flex items-center mb-4">
            <DollarSign className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">8. Price Negotiation - Getting Fair Value</h2>
          </div>
          <div className="prose prose-lg max-w-none text-black">
            <p className="mb-4">
              Armed with your inspection findings, you can negotiate confidently:
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Research Market Value</h3>
            <ul className="space-y-2 mb-4">
              <li><strong>RedBook/GlassGuide:</strong> Get an official market valuation for the exact make/model/year</li>
              <li><strong>Similar listings:</strong> Check Carsales, Facebook Marketplace for comparable vehicles</li>
              <li><strong>Dealer vs private:</strong> Private sales should be 10-15% cheaper than dealer prices</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Negotiation Leverage</h3>
            <ul className="space-y-2 mb-4">
              <li><strong>Issues found:</strong> Any problems found during inspection justify lower offers</li>
              <li><strong>Cash buyer advantage:</strong> Immediate cash payment is worth a discount</li>
              <li><strong>Service costs:</strong> If service is overdue, deduct the service cost from asking price</li>
              <li><strong>Tyre replacement:</strong> If tyres are worn, deduct $600-$1,200 for new set</li>
            </ul>

            <div className="text-center my-8">
              <Link href="/checkout" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 inline-block">
                Get Market Valuation + PPSR - $34.99
              </Link>
              <p className="text-sm text-black mt-2">Know exactly what the car is worth</p>
            </div>
          </div>
        </section>

        {/* 9. Red Flags */}
        <section className="mb-12">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">9. Red Flags - When to Walk Away</h2>
          </div>
          <div className="prose prose-lg max-w-none text-black">
            <p className="mb-4">
              Some warning signs mean you should immediately walk away, no matter how good the price seems:
            </p>

            <div className="bg-red-50 rounded-lg p-6 space-y-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Finance Owing on PPSR Check</p>
                  <p className="text-sm text-black">Never buy a car with registered finance. You inherit the debt.</p>
                </div>
              </div>

              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Seller Refuses Mechanic Inspection</p>
                  <p className="text-sm text-black">This always means they're hiding expensive problems.</p>
                </div>
              </div>

              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">VIN Doesn't Match Papers</p>
                  <p className="text-sm text-black">Could be stolen, rebirthed, or written off.</p>
                </div>
              </div>

              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">No Service History</p>
                  <p className="text-sm text-black">Especially on European cars, this means big bills are coming.</p>
                </div>
              </div>

              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Seller Pressures Quick Sale</p>
                  <p className="text-sm text-black">"Must sell today" = they know about problems you haven't found yet.</p>
                </div>
              </div>

              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Written-Off on PPSR</p>
                  <p className="text-sm text-black">Statutory write-offs cannot be re-registered. Repairable write-offs need disclosure.</p>
                </div>
              </div>

              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Mismatched Paint or Panels</p>
                  <p className="text-sm text-black">Major accident repairs often hide frame damage.</p>
                </div>
              </div>

              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900">Mouldy or Damp Smell</p>
                  <p className="text-sm text-black">Indicates flood damage - electrical nightmares ahead.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. Final Checklist */}
        <section className="mb-12">
          <div className="flex items-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">10. Final Purchase Checklist</h2>
          </div>
          <div className="prose prose-lg max-w-none text-black">
            <p className="mb-4">
              Before you hand over money, make absolutely certain you've completed these steps:
            </p>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">✅ Pre-Purchase Must-Do List:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>PPSR check completed</strong> - No finance owing, not stolen, no write-off</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Test drive completed</strong> - At least 15-20 minutes, various road conditions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Mechanical inspection approved</strong> - Professional mechanic's report in hand</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>VIN verified</strong> - Matches rego papers, chassis plate, and windscreen</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Service history checked</strong> - Logbook stamped, no major services overdue</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Market value confirmed</strong> - Negotiated fair price based on condition</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Both keys present</strong> - Spare key and remotes all work</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Registration transfer arranged</strong> - Know the process for your state</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Insurance quote obtained</strong> - Know what it'll cost to insure before buying</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span><strong>Receipt with details</strong> - Written receipt with both parties' details, sale price, date</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Conclusion: Knowledge is Your Best Protection</h2>
          <div className="prose prose-lg max-w-none text-black">
            <p className="mb-4">
              Buying a used car in Australia doesn't have to be risky. By following this comprehensive checklist, you'll avoid the most common pitfalls that cost buyers thousands of dollars every year.
            </p>
            <p className="mb-4">
              Remember: the most important step is the PPSR check. For just $34.99, you get legal protection against inheriting someone else's $15,400 debt, buying a stolen vehicle, or purchasing a written-off car. It's the cheapest insurance policy you can buy.
            </p>
            <p>
              Take your time, do your due diligence, and don't let sellers pressure you into rushing. There will always be another car, but you can't undo a bad purchase once you've signed the papers.
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <div className="bg-blue-600 rounded-xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Start Your Used Car Check Today</h2>
          <p className="text-xl mb-6 text-blue-100">
            Get an official PPSR check plus comprehensive market valuation for any Australian vehicle
          </p>
          <Link href="/checkout" className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 inline-block">
            Run PPSR Check + Get Valuation - $34.99
          </Link>
          <p className="text-sm text-blue-100 mt-4">✅ Instant results • ✅ Official certificate • ✅ Market value included</p>
        </div>
      </article>
    </div>
  )
}

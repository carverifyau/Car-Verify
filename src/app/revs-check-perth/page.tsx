import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, Search, FileText, AlertTriangle, DollarSign } from 'lucide-react'

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
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-black text-4xl md:text-5xl font-bold mb-4">
            REVS Check Perth - Official Vehicle Finance & Encumbrance Check WA
          </h1>
          <p className="text-xl text-black max-w-3xl mx-auto mb-6">
            Don't get caught with a dodgy car in Perth! Get an official REVS check (PPSR) to verify finance owing, stolen status, write-offs and encumbrances on any Western Australian vehicle. Instant results from $34.99
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 max-w-2xl mx-auto mb-8">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm text-yellow-700">
                  <strong>Perth Car Buyers Warning:</strong> ASIC reports the average loss from buying an encumbered vehicle in Australia is <strong>$15,400</strong>. Protect yourself with an official REVS check before buying any car in Perth or WA.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Link href="/checkout" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 inline-block">
              Get REVS Check Perth - $34.99
            </Link>
            <p className="text-sm text-black mt-3">Instant results • Official PPSR certificate • All WA vehicles</p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="flex items-start space-x-3 bg-white p-6 rounded-lg shadow-sm">
            <Shield className="h-8 w-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-black font-semibold text-black mb-1">Official PPSR Data</h3>
              <p className="text-sm text-black">Direct access to government PPSR registry for accurate Perth & WA vehicle information</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 bg-white p-6 rounded-lg shadow-sm">
            <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="text-black font-semibold text-black mb-1">Instant Perth Results</h3>
              <p className="text-sm text-black">Get your complete REVS certificate for any WA vehicle in seconds</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 bg-white p-6 rounded-lg shadow-sm">
            <DollarSign className="h-8 w-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-black font-semibold text-black mb-1">Perth's Best Value</h3>
              <p className="text-sm text-black">Comprehensive vehicle history check from just $34.99</p>
            </div>
          </div>
        </div>
      </section>

      {/* What is REVS Check Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-black text-3xl font-bold mb-6">What is a REVS Check in Perth?</h2>
          <div className="prose prose-lg max-w-none text-black">
            <p className="mb-4">
              A REVS check (now called a PPSR check) is an official search of the Personal Property Securities Register (PPSR) - the Australian government database that tracks security interests, encumbrances, and important information about vehicles across Australia, including all cars registered in Perth and Western Australia.
            </p>
            <p className="mb-4">
              When buying a car in Perth, a REVS check reveals critical information that sellers might not disclose, including:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Finance owing:</strong> Whether money is still owed on the vehicle to a bank or finance company</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Stolen status:</strong> If the car has been reported stolen in Perth, WA, or anywhere in Australia</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Write-off history:</strong> Whether the vehicle has been written off by an insurance company</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt 0.5" />
                <span><strong>Encumbrances:</strong> Any legal claims or interests registered against the vehicle</span>
              </li>
            </ul>
            <p>
              In Perth's competitive used car market, a REVS check is essential protection. The Western Australian consumer protection agencies strongly recommend conducting a PPSR/REVS check before finalizing any private vehicle purchase in Perth or anywhere in WA.
            </p>
          </div>
        </div>
      </section>

      {/* Why Perth Buyers Need REVS Check */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-black text-3xl font-bold mb-6">Why Perth Car Buyers Need a REVS Check</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-black text-xl font-semibold mb-3">Protect Your Investment in Perth's Market</h3>
              <p className="text-black">
                Perth's used car market is thriving, with thousands of vehicles changing hands every month. Unfortunately, this also means increased risk. According to ASIC, Australians lose an average of <strong>$15,400</strong> when they unknowingly purchase a vehicle with finance owing. In Perth, where car prices can be higher due to WA's mining economy and distance from eastern states, these losses can be even more devastating.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-black text-xl font-semibold mb-3">Finance Owing is Common in WA</h3>
              <p className="text-black mb-3">
                Many Perth vehicles are purchased with finance due to WA's higher cost of living and vehicle prices. When someone sells a car with outstanding finance without paying it off, the finance company legally owns that vehicle - not you. They can repossess it, leaving you with nothing.
              </p>
              <p className="text-black">
                A REVS check Perth search instantly reveals any finance encumbrances, protecting you from this costly mistake.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-black text-xl font-semibold mb-3">Stolen Vehicles in Perth</h3>
              <p className="text-black">
                WA Police report hundreds of vehicle thefts across Perth each year. A stolen car can be re-registered using fraudulent documents and sold to unsuspecting buyers. If you purchase a stolen vehicle in Perth, police will seize it and return it to the rightful owner - you lose both the car and your money with no legal recourse.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-black text-xl font-semibold mb-3">Write-Off History Matters in WA</h3>
              <p className="text-black">
                Perth's distance from other major cities means some vehicles written off interstate are transported to WA and resold. A write-off vehicle may have serious structural damage that compromises safety. While repairable write-offs can be legally sold in WA, you deserve to know the full history before paying market price.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/checkout" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 inline-block">
              Check Any Perth Vehicle - $34.99
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-black text-3xl font-bold mb-8">Perth REVS Check FAQs</h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-black text-xl font-semibold mb-3">How much does a REVS check cost in Perth?</h3>
              <p className="text-black">
                Our official PPSR/REVS check for Perth and WA vehicles costs just $34.99. This includes finance check, stolen car verification, write-off history, and a comprehensive vehicle history report. You'll receive an official PPSR certificate instantly.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-black text-xl font-semibold mb-3">Do I need a REVS check for every car I look at in Perth?</h3>
              <p className="text-black">
                Yes, absolutely. Each vehicle has a unique history. Even if you're buying from a reputable-looking seller in Perth's best suburbs, you should always conduct a REVS check. Sellers may not even know their vehicle has encumbrances. For $34.99, it's the cheapest insurance you can buy when spending thousands on a car.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-black text-xl font-semibold mb-3">Can I do a free REVS check in Perth?</h3>
              <p className="text-black">
                There are no legitimate free REVS checks in Perth or anywhere in Australia. The PPSR (the official government database) charges a fee to access vehicle records. Any website offering "free" REVS checks is either showing limited information or is a scam. Our $34.99 service provides the official, complete PPSR certificate you need for legal protection.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-black text-xl font-semibold mb-3">What's the difference between a REVS check and a PPSR check in Perth?</h3>
              <p className="text-black">
                There's no difference - they're the same thing. "REVS check" is the old term from when each state (including WA) had its own register. In 2012, Australia moved to a single national system called the Personal Property Securities Register (PPSR). However, most Perth car buyers still call it a "REVS check" out of habit. Both terms refer to the same official search.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-black text-xl font-semibold mb-3">How quickly do I get my REVS check results in Perth?</h3>
              <p className="text-black">
                Instantly! Our system connects directly to the PPSR database. Within seconds of entering the vehicle's VIN or registration number, you'll receive a comprehensive report showing finance owing, stolen status, write-off history, and all encumbrances for any Perth or WA vehicle.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-black text-xl font-semibold mb-3">What information do I need to do a REVS check in Perth?</h3>
              <p className="text-black">
                You need either the vehicle's <strong>VIN (Vehicle Identification Number)</strong> or the <strong>registration plate number and state (WA)</strong>. The VIN is a 17-character code usually found on the driver's side dashboard, door jamb, or registration papers. For Perth vehicles, the WA registration plate number also works.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-black text-xl font-semibold mb-3">Does a REVS check work for motorcycles and boats in Perth?</h3>
              <p className="text-black">
                Yes! The PPSR database covers all types of vehicles and vessels in Perth and WA, including motorcycles, caravans, trailers, boats, and jet skis. If it has a VIN or registration number, we can check it for finance owing and encumbrances.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-black text-xl font-semibold mb-3">What happens if my Perth REVS check shows finance owing?</h3>
              <p className="text-black">
                If finance is registered against the vehicle, do NOT complete the purchase until it's cleared. Ask the seller to pay off the finance before you pay them. If they can't or won't, walk away. Buying a car in Perth with finance owing means the finance company legally owns it and can repossess it from you - even though you paid for it.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-black text-xl font-semibold mb-3">Is a REVS check mandatory when buying a car in Perth?</h3>
              <p className="text-black">
                It's not legally mandatory in Western Australia, but it's strongly recommended by Consumer Protection WA and every automotive expert. For the cost of $34.99, you get protection against losing thousands of dollars. Most Perth car dealers will already have conducted a REVS check on their trade-ins, but private sellers rarely do.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-black text-xl font-semibold mb-3">Can I trust Car Verify for my Perth REVS check?</h3>
              <p className="text-black">
                Absolutely. We provide direct access to the official government PPSR database - the same source used by car dealers, banks, and legal professionals across Perth and Western Australia. Your REVS certificate is an official PPSR document with legal standing. We simply make it easier and faster to get the information you need to buy safely in Perth.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/checkout" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 inline-block">
              Get Your Perth REVS Check Now
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-black text-3xl font-bold mb-4">Protect Yourself When Buying a Car in Perth</h2>
          <p className="text-xl mb-8 text-blue-100">
            Don't risk losing $15,400+ on a dodgy vehicle. Get an official REVS check for any Perth or WA car in seconds.
          </p>
          <Link href="/checkout" className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 inline-block">
            Check Any Perth Vehicle - $34.99
          </Link>
          <p className="text-sm text-blue-100 mt-4">Instant results • Official PPSR certificate • All WA vehicles covered</p>
        </div>
      </section>
    </div>
  )
}

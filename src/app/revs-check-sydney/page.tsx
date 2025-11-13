import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, Search, FileText, AlertTriangle, DollarSign } from 'lucide-react'

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
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            REVS Check Sydney - Official Vehicle Finance & Encumbrance Check NSW
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Don't get ripped off in Sydney's car market! Get an official REVS check (PPSR) to verify finance owing, stolen status, write-offs and encumbrances on any New South Wales vehicle. Instant results from $34.99
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 max-w-2xl mx-auto mb-8">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm text-yellow-700">
                  <strong>Sydney Car Buyers Warning:</strong> ASIC reports the average loss from buying an encumbered vehicle in Australia is <strong>$15,400</strong>. Protect yourself with an official REVS check before buying any car in Sydney or NSW.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Link href="/checkout" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 inline-block">
              Get REVS Check Sydney - $34.99
            </Link>
            <p className="text-sm text-gray-500 mt-3">Instant results • Official PPSR certificate • All NSW vehicles</p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="flex items-start space-x-3 bg-white p-6 rounded-lg shadow-sm">
            <Shield className="h-8 w-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Official PPSR Data</h3>
              <p className="text-sm text-gray-600">Direct access to government PPSR registry for accurate Sydney & NSW vehicle information</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 bg-white p-6 rounded-lg shadow-sm">
            <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Instant Sydney Results</h3>
              <p className="text-sm text-gray-600">Get your complete REVS certificate for any NSW vehicle in seconds</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 bg-white p-6 rounded-lg shadow-sm">
            <DollarSign className="h-8 w-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Sydney's Best Value</h3>
              <p className="text-sm text-gray-600">Comprehensive vehicle history check from just $34.99</p>
            </div>
          </div>
        </div>
      </section>

      {/* What is REVS Check Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What is a REVS Check in Sydney?</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-4">
              A REVS check (now called a PPSR check) is an official search of the Personal Property Securities Register (PPSR) - the Australian government database that tracks security interests, encumbrances, and important information about vehicles across Australia, including all cars registered in Sydney and New South Wales.
            </p>
            <p className="mb-4">
              When buying a car in Sydney, a REVS check reveals critical information that sellers might not disclose, including:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Finance owing:</strong> Whether money is still owed on the vehicle to a bank or finance company</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Stolen status:</strong> If the car has been reported stolen in Sydney, NSW, or anywhere in Australia</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Write-off history:</strong> Whether the vehicle has been written off by an insurance company</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Encumbrances:</strong> Any legal claims or interests registered against the vehicle</span>
              </li>
            </ul>
            <p>
              In Sydney's massive used car market - Australia's largest - a REVS check is essential protection. NSW Fair Trading strongly recommends conducting a PPSR/REVS check before finalizing any private vehicle purchase in Sydney or anywhere in NSW.
            </p>
          </div>
        </div>
      </section>

      {/* Why Sydney Buyers Need REVS Check */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Sydney Car Buyers Need a REVS Check</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Protect Your Investment in Sydney's Competitive Market</h3>
              <p className="text-gray-600">
                Sydney has Australia's largest used car market, with tens of thousands of vehicles changing hands every month. With such high volume comes increased risk. According to ASIC, Australians lose an average of <strong>$15,400</strong> when they unknowingly purchase a vehicle with finance owing. In Sydney's expensive market, where prices are among the highest in Australia, these losses can be devastating.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Finance Owing is Everywhere in NSW</h3>
              <p className="text-gray-600 mb-3">
                With Sydney's high cost of living and expensive vehicle prices, most cars are purchased with finance. When someone sells a car with outstanding finance without paying it off, the finance company legally owns that vehicle - not you. They can repossess it, leaving you with nothing.
              </p>
              <p className="text-gray-600">
                A REVS check Sydney search instantly reveals any finance encumbrances, protecting you from this costly mistake that happens every day across NSW.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Stolen Vehicles in Sydney</h3>
              <p className="text-gray-600">
                NSW Police report thousands of vehicle thefts across Sydney each year. With Sydney's size and extensive second-hand car market, stolen vehicles can easily be re-registered using fraudulent documents and sold to unsuspecting buyers. If you purchase a stolen vehicle in Sydney, police will seize it and return it to the rightful owner - you lose both the car and your money with no legal recourse.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Write-Off History in the Sydney Market</h3>
              <p className="text-gray-600">
                Sydney's congested roads and high traffic volume mean more accidents and insurance write-offs. Some unscrupulous sellers repair written-off vehicles and sell them at market price without disclosure. A write-off vehicle may have serious structural damage that compromises safety. While repairable write-offs can be legally sold in NSW, you deserve to know the full history before paying premium Sydney prices.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/checkout" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 inline-block">
              Check Any Sydney Vehicle - $34.99
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Sydney REVS Check FAQs</h2>
          
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How much does a REVS check cost in Sydney?</h3>
              <p className="text-gray-600">
                Our official PPSR/REVS check for Sydney and NSW vehicles costs just $34.99. This includes finance check, stolen car verification, write-off history, and a comprehensive vehicle history report. You'll receive an official PPSR certificate instantly - much cheaper than the potential $15,400 loss from buying an encumbered car.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Do I need a REVS check for every car I look at in Sydney?</h3>
              <p className="text-gray-600">
                Yes, absolutely. Each vehicle has a unique history. Even if you're buying from a seemingly honest seller in Sydney's most affluent suburbs, you should always conduct a REVS check. Sellers may not even know their vehicle has encumbrances or problems. For $34.99, it's the cheapest insurance you can buy when spending thousands on a car in Sydney's expensive market.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I do a free REVS check in Sydney?</h3>
              <p className="text-gray-600">
                There are no legitimate free REVS checks in Sydney or anywhere in Australia. The PPSR (the official government database) charges a fee to access vehicle records. Any website offering "free" REVS checks is either showing limited information or is a scam. Our $34.99 service provides the official, complete PPSR certificate you need for legal protection when buying in Sydney or NSW.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What's the difference between a REVS check and a PPSR check in Sydney?</h3>
              <p className="text-gray-600">
                There's no difference - they're the same thing. "REVS check" is the old term from when each state (including NSW) had its own register. In 2012, Australia moved to a single national system called the Personal Property Securities Register (PPSR). However, most Sydney car buyers still call it a "REVS check" out of habit. Both terms refer to the same official search.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How quickly do I get my REVS check results in Sydney?</h3>
              <p className="text-gray-600">
                Instantly! Our system connects directly to the PPSR database. Within seconds of entering the vehicle's VIN or registration number, you'll receive a comprehensive report showing finance owing, stolen status, write-off history, and all encumbrances for any Sydney or NSW vehicle.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What information do I need to do a REVS check in Sydney?</h3>
              <p className="text-gray-600">
                You need either the vehicle's <strong>VIN (Vehicle Identification Number)</strong> or the <strong>registration plate number and state (NSW)</strong>. The VIN is a 17-character code usually found on the driver's side dashboard, door jamb, or registration papers. For Sydney vehicles, the NSW registration plate number also works.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Does a REVS check work for motorcycles and boats in Sydney?</h3>
              <p className="text-gray-600">
                Yes! The PPSR database covers all types of vehicles and vessels in Sydney and NSW, including motorcycles, caravans, trailers, boats, and jet skis. If it has a VIN or registration number, we can check it for finance owing and encumbrances. This is especially important in Sydney's thriving marine market.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What happens if my Sydney REVS check shows finance owing?</h3>
              <p className="text-gray-600">
                If finance is registered against the vehicle, do NOT complete the purchase until it's cleared. Ask the seller to pay off the finance before you pay them. If they can't or won't, walk away immediately. Buying a car in Sydney with finance owing means the finance company legally owns it and can repossess it from you - even though you paid for it. There are plenty of other cars in Sydney's massive market.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Is a REVS check mandatory when buying a car in Sydney?</h3>
              <p className="text-gray-600">
                It's not legally mandatory in New South Wales, but it's strongly recommended by NSW Fair Trading and every automotive expert. For the cost of $34.99, you get protection against losing thousands of dollars in Sydney's expensive car market. Most Sydney car dealers will already have conducted a REVS check on their trade-ins, but private sellers rarely do.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I trust Car Verify for my Sydney REVS check?</h3>
              <p className="text-gray-600">
                Absolutely. We provide direct access to the official government PPSR database - the same source used by car dealers, banks, and legal professionals across Sydney and New South Wales. Your REVS certificate is an official PPSR document with legal standing. We simply make it easier and faster to get the information you need to buy safely in Sydney's competitive market.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/checkout" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 inline-block">
              Get Your Sydney REVS Check Now
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Protect Yourself When Buying a Car in Sydney</h2>
          <p className="text-xl mb-8 text-blue-100">
            Don't risk losing $15,400+ on a dodgy vehicle. Get an official REVS check for any Sydney or NSW car in seconds.
          </p>
          <Link href="/checkout" className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 inline-block">
            Check Any Sydney Vehicle - $34.99
          </Link>
          <p className="text-sm text-blue-100 mt-4">Instant results • Official PPSR certificate • All NSW vehicles covered</p>
        </div>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, DollarSign, AlertTriangle, FileCheck, CreditCard } from 'lucide-react'

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
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            PPSR Check Australia - Official Personal Property Securities Register Search
          </h1>
          <p className="text-xl text-black max-w-3xl mx-auto mb-6">
            Get an official PPSR certificate for any Australian vehicle. Check finance owing, security interests, encumbrances, write-offs and stolen status. Instant results from $34.99
          </p>
          <div className="bg-red-50 border-l-4 border-red-400 p-4 max-w-2xl mx-auto mb-8">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm text-red-700">
                  <strong>ASIC Warning:</strong> Australians lose an average of <strong>$15,400</strong> when they unknowingly buy a vehicle with finance owing. Under Australian law, if you purchase a car with outstanding finance, <strong>the debt transfers to you</strong> and the finance company can legally repossess it.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Link href="/checkout" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 inline-block">
              Get Official PPSR Certificate - $34.99
            </Link>
            <p className="text-sm text-black mt-3">Instant results • Official government certificate • All Australian vehicles</p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="flex items-start space-x-3 bg-white p-6 rounded-lg shadow-sm">
            <FileCheck className="h-8 w-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Official PPSR Certificate</h3>
              <p className="text-sm text-black">Government-issued certificate from the official PPSR database</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 bg-white p-6 rounded-lg shadow-sm">
            <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Instant Results</h3>
              <p className="text-sm text-black">Get your PPSR certificate for any Australian vehicle in seconds</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 bg-white p-6 rounded-lg shadow-sm">
            <DollarSign className="h-8 w-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Best Value</h3>
              <p className="text-sm text-black">Comprehensive PPSR check with vehicle history from just $34.99</p>
            </div>
          </div>
        </div>
      </section>

      {/* What is PPSR Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What is a PPSR Check?</h2>
          <div className="prose prose-lg max-w-none text-black">
            <p className="mb-4">
              The Personal Property Securities Register (PPSR) is the Australian government's official national database that records security interests (encumbrances) against personal property, including all motor vehicles registered in Australia. The PPSR replaced the old state-based REVS registers in 2012.
            </p>
            <p className="mb-4">
              A PPSR check searches this government database to reveal critical information about a vehicle's legal and financial status, including:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Finance owing:</strong> Whether the vehicle has outstanding finance or loans with banks, finance companies, or other lenders</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Security interests:</strong> Who has legal claim or ownership rights to the vehicle</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Encumbrances:</strong> Any legal restrictions, liens, or claims registered against the vehicle</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Write-off status:</strong> Whether the vehicle has been deemed a total loss by an insurance company</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Stolen vehicle verification:</strong> If the vehicle has been reported stolen anywhere in Australia</span>
              </li>
            </ul>
            <p>
              An official PPSR certificate provides legal protection when buying a used vehicle. It's the only way to definitively verify that a vehicle is free from financial encumbrances and security interests.
            </p>
          </div>
        </div>
      </section>

      {/* Why You Need PPSR Check */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why You Need a PPSR Check</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Legal Protection Against Inherited Debt</h3>
              <p className="text-black mb-3">
                Under Australian law, security interests registered on the PPSR "travel with the goods." This means if you buy a vehicle with finance owing, <strong>you inherit the debt</strong> - even if you were unaware of it and paid full market price. The finance company retains legal ownership and can repossess the vehicle from you.
              </p>
              <p className="text-black">
                According to ASIC (Australian Securities and Investments Commission), consumers who unknowingly purchase encumbered vehicles lose an average of $15,400. A PPSR check is your only legal defense against this scenario.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Finance Owing is Common</h3>
              <p className="text-black mb-3">
                Industry estimates suggest that approximately 1 in 4 used vehicles for sale in Australia have some form of finance or security interest registered on the PPSR. Many sellers don't deliberately hide this information - they simply don't know about it themselves, especially if they recently purchased the vehicle or acquired it through trade.
              </p>
              <p className="text-black">
                A PPSR check instantly reveals any registered security interests, the parties holding those interests, and the nature of the encumbrance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Write-Offs and Stolen Vehicles</h3>
              <p className="text-black">
                A PPSR check also cross-references the Written-Off Vehicle Register (WOVR) to identify vehicles that have been deemed total losses by insurance companies. Vehicles can be written off due to accident damage, flood, fire, hail, or other incidents. While some write-offs can be legally repaired and re-registered, you deserve to know this history.
              </p>
              <p className="text-black mt-3">
                Additionally, the PPSR connects with stolen vehicle databases across Australia. If a vehicle is stolen, purchasing it makes you liable - police will seize the vehicle and return it to the rightful owner, leaving you with nothing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Required for Insurance and Finance</h3>
              <p className="text-black">
                Most insurance companies and vehicle finance providers require a clear PPSR certificate before they'll insure or finance a used vehicle. Having an official PPSR certificate ready can expedite the insurance and financing process and may even help you negotiate better rates.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/checkout" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 inline-block">
              Get Your PPSR Certificate - $34.99
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">PPSR Check FAQs</h2>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How much does an official PPSR check cost?</h3>
              <p className="text-black">
                Our PPSR check costs $34.99 and includes an official PPSR certificate, finance check, security interest search, write-off verification, stolen vehicle check, and comprehensive vehicle history report. This is significantly cheaper than the potential $15,400+ loss from buying an encumbered vehicle.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What's the difference between PPSR and REVS?</h3>
              <p className="text-black">
                PPSR (Personal Property Securities Register) is the current national system that replaced the old state-based REVS registers in 2012. Before PPSR, each state had its own register (REVS in NSW, VIC, SA; REVS Check WA; PPSR in QLD; VSEC in Tasmania, etc.). Now there's one single PPSR database covering all Australian vehicles. Many people still use the term "REVS check" but they're referring to the same PPSR search.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Can I do a free PPSR check?</h3>
              <p className="text-black">
                No. There are no legitimate free PPSR checks in Australia. The PPSR is a government-operated database that charges a statutory fee for every search. Any website claiming to offer "free PPSR checks" is either providing incomplete information, outdated data, or is potentially a scam. Our $34.99 service provides the official, complete PPSR certificate with legal standing.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How quickly do I get my PPSR certificate?</h3>
              <p className="text-black">
                Instantly! Our system connects directly to the official PPSR database. Within seconds of submitting your search, you'll receive a comprehensive report including your official PPSR certificate as a downloadable PDF.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What information do I need for a PPSR check?</h3>
              <p className="text-black">
                You need either the vehicle's <strong>VIN (Vehicle Identification Number)</strong> or the <strong>registration plate number and state</strong>. The VIN is a unique 17-character identifier usually found on the driver's side dashboard (visible through windscreen), driver's door jamb, or on registration and insurance documents.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Does a PPSR check work for motorcycles, caravans, and boats?</h3>
              <p className="text-black">
                Yes! The PPSR database covers all types of personal property including motorcycles, caravans, trailers, boats, jet skis, and even some aircraft. If it has a VIN, chassis number, or Hull Identification Number (HIN), you can conduct a PPSR check on it.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What happens if my PPSR check shows finance owing?</h3>
              <p className="text-black">
                If the PPSR certificate reveals a registered security interest (finance owing), do NOT proceed with the purchase until it's resolved. The seller must pay off the finance and have the security interest discharged from the PPSR before you complete the transaction. If they refuse or can't pay it off, walk away - there are plenty of other vehicles available. Never assume you can "sort it out later" as you'll inherit the debt legally.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Is a PPSR check mandatory when buying a car?</h3>
              <p className="text-black">
                While not legally mandatory in most states, a PPSR check is strongly recommended by every consumer protection agency in Australia, including ASIC, ACCC, and all state-based fair trading departments. For $34.99, it's the cheapest insurance policy you can buy when spending thousands on a vehicle. Most professional car buyers, dealers, and auctioneers conduct PPSR checks on every vehicle they purchase.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What is a security interest on the PPSR?</h3>
              <p className="text-black">
                A security interest is a legal claim over property (like a vehicle) that secures payment of a debt or performance of an obligation. Common security interests include car loans, chattel mortgages, lease agreements, and consignment arrangements. When registered on the PPSR, the security interest holder (usually a bank or finance company) has legal rights over the vehicle, including the right to repossess it if the debt isn't paid - even if you're the new owner.
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">How do I read a PPSR certificate?</h3>
              <p className="text-black">
                An official PPSR certificate lists all registered security interests and encumbrances against the vehicle. The ideal result is "No Security Interests Found" - meaning the vehicle is clear. If security interests are listed, the certificate will show: the secured party (who the money is owed to), the registration date, the type of security interest, and registration details. Our comprehensive report explains these findings in plain English and highlights any concerns.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/checkout" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 inline-block">
              Get Your Official PPSR Certificate Now
            </Link>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">What's Included in Your PPSR Check</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <FileCheck className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="font-semibold text-gray-900">Official PPSR Certificate</h3>
              </div>
              <p className="text-sm text-black">Government-issued certificate with legal standing, accepted by insurance companies, banks, and legal professionals</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <CreditCard className="h-6 w-6 text-red-600 mr-3" />
                <h3 className="font-semibold text-gray-900">Finance Owing Check</h3>
              </div>
              <p className="text-sm text-black">Complete search of all registered security interests, loans, and financial encumbrances</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-orange-600 mr-3" />
                <h3 className="font-semibold text-gray-900">Write-Off History</h3>
              </div>
              <p className="text-sm text-black">Written-Off Vehicle Register (WOVR) check for insurance write-offs due to accident, flood, fire, or hail damage</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-purple-600 mr-3" />
                <h3 className="font-semibold text-gray-900">Stolen Vehicle Check</h3>
              </div>
              <p className="text-sm text-black">Cross-reference with Australian stolen vehicle databases to verify the car isn't reported stolen</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                <h3 className="font-semibold text-gray-900">Vehicle Specifications</h3>
              </div>
              <p className="text-sm text-black">Complete vehicle details including make, model, year, engine, transmission, and registration history</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <DollarSign className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="font-semibold text-gray-900">Market Valuation</h3>
              </div>
              <p className="text-sm text-black">Expert market research showing current market value range based on condition, mileage, and location</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/checkout" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 inline-block">
              Get Complete PPSR Report - $34.99
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Protect Yourself with an Official PPSR Certificate</h2>
          <p className="text-xl mb-8 text-blue-100">
            Don't risk inheriting $15,400+ in debt. Get an official PPSR check for any Australian vehicle in seconds.
          </p>
          <Link href="/checkout" className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 inline-block">
            Get Your PPSR Certificate - $34.99
          </Link>
          <p className="text-sm text-blue-100 mt-4">Instant results • Official government certificate • Legal protection</p>
        </div>
      </section>
    </div>
  )
}

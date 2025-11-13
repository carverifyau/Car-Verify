import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, AlertTriangle, Search, FileText, DollarSign } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Rego Check Australia - Instant Vehicle Registration Search | $34.99',
  description: 'Free rego check for Australian vehicles. Verify registration details, check if a car is stolen, find finance owing & get comprehensive vehicle history. Instant results.',
  keywords: 'rego check, registration check, rego check australia, vehicle registration check, car rego check, check rego, rego lookup',
  alternates: {
    canonical: 'https://carverify.com.au/rego-check',
  },
  openGraph: {
    title: 'Rego Check Australia - Instant Vehicle Registration Search',
    description: 'Check any Australian vehicle registration instantly. PPSR check, stolen car check, finance check & full vehicle history from $34.99',
    url: 'https://carverify.com.au/rego-check',
    siteName: 'Car Verify Australia',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rego Check Australia - Instant Vehicle Registration Search',
    description: 'Check any Australian vehicle registration instantly. PPSR check, stolen car check, finance check & full vehicle history from $34.99',
  },
}

export default function RegoCheckPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Rego Check Australia - Instant Vehicle Registration Verification
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Check any Australian vehicle registration in seconds. Get PPSR reports, stolen car checks,
            finance owing alerts & comprehensive vehicle history from $34.99
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/checkout"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Check Rego Now - $34.99
            </Link>
            <Link
              href="#how-it-works"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              How It Works
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">✓ Instant Results  ✓ PPSR Certified  ✓ 100% Secure</p>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <Shield className="h-12 w-12 text-blue-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">PPSR Certified Check</h3>
            <p className="text-gray-600">Official PPSR reports showing finance, stolen status & write-off history</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Instant Results</h3>
            <p className="text-gray-600">Get your comprehensive vehicle report within 60 seconds</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <DollarSign className="h-12 w-12 text-purple-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Market Valuation</h3>
            <p className="text-gray-600">AI-powered vehicle valuation based on current Australian market</p>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What's Included in Your Rego Check Report</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-semibold text-xl mb-4 flex items-center">
                <Shield className="h-6 w-6 text-blue-600 mr-2" />
                PPSR Security Check
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Finance owing status</li>
                <li>✓ Stolen vehicle check</li>
                <li>✓ Security interests registered</li>
                <li>✓ Encumbrance details</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-semibold text-xl mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 text-orange-600 mr-2" />
                Write-Off History
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Statutory write-off status</li>
                <li>✓ Repairable write-off history</li>
                <li>✓ Damage assessment records</li>
                <li>✓ Inspection reports</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-semibold text-xl mb-4 flex items-center">
                <FileText className="h-6 w-6 text-green-600 mr-2" />
                Vehicle Details
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Registration expiry date</li>
                <li>✓ Make, model & year</li>
                <li>✓ VIN verification</li>
                <li>✓ Compliance details</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-semibold text-xl mb-4 flex items-center">
                <DollarSign className="h-6 w-6 text-purple-600 mr-2" />
                Market Valuation
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Current market value</li>
                <li>✓ Trade-in estimate</li>
                <li>✓ Private sale value</li>
                <li>✓ Retail pricing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How to Do a Rego Check in 3 Easy Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="font-semibold text-xl mb-2">Enter Rego Number</h3>
            <p className="text-gray-600">Enter the vehicle's registration number and select the state</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="font-semibold text-xl mb-2">Instant Search</h3>
            <p className="text-gray-600">Our system checks PPSR, stolen registers & vehicle databases</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="font-semibold text-xl mb-2">Get Your Report</h3>
            <p className="text-gray-600">Receive comprehensive report via email in under 60 seconds</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions About Rego Checks</h2>
          <div className="space-y-6">
            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="font-semibold text-lg cursor-pointer">What is a rego check?</summary>
              <p className="mt-4 text-gray-700">
                A rego check (registration check) verifies vehicle registration details and provides comprehensive
                history including PPSR status, stolen car check, finance owing, write-off history, and market valuation.
                It's essential before buying any used vehicle in Australia.
              </p>
            </details>

            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="font-semibold text-lg cursor-pointer">Can I do a free rego check in Australia?</summary>
              <p className="mt-4 text-gray-700">
                While you can check basic registration expiry for free on some state government websites, comprehensive
                PPSR checks, stolen car verification, and finance owing searches require paid services. Our $34.99 report
                includes everything you need in one comprehensive check.
              </p>
            </details>

            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="font-semibold text-lg cursor-pointer">How long does a rego check take?</summary>
              <p className="mt-4 text-gray-700">
                Our rego check system provides instant results. You'll receive your comprehensive vehicle report via
                email within 60 seconds of completing your order. The report includes PPSR certificate, vehicle history,
                and market valuation.
              </p>
            </details>

            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="font-semibold text-lg cursor-pointer">What information do I need for a rego check?</summary>
              <p className="mt-4 text-gray-700">
                You only need two pieces of information: the vehicle's registration number (license plate) and the
                state/territory where it's registered (NSW, VIC, QLD, SA, WA, TAS, NT, or ACT).
              </p>
            </details>

            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="font-semibold text-lg cursor-pointer">Will a rego check show if a car has finance owing?</summary>
              <p className="mt-4 text-gray-700">
                Yes! Our rego check includes a full PPSR (Personal Property Securities Register) search, which shows
                any money owed on the vehicle, security interests, and encumbrances. This protects you from buying a
                car with hidden debts.
              </p>
            </details>

            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="font-semibold text-lg cursor-pointer">Can I check if a car is stolen with a rego check?</summary>
              <p className="mt-4 text-gray-700">
                Yes, absolutely. Our rego check searches national stolen vehicle databases and PPSR records to verify
                if the vehicle has been reported stolen. This is crucial before purchasing any used car in Australia.
              </p>
            </details>

            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="font-semibold text-lg cursor-pointer">What states can I do a rego check for?</summary>
              <p className="mt-4 text-gray-700">
                We provide rego checks for all Australian states and territories: New South Wales (NSW), Victoria (VIC),
                Queensland (QLD), South Australia (SA), Western Australia (WA), Tasmania (TAS), Northern Territory (NT),
                and Australian Capital Territory (ACT).
              </p>
            </details>

            <details className="bg-white p-6 rounded-lg shadow-sm">
              <summary className="font-semibold text-lg cursor-pointer">Is a rego check the same as a PPSR check?</summary>
              <p className="mt-4 text-gray-700">
                A rego check is more comprehensive. While a PPSR check only shows finance and security interests, our
                rego check includes PPSR data PLUS stolen car verification, write-off history, vehicle specifications,
                and AI-powered market valuation - all in one report.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Check Your Vehicle Registration?</h2>
          <p className="text-xl mb-8">
            Get instant access to comprehensive vehicle history, PPSR check, and market valuation
          </p>
          <Link
            href="/checkout"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Start Your Rego Check Now - $34.99
          </Link>
          <p className="text-sm mt-4">✓ Instant Results  ✓ Money-Back Guarantee  ✓ Secure Payment</p>
        </div>
      </section>

      {/* Additional Content for SEO */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold mb-4">Why You Need a Rego Check Before Buying a Used Car</h2>
          <p className="text-gray-700 mb-4">
            Buying a used car in Australia is a significant investment, often ranging from $10,000 to $50,000 or more.
            Without proper due diligence, you could end up purchasing a vehicle with hidden problems, outstanding finance,
            or even a stolen car. A comprehensive rego check protects your investment by revealing critical information
            before you hand over your money.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-8">The Risks of Skipping a Rego Check</h3>
          <p className="text-gray-700 mb-4">
            According to ASIC (Australian Securities and Investments Commission), thousands of Australians lose money
            each year by purchasing vehicles with encumbrances. When you buy a car with money owing, you could lose
            both the car AND your money if the original owner defaults on their loan. The average loss? Over $15,400.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-8">What Our Rego Check Reveals</h3>
          <p className="text-gray-700 mb-4">
            Our comprehensive rego check service searches multiple databases to provide you with complete peace of mind:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li><strong>PPSR Register:</strong> Shows any finance owing, security interests, or legal encumbrances</li>
            <li><strong>Stolen Vehicle Database:</strong> Confirms whether the car has been reported stolen</li>
            <li><strong>Written-Off Vehicle Register:</strong> Reveals statutory and repairable write-offs</li>
            <li><strong>Registration Details:</strong> Verifies current registration status and expiry date</li>
            <li><strong>Market Valuation:</strong> AI-powered pricing based on current Australian market conditions</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-8">State-Specific Rego Checks</h3>
          <p className="text-gray-700 mb-4">
            Each Australian state and territory has its own vehicle registration system, but our rego check service
            covers all of them. Whether you're buying a car in Sydney, Melbourne, Brisbane, Perth, Adelaide, Hobart,
            Darwin, or Canberra, we provide the same comprehensive check with instant results.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-8">How Much Does a Rego Check Cost?</h3>
          <p className="text-gray-700 mb-4">
            At just $34.99, our rego check is one of the most affordable comprehensive vehicle checks in Australia.
            Compare this to the potential loss of $15,400+ if you buy a car with hidden finance owing, and it's clear
            that a rego check is essential insurance for any used car purchase.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-8">When Should You Do a Rego Check?</h3>
          <p className="text-gray-700 mb-4">
            Always perform a rego check BEFORE you commit to buying a vehicle. Ideally, run the check before you even
            go to inspect the car. This way, you can avoid wasting time on vehicles with serious problems. If you're
            buying from a private seller, never hand over money until you've received and reviewed your rego check report.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-8">Understanding Your Rego Check Report</h3>
          <p className="text-gray-700 mb-4">
            Your comprehensive rego check report includes multiple sections, each providing critical information:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li><strong>Vehicle Summary:</strong> Make, model, year, VIN, and registration details</li>
            <li><strong>PPSR Certificate:</strong> Official document showing any encumbrances or security interests</li>
            <li><strong>Stolen Status:</strong> Confirmation whether the vehicle appears on stolen vehicle databases</li>
            <li><strong>Write-Off History:</strong> Any recorded damage or insurance write-offs</li>
            <li><strong>Market Valuation:</strong> Current retail, trade-in, and private sale values</li>
            <li><strong>Ownership History:</strong> Number of previous owners (where available)</li>
          </ul>
        </div>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, AlertTriangle, Search, FileText, DollarSign, AlertCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'REVS Check Australia - Instant Vehicle Finance & Stolen Car Check | $34.99',
  description: 'Official REVS check (PPSR) for all Australian vehicles. Check finance owing, stolen status, write-offs & encumbrances. Instant REVS certificate from $34.99',
  keywords: 'revs check, revs check australia, revs check nsw, ppsr check, revs certificate, finance owing check, stolen car check, revs check online',
  alternates: {
    canonical: 'https://carverify.com.au/revs-check',
  },
  openGraph: {
    title: 'REVS Check Australia - Official Vehicle Finance Check',
    description: 'Check any Australian vehicle for finance owing, stolen status & write-offs. Official REVS/PPSR certificate from $34.99',
    url: 'https://carverify.com.au/revs-check',
    siteName: 'Car Verify Australia',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'REVS Check Australia - Instant Finance & Stolen Car Check',
    description: 'Official REVS check (PPSR) for all Australian vehicles. Check finance owing, stolen status & write-offs from $34.99',
  },
}

export default function RevsCheckPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Official PPSR Certificate Provider
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            REVS Check Australia - Official Vehicle Finance & Encumbrance Check
          </h1>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto">
            Check any Australian vehicle for money owing, stolen status, write-offs & security interests.
            Get your official REVS/PPSR certificate in 60 seconds - $34.99
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/checkout"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
            >
              Get REVS Check Now - $34.99
            </Link>
            <Link
              href="#what-is-revs"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors inline-block"
            >
              What is a REVS Check?
            </Link>
          </div>
          <p className="text-sm text-gray-700 mt-4">
            ✓ Instant Results  ✓ Official PPSR Certificate  ✓ All States Covered  ✓ Money-Back Guarantee
          </p>
        </div>

        {/* Alert Box */}
        <div className="max-w-4xl mx-auto bg-orange-50 border-l-4 border-orange-500 p-6 rounded-lg mb-12">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-orange-500 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-orange-900 mb-2">⚠️ Don't Risk $15,400+ Loss!</h3>
              <p className="text-orange-800">
                ASIC reports the average loss from buying a car with hidden finance is over $15,400.
                A REVS check costs $34.99 and could save you thousands. Don't buy without checking!
              </p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <Shield className="h-12 w-12 text-blue-600 mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Official PPSR</h3>
            <p className="text-gray-800 text-sm">Government-backed Personal Property Securities Register</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Instant Certificate</h3>
            <p className="text-gray-800 text-sm">Receive your official REVS certificate via email in 60 seconds</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <AlertTriangle className="h-12 w-12 text-orange-600 mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Finance Check</h3>
            <p className="text-gray-800 text-sm">See any money owing or security interests on the vehicle</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
            <DollarSign className="h-12 w-12 text-purple-600 mb-4 mx-auto" />
            <h3 className="font-semibold text-lg mb-2">Best Price</h3>
            <p className="text-gray-800 text-sm">Comprehensive check for just $34.99 - cheaper than competitors</p>
          </div>
        </div>
      </section>

      {/* What is REVS Section */}
      <section id="what-is-revs" className="py-16 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">What is a REVS Check?</h2>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-4 text-lg">
              A <strong>REVS check</strong> (Register of Encumbered Vehicles) is now officially known as a
              <strong> PPSR check</strong> (Personal Property Securities Register). REVS was the original NSW system,
              but since 2012, all Australian states use the national PPSR database.
            </p>
            <p className="text-gray-700 mb-4">
              When you run a REVS check, you're searching the PPSR to find out if a vehicle has:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Money owing (finance encumbrance)</strong> - Is there a loan against the vehicle?</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Stolen status</strong> - Has the vehicle been reported stolen?</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Write-off history</strong> - Has it been written off by insurance?</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span><strong>Security interests</strong> - Any legal claims or encumbrances on the vehicle?</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What's Included in Your REVS Check</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-semibold text-xl mb-4 flex items-center">
              <Shield className="h-6 w-6 text-blue-600 mr-2" />
              Official PPSR Certificate
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Government-backed PPSR search result</li>
              <li>✓ Finance owing and loan details</li>
              <li>✓ Security interest holders listed</li>
              <li>✓ Legal encumbrances revealed</li>
              <li>✓ Official certificate you can show sellers</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-semibold text-xl mb-4 flex items-center">
              <AlertTriangle className="h-6 w-6 text-orange-600 mr-2" />
              Stolen Car Check
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ National stolen vehicle database search</li>
              <li>✓ Police theft report verification</li>
              <li>✓ VIN tampering detection</li>
              <li>✓ Rebirting fraud indicators</li>
              <li>✓ State and national records checked</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-semibold text-xl mb-4 flex items-center">
              <FileText className="h-6 w-6 text-green-600 mr-2" />
              Write-Off History
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Statutory write-off status</li>
              <li>✓ Repairable write-off records</li>
              <li>✓ Insurance claim history</li>
              <li>✓ Damage assessment details</li>
              <li>✓ Re-registration eligibility</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-semibold text-xl mb-4 flex items-center">
              <DollarSign className="h-6 w-6 text-purple-600 mr-2" />
              Vehicle Valuation
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ AI-powered market valuation</li>
              <li>✓ Trade-in price estimate</li>
              <li>✓ Private sale value range</li>
              <li>✓ Retail pricing comparison</li>
              <li>✓ Based on current Australian market</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How to Do a REVS Check in 3 Easy Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Enter Vehicle Details</h3>
              <p className="text-gray-800">
                Enter the VIN number or registration plate and state. Both work for PPSR searches.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Instant PPSR Search</h3>
              <p className="text-gray-800">
                Our system searches the official PPSR database, stolen car registers & write-off records
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-semibold text-xl mb-2">Get Your Certificate</h3>
              <p className="text-gray-800">
                Receive official REVS/PPSR certificate via email within 60 seconds with full results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">REVS Check Questions Answered</h2>
        <div className="space-y-6">
          <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <summary className="font-semibold text-lg cursor-pointer">What is a REVS check in Australia?</summary>
            <p className="mt-4 text-gray-700">
              A REVS check is the common name for a PPSR (Personal Property Securities Register) check in Australia.
              Originally REVS was NSW's Register of Encumbered Vehicles, but since 2012, all states use the national
              PPSR system. When you do a REVS check, you're searching the PPSR to find finance owing, stolen status,
              and write-off history for any Australian vehicle.
            </p>
          </details>

          <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <summary className="font-semibold text-lg cursor-pointer">Is REVS check the same as PPSR check?</summary>
            <p className="mt-4 text-gray-700">
              Yes! REVS and PPSR checks are the same thing. "REVS" was the old NSW name, while "PPSR" is the current
              national system used across all Australian states since 2012. When you order a REVS check today, you're
              getting a PPSR certificate that's valid Australia-wide, not just in NSW.
            </p>
          </details>

          <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <summary className="font-semibold text-lg cursor-pointer">How much does a REVS check cost?</summary>
            <p className="mt-4 text-gray-700">
              Our comprehensive REVS check costs $34.99 and includes the official PPSR certificate, stolen car check,
              write-off history, vehicle valuation, and full vehicle history report. This is significantly cheaper
              than paying for separate checks, and you get everything you need in one report.
            </p>
          </details>

          <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <summary className="font-semibold text-lg cursor-pointer">Can I do a free REVS check in Australia?</summary>
            <p className="mt-4 text-gray-700">
              No, the official PPSR (REVS) register charges a fee for searches because it provides legal protection
              against buying vehicles with hidden finance. While some websites claim to offer "free REVS checks,"
              they cannot provide the official PPSR certificate that protects you legally. Our $34.99 check includes
              the official certificate plus additional checks for stolen status, write-offs, and valuation.
            </p>
          </details>

          <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <summary className="font-semibold text-lg cursor-pointer">How long does a REVS check take?</summary>
            <p className="mt-4 text-gray-700">
              Our REVS check is instant! You'll receive your comprehensive report including the official PPSR
              certificate via email within 60 seconds of completing your order. The certificate is delivered as
              a PDF that you can save, print, or show to sellers.
            </p>
          </details>

          <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <summary className="font-semibold text-lg cursor-pointer">Will a REVS check show money owing on a car?</summary>
            <p className="mt-4 text-gray-700">
              Yes! This is the primary purpose of a REVS/PPSR check. The official certificate shows any money owing
              on the vehicle, including car loans, finance agreements, and security interests. If someone hasn't paid
              off their car loan, it will appear on the PPSR. If you buy a car with finance owing and the previous
              owner defaults, the lender can legally repossess the car from you - even though you paid for it!
            </p>
          </details>

          <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <summary className="font-semibold text-lg cursor-pointer">Can a REVS check tell if a car is stolen?</summary>
            <p className="mt-4 text-gray-700">
              Yes. Our REVS check searches both the PPSR and national stolen vehicle databases. If a vehicle has been
              reported stolen anywhere in Australia, it will show in your report. We also check for VIN tampering and
              rebirthing fraud indicators. Buying a stolen car can result in the vehicle being seized by police with
              no compensation to you.
            </p>
          </details>

          <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <summary className="font-semibold text-lg cursor-pointer">Do I need a REVS check for a car in NSW, Victoria, QLD, or WA?</summary>
            <p className="mt-4 text-gray-700">
              Yes! Every state in Australia uses the PPSR (commonly called REVS check). Whether you're buying in New
              South Wales, Victoria, Queensland, Western Australia, South Australia, Tasmania, Northern Territory, or
              ACT - you need a PPSR check. Our $34.99 check covers all Australian states and territories with one
              comprehensive report.
            </p>
          </details>

          <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <summary className="font-semibold text-lg cursor-pointer">What's the difference between REVS check and write-off check?</summary>
            <p className="mt-4 text-gray-700">
              A REVS/PPSR check includes both finance checks AND write-off history. You don't need separate checks.
              Our comprehensive REVS check shows statutory write-offs (cannot be re-registered), repairable write-offs
              (can be fixed and re-registered), and insurance claim history. Both types of write-off information come
              from the PPSR database.
            </p>
          </details>

          <details className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <summary className="font-semibold text-lg cursor-pointer">When should I do a REVS check?</summary>
            <p className="mt-4 text-gray-700">
              Run a REVS check BEFORE you commit to buying any used car - ideally before even inspecting it. This
              saves you time by filtering out vehicles with hidden problems. Never hand over money until you've seen
              a clear REVS/PPSR certificate. If buying from a private seller who claims the car has "no finance,"
              verify it yourself with a REVS check - they could be lying or simply unaware of encumbrances.
            </p>
          </details>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Protect Your Investment with a REVS Check</h2>
          <p className="text-xl mb-2">
            Official PPSR certificate + stolen car check + vehicle history
          </p>
          <p className="text-lg mb-8 text-blue-100">
            Don't risk $15,400+ - Check before you buy!
          </p>
          <Link
            href="/checkout"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Get REVS Check Now - $34.99
          </Link>
          <p className="text-sm mt-4 text-blue-100">
            ✓ Instant Certificate  ✓ Money-Back Guarantee  ✓ Secure Payment  ✓ All States Covered
          </p>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold mb-4">Complete Guide to REVS Checks in Australia 2024</h2>

          <h3 className="text-xl font-semibold mb-3 mt-8">Understanding REVS and PPSR in Australia</h3>
          <p className="text-gray-700 mb-4">
            If you're buying a used car in Australia, you'll hear people talk about "REVS checks" and "PPSR checks"
            - but what's the difference? The short answer: they're the same thing. REVS (Register of Encumbered
            Vehicles) was the original NSW system launched in 1986, while PPSR (Personal Property Securities Register)
            is the current national system that replaced all state-based registers in 2012.
          </p>
          <p className="text-gray-700 mb-4">
            When someone says "I need a REVS check," they're referring to searching the PPSR database - even if
            they're in Queensland, Victoria, Western Australia, or any other state. The name "REVS" stuck because
            it was used for over 25 years before the national system came in.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-8">Why You Must Do a REVS Check Before Buying</h3>
          <p className="text-gray-700 mb-4">
            According to ASIC (Australian Securities and Investments Commission), thousands of Australians lose money
            every year by purchasing vehicles with encumbrances. The average loss? Over $15,400. Here's why this happens:
          </p>
          <p className="text-gray-700 mb-4">
            When someone finances a car through a loan, the lender registers a "security interest" on the PPSR. This
            means the lender has a legal claim to the vehicle until the loan is paid off. If you buy that car without
            checking, and the previous owner stops making payments, the lender can legally repossess the car from you
            - even though you paid for it in good faith. You lose both the car AND your money.
          </p>
          <p className="text-gray-700 mb-4">
            This is why a REVS check is essential. For just $34.99, you can verify there's no money owing before you
            hand over thousands of dollars for a vehicle.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-8">What Does a REVS Check Reveal?</h3>
          <p className="text-gray-700 mb-4">
            When you run a comprehensive REVS check through Car Verify, you get:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Finance Owing:</strong> Any loans, security interests, or encumbrances registered against the
              vehicle. You'll see who holds the security interest and can verify with the seller that it's been paid off.
            </li>
            <li>
              <strong>Stolen Status:</strong> Whether the vehicle appears on national or state stolen vehicle databases.
              Buying a stolen car results in police seizing it with no compensation to you.
            </li>
            <li>
              <strong>Write-Off History:</strong> Statutory write-offs (cannot be re-registered) and repairable write-offs
              (can be fixed and re-registered). Insurance write-offs can significantly affect a vehicle's value and safety.
            </li>
            <li>
              <strong>Vehicle Identification:</strong> Confirmation that the VIN matches the vehicle details. This helps
              detect rebirthing fraud where stolen cars are given new identities.
            </li>
            <li>
              <strong>Previous Owners:</strong> Number of previous owners (where available) to verify the seller's claims
              about the vehicle's history.
            </li>
            <li>
              <strong>Market Valuation:</strong> Current trade-in, private sale, and retail values based on Australian
              market conditions.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-8">REVS Check for Every Australian State</h3>
          <p className="text-gray-700 mb-4">
            Because the PPSR is a national register, one REVS check covers vehicles from all Australian states and
            territories. Whether you're buying a car that was previously registered in:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li><strong>New South Wales (NSW)</strong> - The birthplace of REVS checks</li>
            <li><strong>Victoria (VIC)</strong> - Previously used VicRoads checks</li>
            <li><strong>Queensland (QLD)</strong> - Previously had QLD Transport checks</li>
            <li><strong>Western Australia (WA)</strong> - Previously used REVS WA</li>
            <li><strong>South Australia (SA)</strong> - Used to have separate SA checks</li>
            <li><strong>Tasmania (TAS)</strong> - Now covered by national PPSR</li>
            <li><strong>Northern Territory (NT)</strong> - Integrated with PPSR</li>
            <li><strong>Australian Capital Territory (ACT)</strong> - Uses national system</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Our $34.99 REVS check searches the entire national database, so you're covered regardless of where the
            vehicle was registered or where you're buying it.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-8">How to Read Your REVS Certificate</h3>
          <p className="text-gray-700 mb-4">
            When you receive your REVS/PPSR certificate, you'll see several sections:
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Security Interests:</strong> This section shows if there's money owing. A "clear" certificate
            means no encumbrances. If there IS money owing, you'll see the lender's name (usually a bank or finance
            company), the registration date, and other details. NEVER buy a car with an active security interest
            unless the seller pays it off before settlement.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Vehicle Details:</strong> Confirms the VIN, make, model, and year match what the seller told you.
            Mismatches could indicate fraud.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Write-Off Status:</strong> Shows if the vehicle has been written off by insurance. Statutory
            write-offs cannot legally be driven on Australian roads. Repairable write-offs can be fixed and
            re-registered but may have reduced value.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-8">Common REVS Check Mistakes to Avoid</h3>
          <p className="text-gray-700 mb-4">
            Don't make these costly errors when buying a used car:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
            <li>
              <strong>Trusting the seller's word:</strong> Many sellers genuinely don't know their car has finance
              owing (they forgot about the loan, or someone else arranged it). Always verify yourself.
            </li>
            <li>
              <strong>Using the wrong VIN:</strong> Double-check you're entering the correct 17-digit VIN. One wrong
              character could pull up the wrong vehicle.
            </li>
            <li>
              <strong>Buying before checking:</strong> Some buyers assume "I'll check it after I buy if there's a
              problem." By then it's too late - you own a car with encumbrances.
            </li>
            <li>
              <strong>Relying on "free" checks:</strong> Free REVS checks cannot provide the official PPSR certificate
              that gives you legal protection. Only paid checks include the certificate.
            </li>
            <li>
              <strong>Not keeping the certificate:</strong> Save your PPSR certificate! If issues arise later, this
              document proves you did due diligence and searched the register.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 mt-8">What If the REVS Check Shows Money Owing?</h3>
          <p className="text-gray-700 mb-4">
            If your REVS check reveals finance owing, you have several options:
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Option 1:</strong> Walk away. This is the safest choice. There are plenty of other cars without
            encumbrances.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Option 2:</strong> Negotiate with the seller to pay off the finance before settlement. Get written
            confirmation from the lender that the debt is cleared, then run a new REVS check to verify before
            completing the purchase.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Option 3:</strong> Use a licensed third-party settlement service (like PPSR.com.au's PPSAFE
            service) where your payment goes into trust, the lender is paid off, and you receive a clear title.
          </p>
          <p className="text-gray-700 mb-4">
            <strong>Never</strong> pay the seller directly and trust they'll "sort out the finance later." This is
            how people lose $15,000+.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-8">REVS Check for Motorcycles, Caravans, and Boats</h3>
          <p className="text-gray-700 mb-4">
            REVS/PPSR checks aren't just for cars! The PPSR covers all motor vehicles, including:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Motorcycles and scooters</li>
            <li>Caravans and camper trailers</li>
            <li>Boats and watercraft</li>
            <li>Commercial vehicles and trucks</li>
            <li>Agricultural machinery</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Any vehicle with a VIN or registration can be checked. The process is identical - enter the VIN or rego,
            and our system searches the PPSR for encumbrances, stolen status, and write-off history.
          </p>

          <h3 className="text-xl font-semibold mb-3 mt-8">How Much Should You Pay for a REVS Check?</h3>
          <p className="text-gray-700 mb-4">
            Official PPSR searches through the government website cost around $15-25 for just the basic certificate.
            However, this doesn't include stolen car checks, write-off searches, or vehicle valuations.
          </p>
          <p className="text-gray-700 mb-4">
            Our comprehensive REVS check costs $34.99 and includes everything:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Official PPSR certificate (worth $15-25 alone)</li>
            <li>National stolen car database search</li>
            <li>Write-off history check</li>
            <li>Vehicle specifications verification</li>
            <li>AI-powered market valuation</li>
            <li>Ownership history (where available)</li>
          </ul>
          <p className="text-gray-700 mb-4">
            Buying these services separately would cost $60-100+. At $34.99, you get comprehensive protection for
            less than the cost of a tank of fuel - and it could save you from a $15,400 loss.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Check Your Vehicle?</h3>
          <p className="text-gray-800 mb-6">
            Get your official REVS/PPSR certificate in 60 seconds
          </p>
          <Link
            href="/checkout"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
          >
            Start REVS Check - $34.99
          </Link>
        </div>
      </section>
    </div>
  )
}

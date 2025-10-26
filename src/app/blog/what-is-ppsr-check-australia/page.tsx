'use client'

import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Shield, DollarSign, FileCheck, AlertTriangle, CreditCard, Users } from 'lucide-react'

export default function WhatIsPPSRCheckPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/blog" className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
              Finance Protection
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            💰 What is PPSR Check Australia?
            <span className="text-green-600"> (Your $15k Protection)</span>
          </h1>

          <div className="flex items-center space-x-6 text-gray-500 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>24 October 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>4 min read</span>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Shield className="h-6 w-6 text-green-600 mt-1" />
              <div>
                <h3 className="font-bold text-green-800 mb-2">🛡️ Critical Protection</h3>
                <p className="text-green-700">
                  PPSR checks are your legal protection against inheriting <span className="font-bold">$15,400 average debt</span> when buying used cars.
                  This guide explains everything you need to know.
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            The Personal Property Securities Register (PPSR) is <span className="font-bold text-green-600">the most important database you've never heard of</span>.
            It could save you from financial disaster when buying a used car in Australia.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">What Exactly is PPSR?</h2>

          <p className="mb-6">
            PPSR is the Australian government's official database that records <span className="font-bold">"security interests"</span> against personal property.
            In simple terms, it tracks who has legal claims to vehicles, boats, equipment, and other valuable assets.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <h3 className="font-bold text-blue-800 mb-3">📚 PPSR Quick Facts</h3>
            <ul className="text-blue-700 space-y-2">
              <li>• Managed by the Australian Financial Security Authority (AFSA)</li>
              <li>• Contains over 6 million security interest registrations</li>
              <li>• Updated in real-time as finance is taken out or paid off</li>
              <li>• Legally binding - if it's not on PPSR, the security interest may not be valid</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Do You Need a PPSR Check?</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <div className="flex items-center space-x-3 mb-4">
                <CreditCard className="h-8 w-8 text-red-600" />
                <h3 className="text-xl font-bold text-red-800">Finance Still Owing</h3>
              </div>
              <p className="text-red-700 mb-4">
                <span className="font-bold">If you buy a car with finance owing, the debt transfers to YOU.</span>
                The bank can legally repossess the vehicle even if you paid full price.
              </p>
              <div className="bg-red-100 p-3 rounded">
                <p className="text-red-800 text-sm font-semibold">
                  📊 $15,400 = Average finance debt found on used cars
                </p>
              </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="h-8 w-8 text-orange-600" />
                <h3 className="text-xl font-bold text-orange-800">Legal Consequences</h3>
              </div>
              <p className="text-orange-700 mb-4">
                Under Australian law, you inherit ALL registered security interests.
                <span className="font-bold"> Ignorance is not a legal defense.</span>
              </p>
              <div className="bg-orange-100 p-3 rounded">
                <p className="text-orange-800 text-sm font-semibold">
                  ⚖️ You're liable even if the seller lied about finance
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">What Does a PPSR Check Reveal?</h2>

          <div className="space-y-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-500">
              <div className="flex items-start space-x-3">
                <DollarSign className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">💳 Finance Details</h3>
                  <p className="text-gray-700 mb-3">
                    Shows exactly how much money is still owed and to which financial institution.
                    Banks, credit unions, and finance companies all register their interests here.
                  </p>
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-blue-800 font-semibold text-sm">
                      Common financiers: CBA, Westpac, ANZ, NAB, Macquarie, Pepper Money, Latitude Financial
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-purple-500">
              <div className="flex items-start space-x-3">
                <FileCheck className="h-6 w-6 text-purple-600 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">📄 Security Interest Types</h3>
                  <p className="text-gray-700 mb-3">
                    PPSR tracks different types of claims against vehicles:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li><span className="font-bold">Purchase Money Security Interest (PMSI)</span> - Car loans</li>
                    <li><span className="font-bold">General Security Agreement</span> - Business loans using car as collateral</li>
                    <li><span className="font-bold">Lease agreements</span> - Commercial vehicle leases</li>
                    <li><span className="font-bold">Consignment arrangements</span> - Dealer floor plans</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
              <div className="flex items-start space-x-3">
                <Shield className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">🏆 Write-off Information</h3>
                  <p className="text-gray-700 mb-3">
                    PPSR also contains the Written-off Vehicle Register (WOVR), showing if a vehicle has been:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Declared a total loss by insurance companies</li>
                    <li>Damaged beyond economical repair</li>
                    <li>Flood, fire, or accident damaged</li>
                    <li>Statutory write-off (never to be registered again)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-100 border-2 border-red-300 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-red-800 mb-4 text-center">
              🚨 Real PPSR Horror Stories
            </h3>

            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-red-700 italic mb-2">
                  "Bought a $45k BMW from a dealer. Three weeks later, Westpac showed up with repo truck.
                  $32k still owing that dealer 'forgot' to pay off. Lost everything."
                </p>
                <p className="text-red-600 font-semibold text-sm">— Mark T., Perth (No PPSR check done)</p>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <p className="text-red-700 italic mb-2">
                  "Private seller seemed honest, had all paperwork. PPSR revealed $18k owing to a loan shark.
                  Almost lost my house paying off someone else's debt."
                </p>
                <p className="text-red-600 font-semibold text-sm">— Jenny L., Adelaide (Saved by PPSR check)</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Do a PPSR Check</h2>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mt-1" />
              <div>
                <h3 className="font-bold text-yellow-800 mb-2">⚠️ Warning About DIY PPSR Checks</h3>
                <p className="text-yellow-700">
                  You can do PPSR checks directly through the government website, but <span className="font-bold">many people make costly mistakes</span>:
                </p>
                <ul className="list-disc pl-6 text-yellow-700 mt-3 space-y-1">
                  <li>Searching wrong VIN or registration details</li>
                  <li>Misinterpreting complex legal documents</li>
                  <li>Missing additional databases (stolen, market value)</li>
                  <li>Not getting the official certificate for legal protection</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Professional vs DIY PPSR Checks</h3>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 p-6 rounded-lg">
              <h4 className="font-bold text-red-800 mb-3">🔴 DIY Government Site ($25)</h4>
              <ul className="text-red-700 space-y-2 text-sm">
                <li>• Only checks PPSR database</li>
                <li>• Complex legal language</li>
                <li>• No interpretation help</li>
                <li>• Easy to make search errors</li>
                <li>• No stolen vehicle check</li>
                <li>• No market valuation</li>
                <li>• Risk of missing critical information</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h4 className="font-bold text-green-800 mb-3">🟢 Professional Service ($35)</h4>
              <ul className="text-green-700 space-y-2 text-sm">
                <li>• PPSR + 50+ other databases</li>
                <li>• Plain English explanations</li>
                <li>• Expert interpretation included</li>
                <li>• Multiple search methods</li>
                <li>• Stolen vehicle verification</li>
                <li>• Market valuation included</li>
                <li>• Comprehensive protection report</li>
              </ul>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">When Should You Do a PPSR Check?</h2>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h3 className="font-bold text-blue-800 mb-3">✅ Essential Situations</h3>
            <ul className="text-blue-700 space-y-2">
              <li>• <span className="font-bold">Before buying ANY used vehicle</span> - cars, trucks, motorcycles, caravans</li>
              <li>• <span className="font-bold">Before paying a deposit</span> - check first, pay later</li>
              <li>• <span className="font-bold">When seller seems evasive</span> - trust but verify</li>
              <li>• <span className="font-bold">For insurance claims</span> - prove clear title</li>
              <li>• <span className="font-bold">Before major repairs</span> - ensure you'll keep the car</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">The Bottom Line</h2>

          <p className="text-lg mb-6">
            <span className="font-bold text-green-600">A PPSR check is the cheapest insurance you'll ever buy.</span>
            For less than the cost of a tank of fuel, you can avoid potentially devastating financial losses.
          </p>

          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <h3 className="font-bold text-gray-800 mb-3">💰 Cost vs Benefit Analysis</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Cost of PPSR Check:</h4>
                <p className="text-3xl font-bold text-green-600">$35</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Average debt avoided:</h4>
                <p className="text-3xl font-bold text-red-600">$15,400</p>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-4 font-semibold">
              Return on investment: <span className="text-green-600">44,000%</span>
            </p>
          </div>

          <div className="bg-green-600 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Protect Yourself with Professional PPSR Check
            </h3>
            <p className="text-green-100 mb-6">
              Don't risk inheriting someone else's debt. Get comprehensive protection with our expert vehicle report.
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg"
            >
              🛡️ GET PPSR CHECK + FULL REPORT - $34.99
            </Link>
            <div className="text-green-200 text-sm mt-4">
              ✅ Official PPSR Certificate • ✅ Stolen Check • ✅ Market Value • ✅ Expert Analysis
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
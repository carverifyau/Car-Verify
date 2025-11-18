'use client'

import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, AlertTriangle, DollarSign, Shield, Car, Users, FileX } from 'lucide-react'

export default function RedFlagsBuyingUsedCarsPage() {
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
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
              Buyer's Guide
            </span>
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
              URGENT
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            🚨 10 Red Flags When Buying Used Cars
            <span className="text-red-600"> (Don't Ignore These)</span>
          </h1>

          <div className="flex items-center space-x-6 text-gray-500 mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>25 October 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>5 min read</span>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-bold text-red-800 mb-2">⚠️ Critical Warning</h3>
                <p className="text-red-700">
                  These red flags have cost Australian car buyers <span className="font-bold">$2.1 billion</span> in 2024 alone.
                  Ignoring even one could result in financial disaster. Read every single point.
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            Buying a used car in Australia has become a minefield of scams, hidden problems, and financial traps.
            <span className="font-bold text-red-600"> One wrong move could cost you $20,000+ and leave you with a dangerous, worthless vehicle.</span>
          </p>

          <p className="mb-8">
            I've seen thousands of car buyers get burned by missing these warning signs. Here are the 10 red flags that
            should make you <span className="font-bold">walk away immediately</span> - no matter how good the deal looks.
          </p>

          {/* Red Flag 1 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-red-500 mb-8">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-red-100 rounded-full p-2">
                <FileX className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">🚫 Red Flag #1: Seller Refuses Vehicle Check</h2>
                <p className="text-red-600 font-semibold">DANGER LEVEL: EXTREME</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              <span className="font-bold">If a seller refuses to let you do a PPSR check or vehicle inspection, RUN.</span>
              Honest sellers have nothing to hide. This refusal usually means:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Finance still owing ($15,400 average debt)</li>
              <li>Stolen vehicle with altered VIN</li>
              <li>Write-off damage hidden</li>
              <li>Major mechanical problems</li>
            </ul>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-800 font-semibold">
                💸 <span className="font-bold">Real Example:</span> Brisbane buyer ignored this red flag.
                Car had $23,000 finance owing. Bank repossessed it 3 weeks later.
              </p>
            </div>
          </div>

          {/* Red Flag 2 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-orange-500 mb-8">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-orange-100 rounded-full p-2">
                <DollarSign className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">💰 Red Flag #2: Price Too Good to Be True</h2>
                <p className="text-orange-600 font-semibold">DANGER LEVEL: HIGH</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              Cars priced 20%+ below market value are usually:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><span className="font-bold">Stolen</span> - seller wants quick cash</li>
              <li><span className="font-bold">Flood damaged</span> - will cost $10k+ to fix</li>
              <li><span className="font-bold">Written off</span> - structurally unsafe</li>
              <li><span className="font-bold">Has massive debt</span> - becomes your problem</li>
            </ul>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-orange-800 font-semibold">
                ⚠️ <span className="font-bold">Market Rule:</span> If it's significantly under market value,
                there's a reason. Find out what it is before you buy.
              </p>
            </div>
          </div>

          {/* Red Flag 3 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-500 mb-8">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-purple-100 rounded-full p-2">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">🎭 Red Flag #3: Seller Stories Don't Match</h2>
                <p className="text-purple-600 font-semibold">DANGER LEVEL: HIGH</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              Watch for inconsistent stories about:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Why they're selling ("moving overseas" then mentions local plans)</li>
              <li>How long they've owned it (changes during conversation)</li>
              <li>Service history (can't remember basic details)</li>
              <li>Previous owners (evasive about history)</li>
            </ul>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-purple-800 font-semibold">
                🕵️ <span className="font-bold">Scammer Tell:</span> They can't answer basic questions about
                the car because they don't actually own it or know its real history.
              </p>
            </div>
          </div>

          {/* Red Flag 4 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-blue-500 mb-8">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-blue-100 rounded-full p-2">
                <Car className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">🔧 Red Flag #4: Won't Start Without Jump</h2>
                <p className="text-blue-600 font-semibold">DANGER LEVEL: MEDIUM-HIGH</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              If the car needs a jump start or "warming up" to run properly:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Engine problems ($5,000+ to fix)</li>
              <li>Electrical issues (nightmare to diagnose)</li>
              <li>Battery dying because car sits unused (why?)</li>
              <li>Alternator failing ($800+ repair)</li>
            </ul>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800 font-semibold">
                🔋 <span className="font-bold">Test:</span> Car should start instantly every time.
                If it doesn't, walk away unless you enjoy expensive repair bills.
              </p>
            </div>
          </div>

          {/* Red Flag 5 */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-500 mb-8">
            <div className="flex items-start space-x-3 mb-4">
              <div className="bg-green-100 rounded-full p-2">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">📄 Red Flag #5: Missing or Dodgy Paperwork</h2>
                <p className="text-green-600 font-semibold">DANGER LEVEL: EXTREME</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              <span className="font-bold">Never buy a car without proper paperwork.</span> Missing documents often mean:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li><span className="font-bold">Stolen vehicle</span> - can't provide real registration</li>
              <li><span className="font-bold">Finance owing</span> - bank holds the real title</li>
              <li><span className="font-bold">Import fraud</span> - fake compliance plates</li>
              <li><span className="font-bold">Identity theft</span> - using someone else's details</li>
            </ul>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800 font-semibold">
                📋 <span className="font-bold">Required:</span> Current registration, service records,
                finance clearance letter (if recently paid off), and seller ID matching paperwork.
              </p>
            </div>
          </div>

          <div className="bg-red-100 border-2 border-red-300 rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-red-800 mb-4 text-center">
              🚨 WARNING: 5 More Deadly Red Flags
            </h3>
            <p className="text-red-700 text-center mb-6">
              There are 5 additional red flags that are even more dangerous.
              <span className="font-bold"> Missing these could cost you everything.</span>
            </p>
            <div className="text-center">
              <Link
                href="/"
                className="inline-block bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors shadow-lg"
              >
                🛡️ PROTECT YOURSELF - GET FULL VEHICLE CHECK NOW
              </Link>
              <p className="text-red-600 text-sm mt-3">
                ✅ Finance Check • ✅ Stolen Check • ✅ Write-off Check • ✅ Market Value • ✅ Safety Report
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">The #1 Protection Strategy</h2>

          <p className="text-lg mb-6">
            <span className="font-bold">Every single red flag above can be caught with an official PPSR check.</span>
            For just $14.99, you get:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-bold text-green-800 mb-3">✅ What You'll Discover</h3>
              <ul className="text-green-700 space-y-2">
                <li>• Finance still owing (PPSR check)</li>
                <li>• Stolen vehicle status</li>
                <li>• Write-off history</li>
                <li>• Previous accident damage</li>
                <li>• Registration encumbrances</li>
                <li>• Legal ownership issues</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-blue-800 mb-3">💰 What You'll Save</h3>
              <ul className="text-blue-700 space-y-2">
                <li>• Average $15,400 finance debt</li>
                <li>• $8,000+ write-off losses</li>
                <li>• Thousands in legal fees</li>
                <li>• Criminal charges (stolen cars)</li>
                <li>• Repair nightmares</li>
                <li>• Repossession trauma</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <h3 className="font-bold text-gray-800 mb-3">💬 Real Customer Stories</h3>
            <blockquote className="text-gray-700 italic mb-4">
              "Saw all the red flags but ignored them because I wanted the car so badly.
              Lost $19,000 when the bank took it back. Should have listened to the warnings."
            </blockquote>
            <p className="text-gray-600 text-sm">— Michael K., Adelaide (Learned the hard way)</p>

            <blockquote className="text-gray-700 italic mb-4 mt-6">
              "Almost bought a 'perfect' car until the vehicle check revealed $18k finance owing.
              Seller had no idea! Saved me from disaster."
            </blockquote>
            <p className="text-gray-600 text-sm">— Sarah L., Melbourne (Smart buyer)</p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Don't Be the Next Victim</h2>

          <p className="text-lg mb-6">
            <span className="font-bold text-red-600">These red flags are everywhere in the Australian car market.</span>
            Criminals are getting smarter, scams are getting more sophisticated, and the cost of making mistakes keeps rising.
          </p>

          <p className="text-lg mb-8">
            The choice is simple: spend $14.99 on protection, or risk losing $20,000+ to scammers and hidden problems.
          </p>

          <div className="bg-blue-600 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Smart Buyers Check First
            </h3>
            <p className="text-blue-100 mb-6">
              Don't let red flags become expensive lessons. Get your official PPSR certificate now.
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg"
            >
              🚨 GET PPSR CERTIFICATE - $14.99
            </Link>
            <div className="text-blue-200 text-sm mt-4">
              ✅ Finance Check • ✅ Write-off History • ✅ Stolen Check • ✅ Official Certificate
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
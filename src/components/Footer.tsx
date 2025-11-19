import Link from 'next/link'
import { Shield, CheckCircle, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Car Verify</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6 text-sm">
              Australia's trusted vehicle verification service. Instant PPSR checks from official government databases.
            </p>
            <div className="text-sm text-gray-400">
              <p>Authorised PPSR Provider</p>
              <p>Australian Registered Business</p>
            </div>
          </div>

          {/* Vehicle Checks Column */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Vehicle Checks</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link href="/revs-check" className="hover:text-blue-400 transition-colors">REVS Check</Link></li>
              <li><Link href="/ppsr-check" className="hover:text-blue-400 transition-colors">PPSR Check</Link></li>
              <li><Link href="/rego-check" className="hover:text-blue-400 transition-colors">Rego Check</Link></li>
              <li><Link href="/vin-check" className="hover:text-blue-400 transition-colors">VIN Check</Link></li>
              <li><Link href="/car-valuation" className="hover:text-blue-400 transition-colors">Car Valuation</Link></li>
            </ul>
          </div>

          {/* City-Specific Checks Column */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Check by City</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link href="/revs-check-sydney" className="hover:text-blue-400 transition-colors">Sydney REVS Check</Link></li>
              <li><Link href="/revs-check-melbourne" className="hover:text-blue-400 transition-colors">Melbourne REVS Check</Link></li>
              <li><Link href="/revs-check-brisbane" className="hover:text-blue-400 transition-colors">Brisbane REVS Check</Link></li>
              <li><Link href="/revs-check-perth" className="hover:text-blue-400 transition-colors">Perth REVS Check</Link></li>
              <li><Link href="/revs-check-adelaide" className="hover:text-blue-400 transition-colors">Adelaide REVS Check</Link></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Resources</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link href="/sample-report" className="hover:text-blue-400 transition-colors">Sample Report</Link></li>
              <li><Link href="/blog" className="hover:text-blue-400 transition-colors">Car Buying Guide</Link></li>
              <li><Link href="/blog/what-is-ppsr-check-australia" className="hover:text-blue-400 transition-colors">What is PPSR?</Link></li>
              <li><Link href="/blog/red-flags-buying-used-cars" className="hover:text-blue-400 transition-colors">Red Flags</Link></li>
              <li><Link href="/blog/car-buying-scams-australia-2024" className="hover:text-blue-400 transition-colors">Avoid Scams</Link></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Support & Legal</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Support</Link></li>
              <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              <p>&copy; 2024 Car Verify Australia. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400 flex-wrap justify-center gap-2">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-blue-400" />
                <span>Secure & Encrypted</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-blue-400" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span>24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

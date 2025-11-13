import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, CheckCircle, Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'VIN Check Australia - Free VIN Number Lookup & Decoder | Car Verify',
  description: 'Free VIN check & decoder for Australian vehicles. Verify VIN number, check stolen status, find finance owing, decode specs & get full vehicle history. Instant results.',
  keywords: 'vin check, vin number check, vin decoder, vin lookup, vin check australia, vehicle identification number, vin verification',
  alternates: {
    canonical: 'https://carverify.com.au/vin-check',
  },
  openGraph: {
    title: 'VIN Check Australia - Free VIN Number Lookup & Decoder',
    description: 'Decode any VIN number instantly. PPSR check, stolen car verification & full vehicle history from $34.99',
    url: 'https://carverify.com.au/vin-check',
    siteName: 'Car Verify Australia',
    type: 'website',
  },
}

export default function VINCheckPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            VIN Check Australia - Instant Vehicle Identification Number Lookup
          </h1>
          <p className="text-xl text-gray-800 max-w-3xl mx-auto">
            Decode any VIN number instantly. Get comprehensive vehicle history, PPSR check, stolen car verification & market valuation from $34.99
          </p>
          <div className="mt-8">
            <Link href="/checkout" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700">
              Check VIN Now - $34.99
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

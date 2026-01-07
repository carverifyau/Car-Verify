'use client'

import { useState } from 'react'
import { Search, TrendingUp } from 'lucide-react'

export default function TestScraperPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    make: 'Ford',
    model: 'Ranger',
    year: '2018',
  })

  const handleTest = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/scrape-market-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to scrape data')
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-2">Carsales Market Data Scraper</h1>
        <p className="text-center text-gray-600 mb-12">Test the scraping API</p>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Test Vehicle</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
              <input
                type="text"
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Ford"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
              <input
                type="text"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Ranger"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 2018"
              />
            </div>
          </div>

          <button
            onClick={handleTest}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Scraping Carsales...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Test Scraper
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-bold text-red-900 mb-2">Error</h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-bold">Market Data Results</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                <div className="text-sm text-gray-600 mb-1">Retail Value</div>
                <div className="text-3xl font-bold text-gray-900">{result.retailValue}</div>
                <div className="text-xs text-gray-500 mt-1">Dealership price</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                <div className="text-sm text-gray-600 mb-1">Private Sale</div>
                <div className="text-3xl font-bold text-gray-900">{result.privateValue}</div>
                <div className="text-xs text-gray-500 mt-1">Private party</div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl">
                <div className="text-sm text-gray-600 mb-1">Trade-In Value</div>
                <div className="text-3xl font-bold text-gray-900">{result.tradeValue}</div>
                <div className="text-xs text-gray-500 mt-1">Dealer trade-in</div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Average Price:</span>
                  <span className="ml-2 font-bold text-gray-900">{result.averagePrice}</span>
                </div>
                <div>
                  <span className="text-gray-600">Listings Found:</span>
                  <span className="ml-2 font-bold text-gray-900">{result.listingsFound}</span>
                </div>
                <div>
                  <span className="text-gray-600">Price Change:</span>
                  <span className="ml-2 font-bold text-green-600">{result.priceChange}</span>
                </div>
              </div>
            </div>

            <details className="mt-6">
              <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                View Raw Data
              </summary>
              <pre className="mt-4 p-4 bg-gray-900 text-green-400 rounded-lg overflow-auto text-xs">
                {JSON.stringify(result, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  )
}

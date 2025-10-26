'use client'

import Link from 'next/link'
import { Calendar, Clock, ArrowRight, TrendingUp, Shield, DollarSign } from 'lucide-react'

const blogPosts = [
  {
    slug: 'red-flags-buying-used-cars',
    title: '🚨 10 Red Flags When Buying Used Cars (Don\'t Ignore These)',
    excerpt: 'These warning signs could save you from a $20,000 disaster. Learn what dealers and private sellers don\'t want you to notice.',
    category: 'Buyer\'s Guide',
    readTime: '5 min read',
    publishDate: '2024-10-25',
    image: '🚗',
    urgent: true
  },
  {
    slug: 'what-is-ppsr-check-australia',
    title: '💰 What is PPSR Check Australia? (Your $15k Protection)',
    excerpt: 'PPSR checks reveal finance owing on cars. Don\'t inherit someone else\'s debt - here\'s everything you need to know.',
    category: 'Finance Protection',
    readTime: '4 min read',
    publishDate: '2024-10-24',
    image: '🛡️',
    urgent: false
  },
  {
    slug: 'car-buying-scams-australia-2024',
    title: '🎯 Car Buying Scams Australia 2024 (How to Spot & Avoid)',
    excerpt: 'New scams are targeting Australian car buyers. Learn the latest tactics criminals use and how to protect yourself.',
    category: 'Scam Prevention',
    readTime: '6 min read',
    publishDate: '2024-10-23',
    image: '⚠️',
    urgent: true
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Car Buying Protection
              <span className="text-blue-600"> Knowledge Base</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Expert insights, warning signs, and protection strategies to help you avoid
              the costly mistakes that trap thousands of Australian car buyers every year.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-full">
                <TrendingUp className="h-4 w-4 text-red-600" />
                <span className="text-red-700 font-semibold text-sm">Latest Scam Alerts</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="text-blue-700 font-semibold text-sm">Protection Guides</span>
              </div>
              <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-green-700 font-semibold text-sm">Money-Saving Tips</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-8">
          {blogPosts.map((post, index) => (
            <article key={post.slug} className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${post.urgent ? 'border-2 border-red-200' : ''}`}>
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{post.image}</div>
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          post.category === 'Buyer\'s Guide' ? 'bg-blue-100 text-blue-700' :
                          post.category === 'Finance Protection' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {post.category}
                        </span>
                        {post.urgent && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                            URGENT
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.publishDate).toLocaleDateString('en-AU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-blue-600 rounded-xl p-8 mt-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Don't Risk It - Check Before You Buy
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Reading about car buying dangers? Take action now with a comprehensive vehicle check.
            Get the protection these articles recommend.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 transition-colors"
          >
            🛡️ Check My Vehicle Now - $34.99
          </Link>
        </div>
      </div>
    </div>
  )
}
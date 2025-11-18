'use client'

import { Shield, CheckCircle, AlertTriangle, Zap, Clock, Award, Search, FileText, Users, TrendingUp, Brain, Target, Download, ExternalLink, Car } from 'lucide-react'
import Link from 'next/link'
import VehicleLookupFormWithPreview from '@/components/VehicleLookupFormWithPreview'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex justify-between items-center">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="bg-blue-600 p-1.5 md:p-2 rounded-lg">
                <Car className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div>
                <span className="text-xl md:text-2xl font-bold text-gray-900">Car Verify</span>
                <div className="text-[10px] md:text-xs text-blue-600 font-medium">AUTHORISED PPSR PROVIDER</div>
              </div>
            </motion.div>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm font-medium">
                How it Works
              </Link>
              <Link href="#sample-report" className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm font-medium">
                Sample Report
              </Link>
              <Link href="#support" className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm font-medium">
                Support
              </Link>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="h-4 w-4 mr-2" />
                Authorised PPSR Provider • Official Government Data
              </div>

              <h1 className="text-3xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Official PPSR Check
                <span className="text-red-600"> - Before You Buy</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed font-medium">
                Get your <span className="text-blue-600 font-bold">official PPSR certificate</span> instantly. Check for finance owing, stolen status, and write-off history before you buy.
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 max-w-2xl mx-auto">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                  <p className="text-red-800 font-semibold text-sm">
                    <strong>WARNING:</strong> 1 in 4 cars have money owing. Don't inherit someone else's debt - check first.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <VehicleLookupFormWithPreview />
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mb-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">30 Seconds</div>
                <div className="text-gray-600 text-sm">Instant reports via email</div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">Official</div>
                <div className="text-gray-600 text-sm">Government database access</div>
              </div>
              <div className="text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">Guaranteed</div>
                <div className="text-gray-600 text-sm">100% money-back promise</div>
              </div>
            </motion.div>

            {/* Money-Back Guarantee */}
            <motion.div
              className="bg-green-50 border-2 border-green-200 rounded-xl p-6 max-w-2xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="text-center">
                <div className="bg-green-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-2">100% Money-Back Guarantee</h3>
                <p className="text-green-800 font-medium">
                  If our report doesn't provide accurate official data, we'll refund your money immediately. No questions asked.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Check Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                What We Check That Could Save You
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every check reveals potential problems that could cost you thousands. Here's what we uncover:
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Hidden Debt Check</h3>
                <p className="text-gray-600 text-sm"><strong>$25,000+ still owing?</strong> PPSR reveals finance that could make the car legally repossessed</p>
              </motion.div>

              <motion.div
                className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Stolen Vehicle Check</h3>
                <p className="text-gray-600 text-sm"><strong>Police will seize it.</strong> Check if the car is reported stolen across all Australian states</p>
              </motion.div>

              <motion.div
                className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Hidden Damage</h3>
                <p className="text-gray-600 text-sm"><strong>Flood or crash damage?</strong> Reveals insurance write-offs that dealers won't tell you</p>
              </motion.div>

              <motion.div
                className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Official Certificate</h3>
                <p className="text-gray-600 text-sm"><strong>Legal proof.</strong> Official PPSR certificate accepted by banks and legal authorities</p>
              </motion.div>
            </div>

            {/* Stats Section */}
            <motion.div
              className="bg-gray-50 rounded-2xl p-8 mt-16"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">Official</div>
                  <div className="text-gray-600 text-sm">Government PPSR Database</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">Instant</div>
                  <div className="text-gray-600 text-sm">Certificate Delivery</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$14.99</div>
                  <div className="text-gray-600 text-sm">One-Time Payment</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-gray-600 text-sm">Available</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Data-Driven Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <TrendingUp className="h-4 w-4 mr-2" />
                NEW: Enhanced Intelligence
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Data-Driven Vehicle Analysis
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our reports include comprehensive market analysis providing pricing insights, negotiation guidance, and detailed vehicle intelligence.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Market Heat Indicator</h3>
                <p className="text-gray-600 leading-relaxed">
                  Real-time market demand analysis with visual heat indicators to help you understand current market conditions.
                </p>
              </motion.div>

              <motion.div
                className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Brain className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Negotiation Tips</h3>
                <p className="text-gray-600 leading-relaxed">
                  Data-driven negotiation strategies based on vehicle reliability, market trends, and known issues.
                </p>
              </motion.div>

              <motion.div
                className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Comprehensive Pricing</h3>
                <p className="text-gray-600 leading-relaxed">
                  Trade-in, private sale, and retail valuations with visual charts and reliability star ratings.
                </p>
              </motion.div>
            </div>

            <motion.div
              className="text-center mt-12"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 max-w-4xl mx-auto">
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Professional-Grade Analysis</h4>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  Our data-driven reports include pricing charts, risk assessments, market position analysis, and actionable insights
                  used by dealers and financial institutions across Australia.
                </p>
                <div className="text-center">
                  <Link
                    href="/sample-report"
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    View Sample Report
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Get your comprehensive vehicle report in 3 simple steps
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                className="text-center"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Enter Vehicle Details</h3>
                <p className="text-gray-600 leading-relaxed">
                  Simply enter the registration number and state, or VIN number of the vehicle you want to check.
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Instant Database Search</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our system searches multiple official databases including PPSR, NEVDIS, and recalls databases.
                </p>
              </motion.div>

              <motion.div
                className="text-center"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Receive Comprehensive Report</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get your detailed report instantly via email, including all checks, valuations, and recommendations.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="support" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-16"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about our vehicle history reports
              </p>
            </motion.div>

            <div className="space-y-6">
              <motion.div
                className="bg-gray-50 rounded-xl p-8"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">How fast will I get my report?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Reports are generated instantly and delivered to your email within seconds. Our system provides immediate access to comprehensive vehicle data.
                </p>
              </motion.div>

              <motion.div
                className="bg-gray-50 rounded-xl p-8"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">What data sources do you use?</h3>
                <p className="text-gray-600 leading-relaxed">
                  We access official Australian government databases including PPSR, NEVDIS, and recall databases to provide the most comprehensive and accurate vehicle history available.
                </p>
              </motion.div>

              <motion.div
                className="bg-gray-50 rounded-xl p-8"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Is my information secure?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Yes, we use bank-level encryption to protect your data. All searches are conducted securely and your personal information is never stored or shared.
                </p>
              </motion.div>

              <motion.div
                className="bg-gray-50 rounded-xl p-8"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">What makes your reports different?</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our reports combine official government data with comprehensive market analysis, including market heat indicators, data-driven negotiation tips, pricing charts with star reliability ratings, and professional market intelligence used by dealers and financial institutions.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

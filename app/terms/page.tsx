"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Users } from "lucide-react"
import { Footer } from "@/components/footer"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-6">
              <Button
                onClick={() => window.history.back()}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400 text-lg px-8 py-3 font-semibold transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <ArrowLeft className="w-6 h-6 mr-3" />
                Back
              </Button>
              <div className="flex flex-col">
                <span className="text-2xl text-yellow-400 font-bold" style={{ fontFamily: "Inter, sans-serif" }}>
                  Terms of Service
                </span>
                <span className="text-sm text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
                  Last updated: January 2025
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-black" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
              Terms of Service
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Welcome to Rancho's Platform. These Terms of Service govern your use of our career development 
              and skills assessment tools. By using our platform, you agree to these terms.
            </p>
          </div>

          {/* Terms Content */}
          <div className="space-y-8">
            {/* Acceptance of Terms */}
            <section className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "Inter, sans-serif" }}>
                  Acceptance of Terms
                </h2>
              </div>
              <div className="space-y-4 text-gray-300 text-sm">
                <p>
                  By accessing and using Rancho's Platform, you accept and agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our platform.
                </p>
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon 
                  posting on the platform. Your continued use of the platform constitutes acceptance of the modified terms.
                </p>
              </div>
            </section>

            {/* Service Description */}
            <section className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "Inter, sans-serif" }}>
                  Service Description
                </h2>
              </div>
              <div className="space-y-4 text-gray-300 text-sm">
                <p>
                  Rancho's Platform provides career development tools, skills assessments, and professional guidance 
                  through our web-based platform. Our services include:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Career assessment and planning tools</li>
                  <li>Skills evaluation and development recommendations</li>
                  <li>Market trend analysis and insights</li>
                  <li>Professional networking opportunities</li>
                  <li>Personalized career coaching and mentorship</li>
                </ul>
                <p>
                  We strive to provide accurate and helpful information, but we do not guarantee specific career outcomes 
                  or job placement results.
                </p>
              </div>
            </section>

            {/* User Responsibilities */}
            <section className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "Inter, sans-serif" }}>
                  User Responsibilities
                </h2>
              </div>
              <div className="space-y-4 text-gray-300 text-sm">
                <p>As a user of Rancho's Platform, you agree to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Use the platform for lawful purposes only</li>
                  <li>Respect the intellectual property rights of others</li>
                  <li>Not disrupt or interfere with platform functionality</li>
                  <li>Not upload malicious content or code</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
              </div>
            </section>

            {/* Payment and Subscription */}
            <section className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                Payment and Subscription Terms
              </h2>
              <div className="space-y-4 text-gray-300 text-sm">
                <div>
                  <h3 className="font-semibold text-white mb-2">Subscription Fees:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Subscription fees are billed in advance on a monthly or yearly basis</li>
                    <li>All fees are non-refundable except as required by law</li>
                    <li>We may change pricing with 30 days notice</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Payment Methods:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>We accept major credit cards and digital payment methods</li>
                    <li>You authorize us to charge your selected payment method</li>
                    <li>You are responsible for updating payment information</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Cancellation:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>You may cancel your subscription at any time</li>
                    <li>Access continues until the end of your billing period</li>
                    <li>No partial refunds for unused time</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                Intellectual Property Rights
              </h2>
              <div className="space-y-4 text-gray-300 text-sm">
                <p>
                  All content, features, and functionality on Rancho's Platform are owned by us and are protected 
                  by copyright, trademark, and other intellectual property laws.
                </p>
                <div>
                  <h3 className="font-semibold text-white mb-2">Your Rights:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Limited license to access and use the platform</li>
                    <li>Right to export your personal data</li>
                    <li>Ability to share your achievements and progress</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Restrictions:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>No copying or redistribution of platform content</li>
                    <li>No reverse engineering or decompilation</li>
                    <li>No commercial use without explicit permission</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "Inter, sans-serif" }}>
                  Limitation of Liability
                </h2>
              </div>
              <div className="space-y-4 text-gray-300 text-sm">
                <p>
                  Rancho's Platform is provided "as is" without warranties of any kind, express or implied. 
                  We do not guarantee that the platform will be uninterrupted, error-free, or completely secure.
                </p>
                <p>
                  To the maximum extent permitted by law, we shall not be liable for:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Any indirect, incidental, or consequential damages</li>
                  <li>Loss of profits, data, or business opportunities</li>
                  <li>Decisions made based on platform recommendations</li>
                  <li>Career outcomes or job placement results</li>
                </ul>
                <p>
                  Our total liability for any claim related to the platform shall not exceed the amount you paid 
                  for the service in the six months preceding the claim.
                </p>
              </div>
            </section>

            {/* Termination */}
            <section className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                Account Termination
              </h2>
              <div className="space-y-4 text-gray-300 text-sm">
                <p>
                  We reserve the right to terminate or suspend your account immediately, without prior notice, 
                  for conduct that we believe violates these terms or is harmful to other users or the platform.
                </p>
                <p>
                  Grounds for termination include:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Breach of these Terms of Service</li>
                  <li>Fraudulent or illegal activities</li>
                  <li>Harassment of other users</li>
                  <li>Security violations or attempted hacking</li>
                  <li>Spam or unauthorized commercial activity</li>
                </ul>
                <p>
                  Upon termination, your right to use the platform immediately ceases, and we may delete 
                  your account and data in accordance with our Privacy Policy.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                Contact Information
              </h2>
              <div className="space-y-4 text-gray-300">
                <p className="text-sm">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> legal@ranchosplatform.com</p>
                  <p><strong>Mail:</strong> Rancho's Platform Legal Team, 123 Career Street, Professional City, PC 12345</p>
                  <p><strong>Response Time:</strong> We will respond to legal inquiries within 7 business days</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

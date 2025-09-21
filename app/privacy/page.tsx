"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Lock, Eye, Database } from "lucide-react"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
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
                  Privacy Policy
                </span>
                <span className="text-sm text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
                  Last updated: January 2024
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
              <Shield className="w-10 h-10 text-black" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
              Your Privacy Matters
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              At Rancho's Platform, we are committed to protecting your personal data and ensuring your privacy. 
              This policy outlines how we collect, use, and safeguard your information.
            </p>
          </div>

          {/* Privacy Content */}
          <div className="space-y-8">
            {/* Information We Collect */}
            <section className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "Inter, sans-serif" }}>
                  Information We Collect
                </h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="font-semibold text-white mb-2">Personal Information:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Name and email address</li>
                    <li>Professional profile and career history</li>
                    <li>Skills assessment data</li>
                    <li>Payment and billing information</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Usage Data:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Tool usage patterns and preferences</li>
                    <li>Career assessment results</li>
                    <li>Learning progress and achievements</li>
                    <li>Device and browser information</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Your Data */}
            <section className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "Inter, sans-serif" }}>
                  How We Use Your Data
                </h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Provide personalized career guidance and skill assessments</li>
                  <li>Improve our tools and services based on your usage patterns</li>
                  <li>Send relevant updates about career opportunities and platform features</li>
                  <li>Process subscription payments and manage your account</li>
                  <li>Ensure platform security and prevent unauthorized access</li>
                  <li>Comply with legal obligations and regulations</li>
                </ul>
              </div>
            </section>

            {/* Data Protection */}
            <section className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "Inter, sans-serif" }}>
                  Data Protection & Security
                </h2>
              </div>
              <div className="space-y-4 text-gray-300">
                <p>We implement industry-standard security measures to protect your data:</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>End-to-end encryption for all data transmission</li>
                  <li>Secure storage with regular security audits</li>
                  <li>Access controls limited to authorized personnel only</li>
                  <li>Regular vulnerability assessments and penetration testing</li>
                  <li>Compliance with GDPR, CCPA, and other privacy regulations</li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                Your Privacy Rights
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Access your personal data and information</li>
                  <li>Correct inaccurate or incomplete data</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Export your data in a portable format</li>
                  <li>Object to certain data processing activities</li>
                </ul>
                <p className="text-sm mt-4">
                  To exercise these rights, please contact us at privacy@ranchosplatform.com
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                Contact Us
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <div className="space-y-2 text-sm">
                  <p><strong>Email:</strong> privacy@ranchosplatform.com</p>
                  <p><strong>Mail:</strong> Rancho's Platform Privacy Team, 123 Career Street, Professional City, PC 12345</p>
                  <p><strong>Response Time:</strong> We will respond to privacy inquiries within 7 business days</p>
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

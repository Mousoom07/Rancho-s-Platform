"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-black border-t-8 border-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-yellow-400 border-4 border-white rounded-full flex items-center justify-center">
                <img src="/idiots-logo.jpg" alt="Rancho's Platform" className="w-12 h-12 object-cover" />
              </div>
            <div>
              <h3 className="text-2xl text-yellow-400 font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                Rancho's Platform
              </h3>
              <p className="text-white font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                रांचो का प्लेटफॉर्म
              </p>
            </div>
            </div>
            <p
              className="text-white font-bold leading-relaxed mb-6"
              style={{
                fontFamily: "Comic Sans MS, cursive",
                lineHeight: "1.6",
              }}
            >
              Empowering careers through AI-driven insights, predictive analytics, and future-ready skill development.
              Join thousands who've transformed their professional journey with our innovative tools.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge className="bg-yellow-400 text-black border-2 border-white font-bold">🚀 Innovative Platform</Badge>
              <Badge className="bg-white text-black border-2 border-yellow-400 font-bold">🔒 Privacy First</Badge>
              <Badge className="bg-yellow-400 text-black border-2 border-white font-bold">🌍 Global Community</Badge>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl text-yellow-400 font-bold mb-4" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["About Us", "How It Works", "Success Stories", "Blog", "Help Center", "API Documentation", "Developed By"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={link === "Developed By" ? "/developed-by" : "#"}
                      className="text-white hover:text-yellow-400 transition-colors font-bold"
                      style={{ fontFamily: "Comic Sans MS, cursive" }}
                    >
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-xl text-yellow-400 font-bold mb-4" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              Contact & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:support@ranchosplatform.com"
                  className="text-white hover:text-yellow-400 transition-colors font-bold"
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  📧 support@ranchosplatform.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+91-RANCHO"
                  className="text-white hover:text-yellow-400 transition-colors font-bold"
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  📞 +91-RANCHO
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-white hover:text-yellow-400 transition-colors font-bold"
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  Privacy Polic
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-white hover:text-yellow-400 transition-colors font-bold"
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-yellow-400 transition-colors font-bold"
                  style={{ fontFamily: "Comic Sans MS, cursive" }}
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              © 2025 Rancho's Platform. All rights reserved. | Built with ❤️ for career excellence seekers worldwide.
            </div>
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="sm"
                className="bg-yellow-400 border-2 border-white text-black hover:bg-white font-bold"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                🐦 Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white border-2 border-yellow-400 text-black hover:bg-yellow-400 font-bold"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                💼 LinkedIn
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-yellow-400 border-2 border-white text-black hover:bg-white font-bold"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                📺 YouTube
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

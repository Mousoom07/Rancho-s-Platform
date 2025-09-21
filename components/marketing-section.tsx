"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function MarketingSection() {
  const features = [
    {
      icon: "🤖",
      title: "AI-Powered Career Intelligence",
      description:
        "Advanced machine learning algorithms analyze market trends, skill demands, and career trajectories to provide personalized insights.",
      benefits: ["Predictive career modeling", "Real-time market analysis", "Personalized recommendations"],
    },
    {
      icon: "🎯",
      title: "Future-Proof Skill Mapping",
      description:
        "Identify emerging skills before they become mainstream. Stay ahead of automation and industry disruption.",
      benefits: ["Early trend detection", "Automation risk assessment", "Strategic skill planning"],
    },
    {
      icon: "📊",
      title: "Data-Driven Decision Making",
      description:
        "Make career decisions based on comprehensive data analysis, not just intuition. Reduce career risks with scientific precision.",
      benefits: ["Risk quantification", "ROI analysis for skills", "Evidence-based planning"],
    },
    {
      icon: "🚀",
      title: "Accelerated Career Growth",
      description:
        "Optimize your learning path and career moves for maximum impact. Achieve in months what typically takes years.",
      benefits: ["Optimized learning paths", "Strategic networking", "Fast-track promotions"],
    },
  ]

  const useCases = [
    {
      title: "For Students & Fresh Graduates",
      description: "Choose the right career path from day one",
      icon: "🎓",
      points: ["Identify high-growth career paths", "Skill gap analysis", "Industry readiness assessment"],
    },
    {
      title: "For Mid-Career Professionals",
      description: "Navigate career transitions and climb the ladder",
      icon: "💼",
      points: ["Career pivot strategies", "Leadership skill development", "Salary optimization"],
    },
    {
      title: "For Senior Executives",
      description: "Stay relevant and lead digital transformation",
      icon: "👔",
      points: ["Executive presence enhancement", "Digital leadership skills", "Industry disruption preparation"],
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Why Choose Us Section */}
      <div className="text-center mb-16">
        <h2
          className="text-4xl text-force-white mb-8 drop-shadow-2xl font-bold"
          style={{
            fontFamily: "Comic Sans MS, cursive",
            letterSpacing: "2px",
            textShadow: "3px 3px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000, 0px 0px 10px #fff",
          }}
        >
          🌟 why rancho's platform is different 🌟
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white border-8 border-black p-8 shadow-2xl transform hover:scale-105 transition-all"
            >
              <div className="text-6xl mb-4 text-center">{feature.icon}</div>
              <h3
                className="text-xl font-bold text-force-white mb-4 text-center"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-force-white font-bold mb-6 leading-relaxed"
                style={{
                  fontFamily: "Comic Sans MS, cursive",
                  lineHeight: "1.6",
                }}
              >
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-force-white font-bold"
                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                  >
                    <span className="text-green-500 mr-2">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      {/* Use Cases Section */}
      <div className="text-center mb-16">
        <h2
          className="text-4xl text-force-white mb-12 drop-shadow-2xl font-bold"
          style={{
            fontFamily: "Comic Sans MS, cursive",
            letterSpacing: "2px",
            textShadow: "3px 3px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000, 0px 0px 10px #fff",
          }}
        >
          🎯 perfect for every career stage 🎯
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className="bg-white border-8 border-black p-6 shadow-2xl transform hover:scale-105 transition-all"
            >
              <div className="text-5xl mb-4 text-center">{useCase.icon}</div>
              <h3
                className="text-lg font-bold text-force-white mb-3 text-center"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                {useCase.title}
              </h3>
              <p className="text-force-white font-bold mb-4 text-center" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                {useCase.description}
              </p>
              <ul className="space-y-2">
                {useCase.points.map((point, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-force-white font-bold text-sm"
                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                  >
                    <span className="text-blue-500 mr-2">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-dark-card border-8 border-visible rounded-lg p-12 text-center">
        <h2
          className="text-4xl text-yellow-400 mb-6 drop-shadow-2xl font-bold"
          style={{
            fontFamily: "Comic Sans MS, cursive",
            letterSpacing: "2px",
            textShadow: "3px 3px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000, 0px 0px 10px #fff",
          }}
        >
          🚀 ready to transform your career? 🚀
        </h2>
        <p
          className="text-white font-bold text-xl mb-8 leading-relaxed"
          style={{
            fontFamily: "Comic Sans MS, cursive",
            lineHeight: "1.6",
          }}
        >
          Join 50,000+ professionals who've already future-proofed their careers with our AI-powered platform.
          <br />
          Start your journey to career excellence today!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-yellow-400 border-4 border-white text-force-black hover:bg-white hover:text-force-black text-xl px-8 py-4 shadow-2xl transform hover:scale-105 transition-all font-bold"
            style={{
              fontFamily: "Comic Sans MS, cursive",
              letterSpacing: "1px",
            }}
          >
            🎯 Start Free Trial
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-dark-card border-4 border-yellow-400 text-force-white hover:bg-yellow-400 hover:text-force-black text-xl px-8 py-4 shadow-2xl transform hover:scale-105 transition-all font-bold"
            style={{
              fontFamily: "Comic Sans MS, cursive",
              letterSpacing: "1px",
            }}
          >
            📞 Schedule Demo
          </Button>
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <Badge className="bg-green-500 text-white border-2 border-white font-bold">✓ No Credit Card Required</Badge>
          <Badge className="bg-blue-500 text-white border-2 border-white font-bold">
            ✓ 30-Day Money Back Guarantee
          </Badge>
        </div>
      </div>
    </div>
  )
}

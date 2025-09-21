"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function UniqueFeatures() {
  const uniqueFeatures = [
    {
      icon: "🧠",
      title: "AI-Powered Career Prediction",
      description:
        "Our proprietary algorithm analyzes 10,000+ career paths to predict your optimal future with 94% accuracy",
      impact: "Users report 3x faster career growth",
      badge: "Exclusive Technology",
    },
    {
      icon: "🎮",
      title: "Gamified Learning Experience",
      description: "Turn skill development into an addictive game with XP points, achievements, and leaderboards",
      impact: "85% higher completion rates",
      badge: "Engagement Innovation",
    },
    {
      icon: "🔮",
      title: "Future Skills Marketplace",
      description:
        "Trade and invest in emerging skills before they become mainstream - like a stock market for abilities",
      impact: "Early adopters gain 2-year advantage",
      badge: "Market Pioneer",
    },
    {
      icon: "🎭",
      title: "Celebrity AI Mentors",
      description: "Get personalized advice from AI versions of industry legends like Elon Musk, Oprah, and Steve Jobs",
      impact: "Motivation increases by 200%",
      badge: "Celebrity Access",
    },
    {
      icon: "🌪️",
      title: "Chaos Simulation Engine",
      description:
        "Stress-test your career against black swan events and economic disruptions with movie-like scenarios",
      impact: "99% better crisis preparedness",
      badge: "Risk Management",
    },
    {
      icon: "🔬",
      title: "Burnout Blood Test",
      description: "Analyze your text patterns to detect stress signals and get micro-break prescriptions",
      impact: "70% reduction in burnout cases",
      badge: "Health Innovation",
    },
  ]

  const professionalAspects = [
    {
      icon: "🏢",
      title: "Enterprise-Grade Security",
      description: "Bank-level encryption and GDPR compliance ensure your career data stays private and secure",
      certification: "ISO 27001 Certified",
    },
    {
      icon: "🌍",
      title: "Global Career Intelligence",
      description: "Real-time data from 150+ countries and 50+ industries for comprehensive market insights",
      coverage: "50M+ job postings analyzed daily",
    },
    {
      icon: "🤝",
      title: "Industry Partnerships",
      description: "Direct connections with Fortune 500 companies, top universities, and leading recruitment firms",
      partners: "500+ verified partners",
    },
    {
      icon: "📊",
      title: "Advanced Analytics Suite",
      description: "Deep-dive into your career metrics with predictive modeling and trend analysis",
      accuracy: "94% prediction accuracy",
    },
    {
      icon: "🎓",
      title: "Certified Learning Paths",
      description: "Industry-recognized certifications and skill validations accepted by top employers",
      recognition: "Accepted by 1000+ companies",
    },
    {
      icon: "⚡",
      title: "Real-Time Adaptation",
      description: "Platform evolves with market changes, updating recommendations within 24 hours of industry shifts",
      speed: "24-hour market response",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Unique Features Section */}
      <div className="text-center mb-16">
        <h2
          className="text-4xl text-white-shadow mb-8 drop-shadow-2xl font-bold"
          style={{
            fontFamily: "Comic Sans MS, cursive",
            letterSpacing: "2px",
            textShadow: "3px 3px 0px #fff, -2px -2px 0px #fff, 2px -2px 0px #fff, -2px 2px 0px #fff, 0px 0px 10px #fff",
          }}
        >
          🌟 what makes us absolutely unique 🌟
        </h2>
        <p className="text-lg text-white-shadow font-bold mb-12" style={{ fontFamily: "Comic Sans MS, cursive" }}>
          Features you won't find anywhere else in the career development universe!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {uniqueFeatures.map((feature, index) => (
            <Card
              key={index}
              className="bg-white border-8 border-black p-6 shadow-2xl transform hover:scale-105 transition-all"
            >
              <div className="text-5xl mb-4 text-center">{feature.icon}</div>
              <Badge className="bg-yellow-400 text-black border-2 border-black font-bold mb-4 w-full justify-center">
                {feature.badge}
              </Badge>
              <h3
                className="text-lg font-bold text-white-shadow mb-3 text-center"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-white-shadow font-bold text-sm mb-4 leading-relaxed"
                style={{ fontFamily: "Comic Sans MS, cursive" }}
              >
                {feature.description}
              </p>
              <div className="bg-black text-yellow-400 p-2 rounded border-2 border-white text-center">
                <span className="font-bold text-sm" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                  💫 {feature.impact}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Professional Aspects Section */}
      <div className="text-center mb-16">
        <h2
          className="text-4xl text-white-shadow mb-8 drop-shadow-2xl font-bold"
          style={{
            fontFamily: "Comic Sans MS, cursive",
            letterSpacing: "2px",
            textShadow: "3px 3px 0px #fff, -2px -2px 0px #fff, 2px -2px 0px #fff, -2px 2px 0px #fff, 0px 0px 10px #fff",
          }}
        >
          🏆 professional excellence standards 🏆
        </h2>
        <p className="text-lg text-white-shadow font-bold mb-12" style={{ fontFamily: "Comic Sans MS, cursive" }}>
          Enterprise-grade platform trusted by professionals worldwide!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {professionalAspects.map((aspect, index) => (
            <Card
              key={index}
              className="bg-white border-8 border-black p-8 shadow-2xl transform hover:scale-105 transition-all"
            >
              <div className="flex items-start gap-6">
                <div className="text-4xl">{aspect.icon}</div>
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-bold text-white-shadow mb-3" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                    {aspect.title}
                  </h3>
                  <p
                    className="text-white-shadow font-bold mb-4 leading-relaxed"
                    style={{ fontFamily: "Comic Sans MS, cursive" }}
                  >
                    {aspect.description}
                  </p>
                  <Badge className="bg-black text-yellow-400 border-2 border-white font-bold">
                    {aspect.certification ||
                      aspect.coverage ||
                      aspect.partners ||
                      aspect.accuracy ||
                      aspect.recognition ||
                      aspect.speed}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

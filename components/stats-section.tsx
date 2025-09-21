"use client"
import { Card } from "@/components/ui/card"

export function StatsSection() {
  const stats = [
    { number: "50,000+", label: "Active Users", icon: "👥" },
    { number: "2.5M+", label: "Career Simulations Run", icon: "🎯" },
    { number: "98%", label: "User Satisfaction", icon: "⭐" },
    { number: "150+", label: "Countries Served", icon: "🌍" },
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Software Engineer at Google",
      text: "Rancho's Platform helped me identify automation risks in my career 2 years before they became reality. Now I'm leading AI initiatives!",
      avatar: "PS",
    },
    {
      name: "Arjun Patel",
      role: "Product Manager at Microsoft",
      text: "The Career Chaos Simulator predicted the exact skills I'd need for my promotion. It's like having a crystal ball for your career!",
      avatar: "AP",
    },
    {
      name: "Sneha Gupta",
      role: "Data Scientist at Amazon",
      text: "From struggling with career direction to landing my dream job - this platform's AI mentors changed everything for me.",
      avatar: "SG",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Stats Section */}
      <div className="text-center mb-16">
        <h2
          className="text-4xl text-black mb-8 drop-shadow-2xl font-bold"
          style={{
            fontFamily: "Comic Sans MS, cursive",
            letterSpacing: "2px",
            textShadow: "3px 3px 0px #fff, -2px -2px 0px #fff, 2px -2px 0px #fff, -2px 2px 0px #fff, 0px 0px 10px #fff",
          }}
        >
          🚀 trusted by excellence seekers worldwide 🚀
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white border-8 border-black rounded-lg p-6 shadow-2xl transform hover:scale-105 transition-all"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-black mb-2" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                {stat.number}
              </div>
              <div className="text-lg font-bold text-black" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="text-center mb-16">
        <h2
          className="text-4xl text-black mb-12 drop-shadow-2xl font-bold"
          style={{
            fontFamily: "Comic Sans MS, cursive",
            letterSpacing: "2px",
            textShadow: "3px 3px 0px #fff, -2px -2px 0px #fff, 2px -2px 0px #fff, -2px 2px 0px #fff, 0px 0px 10px #fff",
          }}
        >
          💬 success stories from our community 💬
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white border-8 border-black p-6 shadow-2xl transform hover:scale-105 transition-all"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-400 border-4 border-black rounded-full flex items-center justify-center mr-4">
                  <span className="text-black font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                    {testimonial.avatar}
                  </span>
                </div>
                <div className="text-left">
                  <div className="font-bold text-black" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-black" style={{ fontFamily: "Comic Sans MS, cursive" }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
              <p
                className="text-black font-bold leading-relaxed"
                style={{
                  fontFamily: "Comic Sans MS, cursive",
                  lineHeight: "1.6",
                }}
              >
                "{testimonial.text}"
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-black border-8 border-white rounded-lg p-12 text-center">
        <h2
          className="text-4xl text-yellow-400 mb-8 drop-shadow-2xl font-bold"
          style={{
            fontFamily: "Comic Sans MS, cursive",
            letterSpacing: "2px",
            textShadow: "3px 3px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000, 0px 0px 10px #fff",
          }}
        >
          🌟 our impact on careers 🌟
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-6xl mb-4">📈</div>
            <div className="text-2xl font-bold text-yellow-400 mb-2" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              Average 40% Salary Increase
            </div>
            <div className="text-white font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              Users report significant career growth within 6 months
            </div>
          </div>

          <div className="text-center">
            <div className="text-6xl mb-4">🎯</div>
            <div className="text-2xl font-bold text-yellow-400 mb-2" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              85% Career Pivot Success
            </div>
            <div className="text-white font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              Successfully transition to future-proof roles
            </div>
          </div>

          <div className="text-center">
            <div className="text-6xl mb-4">🚀</div>
            <div className="text-2xl font-bold text-yellow-400 mb-2" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              3x Faster Skill Acquisition
            </div>
            <div className="text-white font-bold" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              AI-optimized learning paths accelerate growth
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

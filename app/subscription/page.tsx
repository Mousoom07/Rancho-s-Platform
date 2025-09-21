"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Check, Star, Zap, Shield, Crown, Sparkles, Loader2 } from "lucide-react"
import { ProfessorVirus } from "@/components/professor-virus"
import { Footer } from "@/components/footer"
import { BiLabel } from "@/components/ui/bilabel"

const plans = [
  {
    id: "chaos-starter",
    name: "Chaos Starter",
    price: { monthly: 9, yearly: 90 },
    description: "Perfect for career explorers dipping toes into controlled chaos",
    features: [
      "Access to 3 featured chaos tools",
      "Basic career risk analysis",
      "Monthly skill assessment",
      "Community forum access",
      "Email support",
      "Mobile app access"
    ],
    popular: false,
    icon: "🌱",
    color: "from-green-400 to-blue-500"
  },
  {
    id: "chaos-master",
    name: "Chaos Master",
    price: { monthly: 29, yearly: 290 },
    description: "For serious chaos engineers ready to master their career destiny",
    features: [
      "Access to ALL chaos tools",
      "Advanced AI-powered predictions",
      "Real-time market analysis",
      "Priority support (24/7)",
      "Personal chaos consultant",
      "API access",
      "Custom integrations",
      "Advanced analytics dashboard",
      "Early access to new features"
    ],
    popular: true,
    icon: "⚡",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "chaos-overlord",
    name: "Chaos Overlord",
    price: { monthly: 99, yearly: 990 },
    description: "For those who want to dominate the career chaos multiverse",
    features: [
      "EVERYTHING in Chaos Master",
      "1-on-1 executive chaos coaching",
      "White-glove onboarding",
      "Custom tool development",
      "Dedicated account manager",
      "SLA guarantee",
      "Enterprise security",
      "Custom reporting",
      "Team collaboration features",
      "Unlimited API calls",
      "Priority feature requests",
      "Exclusive chaos mastermind group"
    ],
    popular: false,
    icon: "👑",
    color: "from-yellow-400 to-orange-500"
  }
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    content: "The Career Chaos Simulator helped me anticipate a industry downturn and pivot my skills 6 months early. Saved my career!",
    avatar: "👩‍💻",
    plan: "Chaos Master"
  },
  {
    name: "Marcus Rodriguez",
    role: "Product Manager",
    content: "Skills Stock Market is genius! I've built a portfolio worth $50K in virtual value and identified 3 real skills to learn.",
    avatar: "👨‍💼",
    plan: "Chaos Starter"
  },
  {
    name: "Dr. Emily Watson",
    role: "Research Director",
    content: "As a Chaos Overlord, the personalized coaching has been transformative. My research team's adaptability has increased 300%.",
    avatar: "👩‍🔬",
    plan: "Chaos Overlord"
  }
]

const faqs = [
  {
    question: "What makes Rancho's Platform different from other career platforms?",
    answer: "We embrace controlled chaos as a learning tool. Instead of predictable career paths, we prepare you for black swan events, market disruptions, and rapid industry changes through gamified, AI-powered experiences."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes! You can cancel anytime, and you'll continue to have access until the end of your billing period. No hidden fees or long-term contracts."
  },
  {
    question: "Do you offer enterprise plans?",
    answer: "Absolutely! Our Chaos Overlord plan can be customized for teams and enterprises. Contact us for custom pricing and feature requirements."
  },
  {
    question: "How often do you add new chaos tools?",
    answer: "We release new tools monthly! Our AI analyzes market trends and user feedback to develop the most relevant career chaos simulation tools."
  },
  {
    question: "Is my data secure?",
    answer: "Yes! We use enterprise-grade encryption, comply with GDPR/CCPA, and never sell your data. Your career chaos journey remains completely private."
  }
]

export default function SubscriptionPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [floatingElements, setFloatingElements] = useState<Array<{
    left: number
    top: number
    animationDuration: number
    animationDelay: number
  }>>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Generate floating elements only on client side to prevent hydration mismatch
  useEffect(() => {
    const elements = Array.from({ length: 50 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: 3 + Math.random() * 4,
      animationDelay: Math.random() * 2
    }))
    setFloatingElements(elements)
  }, [])

  const handleSubscribe = async (planId: string) => {
    setSelectedPlan(planId)
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      // Here you would typically redirect to a payment processor or success page
      alert(`Successfully subscribed to ${plans.find(p => p.id === planId)?.name}!`)
    }, 2000)
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* 3D Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${element.left}%`,
              top: `${element.top}%`,
              animation: `float ${element.animationDuration}s ease-in-out infinite`,
              animationDelay: `${element.animationDelay}s`,
              transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-6">
              <Button
                onClick={() => window.history.back()}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400 text-xl px-8 py-3 font-black transition-all duration-300 transform hover:scale-105"
                style={{ fontFamily: "Rancho, cursive" }}
              >
                <ArrowLeft className="w-6 h-6 mr-3" />
                Back to Chaos
              </Button>
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center overflow-hidden animate-pulse">
                <img src="/idiots-logo.jpg" alt="Chaos Logo" className="w-16 h-16 object-cover rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-3xl text-yellow-400 font-black" style={{ fontFamily: "Rancho, cursive" }}>
                  Rancho's Platform
                </span>
                <span className="text-sm text-gray-400">Subscription Plans</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-lg px-6 py-2 mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Choose Your Chaos Level
              </Badge>
            </div>
            <h1 className="text-6xl font-bold text-white mb-6" style={{ fontFamily: "Rancho, cursive" }}>
              Embrace the Chaos
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Select your subscription tier and unlock powerful tools to navigate career uncertainty, 
              master market volatility, and thrive in professional chaos.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-lg font-medium ${!isYearly ? 'text-yellow-400' : 'text-gray-400'}`}>
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-yellow-400 data-[state=checked]:to-orange-500"
              />
              <span className={`text-lg font-medium ${isYearly ? 'text-yellow-400' : 'text-gray-400'}`}>
                Yearly
              </span>
              <Badge className="bg-green-500 text-white ml-2">
                Save 17%
              </Badge>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section id="pricing-plans" className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {plans.map((plan) => (
                <Card
                  key={plan.id}
                  className={`relative bg-black/50 backdrop-blur-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                    plan.popular 
                      ? 'border-yellow-400 shadow-2xl shadow-yellow-400/20' 
                      : 'border-white/10 hover:border-yellow-400/50'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2">
                        <Crown className="w-4 h-4 mr-2" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className="text-6xl mb-4">{plan.icon}</div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-gray-300 mb-4">
                      {plan.description}
                    </CardDescription>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-white">
                        ${isYearly ? plan.price.yearly : plan.price.monthly}
                      </span>
                      <span className="text-gray-400 ml-2">
                        /{isYearly ? 'year' : 'month'}
                      </span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <Button
                      onClick={() => handleSubscribe(plan.id)}
                      disabled={isProcessing && selectedPlan === plan.id}
                      className={`w-full py-3 text-lg font-black transition-all duration-300 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-400 hover:to-pink-400'
                      }`}
                      style={{ fontFamily: "Rancho, cursive" }}
                    >
                      {isProcessing && selectedPlan === plan.id ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Zap className="w-5 h-5 mr-2" />
                          Start Chaos
                        </>
                      )}
                    </Button>
                    
                    <div className="space-y-3 mt-6">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center" style={{ fontFamily: "Rancho, cursive" }}>
              Chaos Survivors Speak
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="bg-black/50 backdrop-blur-lg border border-white/10 p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                      <Badge className="bg-blue-600 text-white text-xs mt-1">
                        {testimonial.plan}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.content}"</p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center" style={{ fontFamily: "Rancho, cursive" }}>
              Frequently Asked Chaos Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card
                  key={index}
                  className="bg-black/50 backdrop-blur-lg border border-white/10 p-6"
                >
                  <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-black/50 backdrop-blur-lg border-2 border-yellow-400 rounded-2xl p-12">
              <h2 className="text-4xl font-bold text-white mb-6" style={{ fontFamily: "Rancho, cursive" }}>
                Ready to Master Your Career Chaos?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of professionals who are already navigating uncertainty with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => {
                    const element = document.getElementById('pricing-plans')
                    element?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400 text-xl px-8 py-4 font-black transition-all duration-300 transform hover:scale-105"
                  style={{ fontFamily: "Rancho, cursive" }}
                >
                  View Pricing Plans
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent text-white hover:bg-white/10 text-xl px-8 py-4 font-black border-2 border-white/20 transition-all duration-300 transform hover:scale-105"
                  style={{ fontFamily: "Rancho, cursive" }}
                >
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>

      <ProfessorVirus />
    </div>
  )
}

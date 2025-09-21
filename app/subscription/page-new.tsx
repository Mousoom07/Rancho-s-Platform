"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ToggleButton } from "@/components/ui/toggle-button"
import { Check, Star, Zap, Crown } from "lucide-react"
import { BiLabel } from "@/components/ui/bilabel"

const subscriptionPlans = [
  {
    id: "free",
    name: "Free Explorer",
    description: "Perfect for getting started with career chaos",
    price: { monthly: 0, yearly: 0 },
    icon: <Star className="w-6 h-6" />,
    features: [
      "Access to 3 basic career tools",
      "Community forum access",
      "Basic career assessments",
      "Monthly newsletter",
      "Email support"
    ],
    popular: false,
    buttonText: "Get Started Free",
    buttonVariant: "outline" as const
  },
  {
    id: "pro",
    name: "Chaos Pro",
    description: "Unlock advanced career disruption tools",
    price: { monthly: 29, yearly: 290 },
    icon: <Zap className="w-6 h-6" />,
    features: [
      "Access to all career tools",
      "Advanced AI career simulations",
      "Priority email support",
      "Monthly 1-on-1 coaching session",
      "Skill market predictions",
      "Career immunity scoring",
      "Custom career roadmaps",
      "Dark web skill insights"
    ],
    popular: true,
    buttonText: "Start Pro Journey",
    buttonVariant: "default" as const
  },
  {
    id: "enterprise",
    name: "Chaos Master",
    description: "Ultimate career antifragility toolkit",
    price: { monthly: 99, yearly: 990 },
    icon: <Crown className="w-6 h-6" />,
    features: [
      "Everything in Pro",
      "Unlimited coaching sessions",
      "Custom AI mentor personalities",
      "Team collaboration tools",
      "Advanced analytics dashboard",
      "API access for integrations",
      "White-label solutions",
      "Dedicated success manager",
      "Custom feature development",
      "24/7 priority support"
    ],
    popular: false,
    buttonText: "Become Chaos Master",
    buttonVariant: "default" as const
  }
]

export default function SubscriptionPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId)
    // Here you would typically redirect to payment or registration
    console.log(`Selected plan: ${planId}`)
  }

  return (
    <div
      className="min-h-screen relative bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500"
      style={{ fontFamily: "Rancho, cursive" }}
    >
      {/* Navigation */}
      <nav className="relative z-50 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center overflow-hidden">
                <img src="/idiots-logo.jpg" alt="Chaos Logo" className="w-16 h-16 object-cover rounded-full" />
              </div>
              <div className="flex flex-col">
                <span
                  className="text-3xl text-yellow-400 font-black"
                  style={{ fontFamily: "Rancho, cursive" }}
                >
                  Rancho's Platform
                </span>
                <span
                  className="text-lg text-orange-400 font-black"
                  style={{ fontFamily: "Rancho, cursive" }}
                >
                  Subscription Plans
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-black hover:bg-yellow-100 text-xl px-6 py-3 font-black"
                style={{ fontFamily: "Rancho, cursive" }}
                onClick={() => window.history.back()}
              >
                <BiLabel en="Back to Chaos" hi="वापस अराजकता में" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1
            className="text-6xl md:text-7xl text-white font-black mb-6 leading-tight"
            style={{ fontFamily: "Rancho, cursive" }}
          >
            Choose Your
            <br />
            <span className="text-yellow-400">Chaos Level</span>
          </h1>
          <p
            className="text-2xl md:text-3xl text-black font-black mb-8 leading-relaxed max-w-4xl mx-auto"
            style={{ fontFamily: "Rancho, cursive" }}
          >
            Navigate career disruption with tools designed to make you antifragile in any market condition
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <ToggleButton
              options={["Monthly", "Yearly"]}
              selected={isYearly ? "Yearly" : "Monthly"}
              onChange={(value) => setIsYearly(value === "Yearly")}
            />
            {isYearly && (
              <Badge className="bg-green-500 text-white text-lg px-4 py-2 font-black ml-4">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {subscriptionPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative bg-white border-4 ${
                plan.popular ? 'border-yellow-400 shadow-2xl' : 'border-gray-300'
              } hover:shadow-xl transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-yellow-400 text-black text-lg px-6 py-2 font-black">
                    Most Popular
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4 text-yellow-500">
                  {plan.icon}
                </div>
                <CardTitle
                  className="text-3xl text-black font-black mb-2"
                  style={{ fontFamily: "Rancho, cursive" }}
                >
                  {plan.name}
                </CardTitle>
                <CardDescription
                  className="text-lg text-gray-700 font-bold"
                  style={{ fontFamily: "Rancho, cursive" }}
                >
                  {plan.description}
                </CardDescription>
                <div className="mt-6">
                  <div className="flex items-baseline justify-center">
                    <span
                      className="text-5xl font-black text-black"
                      style={{ fontFamily: "Rancho, cursive" }}
                    >
                      ${plan.price[isYearly ? 'yearly' : 'monthly']}
                    </span>
                    <span
                      className="text-xl text-gray-600 font-bold ml-2"
                      style={{ fontFamily: "Rancho, cursive" }}
                    >
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  </div>
                  {isYearly && plan.price.monthly > 0 && (
                    <p
                      className="text-sm text-gray-500 mt-2"
                      style={{ fontFamily: "Rancho, cursive" }}
                    >
                      ${(plan.price.monthly * 12).toLocaleString()} billed yearly
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span
                        className="text-gray-800 font-bold"
                        style={{ fontFamily: "Rancho, cursive" }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
                <Button
                  className={`w-full text-xl py-6 font-black ${
                    plan.popular
                      ? 'bg-yellow-400 text-black hover:bg-yellow-300'
                      : 'bg-orange-500 text-white hover:bg-orange-400'
                  }`}
                  variant={plan.buttonVariant}
                  size="lg"
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-black rounded-3xl p-8 mb-16">
          <h2
            className="text-4xl text-center text-yellow-400 font-black mb-12"
            style={{ fontFamily: "Rancho, cursive" }}
          >
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3
                className="text-2xl text-orange-400 font-black mb-4"
                style={{ fontFamily: "Rancho, cursive" }}
              >
                Can I change plans anytime?
              </h3>
              <p
                className="text-white text-lg font-bold leading-relaxed"
                style={{ fontFamily: "Rancho, cursive" }}
              >
                Absolutely! Upgrade or downgrade your plan at any time. Changes take effect immediately.
              </p>
            </div>

            <div>
              <h3
                className="text-2xl text-orange-400 font-black mb-4"
                style={{ fontFamily: "Rancho, cursive" }}
              >
                Is there a free trial?
              </h3>
              <p
                className="text-white text-lg font-bold leading-relaxed"
                style={{ fontFamily: "Rancho, cursive" }}
              >
                Yes! Start with our Free Explorer plan and upgrade when you're ready to unlock more chaos.
              </p>
            </div>

            <div>
              <h3
                className="text-2xl text-orange-400 font-black mb-4"
                style={{ fontFamily: "Rancho, cursive" }}
              >
                What payment methods do you accept?
              </h3>
              <p
                className="text-white text-lg font-bold leading-relaxed"
                style={{ fontFamily: "Rancho, cursive" }}
              >
                We accept all major credit cards, PayPal, and bank transfers for yearly subscriptions.
              </p>
            </div>

            <div>
              <h3
                className="text-2xl text-orange-400 font-black mb-4"
                style={{ fontFamily: "Rancho, cursive" }}
              >
                Do you offer refunds?
              </h3>
              <p
                className="text-white text-lg font-bold leading-relaxed"
                style={{ fontFamily: "Rancho, cursive" }}
              >
                Yes, we offer a 30-day money-back guarantee on all paid plans. No questions asked!
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-12">
          <h2
            className="text-5xl text-black font-black mb-6"
            style={{ fontFamily: "Rancho, cursive" }}
          >
            Ready to Master Career Chaos?
          </h2>
          <p
            className="text-2xl text-black font-black mb-8 max-w-3xl mx-auto leading-relaxed"
            style={{ fontFamily: "Rancho, cursive" }}
          >
            Join thousands of professionals who are building antifragile careers with Rancho's Platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-black text-white hover:bg-gray-800 text-xl px-8 py-4 font-black"
              style={{ fontFamily: "Rancho, cursive" }}
              onClick={() => handlePlanSelect('pro')}
            >
              Start Your Journey Today
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-4 border-black text-black hover:bg-black hover:text-white text-xl px-8 py-4 font-black"
              style={{ fontFamily: "Rancho, cursive" }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Compare Plans Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

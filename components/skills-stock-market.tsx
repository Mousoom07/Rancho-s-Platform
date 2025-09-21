"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Zap, Brain, Shield } from "lucide-react"

interface Skill {
  id: string
  name: string
  symbol: string
  price: number
  change: number
  trend: "up" | "down" | "stable"
  category: string
  description: string
  icon: React.ReactNode
}

interface Portfolio {
  cash: number
  holdings: { [skillId: string]: number }
  totalValue: number
}

const initialSkills: Skill[] = [
  {
    id: "ai-prompt",
    name: "AI Prompt Engineering",
    symbol: "AIPR",
    price: 127.5,
    change: 15.2,
    trend: "up",
    category: "AI",
    description: "Master the art of communicating with AI systems",
    icon: <Brain className="w-4 h-4" />,
  },
  {
    id: "quantum-comp",
    name: "Quantum Computing",
    symbol: "QCOM",
    price: 89.25,
    change: 8.7,
    trend: "up",
    category: "Tech",
    description: "Next-gen computing paradigm",
    icon: <Zap className="w-4 h-4" />,
  },
  {
    id: "cyber-sec",
    name: "Cybersecurity",
    symbol: "CSEC",
    price: 156.8,
    change: -2.1,
    trend: "down",
    category: "Security",
    description: "Protect digital assets and privacy",
    icon: <Shield className="w-4 h-4" />,
  },
  {
    id: "blockchain",
    name: "Blockchain Development",
    symbol: "BLOC",
    price: 98.4,
    change: 12.3,
    trend: "up",
    category: "Web3",
    description: "Decentralized systems and smart contracts",
    icon: <DollarSign className="w-4 h-4" />,
  },
  {
    id: "data-sci",
    name: "Data Science",
    symbol: "DATA",
    price: 134.6,
    change: -0.8,
    trend: "stable",
    category: "Analytics",
    description: "Extract insights from complex datasets",
    icon: <TrendingUp className="w-4 h-4" />,
  },
  {
    id: "ux-design",
    name: "UX Design",
    symbol: "UXDS",
    price: 76.9,
    change: 5.4,
    trend: "up",
    category: "Design",
    description: "Create intuitive user experiences",
    icon: <Brain className="w-4 h-4" />,
  },
]

export function SkillsStockMarket() {
  const [skills, setSkills] = useState<Skill[]>(initialSkills)
  const [portfolio, setPortfolio] = useState<Portfolio>({
    cash: 1000,
    holdings: {},
    totalValue: 1000,
  })
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [tradeAmount, setTradeAmount] = useState(1)

  // Simulate real-time price changes
  useEffect(() => {
    const interval = setInterval(() => {
      setSkills((prevSkills) =>
        prevSkills.map((skill) => {
          const volatility = Math.random() * 0.1 - 0.05 // -5% to +5%
          const newPrice = Math.max(1, skill.price * (1 + volatility))
          const change = ((newPrice - skill.price) / skill.price) * 100

          return {
            ...skill,
            price: Math.round(newPrice * 100) / 100,
            change: Math.round(change * 100) / 100,
            trend: change > 1 ? "up" : change < -1 ? "down" : "stable",
          }
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Update portfolio total value
  useEffect(() => {
    const holdingsValue = Object.entries(portfolio.holdings).reduce((total, [skillId, shares]) => {
      const skill = skills.find((s) => s.id === skillId)
      return total + (skill ? skill.price * shares : 0)
    }, 0)

    setPortfolio((prev) => ({
      ...prev,
      totalValue: prev.cash + holdingsValue,
    }))
  }, [skills, portfolio.holdings, portfolio.cash])

  const buySkill = (skill: Skill, shares: number) => {
    const cost = skill.price * shares
    if (cost <= portfolio.cash) {
      setPortfolio((prev) => ({
        ...prev,
        cash: prev.cash - cost,
        holdings: {
          ...prev.holdings,
          [skill.id]: (prev.holdings[skill.id] || 0) + shares,
        },
      }))
    }
  }

  const sellSkill = (skill: Skill, shares: number) => {
    const currentHoldings = portfolio.holdings[skill.id] || 0
    if (shares <= currentHoldings) {
      const revenue = skill.price * shares
      setPortfolio((prev) => ({
        ...prev,
        cash: prev.cash + revenue,
        holdings: {
          ...prev.holdings,
          [skill.id]: currentHoldings - shares,
        },
      }))
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-400" />
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-400" />
      default:
        return <div className="w-4 h-4 rounded-full bg-yellow-400" />
    }
  }

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-300 font-bold drop-shadow-lg"
    if (change < 0) return "text-red-300 font-bold drop-shadow-lg"
    return "text-yellow-300 font-bold drop-shadow-lg"
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Portfolio Overview */}
      <Card className="bg-dark-card border-visible">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white-shadow">Skills Trading Portfolio</CardTitle>
          <CardDescription className="text-secondary-high-contrast">
            Invest ₹1000 in trending skills and track market demand
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-purple-300 mb-1">Total Portfolio Value</p>
              <p className="text-3xl font-bold text-green-400">₹{portfolio.totalValue.toFixed(2)}</p>
              <p className={`text-sm ${getTrendColor(portfolio.totalValue - 1000)}`}>
                {portfolio.totalValue > 1000 ? "+" : ""}
                {(((portfolio.totalValue - 1000) / 1000) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-purple-300 mb-1">Available Cash</p>
              <p className="text-2xl font-bold text-blue-400">₹{portfolio.cash.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-purple-300 mb-1">Holdings Value</p>
              <p className="text-2xl font-bold text-purple-400">
                ₹{(portfolio.totalValue - portfolio.cash).toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Market */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Listings */}
        <Card className="bg-dark-card border-visible">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white-shadow">
              <TrendingUp className="w-5 h-5 text-green-shadow" />
              Skills Market
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedSkill?.id === skill.id
                    ? "border-purple-400 bg-purple-900/20"
                    : "border-slate-600 hover:border-purple-500/50"
                }`}
                onClick={() => setSelectedSkill(skill)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {skill.icon}
                    <div>
                      <p className="font-semibold text-white">{skill.name}</p>
                      <p className="text-xs text-purple-300">{skill.symbol}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs border-purple-400/50 text-purple-200">
                    {skill.category}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-white drop-shadow-lg">₹{skill.price}</span>
                    {getTrendIcon(skill.trend)}
                    <span
                      className={`text-sm ${getTrendColor(skill.change)}`}
                      style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                    >
                      {skill.change > 0 ? "+" : ""}
                      {skill.change.toFixed(1)}%
                    </span>
                  </div>

                  {portfolio.holdings[skill.id] && (
                    <div className="text-right">
                      <p className="text-xs text-purple-200">Owned</p>
                      <p className="text-sm font-semibold text-green-300 drop-shadow-lg">
                        {portfolio.holdings[skill.id]} shares
                      </p>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-400 mt-2">{skill.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Trading Panel */}
        <Card className="bg-dark-card border-visible">
          <CardHeader>
            <CardTitle className="text-white-shadow">{selectedSkill ? `Trade ${selectedSkill.name}` : "Select a Skill to Trade"}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedSkill ? (
              <div className="space-y-6">
                <div className="text-center p-4 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {selectedSkill.icon}
                    <h3 className="text-xl font-bold text-white">{selectedSkill.name}</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-400 mb-1">₹{selectedSkill.price}</p>
                  <p className={`text-sm ${getTrendColor(selectedSkill.change)}`}>
                    {selectedSkill.change > 0 ? "+" : ""}
                    {selectedSkill.change.toFixed(1)}% today
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-purple-300 mb-2">Number of Shares</label>
                    <input
                      type="number"
                      min="1"
                      value={tradeAmount}
                      onChange={(e) => setTradeAmount(Math.max(1, Number.parseInt(e.target.value) || 1))}
                      className="w-full p-2 input-high-contrast rounded font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      onClick={() => buySkill(selectedSkill, tradeAmount)}
                      disabled={selectedSkill.price * tradeAmount > portfolio.cash}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Buy ₹{(selectedSkill.price * tradeAmount).toFixed(2)}
                    </Button>
                    <Button
                      onClick={() => sellSkill(selectedSkill, tradeAmount)}
                      disabled={
                        !portfolio.holdings[selectedSkill.id] || tradeAmount > portfolio.holdings[selectedSkill.id]
                      }
                      variant="outline"
                      className="border-red-500 text-red-400 hover:bg-red-900/20"
                    >
                      Sell ₹{(selectedSkill.price * tradeAmount).toFixed(2)}
                    </Button>
                  </div>

                  {portfolio.holdings[selectedSkill.id] && (
                    <div className="p-3 bg-purple-900/20 rounded-lg">
                      <p className="text-sm text-purple-300">Current Holdings</p>
                      <p className="text-lg font-semibold text-white">{portfolio.holdings[selectedSkill.id]} shares</p>
                      <p className="text-sm text-green-400">
                        Value: ₹{(selectedSkill.price * portfolio.holdings[selectedSkill.id]).toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <p className="text-purple-300">Select a skill from the market to start trading</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

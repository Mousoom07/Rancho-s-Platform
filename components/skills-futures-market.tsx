"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Zap,
  Brain,
  Shield,
  BarChart3,
  LineChart,
  Activity,
  Target,
  AlertTriangle,
  Coins,
} from "lucide-react"

interface Skill {
  id: string
  name: string
  symbol: string
  price: number
  change: number
  volume: number
  marketCap: number
  trend: "bullish" | "bearish" | "neutral"
  volatility: number
  category: string
  description: string
  icon: React.ReactNode
  shortable: boolean
}

interface Position {
  skillId: string
  type: "long" | "short"
  shares: number
  entryPrice: number
  currentValue: number
  pnl: number
  pnlPercent: number
}

interface Portfolio {
  virtualCurrency: number
  totalValue: number
  positions: Position[]
  dayChange: number
  totalPnL: number
}

const initialSkills: Skill[] = [
  {
    id: "web3-dev",
    name: "Web3 Development",
    symbol: "WEB3",
    price: 245.8,
    change: -12.4,
    volume: 1250000,
    marketCap: 2.4e9,
    trend: "bearish",
    volatility: 0.15,
    category: "Blockchain",
    description: "Decentralized applications and smart contracts",
    icon: <Coins className="w-4 h-4" />,
    shortable: true,
  },
  {
    id: "ai-engineering",
    name: "AI Engineering",
    symbol: "AIEN",
    price: 387.25,
    change: 23.7,
    volume: 2100000,
    marketCap: 4.2e9,
    trend: "bullish",
    volatility: 0.12,
    category: "Artificial Intelligence",
    description: "Building and deploying AI systems at scale",
    icon: <Brain className="w-4 h-4" />,
    shortable: false,
  },
  {
    id: "quantum-comp",
    name: "Quantum Computing",
    symbol: "QCOM",
    price: 156.9,
    change: 8.3,
    volume: 890000,
    marketCap: 1.8e9,
    trend: "bullish",
    volatility: 0.18,
    category: "Quantum Tech",
    description: "Next-generation quantum algorithms",
    icon: <Zap className="w-4 h-4" />,
    shortable: true,
  },
  {
    id: "cyber-defense",
    name: "Cybersecurity Defense",
    symbol: "CYDF",
    price: 298.45,
    change: -3.2,
    volume: 1450000,
    marketCap: 3.1e9,
    trend: "neutral",
    volatility: 0.08,
    category: "Security",
    description: "Advanced threat detection and response",
    icon: <Shield className="w-4 h-4" />,
    shortable: true,
  },
  {
    id: "biotech-eng",
    name: "Biotech Engineering",
    symbol: "BIOT",
    price: 189.6,
    change: 15.8,
    volume: 670000,
    marketCap: 1.9e9,
    trend: "bullish",
    volatility: 0.14,
    category: "Biotechnology",
    description: "Genetic engineering and synthetic biology",
    icon: <Activity className="w-4 h-4" />,
    shortable: true,
  },
  {
    id: "space-tech",
    name: "Space Technology",
    symbol: "SPCE",
    price: 134.2,
    change: 6.7,
    volume: 520000,
    marketCap: 1.3e9,
    trend: "bullish",
    volatility: 0.16,
    category: "Aerospace",
    description: "Satellite systems and space exploration tech",
    icon: <Target className="w-4 h-4" />,
    shortable: true,
  },
]

export function SkillsFuturesMarket() {
  const [skills, setSkills] = useState<Skill[]>(initialSkills)
  const [portfolio, setPortfolio] = useState<Portfolio>({
    virtualCurrency: 50000, // Start with 50,000 virtual currency
    totalValue: 50000,
    positions: [],
    dayChange: 0,
    totalPnL: 0,
  })
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [tradeAmount, setTradeAmount] = useState(10)
  const [tradeType, setTradeType] = useState<"long" | "short">("long")
  const [activeTab, setActiveTab] = useState("market")

  // Simulate real-time market data
  useEffect(() => {
    const interval = setInterval(() => {
      setSkills((prevSkills) =>
        prevSkills.map((skill) => {
          const volatility = skill.volatility * (Math.random() * 2 - 1) // -volatility to +volatility
          const newPrice = Math.max(1, skill.price * (1 + volatility))
          const change = ((newPrice - skill.price) / skill.price) * 100
          const volumeChange = Math.random() * 0.3 - 0.15 // ±15% volume change
          const newVolume = Math.max(100000, skill.volume * (1 + volumeChange))

          let trend: "bullish" | "bearish" | "neutral" = "neutral"
          if (change > 2) trend = "bullish"
          else if (change < -2) trend = "bearish"

          return {
            ...skill,
            price: Math.round(newPrice * 100) / 100,
            change: Math.round(change * 100) / 100,
            volume: Math.round(newVolume),
            marketCap: Math.round(newPrice * newVolume * 0.001),
            trend,
          }
        }),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Update portfolio values
  useEffect(() => {
    const updatedPositions = portfolio.positions.map((position) => {
      const skill = skills.find((s) => s.id === position.skillId)
      if (!skill) return position

      const currentValue = position.shares * skill.price
      let pnl: number

      if (position.type === "long") {
        pnl = (skill.price - position.entryPrice) * position.shares
      } else {
        pnl = (position.entryPrice - skill.price) * position.shares
      }

      const pnlPercent = (pnl / (position.entryPrice * position.shares)) * 100

      return {
        ...position,
        currentValue,
        pnl,
        pnlPercent,
      }
    })

    const totalPositionValue = updatedPositions.reduce((sum, pos) => sum + pos.currentValue, 0)
    const totalPnL = updatedPositions.reduce((sum, pos) => sum + pos.pnl, 0)

    setPortfolio((prev) => ({
      ...prev,
      positions: updatedPositions,
      totalValue: prev.virtualCurrency + totalPositionValue,
      totalPnL,
      dayChange: (totalPnL / 50000) * 100,
    }))
  }, [skills, portfolio.virtualCurrency])

  const openPosition = (skill: Skill, type: "long" | "short", shares: number) => {
    const cost = skill.price * shares
    if (cost <= portfolio.virtualCurrency) {
      const newPosition: Position = {
        skillId: skill.id,
        type,
        shares,
        entryPrice: skill.price,
        currentValue: cost,
        pnl: 0,
        pnlPercent: 0,
      }

      setPortfolio((prev) => ({
        ...prev,
        virtualCurrency: prev.virtualCurrency - cost,
        positions: [...prev.positions, newPosition],
      }))
    }
  }

  const closePosition = (positionIndex: number) => {
    const position = portfolio.positions[positionIndex]
    const skill = skills.find((s) => s.id === position.skillId)
    if (!skill) return

    const returnValue = position.currentValue + position.pnl

    setPortfolio((prev) => ({
      ...prev,
      virtualCurrency: prev.virtualCurrency + returnValue,
      positions: prev.positions.filter((_, i) => i !== positionIndex),
    }))
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`
    return num.toString()
  }

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-200 font-bold"
    if (change < 0) return "text-red-200 font-bold"
    return "text-yellow-200 font-bold"
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "bullish":
        return <TrendingUp className="w-4 h-4 text-green-400" />
      case "bearish":
        return <TrendingDown className="w-4 h-4 text-red-400" />
      default:
        return <BarChart3 className="w-4 h-4 text-yellow-400" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 bg-slate-950 text-white p-6 rounded-lg border-2 border-white/30 break-words overflow-wrap-anywhere">
      {/* Header */}
      <div className="border-b-2 border-amber-500/30 pb-4">
        <h1
          className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent"
          style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
        >
          Skills Futures Market
        </h1>
        <p className="text-white mt-2 font-semibold" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
          Advanced trading platform with virtual currency and shorting capabilities
        </p>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-2 border-amber-500/50 shadow-xl">
          <CardContent className="p-4 break-words">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white font-bold" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                  Total Portfolio
                </p>
                <p className="text-2xl font-bold text-white" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
                  {formatCurrency(portfolio.totalValue)}
                </p>
              </div>
              <DollarSign
                className="w-8 h-8 text-amber-400"
                style={{ filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.8))" }}
              />
            </div>
            <p
              className={`text-sm mt-1 font-bold ${getTrendColor(portfolio.dayChange)}`}
              style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
            >
              {portfolio.dayChange > 0 ? "+" : ""}
              {portfolio.dayChange.toFixed(2)}% today
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-2 border-amber-500/50 shadow-xl">
          <CardContent className="p-4 break-words">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white font-bold" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                  Available Cash
                </p>
                <p className="text-xl font-bold text-green-200" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
                  {formatCurrency(portfolio.virtualCurrency)}
                </p>
              </div>
              <Coins
                className="w-8 h-8 text-green-400"
                style={{ filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.8))" }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-2 border-amber-500/50 shadow-xl">
          <CardContent className="p-4 break-words">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white font-bold" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                  Total P&L
                </p>
                <p
                  className={`text-xl font-bold ${getTrendColor(portfolio.totalPnL)}`}
                  style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                >
                  {formatCurrency(portfolio.totalPnL)}
                </p>
              </div>
              <LineChart
                className="w-8 h-8 text-blue-400"
                style={{ filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.8))" }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-2 border-amber-500/50 shadow-xl">
          <CardContent className="p-4 break-words">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white font-bold" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                  Open Positions
                </p>
                <p className="text-xl font-bold text-purple-200" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
                  {portfolio.positions.length}
                </p>
              </div>
              <Activity
                className="w-8 h-8 text-purple-400"
                style={{ filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.8))" }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Trading Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-slate-800 border-2 border-amber-500/50">
          <TabsTrigger value="market" className="data-[state=active]:bg-amber-600 text-white font-bold">
            Market
          </TabsTrigger>
          <TabsTrigger value="positions" className="data-[state=active]:bg-amber-600 text-white font-bold">
            Positions
          </TabsTrigger>
          <TabsTrigger value="trade" className="data-[state=active]:bg-amber-600 text-white font-bold">
            Trade
          </TabsTrigger>
        </TabsList>

        <TabsContent value="market" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {skills.map((skill) => (
              <Card
                key={skill.id}
                className={`bg-slate-900 border-2 border-slate-600 hover:border-amber-500/70 cursor-pointer transition-all shadow-xl break-words ${
                  selectedSkill?.id === skill.id ? "border-amber-400 bg-amber-900/20" : ""
                }`}
                onClick={() => setSelectedSkill(skill)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {skill.icon}
                      <div>
                        <h3 className="font-bold text-white" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                          {skill.symbol}
                        </h3>
                        <p
                          className="text-sm text-gray-200 font-semibold"
                          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                        >
                          {skill.name}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs border-2 border-white/70 text-white font-bold bg-slate-800/50"
                    >
                      {skill.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 break-words">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-2xl font-bold text-white"
                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                      >
                        ${skill.price}
                      </span>
                      <div className="flex items-center gap-1">
                        {getTrendIcon(skill.trend)}
                        <span
                          className={`text-sm font-bold ${getTrendColor(skill.change)}`}
                          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                        >
                          {skill.change > 0 ? "+" : ""}
                          {skill.change.toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-200 font-semibold">
                      <div>
                        <p style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                          Volume: {formatNumber(skill.volume)}
                        </p>
                        <p style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                          Market Cap: {formatCurrency(skill.marketCap)}
                        </p>
                      </div>
                      <div>
                        <p style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                          Volatility: {(skill.volatility * 100).toFixed(1)}%
                        </p>
                        <p className="flex items-center gap-1" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                          Shortable: {skill.shortable ? "✓" : "✗"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="positions" className="space-y-4">
          {portfolio.positions.length === 0 ? (
            <Card className="bg-slate-900 border-2 border-slate-600 shadow-xl">
              <CardContent className="p-8 text-center">
                <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-white text-lg">No open positions</p>
                <p className="text-sm text-gray-300 mt-2">Open your first position to start trading</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {portfolio.positions.map((position, index) => {
                const skill = skills.find((s) => s.id === position.skillId)
                if (!skill) return null

                return (
                  <Card key={index} className="bg-slate-900 border-2 border-slate-600 shadow-xl">
                    <CardContent className="p-4 break-words">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {skill.icon}
                          <div>
                            <h3
                              className="font-semibold text-white"
                              style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                            >
                              {skill.symbol}
                            </h3>
                            <p
                              className="text-sm text-gray-200 font-semibold"
                              style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                            >
                              {position.type.toUpperCase()} • {position.shares} shares @ ${position.entryPrice}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p
                            className={`text-lg font-bold drop-shadow ${getTrendColor(position.pnl)}`}
                            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                          >
                            {formatCurrency(position.pnl)}
                          </p>
                          <p
                            className={`text-sm font-semibold ${getTrendColor(position.pnlPercent)}`}
                            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                          >
                            {position.pnlPercent > 0 ? "+" : ""}
                            {position.pnlPercent.toFixed(1)}%
                          </p>
                        </div>

                        <Button
                          onClick={() => closePosition(index)}
                          variant="outline"
                          size="sm"
                          className="border-red-500 text-red-300 hover:bg-red-900/30 bg-red-900/10"
                        >
                          Close
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="trade" className="space-y-4">
          {selectedSkill ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-2 border-amber-500/50 shadow-xl">
                <CardHeader>
                  <CardTitle
                    className="flex items-center gap-2 text-white drop-shadow"
                    style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                  >
                    {selectedSkill.icon}
                    {selectedSkill.name}
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Current Price:{" "}
                    <span
                      className="text-white font-bold drop-shadow"
                      style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                    >
                      ${selectedSkill.price}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={tradeType === "long" ? "default" : "outline"}
                      onClick={() => setTradeType("long")}
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold"
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Long (Buy)
                    </Button>
                    <Button
                      variant={tradeType === "short" ? "default" : "outline"}
                      onClick={() => setTradeType("short")}
                      disabled={!selectedSkill.shortable}
                      className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold"
                    >
                      <TrendingDown className="w-4 h-4 mr-2" />
                      Short (Sell)
                    </Button>
                  </div>

                  <div>
                    <label className="block text-sm text-white font-medium mb-2">Number of Shares</label>
                    <input
                      type="number"
                      min="1"
                      value={tradeAmount}
                      onChange={(e) => setTradeAmount(Math.max(1, Number.parseInt(e.target.value) || 1))}
                      className="w-full p-3 bg-slate-800 border border-slate-500 rounded text-white font-medium"
                    />
                  </div>

                  <div className="p-4 bg-slate-800 border border-slate-600 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white font-medium" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                        Total Cost:
                      </span>
                      <span
                        className="text-white font-bold drop-shadow"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                      >
                        {formatCurrency(selectedSkill.price * tradeAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white font-medium" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                        Available Cash:
                      </span>
                      <span className="text-green-200 font-bold" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                        {formatCurrency(portfolio.virtualCurrency)}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => openPosition(selectedSkill, tradeType, tradeAmount)}
                    disabled={selectedSkill.price * tradeAmount > portfolio.virtualCurrency}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold"
                  >
                    Open {tradeType.toUpperCase()} Position
                  </Button>

                  {!selectedSkill.shortable && tradeType === "short" && (
                    <div className="flex items-center gap-2 p-3 bg-yellow-900/30 border border-yellow-500/50 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-yellow-300" />
                      <p
                        className="text-sm text-yellow-200 font-medium"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                      >
                        This skill is not available for shorting
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-2 border-slate-600 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-white drop-shadow" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                    Market Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-white font-medium" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                        24h Change
                      </p>
                      <p
                        className={`font-bold drop-shadow ${getTrendColor(selectedSkill.change)}`}
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                      >
                        {selectedSkill.change > 0 ? "+" : ""}
                        {selectedSkill.change.toFixed(2)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-white font-medium" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                        Volume
                      </p>
                      <p
                        className="font-bold text-white drop-shadow"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                      >
                        {formatNumber(selectedSkill.volume)}
                      </p>
                    </div>
                    <div>
                      <p className="text-white font-medium" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                        Market Cap
                      </p>
                      <p
                        className="font-bold text-white drop-shadow"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                      >
                        {formatCurrency(selectedSkill.marketCap)}
                      </p>
                    </div>
                    <div>
                      <p className="text-white font-medium" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                        Volatility
                      </p>
                      <p
                        className="font-bold text-white drop-shadow"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                      >
                        {(selectedSkill.volatility * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-800 border border-slate-600 rounded-lg">
                    <p
                      className="text-sm text-white font-medium mb-2"
                      style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                    >
                      Market Sentiment
                    </p>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(selectedSkill.trend)}
                      <span
                        className="capitalize text-white font-semibold drop-shadow"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                      >
                        {selectedSkill.trend}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-900/30 border border-blue-500/50 rounded-lg">
                    <p
                      className="text-sm text-blue-100 font-medium"
                      style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                    >
                      {selectedSkill.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="bg-slate-900 border-2 border-slate-600 shadow-xl">
              <CardContent className="p-8 text-center">
                <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-white text-lg">Select a skill from the Market tab to start trading</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

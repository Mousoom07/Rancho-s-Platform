"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Eye, Shield, Zap, Brain, Lock, Cpu } from "lucide-react"

interface UndergroundSkill {
  id: string
  name: string
  source: string
  rarity: "Legendary" | "Epic" | "Rare" | "Uncommon"
  demandScore: number
  earningPotential: string
  description: string
  requirements: string[]
  icon: React.ReactNode
  category: string
}

const undergroundSkills: UndergroundSkill[] = [
  {
    id: "1",
    name: "Zero-Day Vulnerability Research",
    source: "DefCon Underground Forums",
    rarity: "Legendary",
    demandScore: 98,
    earningPotential: "₹40L - ₹1.6Cr/year",
    description: "Discover and responsibly disclose security vulnerabilities before they're exploited",
    requirements: ["Assembly Language", "Reverse Engineering", "Network Protocols"],
    icon: <Shield className="w-5 h-5" />,
    category: "Cybersecurity",
  },
  {
    id: "2",
    name: "Quantum Algorithm Design",
    source: "IBM Research Patents",
    rarity: "Legendary",
    demandScore: 95,
    earningPotential: "₹32L - ₹1.2Cr/year",
    description: "Create algorithms that leverage quantum computing principles for exponential speedups",
    requirements: ["Quantum Mechanics", "Linear Algebra", "Python/Qiskit"],
    icon: <Cpu className="w-5 h-5" />,
    category: "Quantum Computing",
  },
  {
    id: "3",
    name: "Neural Interface Programming",
    source: "Neuralink Developer Leaks",
    rarity: "Epic",
    demandScore: 92,
    earningPotential: "₹28L - ₹64L/year",
    description: "Program direct brain-computer interfaces for thought-controlled devices",
    requirements: ["Neuroscience", "Signal Processing", "Real-time Systems"],
    icon: <Brain className="w-5 h-5" />,
    category: "BCI Technology",
  },
  {
    id: "4",
    name: "Homomorphic Encryption Implementation",
    source: "Microsoft Research Papers",
    rarity: "Epic",
    demandScore: 89,
    earningPotential: "₹24L - ₹56L/year",
    description: "Enable computations on encrypted data without decrypting it first",
    requirements: ["Cryptography", "Number Theory", "C++/Rust"],
    icon: <Lock className="w-5 h-5" />,
    category: "Privacy Tech",
  },
  {
    id: "5",
    name: "Adversarial AI Defense",
    source: "Black Hat Security Talks",
    rarity: "Rare",
    demandScore: 86,
    earningPotential: "₹20L - ₹48L/year",
    description: "Protect AI systems from malicious attacks and data poisoning",
    requirements: ["Machine Learning", "Adversarial Networks", "Security Auditing"],
    icon: <Eye className="w-5 h-5" />,
    category: "AI Security",
  },
  {
    id: "6",
    name: "Plasma Physics Simulation",
    source: "CERN Internal Documents",
    rarity: "Rare",
    demandScore: 83,
    earningPotential: "₹16L - ₹40L/year",
    description: "Model fusion reactor behavior for next-generation clean energy",
    requirements: ["Physics PhD", "CUDA Programming", "Numerical Methods"],
    icon: <Zap className="w-5 h-5" />,
    category: "Energy Tech",
  },
]

const rarityColors = {
  Legendary: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold shadow-lg",
  Epic: "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg",
  Rare: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold shadow-lg",
  Uncommon: "bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold shadow-lg",
}

const sourceIcons = {
  "DefCon Underground Forums": "🕳️",
  "IBM Research Patents": "📋",
  "Neuralink Developer Leaks": "🧠",
  "Microsoft Research Papers": "📄",
  "Black Hat Security Talks": "🎭",
  "CERN Internal Documents": "⚛️",
}

export function DarkWebSkillScout() {
  const [selectedSkill, setSelectedSkill] = useState<UndergroundSkill | null>(null)
  const [scanProgress, setScanProgress] = useState(0)
  const [isScanning, setIsScanning] = useState(false)

  const startScan = () => {
    setIsScanning(true)
    setScanProgress(0)
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
  }

  useEffect(() => {
    // Auto-start scan on component mount
    startScan()
  }, [])

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card className="bg-gradient-to-r from-slate-900 to-slate-800 border-red-500/30">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-red-400 mb-2">🕳️ Dark Web Skill Scout</CardTitle>
          <CardDescription className="text-lg text-slate-300">
            Exclusive intelligence on underground high-value skills from restricted sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Deep Web Scan Progress</span>
              <span className="text-sm text-red-400">{Math.round(scanProgress)}%</span>
            </div>
            <Progress value={scanProgress} className="h-2 bg-slate-700" />
            {isScanning && (
              <p className="text-xs text-slate-500 mt-2 animate-pulse">
                Scanning encrypted forums, patent databases, and research leaks...
              </p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {undergroundSkills.map((skill) => (
              <Card
                key={skill.id}
                className="bg-slate-800/50 border-slate-700 hover:border-red-500/50 transition-all cursor-pointer group"
                onClick={() => setSelectedSkill(skill)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {skill.icon}
                      <Badge className={`${rarityColors[skill.rarity]} text-xs font-bold`}>{skill.rarity}</Badge>
                    </div>
                    <span className="text-lg">{sourceIcons[skill.source as keyof typeof sourceIcons]}</span>
                  </div>
                  <CardTitle className="text-lg text-red-300 group-hover:text-red-200">{skill.name}</CardTitle>
                  <CardDescription className="text-slate-400 text-sm">{skill.category}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Demand Score</span>
                      <span className="text-red-400 font-bold">{skill.demandScore}/100</span>
                    </div>
                    <Progress value={skill.demandScore} className="h-1 bg-slate-700" />
                    <div className="text-sm">
                      <span className="text-slate-400">Earning Potential: </span>
                      <span className="text-green-400 font-semibold">{skill.earningPotential}</span>
                    </div>
                    <div className="text-xs text-slate-500">Source: {skill.source}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedSkill && (
            <Card className="mt-6 bg-gradient-to-r from-red-950/50 to-slate-900/50 border-red-500/30">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  {selectedSkill.icon}
                  <CardTitle className="text-2xl text-red-300">{selectedSkill.name}</CardTitle>
                  <Badge className={`${rarityColors[selectedSkill.rarity]} font-bold`}>{selectedSkill.rarity}</Badge>
                </div>
                <CardDescription className="text-slate-300 text-base">{selectedSkill.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-red-400 mb-3">Intelligence Report</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Source:</span>
                        <span className="text-slate-200">{selectedSkill.source}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Demand Score:</span>
                        <span className="text-red-400 font-bold">{selectedSkill.demandScore}/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Earning Potential:</span>
                        <span className="text-green-400 font-semibold">{selectedSkill.earningPotential}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Rarity Level:</span>
                        <span className="text-yellow-400">{selectedSkill.rarity}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-red-400 mb-3">Prerequisites</h4>
                    <div className="space-y-2">
                      {selectedSkill.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="mr-2 mb-2 border-slate-600 text-slate-300">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-700">
                  <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => setSelectedSkill(null)}>
                    Close Intel Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-red-500/20">
            <p className="text-xs text-slate-400 text-center">
              ⚠️ All data is sanitized and anonymized. Sources are fictional representations for demonstration purposes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

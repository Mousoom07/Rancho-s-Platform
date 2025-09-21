"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Shuffle, Download, Share2, Sparkles } from "lucide-react"

interface MemeData {
  template: string
  topText: string
  bottomText: string
  category: string
  shareability: number
}

export function CareerMemeRoadmap() {
  const [currentRole, setCurrentRole] = useState("")
  const [dreamRole, setDreamRole] = useState("")
  const [experience, setExperience] = useState("")
  const [generatedMemes, setGeneratedMemes] = useState<MemeData[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const memeTemplates = [
    "Drake Pointing",
    "Distracted Boyfriend",
    "Woman Yelling at Cat",
    "This Is Fine",
    "Expanding Brain",
    "Two Buttons",
    "Change My Mind",
    "Surprised Pikachu",
  ]

  const careerMemeScenarios = [
    {
      template: "Drake Pointing",
      scenarios: [
        {
          topText: "Traditional 9-5 job",
          bottomText: "Becoming a Digital Nomad Blockchain Consultant",
          category: "Career Pivot",
        },
        {
          topText: "Asking for a raise",
          bottomText: "Becoming irreplaceable with AI skills",
          category: "Skill Evolution",
        },
        {
          topText: "Following job descriptions",
          bottomText: "Creating your own role as Chief Happiness Officer",
          category: "Innovation",
        },
      ],
    },
    {
      template: "Distracted Boyfriend",
      scenarios: [
        { topText: "You: Comfortable in current job", bottomText: "That new Web3 opportunity", category: "Temptation" },
        {
          topText: "Your resume: Traditional skills",
          bottomText: "AI Prompt Engineering certification",
          category: "Skill Upgrade",
        },
        { topText: "Your boss: Micromanaging", bottomText: "Remote work freedom", category: "Work Style" },
      ],
    },
    {
      template: "This Is Fine",
      scenarios: [
        {
          topText: "When AI automates 50% of your industry",
          bottomText: "But you're still using Excel from 2010",
          category: "Denial",
        },
        {
          topText: "When everyone's talking about the metaverse",
          bottomText: "And you just learned what TikTok is",
          category: "Tech Gap",
        },
        {
          topText: "When your job gets outsourced",
          bottomText: "But you're 'building character'",
          category: "Optimism",
        },
      ],
    },
    {
      template: "Expanding Brain",
      scenarios: [
        {
          topText:
            "Getting a college degree → Getting certifications → Learning from YouTube → Becoming the YouTube teacher",
          bottomText: "",
          category: "Learning Evolution",
        },
        {
          topText: "Job hunting → Networking → Personal branding → Becoming the industry you disrupted",
          bottomText: "",
          category: "Career Progression",
        },
        {
          topText: "Following trends → Predicting trends → Creating trends → Being the trend",
          bottomText: "",
          category: "Innovation Levels",
        },
      ],
    },
  ]

  const generatePersonalizedMemes = () => {
    setIsGenerating(true)

    setTimeout(() => {
      const personalizedMemes: MemeData[] = []

      // Generate role-specific memes
      if (currentRole && dreamRole) {
        personalizedMemes.push({
          template: "Drake Pointing",
          topText: `Staying as ${currentRole}`,
          bottomText: `Pivoting to ${dreamRole}`,
          category: "Personal Pivot",
          shareability: 85,
        })

        personalizedMemes.push({
          template: "Distracted Boyfriend",
          topText: `You: Comfortable as ${currentRole}`,
          bottomText: `That ${dreamRole} opportunity`,
          category: "Career Temptation",
          shareability: 92,
        })
      }

      // Add experience-based memes
      if (experience) {
        const expNum = Number.parseInt(experience)
        if (expNum < 2) {
          personalizedMemes.push({
            template: "Surprised Pikachu",
            topText: "When you realize you're 87% match",
            bottomText: "with 'Space Lawyer' on LinkedIn",
            category: "Career Discovery",
            shareability: 96,
          })
        } else if (expNum > 10) {
          personalizedMemes.push({
            template: "This Is Fine",
            topText: "When Gen Z asks if you know Python",
            bottomText: "And you're thinking of the snake",
            category: "Generation Gap",
            shareability: 88,
          })
        }
      }

      // Add random viral memes
      const randomScenarios = careerMemeScenarios[Math.floor(Math.random() * careerMemeScenarios.length)]
      const randomScenario = randomScenarios.scenarios[Math.floor(Math.random() * randomScenarios.scenarios.length)]

      personalizedMemes.push({
        template: randomScenarios.template,
        topText: randomScenario.topText,
        bottomText: randomScenario.bottomText,
        category: randomScenario.category,
        shareability: Math.floor(Math.random() * 20) + 80,
      })

      // Add more random memes
      for (let i = 0; i < 3; i++) {
        const randomTemplate = careerMemeScenarios[Math.floor(Math.random() * careerMemeScenarios.length)]
        const randomScen = randomTemplate.scenarios[Math.floor(Math.random() * randomTemplate.scenarios.length)]

        personalizedMemes.push({
          template: randomTemplate.template,
          topText: randomScen.topText,
          bottomText: randomScen.bottomText,
          category: randomScen.category,
          shareability: Math.floor(Math.random() * 25) + 75,
        })
      }

      setGeneratedMemes(personalizedMemes)
      setIsGenerating(false)
    }, 2000)
  }

  const shuffleMemes = () => {
    const shuffled = [...generatedMemes].sort(() => Math.random() - 0.5)
    setGeneratedMemes(shuffled)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gradient">AI Career Meme Roadmap</h2>
        <p className="text-purple-200 max-w-2xl mx-auto">
          Turn boring career advice into viral memes! Get personalized career humor that's actually shareable.
        </p>
      </div>

      <Card className="bg-slate-800/50 border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Meme Personalization Engine
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="current-role" className="text-purple-200">
                Current Role
              </Label>
              <Input
                id="current-role"
                placeholder="e.g., Marketing Manager"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                className="bg-slate-700 border-purple-500/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dream-role" className="text-purple-200">
                Dream Role
              </Label>
              <Input
                id="dream-role"
                placeholder="e.g., AI Ethics Consultant"
                value={dreamRole}
                onChange={(e) => setDreamRole(e.target.value)}
                className="bg-slate-700 border-purple-500/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-purple-200">
                Years Experience
              </Label>
              <Select value={experience} onValueChange={setExperience}>
                <SelectTrigger className="bg-slate-700 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1">0-1 years</SelectItem>
                  <SelectItem value="2-5">2-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="10+">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={generatePersonalizedMemes}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isGenerating ? "Generating Viral Content..." : "Generate My Career Memes"}
          </Button>
        </CardContent>
      </Card>

      {generatedMemes.length > 0 && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-purple-300">Your Personalized Meme Roadmap</h3>
            <Button
              onClick={shuffleMemes}
              variant="outline"
              className="border-purple-500/30 text-purple-300 hover:bg-purple-600/20 bg-transparent"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Shuffle Memes
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generatedMemes.map((meme, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 border-purple-500/20 hover:border-purple-400/40 transition-colors"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                      {meme.template}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-purple-400">
                      <Sparkles className="w-3 h-3" />
                      {meme.shareability}% viral
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-slate-900/50 rounded-lg p-4 min-h-[200px] flex flex-col justify-center items-center text-center border-2 border-dashed border-purple-500/30">
                    <div className="space-y-4">
                      <div className="text-white font-bold text-lg leading-tight">{meme.topText}</div>
                      {meme.bottomText && (
                        <div className="text-white font-bold text-lg leading-tight">{meme.bottomText}</div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="border-purple-500/30 text-purple-300">
                      {meme.category}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="text-purple-400 hover:text-purple-300">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-purple-400 hover:text-purple-300">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <h4 className="text-xl font-bold text-purple-300 mb-2">🚀 Meme Marketing Potential</h4>
              <p className="text-purple-200 mb-4">
                Your memes have an average shareability score of{" "}
                <span className="font-bold text-pink-400">
                  {Math.round(generatedMemes.reduce((acc, meme) => acc + meme.shareability, 0) / generatedMemes.length)}
                  %
                </span>
                ! Perfect for LinkedIn thought leadership and career pivoting announcements.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge className="bg-purple-600/20 text-purple-300">#CareerPivot</Badge>
                <Badge className="bg-purple-600/20 text-purple-300">#FutureOfWork</Badge>
                <Badge className="bg-purple-600/20 text-purple-300">#AICareer</Badge>
                <Badge className="bg-purple-600/20 text-purple-300">#CareerMemes</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Eye, TrendingUp, Crown, RotateCcw } from "lucide-react"

interface TarotCard {
  id: string
  name: string
  description: string
  prediction: string
  impact: "High" | "Medium" | "Low"
  timeframe: string
  advice: string
  flipped: boolean
}

const tarotCards: TarotCard[] = [
  {
    id: "disruptor",
    name: "The Disruptor",
    description: "AI automation threatens your current role",
    prediction:
      "There's a 73% chance AI will significantly impact your industry by 2026. Your routine tasks are most vulnerable.",
    impact: "High",
    timeframe: "6-18 months",
    advice: "Pivot to human-centric skills: emotional intelligence, creative problem-solving, and strategic thinking.",
    flipped: false,
  },
  {
    id: "pivot",
    name: "The Pivot",
    description: "Unexpected opportunity emerges from chaos",
    prediction:
      "A career-changing opportunity will present itself through your network in Q3 2024. It involves emerging tech.",
    impact: "High",
    timeframe: "3-9 months",
    advice:
      "Start building relationships in adjacent industries. Your transferable skills are more valuable than you think.",
    flipped: false,
  },
  {
    id: "legacy",
    name: "The Legacy",
    description: "Your long-term impact and influence",
    prediction:
      "Your expertise will become foundational knowledge for the next generation. You'll transition from doer to teacher.",
    impact: "Medium",
    timeframe: "2-5 years",
    advice: "Document your knowledge. Start mentoring others. Your experience is your competitive advantage.",
    flipped: false,
  },
]

const storyBranches = {
  disruptor: [
    "Embrace the disruption and become an AI collaborator",
    "Resist the change and focus on irreplaceable human skills",
    "Pivot to a completely different industry",
  ],
  pivot: [
    "Take the risky startup opportunity",
    "Negotiate a better position at your current company",
    "Use the leverage to freelance and build your own brand",
  ],
  legacy: [
    "Focus on building a lasting institution",
    "Become a thought leader and public speaker",
    "Mentor the next generation of professionals",
  ],
}

export function CareerTarot() {
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([])
  const [currentStory, setCurrentStory] = useState<string>("")
  const [storyProgress, setStoryProgress] = useState(0)
  const [isReading, setIsReading] = useState(false)
  const [showStoryBranches, setShowStoryBranches] = useState(false)
  const [selectedBranch, setSelectedBranch] = useState<string>("")

  const drawCards = () => {
    setIsReading(true)
    setSelectedCards([])
    setCurrentStory("")
    setStoryProgress(0)
    setShowStoryBranches(false)
    setSelectedBranch("")

    // Simulate card drawing animation
    const shuffledCards = [...tarotCards].sort(() => Math.random() - 0.5)

    shuffledCards.forEach((card, index) => {
      setTimeout(
        () => {
          setSelectedCards((prev) => [...prev, { ...card, flipped: true }])

          if (index === shuffledCards.length - 1) {
            setTimeout(() => {
              generateStory(shuffledCards)
            }, 1000)
          }
        },
        (index + 1) * 800,
      )
    })
  }

  const generateStory = (cards: TarotCard[]) => {
    const story = `Your career journey unfolds in three acts:

ACT I - THE DISRUPTION: ${cards[0].prediction}

ACT II - THE PIVOT: ${cards[1].prediction}

ACT III - THE LEGACY: ${cards[2].prediction}

The cards reveal a path of transformation. Your current stability will be challenged, but this disruption opens doors to opportunities you haven't yet imagined. The key is to remain adaptable and trust in your ability to reinvent yourself.`

    setCurrentStory(story)

    // Animate story reveal
    let progress = 0
    const interval = setInterval(() => {
      progress += 2
      setStoryProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setShowStoryBranches(true)
        }, 1000)
      }
    }, 50)
  }

  const selectBranch = (cardId: string, branch: string) => {
    setSelectedBranch(`${cardId}-${branch}`)

    const outcomes = {
      "disruptor-Embrace the disruption and become an AI collaborator":
        "You become a bridge between human creativity and AI efficiency. Your hybrid skills make you invaluable in the new economy.",
      "disruptor-Resist the change and focus on irreplaceable human skills":
        "You carve out a premium niche in human-centered services. Your authenticity becomes your brand.",
      "disruptor-Pivot to a completely different industry":
        "Your fresh perspective disrupts an established industry. You become an innovation catalyst.",
      "pivot-Take the risky startup opportunity":
        "The startup becomes a unicorn. You're now a C-level executive with equity worth millions.",
      "pivot-Negotiate a better position at your current company":
        "You become the internal innovation leader, transforming your company from within.",
      "pivot-Use the leverage to freelance and build your own brand":
        "Your personal brand attracts premium clients. You achieve the ultimate work-life balance.",
      "legacy-Focus on building a lasting institution":
        "Your organization outlives you, impacting thousands of careers for decades.",
      "legacy-Become a thought leader and public speaker":
        "Your ideas shape industry standards. You're invited to speak at major conferences worldwide.",
      "legacy-Mentor the next generation of professionals":
        "Your mentees become industry leaders, creating a network of influence that spans the globe.",
    }

    const outcome =
      outcomes[`${cardId}-${branch}` as keyof typeof outcomes] ||
      "Your path leads to unexpected success and fulfillment."

    setTimeout(() => {
      setCurrentStory((prev) => prev + `\n\nYOUR CHOSEN PATH: ${outcome}`)
    }, 500)
  }

  const resetReading = () => {
    setSelectedCards([])
    setCurrentStory("")
    setStoryProgress(0)
    setIsReading(false)
    setShowStoryBranches(false)
    setSelectedBranch("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-900 p-6 break-words overflow-wrap-anywhere">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles
              className="w-8 h-8 text-purple-400"
              style={{ filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.8))" }}
            />
            <h1
              className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              style={{ textShadow: "3px 3px 6px rgba(0,0,0,0.8)" }}
            >
              Career Tarot
            </h1>
            <Sparkles
              className="w-8 h-8 text-purple-400"
              style={{ filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.8))" }}
            />
          </div>
          <p className="text-white text-lg mb-6 font-bold" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
            AI-generated choose-your-own-adventure career forecast
          </p>

          {!isReading ? (
            <Button
              onClick={drawCards}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 text-lg font-bold shadow-lg"
            >
              <Eye className="w-5 h-5 mr-2" />
              Draw Your Cards
            </Button>
          ) : (
            <Button
              onClick={resetReading}
              variant="outline"
              className="border-2 border-purple-400 text-white hover:bg-purple-500/20 bg-purple-900/30 font-bold"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              New Reading
            </Button>
          )}
        </div>

        {/* Tarot Cards */}
        {selectedCards.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {selectedCards.map((card, index) => (
              <Card
                key={card.id}
                className={`bg-gradient-to-br from-purple-900/70 to-indigo-900/70 border-2 border-purple-400/50 transition-all duration-1000 shadow-xl ${
                  card.flipped ? "" : "transform scale-95"
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle
                      className="text-white flex items-center gap-2 font-bold"
                      style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                    >
                      {card.id === "disruptor" && <TrendingUp className="w-5 h-5" />}
                      {card.id === "pivot" && <RotateCcw className="w-5 h-5" />}
                      {card.id === "legacy" && <Crown className="w-5 h-5" />}
                      {card.name}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={`font-bold border-2 ${
                        card.impact === "High"
                          ? "border-red-400 text-red-200 bg-red-900/30"
                          : card.impact === "Medium"
                            ? "border-yellow-400 text-yellow-200 bg-yellow-900/30"
                            : "border-green-400 text-green-200 bg-green-900/30"
                      }`}
                    >
                      {card.impact} Impact
                    </Badge>
                  </div>
                  <CardDescription
                    className="text-gray-200 font-bold"
                    style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                  >
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4
                        className="text-sm font-bold text-white mb-2"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                      >
                        Prediction
                      </h4>
                      <p
                        className="text-sm text-gray-200 font-semibold leading-relaxed"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                      >
                        {card.prediction}
                      </p>
                    </div>
                    <div>
                      <h4
                        className="text-sm font-bold text-white mb-2"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                      >
                        Timeframe
                      </h4>
                      <p
                        className="text-sm text-gray-200 font-semibold"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                      >
                        {card.timeframe}
                      </p>
                    </div>
                    <div>
                      <h4
                        className="text-sm font-bold text-white mb-2"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                      >
                        Guidance
                      </h4>
                      <p
                        className="text-sm text-gray-200 font-semibold leading-relaxed"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                      >
                        {card.advice}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Story Generation */}
        {currentStory && (
          <Card className="bg-gradient-to-br from-indigo-900/70 to-purple-900/70 border-2 border-purple-400/50 mb-8 shadow-xl">
            <CardHeader>
              <CardTitle
                className="text-white flex items-center gap-2 font-bold"
                style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
              >
                <Sparkles className="w-5 h-5" />
                Your Career Prophecy
              </CardTitle>
              <Progress value={storyProgress} className="w-full" />
            </CardHeader>
            <CardContent>
              <div className="prose prose-purple max-w-none">
                <p
                  className="text-white whitespace-pre-line leading-relaxed font-bold"
                  style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                >
                  {currentStory}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Story Branches */}
        {showStoryBranches && !selectedBranch && (
          <Card className="bg-gradient-to-br from-purple-900/70 to-pink-900/70 border-2 border-purple-400/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white font-bold" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
                Choose Your Adventure
              </CardTitle>
              <CardDescription
                className="text-gray-200 font-bold"
                style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
              >
                Select your response to each card to shape your destiny
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {selectedCards.map((card) => (
                  <div key={card.id} className="space-y-3">
                    <h4 className="text-lg font-bold text-white" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
                      {card.name}
                    </h4>
                    <div className="grid gap-2">
                      {storyBranches[card.id as keyof typeof storyBranches].map((branch, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          onClick={() => selectBranch(card.id, branch)}
                          className="justify-start text-left border-2 border-purple-400/50 text-white hover:bg-purple-500/20 bg-purple-900/30 font-bold"
                          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
                        >
                          {branch}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Eye, EyeOff, Shield, Zap, MessageCircle, UserX, Lock, Trash2 } from "lucide-react"

interface AnonymousProfile {
  id: string
  codename: string
  skills: string[]
  experience: string
  location: string
  compatibility: number
  lastSeen: string
  verified: boolean
}

interface SecureMessage {
  id: string
  sender: string
  content: string
  timestamp: string
  encrypted: boolean
  burnAfterReading: boolean
  read: boolean
}

const anonymousProfiles: AnonymousProfile[] = [
  {
    id: "agent-001",
    codename: "Shadow Architect",
    skills: ["System Design", "Cloud Security", "Zero Trust"],
    experience: "Senior (8+ years)",
    location: "Encrypted Location",
    compatibility: 94,
    lastSeen: "2 hours ago",
    verified: true,
  },
  {
    id: "agent-002",
    codename: "Quantum Cipher",
    skills: ["Quantum Computing", "Cryptography", "ML"],
    experience: "Principal (12+ years)",
    location: "Undisclosed",
    compatibility: 87,
    lastSeen: "1 day ago",
    verified: true,
  },
  {
    id: "agent-003",
    codename: "Digital Ghost",
    skills: ["Blockchain", "DeFi", "Smart Contracts"],
    experience: "Mid-level (5+ years)",
    location: "VPN Masked",
    compatibility: 76,
    lastSeen: "3 hours ago",
    verified: false,
  },
]

const secureMessages: SecureMessage[] = [
  {
    id: "msg-001",
    sender: "Shadow Architect",
    content: "Interested in discussing the stealth transition to FAANG. My current employer cannot know.",
    timestamp: "2 hours ago",
    encrypted: true,
    burnAfterReading: true,
    read: false,
  },
  {
    id: "msg-002",
    sender: "Quantum Cipher",
    content: "I have insider knowledge about upcoming quantum computing roles. Let's connect via secure channel.",
    timestamp: "1 day ago",
    encrypted: true,
    burnAfterReading: false,
    read: true,
  },
]

export function StealthNetworking() {
  const [incognitoMode, setIncognitoMode] = useState(false)
  const [encryptionLevel, setEncryptionLevel] = useState(256)
  const [messages, setMessages] = useState<SecureMessage[]>(secureMessages)
  const [newMessage, setNewMessage] = useState("")
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
  const [burnTimer, setBurnTimer] = useState<number | null>(null)

  useEffect(() => {
    if (burnTimer !== null && burnTimer > 0) {
      const timer = setTimeout(() => setBurnTimer(burnTimer - 1), 1000)
      return () => clearTimeout(timer)
    } else if (burnTimer === 0) {
      // Burn the message
      setMessages((prev) => prev.filter((msg) => !msg.burnAfterReading || msg.read))
      setBurnTimer(null)
    }
  }, [burnTimer])

  const handleMessageRead = (messageId: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, read: true } : msg)))
    const message = messages.find((msg) => msg.id === messageId)
    if (message?.burnAfterReading) {
      setBurnTimer(10) // 10 second burn timer
    }
  }

  const sendSecureMessage = () => {
    if (!newMessage.trim() || !selectedAgent) return

    const message: SecureMessage = {
      id: `msg-${Date.now()}`,
      sender: "You (Agent Phoenix)",
      content: newMessage,
      timestamp: "Just now",
      encrypted: true,
      burnAfterReading: Math.random() > 0.5,
      read: false,
    }

    setMessages((prev) => [message, ...prev])
    setNewMessage("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-gray-700 rounded-full flex items-center justify-center">
              <span className="text-2xl">🕵️</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-300 to-gray-400 bg-clip-text text-transparent">
              Stealth Networking
            </h1>
          </div>
          <p className="text-slate-400 text-lg mb-6">Anonymous talent matching with military-grade encryption</p>

          {/* Security Status */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-green-400">AES-{encryptionLevel} Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400">Zero-Knowledge Verified</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIncognitoMode(!incognitoMode)}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              {incognitoMode ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {incognitoMode ? "Incognito ON" : "Incognito OFF"}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="matching" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="matching" className="data-[state=active]:bg-slate-700">
              Anonymous Matching
            </TabsTrigger>
            <TabsTrigger value="credentials" className="data-[state=active]:bg-slate-700">
              Credential Vault
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:bg-slate-700">
              Secure Comms
            </TabsTrigger>
            <TabsTrigger value="operations" className="data-[state=active]:bg-slate-700">
              Active Ops
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matching" className="space-y-6">
            <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserX className="w-5 h-5" />
                  Anonymous Talent Pool
                </CardTitle>
                <CardDescription>High-compatibility matches with verified credentials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {anonymousProfiles.map((profile) => (
                    <Card key={profile.id} className="bg-slate-900/50 border-slate-600">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-slate-200">{profile.codename}</h3>
                              {profile.verified && (
                                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                  <Shield className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-slate-400">
                              {profile.experience} • {profile.location}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-slate-300">{profile.compatibility}%</div>
                            <div className="text-xs text-slate-500">Compatibility</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {profile.skills.map((skill) => (
                            <Badge key={skill} variant="outline" className="border-slate-600 text-slate-300">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">Last seen: {profile.lastSeen}</span>
                          <Button
                            size="sm"
                            onClick={() => setSelectedAgent(profile.codename)}
                            className="bg-slate-700 hover:bg-slate-600"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Secure Contact
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="credentials" className="space-y-6">
            <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Zero-Knowledge Credential Vault
                </CardTitle>
                <CardDescription>Verify credentials without revealing identity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Education Verification</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Verified</Badge>
                    </div>
                    <p className="text-sm text-slate-400">Top-tier CS degree verified via blockchain</p>
                    <Progress value={100} className="mt-2 h-2" />
                  </div>

                  <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Experience Proof</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Verified</Badge>
                    </div>
                    <p className="text-sm text-slate-400">8+ years at Fortune 500 companies</p>
                    <Progress value={100} className="mt-2 h-2" />
                  </div>

                  <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Security Clearance</span>
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>
                    </div>
                    <p className="text-sm text-slate-400">Government clearance verification in progress</p>
                    <Progress value={75} className="mt-2 h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Encrypted Communications
                  {burnTimer && (
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
                      <Trash2 className="w-3 h-3 mr-1" />
                      Burn in {burnTimer}s
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>End-to-end encrypted with burn-after-reading</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Message Composer */}
                <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-600">
                  <div className="space-y-3">
                    <Input
                      placeholder="Select recipient agent..."
                      value={selectedAgent || ""}
                      onChange={(e) => setSelectedAgent(e.target.value)}
                      className="bg-slate-800 border-slate-600"
                    />
                    <Textarea
                      placeholder="Type your encrypted message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="bg-slate-800 border-slate-600"
                    />
                    <Button onClick={sendSecureMessage} className="bg-slate-700 hover:bg-slate-600">
                      <Zap className="w-4 h-4 mr-2" />
                      Send Encrypted
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="space-y-3">
                  {messages.map((message) => (
                    <Card key={message.id} className="bg-slate-900/50 border-slate-600">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-200">{message.sender}</span>
                            {message.encrypted && (
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                <Lock className="w-3 h-3 mr-1" />
                                Encrypted
                              </Badge>
                            )}
                            {message.burnAfterReading && (
                              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                                <Trash2 className="w-3 h-3 mr-1" />
                                Burn After Reading
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-slate-500">{message.timestamp}</span>
                        </div>

                        {!message.read && message.burnAfterReading ? (
                          <Button
                            size="sm"
                            onClick={() => handleMessageRead(message.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Read Once (Will Self-Destruct)
                          </Button>
                        ) : (
                          <p className="text-slate-300">{message.content}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Active Operations
                </CardTitle>
                <CardDescription>Ongoing stealth career transitions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Operation: Silicon Exodus</span>
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">In Progress</Badge>
                    </div>
                    <p className="text-sm text-slate-400 mb-3">Stealth transition from BigTech to Web3 startup</p>
                    <Progress value={65} className="h-2" />
                    <p className="text-xs text-slate-500 mt-1">65% complete • 3 secure interviews scheduled</p>
                  </div>

                  <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Operation: Quantum Leap</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Success</Badge>
                    </div>
                    <p className="text-sm text-slate-400 mb-3">Anonymous referral to quantum computing role</p>
                    <Progress value={100} className="h-2" />
                    <p className="text-xs text-slate-500 mt-1">Mission accomplished • Identity protected</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

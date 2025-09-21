"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, Share2, Linkedin, Twitter, Github, Globe, MessageCircle } from "lucide-react"

interface UserProfile {
  id: string
  name: string
  role: string
  industry: string
  followers: number
  following: number
  socialLinks: {
    linkedin?: string
    twitter?: string
    github?: string
    website?: string
  }
  isFollowing: boolean
}

export function NetworkingSection() {
  const [userProfiles] = useState<UserProfile[]>([
    {
      id: "1",
      name: "Sarah Chen",
      role: "AI Product Manager",
      industry: "Tech",
      followers: 1247,
      following: 892,
      socialLinks: {
        linkedin: "https://linkedin.com/in/sarahchen",
        twitter: "https://twitter.com/sarahchen_ai",
        github: "https://github.com/sarahchen",
      },
      isFollowing: false,
    },
    {
      id: "2",
      name: "Marcus Rodriguez",
      role: "Climate Tech Strategist",
      industry: "Sustainability",
      followers: 2156,
      following: 1043,
      socialLinks: {
        linkedin: "https://linkedin.com/in/marcusrodriguez",
        website: "https://marcusclimate.com",
      },
      isFollowing: true,
    },
    {
      id: "3",
      name: "Priya Patel",
      role: "Quantum Security Architect",
      industry: "Cybersecurity",
      followers: 3421,
      following: 756,
      socialLinks: {
        linkedin: "https://linkedin.com/in/priyapatel",
        twitter: "https://twitter.com/quantum_priya",
        github: "https://github.com/priyapatel",
      },
      isFollowing: false,
    },
  ])

  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    twitter: "",
    github: "",
    website: "",
  })

  const [followingUsers, setFollowingUsers] = useState<string[]>(["2"])

  const handleFollow = (userId: string) => {
    setFollowingUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleSocialLinkChange = (platform: string, value: string) => {
    setSocialLinks((prev) => ({
      ...prev,
      [platform]: value,
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-4">
          🌐 Career Chaos Network
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Connect with fellow chaos survivors and build your antifragile career network
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Social Media Setup */}
        <Card className="bg-gradient-to-b from-slate-900/80 to-blue-900/20 border-2 border-blue-500/50">
          <CardHeader>
            <CardTitle className="text-blue-200 flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Connect Your Socials
            </CardTitle>
            <CardDescription className="text-blue-200/80">
              Share your social media to expand your network
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="linkedin" className="text-gray-200 font-semibold flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-blue-400" />
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/yourprofile"
                value={socialLinks.linkedin}
                onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
                className="bg-slate-800/80 border-blue-500/50 text-white"
              />
            </div>
            <div>
              <Label htmlFor="twitter" className="text-gray-200 font-semibold flex items-center gap-2">
                <Twitter className="w-4 h-4 text-blue-400" />
                Twitter/X
              </Label>
              <Input
                id="twitter"
                placeholder="https://twitter.com/yourusername"
                value={socialLinks.twitter}
                onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
                className="bg-slate-800/80 border-blue-500/50 text-white"
              />
            </div>
            <div>
              <Label htmlFor="github" className="text-gray-200 font-semibold flex items-center gap-2">
                <Github className="w-4 h-4 text-gray-400" />
                GitHub
              </Label>
              <Input
                id="github"
                placeholder="https://github.com/yourusername"
                value={socialLinks.github}
                onChange={(e) => handleSocialLinkChange("github", e.target.value)}
                className="bg-slate-800/80 border-blue-500/50 text-white"
              />
            </div>
            <div>
              <Label htmlFor="website" className="text-gray-200 font-semibold flex items-center gap-2">
                <Globe className="w-4 h-4 text-green-400" />
                Website
              </Label>
              <Input
                id="website"
                placeholder="https://yourwebsite.com"
                value={socialLinks.website}
                onChange={(e) => handleSocialLinkChange("website", e.target.value)}
                className="bg-slate-800/80 border-blue-500/50 text-white"
              />
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Update Social Links
            </Button>
          </CardContent>
        </Card>

        {/* Network Stats */}
        <Card className="bg-gradient-to-b from-slate-900/80 to-purple-900/20 border-2 border-purple-500/50">
          <CardHeader>
            <CardTitle className="text-purple-200 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Your Network Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-purple-900/30 rounded-lg">
                <div className="text-2xl font-bold text-purple-200">847</div>
                <div className="text-sm text-purple-300">Followers</div>
              </div>
              <div className="p-4 bg-blue-900/30 rounded-lg">
                <div className="text-2xl font-bold text-blue-200">{followingUsers.length + 234}</div>
                <div className="text-sm text-blue-300">Following</div>
              </div>
              <div className="p-4 bg-green-900/30 rounded-lg">
                <div className="text-2xl font-bold text-green-200">23</div>
                <div className="text-sm text-green-300">Connections</div>
              </div>
              <div className="p-4 bg-orange-900/30 rounded-lg">
                <div className="text-2xl font-bold text-orange-200">156</div>
                <div className="text-sm text-orange-300">Interactions</div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-lg border border-purple-500/30">
              <h4 className="font-semibold text-purple-200 mb-2">Network Growth</h4>
              <div className="text-sm text-gray-300">
                <div className="flex justify-between mb-1">
                  <span>This Week</span>
                  <span className="text-green-400">+12 followers</span>
                </div>
                <div className="flex justify-between">
                  <span>This Month</span>
                  <span className="text-green-400">+47 followers</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trending Professionals */}
        <Card className="bg-gradient-to-b from-slate-900/80 to-green-900/20 border-2 border-green-500/50">
          <CardHeader>
            <CardTitle className="text-green-200 flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Trending Professionals
            </CardTitle>
            <CardDescription className="text-green-200/80">Connect with chaos-ready professionals</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userProfiles.map((user) => (
              <div key={user.id} className="p-3 bg-slate-800/50 rounded-lg border border-green-500/20">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-white">{user.name}</h4>
                    <p className="text-sm text-gray-400">{user.role}</p>
                    <Badge variant="outline" className="text-xs mt-1 border-green-500/50 text-green-300">
                      {user.industry}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleFollow(user.id)}
                    variant={followingUsers.includes(user.id) ? "secondary" : "default"}
                    className={
                      followingUsers.includes(user.id)
                        ? "bg-gray-600 hover:bg-gray-700"
                        : "bg-green-600 hover:bg-green-700"
                    }
                  >
                    {followingUsers.includes(user.id) ? "Following" : "Follow"}
                  </Button>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                  <span>{user.followers.toLocaleString()} followers</span>
                  <span>{user.following.toLocaleString()} following</span>
                </div>
                <div className="flex gap-2">
                  {user.socialLinks.linkedin && (
                    <Button size="sm" variant="ghost" className="p-1 h-auto">
                      <Linkedin className="w-4 h-4 text-blue-400" />
                    </Button>
                  )}
                  {user.socialLinks.twitter && (
                    <Button size="sm" variant="ghost" className="p-1 h-auto">
                      <Twitter className="w-4 h-4 text-blue-400" />
                    </Button>
                  )}
                  {user.socialLinks.github && (
                    <Button size="sm" variant="ghost" className="p-1 h-auto">
                      <Github className="w-4 h-4 text-gray-400" />
                    </Button>
                  )}
                  {user.socialLinks.website && (
                    <Button size="sm" variant="ghost" className="p-1 h-auto">
                      <Globe className="w-4 h-4 text-green-400" />
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" className="p-1 h-auto ml-auto">
                    <MessageCircle className="w-4 h-4 text-purple-400" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

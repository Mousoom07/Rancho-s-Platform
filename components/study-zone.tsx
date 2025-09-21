"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Download, ExternalLink, Search, Filter, Star, Clock, FileText, Video, Headphones } from "lucide-react"

interface StudyResource {
  id: string
  title: string
  description: string
  category: string
  type: "pdf" | "video" | "audio" | "ebook"
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  duration?: string
  size?: string
  rating: number
  downloadUrl: string
  externalUrl?: string
  tags: string[]
  featured: boolean
}

const categories = [
  "Programming",
  "Data Science",
  "Business",
  "Design",
  "Marketing",
  "Personal Development",
  "Language Learning",
  "Career Skills"
]

const studyResources: StudyResource[] = [
  {
    id: "1",
    title: "Complete JavaScript Guide",
    description: "Comprehensive guide covering modern JavaScript from basics to advanced concepts",
    category: "Programming",
    type: "pdf",
    difficulty: "Intermediate",
    size: "15.2 MB",
    rating: 4.8,
    downloadUrl: "/resources/javascript-guide.pdf",
    tags: ["JavaScript", "Web Development", "Programming"],
    featured: true
  },
  {
    id: "2",
    title: "Data Science Fundamentals",
    description: "Learn the core concepts of data science including statistics, machine learning, and data visualization",
    category: "Data Science",
    type: "ebook",
    difficulty: "Beginner",
    size: "8.7 MB",
    rating: 4.6,
    downloadUrl: "/resources/data-science-fundamentals.pdf",
    tags: ["Data Science", "Statistics", "Machine Learning"],
    featured: true
  },
  {
    id: "3",
    title: "Business Strategy Masterclass",
    description: "Video series on developing effective business strategies and competitive analysis",
    category: "Business",
    type: "video",
    difficulty: "Advanced",
    duration: "3h 45min",
    rating: 4.9,
    downloadUrl: "/resources/business-strategy.mp4",
    externalUrl: "https://example.com/business-strategy",
    tags: ["Business", "Strategy", "Leadership"],
    featured: true
  },
  {
    id: "4",
    title: "UI/UX Design Principles",
    description: "Essential design principles for creating user-friendly interfaces and experiences",
    category: "Design",
    type: "pdf",
    difficulty: "Beginner",
    size: "12.1 MB",
    rating: 4.7,
    downloadUrl: "/resources/ui-ux-principles.pdf",
    tags: ["Design", "UI/UX", "User Experience"],
    featured: false
  },
  {
    id: "5",
    title: "Digital Marketing Complete Course",
    description: "Complete course on digital marketing including SEO, social media, and content marketing",
    category: "Marketing",
    type: "video",
    difficulty: "Intermediate",
    duration: "5h 20min",
    rating: 4.5,
    downloadUrl: "/resources/digital-marketing.mp4",
    tags: ["Marketing", "SEO", "Social Media"],
    featured: false
  },
  {
    id: "6",
    title: "Mindfulness and Productivity",
    description: "Audio guide to mindfulness practices for improving focus and productivity",
    category: "Personal Development",
    type: "audio",
    difficulty: "Beginner",
    duration: "45min",
    rating: 4.4,
    downloadUrl: "/resources/mindfulness.mp3",
    tags: ["Mindfulness", "Productivity", "Personal Development"],
    featured: false
  },
  {
    id: "7",
    title: "Spanish for Beginners",
    description: "Comprehensive Spanish language course for absolute beginners",
    category: "Language Learning",
    type: "ebook",
    difficulty: "Beginner",
    size: "22.5 MB",
    rating: 4.7,
    downloadUrl: "/resources/spanish-beginners.pdf",
    tags: ["Spanish", "Language Learning", "Beginner"],
    featured: false
  },
  {
    id: "8",
    title: "Interview Skills Workshop",
    description: "Master the art of interviews with proven techniques and practice exercises",
    category: "Career Skills",
    type: "video",
    difficulty: "Intermediate",
    duration: "2h 15min",
    rating: 4.8,
    downloadUrl: "/resources/interview-skills.mp4",
    tags: ["Interview", "Career", "Soft Skills"],
    featured: false
  }
]

export function StudyZone() {
  const [filteredResources, setFilteredResources] = useState<StudyResource[]>(studyResources)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedType, setSelectedType] = useState<string>("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
      case "ebook":
        return <FileText className="w-5 h-5" />
      case "video":
        return <Video className="w-5 h-5" />
      case "audio":
        return <Headphones className="w-5 h-5" />
      default:
        return <BookOpen className="w-5 h-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "pdf":
      case "ebook":
        return "bg-red-600"
      case "video":
        return "bg-blue-600"
      case "audio":
        return "bg-green-600"
      default:
        return "bg-gray-600"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-600"
      case "Intermediate":
        return "bg-yellow-600"
      case "Advanced":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const filterResources = () => {
    let filtered = studyResources

    if (selectedCategory !== "All") {
      filtered = filtered.filter(resource => resource.category === selectedCategory)
    }

    if (selectedType !== "All") {
      filtered = filtered.filter(resource => resource.type === selectedType)
    }

    if (selectedDifficulty !== "All") {
      filtered = filtered.filter(resource => resource.difficulty === selectedDifficulty)
    }

    if (searchQuery) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (showFeaturedOnly) {
      filtered = filtered.filter(resource => resource.featured)
    }

    setFilteredResources(filtered)
  }

  const handleDownload = (resource: StudyResource) => {
    // In a real application, this would trigger an actual download
    alert(`Downloading ${resource.title}...`)
  }

  const handleExternalLink = (url: string) => {
    // In a real application, this would open the external link
    alert(`Opening external resource: ${url}`)
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-400"}`}
          />
        ))}
        <span className="text-sm text-gray-300 ml-1">{rating}</span>
      </div>
    )
  }

  const featuredResources = studyResources.filter(resource => resource.featured)

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Study Zone</h2>
        <p className="text-gray-300">Access a curated collection of books, videos, and resources to accelerate your learning</p>
      </div>

      {/* Featured Resources */}
      <section>
        <h3 className="text-2xl font-bold text-white mb-6">Featured Resources</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredResources.map((resource) => (
            <Card key={resource.id} className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-lg border-yellow-400/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-yellow-500 text-black">Featured</Badge>
                  <div className="flex items-center gap-2">
                    <Badge className={getTypeColor(resource.type)}>
                      {getTypeIcon(resource.type)}
                      <span className="ml-1">{resource.type.toUpperCase()}</span>
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-white text-lg">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4">{resource.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <Badge className={getDifficultyColor(resource.difficulty)}>
                    {resource.difficulty}
                  </Badge>
                  {renderStars(resource.rating)}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleDownload(resource)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  {resource.externalUrl && (
                    <Button
                      onClick={() => handleExternalLink(resource.externalUrl!)}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Filters and Search */}
      <Card className="bg-black/50 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter Resources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/10 border-white/20 text-white pl-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
              >
                <option value="All">All Types</option>
                <option value="pdf">PDF</option>
                <option value="ebook">E-Book</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Actions</label>
              <div className="flex gap-2">
                <Button
                  onClick={filterResources}
                  className="flex-1 bg-blue-600 hover:bg-blue-500"
                >
                  Apply Filters
                </Button>
                <Button
                  onClick={() => {
                    setSelectedCategory("All")
                    setSelectedType("All")
                    setSelectedDifficulty("All")
                    setSearchQuery("")
                    setShowFeaturedOnly(false)
                    setFilteredResources(studyResources)
                  }}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Clear
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured-only"
              checked={showFeaturedOnly}
              onChange={(e) => setShowFeaturedOnly(e.target.checked)}
              className="rounded border-white/20 bg-white/10 text-white"
            />
            <label htmlFor="featured-only" className="text-sm text-gray-300">Show featured only</label>
          </div>
        </CardContent>
      </Card>

      {/* All Resources */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">All Resources</h3>
          <Badge className="bg-blue-600">
            {filteredResources.length} {filteredResources.length === 1 ? "Resource" : "Resources"}
          </Badge>
        </div>

        {filteredResources.length === 0 ? (
          <Card className="bg-black/50 backdrop-blur-lg border-white/10">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300">No resources found matching your criteria. Try adjusting your filters.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="bg-black/50 backdrop-blur-lg border-white/10 hover:border-yellow-400/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getTypeColor(resource.type)}>
                        {getTypeIcon(resource.type)}
                        <span className="ml-1">{resource.type.toUpperCase()}</span>
                      </Badge>
                      {resource.featured && (
                        <Badge className="bg-yellow-500 text-black">Featured</Badge>
                      )}
                    </div>
                    <Badge className={getDifficultyColor(resource.difficulty)}>
                      {resource.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-white text-lg">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm mb-4">{resource.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Category:</span>
                      <Badge className="bg-purple-600">{resource.category}</Badge>
                    </div>
                    {resource.duration && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-white flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {resource.duration}
                        </span>
                      </div>
                    )}
                    {resource.size && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Size:</span>
                        <span className="text-white">{resource.size}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Rating:</span>
                      {renderStars(resource.rating)}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.map((tag, index) => (
                      <Badge key={index} className="bg-gray-600 text-white text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleDownload(resource)}
                      className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    {resource.externalUrl && (
                      <Button
                        onClick={() => handleExternalLink(resource.externalUrl!)}
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

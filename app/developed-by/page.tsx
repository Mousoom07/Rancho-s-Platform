"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Github, Linkedin, Twitter, Mail, Code, Heart, Zap, Star } from "lucide-react"
import { ProfessorVirus } from "@/components/professor-virus"
import { Footer } from "@/components/footer"

export default function DevelopedByPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Generate consistent particle positions only on client side
  const particles = useMemo(() => {
    if (!isClient) return []
    
    // Use a seeded random generator for consistency
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }

    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${seededRandom(i * 1000) * 100}%`,
      top: `${seededRandom(i * 1000 + 1) * 100}%`,
      animationDuration: `${3 + seededRandom(i * 1000 + 2) * 4}s`,
      animationDelay: `${seededRandom(i * 1000 + 3) * 2}s`,
    }))
  }, [isClient])

  const teamMembers = [
    {
      name: "Mousoom Samanta",
      role: "Project Lead & Full Stack Developer",
      bio: "Leading the development of Rancho's Platform with expertise in full-stack development and project management.",
      avatar: "/mousoom-portrait.png",
      skills: ["React/Next.js", "Node.js", "Project Management", "System Architecture"],
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#",
        email: "mousoom@ranchosplatform.com"
      }
    },
    {
      name: "Anwesa Banerjee",
      role: "AI & Machine Learning Engineer",
      bio: "Specializing in artificial intelligence and machine learning algorithms for personalized career guidance and skill assessment.",
      avatar: "/anwesa-portrait.png",
      skills: ["Python", "TensorFlow", "NLP", "Data Science"],
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#",
        email: "anwesa@ranchosplatform.com"
      }
    },
    {
      name: "Titli Dutta",
      role: "UX/UI Designer & Frontend Developer",
      bio: "Creating intuitive and engaging user interfaces with a focus on user experience and modern design principles.",
      avatar: "/titli-portrait.png",
      skills: ["Figma", "React", "User Research", "Design Systems"],
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#",
        email: "titli@ranchosplatform.com"
      }
    },
    {
      name: "Dipanjan Basak",
      role: "Backend Developer & Database Architect",
      bio: "Designing robust backend systems and database architectures to support the platform's advanced features and scalability.",
      avatar: "/dipanjan-portrait.png",
      skills: ["Node.js", "PostgreSQL", "Cloud Architecture", "API Design"],
      social: {
        github: "#",
        linkedin: "#",
        twitter: "#",
        email: "dipanjan@ranchosplatform.com"
      }
    }
  ]

  const techStack = [
    { name: "Next.js", category: "Framework", icon: "⚡" },
    { name: "React", category: "Frontend", icon: "⚛️" },
    { name: "TypeScript", category: "Language", icon: "🔷" },
    { name: "Tailwind CSS", category: "Styling", icon: "🎨" },
    { name: "Node.js", category: "Backend", icon: "🟢" },
    { name: "OpenAI", category: "AI", icon: "🤖" },
    { name: "PostgreSQL", category: "Database", icon: "🐘" },
    { name: "Vercel", category: "Hosting", icon: "🚀" }
  ]

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* 3D Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: particle.left,
              top: particle.top,
              animation: `float ${particle.animationDuration} ease-in-out infinite`,
              animationDelay: particle.animationDelay,
              transform: isClient ? `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)` : 'translate(0px, 0px)',
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
                Back
              </Button>
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center overflow-hidden animate-pulse">
                <img src="/idiots-logo.jpg" alt="Rancho's Platform" className="w-12 h-12 object-cover rounded-full" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl text-yellow-400 font-black" style={{ fontFamily: "Rancho, cursive" }}>
                  Developed By
                </span>
                <span className="text-sm text-gray-400">Meet the team behind Rancho's Platform</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-rancho">
              Built with <Heart className="inline-block text-red-500 mx-2" /> by Innovators
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Meet the passionate team of developers, designers, and visionaries who created Rancho's Platform to revolutionize career development.
            </p>
            <div className="flex justify-center gap-4 mb-12">
              <Badge className="bg-yellow-400 text-black border-2 border-white font-bold text-lg px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                Innovation First
              </Badge>
              <Badge className="bg-purple-500 text-white border-2 border-white font-bold text-lg px-4 py-2">
                <Code className="w-4 h-4 mr-2" />
                Code Excellence
              </Badge>
              <Badge className="bg-blue-500 text-white border-2 border-white font-bold text-lg px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                Cutting Edge Tech
              </Badge>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-rancho">
              Our Amazing Team
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-black/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-yellow-400">
                      <img 
                        src={member.avatar} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-yellow-400 font-semibold text-sm mb-3">{member.role}</p>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{member.bio}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-bold text-white mb-2">Skills:</h4>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} className="bg-blue-600 text-white text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-2">
                    <a
                      href={member.social.github}
                      className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={member.social.linkedin}
                      className="w-8 h-8 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-8 h-8 bg-sky-500 hover:bg-sky-400 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="w-8 h-8 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-rancho">
              Powered By
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="bg-black/50 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105 text-center"
                >
                  <div className="text-4xl mb-3">{tech.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-1">{tech.name}</h3>
                  <Badge className="bg-purple-600 text-white text-xs">{tech.category}</Badge>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 font-rancho">
              Our Mission
            </h2>
            <div className="bg-black/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                At Rancho's Platform, we believe everyone deserves access to cutting-edge career guidance and skill development tools. Our mission is to democratize career success through artificial intelligence, making personalized career advice accessible to professionals worldwide.
              </p>
              <p className="text-xl text-gray-300 leading-relaxed">
                We're committed to continuous innovation, user privacy, and creating tools that genuinely help people navigate their career journeys with confidence and clarity.
              </p>
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

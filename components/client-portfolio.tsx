"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Code,
  Brain,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  Terminal,
  Search,
  Zap,
  Network,
  Send,
  Play,
  Pause,
  Menu,
  X,
  ArrowRight,
  MapPin,
  Calendar,
  Download,
  MessageCircle,
  CheckCircle,
  TrendingUp,
  Lightbulb,
  Rocket,
  Activity,
  Layers,
  Sparkles,
} from "lucide-react"
// import * as anime from 'animejs'; // Removed anime import

interface NeuralNode {
  id: string
  x: number
  y: number
  z: number
  type: "skill" | "project" | "experience" | "core"
  label: string
  connections: string[]
  data: any
  isActive: boolean
  pulseIntensity: number
}

interface Particle {
  id: number
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  life: number
  maxLife: number
  color: string
  size: number
}

interface GlitchText {
  original: string
  glitched: string
  intensity: number
}

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  technologies: string[]
  category: string
  status: string
  github: string
  image: string
  features: string[]
  impact: string
  metrics: { [key: string]: string }
  liveDemo?: string
}

interface Skill {
  id: string
  name: string
  level: number
  category: string
  icon: React.ElementType
  description: string
  tools: string[]
  projects: string[]
  quiz: {
    question: string
    options: string[]
    correct: number
    explanation: string
  }
}

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  tags: string[]
  author: string
  image: string
}

interface ExperienceItem {
  year: string
  title: string
  institution: string
  description: string
  icon: React.ElementType
  color: string
}

interface ClientPortfolioProps {
  initialProjects: Project[]
  initialSkills: Skill[]
  initialBlogPosts: BlogPost[]
  initialExperience: ExperienceItem[]
}

export function ClientPortfolioContent({ initialProjects, initialSkills, initialBlogPosts, initialExperience }: ClientPortfolioProps) {
  const [currentSection, setCurrentSection] = useState('neural-core')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [neuralNodes, setNeuralNodes] = useState<NeuralNode[]>([])
  const [particles, setParticles] = useState<Particle[]>([])
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [isNeuralActive, setIsNeuralActive] = useState(true)
  const [typedTagline, setTypedTagline] = useState('') // Simplified tagline animation
  const [selectedProjectDetail, setSelectedProjectDetail] = useState<any>(null)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    '> Neural network initialized...',
    '> Loading Sarwan\'s consciousness...',
    '> System ready. Type "help" for commands.'
  ])
  const [terminalInput, setTerminalInput] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [projectCarouselIndex, setProjectCarouselIndex] = useState(0)
  const [skillQuizMode, setSkillQuizMode] = useState(false)
  const [currentQuiz, setCurrentQuiz] = useState<any>(null)
  const [aiImagePrompt, setAiImagePrompt] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageGenerationError, setImageGenerationError] = useState<string | null>(null);
  const [projectFilter, setProjectFilter] = useState<string>('All'); // New state for project filtering

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const particleIdRef = useRef(0)

  // Initialize neural network
  useEffect(() => {
    const nodes: NeuralNode[] = [
      // Core node
      {
        id: 'core',
        x: 0,
        y: 0,
        z: 0,
        type: 'core',
        label: 'Maddipati Sarwansai',
        connections: ['cybersecurity', 'development', 'ai', 'forensics'],
        data: { role: 'Cybersecurity Expert & Full-Stack Developer' },
        isActive: true,
        pulseIntensity: 1.0
      },
      // Skill nodes
      {
        id: 'cybersecurity',
        x: -200,
        y: -150,
        z: 50,
        type: 'skill',
        label: 'Cybersecurity',
        connections: ['core', 'forensics', 'penetration'],
        data: { level: 95, description: 'Network Security & Threat Analysis' },
        isActive: false,
        pulseIntensity: 0.7
      },
      {
        id: 'development',
        x: 200,
        y: -150,
        z: 50,
        type: 'skill',
        label: 'Full-Stack Dev',
        connections: ['core', 'react', 'nodejs'],
        data: { level: 92, description: 'MERN Stack & Modern Web Technologies' },
        isActive: false,
        pulseIntensity: 0.7
      },
      {
        id: 'ai',
        x: 0,
        y: -250,
        z: 100,
        type: 'skill',
        label: 'AI/ML',
        connections: ['core', 'saivio'],
        data: { level: 85, description: 'Machine Learning & AI Security' },
        isActive: false,
        pulseIntensity: 0.6
      },
      // Project nodes
      {
        id: 'forensicax',
        x: -300,
        y: 100,
        z: -50,
        type: 'project',
        label: 'ForensicaX',
        connections: ['cybersecurity', 'forensics'],
        data: { 
          status: 'Completed',
          tech: ['Java', 'AES', 'Python', 'SQLite'],
          impact: '40% faster evidence processing'
        },
        isActive: false,
        pulseIntensity: 0.8
      },
      {
        id: 'saivio',
        x: 300,
        y: 100,
        z: -50,
        type: 'project',
        label: 'Saivio',
        connections: ['ai', 'development'],
        data: { 
          status: 'Completed',
          tech: ['Node.js', 'AI/NLP', 'MongoDB', 'TailwindCSS'],
          impact: '500+ users helped with 95% accuracy'
        },
        isActive: false,
        pulseIntensity: 0.8
      },
      // Sub-skill nodes
      {
        id: 'forensics',
        x: -150,
        y: 50,
        z: 150,
        type: 'skill',
        label: 'Digital Forensics',
        connections: ['cybersecurity', 'forensicax'],
        data: { level: 88, description: 'Mobile & Memory Forensics' },
        isActive: false,
        pulseIntensity: 0.5
      },
      {
        id: 'penetration',
        x: -250,
        y: -50,
        z: 150,
        type: 'skill',
        label: 'Penetration Testing',
        connections: ['cybersecurity'],
        data: { level: 87, description: 'Ethical Hacking & Vulnerability Assessment' },
        isActive: false,
        pulseIntensity: 0.5
      },
      {
        id: 'react',
        x: 150,
        y: 50,
        z: 150,
        type: 'skill',
        label: 'React/TypeScript',
        connections: ['development'],
        data: { level: 90, description: 'Modern Frontend Development' },
        isActive: false,
        pulseIntensity: 0.5
      },
      {
        id: 'nodejs',
        x: 250,
        y: -50,
        z: 150,
        type: 'skill',
        label: 'Node.js/Express',
        connections: ['development'],
        data: { level: 88, description: 'Backend APIs & Server Architecture' },
        isActive: false,
        pulseIntensity: 0.5
      }
    ]
    setNeuralNodes(nodes)
  }, [])

  // Initialize particles
  useEffect(() => {
    const initialParticles: Particle[] = []
    for (let i = 0; i < 100; i++) {
      initialParticles.push({
        id: particleIdRef.current++,
        x: (Math.random() - 0.5) * 1000,
        y: (Math.random() - 0.5) * 1000,
        z: (Math.random() - 0.5) * 500,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        vz: (Math.random() - 0.5) * 2,
        life: Math.random() * 100,
        maxLife: 100,
        color: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00'][Math.floor(Math.random() * 4)],
        size: Math.random() * 3 + 1
      })
    }
    setParticles(initialParticles)
  }, [])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      })
    }

    const handleScroll = () => {
      const progress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      setScrollProgress(progress)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Neural network animation
  useEffect(() => {
    if (!isNeuralActive) return

    const animate = () => {
      setNeuralNodes(prev => prev.map(node => ({
        ...node,
        pulseIntensity: node.isActive 
          ? 0.8 + Math.sin(Date.now() * 0.003 + node.x * 0.01) * 0.2
          : 0.3 + Math.sin(Date.now() * 0.002 + node.y * 0.01) * 0.2
      })))

      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        z: particle.z + particle.vz,
        life: particle.life - 0.5,
        vx: particle.vx + (Math.random() - 0.5) * 0.1,
        vy: particle.vy + (Math.random() - 0.5) * 0.1,
        vz: particle.vz + (Math.random() - 0.5) * 0.1
      })).filter(p => p.life > 0))
    }

    const interval = setInterval(animate, 50)
    return () => clearInterval(interval)
  }, [isNeuralActive])

  // Add new particles
  useEffect(() => {
    if (!isNeuralActive) return

    const addParticles = () => {
      if (particles.length < 150) {
        const newParticles = Array.from({ length: 5 }, () => ({
          id: particleIdRef.current++,
          x: (Math.random() - 0.5) * 1000,
          y: (Math.random() - 0.5) * 1000,
          z: (Math.random() - 0.5) * 500,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          vz: (Math.random() - 0.5) * 2,
          life: 100,
          maxLife: 100,
          color: ['#00ffff', '#ff00ff', '#ffff00', '#00ff00'][Math.floor(Math.random() * 4)],
          size: Math.random() * 3 + 1
        }))
        setParticles(prev => [...prev, ...newParticles])
      }
    }

    const interval = setInterval(addParticles, 1000)
    return () => clearInterval(interval)
  }, [particles.length, isNeuralActive])

  // Tagline typing animation
  useEffect(() => {
    const tagline = 'Cybersecurity Expert | Full-Stack Developer | AI Innovator' // Professional tagline
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < tagline.length) {
        setTypedTagline(prev => prev + tagline.charAt(i))
        i++
      } else {
        clearInterval(typingInterval)
      }
    }, 50) // Typing speed

    return () => clearInterval(typingInterval)
  }, [])

  // Canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const render = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Clear canvas with a more subtle alpha
      ctx.fillStyle = isDarkMode ? 'rgba(0, 0, 0, 0.03)' : 'rgba(255, 255, 255, 0.03)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Matrix-style rain/circuits (subtler)
      ctx.strokeStyle = isDarkMode ? 'rgba(0, 255, 255, 0.05)' : 'rgba(59, 130, 246, 0.05)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }
      for (let i = 0; i < canvas.height; i += 20) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw connections
      ctx.strokeStyle = isDarkMode ? 'rgba(0, 255, 255, 0.2)' : 'rgba(59, 130, 246, 0.2)'
      ctx.lineWidth = 1
      
      neuralNodes.forEach(node => {
        node.connections.forEach(connectionId => {
          const connectedNode = neuralNodes.find(n => n.id === connectionId)
          if (connectedNode) {
            const startX = centerX + node.x + mousePosition.x * 50
            const startY = centerY + node.y + mousePosition.y * 30
            const endX = centerX + connectedNode.x + mousePosition.x * 50
            const endY = centerY + connectedNode.y + mousePosition.y * 30

            ctx.beginPath()
            ctx.moveTo(startX, startY)
            ctx.lineTo(endX, endY)
            ctx.stroke()

            // Animated pulse along connection
            const progress = (Date.now() * 0.001) % 1
            const pulseX = startX + (endX - startX) * progress
            const pulseY = startY + (endY - startY) * progress
            
            ctx.fillStyle = isDarkMode ? '#00ffff' : '#3b82f6'
            ctx.beginPath()
            ctx.arc(pulseX, pulseY, 2, 0, 2 * Math.PI)
            ctx.fill()
          }
        })
      })

      // Draw nodes
      neuralNodes.forEach(node => {
        const x = centerX + node.x + mousePosition.x * 50
        const y = centerY + node.y + mousePosition.y * 30
        const radius = node.type === 'core' ? 20 : node.type === 'project' ? 15 : 10
        const alpha = node.pulseIntensity

        // Node glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 3)
        const colors = {
          core: isDarkMode ? '#ff00ff' : '#8b5cf6',
          skill: isDarkMode ? '#00ffff' : '#3b82f6',
          project: isDarkMode ? '#00ff00' : '#10b981',
          experience: isDarkMode ? '#ffff00' : '#f59e0b'
        }
        
        gradient.addColorStop(0, `${colors[node.type]}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, radius * 3, 0, 2 * Math.PI)
        ctx.fill()

        // Node core
        ctx.fillStyle = colors[node.type]
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, 2 * Math.PI)
        ctx.fill()

        // Node label
        if (node.type === 'core' || selectedNode === node.id) {
          ctx.fillStyle = isDarkMode ? '#ffffff' : '#000000'
          ctx.font = '12px GeistMono' // Use GeistMono for code-like text
          ctx.textAlign = 'center'
          ctx.fillText(node.label, x, y - radius - 10)
        }
      })

      // Draw particles
      particles.forEach(particle => {
        const x = centerX + particle.x + mousePosition.x * 20
        const y = centerY + particle.y + mousePosition.y * 20
        const alpha = particle.life / particle.maxLife

        ctx.fillStyle = `${particle.color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`
        ctx.beginPath()
        ctx.arc(x, y, particle.size, 0, 2 * Math.PI)
        ctx.fill()
      })
    }

    const animationFrame = requestAnimationFrame(function animate() {
      render()
      requestAnimationFrame(animate)
    })

    return () => cancelAnimationFrame(animationFrame)
  }, [neuralNodes, particles, mousePosition, selectedNode, isDarkMode])

  // Terminal commands
  const handleTerminalCommand = (command: string) => {
    const cmd = command.toLowerCase().trim()
    const newHistory = [...terminalHistory, `> ${command}`]

    switch (cmd) {
      case 'help':
        newHistory.push(
          'Neural Interface Commands:',
          '  scan - Scan neural network status',
          '  profile - Display user profile details',
          '  skills - List core skill proficiencies',
          '  projects - Show project portfolio data',
          '  connect <node_id> - Connect to a specific neural node',
          '  matrix - Toggle background matrix visualization',
          '  clear - Clear terminal history'
        )
        break
      case 'scan':
        newHistory.push(
          'Scanning neural network...',
          `Found ${neuralNodes.length} nodes`,
          `Active connections: ${neuralNodes.reduce((acc, node) => acc + node.connections.length, 0)}`,
          'Network status: OPTIMAL'
        )
        break
      case 'profile':
        newHistory.push(
          'USER PROFILE:',
          'Name: Maddipati Sarwansai',
          'Role: Cybersecurity Expert & Full-Stack Developer',
          'Education: B.Tech Cybersecurity @ KL University',
          'Status: ACTIVE',
          'Clearance Level: AUTHORIZED'
        )
        break
      case 'skills':
        newHistory.push(
          'SKILL NODES:',
          '• Cybersecurity [95%] - Network Security & Threat Analysis',
          '• Full-Stack Dev [92%] - MERN Stack & Modern Web Tech',
          '• AI/ML [85%] - Machine Learning & AI Security',
          '• Digital Forensics [88%] - Mobile & Memory Forensics'
        )
        break
      case 'projects':
        newHistory.push(
          'PROJECT NODES:',
          '• ForensicaX - Mobile Forensics Tool [COMPLETED]',
          '• Saivio - AI Cybersecurity Assistant [COMPLETED]',
          'Impact: 500+ users helped, 40% faster processing'
        )
        break
      case 'matrix':
        setIsNeuralActive(!isNeuralActive)
        newHistory.push(`Matrix mode: ${!isNeuralActive ? 'ENABLED' : 'DISABLED'}`)
        break
      case 'clear':
        setTerminalHistory(['Neural Interface Ready', '> '])
        setTerminalInput('')
        return
      default:
        if (cmd.startsWith('connect ')) {
          const nodeId = cmd.replace('connect ', '')
          const node = neuralNodes.find(n => n.id === nodeId)
          if (node) {
            setSelectedNode(nodeId)
            newHistory.push(`Connected to ${node.label}`, `Data: ${JSON.stringify(node.data)}`)
          } else {
            newHistory.push(`Node '${nodeId}' not found`)
          }
        } else {
          newHistory.push(`Command not recognized: ${command}`)
        }
    }

    newHistory.push('> ')
    setTerminalHistory(newHistory)
    setTerminalInput('')
  }

  const scrollToSection = (sectionId: string) => {
    setCurrentSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(selectedNode === nodeId ? null : nodeId)
    setNeuralNodes(prev => prev.map(node => ({
      ...node,
      isActive: node.id === nodeId ? !node.isActive : false
    })))
  }

  const startSkillQuiz = (skill: any) => {
    setCurrentQuiz(skill.quiz)
    setSkillQuizMode(true)
  }

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswerIndex(answerIndex) // Set the selected answer
    setTimeout(() => {
      setSkillQuizMode(false)
      setCurrentQuiz(null)
      setSelectedAnswerIndex(null) // Reset selected answer
    }, 2000)
  }

  const handleGenerateImage = async () => {
    if (!aiImagePrompt.trim()) {
      setImageGenerationError('Please enter a prompt to generate an image.');
      return;
    }
    setIsGeneratingImage(true);
    setGeneratedImageUrl(null);
    setImageGenerationError(null);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: aiImagePrompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image.');
      }

      const data = await response.json();
      setGeneratedImageUrl(data.imageUrl);
    } catch (error: any) {
      setImageGenerationError(error.message || 'An unexpected error occurred.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const filteredProjects = projectFilter === 'All'
    ? initialProjects
    : initialProjects.filter(project => project.category === projectFilter);

  const projectCategories = ['All', ...new Set(initialProjects.map(p => p.category))];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-100 via-blue-100 to-gray-100 text-gray-900'
    } relative overflow-x-hidden font-sans`}> {/* Added font-sans */}
      
      {/* Neural Network Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ mixBlendMode: isDarkMode ? 'screen' : 'overlay' }} {/* Changed to overlay for subtlety */}
      />\
\
      {/* Floating UI Elements */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <Button
          size="sm"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`${
            isDarkMode 
              ? 'bg-purple-600 hover:bg-purple-700' 
              : 'bg-blue-600 hover:bg-blue-700'
          } backdrop-blur-md`}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </Button>
        <Button
          size="sm"
          onClick={() => setTerminalOpen(!terminalOpen)}
          className={`${
            isDarkMode 
              ? 'bg-cyan-600 hover:bg-cyan-700' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          } backdrop-blur-md`}
        >
          <Terminal className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          onClick={() => setIsNeuralActive(!isNeuralActive)}
          className={`${
            isDarkMode 
              ? 'bg-pink-600 hover:bg-pink-700' 
              : 'bg-purple-600 hover:bg-purple-700'
          } backdrop-blur-md`}
        >
          {isNeuralActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 ${
        isDarkMode ? 'bg-gray-900/80' : 'bg-white/80'
      } backdrop-blur-md border-b ${
        isDarkMode ? 'border-purple-500/20' : 'border-blue-500/20'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-500'
              } rounded-lg flex items-center justify-center relative overflow-hidden`}>
                <span className="text-white font-bold text-xl relative z-10">MS</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>
              <div>
                <h1 className={`font-bold text-xl ${
                  isDarkMode ? 'text-white' : 'text-gray-900'}`}> {/* Removed glitchText from main title */}
                  Maddipati Sarwansai
                </h1>
                <p className={`text-sm ${
                  isDarkMode ? 'text-purple-400' : 'text-blue-600'
                }`}>
                  Neural Interface Active
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { id: 'neural-core', label: 'Neural Core' },
                { id: 'skill-matrix', label: 'Skill Matrix' },
                { id: 'project-lab', label: 'Project Lab' },
                { id: 'data-log', label: 'Data Log' },
                { id: 'knowledge-base', label: 'Knowledge Base' },
                { id: 'contact-node', label: 'Contact Node' },
                { id: 'ai-image-generator', label: 'AI Image Forge' } // Added AI Image Forge to navigation
              ].map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`transition-all duration-300 hover:scale-105 ${
                    currentSection === section.id
                      ? isDarkMode ? 'text-purple-400' : 'text-blue-600'
                      : isDarkMode ? 'text-gray-300 hover:text-purple-300' : 'text-gray-600 hover:text-blue-500'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
              <div className="flex flex-col space-y-4 mt-4">
                {[
                  { id: 'neural-core', label: 'Neural Core' },
                  { id: 'skill-matrix', label: 'Skill Matrix' },
                  { id: 'project-lab', label: 'Project Lab' },
                  { id: 'data-log', label: 'Data Log' },
                  { id: 'knowledge-base', label: 'Knowledge Base' },
                  { id: 'contact-node', label: 'Contact Node' },
                  { id: 'ai-image-generator', label: 'AI Image Forge' } // Added AI Image Forge to navigation
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="text-left py-2 hover:text-purple-400 transition-colors"
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Terminal Overlay */}
      {terminalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className={`w-full max-w-3xl h-96 flex flex-col shadow-2xl ${
            isDarkMode ? 'bg-gray-900 border-green-500' : 'bg-white border-blue-500'
          }`}>
            <CardHeader className={`flex-row items-center justify-between p-4 border-b ${
              isDarkMode ? 'border-gray-700' : 'border-gray-300'
            }`}>
              <div className="flex items-center space-x-2">
                <Terminal className={`w-5 h-5 ${
                  isDarkMode ? 'text-green-500' : 'text-blue-500'
                }`} />
                <span className={`font-mono ${
                  isDarkMode ? 'text-green-500' : 'text-blue-600'
                }`}>
                  neural@sarwan-interface:~$
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTerminalOpen(false)}
                className={`${
                  isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            
            <CardContent className="flex-1 p-4 overflow-y-auto font-mono text-sm">
              {terminalHistory.map((line, index) => (
                <div key={index} className={`mb-1 ${
                  isDarkMode ? 'text-green-400' : 'text-blue-600'
                }`}>
                  {line}
                </div>
              ))}
              <div className={`flex items-center ${
                isDarkMode ? 'text-green-400' : 'text-blue-600'
              }`}>
                <span className="mr-2">{'>'}</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleTerminalCommand(terminalInput)
                    }
                  }}
                  className="bg-transparent outline-none flex-1 font-mono"
                  placeholder="Enter neural command..."
                  autoFocus
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Skill Quiz Modal */}
      {skillQuizMode && currentQuiz && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className={`w-full max-w-2xl ${
            isDarkMode ? 'bg-gray-900 border-purple-500/30' : 'bg-white border-blue-500/30'
          }`}>
            <CardHeader>
              <CardTitle className={`${
                isDarkMode ? 'text-purple-400' : 'text-blue-600'
              } flex items-center`}>
                <Brain className="w-5 h-5 mr-2" />
                Skill Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className={`text-lg font-semibold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {currentQuiz.question}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {currentQuiz.options.map((option: string, index: number) => (
                    <Button
                      key={index}
                      onClick={() => handleQuizAnswer(index)}
                      variant="outline"
                      className={`p-4 text-left justify-start ${
                        isDarkMode 
                          ? 'border-gray-600 hover:border-purple-400' 
                          : 'border-gray-300 hover:border-blue-400'
                      }
    ${selectedAnswerIndex !== null && index === currentQuiz.correct && 'bg-green-500/20 border-green-500 text-green-400'}
    ${selectedAnswerIndex !== null && index !== currentQuiz.correct && index === selectedAnswerIndex && 'bg-red-500/20 border-red-500 text-red-400'}
    `}
                      disabled={selectedAnswerIndex !== null} // Disable buttons after an answer is selected
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                {selectedAnswerIndex !== null && (
                  <div className={`mt-4 p-3 rounded-md ${
                    selectedAnswerIndex === currentQuiz.correct 
                      ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/10 text-red-400 border border-red-500/30'
                  }`}>
                    <p className="font-semibold">Explanation:</p>
                    <p>{currentQuiz.explanation}</p>
                  </div>
                )}
              </div>
              <Button
                onClick={() => setSkillQuizMode(false)}
                variant="ghost"
                className="w-full"
              >
                Skip Assessment
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedProjectDetail && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <Card className={`w-full max-w-4xl my-8 ${
            isDarkMode ? 'bg-gray-900 border-green-500/30' : 'bg-white border-green-600/30'
          }`}>
            <CardHeader className="relative">
              <button
                onClick={() => setSelectedProjectDetail(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <CardTitle className={`${
                isDarkMode ? 'text-green-400' : 'text-green-600'
              } flex items-center text-3xl`}>
                <Layers className="w-7 h-7 mr-3" />
                {selectedProjectDetail.title}
              </CardTitle>
              <p className={`${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              } text-lg`}>
                {selectedProjectDetail.subtitle}
              </p>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {selectedProjectDetail.image && (
                <img 
                  src={selectedProjectDetail.image || "/placeholder.svg"} 
                  alt={selectedProjectDetail.title}
                  className="w-full h-64 object-cover rounded-md mb-4"
                />
              )}
              {selectedProjectDetail.demoVideo && (
                <div className="w-full h-64 bg-gray-800 flex items-center justify-center rounded-md text-gray-400">
                  <Play className="w-12 h-12" />
                  <span className="ml-2">Demo Video Placeholder</span>
                </div>
              )}
              <p className={`${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              } text-base leading-relaxed`}>
                {selectedProjectDetail.longDescription}
              </p>

              <div>
                <h4 className={`font-semibold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Key Features:
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedProjectDetail.features.map((feature: string, idx: number) => (
                    <li key={idx} className={`flex items-start space-x-2 ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <CheckCircle className={`w-4 h-4 mt-1 shrink-0 ${
                        isDarkMode ? 'text-green-400' : 'text-green-600'
                      }`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className={`font-semibold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Technology Stack:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProjectDetail.technologies.map((tech: string, idx: number) => (
                    <Badge 
                      key={idx} 
                      variant="outline" 
                      className={`text-sm px-3 py-1 ${
                        isDarkMode 
                          ? 'border-gray-600 text-gray-400' 
                          : 'border-gray-400 text-gray-600'
                      }`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 pt-4 border-t border-gray-700">
                <Button 
                  size="lg"
                  className={`${
                    isDarkMode 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-green-600 hover:bg-green-700'
                  } flex-1`}
                  asChild
                >
                  <a href={selectedProjectDetail.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 mr-2" />
                    View Code
                  </a>
                </Button>
                {selectedProjectDetail.liveDemo && (
                  <Button 
                    size="lg"
                    variant="outline"
                    className={`${
                      isDarkMode 
                        ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white' 
                        : 'border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white'
                    }`}
                    asChild
                  >
                    <a href={selectedProjectDetail.liveDemo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Hero Section - Neural Core */}
      <section id="neural-core" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Interactive Neural Network Display */}
            <div className="mb-12 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`w-96 h-96 rounded-full ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20' 
                    : 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20'
                } animate-pulse`}></div>
              </div>
              
              <div className="relative z-10 py-20">
                <h1 className={`text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r ${
                  isDarkMode 
                    ? 'from-purple-400 via-pink-400 to-purple-400' 
                    : 'from-blue-600 via-indigo-600 to-blue-600'
                } bg-clip-text text-transparent`}>
                  Maddipati Sarwansai {/* Removed glitchText from here */}
                </h1>
                
                <div className="text-2xl md:text-3xl mb-8 h-12 flex items-center justify-center font-sans"> {/* Changed to font-sans */}
                  <span className={`${
                    isDarkMode ? 'text-cyan-400' : 'text-blue-600'
                  }`}>
                    {typedTagline}
                    <span className="animate-pulse">_</span>
                  </span>
                </div>

                <p className={`text-lg md:text-xl mb-12 max-w-4xl mx-auto leading-relaxed font-sans ${ /* Changed to font-sans */
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Bridging cybersecurity expertise with full-stack development. 
                  Currently pursuing a B.Tech in Cybersecurity at KL University, 
                  I focus on building intelligent systems that defend, analyze, and innovate.
                </p>

                {/* Interactive Status Badges */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <Badge className={`${
                    isDarkMode 
                      ? 'bg-purple-600/20 text-purple-400 border-purple-400/30' 
                      : 'bg-blue-600/20 text-blue-600 border-blue-600/30'
                  } px-6 py-3 text-lg animate-pulse`}>
                    <Shield className="w-5 h-5 mr-2" />
                    Cybersecurity
                  </Badge>
                  <Badge className={`${
                    isDarkMode 
                      ? 'bg-cyan-600/20 text-cyan-400 border-cyan-400/30' 
                      : 'bg-indigo-600/20 text-indigo-600 border-indigo-600/30'
                  } px-6 py-3 text-lg animate-pulse`}>
                    <Code className="w-5 h-5 mr-2" />
                    Full-Stack Development
                  </Badge>
                  <Badge className={`${
                    isDarkMode 
                      ? 'bg-pink-600/20 text-pink-400 border-pink-400/30' 
                      : 'bg-purple-600/20 text-purple-600 border-purple-600/30'
                  } px-6 py-3 text-lg animate-pulse`}>
                    <Brain className="w-5 h-5 mr-2" />
                    AI/ML Integration
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-6">
                  <Button 
                    size="lg" 
                    onClick={() => scrollToSection('project-lab')}
                    className={`${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                    } text-white px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300`}
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Explore Projects
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={() => scrollToSection('contact-node')}
                    className={`${
                      isDarkMode 
                        ? 'border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white' 
                        : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                    } px-8 py-4 text-lg transform hover:scale-105 transition-all duration-300`}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Initialize Contact
                  </Button>
                </div>
              </div>
            </div>

            {/* Neural Network Visualization */}
            <div className="relative h-64 mb-12">
              <div className="absolute inset-0 flex items-center justify-center">
                {neuralNodes.slice(0, 5).map((node, index) => (
                  <div
                    key={node.id}
                    className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all duration-300 hover:scale-150 ${
                      node.type === 'core' 
                        ? isDarkMode ? 'bg-pink-500' : 'bg-purple-600'
                        : node.type === 'skill'
                        ? isDarkMode ? 'bg-cyan-500' : 'bg-blue-600'
                        : isDarkMode ? 'bg-green-500' : 'bg-green-600'
                    }`}
                    style={{
                      left: `${50 + Math.cos(index * 1.26) * 30}%`,
                      top: `${50 + Math.sin(index * 1.26) * 30}%`,
                      animationDelay: `${index * 0.2}s`
                    }}
                    onClick={() => handleNodeClick(node.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className={`w-8 h-8 ${
            isDarkMode ? 'text-purple-400' : 'text-blue-600'
          }`} />
        </div>
      </section>

      {/* Skills Section - Skill Matrix */}
      <section id="skill-matrix" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-purple-400 to-pink-400' 
                  : 'from-blue-600 to-indigo-600'
              } bg-clip-text text-transparent font-sans`}> {/* Changed to font-sans */}
                Skill Matrix
              </h2>
              <p className={`text-xl font-sans ${ /* Changed to font-sans */
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              } max-w-3xl mx-auto`}>
                A comprehensive overview of my expertise across cybersecurity, 
                development, and AI domains. Click to explore or test your knowledge.
              </p>
            </div>

            {/* Interactive Skill Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {initialSkills.map((skill, index) => (
                <Card 
                  key={skill.id}
                  className={`group cursor-pointer transition-all duration-500 hover:scale-105 transform-gpu ${
                    isDarkMode 
                      ? 'bg-gray-900/50 border-purple-500/20 hover:border-purple-500/40' 
                      : 'bg-white/50 border-blue-500/20 hover:border-blue-500/40'
                  } backdrop-blur-md relative overflow-hidden`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  // Removed anime.js handlers
                >
                  {/* Animated Background */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                    isDarkMode 
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                      : 'bg-gradient-to-br from-blue-500 to-indigo-500'
                  }`}></div>
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${
                        isDarkMode 
                          ? 'bg-purple-600/20 group-hover:bg-purple-600/30' 
                          : 'bg-blue-600/20 group-hover:bg-blue-600/30'
                      } transition-colors duration-300`}>
                        <skill.icon className={`w-8 h-8 ${
                          isDarkMode ? 'text-purple-400' : 'text-blue-600'
                        }`} />
                      </div>
                      <Badge variant="outline" className={`${
                        isDarkMode 
                          ? 'border-purple-400/30 text-purple-400' 
                          : 'border-blue-600/30 text-blue-600'
                      }`}>
                        {skill.level}%
                      </Badge>
                    </div>
                    <CardTitle className={`text-xl mb-2 font-sans ${ /* Changed to font-sans */
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {skill.name}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 space-y-4">
                    {/* Animated Progress Bar */}
                    <div className="relative">
                      <Progress 
                        value={skill.level} 
                        className="h-3 transition-all duration-1000"
                      />
                      <div className={`absolute inset-0 ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                          : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                      } opacity-20 animate-pulse rounded-full`}></div>
                    </div>
                    
                    <p className={`text-sm font-sans ${ /* Changed to font-sans */
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {skill.description}
                    </p>
                    
                    {/* Tools */}
                    <div className="flex flex-wrap gap-2">
                      {skill.tools.slice(0, 3).map((tool, idx) => (
                        <Badge 
                          key={idx} 
                          variant="outline" 
                          className={`text-xs font-sans ${ /* Changed to font-sans */
                            isDarkMode 
                              ? 'border-gray-600 text-gray-400' 
                              : 'border-gray-400 text-gray-600'
                          }`}
                        >
                          {tool}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Interactive Elements */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <span className={`text-xs font-sans ${ /* Changed to font-sans */
                        isDarkMode ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        Click to test knowledge
                      </span>
                      <Brain className={`w-4 h-4 ${
                        isDarkMode ? 'text-purple-400' : 'text-blue-600'
                      } group-hover:animate-pulse`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Skill Categories */}
            <div className="mt-16 grid md:grid-cols-3 gap-8">
              {[
                {
                  category: 'Cybersecurity',
                  icon: Shield,
                  color: isDarkMode ? 'from-red-500 to-pink-500' : 'from-red-600 to-pink-600',
                  skills: ['Network Security', 'Malware Analysis', 'Digital Forensics', 'Penetration Testing']
                },
                {
                  category: 'Development',
                  icon: Code,
                  color: isDarkMode ? 'from-blue-500 to-cyan-500' : 'from-blue-600 to-cyan-600',
                  skills: ['React/TypeScript', 'Node.js/Express', 'MongoDB', 'Python']
                },
                {
                  category: 'AI/ML',
                  icon: Brain,
                  color: isDarkMode ? 'from-purple-500 to-indigo-500' : 'from-purple-600 to-indigo-600',
                  skills: ['Machine Learning', 'Natural Language Processing', 'AI Security', 'Data Analysis']
                }
              ].map((category, index) => (
                <Card 
                  key={category.category}
                  className={`${
                    isDarkMode 
                      ? 'bg-gray-900/30 border-gray-700/30' 
                      : 'bg-white/30 border-gray-300/30'
                  } backdrop-blur-md hover:scale-105 transition-all duration-300`}
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}>
                        <category.icon className="w-6 h-6 text-white" />
                      </div>
                      <CardTitle className={`font-sans ${ /* Changed to font-sans */
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {category.category}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {category.skills.map((skill, idx) => (
                        <div 
                          key={idx}
                          className={`flex items-center space-x-2 text-sm font-sans ${ /* Changed to font-sans */
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color}`}></div>
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Project Lab */}
      <section id="project-lab" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-green-400 to-cyan-400' 
                  : 'from-green-600 to-cyan-600'
              } bg-clip-text text-transparent font-sans`}> {/* Changed to font-sans */}
                Project Laboratory
              </h2>
              <p className={`text-xl font-sans ${ /* Changed to font-sans */
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              } max-w-3xl mx-auto`}>
                Showcasing impactful projects that solve real-world challenges 
                in cybersecurity and development.
              </p>
            </div>

            {/* Project Filter */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {projectCategories.map(category => (
                <Button
                  key={category}
                  variant={projectFilter === category ? 'default' : 'outline'}
                  onClick={() => setProjectFilter(category)}
                  className={`font-sans ${
                    projectFilter === category
                      ? isDarkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'
                      : isDarkMode ? 'border-gray-600 text-gray-400 hover:border-green-400 hover:text-green-400' : 'border-gray-400 text-gray-600 hover:border-green-600 hover:text-green-600'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* 3D Project Carousel */}
            <div className="relative h-[600px] mb-16 perspective-1000">
              <div className="absolute inset-0 flex items-center justify-center">
                {filteredProjects.map((project, index) => (
                  <Card
                    key={project.id}
                    className={`absolute w-96 h-[500px] transition-all duration-1000 transform-gpu cursor-pointer ${
                      index === projectCarouselIndex 
                        ? 'z-20 scale-110 rotateY-0' 
                        : index === (projectCarouselIndex + 1) % filteredProjects.length
                        ? 'z-10 scale-90 rotateY-45 translate-x-48'
                        : 'z-0 scale-75 rotateY-45 -translate-x-48'
                    } ${
                      isDarkMode 
                        ? 'bg-gray-900/80 border-green-500/30' 
                        : 'bg-white/80 border-green-600/30'
                    } backdrop-blur-md overflow-hidden`}
                    onClick={() => setSelectedProjectDetail(project)}
                  >
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={project.image || "/placeholder.svg"} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className={`${
                          project.category === 'Cybersecurity' 
                            ? 'bg-red-600/80' 
                            : 'bg-blue-600/80'
                        } text-white font-sans`}> {/* Changed to font-sans */}
                          {project.category}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <Badge variant="outline" className="border-green-400/50 text-green-400 bg-black/50 font-sans"> {/* Changed to font-sans */}
                          {project.status}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className={`text-2xl font-sans ${ /* Changed to font-sans */
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {project.title}
                      </CardTitle>
                      <p className={`font-semibold font-sans ${ /* Changed to font-sans */
                        isDarkMode ? 'text-green-400' : 'text-green-600'
                      }`}>
                        {project.subtitle}
                      </p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className={`text-sm font-sans ${ /* Changed to font-sans */
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {project.description}
                      </p>

                      {/* Technology Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, idx) => (
                          <Badge 
                            key={idx} 
                            variant="outline" 
                            className={`text-xs font-sans ${ /* Changed to font-sans */
                              isDarkMode 
                                ? 'border-gray-600 text-gray-400' 
                                : 'border-gray-400 text-gray-600'
                            }`}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        {Object.entries(project.metrics).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className={`text-lg font-bold font-sans ${ /* Changed to font-sans */
                              isDarkMode ? 'text-green-400' : 'text-green-600'
                            }`}>
                              {value}
                            </div>
                            <div className={`text-xs font-sans ${ /* Changed to font-sans */
                              isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            } capitalize`}>
                              {key}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3 pt-4">
                        <Button 
                          size="sm"
                          className={`${
                            isDarkMode 
                              ? 'bg-green-600 hover:bg-green-700' 
                              : 'bg-green-600 hover:bg-green-700'
                          } flex-1 font-sans`} /* Changed to font-sans */
                          asChild
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            View Code
                          </a>
                        </Button>
                        {project.liveDemo && ( // Only render if liveDemo exists
                          <Button 
                            size="sm"
                            variant="outline"
                            className={`${
                              isDarkMode 
                                ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white' 
                                : 'border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white'
                            } flex-1 font-sans`}
                            asChild
                          >
                            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Carousel Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {filteredProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setProjectCarouselIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === projectCarouselIndex
                        ? isDarkMode ? 'bg-green-400' : 'bg-green-600'
                        : isDarkMode ? 'bg-gray-600' : 'bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Project Features Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {filteredProjects[projectCarouselIndex]?.features.map((feature, index) => ( // Use optional chaining
                <div 
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-lg ${
                    isDarkMode 
                      ? 'bg-gray-900/30 border border-green-500/20' 
                      : 'bg-white/30 border border-green-600/20'
                  } backdrop-blur-sm`}
                >
                  <CheckCircle className={`w-5 h-5 ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`} />
                  <span className={`font-sans ${ /* Changed to font-sans */
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Impact Statement */}
            <div className={`mt-12 p-8 rounded-lg ${
              isDarkMode 
                ? 'bg-gradient-to-r from-green-900/30 to-cyan-900/30 border border-green-500/30' 
                : 'bg-gradient-to-r from-green-100/50 to-cyan-100/50 border border-green-600/30'
            } backdrop-blur-sm text-center`}>
              <TrendingUp className={`w-8 h-8 mx-auto mb-4 ${
                isDarkMode ? 'text-green-400' : 'text-green-600'
              }`} />
              <h3 className={`text-xl font-semibold mb-2 font-sans ${ /* Changed to font-sans */
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Project Impact
              </h3>
              <p className={`text-lg font-sans ${ /* Changed to font-sans */
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {filteredProjects[projectCarouselIndex]?.impact} {/* Use optional chaining */}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="data-log" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-indigo-400 to-purple-400' 
                  : 'from-indigo-600 to-purple-600'
              } bg-clip-text text-transparent font-sans`}> {/* Changed to font-sans */}
            Data Log
          </h2>
          <p className={`text-xl font-sans ${ /* Changed to font-sans */
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          } max-w-3xl mx-auto`}>
            A chronological record of my professional and academic journey, 
            highlighting key milestones and achievements.
          </p>
        </div>

        <div className="relative pl-8 md:pl-16">
          <div className={`absolute left-0 top-0 h-full w-1 ${
            isDarkMode ? 'bg-purple-500/50' : 'bg-blue-500/50'
          } rounded-full`}></div>
          
          {initialExperience.map((item, index) => (
            <div key={index} className="mb-12 flex items-start relative">
              <div className={`absolute -left-2.5 md:-left-4 top-0 w-5 h-5 rounded-full ${
                isDarkMode ? 'bg-purple-500' : 'bg-blue-500'
              } flex items-center justify-center z-10`}>
                <item.icon className="w-3 h-3 text-white" />
              </div>
              <Card className={`flex-1 ml-8 md:ml-12 p-6 ${
                isDarkMode 
                  ? 'bg-gray-900/50 border-purple-500/30' 
                  : 'bg-white/50 border-blue-500/30'
              } backdrop-blur-md transition-all duration-300 hover:scale-[1.02] transform-gpu`}>
                <CardHeader className="p-0 mb-4">
                  <CardTitle className={`text-xl font-sans ${ /* Changed to font-sans */
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </CardTitle>
                  <p className={`text-sm font-semibold font-sans ${item.color}`}> {/* Changed to font-sans */}
                    {item.institution}
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  <p className={`text-base font-sans ${ /* Changed to font-sans */
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  } mb-4`}>
                    {item.description}
                  </p>
                  <Badge variant="outline" className={`font-sans ${ /* Changed to font-sans */
                    isDarkMode 
                      ? 'border-gray-600 text-gray-400' 
                      : 'border-gray-400 text-gray-600'
                  }`}>
                    <Calendar className="w-3 h-3 mr-1" />
                    {item.year}
                  </Badge>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Blog Section - Knowledge Base */}
      <section id="knowledge-base" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-yellow-400 to-orange-400' 
                  : 'from-yellow-600 to-orange-600'
              } bg-clip-text text-transparent font-sans`}> {/* Changed to font-sans */}
                Knowledge Base
              </h2>
              <p className={`text-xl font-sans ${ /* Changed to font-sans */
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              } max-w-3xl mx-auto`}>
                Insights, tutorials, and research from the intersection of cybersecurity, 
                AI, and modern development practices.
              </p>
            </div>

            {/* Featured Article */}
            <Card className={`mb-12 overflow-hidden ${
              isDarkMode 
                ? 'bg-gray-900/50 border-yellow-500/30' 
                : 'bg-white/50 border-yellow-600/30'
            } backdrop-blur-md`}>
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={initialBlogPosts[0].image || "/placeholder.svg"} 
                    alt={initialBlogPosts[0].title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge className={`${
                      isDarkMode 
                        ? 'bg-yellow-600/20 text-yellow-400 border-yellow-400/30' 
                        : 'bg-yellow-600/20 text-yellow-600 border-yellow-600/30'
                    } font-sans`}> {/* Changed to font-sans */}
                      Featured
                    </Badge>
                    <Badge variant="outline" className={`font-sans ${ /* Changed to font-sans */
                      isDarkMode 
                        ? 'border-gray-600 text-gray-400' 
                        : 'border-gray-400 text-gray-600'
                    }`}>
                      {initialBlogPosts[0].category}
                    </Badge>
                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-4 font-sans ${ /* Changed to font-sans */
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {initialBlogPosts[0].title}
                  </h3>
                  
                  <p className={`text-lg mb-6 font-sans ${ /* Changed to font-sans */
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {initialBlogPosts[0].excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className={`text-sm font-sans ${ /* Changed to font-sans */
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      <span>{initialBlogPosts[0].readTime}</span> • 
                      <span className="ml-1">{new Date(initialBlogPosts[0].date).toLocaleDateString()}</span>
                    </div>
                    <Button className={`${
                      isDarkMode 
                        ? 'bg-yellow-600 hover:bg-yellow-700' 
                        : 'bg-yellow-600 hover:bg-yellow-700'
                    } font-sans`}> {/* Changed to font-sans */}
                      Read Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Article Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {initialBlogPosts.slice(1).map((post, index) => (
                <Card 
                  key={post.id}
                  className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-gray-900/30 border-gray-700/30 hover:border-yellow-500/40' 
                      : 'bg-white/30 border-gray-300/30 hover:border-yellow-600/40'
                  } backdrop-blur-md overflow-hidden`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image || "/placeholder.svg"} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className={`${
                        isDarkMode 
                          ? 'bg-black/50 text-yellow-400 border-yellow-400/30' 
                          : 'bg-white/50 text-yellow-600 border-yellow-600/30'
                      } font-sans`}> {/* Changed to font-sans */}
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className={`text-lg font-sans ${ /* Changed to font-sans */
                      isDarkMode ? 'text-white group-hover:text-yellow-400' : 'text-gray-900 group-hover:text-yellow-600'
                    } transition-colors`}>
                      {post.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className={`text-sm font-sans ${ /* Changed to font-sans */
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag, idx) => (
                        <Badge 
                          key={idx} 
                          variant="outline" 
                          className={`text-xs font-sans ${ /* Changed to font-sans */
                            isDarkMode 
                              ? 'border-gray-600 text-gray-400' 
                              : 'border-gray-400 text-gray-600'
                          }`}
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                      <div className={`flex items-center text-xs font-sans ${ /* Changed to font-sans */
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                      <span className={`text-xs font-sans ${ /* Changed to font-sans */
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {post.readTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Knowledge Categories */}
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: 'Cybersecurity', icon: Shield, count: 12, color: 'from-red-500 to-pink-500' },
                { name: 'AI & ML', icon: Brain, count: 8, color: 'from-purple-500 to-indigo-500' },
                { name: 'Development', icon: Code, count: 15, color: 'from-blue-500 to-cyan-500' },
                { name: 'Research', icon: Search, count: 6, color: 'from-green-500 to-teal-500' }
              ].map((category, index) => (
                <Card 
                  key={category.name}
                  className={`text-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-gray-900/30 border-gray-700/30 hover:border-yellow-500/40' 
                      : 'bg-white/30 border-gray-300/30 hover:border-yellow-600/40'
                  } backdrop-blur-md`}
                >
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                      <category.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`font-semibold mb-2 font-sans ${ /* Changed to font-sans */
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {category.name}
                    </h3>
                    <p className={`text-sm font-sans ${ /* Changed to font-sans */
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {category.count} articles
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Contact Node */}
      <section id="contact-node" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-cyan-400 to-blue-400' 
                  : 'from-cyan-600 to-blue-600'
              } bg-clip-text text-transparent font-sans`}> {/* Changed to font-sans */}
                Connect with Me
              </h2>
              <p className={`text-xl font-sans ${ /* Changed to font-sans */
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              } max-w-3xl mx-auto`}>
                Ready to collaborate on innovative projects or discuss opportunities 
                in cybersecurity and development.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <Card className={`${
                  isDarkMode 
                    ? 'bg-gray-900/50 border-cyan-500/30' 
                    : 'bg-white/50 border-cyan-600/30'
                } backdrop-blur-md`}>
                  <CardHeader>
                    <CardTitle className={`font-sans ${ /* Changed to font-sans */
                      isDarkMode ? 'text-cyan-400' : 'text-cyan-600'
                    } flex items-center`}>
                      <Network className="w-5 h-5 mr-2" />
                      Connection Endpoints
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[
                      { icon: Mail, label: 'Email Protocol', value: 'sarwansai483@gmail.com', href: 'mailto:sarwansai483@gmail.com' },
                      { icon: Github, label: 'Code Repository', value: 'https://github.com/sarwansai', href: 'https://github.com/sarwansai' },
                      { icon: Linkedin, label: 'Professional Network', value: 'https://linkedin.com/in/maddipati-sarwansai', href: 'https://linkedin.com/in/maddipati-sarwansai' },
                      { icon: MapPin, label: 'Physical Location', value: 'Vijayawada, India', href: null }
                    ].map((contact, index) => (
                    <div key={index} className="flex items-center space-x-4 group">
                      <div className={`p-3 rounded-lg ${
                        isDarkMode 
                          ? 'bg-cyan-600/20 group-hover:bg-cyan-600/30' 
                          : 'bg-cyan-600/20 group-hover:bg-cyan-600/30'
                      } transition-colors duration-300`}>
                        <contact.icon className={`w-6 h-6 ${
                          isDarkMode ? 'text-cyan-400' : 'text-cyan-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className={`font-semibold font-sans ${ /* Changed to font-sans */
                          isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                          {contact.label}
                        </div>
                        {contact.href ? (
                          <a 
                            href={contact.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`font-sans ${ /* Changed to font-sans */
                              isDarkMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'
                            } transition-colors duration-300`}
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <div className={`font-sans ${ /* Changed to font-sans */
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {contact.value}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  </CardContent>
                </Card>

                {/* Status Card */}
                <Card className={`${
                  isDarkMode 
                    ? 'bg-gray-900/50 border-green-500/30' 
                    : 'bg-white/50 border-green-600/30'
                } backdrop-blur-md`}>
                  <CardHeader>
                    <CardTitle className={`font-sans ${ /* Changed to font-sans */
                      isDarkMode ? 'text-green-400' : 'text-green-600'
                    } flex items-center`}>
                      <Activity className="w-5 h-5 mr-2" />
                      System Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`font-sans ${ /* Changed to font-sans */
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Availability
                      </span>
                      <Badge className={`bg-green-600/20 text-green-400 border-green-400/30 font-sans`}> {/* Changed to font-sans */}
                        ONLINE
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`font-sans ${ /* Changed to font-sans */
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Response Time
                      </span>
                      <span className={`font-sans ${ /* Changed to font-sans */
                        isDarkMode ? 'text-green-400' : 'text-green-600'
                      }`}>
                        {'< 24 hours'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`font-sans ${ /* Changed to font-sans */
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Collaboration Status
                      </span>
                      <span className={`font-sans ${ /* Changed to font-sans */
                        isDarkMode ? 'text-green-400' : 'text-green-600'
                      }`}>
                        ACCEPTING
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="flex space-x-4">
                  <Button 
                    size="lg"
                    className={`flex-1 ${
                      isDarkMode 
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700' 
                        : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700'
                    } text-white font-sans`} /* Changed to font-sans */
                    asChild
                  >
                    <a href="mailto:sarwansai483@gmail.com">
                      <Mail className="w-5 h-5 mr-2" />
                      Send Message
                    </a>
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className={`font-sans ${ /* Changed to font-sans */
                      isDarkMode 
                        ? 'border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white' 
                        : 'border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white'
                    }`}
                    asChild
                  >
                    <a href="/sarwan-cv.pdf" download="Maddipati_Sarwansai_CV.pdf"> {/* Updated href and added download attribute */}
                      <Download className="w-5 h-5 mr-2" />
                      Download CV
                    </a>
                  </Button>
                </div>
              </div>

              {/* Contact Form */}
              <Card className={`${
                isDarkMode 
                  ? 'bg-gray-900/50 border-cyan-500/30' 
                  : 'bg-white/50 border-cyan-600/30'
              } backdrop-blur-md`}>
                <CardHeader>
                  <CardTitle className={`font-sans ${ /* Changed to font-sans */
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  } flex items-center`}>
                    <MessageCircle className={`w-5 h-5 mr-2 ${
                      isDarkMode ? 'text-cyan-400' : 'text-cyan-600'
                    }`} />
                    Secure Message Interface
                  </CardTitle>
                  <p className={`font-sans ${ /* Changed to font-sans */
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Encrypted communication channel for project inquiries and collaboration.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST" className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Input 
                        placeholder="Your Name" 
                        className={`font-sans ${ /* Changed to font-sans */
                          isDarkMode 
                            ? 'bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-400' 
                            : 'bg-white/50 border-gray-400 text-gray-900 placeholder:text-gray-500 focus:border-cyan-600'
                        } backdrop-blur-sm`}
                      />
                      <Input 
                        type="email" 
                        placeholder="Your Email" 
                        className={`font-sans ${ /* Changed to font-sans */
                          isDarkMode 
                            ? 'bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-400' 
                            : 'bg-white/50 border-gray-400 text-gray-900 placeholder:text-gray-500 focus:border-cyan-600'
                        } backdrop-blur-sm`}
                      />
                    </div>
                    
                    <Input 
                      placeholder="Subject" 
                      className={`font-sans ${ /* Changed to font-sans */
                        isDarkMode 
                          ? 'bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-400' 
                          : 'bg-white/50 border-gray-400 text-gray-900 placeholder:text-gray-500 focus:border-cyan-600'
                        } backdrop-blur-sm`}
                    />
                    
                    <Textarea 
                      placeholder="Your Message" 
                      rows={6}
                      className={`font-sans ${ /* Changed to font-sans */
                        isDarkMode 
                          ? 'bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-400' 
                          : 'bg-white/50 border-gray-400 text-gray-900 placeholder:text-gray-500 focus:border-cyan-600'
                        } backdrop-blur-sm`}
                    />
                    
                    <Button 
                      size="lg"
                      className={`w-full font-sans ${ /* Changed to font-sans */
                        isDarkMode 
                          ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700' 
                          : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700'
                      } text-white transform hover:scale-105 transition-all duration-300`}
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Transmit Message
                      <Sparkles className="w-5 h-5 ml-2" />
                    </Button>
                  </form>
                  
                  <div className={`text-center text-xs font-sans ${ /* Changed to font-sans */
                    isDarkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    🔒 End-to-end encrypted • Response within 24 hours
                  </div>
                  <div className={`text-center text-xs mt-2 font-sans ${ /* Changed to font-sans */
                    isDarkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    (Replace `YOUR_FORMSPREE_ID` with your actual Formspree form ID to enable submissions)
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

              {/* AI Image Generator Section */}
      <section id="ai-image-generator" className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-yellow-400 to-orange-400' 
                  : 'from-yellow-600 to-orange-600'
              } bg-clip-text text-transparent font-sans`}> {/* Changed to font-sans */}
                AI Image Forge
              </h2>
              <p className={`text-xl font-sans ${ /* Changed to font-sans */
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              } max-w-3xl mx-auto`}>
                Unleash creativity: Generate stunning visuals with AI. Describe your vision, and watch it come to life.
              </p>
            </div>

            <Card className={`${
              isDarkMode 
                ? 'bg-gray-900/50 border-yellow-500/30' 
                : 'bg-white/50 border-yellow-600/30'
            } backdrop-blur-md p-8`}>
              <CardHeader className="text-center mb-6">
                <CardTitle className={`font-sans ${ /* Changed to font-sans */
                  isDarkMode ? 'text-white' : 'text-gray-900'
                } flex items-center justify-center`}>
                  <Lightbulb className={`w-6 h-6 mr-2 ${
                    isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
                  }`} />
                  Generate New Visuals
                </CardTitle>
                <p className={`font-sans ${ /* Changed to font-sans */
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Enter a detailed prompt to create an AI-generated image.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <Textarea
                  placeholder="A cyberpunk city at night with neon signs and flying cars, highly detailed, cinematic lighting"
                  rows={4}
                  value={aiImagePrompt}
                  onChange={(e) => setAiImagePrompt(e.target.value)}
                  className={`font-sans ${ /* Changed to font-sans */
                    isDarkMode 
                      ? 'bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-400' 
                      : 'bg-white/50 border-gray-400 text-gray-900 placeholder:text-gray-500 focus:border-yellow-600'
                  } backdrop-blur-sm`}
                />
                {imageGenerationError && (
                  <p className="text-red-500 text-sm text-center font-sans\">{imageGenerationError}</p> {/* Changed to font-sans */}
                )}
                <Button
                  size="lg"
                  onClick={handleGenerateImage}
                  disabled={isGeneratingImage || !aiImagePrompt.trim()}
                  className={`w-full font-sans ${ /* Changed to font-sans */
                    isGeneratingImage 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : isDarkMode 
                        ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700' 
                        : 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700'
                  } text-white transform hover:scale-105 transition-all duration-300`}
                >
                  {isGeneratingImage ? (
                    <>
                      <Zap className="w-5 h-5 mr-2 animate-pulse" />
                      Forging Image...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>

                {generatedImageUrl && (
                  <div className="mt-8 text-center">
                    <h3 className={`text-xl font-semibold mb-4 font-sans ${ /* Changed to font-sans */
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      Generated Image:
                    </h3>
                    <img
                      src={generatedImageUrl || "/placeholder.svg"}
                      alt="AI Generated"
                      className="w-full max-w-xl mx-auto rounded-lg shadow-lg border border-yellow-500/30"
                    />
                    <p className={`mt-4 text-sm font-sans ${ /* Changed to font-sans */
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Right-click or long-press to save the image.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

        {/* Footer */}
        <footer className={`py-12 border-t ${
          isDarkMode ? 'border-gray-800' : 'border-gray-300'
        }`}>
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className={`w-12 h-12 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                    : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                } rounded-lg flex items-center justify-center relative overflow-hidden`}>
                  <span className="text-white font-bold text-xl relative z-10">MS</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
                <div>
                  <h3 className={`font-bold text-xl font-sans ${ /* Changed to font-sans */
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Maddipati Sarwansai
                  </h3>
                  <p className={`text-sm font-sans ${ /* Changed to font-sans */
                    isDarkMode ? 'text-purple-400' : 'text-blue-600'
                  }`}>
                    Cybersecurity & Software Engineer {/* Changed title */}
                  </p>
                </div>
              </div>
              
              <p className={`mb-8 text-lg font-sans ${ /* Changed to font-sans */
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                "Securing the digital frontier through intelligent code and ethical innovation."
              </p>
              
              <div className="flex justify-center space-x-8 mb-8">
                <a 
                  href="mailto:sarwansai483@gmail.com" 
                  className={`font-sans ${ /* Changed to font-sans */
                    isDarkMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'
                  } transition-colors duration-300 transform hover:scale-110`}
                >
                  <Mail className="w-8 h-8" />
                </a>
                <a 
                  href="https://github.com/sarwansai" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-sans ${ /* Changed to font-sans */
                    isDarkMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'
                  } transition-colors duration-300 transform hover:scale-110`}
                >
                  <Github className="w-8 h-8" />
                </a>
                <a 
                  href="https://linkedin.com/in/maddipati-sarwansai" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-sans ${ /* Changed to font-sans */
                    isDarkMode ? 'text-gray-400 hover:text-cyan-400' : 'text-gray-600 hover:text-cyan-600'
                  } transition-colors duration-300 transform hover:scale-110`}
                >
                  <Linkedin className="w-8 h-8" />
                </a>
              </div>
              
              <div className={`text-sm font-sans ${ /* Changed to font-sans */
                isDarkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>
                © 2024 Maddipati Sarwansai • Neural Interface v2.0 • All rights reserved
              </div>
            </div>
          </div>
        </footer>
      </div>
  )\
}

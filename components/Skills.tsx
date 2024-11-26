'use client'

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Code, FileCode, Globe, Palette, Server, Layers, Zap, Coffee, Terminal, GitBranch, Database, Cloud, MessageSquare, Brain, Clock, Users, BookOpen, Award, PenTool, Figma as FigmaIcon, Box, Layout, Framer, Lightbulb } from 'lucide-react'

const skillCategories = [
  {
    name: "Languages & Frameworks",
    emoji: "🚀",
    skills: [
      { name: "Java", icon: Coffee, color: "bg-red-400" },
      { name: "JavaScript", icon: FileCode, color: "bg-yellow-400" },
      { name: "HTML", icon: Globe, color: "bg-orange-400" },
      { name: "CSS", icon: Palette, color: "bg-blue-400" },
      { name: "Node.js", icon: Server, color: "bg-green-400" },
      { name: "React", icon: Code, color: "bg-cyan-400" },
      { name: "Bootstrap", icon: Layers, color: "bg-purple-400" },
      { name: "Spring Boot", icon: Zap, color: "bg-green-500" },
      { name: "Vite", icon: Zap, color: "bg-yellow-500" },
      { name: "Tailwind CSS", icon: Palette, color: "bg-teal-400" },
      { name: "jQuery", icon: Code, color: "bg-blue-500" },
      { name: "REST APIs", icon: Server, color: "bg-red-500" },
    ]
  },
  {
    name: "Development Tools",
    emoji: "🛠️",
    skills: [
      { name: "Eclipse", icon: Terminal, color: "bg-purple-400" },
      { name: "VS Code", icon: Code, color: "bg-blue-400" },
      { name: "IntelliJ IDEA", icon: Terminal, color: "bg-pink-400" },
      { name: "Git", icon: GitBranch, color: "bg-orange-400" },
      { name: "GitHub", icon: GitBranch, color: "bg-gray-600" },
      { name: "Tomcat", icon: Server, color: "bg-yellow-500" },
      { name: "Power BI", icon: Layers, color: "bg-yellow-400" },
    ]
  },
  {
    name: "Databases & Deployment",
    emoji: "☁️",
    skills: [
      { name: "MySQL", icon: Database, color: "bg-blue-500" },
      { name: "MongoDB", icon: Database, color: "bg-green-400" },
      { name: "Netlify", icon: Cloud, color: "bg-teal-400" },
      { name: "Railway", icon: Server, color: "bg-purple-400" },
      { name: "Appwrite", icon: Layers, color: "bg-red-500" },
    ]
  },
  {
    name: "Design Tools",
    emoji: "🎨",
    skills: [
      { name: "Axure RP", icon: PenTool, color: "bg-blue-400" },
      { name: "Figma", icon: FigmaIcon, color: "bg-purple-400" },
      { name: "StarUML", icon: Box, color: "bg-red-400" },
      { name: "Balsamiq", icon: PenTool, color: "bg-gray-500" },
      { name: "Wireframing", icon: Layout, color: "bg-green-400" },
      { name: "Framer", icon: Framer, color: "bg-blue-400" },
    ]
  },
  {
    name: "Soft Skills",
    emoji: "🧠",
    skills: [
      { name: "Communication", icon: MessageSquare, color: "bg-blue-400" },
      { name: "Problem Solving", icon: Brain, color: "bg-red-400" },
      { name: "Time Management", icon: Clock, color: "bg-green-400" },
      { name: "Teamwork", icon: Users, color: "bg-yellow-400" },
      { name: "Strong Learning", icon: BookOpen, color: "bg-purple-400" },
      { name: "Leadership", icon: Award, color: "bg-orange-400" },
    ]
  },
]

export function SkillsPage() {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  const titleInView = useInView(titleRef, { once: false, amount: 0.1 });

  
const titleVariants = {
  hidden: { opacity: 0, y: -50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
      scale: {
        type: "spring",
        damping: 15,
        stiffness: 300,
        restDelta: 0.001
      }
    }
  }
}
const iconVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -180 },
  visible: { 
    opacity: 0.5, 
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
      scale: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      }
    }
  },
  animate: {
    rotate: 360,
    scale: [1, 1.2, 1],
    transition: { 
      duration: 5, 
      repeat: Infinity, 
      ease: "linear",
      scale: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut"
      }
    }
  }
}




  return (
    <motion.section 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 text-foreground p-4 sm:p-8 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          ref={titleRef}
          className="mb-16 relative"
          variants={titleVariants}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
        >
          <motion.h1 
            className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
          >
            Skills
          </motion.h1>
          <motion.div
            className="absolute -top-12 -left-12 text-gray-300 dark:text-gray-700 opacity-50"
            variants={iconVariants}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            whileInView="animate"
          >
            <Lightbulb className="w-24 h-24" />
          </motion.div>
        </motion.div>

        {skillCategories.map((category, categoryIndex) => {
          const categoryProgress = useTransform(
            scrollYProgress,
            [
              0.1 + categoryIndex * 0.15,
              0.2 + categoryIndex * 0.15,
              0.8 + categoryIndex * 0.15,
              0.9 + categoryIndex * 0.15
            ],
            [0, 1, 1, 0]
          )

          return (
            <motion.div
              key={category.name}
              className="mb-16"
              style={{
                opacity: categoryProgress,
              }}
            >
              <motion.h2 
                className="text-3xl sm:text-4xl font-semibold mb-8 text-center text-gray-700 dark:text-gray-300"
              >
                {category.emoji} {category.name}
              </motion.h2>
              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
              >
                {category.skills.map((skill, index) => {
                  const skillProgress = useTransform(
                    scrollYProgress,
                    [
                      0.1 + categoryIndex * 0.15 + index * 0.02,
                      0.2 + categoryIndex * 0.15 + index * 0.02,
                      0.7 + categoryIndex * 0.15 + index * 0.02,
                      0.8 + categoryIndex * 0.15 + index * 0.02
                    ],
                    [0, 1, 1, 0]
                  )

                  return (
                    <motion.div
                      key={skill.name}
                      className="flex flex-col items-center justify-center"
                      style={{
                        opacity: skillProgress,
                        scale: useTransform(skillProgress, [0, 1], [0.5, 1]),
                      }}
                    >
                      <motion.div 
                        className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center mb-2 overflow-hidden"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <div className={`w-16 h-16 ${skill.color} rounded-full flex items-center justify-center`}>
                          <skill.icon className="h-8 w-8 text-white" />
                        </div>
                      </motion.div>
                      <h3 className="text-center text-sm font-medium">{skill.name}</h3>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}


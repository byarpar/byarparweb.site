'use client'

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Code, Server, Database, Palette, GitBranch, Cpu } from 'lucide-react'

const ExpertiseIcon = () => (
  <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export function Expertise() {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

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

  const expertise = [
    {
      name: "Frontend Development",
      icon: Code,
      description: "Building interactive and responsive user interfaces!",
      technologies: ["React", "Vue", "JavaScript", "HTML", "CSS", "Tailwind CSS", "Bootstrap", "jQuery", "Vite"],
      gradient: "from-blue-400 to-purple-500",
    },
    {
      name: "Backend Development",
      icon: Server,
      description: "Creating robust server-side applications and APIs!",
      technologies: ["Java", "Node.js", "Spring Boot", "REST APIs", "Tomcat","Express"],
      gradient: "from-green-400 to-teal-500",
    },
    {
      name: "Database Management",
      icon: Database,
      description: "Organizing and managing data efficiently!",
      technologies: ["MySQL", "MongoDB","Appwrite"],
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      name: "UI/UX Design",
      icon: Palette,
      description: "Designing intuitive and appealing user experiences!",
      technologies: ["Figma", "Axure RP", "StarUML", "Balsamiq", "Wireframing", "Framer"],
      gradient: "from-pink-400 to-red-500",
    },
    {
      name: "Version Control",
      icon: GitBranch,
      description: "Managing code and collaborating effectively!",
      technologies: ["Git", "GitHub"],
      gradient: "from-indigo-400 to-purple-500",
    },
   
    {
      name: "Full-Stack Integration",
      icon: Cpu,
      description: "Bringing it all together for complete solutions!",
      technologies: ["MERN Stack", "Java Full-Stack", "RESTful Architecture"],
      gradient: "from-emerald-400 to-teal-500",
    },
  ]

  return (
    <section 
      ref={containerRef}
      className="bg-gradient-to-b from-background via-background to-primary/10 text-foreground py-16 overflow-hidden relative"
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
            My Expertise
          </motion.h1>
        
          <motion.div
            className="absolute -top-12 -left-12 text-gray-300 dark:text-gray-700 opacity-50"
            variants={iconVariants}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            whileInView="animate"
          >
            <ExpertiseIcon />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertise.map((skill, index) => {
            const cardProgress = useTransform(
              scrollYProgress,
              [0, 0.2 + index * 0.05, 0.8 + index * 0.05, 1],
              [0, 1, 1, 0]
            )
            const cardScale = useTransform(cardProgress, [0, 1], [0.8, 1])
            const cardRotate = useTransform(cardProgress, [0, 1], [-10, 0])

            return (
              <motion.div
                key={skill.name}
                style={{ scale: cardScale, rotate: cardRotate }}
                className="bg-gray-100 dark:bg-gray-900 p-6 rounded-3xl shadow-lg border-2 border-gray-300 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <motion.div 
                  className="flex items-center mb-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                >
                  <div className={`p-3 rounded-full bg-gradient-to-br ${skill.gradient} mr-4`}>
                    <skill.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">{skill.name}</h3>
                </motion.div>
                <motion.p 
                  className="text-base text-gray-700 dark:text-gray-300 mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 * index, duration: 0.5 }}
                >
                  {skill.description}
                </motion.p>
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech, techIndex) => (
                    <motion.span 
                      key={tech} 
                      className="bg-white dark:bg-black text-gray-900 dark:text-gray-100 px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 hover:scale-110 cursor-pointer border border-gray-300 dark:border-gray-700"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 * index + 0.1 * techIndex, duration: 0.3 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


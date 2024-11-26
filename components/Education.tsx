'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar, ChevronRight, GraduationCap } from 'lucide-react'
import Image from 'next/image'

const educationData = [
  {
    institution: "LITHAN EDUCLAAS",
    logo: "/images/avatar1.png",
    qualification: "Pearson BTEC International Level 3 Foundation Diploma",
    years: "2022 - 2023",
    certificateLink: "https://example.com/certificate1"
  },
  {
    institution: "BASIC EDUCATION HIGH SCHOOL",
    logo: "/images/avatar2.png",
    qualification: "Grade 10",
    years: "2016 - 2017",
    certificateLink: "https://example.com/certificate2"
  }
]

export function EducationPage() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [100, 0, 0, -100])

  const smoothScale = useSpring(scale, { stiffness: 100, damping: 20 })
  const smoothY = useSpring(y, { stiffness: 100, damping: 20 })

  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: false, amount: 0.5 })

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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 text-foreground p-4 sm:p-8 transition-colors duration-300"
      style={{ opacity }}
    >
      <div className="container mx-auto py-12 relative">
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
            Education
          </motion.h1>
        
          <motion.div
            className="absolute -top-12 -left-12 text-gray-300 dark:text-gray-700 opacity-50"
            variants={iconVariants}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            whileInView="animate"
          >
            <GraduationCap className="w-24 h-24" />
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          style={{ scale: smoothScale, y: smoothY }}
        >
          {educationData.map((edu, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              custom={index}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.5 }}
            >
              <Card className="overflow-hidden rounded-3xl shadow-lg dark:shadow-gray-800 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <motion.div 
                      className="w-24 h-24 rounded-2xl overflow-hidden mr-6 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <Image src={edu.logo} alt={`${edu.institution} logo`} width={80} height={80} className="object-contain" />
                    </motion.div>
                    <div>
                      <motion.h2 
                        className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        {edu.institution}
                      </motion.h2>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <Badge variant="secondary" className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                          <Calendar className="w-4 h-4 mr-2" />
                          {edu.years}
                        </Badge>
                      </motion.div>
                    </div>
                  </div>
                  <motion.p 
                    className="text-gray-600 dark:text-gray-300 mb-8 text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {edu.qualification}
                  </motion.p>
                  <motion.div
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                  >
                    <Button 
                      asChild 
                      variant="secondary"
                      className="w-full justify-between bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 border-none rounded-full py-6"
                    >
                      <motion.a 
                        href={edu.certificateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <span className="flex items-center text-lg">
                          <Award className="w-6 h-6 mr-3" />
                          View Certificate
                        </span>
                        <ChevronRight className="w-6 h-6" />
                      </motion.a>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}


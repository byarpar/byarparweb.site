'use client'

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Github, Linkedin, Facebook, Hexagon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export function HomePage() {
  const [currentSkill, setCurrentSkill] = useState(0)
  const skills = ["React", "TypeScript","Node.js", "Html", "Tailwind CSS","Mysql","Railway","Vite","Java", "JavaScript","Spring Boot","Git","REST APIs"]

  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % skills.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [skills.length])

  const socialLinks = [
    { Icon: Linkedin, href: "https://www.linkedin.com/in/byar-par/" },
    { Icon: Github, href: "https://github.com/byarpar" },
    { Icon: Facebook, href: "https://www.facebook.com/byar.par" }
  ]

  const driftAnimation = {
    x: [0, 10, 0, -10, 0],
    y: [0, -10, 0, 10, 0],
    transition: {
      x: {
        repeat: Infinity,
        duration: 20,
        ease: "easeInOut",
      },
      y: {
        repeat: Infinity,
        duration: 15,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="min-h-screen to-primary/10 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" aria-hidden="true" />
      <motion.div 
        className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 max-w-7xl w-full z-10"
        style={{ opacity, scale }}
      >
        <motion.div
          className="w-full lg:w-1/2 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-6xl sm:text-7xl lg:text-8xl xl:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
          >
            BYAR PAR
          </motion.h1>

          <motion.h2
            className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            Full-Stack Developer & UI/UX Designer
          </motion.h2>
          <motion.div
            className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={currentSkill}
                className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base font-medium"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {skills[currentSkill]}
              </motion.span>
            </AnimatePresence>
          </motion.div>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto text-sm sm:text-base bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900"
            >
              <motion.span
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Hire Me
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.span>
              </motion.span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-sm sm:text-base border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-gray-900"
              asChild
            >
              <motion.a
                href="https://drive.google.com/file/d/1O0QKRVcg6jPBYdhopiglTzLco6h1zVdq/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Download CV
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </motion.a>
            </Button>
          </motion.div>
          <motion.div
            className="flex gap-4 sm:gap-6 mt-6 sm:mt-8 justify-center lg:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {socialLinks.map(({ Icon, href }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 dark:text-white" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          className="w-full lg:w-1/2 flex justify-center items-center mt-8 lg:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]"
            animate={driftAnimation}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 dark:from-gray-600 dark:via-gray-700 dark:to-gray-800 rounded-full opacity-50"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="absolute inset-0 bg-white dark:bg-gray-800 rounded-full overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/home.jpg" 
                alt="Byar Par"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-gray-200/50 to-transparent dark:from-gray-800/50 dark:to-transparent"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            {[...Array(6)].map((_, index) => {
              const top = `${(index * 20) % 100}%`;
              const left = `${(index * 25) % 100}%`;
              return (
                <motion.div
                  key={index}
                  className="absolute w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"
                  style={{
                    top,
                    left,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 5 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Hexagon className="w-full h-full text-gray-400 dark:text-gray-600 opacity-50" />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>
      
      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          className="w-4 h-8 sm:w-6 sm:h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full p-1"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <motion.div
            className="w-1 h-2 bg-gray-400 dark:bg-gray-600 rounded-full mx-auto"
            initial={{ y: 0 }}
            animate={{ y: 10 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}


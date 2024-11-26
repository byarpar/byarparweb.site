'use client'

import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion"
import { Play, Clock, Calendar, CheckCircle, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { Card, CardContent } from "./ui/card"

export function AboutPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const containerRef = useRef(null)
  const titleRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8])
  const imageRotate = useTransform(scrollYProgress, [0, 0.5, 1], [0, 10, -10])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 0.5, 0])

  const isInView = useInView(containerRef, { once: false, amount: 0.1 })
  const titleInView = useInView(titleRef, { once: false, amount: 0.1 });

  const staggerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }
    }),
  }

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }

 
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
    
    <motion.div 
      ref={containerRef} 
      className=" min-h-screen relative overflow-hidden "
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/10"
        style={{ y: backgroundY }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-12">
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
            About Me
          </motion.h1>

          <motion.div
            className="absolute -top-12 -left-12 text-gray-300 dark:text-gray-700 opacity-50"
            variants={iconVariants}
            initial="hidden"
            animate={titleInView ? "visible" : "hidden"}
            whileInView="animate"
          >
            <User className="w-24 h-24" />
          </motion.div>
        </motion.div>
        <motion.div 
          className="flex flex-col lg:flex-row items-start justify-between gap-12"
          style={{ opacity: contentOpacity }}
        >
          <div className="w-full lg:w-1/2">
            <br/>   <br/>   <br/>
            <motion.div 
              className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full flex items-center justify-center overflow-hidden mx-auto mb-8"
              style={{ scale: imageScale, rotate: imageRotate }}
              animate={floatingAnimation}
            >
              <div className="w-full h-full relative">
              <Image
                src="/images/about.jpg" 
                alt="Byar Par"
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent dark:from-white/30 dark:to-transparent rounded-full" />
              </div>
            </motion.div>
          </div>
          <motion.div 
            className="w-full lg:w-1/2"
            style={{ msScrollLimitYMin: textY }}
          >
            <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <motion.h2 
                  className="text-2xl font-bold mb-4 text-gray-900 dark:text-white"
                  variants={staggerVariants}
                  custom={1}
                >
                   Hello, I'm Byar Par. 🙋‍♂️
                </motion.h2>
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
                  variants={staggerVariants}
                  custom={2}
                >
                  <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
                    <Clock className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="font-semibold">Available</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Online 24/7</p>
                    </div>
                  </motion.div>
                  <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
                    <Calendar className="w-6 h-6 text-blue-500" />
                    <div>
                      <p className="font-semibold">2</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Years of Experience</p>
                    </div>
                  </motion.div>
                  <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
                    <CheckCircle className="w-6 h-6 text-purple-500" />
                    <div>
                      <p className="font-semibold">15+</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</p>
                    </div>
                  </motion.div>
                </motion.div>
                <motion.p 
                  className="text-base sm:text-lg leading-relaxed space-y-4"
                  variants={staggerVariants}
                  custom={3}
                >
                  I'm a <span className="font-semibold text-gray-900 dark:text-white">full-stack developer and designer</span> from Myitkyina, Myanmar, studying at Educlaas Academy, Lithan College. I specialize in frontend and backend development, using technologies like HTML, CSS, JavaScript, React, Java, Spring Boot, and Node.js to create smooth web applications.
                </motion.p>
                <motion.p 
                  className="text-base sm:text-lg leading-relaxed mt-4"
                  variants={staggerVariants}
                  custom={4}
                >
                  With strong skills in <span className="font-semibold text-gray-900 dark:text-white">database management</span> (MySQL, MongoDB) and <span className="font-semibold text-gray-700 dark:text-gray-300">UI/UX design</span> (Axure RP, Figma), I aim to deliver efficient, user-friendly digital experiences. My native language is Burmese.
                </motion.p>
              </CardContent>
            </Card>
    
            <motion.div 
              className="mt-6"
              variants={staggerVariants}
              custom={5}
            >
              <Button
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                onClick={() => setIsVideoModalOpen(true)}
              >
                Watch Introduction
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Play className="h-5 w-5" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            className="fixed inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl max-w-4xl w-full border border-gray-200 dark:border-gray-700"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">Introduction Video</h3>
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-2xl mb-6 overflow-hidden">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/W329e_ZqiAU?si=Yb0mKxidqhAvvcaJ&amp;controls=0" 
                  title="YouTube video player" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  className="w-full h-full object-cover"
                ></iframe>
              </div>
              <Button 
                onClick={() => setIsVideoModalOpen(false)}
                className="bg-gray-900/80 dark:bg-white/80 hover:bg-gray-900 dark:hover:bg-white text-white dark:text-gray-900 transition-colors duration-300 rounded-full"
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}


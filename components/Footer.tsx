"use client"

import { useState, useEffect } from "react"
import { Linkedin, Github, ArrowUp } from 'lucide-react'
import { motion, useAnimation, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRef } from "react"

export function FooterComponent() {
  const [isVisible, setIsVisible] = useState(false)
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/byar-par", ariaLabel: "Visit LinkedIn profile" },
    { icon: Github, href: "https://github.com/byarpar", ariaLabel: "Visit GitHub profile" },
  ]

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <footer ref={ref} className="bg-gradient-to-b from-background via-background to-primary/10 text-foreground py-16 overflow-hidden relative">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="container mx-auto px-4 relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="flex justify-center space-x-6 mb-8"
        >
          {socialLinks.map((item, index) => (
            <motion.a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform duration-300"
              whileHover={{ y: -5 }}
              aria-label={item.ariaLabel}
              variants={itemVariants}
            >
              <item.icon className="w-8 h-8 text-primary hover:text-secondary transition-colors duration-300" />
            </motion.a>
          ))}
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Byar Par. All rights reserved.
          </p>
        </motion.div>
      </motion.div>
      {isVisible && (
        <motion.div
          className="fixed bottom-8 right-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            onClick={scrollToTop}
            className="rounded-full p-3 bg-primary hover:bg-primary/90 text-primary-foreground"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </Button>
        </motion.div>
      )}
    </footer>
  )
}


"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, Menu, X } from 'lucide-react'

// Custom hook for managing dark mode
const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true"
    setDarkMode(isDark)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode)
    localStorage.setItem("darkMode", darkMode.toString())
  }, [darkMode])

  return [darkMode, setDarkMode] as const
}

export function NavBar() {
  const [darkMode, setDarkMode] = useDarkMode()
  const [activeItem, setActiveItem] = useState("HOME")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const navItems = [
    { name: "HOME" },
    { name: "ABOUT" },
    { name: "SKILLS" },
    { name: "EDUCATION" },
    { name: "PROJECTS" },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Animation variants
  const menuVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: "-100%" },
  }

  const navBarVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -50 },
  }

  const circleVariants = {
    animate: {
      x: [0, 10, 0, -10, 0],
      y: [0, -10, 0, 10, 0],
      transition: {
        x: { repeat: Infinity, duration: 5, ease: "easeInOut" },
        y: { repeat: Infinity, duration: 7, ease: "easeInOut" },
      },
    },
  }

  const navItemVariants = {
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  }

  // Effect for handling scroll and removing tap highlight on mobile
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      * {
        -webkit-tap-highlight-color: transparent;
      }
    `
    document.head.appendChild(style)

    let lastScrollY = window.pageYOffset
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY < 50)
      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      document.head.removeChild(style)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-lg transition-colors duration-300"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={navBarVariants}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-20">
              {/* Logo */}
              <motion.div
                className="flex items-center space-x-2 relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
              >
                <motion.svg
                  className="w-12 h-12 sm:w-14 sm:h-14 text-gray-900 dark:text-white absolute"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  variants={circleVariants}
                  whileHover="animate"
                >
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </motion.svg>
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white ml-10 sm:ml-12">
                  ᏰᎮ
                </span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    className="relative"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 120 }}
                  >
                    <motion.a
                      href={`#${item.name.toLowerCase()}`}
                      className={`px-2 py-1 lg:px-3 lg:py-2 rounded-md text-sm lg:text-base font-medium ${
                        activeItem === item.name
                          ? "text-primary"
                          : "text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary"
                      } transition-colors duration-300`}
                      onClick={() => setActiveItem(item.name)}
                      variants={navItemVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <motion.span
                        initial={{ y: 0 }}
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {item.name}
                      </motion.span>
                    </motion.a>
                    {activeItem === item.name && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        layoutId="activeIndicator"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Contact, Dark Mode Toggle, and Menu Button */}
              <div className="flex items-center space-x-2 md:space-x-4">
                {/* Contact button (desktop) */}
                <motion.a
                  href="#contact"
                  className="hidden md:flex items-center px-3 py-2 rounded-md text-sm lg:text-base font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300"
                  onClick={() => setActiveItem("CONTACT")}
                  variants={navItemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
              
                  CONTACT
                </motion.a>

                <motion.button
                  className="p-1 sm:p-2 rounded-full focus:outline-none"
                  onClick={() => setDarkMode(!darkMode)}
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-yellow-500" />
                  ) : (
                    <Moon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />
                  )}
                </motion.button>
                <motion.button
                  className="md:hidden p-1 sm:p-2 rounded-full hover:bg-gray-800 focus:outline-none"
                  onClick={toggleMenu}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={isMenuOpen}
                >
                  {isMenuOpen ? (
                    <X className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  ) : (
                    <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  )}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="fixed inset-x-0 top-16 sm:top-20 bg-white dark:bg-gray-900 z-50 md:hidden"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                transition={{ duration: 0.3, type: "spring", stiffness: 120 }}
              >
                <div className="flex flex-col items-center justify-center py-4 space-y-2 sm:space-y-4">
                  {[...navItems, { name: "CONTACT" }].map((item, index) => (
                    <motion.div
                      key={item.name}
                      className="relative w-full"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1, type: "spring", stiffness: 120 }}
                    >
                      <motion.a
                        href={`#${item.name.toLowerCase()}`}
                        className={`flex items-center justify-center px-4 py-2 text-base sm:text-lg font-medium ${
                          activeItem === item.name
                            ? "text-primary"
                            : "text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary"
                        } transition-colors duration-300 w-full text-center`}
                        onClick={() => {
                          setActiveItem(item.name)
                          setIsMenuOpen(false)
                        }}
                        variants={navItemVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                       
                        <motion.span
                          initial={{ y: 0 }}
                          whileHover={{ y: -2 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {item.name}
                        </motion.span>
                      </motion.a>
                      {activeItem === item.name && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                          layoutId="mobileActiveIndicator"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}


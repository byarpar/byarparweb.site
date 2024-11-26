'use client'

import { useState, useRef } from "react"
import { motion, useInView, useScroll } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Facebook, Linkedin, Github, Send } from 'lucide-react'

const contactInfo = [
  { icon: Mail, text: "byarpar0@gmail.com", href: "mailto:byarpar0@gmail.com" },
  { icon: Phone, text: "+95 9770 386642", href: "tel:+959770386642" },
]

const socialMedia = [
  { name: "Facebook", href: "https://www.facebook.com/byarpar", icon: Facebook },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/byar-par/", icon: Linkedin },
  { name: "GitHub", href: "https://github.com/byarpar", icon: Github },
]

export function ContactForm() {
  const [] = useState(false)
  const containerRef = useRef(null)
  const titleRef = useRef(null);
  useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const titleInView = useInView(titleRef, { once: false, amount: 0.1 });
  
  const [formState, setFormState] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const formRef = useRef<HTMLDivElement>(null)
  const contactInfoRef = useRef<HTMLDivElement>(null)
 
  const formInView = useInView(formRef, { once: true })
  const contactInfoInView = useInView(contactInfoRef, { once: true })
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      })
      if (response.ok) {
        setSubmitStatus('success')
        setFormState({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 text-foreground p-4 sm:p-8 flex flex-col items-center justify-center transition-colors duration-300">
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
          Let's Connect!
        </motion.h1>
      
        <motion.div
          className="absolute -top-12 -left-12 text-gray-300 dark:text-gray-700 opacity-50"
          variants={iconVariants}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          whileInView="animate"
        >
         
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <div className="flex flex-col md:flex-row">
          {/* Contact Info Section */}
          <motion.div 
            ref={contactInfoRef}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: contactInfoInView ? 1 : 0, x: contactInfoInView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:w-1/2 bg-gray-100 dark:bg-gray-800 p-8 text-gray-900 dark:text-white"
          >
            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
            <p className="mb-8 text-gray-600 dark:text-gray-300">I'm always open to new opportunities and collaborations. Feel free to reach out!</p>
            <div className="space-y-6">
              {contactInfo.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.href}
                  className="flex items-center space-x-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                  whileHover={{ x: 10 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: contactInfoInView ? 1 : 0, x: contactInfoInView ? 0 : -20 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <method.icon className="w-6 h-6" aria-hidden="true" />
                  <span>{method.text}</span>
                </motion.a>
              ))}
            </div>
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: contactInfoInView ? 1 : 0, y: contactInfoInView ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <h3 className="text-xl font-semibold mb-4">Follow Me</h3>
              <div className="flex space-x-4">
                {socialMedia.map((platform, index) => (
                  <motion.a
                    key={index}
                    href={platform.href}
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: contactInfoInView ? 1 : 0, y: contactInfoInView ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow me on ${platform.name}`}
                  >
                    <platform.icon className="w-6 h-6" aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Message Form */}
          <motion.div 
            ref={formRef}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: formInView ? 1 : 0, x: formInView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:w-1/2 p-8 bg-white dark:bg-gray-900"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { name: "name", label: "Your Name", type: "text" },
                { name: "email", label: "Your Email", type: "email" },
                { name: "message", label: "Your Message", type: "textarea" }
              ].map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: formInView ? 1 : 0, y: formInView ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <label htmlFor={field.name} className="sr-only">{field.label}</label>
                  {field.type === "textarea" ? (
                    <Textarea 
                      id={field.name}
                      placeholder={field.label}
                      className="w-full h-40 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-gray-500 dark:focus:border-gray-400 rounded-lg p-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      required
                      value={formState[field.name as keyof typeof formState]}
                      onChange={(e) => setFormState({ ...formState, [field.name]: e.target.value })}
                    />
                  ) : (
                    <Input 
                      id={field.name}
                      type={field.type}
                      placeholder={field.label}
                      className="w-full bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:border-gray-500 dark:focus:border-gray-400 rounded-lg p-4 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      required
                      value={formState[field.name as keyof typeof formState]}
                      onChange={(e) => setFormState({ ...formState, [field.name]: e.target.value })}
                    />
                  )}
                </motion.div>
              ))}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: formInView ? 1 : 0, y: formInView ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <Button 
                  type="submit" 
                  className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:bg-gray-800 dark:hover:bg-gray-100 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                  disabled={
isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      Sending
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
                      >
                        ...
                      </motion.span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Send Message
                      <Send className="ml-2 w-5 h-5" aria-hidden="true" />
                    </span>
                  )}
                </Button>
              </motion.div>
              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 dark:text-green-400"
                >
                  Message sent successfully!
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 dark:text-red-400"
                >
                  An error occurred. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}


'use client'

import { AboutPage } from '@/components/About'
import { ContactForm } from '@/components/ContactForm'
import { EducationPage } from '@/components/Education'
import { Expertise } from '@/components/Expertise'
import { FooterComponent } from '@/components/Footer'
import { HomePage } from '@/components/Home'
import { Loading } from '@/components/loading'
import { NavBar } from '@/components/Navbar'
import { ProjectsPage } from '@/components/Projects'
import { SkillsPage } from '@/components/Skills'
import { useState, useEffect } from 'react'

export default function Home() {
  const [activeSection, setActiveSection] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const sections = [
    { id: 'home', component: <HomePage /> },
    { id: 'about', component: <AboutPage /> },
    { id: 'server', component: <Expertise /> },
    { id: 'skills', component: <SkillsPage /> },
    { id: 'education', component: <EducationPage /> },
    { id: 'projects', component: <ProjectsPage /> },
    { id: 'contact', component: <ContactForm /> },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY + window.innerHeight / 2
      const newActiveSection = sections.findIndex((section, index) => {
        const element = document.getElementById(section.id)
        if (!element) return false
        const nextElement = document.getElementById(sections[index + 1]?.id)
        return currentPosition >= element.offsetTop && 
               (!nextElement || currentPosition < nextElement.offsetTop)
      })
      if (newActiveSection !== -1) setActiveSection(newActiveSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000) // 1 second loading time, adjust as needed

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="relative">
      <NavBar />
      {sections.map(({ id, component }) => (
        <section key={id} id={id} className="min-h-screen py-16">
          {component}
        </section>
      ))}
      <FooterComponent />
    </div>
  )
}


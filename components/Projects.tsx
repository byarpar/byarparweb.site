'use client'

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView, useScroll } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Github, Briefcase, Code, Box, PiggyBank, Users, Car, Utensils, BookOpen, Trees, Calculator, ShoppingBag, Newspaper, CheckSquare } from 'lucide-react' 
import Image from 'next/image'

const projects = [
  {
    name: "DoBu Material Art",
    description: "A gym website showcasing features, classes, and amenities.",
    image: "/images/projects-images/img2.png",
    technologies: [
      { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "Bootstrap", url: "https://getbootstrap.com/" },
      { name: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    ],
    demoLink: "https://dobumaterialart.netlify.app/",
    githubLink: "https://github.com/byarpar/DoBu_Material_Art",
    icon: "dumbbell",
    category: "Frontend"
  },
  {
    name: "In-A-Box",
    description: "Boosting online presence and enhancing customer interaction for businesses.",
    image: "/images/projects-images/img3.png",
    technologies: [
      { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "Bootstrap", url: "https://getbootstrap.com/" },
      { name: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    ],
    demoLink: "https://inaboxweb.netlify.app/",
    githubLink: "https://github.com/byarpar/In-A-Box",
    icon: "box",
    category: "Frontend"
  },
  {
    name: "Enomy Finance",
    description: "A financial system tailored to support the industry's unique needs.",
    image: "/images/projects-images/img8.png",
    technologies: [
      { name: "Java", url: "https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html" },
      { name: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { name: "MySQL", url: "https://www.mysql.com/" },
    ],
    demoLink: "https://example.com/enomy-finance-demo",
    githubLink: "https://github.com/byarpar/Enomy_Finance",
    icon: "piggy-bank",
    category: "Backend"
  },
  {
    name: "KnowYourNeighbourHood",
    description: "Social login integration to enhance user engagement and experience for a local neighborhood app.",
    image: "/images/projects-images/img6.png",
    technologies: [
      { name: "Java", url: "https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html" },
      { name: "ReactJS", url: "https://reactjs.org/" },
      { name: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { name: "MySQL", url: "https://www.mysql.com/" },
    ],
    demoLink: "https://example.com/know-your-neighbourhood-demo",
    githubLink: "https://github.com/byarpar/KnowYourNeighbourHood",
    icon: "users",
    category: "Backend"
  },
  {
    name: "XYZ Car Portal",
    description: "An online used car sales portal focusing on Risk-Based Testing (RBT) for quality assurance.",
    image: "/images/projects-images/img7.png",
    technologies: [
      { name: "Java", url: "https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html" },
      { name: "SpringBoot", url: "https://spring.io/projects/spring-boot" },
      { name: "ReactJS", url: "https://reactjs.org/" },
      { name: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { name: "MySQL", url: "https://www.mysql.com/" },
    ],
    demoLink: "https://example.com/xyz-car-portal-demo",
    githubLink: "https://github.com/byarpar/springboot_car_portal_demo",
    icon: "car",
    category: "Backend"
  },
  {
    name: "Meals on Wheels",
    description: "A website for an organization delivering meals to those in need, with weekend support functionality.",
    image: "/images/projects-images/img1.png",
    technologies: [
      { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "Java", url: "https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html" },
      { name: "SpringBoot", url: "https://spring.io/projects/spring-boot" },
      { name: "MySQL", url: "https://www.mysql.com/" },
      { name: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    ],
    demoLink: "https://full-stack-spring-boot-production.up.railway.app/login",
    githubLink: "https://github.com/byarpar/Full-Stack-Spring-Boot",
    icon: "utensils",
    category: "Backend"
  },
  {
    name: "Training Department",
    description: "A course registration and summary portal for training programs.",
    image: "/images/projects-images/CiA_Mod5.png",
    technologies: [
      { name: "Java", url: "https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html" },
      { name: "MySQL", url: "https://www.mysql.com/" },
      { name: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    ],
    demoLink: "https://byarpar.github.io/cia_mod5_Training/",
    githubLink: "https://github.com/byarpar/cia_mod5_Training",
    icon: "book-open",
    category: "Backend"
  },
  {
    name: "Go Wild Wild Life Park",
    description: "Informational website for a wildlife park, showcasing park features and animal exhibits.",
    image: "/images/projects-images/gwwlp.png",
    technologies: [
      { name: "Java", url: "https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html" },
      { name: "MySQL", url: "https://www.mysql.com/" },
      { name: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    ],
    demoLink: "https://byarpar.github.io/gowild_wildlife_park/",
    githubLink: "https://github.com/byarpar/gowild_wildlife_park",
    icon: "tree",
    category: "Frontend"
  },
  {
    name: "Math Quiz",
    description: "A mobile quiz app featuring three difficulty levels and developed with Android",
    image: "/images/projects-images/img5.png",
    technologies: [
      { name: "Java", url: "https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html" },
      { name: "Android Studio", url: "https://developer.android.com/studio" },
    ],
    demoLink: "https://example.com/math-quiz-demo",
    githubLink: "https://example.com/math-quiz-github",
    icon: "calculator",
    category: "Android Studio"
  },
  {
    name: "BoutiQa",
    description: "A mobile quiz app featuring three difficulty levels and developed with Android",
    image: "/images/projects-images/img4.png",
    technologies: [
      { name: "AxureRP 10", url: "https://www.axure.com/" },
    ],
    demoLink: "https://hpm2pn.axshare.com/?g=4",
    githubLink: "https://github.com/byarpar/UI-UX",
    icon: "shopping-bag",
    category: "UI/UX"
  },
  {
    name: "Online News Portal",
    description: "A role-based user management system for an online news platform.",
    image: "/images/projects-images/image.png",
    technologies: [
      { name: "Liferay", url: "https://www.liferay.com/" },
    ],
    demoLink: "https://example.com/online-news-portal-demo",
    githubLink: "https://example.com/online-news-portal-github",
    icon: "newspaper",
    category: "Liferay"
  },
  {
    name: "To-Do List application",
    description: "A simple and functional to-do list app for managing daily tasks.",
    image: "/images/projects-images/todo.png",
    technologies: [
      { name: "React", url: "https://reactjs.org/" },
      { name: "Node.js", url: "https://nodejs.org/" },
      { name: "MongoDB", url: "https://www.mongodb.com/" },
    ],
    demoLink: "https://byarpar-todolist-app.netlify.app/",
    githubLink: "https://github.com/byarpar/ToDoList",
    icon: "check-square",
    category: "Backend"
  }
]

const categories = ["All", "Backend", "Frontend", "UI/UX", "Android Studio", "Liferay"]

export function ProjectsPage() {

  const [] = useState(false)
  const containerRef = useRef(null)
  const titleRef = useRef(null);
  useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })


  const titleInView = useInView(titleRef, { once: false, amount: 0.1 });

  
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  const isInView = useInView(containerRef, { once: false, amount: 0.1 })
  
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      dumbbell: <Briefcase className="h-6 w-6" />,
      box: <Box className="h-6 w-6" />,
      "piggy-bank": <PiggyBank className="h-6 w-6" />,
      users: <Users className="h-6 w-6" />,
      car: <Car className="h-6 w-6" />,
      utensils: <Utensils className="h-6 w-6" />,
      "book-open": <BookOpen className="h-6 w-6" />,
      tree: <Trees className="h-6 w-6" />,
      calculator: <Calculator className="h-6 w-6" />,
      "shopping-bag": <ShoppingBag className="h-6 w-6" />,
      newspaper: <Newspaper className="h-6 w-6" />,
      "check-square": <CheckSquare className="h-6 w-6" />,
    }
    return icons[iconName] || <Briefcase className="h-6 w-6" />
  }

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
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
  
  return (
    <motion.div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 text-foreground p-4 sm:p-8 transition-colors duration-300"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
    >
      <div className="container mx-auto py-12">
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
          variants={fadeInUpVariants}
        >
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
              Projects
            </motion.h1>

            <motion.div
              className="absolute -top-12 -left-12 text-gray-300 dark:text-gray-700 opacity-50"
              variants={iconVariants}
              initial="hidden"
              animate={titleInView ? "visible" : "hidden"}
              whileInView="animate"
            >
              <Briefcase className="w-24 h-24" />
            </motion.div>
          </motion.div>
          <motion.div 
            className="flex flex-wrap gap-2"
            variants={staggerContainer}
          >
            {categories.map((category) => (
              <motion.div
                key={category}
                variants={fadeInUpVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.name}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover="hover"
                whileTap="tap"
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                layout
              >
                  <Card className="overflow-hidden h-full flex flex-col bg-card/50 backdrop-blur-sm border-primary/10 shadow-lg transition-all duration-300 rounded-2xl">
                  <CardHeader className="p-0">
                    <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                    <Image 
                          src={project.image} 
                          alt={`${project.name} project screenshot`}
                          width={300}
                          height={200}
                          className="object-cover w-full h-full"
                        />

                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/70  to-transparent flex items-end justify-start p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <CardTitle className="text-white text-xl sm:text-2xl font-bold flex items-center">
                          {getIcon(project.icon)}
                          <span className="ml-2">{project.name}</span>
                        </CardTitle>
                      </motion.div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow p-4">
                    <motion.p 
                      className="text-sm text-gray-600 dark:text-gray-300 mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {project.description}
                    </motion.p>
                    <motion.div 
                      className="flex flex-wrap gap-2"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      {project.technologies.map((tech) => (
                        <motion.div
                          key={tech.name}
                          variants={fadeInUpVariants}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                         <Badge variant="secondary" className="flex items-center bg-primary/10 text-primary rounded-full px-3 py-1">
                            <Code className="mr-1 h-3 w-3" />
                            <a href={tech.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                              {tech.name}
                            </a>
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                  <CardFooter className="p-4 flex justify-between">
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.2 }}
                          className="flex gap-2"
                        >
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button variant="outline" size="sm" asChild className="rounded-full">
                              <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                <Play className="mr-2 h-4 w-4" /> View Demo
                              </a>
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button variant="outline" size="sm" asChild className="rounded-full">
                              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                <Github className="mr-2 h-4 w-4" /> GitHub
                              </a>
                            </Button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}


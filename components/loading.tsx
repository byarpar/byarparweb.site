'use client'

import { motion } from 'framer-motion'

const beeVariants = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 5, 0, -5, 0],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "easeInOut",
    },
  },
}

const wingVariants = {
  animate: {
    rotate: [0, 20, 0, -20, 0],
    transition: {
      repeat: Infinity,
      duration: 0.2,
      ease: "linear",
    },
  },
}

const cloudVariants = {
  animate: (custom: number) => ({
    x: [0, custom, 0],
    transition: {
      repeat: Infinity,
      duration: 10 + custom / 5,
      ease: "linear",
    },
  }),
}

const birdVariants = {
  animate: (custom: number) => ({
    x: [0, custom, 0],
    y: [0, custom / 2, 0],
    transition: {
      repeat: Infinity,
      duration: 5 + custom / 10,
      ease: "easeInOut",
    },
  }),
}

const loadingDotVariants = {
  animate: {
    y: [0, -5, 0],
    opacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: "easeInOut",
    },
  },
}

export  function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white overflow-hidden">
      <div className="text-center">
        <div className="relative w-96 h-96">
          {/* Clouds */}
          {[1, 2, 3].map((index) => (
            <motion.svg
              key={`cloud-${index}`}
              width="120"
              height="60"
              viewBox="0 0 120 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute"
              style={{
                top: `${index * 25}%`,
                left: `${index * 30}%`,
              }}
              custom={-50 - index * 20}
              variants={cloudVariants}
              animate="animate"
            >
              <path
                d="M10 40 C10 20 30 20 40 30 C50 10 80 10 90 30 C100 20 110 30 110 40 C110 50 100 50 90 50 C80 60 40 60 30 50 C20 50 10 50 10 40"
                fill="#E6F3FF"
                stroke="#87CEEB"
                strokeWidth="2"
              />
            </motion.svg>
          ))}

          {/* Birds */}
          {[1, 2].map((index) => (
            <motion.svg
              key={`bird-${index}`}
              width="40"
              height="20"
              viewBox="0 0 40 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute"
              style={{
                top: `${index * 15}%`,
                right: `${index * 20}%`,
              }}
              custom={100 + index * 50}
              variants={birdVariants}
              animate="animate"
            >
              <path
                d="M0 10 Q10 0 20 10 Q30 20 40 10"
                stroke="#87CEEB"
                strokeWidth="2"
                fill="none"
              />
            </motion.svg>
          ))}

          {/* Bee */}
          <motion.svg
            width="128"
            height="128"
            viewBox="0 0 128 128"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            variants={beeVariants}
            animate="animate"
          >
            {/* Body */}
            <motion.path
              d="M64 96C86.0914 96 104 78.0914 104 56C104 33.9086 86.0914 16 64 16C41.9086 16 24 33.9086 24 56C24 78.0914 41.9086 96 64 96Z"
              fill="#FCD34D"
            />
            {/* Stripes */}
            <path d="M44 56H84" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
            <path d="M48 72H80" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
            {/* Head */}
            <circle cx="64" cy="40" r="16" fill="#000000" />
            {/* Eyes */}
            <circle cx="58" cy="36" r="4" fill="#FFFFFF" />
            <circle cx="70" cy="36" r="4" fill="#FFFFFF" />
            {/* Antenna */}
            <path d="M56 28C56 28 48 16 40 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
            <path d="M72 28C72 28 80 16 88 12" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
            {/* Wings */}
            <motion.path
              d="M40 48C40 48 24 32 16 40C8 48 24 64 24 64"
              stroke="#87CEEB"
              strokeWidth="4"
              fill="#E6F3FF"
              variants={wingVariants}
              animate="animate"
            />
            <motion.path
              d="M88 48C88 48 104 32 112 40C120 48 104 64 104 64"
              stroke="#87CEEB"
              strokeWidth="4"
              fill="#E6F3FF"
              variants={wingVariants}
              animate="animate"
            />
          </motion.svg>
        </div>

        <motion.div
          className="text-3xl font-bold text-gray-800 mt-8 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="inline-block w-2 h-2 bg-gray-800 rounded-full ml-1"
              variants={loadingDotVariants}
              animate="animate"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
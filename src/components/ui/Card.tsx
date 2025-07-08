import { ReactNode, FC } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export const Card: FC<CardProps> = ({ children, className = '', hover = false }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      className={`bg-white rounded-2xl shadow-md border border-gray-100 transition-all duration-300 ${
        hover ? 'hover:shadow-xl' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  )
}
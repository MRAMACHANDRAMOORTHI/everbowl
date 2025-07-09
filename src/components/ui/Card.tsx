import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  hover = false,
  onClick 
}) => {
  const Component = onClick ? motion.button : motion.div;
  
  return (
    <Component
      whileHover={hover ? { y: -5, scale: 1.02 } : undefined}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={clsx(
        'bg-white rounded-2xl shadow-lg border border-gray-100',
        hover && 'hover:shadow-xl cursor-pointer',
        'transition-all duration-300',
        className
      )}
    >
      {children}
    </Component>
  );
};
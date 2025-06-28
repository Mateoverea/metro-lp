"use client"
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ElegantTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fade-up' | 'slide-in' | 'typewriter' | 'glow';
  delay?: number;
}

/**
 * Elegant Text Component with University-themed Animations
 * 
 * Features:
 * - Multiple animation variants for different contexts
 * - Smooth, professional animations suitable for academic content
 * - Customizable delay for staggered animations
 * - University brand colors integration
 */
export default function ElegantText({ 
  children, 
  className, 
  variant = 'fade-up',
  delay = 0 
}: ElegantTextProps) {

  const variants = {
    'fade-up': {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay 
      }
    },
    'slide-in': {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay 
      }
    },
    'typewriter': {
      initial: { width: 0 },
      animate: { width: "auto" },
      transition: { 
        duration: 1.5, 
        ease: "easeInOut",
        delay 
      }
    },
    'glow': {
      initial: { opacity: 0.7 },
      animate: { 
        opacity: [0.7, 1, 0.7],
        textShadow: [
          "0 0 0px rgba(0, 51, 102, 0.5)",
          "0 0 20px rgba(0, 51, 102, 0.8)",
          "0 0 0px rgba(0, 51, 102, 0.5)"
        ]
      },
      transition: { 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay 
      }
    }
  };

  const currentVariant = variants[variant];

  return (
    <motion.div
      initial={currentVariant.initial}
      animate={currentVariant.animate}
      transition={currentVariant.transition}
      className={cn(
        "inline-block",
        variant === 'typewriter' && "overflow-hidden whitespace-nowrap",
        className
      )}
    >
      {children}
    </motion.div>
  );
} 
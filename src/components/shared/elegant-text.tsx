"use client"

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ElegantTextProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
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
      animate: { opacity: 1, y: 0 }
    },
    'slide-in': {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 }
    },
    'typewriter': {
      initial: { width: 0 },
      animate: { width: "auto" }
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
      }
    }
  };

  const currentVariant = variants[variant];

  return (
    <motion.div
      initial={currentVariant.initial}
      animate={currentVariant.animate}
      transition={{ 
        duration: 0.8,
        delay 
      }}
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
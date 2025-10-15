import React, { useState, useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ContainerTextFlipProps {
  /** Array of words to cycle through in the animation */
  words?: string[];
  /** Time in milliseconds between word transitions */
  interval?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number;
  /** Color theme variant */
  variant?: "primary" | "gradient" | "neon" | "glass" | "orange";
}

export function ContainerTextFlip({
  words = ["revolutionary", "extraordinary", "phenomenal", "incredible"],
  interval = 3500,
  className,
  textClassName,
  animationDuration = 800,
  variant = "orange",
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsAnimating(false);
      }, animationDuration / 2);
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval, animationDuration]);

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return {
          container: "bg-blue-600 text-white shadow-2xl shadow-blue-500/30 border border-blue-400/50",
          glow: "before:bg-blue-500/20"
        };
      case "neon":
        return {
          container: "bg-gray-900 text-cyan-400 shadow-2xl shadow-cyan-500/40 border border-cyan-400/60",
          glow: "before:bg-cyan-400/30"
        };
      case "glass":
        return {
          container: "bg-white/10 backdrop-blur-xl text-white shadow-2xl shadow-black/20 border border-white/20",
          glow: "before:bg-white/10"
        };
      case "orange":
        return {
          container: "bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500 text-white shadow-2xl shadow-orange-500/40 border border-white/20",
          glow: "before:bg-gradient-to-r before:from-orange-500/30 before:via-orange-600/30 before:to-orange-500/30"
        };
      default: // gradient
        return {
          container: "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white shadow-2xl shadow-purple-500/40 border border-white/20",
          glow: "before:bg-gradient-to-r before:from-purple-600/30 before:via-pink-600/30 before:to-orange-500/30"
        };
    }
  };

  const variantClasses = getVariantClasses();

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Animated background glow */}
      <motion.div
        animate={{
          scale: isAnimating ? [1, 1.05, 1] : 1,
          opacity: isAnimating ? [0.8, 1, 0.8] : 0.8,
        }}
        transition={{
          duration: animationDuration / 1000,
          ease: "easeInOut"
        }}
        className={cn(
          "absolute inset-0 rounded-2xl blur-xl",
          variantClasses.glow,
          "before:absolute before:inset-0 before:rounded-2xl before:animate-pulse"
        )}
      />
      
      {/* Main container */}
      <motion.div
        layout
        animate={{
          scale: isAnimating ? [1, 0.98, 1] : 1,
        }}
        transition={{
          duration: animationDuration / 1000,
          ease: "easeInOut",
          layout: { duration: 0.3 }
        }}
        className={cn(
          "relative px-6 py-3 rounded-2xl backdrop-blur-sm",
          "transform-gpu transition-all duration-300",
          variantClasses.container,
          className
        )}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear"
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full"
            style={{
              transform: "skewX(-20deg)",
            }}
          />
        </div>

        {/* Text content with enhanced animations */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={words[currentWordIndex]}
              initial={{ 
                opacity: 0, 
                y: 20,
                filter: "blur(8px)",
                scale: 0.9
              }}
              animate={{ 
                opacity: 1, 
                y: 0,
                filter: "blur(0px)",
                scale: 1
              }}
              exit={{ 
                opacity: 0, 
                y: -20,
                filter: "blur(8px)",
                scale: 1.1
              }}
              transition={{
                duration: animationDuration / 1000,
                ease: [0.25, 0.25, 0, 1],
              }}
              className={cn(
                "text-2xl md:text-3xl lg:text-4xl font-black tracking-tight",
                "text-center whitespace-nowrap",
                textClassName
              )}
            >
              {words[currentWordIndex].split("").map((letter, index) => (
                <motion.span
                  key={`${words[currentWordIndex]}-${index}`}
                  initial={{
                    opacity: 0,
                    y: 10,
                    filter: "blur(4px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    delay: index * 0.03,
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Decorative corners */}
        <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t-2 border-l-2 border-white/30 rounded-tl-lg" />
        <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t-2 border-r-2 border-white/30 rounded-tr-lg" />
        <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b-2 border-l-2 border-white/30 rounded-bl-lg" />
        <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b-2 border-r-2 border-white/30 rounded-br-lg" />
      </motion.div>
    </div>
  );
}


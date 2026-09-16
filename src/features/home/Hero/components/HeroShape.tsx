"use client";

import { forwardRef } from "react";
import { motion } from "motion/react";

const shapeAnimationDelay = 0.6;

export const HeroShape = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div className="relative hidden md:block">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.7,
          delay: shapeAnimationDelay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative transition-transform duration-200 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Background shape */}
        <motion.div
          className="absolute -bottom-10 -right-10 z-[-1] h-2/3 w-2/3 border border-border bg-secondary"
          initial={{ opacity: 0, x: 10, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{
            duration: 0.8,
            delay: shapeAnimationDelay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          style={{ transform: "translateZ(-20px)" }}
        ></motion.div>

        {/* Main square container */}
        <motion.div
          className="relative aspect-square overflow-hidden border border-border"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.9,
            delay: shapeAnimationDelay + 0.1,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
        >
          {/* Background */}
          <motion.div
            className="absolute inset-0 bg-secondary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: shapeAnimationDelay + 0.2 }}
          ></motion.div>

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative h-3/4 w-3/4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: shapeAnimationDelay + 0.3 }}
            >
              {/* Four lines - animate in sequence */}
              <motion.div
                className="absolute top-0 left-0 h-1 w-full bg-foreground"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: shapeAnimationDelay + 0.4 }}
              ></motion.div>
              <motion.div
                className="absolute bottom-0 right-0 h-1 w-full bg-foreground"
                initial={{ scaleX: 0, originX: 1 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: shapeAnimationDelay + 0.5 }}
              ></motion.div>
              <motion.div
                className="absolute top-0 right-0 h-full w-1 bg-foreground"
                initial={{ scaleY: 0, originY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: shapeAnimationDelay + 0.6 }}
              ></motion.div>
              <motion.div
                className="absolute bottom-0 left-0 h-full w-1 bg-foreground"
                initial={{ scaleY: 0, originY: 1 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: shapeAnimationDelay + 0.7 }}
              ></motion.div>

              {/* Center accent */}
              <motion.div
                className="absolute top-1/4 left-1/4 flex h-1/2 w-1/2 items-center justify-center border border-border"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: shapeAnimationDelay + 0.8,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
              >
                <motion.div
                  className="flex h-3/4 w-3/4 items-center justify-center bg-background"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: shapeAnimationDelay + 0.9,
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: shapeAnimationDelay + 1.0,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                  >
                    <div className="h-8 w-8 bg-accent" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
});

HeroShape.displayName = "HeroShape";

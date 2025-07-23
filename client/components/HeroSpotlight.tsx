"use client"

import { Spotlight } from "@/components/ui/spotlight-new";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { APP_NAME } from "./APP_NAMEConfig";

export function HeroSpotlight() {
  return (
    <section className="relative flex items-center justify-center min-h-screen h-screen py-20 overflow-hidden bg-background">
      {/* Animated Spotlight Background */}
      <Spotlight
        gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(250,100%,85%,0.08) 0, hsla(250,100%,60%,0.04) 50%, hsla(250,100%,45%,0) 80%)"
        gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(250,100%,85%,0.06) 0, hsla(250,100%,55%,0.02) 80%, transparent 100%)"
        gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(250,100%,85%,0.04) 0, hsla(250,100%,45%,0.02) 80%, transparent 100%)"
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto px-4 gap-6"
      >
        <Badge className="mb-2 text-base px-4 py-2 bg-primary/80 text-primary-foreground shadow-lg">
          AI-Powered Recommendations
        </Badge>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-primary to-foreground bg-clip-text text-transparent"
        >
          Supercharge Your DSA Journey with {APP_NAME}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-2xl text-muted-foreground mt-2"
        >
          Solve, learn, and get personalized problem recommendations based on your skills, progress, and goals.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 mt-6"
        >
          <Button size="lg" className="px-8 py-4 text-lg shadow-md">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
            See How It Works
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
} 
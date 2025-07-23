"use client"

import { Spotlight } from "@/components/ui/spotlight-new";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { APP_NAME } from "./APP_NAMEConfig";

export function HeroSpotlight() {
  return (
    <section className="relative flex items-center justify-center min-h-screen h-screen py-20 overflow-hidden bg-background">
      {/* Animated Spotlight Background */}
      <Spotlight />
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto px-4 gap-6">
        <Badge className="mb-2 text-base px-4 py-2 bg-primary/80 text-primary-foreground shadow-lg animate-fade-in">
          AI-Powered Recommendations
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-primary to-foreground bg-clip-text text-transparent animate-fade-in-up">
          Supercharge Your DSA Journey with {APP_NAME}
        </h1>
        <p className="text-lg md:text-2xl text-muted-foreground mt-2 animate-fade-in-up delay-100">
          Solve, learn, and get personalized problem recommendations based on your skills, progress, and goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-6 animate-fade-in-up delay-200">
          <Button size="lg" className="px-8 py-4 text-lg shadow-md">
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="px-8 py-4 text-lg">
            See How It Works
          </Button>
        </div>
      </div>
    </section>
  );
} 
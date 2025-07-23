"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

const features = [
  {
    icon: "🤖",
    title: "Personalized Recommendations",
    desc: "Get problem suggestions tailored to your current skills and goals, powered by AI.",
    badge: "AI"
  },
  {
    icon: "📈",
    title: "Skill Progress Tracking",
    desc: "Visualize your growth and mastery across all DSA topics with intuitive charts.",
    badge: "Tracking"
  },
  {
    icon: "🔍",
    title: "Targeted Weakness Analysis",
    desc: "Identify your weak areas instantly and receive focused practice sets.",
    badge: "Insights"
  },
  {
    icon: "📝",
    title: "Smart Study Plans",
    desc: "Follow dynamic study plans that adapt as you improve and solve more problems.",
    badge: "Adaptive"
  },
];

export function FeatureBento() {
  // Simulate loading for animation demo
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-muted/60">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-br from-primary to-foreground bg-clip-text text-transparent animate-fade-in-up">
          Why NeuroCode?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {features.map((feature, i) => (
            <Card
              key={feature.title}
              className="relative overflow-hidden shadow-lg transition-transform duration-500 ease-out transform-gpu opacity-0 scale-95 animate-feature-fade-in"
              style={{ animationDelay: `${i * 120}ms`, animationFillMode: 'forwards' }}
            >
              <CardHeader className="flex flex-col items-center gap-2 pt-8 pb-2">
                {loading ? (
                  <Skeleton className="w-12 h-12 rounded-full mb-2" />
                ) : (
                  <span className="text-4xl">{feature.icon}</span>
                )}
                {loading ? (
                  <Skeleton className="w-28 h-6 rounded mb-1" />
                ) : (
                  <CardTitle className="text-lg text-center">{feature.title}</CardTitle>
                )}
                {loading ? (
                  <Skeleton className="w-16 h-5 rounded" />
                ) : (
                  <Badge className="mt-1" variant="secondary">{feature.badge}</Badge>
                )}
              </CardHeader>
              <CardContent className="flex flex-col items-center pb-8">
                {loading ? (
                  <>
                    <Skeleton className="w-40 h-4 mb-2" />
                    <Skeleton className="w-32 h-4" />
                  </>
                ) : (
                  <CardDescription className="text-center text-base text-muted-foreground">
                    {feature.desc}
                  </CardDescription>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes feature-fade-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-feature-fade-in {
          animation: feature-fade-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </section>
  );
} 
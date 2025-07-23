"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const steps = [
  {
    icon: "📝",
    title: "Sign Up & Set Goals",
    desc: "Create your free account and tell us your target (e.g., job, contest, mastery).",
    progress: 33,
  },
  {
    icon: "💡",
    title: "Solve & Learn",
    desc: "Practice DSA problems tailored to your current level and get instant feedback.",
    progress: 66,
  },
  {
    icon: "🚀",
    title: "Get Smart Recommendations",
    desc: "Receive personalized problem sets and study plans to accelerate your growth.",
    progress: 100,
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-muted/40">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-br from-primary to-foreground bg-clip-text text-transparent animate-fade-in-up">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row gap-10 items-stretch justify-center">
          {steps.map((step, i) => (
            <Card
              key={step.title}
              className="flex-1 flex flex-col items-center shadow-lg opacity-0 translate-y-8 animate-step-fade-in"
              style={{ animationDelay: `${i * 160}ms`, animationFillMode: 'forwards' }}
            >
              <CardHeader className="flex flex-col items-center gap-2 pt-8 pb-2">
                <span className="text-4xl mb-2">{step.icon}</span>
                <CardTitle className="text-lg text-center">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center pb-8">
                <CardDescription className="text-center text-base text-muted-foreground mb-4">
                  {step.desc}
                </CardDescription>
                <Progress value={step.progress} className="w-32 h-2 mb-2" />
                {i === steps.length - 1 && (
                  <Button size="lg" className="mt-4">Get Started</Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes step-fade-in {
          0% { opacity: 0; transform: translateY(32px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-step-fade-in {
          animation: step-fade-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </section>
  );
} 
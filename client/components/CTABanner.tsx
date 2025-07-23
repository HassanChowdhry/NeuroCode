"use client"
import { APP_NAME } from './APP_NAMEConfig'
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CTABanner() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/80 to-accent/60">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="shadow-xl border-0 bg-background/80 animate-cta-fade-in">
          <CardContent className="flex flex-col items-center text-center gap-6 py-10 px-4">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary to-foreground bg-clip-text text-transparent">
              Ready to level up your DSA journey?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Join {APP_NAME} today and unlock personalized problem recommendations, skill tracking, and more. Start for free!
            </p>
            <Button size="lg" className="px-10 py-4 text-lg shadow-md">
              Get Started Now
            </Button>
          </CardContent>
        </Card>
      </div>
      <style jsx global>{`
        @keyframes cta-fade-in {
          0% { opacity: 0; transform: translateY(32px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-cta-fade-in {
          animation: cta-fade-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
      `}</style>
    </section>
  )
} 
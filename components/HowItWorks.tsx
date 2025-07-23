import { Search, Sparkles, BookOpen, CheckCircle } from 'lucide-react'
export function HowItWorks() {
  const steps = [
    { icon: <Search className="h-6 w-6 text-primary-500" />, title: "Sign Up", desc: "Create your free account in seconds." },
    { icon: <Sparkles className="h-6 w-6 text-primary-500" />, title: "Get Recommendations", desc: "AI suggests the best problems for you." },
    { icon: <BookOpen className="h-6 w-6 text-primary-500" />, title: "Learn & Practice", desc: "Solve, get hints, and follow study plans." },
    { icon: <CheckCircle className="h-6 w-6 text-primary-500" />, title: "Track Progress", desc: "See your growth and celebrate wins." }
  ]
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-foreground">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center max-w-xs">
              <div className="mb-3">{step.icon}</div>
              <h3 className="font-semibold text-lg text-foreground">{step.title}</h3>
              <p className="text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 
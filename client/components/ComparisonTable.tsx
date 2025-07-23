import { APP_NAME } from './APP_NAMEConfig'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const features = [
  {
    label: "Personalized Recommendations",
    neurocode: true,
    generic: false,
  },
  {
    label: "Skill Progress Tracking",
    neurocode: true,
    generic: false,
  },
  {
    label: "Weakness Analysis",
    neurocode: true,
    generic: false,
  },
  {
    label: "Adaptive Study Plans",
    neurocode: true,
    generic: false,
  },
  {
    label: "Community Support",
    neurocode: true,
    generic: true,
  },
];

export function ComparisonTable() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-br from-primary to-foreground bg-clip-text text-transparent animate-fade-in-up">
          NeuroCode vs. Generic Platforms
        </h2>
        <Card className="overflow-x-auto shadow-lg animate-fade-in-up">
          <CardHeader className="grid grid-cols-3 gap-2 items-center bg-muted/60 rounded-t-xl">
            <div></div>
            <CardTitle className="text-center text-lg md:text-xl font-bold">{APP_NAME}</CardTitle>
            <CardTitle className="text-center text-lg md:text-xl font-bold">Generic Platform</CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            {features.map((feature, i) => (
              <div key={feature.label} className="grid grid-cols-3 items-center py-4 px-2 md:px-6 text-center text-base md:text-lg animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="text-left font-medium">{feature.label}</div>
                <div>{feature.neurocode ? "✅" : "❌"}</div>
                <div>{feature.generic ? "✅" : "❌"}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
} 
import * as React from "react"
import { cn } from "@/lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, max = 100, className, ...props }, ref) => (
    <div ref={ref} className={cn("w-full bg-muted rounded h-2", className)} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} {...props}>
      <div className="bg-primary-500 h-2 rounded" style={{ width: `${Math.min(100, Math.max(0, (value / max) * 100))}%` }} />
    </div>
  )
)
Progress.displayName = "Progress" 
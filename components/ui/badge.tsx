import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "success" | "outline" | "ghost"
}

const variantClasses = {
  default: "bg-primary-500 text-white",
  secondary: "bg-primary-100 text-primary-700 border border-primary-200",
  success: "bg-success-500 text-white",
  outline: "border border-primary-500 text-primary-500 bg-transparent",
  ghost: "bg-muted text-foreground border border-transparent",
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium transition-colors",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
)
Badge.displayName = "Badge" 
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent flex flex-row justify-between items-end m-2 bg-logo-color-green text-primary-foreground shadow ",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
       
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
      icon?:React.ReactNode,
     
    }

function Badge({ className, variant, icon, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)}  {...props}>
      {props.children}
      {icon}
    </div>
  )
}

export { Badge, badgeVariants }

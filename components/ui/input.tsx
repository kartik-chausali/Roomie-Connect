import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode
  }


const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon,  ...props }, ref) => {
    return (
      <div className="relative flex items-center">
      {icon && (
        <span className="absolute left-0 flex items-center pointer-events-none">
          {icon}
        </span>
      )}
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-searchBar-background px-3 py-1  text-sm shadow-md transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:border-searchBar-border  focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
     </div>
    )
  }
)
Input.displayName = "Input"

export { Input }

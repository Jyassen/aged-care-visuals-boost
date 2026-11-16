import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * YourMedGuy button system.
 * - `amber`  : the single primary conversion action on a screen (Book my free review).
 * - `dark`   : secondary solid action (nav CTA, newsletter submit).
 * - `quiet`  : outlined tertiary action on light grounds.
 * - `quietOnDark` : outlined tertiary action on the ink ground.
 * Pills everywhere; no gradients.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold leading-none ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        amber: "bg-amber text-amber-ink hover:bg-amber-hover shadow-[0_8px_24px_-12px_rgba(217,142,31,0.7)]",
        dark: "bg-ink text-white hover:bg-[#15294A]",
        quiet: "bg-transparent text-ink shadow-[inset_0_0_0_1.5px_#C6D0DF] hover:bg-white hover:shadow-[inset_0_0_0_1.5px_#0E1F3A]",
        quietOnDark: "bg-transparent text-white shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.35)] hover:bg-white/10",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background text-foreground hover:bg-secondary",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-secondary hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline font-semibold",
      },
      size: {
        default: "h-11 px-5 text-[15px]",
        sm: "h-10 px-4 text-sm",
        lg: "h-14 px-7 text-base",
        xl: "h-16 px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

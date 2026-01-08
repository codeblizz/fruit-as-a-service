"use client";

import React, { forwardRef } from "react";
import { cn } from "@/packages/helpers/src/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-ghost-apple transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-blackcurrant hover:bg-primary/90",
        destructive: "bg-gradient-to-br h-8 from-orange via-cherry to-lychee text-ghost-apple hover:bg-apple-red/90",
        outline:
          "border border-input bg-ghost-apple hover:bg-ghost-apple/50 hover:text-quaternary",
        secondary: "bg-secondary text-secondary hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent/50",
        primary: "text-ghost-apple bg-gradient-to-tr from-apple-green via-primary to-kiwi hover:from-apple-green/90 hover:via-primary/90 hover:to-kiwi/90 shadow-lg hover:shadow-xl",
        link: "text-primary underline-offset-4 hover:underline",
        gradient:
          "bg-gradient-to-r from-primary to-secondary text-primary/50 hover:from-primary/90 hover:to-secondary/90",
        fruit:
          "bg-gradient-to-r from-apple-green to-kiwi text-white hover:from-apple-green/90 hover:to-kiwi/90 shadow-lg hover:shadow-xl",
        premium:
          "bg-gradient-to-r from-orange to-mango text-white hover:from-orange/90 hover:to-mango/90 shadow-lg hover:shadow-xl border-2 border-white/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
        pill: "h-10 px-6 py-2 rounded-full",
      },
      animation: {
        none: "",
        bounce: "hover:animate-bounce",
        pulse: "hover:animate-pulse",
        spin: "hover:animate-spin",
        scale: "hover:scale-105 transition-transform",
        shake: "hover:animate-bounce",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "scale",
    },
  }
);

export interface ButtonProps
  extends HTMLMotionProps<"button">,
    VariantProps<typeof buttonVariants> {
  ripple?: boolean;
  asChild?: boolean;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size,
      variant,
      leftIcon,
      children,
      disabled,
      className,
      animation,
      rightIcon,
      ripple = true,
      loading = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const [isClicked, setIsClicked] = React.useState(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;

      if (ripple) {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 300);
      }

      onClick?.(event);
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, animation }),
          loading && "cursor-not-allowed opacity-50",
          isClicked && ripple && "animate-pulse",
          className
        )}
        disabled={disabled || loading}
        onClick={handleClick}
        whileHover={{ scale: animation === "scale" ? 1.05 : 1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };

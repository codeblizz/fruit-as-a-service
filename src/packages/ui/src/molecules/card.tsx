"use client";

import React, { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/packages/helpers/src/utils";

const cardVariants = cva(
  "rounded-lg border bg-card text-card/50 shadow-sm transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-border",
        outlined: "border-2 border-border",
        elevated: "shadow-lg hover:shadow-xl",
        glass: "backdrop-blur-md bg-ghost-apple/10 border-white/20",
        gradient:
          "bg-gradient-to-br from-ghost-apple via-quaternary to-ghost-apple border-0",
        fruit:
          "bg-gradient-to-br from-apple-green/10 via-ghost-apple to-orange/10 border-apple-green/20",
        premium:
          "bg-gradient-to-br from-orange/10 via-ghost-apple to-mango/10 border-orange/20 shadow-lg",
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-1 hover:shadow-lg",
        scale: "hover:scale-[1.02]",
        glow: "hover:shadow-2xl hover:shadow-primary/20",
        tilt: "hover:rotate-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      hover: "lift",
    },
  }
);

export interface CardProps
  extends HTMLMotionProps<"div">,
    VariantProps<typeof cardVariants> {
  interactive?: boolean;
  glowing?: boolean;
  bordered?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      size,
      hover,
      interactive = false,
      glowing = false,
      bordered = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          cardVariants({ variant, size, hover }),
          interactive && "cursor-pointer",
          glowing && "ring-2 ring-primary/20 ring-offset-2",
          bordered && "border-2",
          className
        )}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={
          interactive
            ? {
                y: -4,
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }
            : {}
        }
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));

CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted/50", className)}
    {...props}
  />
));

CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));

CardContent.displayName = "CardContent";

const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));

CardFooter.displayName = "CardFooter";

// Specialized Fruit Card Component
export interface FruitCardProps extends Omit<CardProps, "children"> {
  fruit: {
    id: string;
    name: string;
    price: number;
    image: string;
    category?: string;
    organic?: boolean;
    rating?: number;
    inStock?: boolean;
  };
  onAddToCart?: (fruitId: string) => void;
  onToggleFavorite?: (fruitId: string) => void;
  isFavorite?: boolean;
  showNutrition?: boolean;
}

const FruitCard = forwardRef<HTMLDivElement, FruitCardProps>(
  (
    {
      fruit,
      onAddToCart,
      onToggleFavorite,
      isFavorite = false,
      showNutrition = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        variant="fruit"
        interactive={true}
        className={cn("overflow-hidden group", className)}
        {...props}
      >
        <div className="relative">
          {/* Fruit Image/Emoji */}
          <div className="h-32 bg-gradient-to-br from-quaternary to-ghost-apple flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
            {fruit.image}
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => onToggleFavorite?.(fruit.id)}
            className="absolute top-3 right-3 p-2 rounded-full bg-ghost-apple/80 hover:bg-ghost-apple transition-all"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              {isFavorite ? "❤️" : "🤍"}
            </motion.div>
          </button>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {fruit.organic && (
              <span className="px-2 py-1 bg-apple-green text-white text-xs font-medium rounded-full">
                Organic
              </span>
            )}
            {!fruit.inStock && (
              <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{fruit.name}</CardTitle>
              {fruit.rating && (
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm text-muted/50">
                    {fruit.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-primary">
                ${(fruit.price / 100).toFixed(2)}
              </span>
              {fruit.category && (
                <span className="text-sm text-muted/50 bg-muted px-2 py-1 rounded">
                  {fruit.category}
                </span>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <motion.button
            onClick={() => onAddToCart?.(fruit.id)}
            disabled={!fruit.inStock}
            className="w-full bg-gradient-to-r from-apple-green to-kiwi text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🛒 Add to Cart
          </motion.button>
        </CardFooter>
      </Card>
    );
  }
);

FruitCard.displayName = "FruitCard";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  FruitCard,
  cardVariants,
};

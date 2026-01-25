"use client";

import React from "react";
import { motion } from "framer-motion";
import NextLink from "@/packages/ui/src/atoms/link";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { Card } from "@/packages/ui/src/molecules/card";
import {
  ShoppingCartIcon,
  TruckIcon,
  ShieldCheckIcon,
  ClockIcon,
  StarIcon,
  DollarSignIcon,
  UserIcon,
  SparklesIcon,
} from "lucide-react";

const benefits = [
  {
    icon: ShoppingCartIcon,
    title: "Premium Selection",
    description: "Curated collection of the finest fruits from trusted farms",
    color: "from-apple-green to-kiwi",
  },
  {
    icon: TruckIcon,
    title: "Fast Delivery",
    description: "Same-day delivery available in most metropolitan areas",
    color: "from-orange to-mango",
  },
  {
    icon: ShieldCheckIcon,
    title: "Quality Guarantee",
    description:
      "100% satisfaction guarantee or your money back, no questions asked",
    color: "from-strawberry to-cherry",
  },
  {
    icon: ClockIcon,
    title: "24/7 Support",
    description: "Round-the-clock customer service for all your needs",
    color: "from-grape-purple to-plum",
  },
  {
    icon: DollarSignIcon,
    title: "Best Prices",
    description: "Competitive pricing with bulk discounts and loyalty rewards",
    color: "from-banana to-lemon",
  },
  {
    icon: UserIcon,
    title: "Community Focus",
    description: "Supporting local farmers and sustainable farming practices",
    color: "from-peach to-papaya",
  },
];

const features = [
  {
    title: "Smart Ordering",
    description:
      "AI-powered recommendations based on your preferences and season",
    emoji: "🤖",
  },
  {
    title: "Subscription Plans",
    description: "Weekly or monthly fruit boxes customized to your taste",
    emoji: "📦",
  },
  {
    title: "Nutritional Insights",
    description:
      "Detailed nutritional information and health benefits for every fruit",
    emoji: "📊",
  },
  {
    title: "Recipe Suggestions",
    description:
      "Personalized recipes and serving ideas for your purchased fruits",
    emoji: "👨‍🍳",
  },
];

const testimonials = [
  {
    name: "Jennifer Martinez",
    role: "Nutritionist",
    review:
      "The quality is consistently outstanding. My clients love the variety and freshness!",
    rating: 5,
    avatar: "👩‍⚕️",
  },
  {
    name: "David Kim",
    role: "Restaurant Owner",
    review:
      "Reliable supply chain and premium quality. Perfect for my restaurant's needs.",
    rating: 5,
    avatar: "👨‍🍳",
  },
  {
    name: "Sarah Thompson",
    role: "Health Coach",
    review:
      "Amazing selection of organic fruits. The subscription service is a game-changer!",
    rating: 5,
    avatar: "🏃‍♀️",
  },
];

export default function BuyerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-ghost-apple via-quaternary to-ghost-apple pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/fruit-platter-002.webp')] bg-cover bg-center bg-no-repeat opacity-15"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-apple-green/20 via-transparent to-orange/20"></div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <Fade duration={1200} cascade>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-apple-green via-orange to-strawberry bg-clip-text text-transparent mb-6">
                Buyer
              </h1>
              <h2 className="text-3xl md:text-5xl font-semibold text-primary mb-8">
                Premium Fruits, Delivered Fresh
              </h2>
              <p className="text-xl md:text-2xl text-secondary-text mb-12 max-w-4xl mx-auto leading-relaxed">
                Discover our trusted trade platform offering higher savings,
                supply predictability, and complete traceability from farm to
                your doorstep.
              </p>
            </motion.div>
          </Fade>

          <Zoom duration={1000} delay={500}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <NextLink
                href="/fruits/order"
                isPending={false}
                className="group relative px-10 py-5 bg-gradient-to-r from-apple-green to-kiwi text-ghost-apple font-bold text-xl rounded-full shadow-2xl hover:shadow-apple-green/50 transition-all duration-300 transform hover:scale-105 min-w-[250px]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <ShoppingCartIcon className="w-6 h-6" />
                  Start Shopping
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-kiwi to-apple-green opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </NextLink>

              <NextLink
                href="/fruits/subscription"
                isPending={false}
                className="group relative px-10 py-5 bg-gradient-to-r from-primary to-secondary text-ghost-apple font-bold text-xl rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105 min-w-[250px]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <SparklesIcon className="w-6 h-6" />
                  Try Subscription
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </NextLink>
            </div>
          </Zoom>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Fade duration={1000}>
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Why Choose Our Platform?
              </h3>
              <p className="text-xl text-secondary-text max-w-3xl mx-auto">
                Experience the difference with our premium fruit marketplace
                designed specifically for discerning buyers.
              </p>
            </div>
          </Fade>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Slide key={index} direction="up" delay={index * 100}>
                <motion.div
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  className={`relative p-8 rounded-3xl bg-gradient-to-br ${benefit.color} shadow-xl hover:shadow-2xl transition-all duration-300`}
                >
                  <div className="bg-ghost-apple/95 backdrop-blur-sm rounded-2xl p-6 h-full">
                    <benefit.icon className="w-14 h-14 text-primary mb-4" />
                    <h4 className="text-2xl font-bold text-primary mb-3">
                      {benefit.title}
                    </h4>
                    <p className="text-secondary-text leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              </Slide>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-quaternary/30 to-ghost-apple">
        <div className="max-w-7xl mx-auto">
          <Fade duration={1000}>
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Advanced Features
              </h3>
              <p className="text-xl text-secondary-text max-w-2xl mx-auto">
                Cutting-edge technology meets traditional fruit commerce for an
                unparalleled buying experience.
              </p>
            </div>
          </Fade>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Slide
                key={index}
                direction={index % 2 === 0 ? "left" : "right"}
                delay={index * 150}
              >
                <Card className="p-8 bg-ghost-apple hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{feature.emoji}</div>
                    <div>
                      <h4 className="text-2xl font-bold text-primary mb-3">
                        {feature.title}
                      </h4>
                      <p className="text-secondary-text text-lg leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Slide>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Fade duration={1000}>
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                What Our Buyers Say
              </h3>
              <p className="text-xl text-secondary-text">
                Join thousands of satisfied customers who trust us for their
                fruit needs.
              </p>
            </div>
          </Fade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Slide key={index} direction="up" delay={index * 200}>
                <Card className="p-8 h-full bg-gradient-to-br from-ghost-apple to-quaternary hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">{testimonial.avatar}</div>
                    <div>
                      <h5 className="font-bold text-primary text-lg">
                        {testimonial.name}
                      </h5>
                      <p className="text-secondary-text text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex text-banana mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>

                  <p className="text-secondary-text italic text-lg leading-relaxed">
                    "{testimonial.review}"
                  </p>
                </Card>
              </Slide>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-apple-green/20 via-orange/20 to-strawberry/20">
        <div className="max-w-4xl mx-auto text-center">
          <Fade duration={1000}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-primary to-secondary p-12 rounded-3xl shadow-2xl"
            >
              <ShoppingCartIcon className="w-20 h-20 text-ghost-apple mx-auto mb-6" />
              <h3 className="text-4xl md:text-5xl font-bold text-ghost-apple mb-6">
                Ready to Experience Premium Quality?
              </h3>
              <p className="text-xl text-ghost-apple/90 mb-8 max-w-2xl mx-auto">
                Join our community of satisfied buyers and discover why we're
                the preferred choice for premium fruit procurement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <NextLink
                  href="/fruits/order"
                  isPending={false}
                  className="inline-block px-8 py-4 bg-ghost-apple text-primary font-bold text-lg rounded-full hover:bg-quaternary transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  🛒 Start Shopping Now
                </NextLink>
                <NextLink
                  href="/fruits/subscription"
                  isPending={false}
                  className="inline-block px-8 py-4 border-2 border-ghost-apple text-ghost-apple font-bold text-lg rounded-full hover:bg-ghost-apple hover:text-primary transition-all duration-300 transform hover:scale-105"
                >
                  ✨ Explore Subscriptions
                </NextLink>
              </div>
            </motion.div>
          </Fade>
        </div>
      </section>
    </main>
  );
}

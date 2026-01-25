"use client";

import React from "react";
import { motion } from "framer-motion";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import NextLink from "@/packages/ui/src/atoms/link";
import { Card } from "@/packages/ui/src/molecules/card";
import {
  ChartBarIcon,
  // GlobeAltIcon,
  GlobeIcon,
  ShieldCheckIcon,
  StarIcon,
  TruckIcon,
  LucideRocket,
  LucideHelpingHand,
  DollarSignIcon,
  StoreIcon,
} from "lucide-react";

const sellerBenefits = [
  {
    icon: DollarSignIcon,
    title: "Higher Profits",
    description:
      "Earn up to 40% more compared to traditional wholesale markets",
    color: "from-banana to-lemon",
  },
  {
    icon: GlobeIcon,
    title: "Global Reach",
    description:
      "Access customers worldwide with our extensive distribution network",
    color: "from-apple-green to-kiwi",
  },
  {
    icon: ChartBarIcon,
    title: "Analytics Dashboard",
    description:
      "Real-time insights into sales, pricing trends, and market demand",
    color: "from-grape-purple to-plum",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure Payments",
    description:
      "Guaranteed payments with fraud protection and instant payouts",
    color: "from-strawberry to-cherry",
  },
  {
    icon: TruckIcon,
    title: "Logistics Support",
    description:
      "End-to-end logistics management from farm to customer doorstep",
    color: "from-orange to-mango",
  },
  {
    icon: LucideHelpingHand,
    title: "Dedicated Support",
    description: "Personal account manager and 24/7 seller support team",
    color: "from-peach to-papaya",
  },
];

const features = [
  {
    title: "Smart Pricing",
    description:
      "AI-powered dynamic pricing to maximize your revenue based on market conditions",
    emoji: "💰",
  },
  {
    title: "Inventory Management",
    description:
      "Advanced tools to track stock levels, expiration dates, and optimize harvest timing",
    emoji: "📦",
  },
  {
    title: "Quality Certification",
    description:
      "Professional quality assessment and certification to command premium prices",
    emoji: "🏆",
  },
  {
    title: "Marketing Tools",
    description:
      "Professional product photography, descriptions, and promotional campaigns",
    emoji: "📸",
  },
];

const sellerTestimonials = [
  {
    name: "Maria Rodriguez",
    role: "Organic Farm Owner",
    review:
      "Increased my revenue by 35% in the first year. The platform truly supports small farmers!",
    rating: 5,
    avatar: "👩‍🌾",
  },
  {
    name: "James Patterson",
    role: "Fruit Distributor",
    review:
      "The analytics dashboard helps me understand market trends and price my products optimally.",
    rating: 5,
    avatar: "👨‍💼",
  },
  {
    name: "Lisa Chen",
    role: "Co-op Manager",
    review:
      "Excellent support team and seamless logistics. Our farmers are earning more than ever!",
    rating: 5,
    avatar: "👩‍💼",
  },
];

const stats = [
  { number: "10,000+", label: "Active Sellers" },
  { number: "$50M+", label: "Total Payouts" },
  { number: "99.8%", label: "On-time Deliveries" },
  { number: "4.9/5", label: "Seller Satisfaction" },
];

function SellerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-ghost-apple via-quaternary to-ghost-apple pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/fruit-platter-004.webp')] bg-cover bg-center bg-no-repeat opacity-15"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange/20 via-transparent to-apple-green/20"></div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <Fade duration={1200} cascade>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-orange via-apple-green to-banana bg-clip-text text-transparent mb-6">
                Seller
              </h1>
              <h2 className="text-3xl md:text-5xl font-semibold text-primary mb-8">
                Grow Your Fruit Business
              </h2>
              <p className="text-xl md:text-2xl text-secondary-text mb-12 max-w-4xl mx-auto leading-relaxed">
                Join our trusted trade platform and unlock higher profits,
                global reach, and complete supply chain transparency for your
                premium fruits.
              </p>
            </motion.div>
          </Fade>

          <Zoom duration={1000} delay={500}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <NextLink
                href="/auth/signin"
                isPending={false}
                className="group relative px-10 py-5 bg-gradient-to-r from-orange to-mango text-ghost-apple font-bold text-xl rounded-full shadow-2xl hover:shadow-orange/50 transition-all duration-300 transform hover:scale-105 min-w-[250px]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <LucideRocket className="w-6 h-6" />
                  Start Selling
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-mango to-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </NextLink>

              <NextLink
                href="/fruits/features"
                isPending={false}
                className="group relative px-10 py-5 bg-gradient-to-r from-primary to-secondary text-ghost-apple font-bold text-xl rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105 min-w-[250px]"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <ChartBarIcon className="w-6 h-6" />
                  Learn More
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </NextLink>
            </div>
          </Zoom>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <Zoom key={index} delay={index * 100}>
                <div className="text-ghost-apple">
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </div>
              </Zoom>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4" id="features">
        <div className="max-w-7xl mx-auto">
          <Fade duration={1000}>
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Why Sell With Us?
              </h3>
              <p className="text-xl text-secondary-text max-w-3xl mx-auto">
                Experience the advantages of our comprehensive selling platform
                designed to maximize your profits and simplify operations.
              </p>
            </div>
          </Fade>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sellerBenefits.map((benefit, index) => (
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
                Powerful Selling Tools
              </h3>
              <p className="text-xl text-secondary-text max-w-3xl mx-auto">
                Advanced technology and tools to help you optimize your fruit
                business and maximize profitability.
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

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Fade duration={1000}>
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                How It Works
              </h3>
              <p className="text-xl text-secondary-text">
                Get started in just a few simple steps and start earning more
                from your fruit business.
              </p>
            </div>
          </Fade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Sign Up & Verify",
                description:
                  "Create your seller account and complete our simple verification process",
                icon: "✍️",
              },
              {
                step: "02",
                title: "List Your Products",
                description:
                  "Upload your fruit listings with photos, descriptions, and pricing",
                icon: "📋",
              },
              {
                step: "03",
                title: "Start Earning",
                description:
                  "Receive orders, ship products, and get paid instantly upon delivery",
                icon: "💰",
              },
            ].map((step, index) => (
              <Slide key={index} direction="up" delay={index * 200}>
                <Card className="p-8 text-center bg-ghost-apple hover:shadow-2xl transition-all duration-300">
                  <div className="text-6xl mb-4">{step.icon}</div>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {step.step}
                  </div>
                  <h4 className="text-2xl font-bold text-primary mb-4">
                    {step.title}
                  </h4>
                  <p className="text-secondary-text text-lg leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              </Slide>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-quaternary/20 to-ghost-apple">
        <div className="max-w-7xl mx-auto">
          <Fade duration={1000}>
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                What Our Sellers Say
              </h3>
              <p className="text-xl text-secondary-text">
                Join thousands of successful sellers who have transformed their
                fruit business with our platform.
              </p>
            </div>
          </Fade>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sellerTestimonials.map((testimonial, index) => (
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
      <section className="py-20 px-4 bg-gradient-to-r from-orange/20 via-apple-green/20 to-banana/20">
        <div className="max-w-4xl mx-auto text-center">
          <Fade duration={1000}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-primary to-secondary p-12 rounded-3xl shadow-2xl"
            >
              <StoreIcon className="w-20 h-20 text-ghost-apple mx-auto mb-6" />
              <h3 className="text-4xl md:text-5xl font-bold text-ghost-apple mb-6">
                Ready to Grow Your Business?
              </h3>
              <p className="text-xl text-ghost-apple/90 mb-8 max-w-2xl mx-auto">
                Join our thriving marketplace and start earning more from your
                premium fruits today. Thousands of sellers trust us with their
                business growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <NextLink
                  href="/auth/signup"
                  isPending={false}
                  className="inline-block px-8 py-4 bg-ghost-apple text-primary font-bold text-lg rounded-full hover:bg-quaternary transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  🚀 Start Selling Now
                </NextLink>
                <NextLink
                  href="/contact"
                  isPending={false}
                  className="inline-block px-8 py-4 border-2 border-ghost-apple text-ghost-apple font-bold text-lg rounded-full hover:bg-ghost-apple hover:text-primary transition-all duration-300 transform hover:scale-105"
                >
                  💬 Contact Sales Team
                </NextLink>
              </div>
            </motion.div>
          </Fade>
        </div>
      </section>
    </main>
  );
}

export default SellerPage;

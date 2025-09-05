"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import NextLink from "@/packages/ui/src/atoms/link";
import Card from "@/packages/ui/src/molecules/card";
import Section from "@/packages/ui/src/atoms/section";
import { Fade, Zoom, Slide } from "react-awesome-reveal";
import Paragraph from "@/packages/ui/src/atoms/paragraph";
import HeroSection from "@/packages/ui/src/organisms/hero";
import AuthForm from "@/packages/ui/src/molecules/authForm";
import { 
  ShoppingCartIcon, 
  UserGroupIcon, 
  TruckIcon, 
  ShieldCheckIcon,
  StarIcon,
  HeartIcon
} from "@heroicons/react/24/outline";

const features = [
  {
    icon: ShoppingCartIcon,
    title: "Premium Quality",
    description: "Farm-fresh fruits delivered to your doorstep",
    color: "from-apple-green to-kiwi"
  },
  {
    icon: TruckIcon,
    title: "Fast Delivery",
    description: "Same-day delivery in most areas",
    color: "from-orange to-mango"
  },
  {
    icon: ShieldCheckIcon,
    title: "Guaranteed Fresh",
    description: "100% satisfaction guarantee or money back",
    color: "from-strawberry to-cherry"
  },
  {
    icon: UserGroupIcon,
    title: "Community Driven",
    description: "Supporting local farmers and communities",
    color: "from-grape-purple to-plum"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    review: "The freshest fruits I've ever ordered online! Amazing quality and service.",
    rating: 5,
    fruit: "🍓"
  },
  {
    name: "Mike Chen",
    review: "Fast delivery and great prices. My family loves the variety!",
    rating: 5,
    fruit: "🥭"
  },
  {
    name: "Emma Davis",
    review: "Perfect for my smoothie business. Consistent quality every time.",
    rating: 5,
    fruit: "🍌"
  }
];

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <AuthForm className="w-full max-w-md p-8 shadow-lg" />
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-background via-quaternary to-background">
      <HeroSection />
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Fade duration={1000}>
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Why Choose Us?
              </h3>
              <p className="text-xl text-secondary-text max-w-2xl mx-auto">
                We're committed to bringing you the freshest, highest quality fruits with exceptional service.
              </p>
            </div>
          </Fade>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Slide key={index} direction="up" delay={index * 200}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`relative p-8 rounded-2xl bg-gradient-to-br ${feature.color} shadow-xl hover:shadow-2xl transition-all duration-300`}
                >
                  <div className="bg-primary-text/90 backdrop-blur-sm rounded-2xl p-6 h-full flex flex-col items-center text-center">
                    <feature.icon className="w-12 h-12 text-primary mb-4" />
                    <h4 className="text-xl font-bold text-primary mb-3">
                      {feature.title}
                    </h4>
                    <p className="text-secondary-text">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              </Slide>
            ))}
          </div>
        </div>
      </section>
      {/* Popular Fruits Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-quaternary/20 to-background">
        <div className="max-w-7xl mx-auto">
          <Fade duration={1000}>
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Popular Fruits
              </h3>
              <p className="text-xl text-secondary-text">
                Our customers' favorites - fresh, delicious, and always in season.
              </p>
            </div>
          </Fade>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Strawberries", emoji: "🍓", color: "from-strawberry to-cherry" },
              { name: "Oranges", emoji: "🍊", color: "from-orange to-cantaloupe" },
              { name: "Bananas", emoji: "🍌", color: "from-banana to-lemon" },
              { name: "Apples", emoji: "🍎", color: "from-apple-red to-pomegranate" },
              { name: "Grapes", emoji: "🍇", color: "from-grape-purple to-plum" },
              { name: "Mangoes", emoji: "🥭", color: "from-mango to-papaya" }
            ].map((fruit, index) => (
              <Zoom key={index} delay={index * 100}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`relative p-6 rounded-2xl bg-gradient-to-br ${fruit.color} shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                >
                  <div className="bg-primary-text/90 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-4xl mb-2">{fruit.emoji}</div>
                    <p className="font-semibold text-primary text-sm">{fruit.name}</p>
                  </div>
                </motion.div>
              </Zoom>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Fade duration={1000}>
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                What Our Customers Say
              </h3>
              <p className="text-xl text-secondary-text">
                Don't just take our word for it - hear from our happy customers!
              </p>
            </div>
          </Fade>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Slide key={index} direction="up" delay={index * 200}>
                <Card
                  name=""
                  className="p-8 h-full bg-gradient-to-br from-primary-text to-quaternary hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">{testimonial.fruit}</div>
                    <div className="flex text-banana">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-secondary-text mb-4 italic">
                    "{testimonial.review}"
                  </p>
                  <p className="font-semibold text-primary">
                    - {testimonial.name}
                  </p>
                </Card>
              </Slide>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 px-4 bg-gradient-to-r from-apple-green/10 via-orange/10 to-strawberry/10">
        <div className="max-w-4xl mx-auto text-center">
          <Fade duration={1000}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-primary to-secondary p-12 rounded-3xl shadow-2xl"
            >
              <HeartIcon className="w-16 h-16 text-primary-text mx-auto mb-6" />
              <h3 className="text-3xl md:text-4xl font-bold text-primary-text mb-6">
                Ready to taste the difference?
              </h3>
              <p className="text-xl text-primary-text/90 mb-8">
                Join thousands of satisfied customers who choose fresh, quality fruits delivered daily.
              </p>
              <NextLink
                href="/fruits/order"
                isPending={false}
                className="inline-block px-10 py-4 bg-primary-text text-primary font-bold text-lg rounded-full hover:bg-quaternary transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Order Now 🛒
              </NextLink>
            </motion.div>
          </Fade>
        </div>
      </section>
    </main>
  );
}

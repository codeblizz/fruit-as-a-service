"use client";

import React from "react";
import { motion } from "framer-motion";
import NextLink from "@/packages/ui/src/atoms/link";
import Section from "@/packages/ui/src/atoms/section";
import CONSTANT from "@/packages/helpers/src/constants";
import { Fade, Zoom, Slide } from "react-awesome-reveal";
import Paragraph from "@/packages/ui/src/atoms/paragraph";
import HeroSection from "@/packages/ui/src/organisms/hero";
import { Card } from "@/packages/ui/src/molecules/card";
import { StarIcon, HeartIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-ghost-apple via-quaternary to-ghost-apple">
      <HeroSection />
      <Section className="py-20 px-4 bg-gradient-to-tr from-kiwi/10 via-quaternary to-kiwi/20">
        <div className="max-w-7xl mx-auto">
          <Fade direction="right" duration={1000}>
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Why Choose Us?
              </h3>
              <p className="text-xl text-secondary-text max-w-2xl mx-auto">
                We're committed to bringing you the freshest, highest quality
                fruits with exceptional service.
              </p>
            </div>
          </Fade>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CONSTANT.features.map((feature, index) => (
              <Slide
                key={index}
                direction="right"
                delay={index * 200}
                className=""
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`relative p-8 rounded-2xl h-72 min-h-max bg-gradient-to-br ${feature.color} shadow-xl hover:shadow-2xl transition-all duration-300`}
                >
                  <div className="bg-ghost-apple/90 backdrop-blur-sm rounded-2xl p-6 h-full flex flex-col items-center text-center">
                    <feature.icon className="w-12 h-12 text-primary mb-4" />
                    <h4 className="text-xl font-bold text-primary mb-3">
                      {feature.title}
                    </h4>
                    <p className="text-secondary-text">{feature.description}</p>
                  </div>
                </motion.div>
              </Slide>
            ))}
          </div>
        </div>
      </Section>
      {/* Popular Fruits Section */}
      <Section className="py-20 px-4 bg-gradient-to-tl from-fig/20 via-cherry/10 to-fig/10">
        <div className="max-w-7xl mx-auto">
          <Fade direction="left" duration={1000}>
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Popular Fruits
              </h3>
              <p className="text-xl text-secondary-text">
                Our customers' favorites - fresh, delicious, and always in
                season.
              </p>
            </div>
          </Fade>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {CONSTANT.popularFruits.map((fruit, index) => (
              <Zoom key={index} delay={index * 100}>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`relative p-6 rounded-2xl bg-gradient-to-br ${fruit.color} shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                >
                  <div className="bg-ghost-apple/90 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-4xl mb-2">{fruit.emoji}</div>
                    <p className="font-semibold text-primary text-sm">
                      {fruit.name}
                    </p>
                  </div>
                </motion.div>
              </Zoom>
            ))}
          </div>
        </div>
      </Section>
      <Section className="py-20 px-4 bg-graient-to-bl from-mulberry/20 via-plum/10 to-peach/20">
        <Section className="max-w-7xl mx-auto">
          <Fade direction="right" duration={1000}>
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                What Our Customers Say
              </h3>
              <p className="text-xl text-secondary-text">
                Don't just take our word for it - hear from our happy customers!
              </p>
            </div>
          </Fade>
          <Section className="grid grid-cols-1 md:flex overflow-auto w-full snap-x snap-mandatory no-scrollbar gap-y-5 md:gap-x-5">
            {CONSTANT.testimonialsB.map((testimonial, index) => (
              <Slide
                key={index}
                triggerOnce
                direction="right"
                delay={index * 200}
                className="max-h-56 overflow-y-auto md:min-w-[200px] shadow-xl hover:shadow-3xl snap-start"
              >
                <motion.div whileHover={{ scale: 1.1, shadow: "10px" }} className="p-4 min-h-full b-gradient-to-br rounded-3xl from-ghost-apple to-quaternary transition-all duration-300">
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
                </motion.div>
              </Slide>
            ))}
          </Section>
        </Section>
      </Section>
      <Section className="py-20 px-4 bg-gradient-to-r from-apple-green/10 via-orange/10 to-strawberry/10">
        <Section className="max-w-4xl mx-auto text-center">
          <Fade direction="left" duration={1000}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-primary to-secondary p-12 rounded-3xl shadow-2xl"
            >
              <HeartIcon className="w-16 h-16 text-ghost-apple mx-auto mb-6" />
              <h3 className="text-3xl md:text-4xl font-bold text-ghost-apple mb-6">
                Ready to taste the difference?
              </h3>
              <p className="text-xl text-ghost-apple/90 mb-8">
                Join thousands of satisfied customers who choose fresh, quality
                fruits delivered daily.
              </p>
              <NextLink
                href="/fruits/order"
                isPending={false}
                className="inline-block px-10 py-4 bg-ghost-apple text-primary font-bold text-lg rounded-full hover:bg-quaternary transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Order Now 🛒
              </NextLink>
            </motion.div>
          </Fade>
        </Section>
      </Section>
    </main>
  );
}

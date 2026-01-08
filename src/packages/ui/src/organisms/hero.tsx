"use client";

import React from "react";
import NextLink from "@/packages/ui/src/atoms/link";
import Section from "@/packages/ui/src/atoms/section";

export default function HeroSection() {
  return (
    <Section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-ghost-apple via-quaternary to-ghost-apple">
      <div className="absolute inset-0 bg-[url('/images/fruit-platter-002.webp')] bg-cover bg-center bg-no-repeat opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-apple-green/20 via-transparent to-orange/20"></div>
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-gradient mb-6">
            Fresh Fruits
          </h1>
          <h2 className="text-3xl md:text-5xl font-semibold text-primary mb-8">
            Delivered Daily
          </h2>
          <p className="text-xl md:text-2xl text-secondary-text mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the finest selection of farm-fresh fruits delivered
            straight to your door. Premium quality, unbeatable freshness,
            exceptional service.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center slide-up-delayed">
          <NextLink
            href="/fruits/buyer"
            className="group relative px-8 py-4 bg-gradient-to-r from-apple-green to-kiwi text-ghost-apple font-semibold text-lg rounded-full shadow-2xl hover:shadow-apple-green/50 transition-all duration-300 transform hover:scale-105 min-w-[200px]"
          >
            <span className="relative z-10">🛒 Start Shopping</span>
            <div className="absolute inset-0 bg-gradient-to-r from-kiwi to-apple-green opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          </NextLink>
          <NextLink
            href="/fruits/seller"
            className="group relative px-8 py-4 bg-gradient-to-r from-orange to-mango text-ghost-apple font-semibold text-lg rounded-full shadow-2xl hover:shadow-orange/50 transition-all duration-300 transform hover:scale-105 min-w-[200px]"
          >
            <span className="relative z-10">🌱 Sell Your Fruits</span>
            <div className="absolute inset-0 bg-gradient-to-r from-mango to-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
          </NextLink>
        </div>
      </div>
    </Section>
  );
}

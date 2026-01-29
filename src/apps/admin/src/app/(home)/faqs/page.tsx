"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  Truck,
  RefreshCcw,
  ShoppingBag,
  HelpCircle,
  MessageCircle,
  Search,
  ArrowRight,
} from "lucide-react";
import CONSTANT from "@/packages/helpers/src/constants";

const FAQItem = ({ question, answer, isOpen, onClick }: any) => (
  <div className="border-b border-stone-200">
    <button
      onClick={onClick}
      className="w-full py-6 flex items-center justify-between text-left hover:text-emerald-700 transition-colors"
    >
      <span className="text-lg font-medium text-stone-900 leading-tight">
        {question}
      </span>
      <div
        className={`transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
      >
        <ChevronDown size={20} className="text-stone-400" />
      </div>
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <p className="text-stone-600 leading-relaxed max-w-2xl">{answer}</p>
    </div>
  </div>
);

const CategoryCard = ({ icon: Icon, label, isActive, onClick }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${
      isActive
        ? "bg-emerald-800 text-white shadow-lg shadow-emerald-900/20"
        : "bg-ghost-apple text-stone-600 hover:bg-stone-100"
    }`}
  >
    <Icon size={18} />
    <span className="font-semibold text-sm">{label}</span>
  </button>
);

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("Delivery");
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="min-h-screen bg-stone-50 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-stone-900 mb-6">
              How can we help?
            </h1>
            <div className="relative max-w-xl mx-auto">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search delivery times, policies..."
                className="w-full pl-12 pr-6 py-4 bg-ghost-apple border border-stone-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <CategoryCard
              icon={Truck}
              label="Delivery"
              isActive={activeCategory === "Delivery"}
              onClick={() => {
                setActiveCategory("Delivery");
                setOpenIndex(0);
              }}
            />
            <CategoryCard
              icon={RefreshCcw}
              label="Refunds"
              isActive={activeCategory === "Refunds"}
              onClick={() => {
                setActiveCategory("Refunds");
                setOpenIndex(0);
              }}
            />
            <CategoryCard
              icon={ShoppingBag}
              label="Bulk Orders"
              isActive={activeCategory === "Bulk Orders"}
              onClick={() => {
                setActiveCategory("Bulk Orders");
                setOpenIndex(0);
              }}
            />
          </div>

          {/* FAQ List */}
          <div className="bg-ghost-apple rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-stone-100">
            {CONSTANT.faqData[activeCategory].map((faq: any, index: number) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>

          {/* Capture Section */}
          <div className="mt-20 bg-emerald-900 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-800/50 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 bg-ghost-apple/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <HelpCircle size={32} className="text-emerald-400" />
              </div>
              <h2 className="text-3xl font-serif font-medium mb-4">
                Still have questions?
              </h2>
              <p className="text-emerald-100/70 mb-10 max-w-lg mx-auto leading-relaxed">
                Our support team is available 7 days a week to help with your
                harvest inquiries.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-ghost-apple text-emerald-900 px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-emerald-50 transition-all">
                  <MessageCircle size={18} />
                  Live Chat Now
                </button>
                <button className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-ghost-apple/10 transition-all">
                  Contact Support
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

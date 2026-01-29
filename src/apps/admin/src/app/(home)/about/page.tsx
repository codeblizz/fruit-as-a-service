"use client";

import React from "react";
import { Leaf, Truck, ShieldCheck, Users, Target, Globe } from "lucide-react";

const StatCard = ({ label, value }: any) => (
  <div className="text-center p-6 bg-ghost-apple/50 backdrop-blur-sm rounded-2xl border border-stone-100 shadow-sm">
    <div className="text-3xl font-bold text-emerald-800 mb-1">{value}</div>
    <div className="text-stone-500 text-sm font-medium uppercase tracking-wider">
      {label}
    </div>
  </div>
);

const ValueCard = ({ icon: Icon, title, description }: any) => (
  <div className="flex flex-col items-start p-8 rounded-3xl bg-ghost-apple border border-stone-100 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 group">
    <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 text-emerald-700">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-stone-900 mb-3">{title}</h3>
    <p className="text-stone-600 leading-relaxed text-sm">{description}</p>
  </div>
);

export default function About() {
  return (
    <div className="min-h-screen bg-stone-50 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Hero Section */}
      <header className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-emerald-700 uppercase bg-emerald-50 rounded-full">
            Our Mission
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-medium text-stone-900 tracking-tight leading-[1.1] mb-8">
            Reimagining the{" "}
            <span className="italic text-emerald-700">fruit chain</span> <br />{" "}
            from soil to software.
          </h1>
          <p className="max-w-2xl mx-auto text-stone-600 text-lg md:text-xl leading-relaxed font-light">
            We're a team of agronomists, engineers, and fruit lovers building
            the digital infrastructure for a more transparent and delicious food
            system.
          </p>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="px-6 mb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Direct Growers" value="120+" />
          <StatCard label="Cities Served" value="15" />
          <StatCard label="Waste Reduction" value="34%" />
          <StatCard label="App Users" value="50k+" />
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 bg-ghost-apple px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=1200"
                alt="Orchard background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 hidden md:block w-64 aspect-square rounded-[2rem] border-8 border-white overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1592394933243-92145bc22517?auto=format&fit=crop&q=80&w=600"
                alt="Close up fruit"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl font-serif text-stone-900 leading-tight">
              Why settle for <br /> "Store-Bought"?
            </h2>
            <p className="text-stone-600 leading-relaxed">
              For too long, the fruit industry has prioritized shelf-life over
              flavor. Large-scale logistics require fruit to be picked long
              before it's ready, resulting in bland produce and immense carbon
              footprints.
            </p>
            <div className="space-y-6">
              {[
                {
                  title: "Direct-from-Orchard",
                  desc: "We bypass central warehouses, moving fruit from the tree to your door in under 36 hours.",
                },
                {
                  title: "AI-Driven Ripeness",
                  desc: "Our vision systems analyze fruit condition to ensure you only get items at their peak sugar levels.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">{item.title}</h4>
                    <p className="text-sm text-stone-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-serif text-stone-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-stone-500">
              The principles that guide every line of code we write.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <ValueCard
              icon={ShieldCheck}
              title="Radical Transparency"
              description="Know the farmer's name, the date of harvest, and even the pH levels of the soil your fruit was grown in."
            />
            <ValueCard
              icon={Globe}
              title="Planet-First Shipping"
              description="Our optimized routing algorithms reduce delivery mileage by 22%, using carbon-neutral delivery partners."
            />
            <ValueCard
              icon={Target}
              title="Flavor Integrity"
              description="We never sacrifice quality for volume. If the harvest isn't perfect, we don't ship it. Simple as that."
            />
          </div>
        </div>
      </section>

      {/* Team/CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center bg-emerald-900 rounded-[3rem] p-12 md:p-20 text-white shadow-2xl shadow-emerald-950/20">
          <Users className="mx-auto mb-8 text-emerald-300" size={48} />
          <h2 className="text-4xl font-serif mb-6">
            Join the Green Revolution
          </h2>
          <p className="text-emerald-100/80 mb-10 text-lg">
            We're always looking for growers, developers, and designers who want
            to build a better future for agriculture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-ghost-apple text-emerald-900 px-8 py-4 rounded-full font-bold hover:bg-emerald-50 transition-all">
              View Openings
            </button>
            <button className="bg-emerald-800 text-white border border-emerald-700 px-8 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all">
              Partner with Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

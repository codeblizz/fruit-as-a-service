"use client";

import React, { useState } from "react";
import {
  Mail,
  MessageSquare,
  MapPin,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

const ContactMethod = ({ icon: Icon, title, description, action }: any) => (
  <div className="flex gap-4 p-6 rounded-2xl bg-ghost-apple border border-stone-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5 transition-all group">
    <div className="flex-shrink-0 w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
      <Icon size={24} />
    </div>
    <div>
      <h3 className="font-bold text-stone-900 mb-1">{title}</h3>
      <p className="text-sm text-stone-500 mb-2 leading-relaxed">
        {description}
      </p>
      <button className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
        {action} <ExternalLink size={14} />
      </button>
    </div>
  </div>
);

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
        <div className="max-w-md w-full bg-ghost-apple p-10 rounded-[2.5rem] shadow-xl text-center">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-serif font-medium text-stone-900 mb-4">
            Message Planted!
          </h2>
          <p className="text-stone-600 mb-8 leading-relaxed">
            We've received your inquiry. One of our orchard specialists will
            sprout a response in your inbox within 24 hours.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="w-full bg-emerald-800 text-white py-4 rounded-full font-bold hover:bg-emerald-900 transition-all shadow-lg shadow-emerald-900/20"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] text-emerald-700 uppercase bg-emerald-50 rounded-full">
              Get in Touch
            </span>
            <h1 className="text-5xl md:text-6xl font-serif font-medium text-stone-900 tracking-tight leading-tight mb-6">
              Let's grow something{" "}
              <span className="italic text-emerald-700">great</span> together.
            </h1>
            <p className="text-stone-600 text-lg leading-relaxed">
              Whether you're a local grower looking to join our network, or a
              customer with a question about your harvest, our team is ready to
              help.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Contact Form Section */}
            <div className="lg:col-span-7">
              <div className="bg-ghost-apple p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-stone-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 rounded-bl-full -mr-16 -mt-16"></div>

                <h2 className="text-2xl font-bold text-stone-900 mb-8">
                  Send us a message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-stone-700 ml-1">
                        Full Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="Johnny Appleseed"
                        className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-stone-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-stone-700 ml-1">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="johnny@orchard.com"
                        className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-stone-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-stone-700 ml-1">
                      Subject
                    </label>
                    <select className="w-auto block px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
                      <option>Order Support</option>
                      <option>Grower Partnership</option>
                      <option>Technical Issue</option>
                      <option>Media Inquiry</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-stone-700 ml-1">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="How can we help you today?"
                      className="w-full px-5 py-4 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-stone-400 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group w-full md:w-auto bg-emerald-800 text-white px-10 py-5 rounded-full font-bold hover:bg-emerald-900 transition-all shadow-lg shadow-emerald-900/10 flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Send Message
                        <Send
                          size={18}
                          className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                        />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Side Info Panel */}
            <div className="lg:col-span-5 space-y-6">
              <ContactMethod
                icon={MessageSquare}
                title="Live Chat Support"
                description="Best for quick questions about your delivery or account."
                action="Start a chat"
              />
              <ContactMethod
                icon={Phone}
                title="Phone Assistance"
                description="Mon-Fri, 9am - 6pm PST for direct grower support."
                action="+234 (070) 4133-3458"
              />
              <ContactMethod
                icon={Mail}
                title="Direct Email"
                description="For media, wholesale, and partnership inquiries."
                action="hello@fruit-as-a-service.com"
              />

              {/* Office Card */}
              <div className="bg-emerald-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <MapPin size={20} className="text-emerald-400" /> Our Roots
                  </h3>
                  <div className="space-y-4">
                    <p className="text-emerald-100/70 text-sm leading-relaxed">
                      1200 Orchard Way, Suite 400
                      <br />
                      Saratoga, CA 95070
                      <br />
                      United States
                    </p>
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                      <Clock size={16} />
                      <span>Usually responds in &lt; 2 hours</span>
                    </div>
                  </div>
                </div>
                {/* Decorative element */}
                <div className="absolute bottom-0 right-0 p-4 opacity-10">
                  <Leaf size={120} />
                </div>
              </div>

              {/* Socials / Trust */}
              <div className="px-8 flex items-center gap-6">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">
                  Follow us
                </span>
                <div className="h-px flex-grow bg-stone-200"></div>
                <div className="flex gap-4">
                  {["Instagram", "Twitter", "LinkedIn"].map((social) => (
                    <button
                      key={social}
                      className="text-sm font-medium text-stone-600 hover:text-emerald-700 transition-colors"
                    >
                      {social}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Simple internal icon for decoration
function Leaf({ size }: any) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1.1 9.2A7 7 0 0 1 11 20Z" />
      <path d="M11 20c0-4 3-8 8-10" />
      <path d="M11 20c0-4-1.5-6.5-4-8.5" />
    </svg>
  );
}

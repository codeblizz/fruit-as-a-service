"use client";

import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  MessageCircle, 
  FileText, 
  Video, 
  ExternalLink, 
  ChevronRight, 
  LifeBuoy,
  Zap,
  ShieldCheck,
  Cpu,
  Mail,
  Send
} from 'lucide-react';

const HelpCenterView = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 1, title: 'Getting Started', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50', count: 12 },
    { id: 2, title: 'Hardware Setup', icon: Cpu, color: 'text-blue-500', bg: 'bg-blue-50', count: 8 },
    { id: 3, title: 'Data Security', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50', count: 5 },
    { id: 4, title: 'API Reference', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50', count: 24 },
  ];

  const popularArticles = [
    "How to calibrate soil moisture sensors",
    "Setting up automated irrigation schedules",
    "Understanding UV index alerts",
    "Exporting monthly harvest reports",
    "Connecting external weather stations"
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Search Section */}
        <div className="bg-emerald-900 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden mb-10">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">How can we help you today?</h1>
            <p className="text-emerald-100/80 mb-8 text-lg">Search our documentation, video tutorials, or contact support for personalized assistance.</p>
            
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
              <input 
                type="text"
                placeholder="Search for articles, keywords, or error codes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-slate-900 pl-12 pr-4 py-4 rounded-2xl shadow-xl outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all text-lg"
              />
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full -mr-20 -mt-20 opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 right-20 w-40 h-40 bg-emerald-700 rounded-full mb-[-50px] opacity-30 blur-2xl"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Knowledge Base Categories */}
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <BookOpen className="text-emerald-600" size={22} />
                Knowledge Base
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <button key={cat.id} className="flex items-center p-5 bg-white border border-slate-200 rounded-2xl hover:border-emerald-500 hover:shadow-md transition-all group text-left">
                    <div className={`${cat.bg} ${cat.color} p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform`}>
                      <cat.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-800">{cat.title}</h3>
                      <p className="text-sm text-slate-500">{cat.count} articles</p>
                    </div>
                    <ChevronRight className="text-slate-300 group-hover:text-emerald-500" size={18} />
                  </button>
                ))}
              </div>
            </section>

            {/* Popular Articles */}
            <section>
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Popular Articles</h2>
                <div className="divide-y divide-slate-100">
                  {popularArticles.map((article, i) => (
                    <a key={i} href="#" className="flex items-center justify-between py-4 group">
                      <span className="text-slate-600 group-hover:text-emerald-600 transition-colors">{article}</span>
                      <ExternalLink size={14} className="text-slate-300 group-hover:text-emerald-500" />
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Area (Internal to View) */}
          <div className="space-y-6">
            
            {/* Direct Support Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
                <MessageCircle size={24} />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Live Support</h3>
              <p className="text-sm text-slate-500 mb-6">Our average response time is under 15 minutes during business hours.</p>
              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                Start Chatting
              </button>
            </div>

            {/* Video Tutorial Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-4">
                <Video size={24} />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Video Library</h3>
              <p className="text-sm text-slate-500 mb-6">Step-by-step guides for visual learners and hardware assembly.</p>
              <button className="w-full border border-slate-200 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors">
                Browse Tutorials
              </button>
            </div>

            {/* Quick Email Form */}
            <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100">
              <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <Mail size={18} />
                Send a Message
              </h3>
              <div className="space-y-3">
                <textarea 
                  placeholder="Tell us what's happening..." 
                  rows={3}
                  className="w-full bg-white border border-emerald-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
                ></textarea>
                <button className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-200">
                  <Send size={16} /> Send Ticket
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Link */}
        <div className="mt-12 text-center pb-8">
          <p className="text-slate-400 text-sm">
            Can't find what you need? Visit our <a href="#" className="text-emerald-600 font-bold underline underline-offset-4">Community Forum</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterView;
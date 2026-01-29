"use client";

import React, { useState } from "react";
import CONSTANT from "@/packages/helpers/src/constants";
import {
  Plus,
  Bell,
  Sprout,
  Settings,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "../../atoms/button";

const CalendarView = () => {
  const [activeTab, setActiveTab] = useState("calendar");
  // const [currentMonth, setCurrentMonth] = useState("October 2025");
  const date = new Date();
  const currentMonth = new Intl.DateTimeFormat("en-US", {
    month: "long",
  }).format(date);
  const currentYear = date.getFullYear();

  const renderCalendar = () => {
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const startPadding = Array.from({ length: 2 }, (_, i) => i);

    return (
      <div className="flex flex-col h-full min-h-screen bg-ghost-apple/70 animate-in fade-in duration-500">
        <div className="flex justify-between bg-ghost-apple p-4 rounded-2xl border border-slate-200 shadow-2xl items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {currentMonth} {currentYear}
            </h2>
            <p className="text-slate-500">Managing 4 active harvest zones</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="p-2 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </Button>
            <Button
              variant="outline"
              className="p-2 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </Button>
            <Button
              variant="primary"
              className="ml-2 flex items-center gap-2 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add Event
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-grow overflow-hidden">
          <div className="lg:col-span-3 bg-ghost-apple rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
            <div className="grid grid-cols-7 border-bottom border-slate-100 bg-ghost-apple">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="py-3 text-center text-xs font-extrabold text-slate-400 uppercase tracking-wider"
                >
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 flex-grow divide-x divide-y divide-slate-100 border-t border-slate-100">
              {startPadding.map((i) => (
                <div key={`p-${i}`} className="bg-ghost-apple/50" />
              ))}
              {days.map((day) => {
                const event = CONSTANT.calendarEvents.find(
                  (e) => e.day === day
                );
                return (
                  <div
                    key={day}
                    className={`min-h-[100px] p-2 hover:bg-ghost-apple transition-colors group relative cursor-pointer ${
                      day === 2 ? "bg-orange-50/30" : ""
                    }`}
                  >
                    <span
                      className={`text-sm font-extrabold ${
                        event ? "text-slate-900" : "text-slate-400"
                      }`}
                    >
                      {day}
                    </span>
                    {event && (
                      <div
                        className={`mt-2 p-1.5 rounded-md ${event.color} text-white shadow-sm`}
                      >
                        <div className="text-[10px] font-bold leading-tight truncate">
                          {event.title}
                        </div>
                        <div className="text-[9px] opacity-90 truncate">
                          {event.location}
                        </div>
                      </div>
                    )}
                    <button className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="w-4 h-4 text-slate-300" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-ghost-apple p-5 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Bell className="w-4 h-4 text-orange-500" /> Today's Alerts
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-1 bg-red-500 rounded-full" />
                  <div>
                    <p className="text-sm font-bold">Cold Storage Alert</p>
                    <p className="text-xs text-slate-500">
                      Bay 4 temp at 42°F (Threshold: 38°F)
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-1 bg-blue-500 rounded-full" />
                  <div>
                    <p className="text-sm font-bold">Irrigation Check</p>
                    <p className="text-xs text-slate-500">
                      Sector C requires manual valve check
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-apple-green via-apple-green to-primary p-5 rounded-2xl text-white shadow-lg shadow-emerald-900/20">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Sprout className="w-4 h-4" /> Field Metrics
              </h3>
              <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="opacity-70">Soil Moisture</span>
                  <span className="font-bold">64%</span>
                </div>
                <div className="w-full bg-emerald-800 h-1.5 rounded-full">
                  <div className="bg-kiwi h-full rounded-full w-[64%]" />
                </div>
                <div className="flex justify-between items-center text-sm pt-2">
                  <span className="opacity-70">Avg Brix Score</span>
                  <span className="font-bold">12.4</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-ghost-apple text-slate-900 font-sans">
      <main className="flex-grow p-8 overflow-y-auto">
        {activeTab === "calendar" ? (
          renderCalendar()
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 italic">
            <LayoutDashboard className="w-16 h-16 mb-4 opacity-20" />
            The {activeTab} module is coming soon in the next update.
          </div>
        )}
      </main>
    </div>
  );
};

export default CalendarView;

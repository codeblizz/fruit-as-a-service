"use client";

import React from "react";
import packageInfo from "@/packages/ui/package.json";
import {
  PieChart,
  TrendingUp,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  LayoutGrid,
  Filter,
} from "lucide-react";
import NextLink from "../../atoms/link";
import { useSession } from "next-auth/react";
import CONSTANT from "@/packages/helpers/src/constants";

const DashboardOverview = () => {
  const { data: session } = useSession();
  return (
    <div className="max-w-7xl mx-auto space-y-8 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-500 bg-ghost-apple/70 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col bg-ghost-apple p-6 rounded-[2rem] border border-slate-200 shadow-sm lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 bg-gradient-to-tr from-apple-green via-primary to-kiwi rounded-lg shadow-xs shadow-apple-green">
              <LayoutGrid size={18} className="text-ghost-apple" />
            </div>
            <span className="text-xs font-extrabold text-apple-green uppercase tracking-widest">
              Analytics Dashboard
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-blackcurrant tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Welcome back,
            <span className="font-extrabold capitalize text-lg">{`${session?.user.firstName}.`} </span>
            Here's your harvest data for today.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <NextLink
            href="/dashboard/fruits/category/create"
            className="group flex items-center gap-2 bg-ghost-apple text-slate-700 border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-ghost-apple transition-all active:scale-95"
          >
            <Plus
              size={18}
              className="text-slate-400 group-hover:text-emerald-500 transition-colors"
            />
            Create Fruits Category
          </NextLink>
          <NextLink
            href="/dashboard/fruits/add"
            className="flex items-center gap-2 text-white px-6 py-2.5 rounded-xl text-sm bg-gradient-to-tr from-apple-green via-primary to-kiwi font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95 border border-slate-900"
          >
            <Plus size={18} />
            Add Fruits
          </NextLink>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CONSTANT.dashboardStats.map((stat, i) => (
          <div
            key={i}
            className="relative group bg-ghost-apple p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`p-3 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl`}
              >
                <stat.icon size={22} />
              </div>
              <button className="text-slate-300 hover:text-slate-600 p-1">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-3 mt-1">
                <h3 className="text-3xl font-black text-slate-900 leading-none">
                  {stat.value}
                </h3>
                <span
                  className={`flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-lg ${
                    stat.isPositive
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-rose-50 text-rose-600"
                  }`}
                >
                  {stat.isPositive ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}
                  {stat.change}
                </span>
              </div>
            </div>

            {/* Sparkline Simulation (SVG) */}
            <div className="mt-6 -mx-2 opacity-50 group-hover:opacity-100 transition-opacity">
              <svg
                viewBox="0 0 100 20"
                className="w-full h-12 overflow-visible"
              >
                <path
                  d={`M 0 20 ${stat.trend
                    .map((h, idx) => `L ${(idx * 100) / 6} ${20 - h / 5}`)
                    .join(" ")}`}
                  fill="none"
                  stroke={stat.isPositive ? "#10b981" : "#f43f5e"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Main Feature / Chart Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Placeholder for Data Table or Feed */}
        <div className="lg:col-span-2 bg-ghost-apple rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Revenue Growth
              </h3>
              <p className="text-sm text-slate-500">
                Monthly harvest performance metrics
              </p>
            </div>
            <button className="p-2 bg-ghost-apple text-slate-400 rounded-xl hover:bg-slate-100 hover:text-slate-600 transition-all">
              <Filter size={18} />
            </button>
          </div>

          <div className="h-64 flex flex-col items-center justify-center text-center bg-ghost-apple/50 rounded-3xl border border-dashed border-slate-200">
            <div className="w-14 h-14 bg-ghost-apple rounded-full flex items-center justify-center mb-4 shadow-sm">
              <PieChart className="text-slate-300" size={28} />
            </div>
            <h4 className="text-base font-bold text-slate-800 tracking-tight">
              Gathering Harvest Data...
            </h4>
            <p className="text-slate-500 max-w-xs mt-1 text-xs font-medium">
              Detailed visualizations will be available as soon as your sensors
              sync with the orchard gateway.
            </p>
          </div>
        </div>

        {/* Action/Tip Card */}
        <div className="bg-gradient-to-br from-apple-green via-primary to-kiwi rounded-[2.5rem] p-8 text-white shadow-sm shadow-apple-green relative overflow-hidden group">
          {/* Decorative background circle */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-ghost-apple/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />

          <div className="relative z-10 h-full flex flex-col">
            <div className="bg-quaternary/50 w-fit p-3 rounded-2xl backdrop-blur-md mb-6">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-2xl font-black mb-3">
              Optimize your yield today.
            </h3>
            <p className="text-emerald-50 text-sm leading-relaxed mb-8 opacity-90">
              Based on recent UV indexes, we recommend adjusting the irrigation
              cycle in Segment B by 15 minutes.
            </p>
            <div className="mt-auto">
              <button className="w-full bg-ghost-apple text-apple-green font-extrabold py-4 rounded-2xl font-black text-sm hover:bg-emerald-50 transition-colors shadow-lg shadow-emerald-800/20 active:scale-95">
                Apply Optimization
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Context */}
      <div className="flex items-center bg-ghost-apple rounded-2xl justify-center gap-4 p-4 text-slate-400">
        <div className="h-px flex-1 bg-slate-200"></div>
        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em]">
          System Version {`${packageInfo.version}`} Real-time Monitoring Active
        </p>
        <div className="h-px flex-1 bg-slate-200"></div>
      </div>
    </div>
  );
};

export default DashboardOverview;

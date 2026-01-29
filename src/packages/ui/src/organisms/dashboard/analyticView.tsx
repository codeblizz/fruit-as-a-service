"use client";

import React, { useState } from "react";
import CONSTANT from "@/packages/helpers/src/constants";
import { Button } from "@/packages/ui/src/atoms/button";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Package,
  AlertTriangle,
  ChevronRight,
  Apple,
  Grape,
  Leaf,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

type StatCardType = {
  title: string;
  value: string;
  color: string;
  change: string;
  trend: "up" | "down";
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const StatCard = ({
  title,
  value,
  trend,
  color,
  change,
  icon: Icon,
}: StatCardType) => (
  <div className="bg-ghost-apple p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        <div
          className={`flex items-center mt-2 text-xs font-medium ${
            trend === "up" ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {trend === "up" ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
          <span className="ml-1">{change} vs last week</span>
        </div>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
  </div>
);

function AnalyticView() {
  const [activeTab, setActiveTab] = useState("Overview");
  return (
    <div className="min-h-screen bg-ghost-apple/70 p-6 md:p-10 space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col bg-ghost-apple p-4 rounded-2xl border border-slate-200 w-full shadow-sm md:flex-row md:items-center justify-between gap-4">
        <div className="">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Fruit Insights
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            Monitoring harvest health and inventory flow.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {["Overview", "Inventory", "Waste"].map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              variant={activeTab === tab ? "primary" : "outline"}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all`}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sales"
          value="$12,480"
          change="+14%"
          trend="up"
          icon={TrendingUp}
          color="bg-orange"
        />
        <StatCard
          title="Active Stock"
          value="842 kg"
          change="-2.5%"
          trend="down"
          icon={Package}
          color="bg-apple-green"
        />
        <StatCard
          title="Freshness Score"
          value="94%"
          change="+1.2%"
          trend="up"
          icon={Leaf}
          color="bg-blueberry/70"
        />
        <StatCard
          title="Potential Waste"
          value="12.4 kg"
          change="+5%"
          trend="down"
          icon={AlertTriangle}
          color="bg-cherry"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Chart */}
        <div className="lg:col-span-2 bg-ghost-apple p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Apple size={20} className="text-apple-green" />
              Harvest Yield Trend
            </h2>
            <select className="text-xs font-semibold bg-slate-100 border-none rounded-lg p-2 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={CONSTANT.salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-ghost-apple p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Grape size={20} className="text-violet-500" />
            Stock by Category
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={CONSTANT.categoryData}
                layout="vertical"
                barSize={20}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#1e293b", fontWeight: 600, fontSize: 13 }}
                  width={80}
                />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {CONSTANT.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {CONSTANT.categoryData.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-slate-500 font-medium">{item.name}</span>
                <span className="text-slate-900 font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Alerts */}
      <div className="bg-ghost-apple rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800">Quality Alerts</h2>
          <button className="text-amber-600 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
            View Logistics <ChevronRight size={16} />
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            {
              item: "Blood Oranges",
              issue: "Expiring in 2 days",
              status: "Priority",
              color: "text-amber-600",
            },
            {
              item: "Organic Bananas",
              issue: "Overstocked",
              status: "Stock Alert",
              color: "text-blue-600",
            },
            {
              item: "Strawberries",
              issue: "Quality Variance Detected",
              status: "Investigate",
              color: "text-rose-600",
            },
          ].map((alert, i) => (
            <div
              key={i}
              className="p-4 hover:bg-ghost-apple transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                  {alert.item[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{alert.item}</h4>
                  <p className="text-sm text-slate-500">{alert.issue}</p>
                </div>
              </div>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full bg-slate-100 ${alert.color}`}
              >
                {alert.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnalyticView;

"use client";

import React, { useState } from 'react';
import CONSTANT from '@/packages/helpers/src/constants';
import { 
  Sprout, 
  Bell, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp,
  BarChart3,
  Target,
  ArrowDownRight,
  MoreVertical,
  Calendar as CalendarIcon,
  Search,
  Filter
} from 'lucide-react';


const PerformanceView = () => {
    const [activeTab, setActiveTab] = useState('performance');
    const chartPoints = [20, 35, 25, 40, 55, 50, 65];

  const Header = () => (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Fruit Performance</h1>
        <p className="text-slate-500 text-sm">Real-time harvest metrics and environmental health</p>
      </div>
      
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative flex-grow md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search sectors..." 
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <button className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors relative">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>
  );

  const PerformanceTab = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CONSTANT.kpiData.map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                <kpi.icon size={20} />
              </div>
              {kpi.trend && (
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${kpi.positive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                  {kpi.trend}
                </span>
              )}
            </div>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">{kpi.label}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Yield Curve Graph */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              Weekly Yield Trend
            </h3>
            <div className="flex gap-2">
               <button className="px-3 py-1 text-xs font-medium border border-slate-200 rounded-lg hover:bg-slate-50">Download CSV</button>
               <button className="p-1 text-slate-400"><MoreVertical size={18} /></button>
            </div>
          </div>
          
          <div className="h-64 relative w-full group">
            {/* Simple SVG Chart */}
            <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path 
                d={`M 0 100 ${chartPoints.map((v, i) => `L ${(i / (chartPoints.length - 1)) * 100} ${100 - v}`).join(' ')} L 100 100 Z`} 
                fill="url(#gradient)"
              />
              <path 
                d={`M 0 ${100 - chartPoints[0]} ${chartPoints.map((v, i) => `L ${(i / (chartPoints.length - 1)) * 100} ${100 - v}`).join(' ')}`} 
                fill="none" 
                stroke="#10b981" 
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            
            {/* Gridlines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-2">
              {[1, 2, 3, 4].map(i => <div key={i} className="w-full border-t border-slate-50" />)}
            </div>
          </div>
          
          <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* Sector Rankings */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              Zone Health
            </h3>
            <Filter className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-600" />
          </div>
          
          <div className="flex-grow space-y-5">
            {CONSTANT.sectorPerformance.map((sector, i) => (
              <div key={i} className="group cursor-default">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-slate-700">{sector.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    sector.health > 90 ? 'text-emerald-600 bg-emerald-50' : 'text-orange-600 bg-orange-50'
                  }`}>
                    {sector.status}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${sector.color} transition-all duration-700`} 
                    style={{ width: `${sector.health}%` }} 
                  />
                </div>
                <div className="mt-2 flex justify-between text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                  <span>Vigor: {sector.health}%</span>
                  <span className="text-slate-600">Yield: {sector.yield}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold rounded-xl transition-colors">
            Analyze All Sectors
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <Header />
        
        {/* Sub-navigation */}
        <div className="flex gap-1 bg-slate-200/50 p-1 rounded-xl w-fit mb-8">
          <button 
            onClick={() => setActiveTab('performance')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'performance' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Insights
          </button>
          <button 
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'logs' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Detailed Logs
          </button>
        </div>

        {activeTab === 'performance' ? (
          <PerformanceTab />
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 border-dashed">
             <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <CalendarIcon className="text-slate-300" />
             </div>
             <h3 className="font-bold text-slate-800">Log History</h3>
             <p className="text-slate-500 text-sm mt-1">Detailed harvest logs will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceView;
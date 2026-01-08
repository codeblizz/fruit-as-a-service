"use client";

import React, { useState } from "react";
import {
  Settings,
  Bell,
  Shield,
  User,
  Smartphone,
  Save,
  Trash2,
  Database,
  Globe,
  Mail,
  CheckCircle2,
  Info,
  RefreshCwIcon,
  Tag,
} from "lucide-react";
import { Button } from "../../atoms/button";
import CustomSelect from "../../atoms/select";
import { useForm } from "react-hook-form";

const SettingsView = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const { control } = useForm();

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "team", label: "Team Access", icon: User },
    { id: "integration", label: "Integrations", icon: Database },
  ];

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header & Internal Nav */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Dashboard Settings
              </h1>
              <p className="text-slate-500 text-sm">
                Manage your orchard parameters and system configurations.
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-blueberry/5 text-blueberry/50 rounded-full text-xs font-semibold border border-blue-100">
              <Info size={14} />
              Last synced: 2 mins ago
            </div>
          </div>

          {/* New Professional Horizontal Tab Bar */}
          <div className="bg-white p-1 flex flex-wrap gap-1">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "primary" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all `}
              >
                <tab.icon size={16} />
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
        {/* Main Content Area */}
        <div className="space-y-6">
          {activeTab === "general" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-400">
              {/* Section: Fruit Identity */}
              <div className="bg-white h-96 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Globe className="text-emerald-500" size={20} />
                    Fruit Identity
                  </h2>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">
                      Display Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Green Valley Premium Estates"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium text-slate-900"
                    />
                  </div>
                  <div className="h-auto">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">
                      Primary Crop Type
                    </label>
                    <CustomSelect
                      icon={Tag}
                      name="categoryName"
                      control={control}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:bg-white focus:border-emerald-500 transition-all font-medium text-slate-900"
                      placeholder="Select a category"
                      rules={{ required: "Select a category" }}
                      options={[
                        "Navel Oranges",
                        "Hass Avocados",
                        "Fuji Apples",
                      ].map((category) => {
                        return { value: category, label: category };
                      })}
                    />
                  </div>
                  <div className="h-auto">
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2 tracking-wider">
                      Timezone
                    </label>
                    <CustomSelect
                      icon={Tag}
                      name="categoryName"
                      control={control}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:bg-white focus:border-emerald-500 transition-all font-medium text-slate-900"
                      placeholder="Select a category"
                      rules={{ required: "Select a category" }}
                      options={[
                        "Pacific Time (PT)",
                        "Mountain Time (MT)",
                        "Eastern Time (ET)",
                      ].map((category) => {
                        return { value: category, label: category };
                      })}
                    />
                  </div>
                </div>
              </div>

              {/* Section: Monitoring Thresholds */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Smartphone className="text-blue-500" size={20} />
                    Sensor Thresholds
                  </h2>
                </div>
                <div className="p-8 space-y-4">
                  {[
                    {
                      label: "Critical Soil Moisture",
                      sub: "Trigger irrigation alerts below 18%",
                      val: "18%",
                      color: "emerald",
                    },
                    {
                      label: "UV Exposure Warning",
                      sub: "Alert staff when index exceeds 8.0",
                      val: "8.0",
                      color: "orange",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 hover:border-slate-300 transition-all group"
                    >
                      <div className="flex gap-4 items-center">
                        <div
                          className={`w-1 h-10 rounded-full bg-${item.color}-500`}
                        />
                        <div>
                          <p className="font-bold text-slate-800 text-sm group-hover:text-slate-900">
                            {item.label}
                          </p>
                          <p className="text-xs text-slate-500">{item.sub}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span
                          className={`text-sm font-mono font-bold text-${item.color}-600 bg-${item.color}-50 px-3 py-1.5 rounded-lg`}
                        >
                          {item.val}
                        </span>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-apple-green"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-400 overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-900">
                  Delivery Channels
                </h2>
              </div>
              <div className="p-8 space-y-6">
                <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">Email Digests</p>
                      <p className="text-xs text-slate-500">
                        Daily summary of orchard performance sent at 6:00 AM.
                      </p>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-all">
                    Configure
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                      <Smartphone size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">SMS Alerts</p>
                      <p className="text-xs text-slate-500">
                        Instant notification for critical equipment failure.
                      </p>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-slate-400 bg-slate-100 px-4 py-2 rounded-lg cursor-not-allowed">
                    Disabled
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-slate-200 mt-4">
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-xl text-slate-400 hover:text-red-500 font-bold text-xs uppercase tracking-widest transition-colors px-4 py-2 group"
            >
              <RefreshCwIcon
                size={14}
                className="group-hover:scale-110 transition-transform"
              />
              Reset Defaults
            </Button>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                className="flex-1 sm:flex-none gap-2 px-6 py-3 rounded-xl text-slate-500 font-bold text-sm hover:bg-white hover:border-slate-200 transition-all"
              >
                <Trash2
                  size={14}
                  className="group-hover:scale-110 transition-transform"
                />
                Discard Changes
              </Button>
              <Button
                onClick={handleSave}
                variant={"primary"}
                disabled={isSaving}
                className={`flex-1 sm:flex-none px-10 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                  isSaving
                    ? "text-slate-400 cursor-wait"
                    : "text-white hover:bg-emerald-700 active:scale-95"
                }`}
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Feedback Toast */}
      {isSaving && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-10">
          <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
            <CheckCircle2 size={18} className="text-emerald-400" />
          </div>
          <div className="pr-4">
            <p className="text-sm font-bold">Preferences Saved</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">
              Changes are now live
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsView;

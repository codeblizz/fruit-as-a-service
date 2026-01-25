"use client";

import React, { useCallback, useState, useTransition } from "react";
import NextImage from "../../atoms/image";
import { useSession } from "next-auth/react";
import CONSTANT from "@/packages/helpers/src/constants";
import DefaultProfileImage from "@/packages/assets/images/defaultProfileImage.svg";
import {
  Edit3,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Award,
  Clock,
  ChevronRight,
  Camera,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "../../atoms/button";

const ProfileView = () => {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const [selectedFile, setSelectedFile] = useState<any>([]);
  const [imagePreview, setImagePreview] = useState<any>([]);
  const [isEditing, setIsEditing] = useState(false);

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = Array.from(e.target.files || []);
      const blobObject = new Blob(file);
      startTransition(() => {
        setSelectedFile(file);
        setImagePreview(URL.createObjectURL(blobObject));
      });
    },
    []
  );

  return (
    <div className="p-2 space-y-4 animate-in fade-in duration-500">
      {/* Profile Header Card */}
      <section className="relative bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        {/* Cover Pattern/Image */}
        <div className="h-32 md:h-48 bg-gradient-to-br from-apple-green via-kiwi to-apple-green opacity-90"></div>

        <div className="px-6 pb-6">
          <div className="relative flex flex-col md:flex-row md:items-end -mt-12 md:-mt-16 gap-6">
            {/* Avatar */}
            <div className="relative group">
              <NextImage
                src={session?.user.image ?? DefaultProfileImage}
                alt="User Profile"
                className="w-24 h-24 md:w-32 md:h-32 rounded-3xl object-cover border-4 border-white shadow-md bg-white"
              />
              <Button
                variant="link"
                animation="none"
                className="absolute size-full inset-0 bg-black/10 text-white focus-visible:ring-0 rounded-3xl transition-opacity"
              >
                <Camera
                  size={20}
                  className="opacity-0 group-hover:opacity-100"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden cursor-pointer"
                  onChange={handleImageChange}
                />
              </Button>
            </div>

            {/* Basic Info */}
            <div className="flex-1 space-y-1 pb-2">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-slate-900">{`${session?.user.firstName} ${session?.user.lastName}`}</h2>
                <ShieldCheck className="text-ghost-apple" size={20} />
              </div>
              <p className="text-quaternary font-thin">{session?.user.email}</p>
              <div className="flex flex-wrap gap-4 pt-1">
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPin size={14} /> Lagos, Nigeria
                </span>
                <span className="flex items-center gap-1.5 text-sm text-slate-500">
                  <Clock size={14} /> Local Time: 2:00 PM
                </span>
              </div>
            </div>

            <div className="flex gap-3 pb-2">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-tr from-apple-green via-primary to-kiwi text-ghost-apple rounded-xl hover:bg-slate-800 transition-all text-sm font-medium"
              >
                <Edit3 size={16} />{" "}
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Personal Details */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                    Email
                  </p>
                  <p className="text-sm font-medium text-slate-700">
                    {session?.user.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                    Phone
                  </p>
                  <p className="text-sm font-medium text-slate-700">
                    +234 (070) 41351234
                  </p>
                </div>
              </div>
            </div>

            <hr className="my-6 border-slate-100" />

            <h3 className="font-bold text-lg mb-4">Account Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl">
                <Award className="text-orange-500 mb-2" size={20} />
                <p className="text-xl font-bold text-slate-900">128</p>
                <p className="text-xs text-slate-500">Badge Points</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl">
                <Clock className="text-purple-500 mb-2" size={20} />
                <p className="text-xl font-bold text-slate-900">1.2k</p>
                <p className="text-xs text-slate-500">Hours Logged</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg mb-4">Integrations</h3>
            <div className="space-y-3">
              {["Google Drive", "Slack", "Trello"].map((app) => (
                <div
                  key={app}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">{app}</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Performance & Bio */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio Section */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg mb-2">About Me</h3>
            <p className="text-slate-600 leading-relaxed">
              Passionate inventory strategist with over 8 years of experience in
              the fresh produce industry. Currently managing the Fruitly
              logistics chain, focusing on reducing waste through predictive
              analytics and real-time tracking systems.
            </p>
          </div>

          {/* Activity Chart */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-lg">System Activity</h3>
                <p className="text-sm text-slate-500">
                  Your contributions over the last 7 days
                </p>
              </div>
              <select className="bg-slate-50 border-none rounded-lg text-xs font-bold p-2 outline-none cursor-pointer">
                <option>Last Week</option>
                <option>Last Month</option>
              </select>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CONSTANT.activityData}>
                  <defs>
                    <linearGradient
                      id="chartGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "16px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="activity"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#chartGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-lg mb-4">Milestones</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-4 p-4 border border-slate-100 rounded-2xl hover:border-orange-200 transition-colors cursor-pointer">
                <div className="text-2xl">🚀</div>
                <div>
                  <h4 className="font-bold text-sm">Efficient Logger</h4>
                  <p className="text-xs text-slate-500">
                    1,000 logs processed in 1 month
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 border border-slate-100 rounded-2xl hover:border-orange-200 transition-colors cursor-pointer">
                <div className="text-2xl">🌱</div>
                <div>
                  <h4 className="font-bold text-sm">Eco Contributor</h4>
                  <p className="text-xs text-slate-500">
                    Reduced waste by 15% in Q3
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;

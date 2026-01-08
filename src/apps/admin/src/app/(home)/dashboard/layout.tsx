"use client";

import React, { ReactNode } from "react";
import useDashboard from "@/packages/ui/src/molecules/hooks/useDashboard";
import MainLeftSideDashboard from "@/packages/ui/src/organisms/dashboard/mainLeftSideDashboard";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { isMobileOpen, setMobileOpen } = useDashboard();

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans antialiased text-slate-900">
      {/* MOBILE OVERLAY */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      {/* LEFT SIDE BAR */}
      <MainLeftSideDashboard />

      {/* MAIN CONTENT WRAPPER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 overflow-y-auto mt-20">
          <div className="p-4 w-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

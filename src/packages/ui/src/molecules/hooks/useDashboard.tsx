"use client";

import { useEffect, useState } from "react";
import { useCreateStore } from "@/packages/store/src";
import useAuth from "./useAuth";

export default function useDashboard() {
  const { isDashboard } = useAuth();
  const {
    updateToast,
    setActiveTab,
    setMobileOpen,
    dashboard: { isMobileOpen, activeTab },
  } = useCreateStore((state) => state);

  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!isDashboard) {
      setActiveTab("overview");
    }
  }, [isDashboard]);

  return {
    activeTab,
    updateToast,
    isMobileOpen,
    setActiveTab,
    setMobileOpen,
    isSidebarCollapsed,
    setSidebarCollapsed,
  };
}

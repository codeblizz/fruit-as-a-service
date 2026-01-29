"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCreateStore } from "@/packages/store/src";

export default function useDashboard() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
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

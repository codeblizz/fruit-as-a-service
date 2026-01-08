"use client";

import { useEffect } from "react";
import useAuth from "../molecules/hooks/useAuth";
import CONSTANT from "@/packages/helpers/src/constants";
import { usePathname, useRouter } from "next/navigation";
import LoadingSpinner from "../molecules/loadingSpinner";

interface AuthGuardProps {
  isDashboard?: boolean;
  children: React.ReactNode;
}

function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    isLoading,
    isDashboard,
    isSigninPage,
    isSignupPage,
    isAuthenticated,
    showDelayedLoading,
    fetchAuthUserDetails,
    setShowDelayedLoading,
    shouldShowDelayedLoading,
  } = useAuth();

  // For dashboard routes, use content-area loading instead of full-screen
  const LoadingComponent = ({ className = "" }: { className?: string }) => {
    if (isDashboard) {
      return (
        <div
          className={`flex items-center justify-center min-h-screen w-full ${className}`}
        >
          <div className="flex flex-col items-center space-y-4">
            <LoadingSpinner />
            <p className="text-muted/50 text-sm">Loading dashboard...</p>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner />
          <p className="text-muted/50 text-sm">Loading...</p>
        </div>
      </div>
    );
  };

  // Show loading spinner while authentication status is being determined Or Show delayed loading for unauthenticated users on protected routes after 10 seconds
  if (isLoading || showDelayedLoading) {
    return <LoadingComponent />;
  }

  useEffect(() => {
    if (isAuthenticated) {
      if (isSigninPage || isSignupPage) {
        router.replace("/dashboard");
      }
      // fetchAuthUserDetails();
    }

    if (!isAuthenticated && !CONSTANT.unProtectedPages.includes(pathname)) {
      router.push("/auth/signin?message=Please log in to access the dashboard");
    }
  }, [isAuthenticated, pathname, router]);

  // Set up the 10-second timer for showing loading on protected routes
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (shouldShowDelayedLoading) {
      timer = setTimeout(() => {
        setShowDelayedLoading(true);
      }, 200);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [shouldShowDelayedLoading]);

  return <>{children}</>;
}

export default AuthGuard;

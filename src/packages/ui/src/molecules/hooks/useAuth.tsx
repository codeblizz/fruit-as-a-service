"use client";

import { useSession } from "next-auth/react";
import utils from "@/packages/helpers/src/utils";
import { useCreateStore } from "@/packages/store/src";
import CONSTANT from "@/packages/helpers/src/constants";
import { signIn, SignInResponse } from "next-auth/react";
import { TSignIn, SignUp } from "@/packages/types/src/auth.type";
import { AuthService } from "@/packages/services/src/auth/auth.service";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { UserService } from "@/packages/services/src/users/user.service";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const initialUrlToken = searchParams.get("token") || "";
  const [codeDigits, setCodeDigits] = useState(
    Array(CONSTANT.VERIFICATION_CODE_LENGTH).fill("")
  );
  const hasFruitManagementAccess = session?.user.permissions.includes("MANAGE_FRUITS");
  const [verificationStatus, setVerificationStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");
  const isSigninPage = pathname.includes("signin");
  const isSignupPage = pathname.includes("signup");
  const isPasswordResetPage = pathname.includes("password");
  const isEmailNotificationPage = pathname.includes("email");
  const isDashboard = pathname.startsWith("/dashboard");
  const shouldShowDelayedLoading = !isAuthenticated && isDashboard;
  const [showDelayedLoading, setShowDelayedLoading] = useState(false);
  const { updateToast, updateUser, user } = useCreateStore((state) => state);

  // The token extracted from the URL is typically a long JWT, not a 6-digit code.
  // We treat the URL token as triggering an automatic verification attempt.
  const isReadyForAutoVerification =
    initialUrlToken && verificationStatus === "idle";

  const manualToken = codeDigits.join("");

  const authSignin = async (payload: TSignIn) => {
    try {
      const response: SignInResponse | undefined = await signIn("credentials", {
        email: payload.email,
        password: payload.password,
        callbackUrl: "/dashboard",
        redirect: false,
        ...(payload.rememberMe ? { maxAge: 30 * 24 * 60 * 60 } : {}),
      });
      if (response?.ok) {
        updateToast(true, "Sign in successful", "text-success");
        router.replace("/dashboard");
      } else {
        throw new Error("Sign in failed due to an unknown error.");
      }
    } catch (error) {
      const { message } = utils.formatError(error);
      updateToast(true, message, "text-cherry");
    }
  };

  const authSignup = async (payload: SignUp) => {
    try {
      const response = await AuthService("signup").signUp(payload);
      const { status, message } = response.data;
      if (status) {
        updateToast(true, message, "text-success");
        router.replace("/auth/email-sent?type=VERIFICATION");
      } else {
        throw Error(message);
      }
    } catch (error) {
      throw error;
    }
  };

  const fetchAuthUserDetails = useCallback(async () => {
    if (!session) return CONSTANT.defaultUser;
    const data = await UserService("user").fetchUserById(session?.user.id);
    updateUser({
      ...CONSTANT.defaultUser,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      termsAccepted: data.termsAccepted,
      profileImageUrl: data.profileImageUrl,
      businessName: data.businessName,
      isActive: data.isActive,
      isVerified: data.isVerified,
      roles: data.roles,
    });
  }, []);

  const performVerification = useCallback(
    async (token: string) => {
      if (!token || status === "loading") return;

      setVerificationStatus("loading");
      setMessage("Verifying your account...");

      try {
        await AuthService("verifyToken").verifyToken(token);
        setVerificationStatus("success");
        setMessage("Account verified successfully! Redirecting to login...");

        setTimeout(() => {
          router.push("/auth/signin");
        }, 3000);
      } catch (err: unknown) {
        setVerificationStatus("error");
        const error = err as Error;
        const errMsg =
          error.message || "An unexpected error occurred during verification.";
        setMessage(
          errMsg +
            " Please enter the 6-digit code manually or request a new one."
        );
      }
    },
    [status, router]
  );

  useEffect(() => {
    if (isReadyForAutoVerification) {
      setMessage("Processing verification link...");
      performVerification(initialUrlToken);
    }
  }, [isReadyForAutoVerification, initialUrlToken, performVerification]);

  const handleSubmitManual = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setMessage("");

    if (manualToken.length !== CONSTANT.VERIFICATION_CODE_LENGTH) {
      setMessage(
        `Code must be exactly ${CONSTANT.VERIFICATION_CODE_LENGTH} digits.`
      );
      setVerificationStatus("error");
      return;
    }
    // Use the concatenated 6-digit code for manual submission
    performVerification(manualToken);
  };

  // Handlers and state exposed to the view
  const viewProps = useMemo(
    () => ({
      message,
      codeDigits,
      manualToken,
      initialUrlToken,
      verificationStatus,
      isAutoVerificationFailed:
        initialUrlToken && verificationStatus === "error",
    }),
    [status, message, codeDigits, initialUrlToken]
  );

  return {
    user,
    isLoading,
    isSigninPage,
    isSignupPage,
    isDashboard,
    authSignup,
    authSignin,
    viewProps,
    setMessage,
    isAuthenticated,
    showDelayedLoading,
    isPasswordResetPage,
    fetchAuthUserDetails,
    setShowDelayedLoading,
    isEmailNotificationPage,
    shouldShowDelayedLoading,
    hasFruitManagementAccess,
    handlers: { handleSubmitManual, setCodeDigits },
  };
}

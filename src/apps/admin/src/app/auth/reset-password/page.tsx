"use client";

import React, { useState, useTransition } from "react";
import { CheckCircle, Lock } from "lucide-react";
import { cn } from "@/packages/helpers/src/utils";
import Input from "@/packages/ui/src/atoms/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateStore } from "@/packages/store/src";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/packages/ui/src/atoms/button";
import { Card } from "@/packages/ui/src/molecules/card";
import {
  ResetPasswordSchema,
  ResetPasswordType,
} from "@/packages/helpers/src/validations/auth.validate";

const mockPerformPasswordReset = async (token: string, newPassword: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (token === "expired-token") {
        resolve({
          success: false,
          message: "The reset link has expired or is invalid.",
        });
      } else if (newPassword.length < 8) {
        resolve({
          success: false,
          message: "Password must be at least 8 characters long.",
        });
      } else {
        // In a real app, this would hash the password and update the database.
        resolve({
          success: true,
          message:
            "Your password has been successfully reset. You can now log in.",
        });
      }
    }, 1000);
  });
};

const ResetPassword = ({
  token,
  goToPage,
}: {
  token: string;
  goToPage: (param: string) => void;
}) => {
  const [status, setStatus] = useState({ message: "", type: "" });
  const [isPending, startTransition] = useTransition();
  const { updateToast, toast } = useCreateStore((state) => state);
  const { control, handleSubmit } = useForm<ResetPasswordType>({
    defaultValues: { password: "", confirmPassword: "" },
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordType> = async (data) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      updateToast(true, "Passwords do not match.", "text-error");
      return;
    }

    startTransition(async () => {
      const result = (await mockPerformPasswordReset(
        token,
        password
      )) as unknown as { success: string; message: string };

      if (result.success) {
        updateToast(true, result.message, "text-success");
      } else {
        updateToast(true, result.message, "text-error");
      }
    });
  };

  if (toast.isOpen && toast.className.includes("success")) {
    return (
      <div className="min-h-screen pt-12 w-full bg-[url('/images/fruit-platter-002.webp')] bg-no-repeat bg-cover bg-center bg-fixed flex flex-col justify-center items-center">
        <div className="size-full bg-surface-primary backdrop-blur-sm justify-center max-w-md rounded-2xl">
          <Card
            className={cn(
              "bg-surface-primary p-8 size-full space-y-8 shadow-2xl border-0 rounded-2xl"
            )}
          >
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
            <h1 className="text-3xl font-extrabold text-gray-900">Success!</h1>
            <p className="text-gray-600">{toast.message}</p>
            <button
              onClick={() => goToPage("login")}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Go to Login
            </button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-12 w-full bg-[url('/images/fruit-platter-002.webp')] bg-no-repeat bg-cover bg-center bg-fixed flex flex-col justify-center items-center">
      <div className="size-full bg-surface-primary backdrop-blur-sm justify-center max-w-md rounded-2xl">
        <Card
          className={cn(
            "bg-surface-primary p-8 size-full space-y-8 shadow-2xl border-0 rounded-2xl"
          )}
        >
          <div className="flex flex-col items-center">
            <Lock className="w-10 h-10 text-white mb-2" />
            <h1 className="text-3xl font-extrabold text-white">
              Set New Password
            </h1>
            {/* <p className="mt-2 text-center text-sm !text-white">
              Token:{" "}
              <span className="font-mono text-xs bg-ghost-apple p-1 rounded">
                {token}
              </span>
            </p> */}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                {["password", "confirmPassword"].map((value, index) => (
                  <Input<ResetPasswordType>
                    key={index}
                    id={value}
                    name={value as "password" | "confirmPassword"}
                    type="password"
                    control={control}
                    disabled={isPending}
                    autoComplete="password"
                    labelClassName="-mt-2"
                    placeholder={
                      value === "password" ? "New Password" : "Confirm password"
                    }
                    className="form-input bg-ghost-apple mb-4 text-black placeholder:text-secondary-text/40"
                  />
                ))}
              </div>
            </div>

            {toast.message && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  toast.className.includes("success")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {status.message}
              </div>
            )}

            <div>
              <Button
                type="submit"
                disabled={isPending}
                className="w-full flex justify-center py-[1.4rem] px-4 border border-quaternary rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-tr from-apple-green via-primary to-kiwi text-sm font-medium text-ghost-apple hover:bg-quaternary/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 ease-in-out"
              >
                {isPending ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;

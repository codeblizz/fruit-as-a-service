"use client";

import React, { useTransition } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import Input from "@/packages/ui/src/atoms/input";
import NextLink from "@/packages/ui/src/atoms/link";
import { useCreateStore } from "@/packages/store/src";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import utils, { cn } from "@/packages/helpers/src/utils";
import { Button } from "@/packages/ui/src/atoms/button";
import { Card } from "@/packages/ui/src/molecules/card";
import { SigninSchema } from "@/packages/helpers/src/validations/auth.validate";

type ForgotPasswordType = {
  email: string;
};

const mockRequestResetLink = async (email: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (email.endsWith("@fail.com")) {
        resolve({ success: false, message: "Email address not found." });
      } else {
        // In a real app, this would send an email with a unique token link.
        resolve({
          success: true,
          message: "A password reset link has been sent to your email.",
        });
      }
    }, 1000);
  });
};

const ForgotPassword = ({
  goToPage,
}: {
  goToPage: (param: string) => void;
}) => {
  const { updateToast, toast } = useCreateStore((state) => state);
  const [isPending, startTransition] = useTransition();
  const {
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<ForgotPasswordType>({
    defaultValues: { email: "" },
    resolver: zodResolver(SigninSchema.pick({ email: true })),
  });

  const onSubmit: SubmitHandler<ForgotPasswordType> = (data) => {
    try {
      startTransition(async () => {
        const result = (await mockRequestResetLink(data.email)) as unknown as {
          message: string;
          success: string;
        };
        if (result.success) {
          updateToast(true, result.message, "text-success");
        } else {
          throw result.message;
        }
      });
    } catch (error: unknown) {
      const err = utils.formatError(error);
      updateToast(true, err.message, "text-error");
    }
  };

  return (
    <div className="min-h-screen pt-12 w-full bg-[url('/images/fruit-platter-002.webp')] bg-no-repeat bg-cover bg-center bg-fixed flex flex-col justify-center items-center">
      <div className="size-full bg-surface-primary backdrop-blur-sm justify-center max-w-md rounded-2xl">
        <Card
          className={cn(
            "bg-surface-primary p-8 size-full space-y-8 shadow-2xl border-0 rounded-2xl"
          )}
        >
          <div className="flex flex-col items-center">
            <Mail className="w-10 h-10 text-white mb-2" />
            <h1 className="text-3xl font-extrabold text-white">
              Forgot Password?
            </h1>
            <p className="mt-2 text-center text-sm !text-white">
              Enter your email and we'll send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="">
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input<ForgotPasswordType>
                  id="email"
                  name="email"
                  type="email"
                  control={control}
                  disabled={isPending}
                  autoComplete="email"
                  labelClassName=""
                  placeholder="Email Address"
                  className="form-input bg-ghost-apple text-black placeholder:text-secondary-text/40"
                />
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
                {toast.message}
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
                  "Send Reset Link"
                )}
              </Button>
            </div>
          </form>

          <div className="mt-6 mx-28">
            <NextLink
              href="/auth/signin"
              className="flex justify-center px-4 py-3 border border-quaternary rounded-lg shadow-sm bg-gradient-to-tr from-apple-green via-primary to-kiwi text-sm font-medium text-ghost-apple hover:bg-quaternary/20 hover:scale-105 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Login
            </NextLink>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;

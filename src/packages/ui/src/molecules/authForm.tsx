"use client";

import { signIn } from "next-auth/react";
import Paragraph from "../atoms/paragraph";
import React, { useTransition } from "react";
import lib from "@/packages/helpers/src/libs";
import Form from "@/packages/ui/src/atoms/form";
import utils, { cn } from "@/packages/helpers/src/utils";
import Input from "@/packages/ui/src/atoms/input";
import Button from "@/packages/ui/src/atoms/button";
import NextLink from "@/packages/ui/src/atoms/link";
import Card from "@/packages/ui/src/molecules/card";
import useResetFields from "./hooks/useResetFields";
import { zodResolver } from "@hookform/resolvers/zod";
import Fragment from "@/packages/ui/src/atoms/fragment";
import CONSTANT from "@/packages/helpers/src/constants";
import { useParams, usePathname } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { TLogin, TRegister } from "@/packages/types/src/auth.type";
import {
  LoginSchema,
  RegisterSchema,
} from "@/packages/helpers/src/validations/auth.validate";

function AuthForm({ className }: { className: string }) {
  const pathname = usePathname();
  const params = useParams<{ slug: string }>();
  const [isPending, startTransition] = useTransition();
  const slug = params.slug;
  const isRegister = pathname === "/auth/signup" || slug === "signup";
  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<TLogin | TRegister>({
    defaultValues: isRegister
      ? CONSTANT.getDefaultSignUp()
      : CONSTANT.defaultLogin,
    resolver: zodResolver(isRegister ? RegisterSchema : LoginSchema),
  });

  const onSubmit: SubmitHandler<TLogin> = (data) => {
    let response;
    try {
      startTransition(async () => {
        response = await signIn("credentials", {
          ...data,
          callbackUrl: "/dashboard",
          redirect: false,
        });
      });
      console.log("response", response);
      return response;
    } catch (error) {
      return utils.formatError(error);
    }
  };

  useResetFields(isDirty, errors, reset);

  return (
    <div className={cn(["min-h-screen flex items-center justify-center bg-gradient-to-br from-apple-green/5 via-background to-orange/5", className])}>
      <div className="max-w-md w-full flex flex-col items-center justify-center">
        <Card
          name=""
          className="bg-surface-primary py-5 backdrop-blur-sm shadow-2xl border-0 space-y-4"
        >
          <div className="text-center">
            <h2 className="text-5xl font-bold text-primary-text">
              {isRegister ? "Create your account" : "Welcome back!"}
            </h2>
            <p className="mt-2 text-sm !text-primary-text">
              {isRegister
                ? "Join us for the freshest fruit delivery experience"
                : "Sign in to your account to continue shopping"}
            </p>
          </div>
          <Form
            name="auth-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 bg-transparent border-0"
          >
            {CONSTANT.InputAuthObjects.map((value) => {
              const checkInputClass =
                !isRegister && value.type === "checkbox" ? "hidden" : "";
              if (checkInputClass === "hidden") return null;

              return (
                <div key={value.name} className="">
                  <Input<TLogin | TRegister>
                    id={value.name}
                    type={value.type}
                    name={value.name}
                    control={control}
                    placeholderClassName=""
                    placeholder={value.placeholder}
                    className="form-input placeholder:text-primary-text/50"
                  />
                </div>
              );
            })}

            {/* Forgot Password Link for Sign In */}
            {!isRegister && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    name="remember-me"
                    className="h-4 w-4 text-apple-green cursor-pointer focus:ring-apple-green border-quaternary rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-1 block text-xs text-primary-text"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <NextLink
                    href="/auth/forgot-password"
                    className="font-medium text-xs text-primary-text hover:text-kiwi transition-colors duration-200"
                  >
                    Forgot your password?
                  </NextLink>
                </div>
              </div>
            )}

            <Button
              name="submit"
              type="submit"
              isPending={isPending}
              className="w-full bg-gradient-to-tr from-apple-green via-primary to-kiwi text-primary-text py-4 text-lg font-semibold"
            >
              {isPending
                ? isRegister
                  ? "Signing Up..."
                  : "Signing In..."
                : isRegister
                ? "Sign Up"
                : "Sign In"}
            </Button>
          </Form>

          {/* Social Auth Section */}
          <div className="px-10 -mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-quaternary" />
              </div>
              <div className="relative z-50 flex justify-center text-sm">
                <span className="px-2 bg-quaternary text-cherry">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button className="w-full inline-flex justify-center py-2 px-4 border border-quaternary rounded-lg shadow-sm bg-gradient-to-tr from-apple-green via-primary to-kiwi text-sm font-medium text-primary-text hover:bg-quaternary/20 transition-all duration-200">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="ml-2">Google</span>
              </Button>

              <Button className="w-full inline-flex justify-center py-2 px-4 border border-quaternary rounded-lg shadow-sm bg-gradient-to-tr from-apple-green via-primary to-kiwi text-sm font-medium text-primary-text hover:bg-quaternary/20 transition-all duration-200">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="ml-2">Facebook</span>
              </Button>
            </div>
          </div>
          {/* Switch Auth Mode */}
          <div className="text-center flex flex-row gap-x-2 justify-center items-center">
            <p className="text-sm !text-primary-text">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
            </p>
            <NextLink
              href={
                isRegister
                  ? pathname.replace(
                      "/auth/signup",
                      slug ? "/signin" : "/"
                    )
                  : pathname.replace("/", "/auth/signup")
              }
              className="font-semibold text-kiwi hover:text-quaternary transition-colors duration-200"
            >
              {isRegister ? "Sign in here" : "Sign up here"}
            </NextLink>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AuthForm;

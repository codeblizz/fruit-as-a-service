"use client";

import useAuth from "./hooks/useAuth";
import Section from "../atoms/section";
import React, { useTransition } from "react";
import Form from "@/packages/ui/src/atoms/form";
import Input from "@/packages/ui/src/atoms/input";
import NextLink from "@/packages/ui/src/atoms/link";
import useResetFields from "./hooks/useResetFields";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateStore } from "@/packages/store/src";
import CONSTANT from "@/packages/helpers/src/constants";
import { Button } from "@/packages/ui/src/atoms/button";
import utils, { cn } from "@/packages/helpers/src/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams, usePathname } from "next/navigation";
import { Card } from "@/packages/ui/src/molecules/card";
import { TSignIn, SignUp } from "@/packages/types/src/auth.type";
import {
  SigninSchema,
  SignupSchema,
} from "@/packages/helpers/src/validations/auth.validate";

function AuthForm({ className }: { className: string }) {
  const pathname = usePathname();
  const { updateToast } = useCreateStore((state) => state);
  const { isSigninPage, authSignup, authSignin, isSignupPage } = useAuth();
  const params = useParams<{ slug: string }>();
  const [isPending, startTransition] = useTransition();
  // const slug = params.slug;
  const {
    reset,
    control,
    getValues,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<TSignIn | SignUp>({
    defaultValues: isSignupPage
      ? CONSTANT.getDefaultSignUp()
      : CONSTANT.defaultLogin,
    resolver: zodResolver(isSignupPage ? SignupSchema : SigninSchema),
  });

  const onSubmit: SubmitHandler<TSignIn | SignUp> = (data) => {
    startTransition(async () => {
      try {
        if (isSignupPage) {
          const registerData: SignUp = data as SignUp;
          return await authSignup({
            email: registerData.email,
            password: registerData.password,
            firstName: registerData.firstName,
            lastName: registerData.lastName,
            businessName: registerData.businessName,
            termsAccepted: registerData.termsAccepted,
          });
        } else {
          return await authSignin({
            email: data.email,
            password: data.password,
            rememberMe: getValues("rememberMe"),
          });
        }
      } catch (error) {
        const err = utils.formatError(error);
        updateToast(true, err.message, "text-error");
      }
    });
    return;
  };

  useResetFields(isDirty, errors, reset);

  return (
    <Section
      className={cn(
        "h-auto flex items-center justify-center bg-gradient-to-br from-apple-green/5 via-ghost-apple/5 to-orange/5",
        isSigninPage ? "mt-5" : "mb-4",
        className
      )}
    >
      <div className="max-w-md w-full flex flex-col items-center h-full justify-center">
        <Card
          className={cn(
            "bg-ghost-apple/5 p-0 w-full backdrop-blur-sm shadow-2xl border-0 rounded-3xl",
            isSignupPage ? "mt-8 pb-3" : "space-y-2 pb-5"
          )}
        >
          <div className="text-center w-full py-2 px-4 bg-gradient-to-br from-quaternary via-peach/50 to-peach/70 rounded-t-3xl">
            <h2
              className={cn(
                "font-bold text-ghost-apple",
                isSignupPage ? "text-4xl" : "text-5xl"
              )}
            >
              {isSignupPage ? "Create your account" : "Welcome back!"}
            </h2>
            <p className="mt-2 text-sm !text-ghost-apple">
              {isSignupPage
                ? "Join us for the freshest fruit delivery experience"
                : "Sign in to your account to continue shopping"}
            </p>
          </div>
          <Form
            name="auth-form"
            onSubmit={handleSubmit(
              (data) => {
                onSubmit(data);
              },
              (err) => {
                console.log("Validation Failed:", err);
              }
            )}
            className={cn(
              "bg-transparent border-0 -mt-4",
              isSignupPage ? "mx-6 space-y-4" : "space-y-6"
            )}
          >
            {CONSTANT.InputAuthObjects.map((value) => {
              const skipTermsCheckbox =
                !isSignupPage && value.type === "checkbox" ? "hidden" : "";
              const skipFieldIfSignIn =
                isSigninPage &&
                value.name !== "email" &&
                value.name !== "password"
                  ? "hidden"
                  : "";
              if (skipTermsCheckbox === "hidden") return null;
              if (skipFieldIfSignIn === "hidden") return null;
              return (
                <div key={value.name} className="w-full">
                  <Input<TSignIn | SignUp>
                    id={value.name}
                    type={value.type}
                    name={value.name}
                    control={control}
                    labelClassName={cn(
                      isSignupPage ? "peer-focus:-translate-y-[120%]" : ""
                    )}
                    placeholder={value.placeholder}
                    className={cn(
                      "form-input bg-ghost-apple/80 text-black placeholder:text-secondary-text/40",
                      isSignupPage ? "h-9" : ""
                    )}
                  />
                </div>
              );
            })}

            {/* Forgot Password Link for Sign In */}
            {isSigninPage && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Input<TSignIn | SignUp>
                    type="checkbox"
                    name="rememberMe"
                    id="rememberMe"
                    control={control}
                    placeholder="Remember me"
                    checked={getValues("rememberMe")}
                    labelClassName="ml-1 block text-xs text-ghost-apple"
                    className="h-4 w-4 bg-ghost-apple/80 text-apple-green cursor-pointer focus:ring-apple-green border-quaternary rounded-sm"
                  />
                </div>
                <div className="text-sm">
                  <NextLink
                    href="/auth/forgot-password"
                    className="font-medium text-xs text-ghost-apple hover:text-kiwi transition-colors duration-200"
                  >
                    Forgot your password?
                  </NextLink>
                </div>
              </div>
            )}
            <Button
              name="submit"
              type="submit"
              loading={isPending}
              className={cn(
                "w-full bg-gradient-to-tr from-apple-green via-primary to-kiwi text-ghost-apple py-4 text-lg font-semibold",
                isSignupPage ? "h-9" : ""
              )}
            >
              {isPending
                ? isSignupPage
                  ? "Signing Up..."
                  : "Signing In..."
                : isSignupPage
                ? "Sign Up"
                : "Sign In"}
            </Button>
          </Form>

          {/* Social Auth Section */}
          <div className={cn("-mt-5", isSignupPage ? "px-16" : "px-10")}>
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
              <Button
                className={cn(
                  "w-full inline-flex justify-center py-0 px-4 border border-quaternary rounded-lg shadow-sm bg-gradient-to-tr from-apple-green via-primary to-kiwi text-sm font-medium text-ghost-apple hover:bg-quaternary/20 transition-all duration-200",
                  isSignupPage ? "h-9" : ""
                )}
              >
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
              <Button
                className={cn(
                  "w-full inline-flex justify-center py-0 px-4 border border-quaternary rounded-lg shadow-sm bg-gradient-to-tr from-apple-green via-primary to-kiwi text-sm font-medium text-ghost-apple hover:bg-quaternary/20 transition-all duration-200",
                  isSignupPage ? "h-9" : ""
                )}
              >
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
          <div
            className={cn(
              "text-center flex flex-row gap-x-2 justify-center items-center",
              isSigninPage ? "mt-3" : "mt-2"
            )}
          >
            <p className="text-sm !text-ghost-apple">
              {isSignupPage
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
            </p>
            <NextLink
              href={
                isSignupPage
                  ? pathname.replace("/auth/signup", "/auth/signin")
                  : pathname.replace("/auth/signin", "/auth/signup")
              }
              className="font-semibold text-ghost-apple hover:underline hover:underline-offset-4 transition-colors duration-200"
            >
              {isSignupPage ? "Sign in here" : "Sign up here"}
            </NextLink>
          </div>
        </Card>
      </div>
    </Section>
  );
}

export default AuthForm;

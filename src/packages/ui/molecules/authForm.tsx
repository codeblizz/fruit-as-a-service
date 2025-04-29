"use client";

import React from "react";
import { ZodSchema } from "zod";
import lib from "@/packages/helpers/lib";
import Paragraph from "../atoms/paragraph";
import Form from "@/packages/ui/atoms/form";
import { usePathname } from "next/navigation";
import Input from "@/packages/ui/atoms/input";
import Button from "@/packages/ui/atoms/button";
import NextLink from "@/packages/ui/atoms/link";
import Card from "@/packages/ui/molecules/card";
import Fragment from "@/packages/ui/atoms/fragment";
import useResetFields from "./hooks/useResetFields";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  LoginSchema,
  RegisterSchema,
} from "@/packages/helpers/validations/auth.validate";

type Login = {
  email: string;
  password: string;
};

type Register = {
  acceptTerms: false;
} & Login;

const defaultLogin = { email: "", password: "" };
const defaultSignUp = { ...defaultLogin, acceptTerms: false };

function AuthForm({ className }: { className: string }) {
  const pathname = usePathname();
  const isLogin = pathname === "/";
  const isRegister = pathname === "/signup";
  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<Login | Register>({
    defaultValues: isLogin ? defaultLogin : isRegister ? defaultSignUp : {},
    resolver: zodResolver(
      pathname === "/"
        ? LoginSchema
        : pathname === "/signup"
        ? RegisterSchema
        : (undefined as unknown as ZodSchema)
    ),
  });

  const onSubmit: SubmitHandler<Login> = (data) => {
    console.log("data", data);
  };

  useResetFields(isDirty, errors, reset);

  return (
    <Card
      id="card"
      name="card"
      className={lib.cn([
        "flex flex-col items-center justify-center rounded-lg",
        className,
      ])}
    >
      <Paragraph
        id="auth-title"
        text={isLogin ? "Sign In" : isRegister ? "Sign Up" : ""}
        className="inline-flex text-xl font-extrabold capitalize items-center justify-center w-full text-center h-12"
      />
      <Form
        name="auth-form"
        onSubmit={handleSubmit(onSubmit)}
        className={lib.cn([
          "flex flex-col justify-center w-full rounded-none items-center gap-y-7",
        ])}
      >
        <Input<Login | Register>
          id="email"
          type="email"
          name="email"
          control={control}
          placeholder="Your Email"
          className="w-full"
        />
        <Input<Login | Register>
          id="password"
          type="password"
          name="password"
          control={control}
          placeholder="Your Password"
          className="w-full"
        />
        {isRegister ? (
          <Input<Login | Register>
            type="checkbox"
            id="acceptTerms"
            control={control}
            name="acceptTerms"
            className="w-3 h-3"
            placeholder="Accept Terms & Conditions"
          />
        ) : null}
        <Button name="login" text={"Submit"} type="submit" className="w-full" />
      </Form>
      <Fragment className="inline-flex items-center text-sm h-12">
        <Paragraph
          text={
            isLogin
              ? "New User -- Sign up"
              : isRegister
              ? "Already have an account -- Sign in"
              : ""
          }
          className="text-[13px]"
        />
        <NextLink
          href={isLogin ? "/signup" : "/"}
          className="underline ml-1 cursor-pointer text-[13px]"
        >
          here
        </NextLink>
      </Fragment>
    </Card>
  );
}

export default AuthForm;

"use client";

import { signIn } from "next-auth/react";
import Paragraph from "../atoms/paragraph";
import React, { useTransition } from "react";
import lib from "@/packages/helpers/src/libs";
import Form from "@/packages/ui/src/atoms/form";
import utils from "@/packages/helpers/src/utils";
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
import { Login, Register } from "@/packages/types/src/auth.type";
import {
  LoginSchema,
  RegisterSchema,
} from "@/packages/helpers/src/validations/auth.validate";

function AuthForm({ className }: { className: string }) {
  const pathname = usePathname();
  const params = useParams<{ slug: string }>();
  const [isPending, startTransition] = useTransition();
  const slug = params.slug;
  const isRegister = pathname === "/signup" || slug === "signup";
  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<Login | Register>({
    defaultValues: isRegister
      ? CONSTANT.getDefaultSignUp()
      : CONSTANT.defaultLogin,
    resolver: zodResolver(isRegister ? RegisterSchema : LoginSchema),
  });

  const onSubmit: SubmitHandler<Login> = (data) => {
    let response;
    try {
      startTransition(async() => {
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
        text={isRegister ? "Sign Up" : "Sign In"}
        className="inline-flex text-xl font-extrabold capitalize items-center justify-center w-full text-center h-12"
      />
      <Form
        name="auth-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center w-full rounded-none items-center"
      >
        {CONSTANT.InputAuthObjects.map((value) => {
          const checkInputClass =
            !isRegister && value.type === "checkbox" ? "hidden mb-0" : "mb-7";
          return (
            <Input<Login | Register>
              key={value.name}
              id={value.name}
              type={value.type}
              name={value.name}
              control={control}
              placeholder={value.placeholder}
              placeholderClassName={checkInputClass}
              className={lib.cn([value.className, checkInputClass])}
            />
          );
        })}
        <Button
          name="login"
          type="submit"
          text={"Submit"}
          className="w-full"
          isPending={isPending}
        />
      </Form>
      <Fragment className="inline-flex items-center text-sm h-12">
        <Paragraph
          text={
            isRegister
              ? "Already have an account -- Sign in"
              : "New User -- Sign up"
          }
          className="text-[13px]"
        />
        <NextLink
          href={
            isRegister
              ? pathname.replace("/signup", slug ? "/signin" : "/")
              : pathname.replace("/signin", "/signup")
          }
          className="underline ml-1 cursor-pointer text-[13px]"
        >
          here
        </NextLink>
      </Fragment>
    </Card>
  );
}

export default AuthForm;

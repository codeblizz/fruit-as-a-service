"use client";

import React from "react";
import { ZodSchema } from "zod";
import { signIn } from "next-auth/react";
import Paragraph from "../atoms/paragraph";
import lib from "@/packages/helpers/src/libs";
import { usePathname } from "next/navigation";
import Form from "@/packages/ui/src/atoms/form";
import utils from "@/packages/helpers/src/utils";
import Input from "@/packages/ui/src/atoms/input";
import Button from "@/packages/ui/src/atoms/button";
import NextLink from "@/packages/ui/src/atoms/link";
import Card from "@/packages/ui/src/molecules/card";
import useResetFields from "./hooks/useResetFields";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateStore } from "@/packages/store/src";
import Fragment from "@/packages/ui/src/atoms/fragment";
import CONSTANT from "@/packages/helpers/src/constants";
import { SubmitHandler, useForm } from "react-hook-form";
import { Login, Register } from "@/packages/types/src/auth.type";
import {
  LoginSchema,
  RegisterSchema,
} from "@/packages/helpers/src/validations/auth.validate";

function AuthForm({ className }: { className: string }) {
  const pathname = usePathname();
  const isLogin = pathname === "/";
  const isRegister = pathname === "/signup";
  const { loader, setLoader } = useCreateStore((state) => state);
  const {
    reset,
    control,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<Login | Register>({
    defaultValues: isLogin
      ? CONSTANT.defaultLogin
      : isRegister
      ? CONSTANT.getDefaultSignUp()
      : {},
    resolver: zodResolver(
      pathname === "/"
        ? LoginSchema
        : pathname === "/signup"
        ? RegisterSchema
        : (undefined as unknown as ZodSchema)
    ),
  });

  const onSubmit: SubmitHandler<Login> = async (data) => {
    setLoader(true);
    try {
      const response = await signIn("credentials", {
        ...data,
        callbackUrl: "/dashboard",
        redirect: false,
      });
      console.log("response", response);
      return response;
    } catch (error) {
      return utils.formatError(error);
    } finally {
      setLoader(false);
    }
  };

  useResetFields(isDirty, errors, reset);

  return (
    <Card
      id="card"
      name="card"
      className={lib.cn([
        "flex flex-col items-center justify-center rounded-lg from-quaternary to-yellow-50",
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
        className="flex flex-col justify-center w-full rounded-none items-center"
      >
        {CONSTANT.InputAuthObjects.map((value) => {
          const checkInputClass =
            isLogin && value.type === "checkbox" ? "hidden mb-0" : "mb-7";
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
          loader={loader}
          text={"Submit"}
          className="w-full"
        />
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

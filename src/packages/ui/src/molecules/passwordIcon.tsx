"use client";

import React from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { TButtonMouseEvent } from "@/packages/types/src/ui/button.type";

function PasswordIcon({
  onClick,
  className,
  isPassword,
  showPassword,
}: {
  className: string;
  isPassword: boolean;
  showPassword: boolean;
  onClick: (e: TButtonMouseEvent) => void;
}) {
  return isPassword ? (
    <button
      onClick={onClick}
      className={className}
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
    </button>
  ) : null;
}

export default PasswordIcon;

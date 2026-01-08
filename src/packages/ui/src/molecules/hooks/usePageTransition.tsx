"use client";

import React, { useEffect } from "react";
import { useCreateStore } from "@/packages/store/src";

function usePageTransition() {
  const { setLoader } = useCreateStore((state) => state);

  useEffect(() => {
    if (document.readyState === "loading") {
      setLoader(true);
    }
    if (document.readyState === "complete") {
      setLoader(false);
    }
  }, []);

  return null;
}

export default usePageTransition;

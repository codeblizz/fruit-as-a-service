"use client";

import { useMemo } from "react";
import utils from "@/packages/helpers/src/utils";

type Predicate<T> = (item: T) => boolean;

export function useValidList<T>(
  list: unknown,
  predicate?: Predicate<T>
): T[] {
  return useMemo(() => {
    if (!Array.isArray(list)) return [];

    return list.filter((item): item is T => {
      if (!utils.isValidObject(item)) return false;
      return predicate ? predicate(item as T) : true;
    });
  }, [list, predicate]);
}

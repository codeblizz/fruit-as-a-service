"use client";

import axios, { AxiosResponse } from "axios";
import utils from "@/packages/helpers/src/utils";
import { useCreateStore } from "@/packages/store/src";
import { IErrorState } from "@/packages/store/src/errorSlice";
import FruitService from "@/packages/services/src/fruits/fruit.service";
import { CountryOption, RawCountry } from "@/packages/store/src/countrySlice";
import useResetFields from "@/packages/ui/src/molecules/hooks/useResetFields";
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useTransition,
} from "react";
import { FieldErrors } from "react-hook-form";

interface UseCountryListReturn {
  search: string;
  isOpen: boolean;
  isPending: boolean;
  selectedId: string;
  countries: Array<RawCountry>;
  filteredOptions: CountryOption[];
  appError: IErrorState["appError"];
  setIsOpen: (open: boolean) => void;
  setSearch: (query: string) => void;
  setSelectedId: (id: string) => void;
  selectedOption: CountryOption | undefined;
  dropdownRef: React.RefObject<HTMLDivElement>;
}

export default function useCountryList(
  initialSelectedId = ""
): UseCountryListReturn {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();
  const [deferredSearch, setDeferredSearch] = useState("");
  const { countries, setCountries, appError, clearAppError, setAppError } =
    useCreateStore((state) => state);
  const [selectedId, setSelectedId] = useState<string>(initialSelectedId);

  useEffect(() => {
    setSelectedId(initialSelectedId);
  }, [initialSelectedId]);

  useEffect(() => {
    let isMounted = true;
    const fetchCountries = async () => {
      try {
        // const response = await FruitService("origins").getFruitOriginList() as unknown as AxiosResponse;
        const response = await fetch(
          "https://cdn.jsdelivr.net/npm/world-countries@latest/dist/countries.json"
        );
        // if (response.ok === false) throw new Error("Failed to fetch country data");
        const data: RawCountry[] = await response.json();
        if (isMounted) {
          const validatedData = Array.isArray(data) ? data : [];
          startTransition(() => {
            setCountries(validatedData);
          });
        }
      } catch (err) {
        if (isMounted) {
          setAppError(utils.formatError(err));
        }
      }
    };

    if (countries.length === 0) {
      fetchCountries();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSearchChange = (query: string) => {
    setSearch(query);
    startTransition(() => {
      setDeferredSearch(query);
    });
  };

  const options = useMemo<CountryOption[]>(() => {
    return countries.map((c: any) => ({
      value: c.cca2,
      label: `${c.flag} ${c.name.common}`,
      region: c.region,
      commonName: c.name.common,
    }));
  }, [countries]);

  const filteredOptions = useMemo<CountryOption[]>(() => {
    const q = deferredSearch.toLowerCase().trim();
    if (!q) return options;
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        opt.value.toLowerCase().includes(q)
    );
  }, [options, deferredSearch]);

  const selectedOption = options.find((opt) => opt.value === selectedId);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useResetFields(
    !!search.length,
    {
      description: appError?.message,
      status: "error",
    } as unknown as FieldErrors,
    clearAppError
  );

  return {
    search,
    isOpen,
    appError,
    countries,
    isPending,
    setIsOpen,
    selectedId,
    setSelectedId,
    selectedOption,
    filteredOptions,
    setSearch: handleSearchChange,
    dropdownRef: dropdownRef as React.RefObject<HTMLDivElement>,
  };
}

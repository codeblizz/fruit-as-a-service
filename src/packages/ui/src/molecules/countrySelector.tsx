"use client";

import React, { KeyboardEvent } from "react";
import { Controller } from "react-hook-form";
import useCountryList from "./hooks/useCountryList";
import { Check, Globe, Search, Loader2, ChevronDown } from "lucide-react";

interface CountrySelectorProps {
  label?: string;
  name: string;
  id: string;
  control: any;
  disabled: boolean;
  rules?: any;
  className?: string;
}

function CountrySelector({
  control,
  rules,
  disabled,
  name,
  id,
  label = "Origin Country",
  className,
}: CountrySelectorProps) {
  const {
    search,
    isOpen,
    isPending,
    setIsOpen,
    setSearch,
    selectedId,
    dropdownRef,
    setSelectedId,
    selectedOption,
    filteredOptions,
  } = useCountryList();

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Escape") setIsOpen(false);
    if (e.key === "ArrowDown" && !isOpen) setIsOpen(true);
  };

  return (
    <div className="w-full space-y-1.5" ref={dropdownRef}>
      {label && (
        <label className="text-sm block font-medium text-gray-700 mb-1.5">
          {label} {<span className="text-cherry">*</span>}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({
          field: { onChange, value },
          fieldState: { error, isDirty },
        }) => {
          return (
            <div className="relative">
              <button
                type="button"
                onClick={() => !isPending && setIsOpen(!isOpen)}
                onKeyDown={handleKeyDown}
                disabled={isPending}
                className={`
            w-full flex items-center justify-between outline-none px-4 py-[0.5rem] border rounded-lg transition-all shadow-sm
            ${
              isOpen
                ? "border-slate-400"
                : "border-slate-300 hover:border-slate-400"
            }
            ${!isDirty && error ? "!border-cherry" : ""}
            ${isPending ? "opacity-70 cursor-wait" : "cursor-pointer"}
          `}
              >
                <div className="flex items-center -ml-1 w-full overflow-hidden">
                  {isPending ? (
                    <Loader2
                      size={18}
                      className="animate-spin text-slate-500"
                    />
                  ) : (
                    <span
                      className={`truncate ${
                        selectedOption
                          ? "text-slate-900 text-sm font-medium"
                          : "text-slate-400 text-xs italic"
                      }`}
                    >
                      <div className="flex max-w-full justify-start items-center pointer-events-none">
                        <Globe
                          className={`h-5 w-5 mr-2 ${
                            !isDirty && error ? "!text-cherry" : ""
                          }`}
                        />
                        {selectedOption
                          ? selectedOption.label
                          : "Select a country..."}
                      </div>
                    </span>
                  )}
                </div>
                <ChevronDown
                  size={18}
                  className={`text-slate-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="absolute z-[60] w-full mt-1 bg-ghost-apple border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 origin-top">
                  <div className="p-3 border-b border-slate-100 bg-ghost-apple/50 sticky top-0">
                    <div className="relative -mt-1">
                      <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        autoFocus
                        type="text"
                        value={search}
                        placeholder="Search countries or codes..."
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border placeholder:text-xs placeholder:italic placeholder:text-slate-400 border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="max-h-72 overflow-y-auto overscroll-contain">
                    {filteredOptions.length > 0 ? (
                      <div className="py-1">
                        {filteredOptions.map((opt: any) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              setSelectedId(opt.value);
                              setIsOpen(false);
                              setSearch("");
                              onChange(opt.value);
                            }}
                            className={`
                        w-full flex items-center cursor-pointer justify-between px-4 py-2 text-left text-sm transition-all
                        ${
                          selectedId === opt.value
                            ? "bg-ghost-apple text-slate-700 font-semibold"
                            : "text-slate-600 hover:bg-ghost-apple"
                        }
                      `}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-lg">
                                {opt.label.split(" ")[0]}
                              </span>
                              <span>
                                {opt.label.split(" ").slice(1).join(" ")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded tracking-wider">
                                {opt.value}
                              </span>
                              {selectedId === opt.value && (
                                <Check size={14} className="text-slate-600" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-10 text-center space-y-2">
                        <div className="bg-ghost-apple w-10 h-10 rounded-full flex items-center justify-center mx-auto">
                          <Search size={18} className="text-slate-300" />
                        </div>
                        <p className="text-sm text-slate-400">
                          No countries found for "{search}"
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="px-4 py-2 bg-ghost-apple border-t border-slate-100 text-[10px] text-slate-400 flex justify-between uppercase tracking-tighter font-semibold">
                    <span>{filteredOptions.length} Results</span>
                    <span>Global Database</span>
                  </div>
                </div>
              )}
              {!isDirty && error && (
                <p className="flex items-center gap-1 text-[0.6rem] !text-cherry font-medium">
                  {error?.message}
                </p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}

export default CountrySelector;

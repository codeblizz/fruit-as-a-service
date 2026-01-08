"use client";

import { useState } from "react";
import { Controller } from "react-hook-form";
import { Check, ChevronDown } from "lucide-react";
import { useClickOutside } from "../molecules/hooks/useClickOutside";

type OptionType = { label: string; value: string };

const CustomSelect = ({
  name,
  label,
  rules,
  control,
  options,
  required,
  icon: Icon,
  placeholder,
}: any) => {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  return (
    <div className="flex flex-col gap-1.5 w-full relative" ref={dropdownRef}>
      {label && (
        <label className="text-sm font-semibold text-slate-700 ml-1">
          {label} {required && <span className="text-cherry">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value }, fieldState: { error, isDirty } }) => {
          const selectedLabel = options.find(
            (opt: OptionType) => opt.value === value
          )?.label;

          return (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    relative w-full flex items-center gap-3 px-4 py-2 
                    border rounded-lg text-sm outline-none shadow-sm transition-all duration-200
                    text-left cursor-pointer
                    ${
                      isOpen
                        ? "ring-4 ring-slate-50 border-slate-500"
                        : "border-gray-300 hover:border-slate-400"
                    }
                    ${error ? "border-red-500 ring-red-50" : ""}
                  `}
              >
                {Icon && (
                  <Icon size={19} className={!isDirty && error ? "!text-cherry" : ""} />
                )}

                <span
                  className={`flex-1 truncate ${
                    !isDirty
                      ? "text-slate-400 italic text-xs"
                      : "text-slate-700 font-medium"
                  }`}
                >
                  {selectedLabel || placeholder}
                </span>

                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {/* Custom Dropdown Menu */}
              {isOpen && (
                <div className="absolute z-50 w-full bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="max-h-60 overflow-y-auto p-1">
                    {options.map((option: OptionType) => (
                      <div
                        key={option.value}
                        onClick={() => {
                          setIsOpen(false);
                          onChange(option.value);
                        }}
                        className={`
                            flex items-center border-b border-b-slate-200 justify-between px-3 py-1 cursor-pointer transition-colors
                            ${
                              value === option.value
                                ? "bg-slate-100 text-slate-700 font-semibold"
                                : "text-slate-500 hover:bg-slate-50"
                            }
                          `}
                      >
                        <span>{option.label}</span>
                        {value === option.value && <Check size={14} />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Error Message */}
              {!isDirty && error && (
                <div className="flex items-center gap-1 ml-1 !text-cherry">
                  <span className="text-[0.6rem] font-medium">{error.message}</span>
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default CustomSelect;

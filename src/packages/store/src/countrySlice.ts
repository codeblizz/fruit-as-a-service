import { StateCreator } from "zustand";

export interface CountryName {
  common: string;
  official: string;
}

export interface RawCountry {
  cca2: string;
  name: CountryName;
  flag: string;
  region: string;
}

export interface CountryOption {
  value: string;
  label: string;
  region: string;
  commonName: string;
}

export type TCountryState = {
  countries: RawCountry[];
  setCountries: (countries: RawCountry[]) => void;
};

export const CountrySlice: StateCreator<TCountryState> = (set) => ({
  countries: [], // Initial state MUST be an array
  setCountries: (newCountries) =>
    set(() => ({
      countries: Array.isArray(newCountries) ? newCountries : [],
    })),
});
import { create } from "zustand";
import { Locale } from "../interfaces/Locale";
import { mockLocales } from "./mockLocales";

interface State {
  locales: Locale[];
  fetchLocales: () => void;
}

export const useCreateJourney = create<State>(set => ({
  locales: [],
  ///////////////////////////////////////////////////////////////////////////////////////////////
  fetchLocales: () => {
    // TODO: Replace with actual API call to fetch locales
    set(() => ({
      locales: mockLocales
    }));
  }
}));

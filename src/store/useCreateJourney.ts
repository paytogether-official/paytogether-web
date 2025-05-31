import { create } from "zustand";
import { Locale } from "../interfaces/Locale";
import { mockLocales } from "./mockLocales";
import axios from "axios";

interface State {
  locales: Locale[];
  fetchLocales: () => void;
}

export const useCreateJourney = create<State>(set => ({
  locales: [],
  ///////////////////////////////////////////////////////////////////////////////////////////////
  fetchLocales: async () => {
    try {
      const response = await axios.get<Locale[]>(
        "https://api.paytogether.kr/locales"
      );
      console.log("Fetched locales:", response);
      set(() => ({
        locales: response.data
      }));
    } catch (error) {
      console.error("Failed to fetch locales:", error);
      // Fallback to mock data in case of error
      set(() => ({
        locales: mockLocales
      }));
    }
  }
}));

import axios from "api";
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
  fetchLocales: async () => {
    try {
      const response = await axios.get<Locale[]>(
        "https://api.paytogether.kr/locales"
      );
      if (response.status === 200) {
        set(() => ({
          locales: response.data
        }));
      } else {
        // TODO: error notify
        set(() => ({
          locales: mockLocales
        }));
      }
    } catch (error) {
      console.error("Failed to fetch locales:", error);
      // Fallback to mock data in case of error
      // TODO: error notify
      set(() => ({
        locales: mockLocales
      }));
    }
  }
}));

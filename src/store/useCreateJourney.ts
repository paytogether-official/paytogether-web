import { create } from "zustand";
import { Locale } from "../interfaces/Locale";
import { mockLocales } from "./mockLocales";
import axios from "api";

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
        console.log("Locales fetched successfully:", response.data);
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

import axios from "api";
import {
  CreateJourneyRequestDto,
  initialCreateJourneyRequestDto
} from "interfaces/CreateJourneyRequestDto";
import { create } from "zustand";
import { Locale } from "../interfaces/Locale";
import { mockLocales } from "./mockLocales";

interface State {
  locales: Locale[];
  createJourneyData: CreateJourneyRequestDto;
  ///////////////////////////////////////////////////////////////////////////////////////////////
  initialize: () => void;
  fetchLocales: () => void;
  changeData: (key: keyof CreateJourneyRequestDto, value: any) => void;
  createJourney: () => void;
}

export const useCreateJourney = create<State>(set => ({
  locales: [],
  createJourneyData: { ...initialCreateJourneyRequestDto },
  ///////////////////////////////////////////////////////////////////////////////////////////////
  initialize: () => {
    set(() => ({
      createJourneyData: { ...initialCreateJourneyRequestDto }
    }));
  },
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
  },
  changeData: (key, value) => {
    set(state => ({
      createJourneyData: {
        ...state.createJourneyData,
        [key]: value
      }
    }));
  },
  createJourney: async () => {
    // TODO
  }
}));

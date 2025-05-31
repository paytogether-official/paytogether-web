import axios from "api";
import { CONST } from "CONST";
import {
  CreateJourneyRequestDto,
  initialCreateJourneyRequestDto
} from "interfaces/CreateJourneyRequestDto";
import { Journey } from "interfaces/Journey";
import { create } from "zustand";
import { Locale } from "../interfaces/Locale";
import { mockLocales } from "./mockLocales";
import { useCommon } from "./useCommon";

interface State {
  locales: Locale[];
  createJourneyData: CreateJourneyRequestDto;
  ///////////////////////////////////////////////////////////////////////////////////////////////
  initialize: () => void;
  fetchLocales: () => void;
  changeData: (key: keyof CreateJourneyRequestDto, value: any) => void;
  createJourney: () => void;
}

export const useCreateJourney = create<State>((set, get) => ({
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
    try {
      const response = await axios.post<Journey>(
        "https://api.paytogether.kr/journeys",
        { ...get().createJourneyData }
      );

      console.log(response);

      if (response.status === 200 || response.status === 201) {
        useCommon.getState().addToast({
          type: "success",
          text: "생성된 여정으로 이동합니다!"
        });
        const journeyIds: string[] = (
          localStorage.getItem(CONST.LOCAL_STORAGE_KEY.JOURNEY_IDS) ?? ""
        ).split(",");

        localStorage.setItem(
          CONST.LOCAL_STORAGE_KEY.JOURNEY_IDS,
          [...journeyIds, response.data.journeyId].join(",")
        );

        setTimeout(() => {
          window.location.href = `/journey/${response.data.journeyId}`;
        }, 2000); // 2초 후에 여정 페이지로 이동
      } else {
        useCommon.getState().addToast({
          type: "error",
          text: "오류가 발생했습니다."
        });
      }
    } catch (error) {
      useCommon.getState().addToast({
        type: "error",
        text: "오류가 발생했습니다."
      });
    }
  }
}));

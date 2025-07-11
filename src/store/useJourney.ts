import axios from "api";
import { Journey } from "interfaces/Journey";
import { create } from "zustand";
import { useAddJourneyExpense } from "./useAddJourneyExpense";
import { useCommon } from "./useCommon";

interface State {
  journey: Journey | null;
  ///////////////////////////////////////////////////////////////////////////////////////////////
  fetchJourney: (journeyId: string) => void;
  fetchJourneyWithCurrency: (journeyId: string, currency: string) => void;
}

export const useJourney = create<State>((set, get) => ({
  journey: null,
  ///////////////////////////////////////////////////////////////////////////////////////////////
  fetchJourney: async (journeyId: string) => {
    try {
      const response = await axios.get<Journey>(
        `https://api.paytogether.kr/journeys/${journeyId}`
      );
      if (response.status === 200) {
        set(() => ({
          journey: response.data
        }));

        useAddJourneyExpense.getState().initialize(response.data);
      } else {
        useCommon.getState().addToast({
          type: "error",
          text: "여정 정보를 가져오는 데 실패했습니다."
        });
      }
    } catch (error) {
      useCommon.getState().addToast({
        type: "error",
        text: "여정 정보를 가져오는 데 실패했습니다."
      });
    }
  },
  fetchJourneyWithCurrency: async (journeyId: string, currency: string) => {
    try {
      const response = await axios.get<Journey>(
        `https://api.paytogether.kr/journeys/${journeyId}?quoteCurrency=${currency}`
      );
      if (response.status === 200) {
        set(() => ({
          journey: response.data
        }));
      } else {
        useCommon.getState().addToast({
          type: "error",
          text: "여정 정보를 가져오는 데 실패했습니다."
        });
      }
    } catch (error) {
      useCommon.getState().addToast({
        type: "error",
        text: "여정 정보를 가져오는 데 실패했습니다."
      });
    }
  }
}));

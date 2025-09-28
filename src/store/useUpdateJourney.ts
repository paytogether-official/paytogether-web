import axios from "axios";
import { create } from "zustand";
import { Journey } from "../interfaces/Journey";
import { useCommon } from "./useCommon";

interface State {
  originalJourney: Journey | null;
  journey: Journey | null;
  fetchJourney: (journeyId: string) => Promise<void>;
  changeData: (key: keyof Journey, value: any) => void;
  updateJourney: (journeyId: string) => Promise<boolean>;
}

export const useUpdateJourney = create<State>((set, get) => ({
  originalJourney: null,
  journey: null,
  fetchJourney: async (journeyId: string) => {
    try {
      const response = await axios.get<Journey>(
        `https://api.paytogether.kr/journeys/${journeyId}`
      );
      set({ journey: response.data, originalJourney: response.data });
    } catch (error) {
      useCommon.getState().addToast({
        type: "error",
        text: "여정 정보를 불러오는데 실패했습니다."
      });
    }
  },
  changeData: (key, value) => {
    set(state => ({
      journey: {
        ...state.journey!,
        [key]: value
      }
    }));
  },
  updateJourney: async journeyId => {
    try {
      const response = await axios.patch<Journey>(
        `https://api.paytogether.kr/journeys/${journeyId}`,
        get().journey!
      );

      if (response.status === 200) {
        useCommon.getState().addToast({
          type: "success",
          text: "여정이 수정되었습니다."
        });
        return true;
      } else {
        useCommon.getState().addToast({
          type: "error",
          text: "여정 수정에 실패했습니다."
        });
        return false;
      }
    } catch (error) {
      useCommon.getState().addToast({
        type: "error",
        text: "여정 수정 중 오류가 발생했습니다."
      });
      return false;
    }
  }
}));

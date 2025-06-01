import axios from "api";
import { JourneyExpense } from "interfaces/JourneyExpense";
import { create } from "zustand";
import { useCommon } from "./useCommon";

interface State {
  journeyExpenseList: JourneyExpense[];
  ///////////////////////////////////////////////////////////////////////////////////////////////
  fetchJourneyExpenseList: (journeyId: string, quoteCurrency?: string) => void;
}

export const useJourneyExpense = create<State>((set, get) => ({
  journeyExpenseList: [],
  ///////////////////////////////////////////////////////////////////////////////////////////////
  fetchJourneyExpenseList: async (
    journeyId: string,
    quoteCurrency?: string
  ) => {
    try {
      const url = quoteCurrency
        ? `https://api.paytogether.kr/journeys/${journeyId}/expenses?quoteCurrency=${quoteCurrency}`
        : `https://api.paytogether.kr/journeys/${journeyId}/expenses`;
      const response = await axios.get<JourneyExpense[]>(url);
      if (response.status === 200) {
        set(() => ({
          journeyExpenseList: response.data
        }));
      } else {
        console.log("1");
        useCommon.getState().addToast({
          type: "error",
          text: "지출 목록 정보를 가져오는 데 실패했습니다."
        });
      }
    } catch (error) {
      console.error((error as any).response?.data?.message);
      useCommon.getState().addToast({
        type: "error",
        text: "지출 목록 정보를 가져오는 데 실패했습니다."
      });
    }
  }
}));

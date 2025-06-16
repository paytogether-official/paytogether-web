import axios from "api";
import { GetJourneyExpensesResponseDto } from "interfaces/getJourneyExpensesResponseDto";
import { JourneyExpense } from "interfaces/JourneyExpense";
import { create } from "zustand";
import { useCommon } from "./useCommon";

interface State {
  journeyExpense: JourneyExpense | null;
  journeyExpenseList: GetJourneyExpensesResponseDto | null;
  ///////////////////////////////////////////////////////////////////////////////////////////////
  fetchJourneyExpense: (
    journeyId: string,
    journeyExpenseId: string,
    quoteCurrency: string
  ) => void;
  fetchJourneyExpenseList: (journeyId: string, quoteCurrency: string) => void;
}

export const useJourneyExpense = create<State>((set, get) => ({
  journeyExpense: null,
  journeyExpenseList: null,
  ///////////////////////////////////////////////////////////////////////////////////////////////
  fetchJourneyExpense: async (
    journeyId: string,
    journeyExpenseId: string,
    quoteCurrency: string
  ) => {
    try {
      const response = await axios.get<JourneyExpense>(
        `https://api.paytogether.kr/journeys/${journeyId}/expenses/${journeyExpenseId}?quoteCurrency=${quoteCurrency}`
      );
      if (response.status === 200) {
        set(() => ({
          journeyExpense: response.data
        }));
      } else {
        console.log("1");
        useCommon.getState().addToast({
          type: "error",
          text: "지출 정보를 가져오는 데 실패했습니다."
        });
      }
    } catch (error) {
      console.error((error as any).response?.data?.message);
      useCommon.getState().addToast({
        type: "error",
        text: "지출 정보를 가져오는 데 실패했습니다."
      });
    }
  },
  fetchJourneyExpenseList: async (journeyId: string, quoteCurrency: string) => {
    try {
      const response = await axios.get<GetJourneyExpensesResponseDto>(
        `https://api.paytogether.kr/journeys/${journeyId}/expenses?quoteCurrency=${quoteCurrency}`
      );
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

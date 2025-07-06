import axios from "api";
import { JourneyExpense } from "interfaces/JourneyExpense";
import { create } from "zustand";
import { useCommon } from "./useCommon";

interface State {
  journeyExpenseEdit: JourneyExpense | null;
  fetchJourneyExpenseEdit: (
    journeyId: string,
    journeyExpenseId: string,
    quoteCurrency: string
  ) => Promise<void>;
  updateJourneyExpenseEdit: (
    journeyId: string,
    journeyExpenseId: string,
    data: Partial<JourneyExpense>
  ) => Promise<boolean>;
  isModified: boolean;
  changeJourneyExpenseEdit: <K extends keyof JourneyExpense>(
    key: K,
    value: JourneyExpense[K]
  ) => void;
}

export const useJourneyExpenseEdit = create<State>(set => ({
  journeyExpenseEdit: null,
  isModified: false,

  fetchJourneyExpenseEdit: async (
    journeyId,
    journeyExpenseId,
    quoteCurrency
  ) => {
    try {
      const response = await axios.get<JourneyExpense>(
        `https://api.paytogether.kr/journeys/${journeyId}/expenses/${journeyExpenseId}?quoteCurrency=${quoteCurrency}`
      );
      if (response.status === 200) {
        set({ journeyExpenseEdit: response.data, isModified: false });
      } else {
        useCommon.getState().addToast({
          type: "error",
          text: "지출 정보를 가져오는 데 실패했습니다."
        });
      }
    } catch (error: any) {
      useCommon.getState().addToast({
        type: "error",
        text:
          error?.response?.data?.message ||
          "지출 정보를 가져오는 데 실패했습니다."
      });
    }
  },

  updateJourneyExpenseEdit: async (journeyId, journeyExpenseId, data) => {
    try {
      const response = await axios.patch<JourneyExpense>(
        `https://api.paytogether.kr/journeys/${journeyId}/expenses/${journeyExpenseId}`,
        data
      );
      if (response.status === 200) {
        // set({ journeyExpenseEdit: response.data });
        useCommon.getState().addToast({
          type: "success",
          text: "지출 항목이 성공적으로 수정되었습니다."
        });
        return true;
      } else {
        useCommon.getState().addToast({
          type: "error",
          text: "지출 항목 수정에 실패했습니다."
        });
        return false;
      }
    } catch (error: any) {
      useCommon.getState().addToast({
        type: "error",
        text: error?.response?.data?.message || "지출 항목 수정에 실패했습니다."
      });
      return false;
    }
  },

  changeJourneyExpenseEdit: (key, value) =>
    set(state =>
      state.journeyExpenseEdit
        ? {
            journeyExpenseEdit: { ...state.journeyExpenseEdit, [key]: value },
            isModified: true
          }
        : {}
    )
}));

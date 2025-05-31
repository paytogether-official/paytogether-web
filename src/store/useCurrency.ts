import axios from "api";
import { Currency } from "interfaces/Currency";
import { create } from "zustand";
import { useCommon } from "./useCommon";

interface State {
  currencies: Record<string, Currency>;
  fetchCurrency: (currency: string) => void;
}

export const useCurrency = create<State>((set, get) => ({
  currencies: {},
  ///////////////////////////////////////////////////////////////////////////////////////////////
  fetchCurrency: async (currency: string) => {
    if (get().currencies[currency]) return;

    try {
      const response = await axios.get<Currency>(
        `https://api.paytogether.kr/exchange-rate?currency=${currency}`
      );
      if (response.status === 200) {
        set(state => ({
          currencies: {
            ...state.currencies,
            [currency]: response.data
          }
        }));
      } else {
        useCommon.getState().addToast({
          type: "error",
          text: "환율 정보를 가져오는 데 실패했습니다."
        });
      }
    } catch (error) {
      console.error("Failed to fetch locales:", error);
      useCommon.getState().addToast({
        type: "error",
        text: "환율 정보를 가져오는 데 실패했습니다."
      });
    }
  }
}));

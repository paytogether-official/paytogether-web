import axios from "api";
import { Currency } from "interfaces/Currency";
import { create } from "zustand";

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
        // TODO: error notify
      }
    } catch (error) {
      console.error("Failed to fetch locales:", error);
      // TODO: error notify
    }
  }
}));

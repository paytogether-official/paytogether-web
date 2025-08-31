import axios from "api";
import { JourneyResult } from "interfaces/JourneyResult";
import { create } from "zustand";
import { useCommon } from "./useCommon";

interface State {
  journeyResult: JourneyResult | null;
  ///////////////////////////////////////////////////////////////////////////////////////////////
  fetchJourneyResult: (journeyId: string, quoteCurrency: string) => void;
}

export const useJourneyResult = create<State>((set, get) => ({
  journeyResult: null,
  ///////////////////////////////////////////////////////////////////////////////////////////////
  fetchJourneyResult: async (journeyId: string, quoteCurrency: string) => {
    try {
      const response = await axios.get<JourneyResult>(
        `https://api.paytogether.kr/journeys/${journeyId}/settlement?quoteCurrency=${quoteCurrency}`
      );
      if (response.status === 200) {
        set(() => ({
          journeyResult: response.data
        }));
      } else {
        console.log("1");
        useCommon.getState().addToast({
          type: "error",
          text: "정산 결과 정보를 가져오는 데 실패했습니다."
        });
      }
    } catch (error) {
      console.error((error as any).response?.data?.message);
      useCommon.getState().addToast({
        type: "error",
        text: "정산 결과 정보를 가져오는 데 실패했습니다."
      });
    }
  }
}));

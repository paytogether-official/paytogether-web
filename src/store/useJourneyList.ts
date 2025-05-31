import axios from "api";
import { CONST } from "CONST";
import { Journey } from "interfaces/Journey";
import _ from "lodash";
import { create } from "zustand";
import { useCommon } from "./useCommon";

interface State {
  journeyList: Journey[];
  closedJourneyList: Journey[];
  ///////////////////////////////////////////////////////////////////////////////////////////////
  fetchJourneyList: () => void;
}

export const useJourneyList = create<State>((set, get) => ({
  journeyList: [],
  closedJourneyList: [],
  ///////////////////////////////////////////////////////////////////////////////////////////////
  fetchJourneyList: async () => {
    const journeyIds: string =
      localStorage.getItem(CONST.LOCAL_STORAGE_KEY.JOURNEY_IDS) ?? "";
    if (!journeyIds) return;

    try {
      const response = await axios.get<Journey[]>(
        `https://api.paytogether.kr/journeys?journeyIds=${journeyIds}`
      );
      if (response.status === 200) {
        const journeyList = response.data.filter(journey => !journey.closedAt);
        const closedJourneyList = response.data.filter(
          journey => journey.closedAt
        );
        set(() => ({
          journeyList,
          closedJourneyList
        }));

        localStorage.setItem(
          CONST.LOCAL_STORAGE_KEY.JOURNEY_IDS,
          journeyList.map(journey => journey.journeyId).join(",")
        );

        const closedJourneyIds = (
          localStorage.getItem(CONST.LOCAL_STORAGE_KEY.CLOSED_JOURNEY_IDS) ?? ""
        ).split(",");

        localStorage.setItem(
          CONST.LOCAL_STORAGE_KEY.CLOSED_JOURNEY_IDS,
          _.uniq([
            ...closedJourneyIds,
            ...closedJourneyList.map(journey => journey.journeyId)
          ]).join(",")
        );
      } else {
        useCommon.getState().addToast({
          type: "error",
          text: "여정 리스트를 가져오는 데 실패했습니다."
        });
      }
    } catch (error) {
      useCommon.getState().addToast({
        type: "error",
        text: "여정 리스트를 가져오는 데 실패했습니다."
      });
    }
  }
}));

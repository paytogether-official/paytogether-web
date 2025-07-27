import axios from "api";
import { CONST } from "CONST";
import { Journey } from "interfaces/Journey";
import _ from "lodash";
import { create } from "zustand";
import { useCommon } from "./useCommon";
import { useJourney } from "./useJourney";

interface State {
  journeyList: Journey[];
  closedJourneyList: Journey[];
  ///////////////////////////////////////////////////////////////////////////////////////////////
  fetchJourneyList: () => void;
  closeJourney: (journeyId: string) => void;
}

export const useJourneyList = create<State>((set, get) => ({
  journeyList: [],
  closedJourneyList: [],
  ///////////////////////////////////////////////////////////////////////////////////////////////
  fetchJourneyList: async () => {
    const journeyIds: string[] = _.uniq([
      ...(
        localStorage.getItem(CONST.LOCAL_STORAGE_KEY.JOURNEY_IDS) ?? ""
      ).split(","),
      ...(
        localStorage.getItem(CONST.LOCAL_STORAGE_KEY.CLOSED_JOURNEY_IDS) ?? ""
      ).split(",")
    ]);
    if (_.isEmpty(journeyIds)) return;

    try {
      const response = await axios.get<Journey[]>(
        `https://api.paytogether.kr/journeys?journeyIds=${journeyIds.join(",")}`
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

        localStorage.setItem(
          CONST.LOCAL_STORAGE_KEY.CLOSED_JOURNEY_IDS,
          closedJourneyList.map(journey => journey.journeyId).join(",")
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
  },
  closeJourney: async (journeyId: string) => {
    console.log("closeJourney", journeyId);
    try {
      const response = await axios.post(
        `https://api.paytogether.kr/journeys/${journeyId}/close`
      );
      if (response.status === 200 || response.status === 204) {
        // journey list 에서 지우기
        set(state => ({
          closedJourneyList: [
            ...state.closedJourneyList,
            state.journeyList.find(journey => journey.journeyId === journeyId)!
          ],
          journeyList: state.journeyList.filter(
            journey => journey.journeyId !== journeyId
          )
        }));

        // 로컬 스토리지에서 여정 ID 갱신
        const journeyIds = (
          localStorage.getItem(CONST.LOCAL_STORAGE_KEY.JOURNEY_IDS) ?? ""
        ).split(",");

        localStorage.setItem(
          CONST.LOCAL_STORAGE_KEY.JOURNEY_IDS,
          journeyIds.filter(id => id !== journeyId).join(",")
        );

        // 로컬 스토리지에서 닫힌 여정 ID 갱신
        const closedJourneyIds = (
          localStorage.getItem(CONST.LOCAL_STORAGE_KEY.CLOSED_JOURNEY_IDS) ?? ""
        ).split(",");
        localStorage.setItem(
          CONST.LOCAL_STORAGE_KEY.CLOSED_JOURNEY_IDS,
          _.uniq([...closedJourneyIds, journeyId]).join(",")
        );

        // 여정 새로 불러오기
        useJourney.getState().fetchJourney(journeyId);
      } else {
        useCommon.getState().addToast({
          type: "error",
          text: "여정 마무리에 실패했습니다."
        });
      }
    } catch (error) {
      useCommon.getState().addToast({
        type: "error",
        text: "여정 마무리에 실패했습니다."
      });
    }
  }
}));

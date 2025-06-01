import dayjs from "dayjs";
import {
  AddJourneyExpenseRequestDto,
  initialAddJourneyExpenseRequestDto
} from "interfaces/AddJourneyExpenseRequestDto";
import { Journey } from "interfaces/Journey";
import { create } from "zustand";
import { useJourneyExpenseSetting } from "./useJourneyExpenseSetting";

interface State {
  addJourneyExpenseData: AddJourneyExpenseRequestDto;
  ///////////////////////////////////////////////////////////////////////////////////////////////
  initialize: (journey: Journey) => void;
  changeData: (key: keyof AddJourneyExpenseRequestDto, value: any) => void;
}

export const useAddJourneyExpense = create<State>((set, get) => ({
  addJourneyExpenseData: { ...initialAddJourneyExpenseRequestDto },
  ///////////////////////////////////////////////////////////////////////////////////////////////
  initialize: (journey: Journey) => {
    const setting = useJourneyExpenseSetting.getState().initialize(journey);

    set(() => ({
      addJourneyExpenseData: {
        ...initialAddJourneyExpenseRequestDto,
        currency: journey.baseCurrency,
        expenseDate: dayjs().format("YYYY-MM-DD"),
        members: journey.members
          .filter(member => !setting.disabledMembers.includes(member.name))
          .map(member => ({
            name: member.name,
            amount: 0
          }))
      }
    }));
  },
  changeData: (key, value) => {
    set(state => ({
      addJourneyExpenseData: {
        ...state.addJourneyExpenseData,
        [key]: value
      }
    }));
  }
  // createJourney: async () => {
  //   try {
  //     const response = await axios.post<Journey>(
  //       "https://api.paytogether.kr/journeys",
  //       { ...get().createJourneyData }
  //     );

  //     console.log(response);

  //     if (response.status === 200 || response.status === 201) {
  //       useCommon.getState().addToast({
  //         type: "success",
  //         text: "생성된 여정으로 이동합니다!"
  //       });
  //       const journeyIds: string[] = (
  //         localStorage.getItem(CONST.LOCAL_STORAGE_KEY.JOURNEY_IDS) ?? ""
  //       ).split(",");

  //       localStorage.setItem(
  //         CONST.LOCAL_STORAGE_KEY.JOURNEY_IDS,
  //         [...journeyIds, response.data.journeyId].join(",")
  //       );

  //       setTimeout(() => {
  //         window.location.href = `/journey/${response.data.journeyId}`;
  //       }, 2000); // 2초 후에 여정 페이지로 이동
  //     } else {
  //       useCommon.getState().addToast({
  //         type: "error",
  //         text: "오류가 발생했습니다."
  //       });
  //     }
  //   } catch (error) {
  //     useCommon.getState().addToast({
  //       type: "error",
  //       text: "오류가 발생했습니다."
  //     });
  //   }
  // }
}));

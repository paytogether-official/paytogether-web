import axios from "api";
import dayjs from "dayjs";
import {
  AddJourneyExpenseRequestDto,
  initialAddJourneyExpenseRequestDto
} from "interfaces/AddJourneyExpenseRequestDto";
import { Journey } from "interfaces/Journey";
import { create } from "zustand";
import { useCommon } from "./useCommon";
import { useJourneyExpenseSetting } from "./useJourneyExpenseSetting";

interface State {
  journeyId: string;
  addJourneyExpenseData: AddJourneyExpenseRequestDto;
  ///////////////////////////////////////////////////////////////////////////////////////////////
  initialize: (journey: Journey) => void;
  changeData: (key: keyof AddJourneyExpenseRequestDto, value: any) => void;
  addExpense: () => void;
}

export const useAddJourneyExpense = create<State>((set, get) => ({
  journeyId: "",
  addJourneyExpenseData: { ...initialAddJourneyExpenseRequestDto },
  ///////////////////////////////////////////////////////////////////////////////////////////////
  initialize: (journey: Journey) => {
    const setting = useJourneyExpenseSetting.getState().initialize(journey);

    set(() => ({
      journeyId: journey.journeyId,
      addJourneyExpenseData: {
        ...initialAddJourneyExpenseRequestDto,
        payerName: setting.payer,
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
  },
  addExpense: async () => {
    try {
      const response = await axios.post<Journey>(
        `https://api.paytogether.kr/journeys/${get().journeyId}/expenses`,
        { ...get().addJourneyExpenseData }
      );

      if (response.status === 200) {
        useCommon.getState().addToast({
          type: "success",
          text: "지출이 추가됐습니다."
        });

        set(state => ({
          addJourneyExpenseData: {
            ...state.addJourneyExpenseData,
            category: "기타",
            memo: "",
            expenseDate: dayjs().format("YYYY-MM-DD"),
            members: state.addJourneyExpenseData.members.map(member => ({
              ...member,
              amount: 0
            })),
            amount: 0,
            remainingAmount: 0
          }
        }));
      } else {
        useCommon.getState().addToast({
          type: "error",
          text: "오류가 발생했습니다."
        });
      }
    } catch (error) {
      useCommon.getState().addToast({
        type: "error",
        text: "오류가 발생했습니다."
      });
    }
  }
}));

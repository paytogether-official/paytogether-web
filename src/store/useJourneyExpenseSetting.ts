import { CONST } from "CONST";
import { Journey } from "interfaces/Journey";
import { JourneyExpenseSetting } from "interfaces/JourneyExpenseSetting";
import { create } from "zustand";

interface State {
  journeyId: string;
  journeyExpenseSettingData: JourneyExpenseSetting;
  ///////////////////////////////////////////////////////////////////////////////////////////////
  initialize: (journey: Journey) => void;
  changeData: (key: keyof JourneyExpenseSetting, value: any) => void;
}

export const useJourneyExpenseSetting = create<State>((set, get) => ({
  journeyId: "",
  journeyExpenseSettingData: { payer: "", disabledMembers: [] },
  ///////////////////////////////////////////////////////////////////////////////////////////////
  initialize: (journey: Journey) => {
    const journeyExpenseSettingMap = JSON.parse(
      localStorage.getItem(CONST.LOCAL_STORAGE_KEY.JOURNEY_EXPENSE_SETTING) ??
        "{}"
    ) as Record<string, JourneyExpenseSetting>;

    const journeyExpenseSetting: JourneyExpenseSetting =
      journeyExpenseSettingMap[journey.journeyId] ?? {
        payer: journey.members[0].name,
        disabledMembers: []
      };

    if (
      journeyExpenseSetting.disabledMembers.includes(
        journeyExpenseSetting.payer
      )
    ) {
      journeyExpenseSetting.payer =
        journey.members.filter(
          member => !journeyExpenseSetting.disabledMembers.includes(member.name)
        )[0]?.name ?? "";
    }

    journeyExpenseSettingMap[journey.journeyId] = journeyExpenseSetting;

    set(() => ({
      journeyId: journey.journeyId,
      journeyExpenseSettingData: journeyExpenseSetting
    }));

    localStorage.setItem(
      CONST.LOCAL_STORAGE_KEY.JOURNEY_EXPENSE_SETTING,
      JSON.stringify(journeyExpenseSettingMap)
    );
  },
  changeData: (key, value) => {
    const journeyExpenseSettingData = {
      ...get().journeyExpenseSettingData,
      [key]: value
    };
    set(() => ({
      journeyExpenseSettingData
    }));

    const journeyExpenseSettingMap = JSON.parse(
      localStorage.getItem(CONST.LOCAL_STORAGE_KEY.JOURNEY_EXPENSE_SETTING) ??
        "{}"
    ) as Record<string, JourneyExpenseSetting>;

    journeyExpenseSettingMap[get().journeyId] = journeyExpenseSettingData;
    localStorage.setItem(
      CONST.LOCAL_STORAGE_KEY.JOURNEY_EXPENSE_SETTING,
      JSON.stringify(journeyExpenseSettingMap)
    );
  }
}));

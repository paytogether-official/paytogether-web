import { HiOutlineChevronRight } from "react-icons/hi";
import { useJourneyExpense } from "store/useJourneyExpense";
import { ReactComponent as AirplaneCheckedButton } from "../assets/svg/status=icn_Airplane_on.svg";
import { ReactComponent as BusCheckedButton } from "../assets/svg/status=icn_bus_on.svg";
import { ReactComponent as FoodCheckedButton } from "../assets/svg/status=icn_food_on.svg";
import { ReactComponent as HotelCheckedButton } from "../assets/svg/status=icn_hotel_on.svg";
import { ReactComponent as EtcCheckedButton } from "../assets/svg/status=icn_input_on.svg";
import { ReactComponent as ShoppingCheckedButton } from "../assets/svg/status=icn_shopping_on.svg";
import { ReactComponent as TicketCheckedButton } from "../assets/svg/status=icn_ticket_on.svg";

export const JourneyResultRatio = () => {
  const { journeyExpenseList, fetchJourneyExpenseList } = useJourneyExpense();

  const list = [
    {
      category: "기타",
      icon: <EtcCheckedButton className="w-[30px]" />
    },
    {
      category: "식비",
      icon: <FoodCheckedButton className="w-[30px]" />
    },
    {
      category: "교통",
      icon: <BusCheckedButton className="w-[30px]" />
    },
    {
      category: "관광",
      icon: <TicketCheckedButton className="w-[30px]" />
    },
    {
      category: "쇼핑",
      icon: <ShoppingCheckedButton className="w-[30px]" />
    },
    {
      category: "숙소",
      icon: <HotelCheckedButton className="w-[30px]" />
    },
    {
      category: "항공",
      icon: <AirplaneCheckedButton className="w-[30px]" />
    }
  ];

  const percentageList = list
    .map(item => item.category)
    .map(category => {
      const amount = journeyExpenseList?.expenses
        .filter(expense => expense.category === category)
        .map(expense => expense.amount)
        .reduce((a, b) => a + b, 0);
      const ratio = (amount ?? 0) / (journeyExpenseList?.totalAmount ?? 1);
      const percentage = (ratio * 100).toFixed(1);
      return Number(percentage);
    });

  return (
    <div className="journey-result-ratio pt-[30px]">
      <div className="flex flex-col gap-4">
        {list.map((item, index) => {
          const amount = journeyExpenseList?.expenses
            .filter(expense => expense.category === item.category)
            .map(expense => expense.amount)
            .reduce((a, b) => a + b, 0);

          const ratio = (amount ?? 0) / (journeyExpenseList?.totalAmount ?? 1);
          const percentage = Number((ratio * 100).toFixed(2));
          const maxPercentage = Math.max(...percentageList);

          return (
            <div key={index} className="flex items-center">
              <div className="w-[36px] h-[36px] mr-3 bg-[#DCEAFF] rounded-lg flex items-center justify-center">
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <div className="text-[14px] font-bold">{item.category}</div>
                  <HiOutlineChevronRight />
                </div>
                <div className="text-[12px]">{amount?.toLocaleString()}</div>
              </div>

              {/* Ratio Bar */}
              <div
                style={{ width: `${(percentage / maxPercentage) * 55}%` }}
                className="w-[55%] flex items-center justify-end relative"
              >
                <div className="text-[12px] font-semibold text-[#2C7EFF] absolute right-full pr-1 whitespace-nowrap">
                  {percentage}%
                </div>
                <div className="w-full h-[36px] bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-[#2C7EFF] rounded-lg"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

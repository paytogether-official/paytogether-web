import { HiOutlineChevronRight } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import { useJourneyResult } from "store/useJourneyResult";
import { ReactComponent as AirplaneCheckedButton } from "../assets/svg/status=icn_Airplane_on.svg";
import { ReactComponent as BusCheckedButton } from "../assets/svg/status=icn_bus_on.svg";
import { ReactComponent as FoodCheckedButton } from "../assets/svg/status=icn_food_on.svg";
import { ReactComponent as HotelCheckedButton } from "../assets/svg/status=icn_hotel_on.svg";
import { ReactComponent as EtcCheckedButton } from "../assets/svg/status=icn_input_on.svg";
import { ReactComponent as ShoppingCheckedButton } from "../assets/svg/status=icn_shopping_on.svg";
import { ReactComponent as TicketCheckedButton } from "../assets/svg/status=icn_ticket_on.svg";

export const JourneyResultRatio = () => {
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  const { journeyResult } = useJourneyResult();

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

  return (
    <div className="journey-result-ratio pt-[30px]">
      <div className="flex flex-col gap-4">
        {list.map((item, index) => {
          const expenseCategory = journeyResult?.expenseCategories.find(
            expenseCategory => expenseCategory.category === item.category
          );

          const amount = expenseCategory?.amount ?? 0;

          const percentage = expenseCategory?.percentage ?? 0;

          const maxPercentage = Math.max(
            ...(journeyResult?.expenseCategories.map(
              expenseCategory => expenseCategory.percentage
            ) ?? [100])
          );

          return (
            <div key={index} className="flex items-center">
              <div className="w-[36px] h-[36px] mr-3 bg-[#DCEAFF] rounded-lg flex items-center justify-center">
                {item.icon}
              </div>
              <div className="flex-1">
                <div
                  className="inline-flex items-center cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/journey/${id}/result/detail?category=${item.category}`
                    )
                  }
                >
                  <div className="text-[14px] font-bold">{item.category}</div>
                  <HiOutlineChevronRight />
                </div>
                <div className="text-[12px]">{amount?.toLocaleString()}</div>
              </div>

              {/* Ratio Bar */}
              <div
                style={{
                  width: `${(percentage / maxPercentage) * 55}%`
                }}
                className="w-[55%] flex items-center justify-end relative"
              >
                <div className="text-[12px] font-semibold text-[#2C7EFF] absolute right-full pr-1 whitespace-nowrap">
                  {percentage}%
                </div>
                <div className="w-full h-[36px] bg-gray-100 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-[#2C7EFF] rounded-lg" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

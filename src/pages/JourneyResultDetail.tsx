import dayjs from "dayjs";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { FaCaretDown, FaCheckCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import { useJourneyExpense } from "store/useJourneyExpense";
import { ReactComponent as AirplaneCheckedButton } from "../assets/svg/status=icn_Airplane_on.svg";
import { ReactComponent as BusCheckedButton } from "../assets/svg/status=icn_bus_on.svg";
import { ReactComponent as FoodCheckedButton } from "../assets/svg/status=icn_food_on.svg";
import { ReactComponent as HotelCheckedButton } from "../assets/svg/status=icn_hotel_on.svg";
import { ReactComponent as EtcCheckedButton } from "../assets/svg/status=icn_input_on.svg";
import { ReactComponent as ShoppingCheckedButton } from "../assets/svg/status=icn_shopping_on.svg";
import { ReactComponent as TicketCheckedButton } from "../assets/svg/status=icn_ticket_on.svg";
import { BottomSheet } from "../components/BottomSheet";
import { Header } from "../components/Header";
import { ToggleSwitch } from "../components/ToggleSwitch";
import { useJourney } from "../store/useJourney";

export const JourneyResultDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [category, setCategory] = useState<string>("기타");
  const [currency, setCurrency] = useState("");
  const [showCategoryChangeModal, setShowCategoryChangeModal] = useState(false);

  const { journey, fetchJourneyWithCurrency } = useJourney();
  const { journeyExpenseList, fetchJourneyExpenseList } = useJourneyExpense(); // Assuming this is a custom hook to fetch journey expense data

  useEffect(() => {
    // get category form url
    // ex ?category=기타
    const category = new URLSearchParams(window.location.search).get(
      "category"
    );

    if (category) {
      setCategory(category);
    }
  }, []);

  useEffect(() => {
    if (journey?.baseCurrency) {
      setCurrency(journey.baseCurrency);
      fetchJourneyExpenseList(id!, journey.baseCurrency);
      fetchJourneyWithCurrency(id!, journey.baseCurrency);
    }
  }, [journey?.baseCurrency]);

  const handleChangeCurrency = (newCurrency: string) => {
    setCurrency(newCurrency);
    fetchJourneyExpenseList(id!, newCurrency);
    fetchJourneyWithCurrency(id!, newCurrency);
  };

  const expensesByCategory = useMemo(() => {
    return journeyExpenseList?.expenses?.filter(
      expense => expense.category === category
    );
  }, [journeyExpenseList, category]);

  const expensesByDate = useMemo(() => {
    return _.groupBy(
      _.sortBy(expensesByCategory, "expenseDate"),
      "expenseDate"
    );
  }, [expensesByCategory]);

  const totalAmountByCategory = useMemo(() => {
    return expensesByCategory?.reduce((total, expense) => {
      return total + expense.amount;
    }, 0);
  }, [journeyExpenseList, category]);

  return (
    <div className="journey-result-detail">
      <Header
        leftType="back"
        title=""
        onClickLeft={() => navigate(`/journey/${id}/result`)}
      />

      <div className="flex justify-between items-center">
        <div
          className="text-[24px] font-bold flex items-center cursor-pointer"
          onClick={() => setShowCategoryChangeModal(true)}
        >
          {`${category}에`} <FaCaretDown className="text-[22px] ml-1" />
        </div>
        {journey?.baseCurrency !== "KRW" && (
          <ToggleSwitch
            options={[
              { label: "KRW", value: "KRW" },
              { label: journey?.baseCurrency!, value: journey?.baseCurrency! }
            ]}
            value={currency}
            onChange={handleChangeCurrency}
          />
        )}
      </div>
      <div className="text-[24px] font-bold mb-4">
        <span className="text-[#2C7EFF]">{`${totalAmountByCategory?.toLocaleString()} `}</span>
        쓰셨어요
      </div>

      {Object.entries(expensesByDate).map(([date, expenses]) => (
        <div key={date} className="mb-4">
          <div className="text-[12px] font-semibold mb-2">
            {dayjs(date).format("M월 D일")}
          </div>
          {expenses.map(expense => (
            <div
              key={expense.journeyExpenseId}
              className="py-2 px-3 rounded-2xl bg-[#FAFAFB] mb-2 cursor-pointer"
              onClick={() => {
                navigate(`/journey/${id}/${expense.journeyExpenseId}`);
              }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <div className="w-[20px] h-[20px] mr-2 bg-[#DCEAFF] rounded-sm flex items-center justify-center">
                      {expense.category === "기타" && (
                        <EtcCheckedButton className="w-[15px]" />
                      )}
                      {expense.category === "식비" && (
                        <FoodCheckedButton className="w-[15px]" />
                      )}
                      {expense.category === "교통" && (
                        <BusCheckedButton className="w-[15px]" />
                      )}
                      {expense.category === "관광" && (
                        <TicketCheckedButton className="w-[15px]" />
                      )}
                      {expense.category === "쇼핑" && (
                        <ShoppingCheckedButton className="w-[15px]" />
                      )}
                      {expense.category === "숙소" && (
                        <HotelCheckedButton className="w-[15px]" />
                      )}
                      {expense.category === "항공" && (
                        <AirplaneCheckedButton className="w-[15px]" />
                      )}
                    </div>

                    <span className="text-[14px] font-semibold">
                      {expense.categoryDescription}
                    </span>
                  </div>
                  <div className="text-[12px] text-[#343942]">
                    {`${expense.payerName} 외 ${
                      (expense.members.length ?? 1) - 1
                    }명`}
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-[20px] font-bold mr-1">
                    {expense.amount.toLocaleString()}
                  </span>
                  <span className="rounded-lg bg-[#343942] text-[#fff] text-[10px] font-semibold p-1">
                    {expense.quoteCurrency}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      <BottomSheet
        title="지출"
        isOpen={showCategoryChangeModal}
        onClose={() => setShowCategoryChangeModal(false)}
      >
        {["기타", "식비", "교통", "관광", "쇼핑", "숙소", "항공"].map(
          option => (
            <div
              key={option}
              className="text-[14px] font-semibold px-3 py-2 mb-2 flex justify-between items-center cursor-pointer"
              onClick={() => {
                setCategory(option);
                setShowCategoryChangeModal(false);
              }}
            >
              <span>{option}</span>
              {category === option && (
                <FaCheckCircle className="text-[22px] text-[#2C7EFF]" />
              )}
            </div>
          )
        )}
      </BottomSheet>
    </div>
  );
};

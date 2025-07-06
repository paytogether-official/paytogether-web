import dayjs from "dayjs";
import { JourneyExpense } from "interfaces/JourneyExpense";
import _ from "lodash";
import React, { useEffect, useMemo } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { FaCaretDown } from "react-icons/fa";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { useJourney } from "store/useJourney";
import { useJourneyExpense } from "store/useJourneyExpense";
import { ReactComponent as AirplaneCheckedButton } from "../assets/svg/status=icn_Airplane_on.svg";
import { ReactComponent as BusCheckedButton } from "../assets/svg/status=icn_bus_on.svg";
import { ReactComponent as FoodCheckedButton } from "../assets/svg/status=icn_food_on.svg";
import { ReactComponent as HotelCheckedButton } from "../assets/svg/status=icn_hotel_on.svg";
import { ReactComponent as EtcCheckedButton } from "../assets/svg/status=icn_input_on.svg";
import { ReactComponent as ShoppingCheckedButton } from "../assets/svg/status=icn_shopping_on.svg";
import { ReactComponent as TicketCheckedButton } from "../assets/svg/status=icn_ticket_on.svg";
import {
  SortBottomSheet,
  SortOption,
  sortStringMap
} from "../components/bottomSheets/SortBottomSheet";
import { ToggleSwitch } from "../components/ToggleSwitch";

export const JourneyExpenseList = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [tab, setTab] = React.useState("ALL");
  const [showSortModal, setShowSortModal] = React.useState(false);
  const [currency, setCurrency] = React.useState("");
  const [sort, setSort] = React.useState<SortOption>("oldest");
  const [showSummary, setShowSummary] = React.useState(false);

  const { journey, fetchJourneyWithCurrency } = useJourney();
  const { journeyExpenseList, fetchJourneyExpenseList } = useJourneyExpense(); // Assuming this is a custom hook to fetch journey expense data

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

  const totalAmount = useMemo(() => {
    let total = 0;
    journeyExpenseList?.expenses?.forEach(expense => {
      if (expense.amount) {
        total = Math.round((total + expense.amount) * 100) / 100; // 소수점 둘째 자리에서 버림
      }
    });
    return total;
  }, [journeyExpenseList]);

  const journeyDate = useMemo(() => {
    if (!journey?.startDate || !journey?.endDate) return "";

    const start = dayjs(journey?.startDate);
    const end = dayjs(journey?.endDate);
    return `${start.format("YY년 M월 D일")} - ${
      start.year === end.year
        ? end.format("M월 D일")
        : end.format("YY년 M월 D일")
    }`;
  }, [journey?.startDate, journey?.endDate]);

  const tabList = useMemo(() => {
    if (!journey?.startDate || !journey?.endDate) return [];

    const days = [];
    // delta start ~ end
    const diff =
      dayjs(journey.endDate).diff(dayjs(journey.startDate), "day") + 1;

    for (let i = 1; i <= diff; i++) {
      days.push(i);
    }
    return ["ALL", ...days, "ETC"].map(item => ({
      key: item,
      title: item === "ALL" ? "전체" : item === "ETC" ? "그외" : `${item}일차`
    }));
  }, [journey]);

  const expenseList = useMemo(() => {
    let list: JourneyExpense[] = [];
    if (tab === "ALL") {
      list = journeyExpenseList?.expenses ?? [];
    } else if (tab === "ETC") {
      list =
        journeyExpenseList?.expenses?.filter(
          expense =>
            expense.expenseDate < journey?.startDate! ||
            expense.expenseDate > journey?.endDate!
        ) ?? [];
    } else {
      const day = Number(tab);
      if (isNaN(day)) return [];
      const date = dayjs(journey?.startDate)
        .add(day - 1, "day")
        .format("YYYY-MM-DD");
      list =
        journeyExpenseList?.expenses?.filter(
          expense => expense.expenseDate === date
        ) ?? [];
    }

    if (sort === "oldest") {
      list = _.sortBy(list, "expenseDate");
    } else if (sort === "latest") {
      list = _.sortBy(list, "expenseDate").reverse();
    }

    return _.groupBy(list, "expenseDate");
  }, [journeyExpenseList, tab, sort, journey]);

  return (
    <div className="journey-expense-list">
      <div className="flex justify-between items-center">
        <div className="text-[16px] font-bold">{journey?.title}</div>
        <ToggleSwitch
          options={[
            { label: "KRW", value: "KRW" },
            { label: journey?.baseCurrency!, value: journey?.baseCurrency! }
          ]}
          value={currency}
          onChange={handleChangeCurrency}
        />
      </div>
      <div className="text-[12px] font-semibold mb-2">{`${
        journey?.members[0].name ?? ""
      } 외 ${(journey?.members.length ?? 1) - 1}명`}</div>
      <div className="text-[24px] font-bold flex items-center gap-1">
        총 {totalAmount.toLocaleString()}{" "}
        <span
          className="cursor-pointer"
          onClick={() => setShowSummary(!showSummary)}
        >
          {showSummary ? <HiChevronUp /> : <HiChevronDown />}
        </span>
      </div>
      {showSummary && (
        <div className="flex gap-2 overflow-y-auto my-2">
          {journey?.dailyExpenseSumByDate.map(item => (
            <div key={item.date} className="px-2 py-1 bg-[#FAFAFB] rounded-lg">
              <div className="text-[12px] whitespace-nowrap">{item.date}</div>
              <div className="text-[14px] whitespace-nowrap font-semibold">
                {item.totalAmount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="text-[12px] mb-3">{journeyDate}</div>
      <div className="bg-[#F3F4F8] h-[4px] ml-[-16px] mr-[-16px]" />
      <div className="text-[16px] font-bold pt-3 pb-2">상세내역</div>
      <Tabs activeKey={tab} onSelect={t => setTab(t!)}>
        {tabList.map(tabItem => (
          <Tab key={tabItem.key} eventKey={tabItem.key} title={tabItem.title} />
        ))}
      </Tabs>
      <div className="bg-[#F3F4F8] h-[1px] ml-[-16px] mr-[-16px] mb-2" />
      <div className="text-right text-[12px] font-semibold flex justify-end mb-2">
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => setShowSortModal(true)}
        >
          {sortStringMap[sort]} <FaCaretDown />
        </div>
      </div>

      {Object.entries(expenseList).map(([date, expenses]) => (
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

      <SortBottomSheet
        showModal={showSortModal}
        onClose={() => setShowSortModal(false)}
        defaultSort={sort}
        onChange={sort => {
          setSort(sort);
        }}
      />
    </div>
  );
};

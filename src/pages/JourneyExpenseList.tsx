import dayjs from "dayjs";
import { JourneyExpense } from "interfaces/JourneyExpense";
import _ from "lodash";
import React, { useEffect, useMemo } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { FaCaretDown } from "react-icons/fa";
import { HiChevronDown } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { useJourney } from "store/useJourney";
import { useJourneyExpense } from "store/useJourneyExpense";
import { ReactComponent as ShotCutIcon } from "../assets/svg/shotcut.svg";
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

  const { journey } = useJourney();
  const { journeyExpenseList, fetchJourneyExpenseList } = useJourneyExpense(); // Assuming this is a custom hook to fetch journey expense data

  useEffect(() => {
    if (journey?.baseCurrency) {
      setCurrency(journey.baseCurrency);
      fetchJourneyExpenseList(id!, journey.baseCurrency);
    }
  }, [journey?.baseCurrency]);

  const handleChangeCurrency = (newCurrency: string) => {
    setCurrency(newCurrency);
  };

  const totalAmount = useMemo(() => {
    let total = 0;
    journeyExpenseList.forEach(expense => {
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
      list = journeyExpenseList;
    } else if (tab === "ETC") {
      list = journeyExpenseList.filter(
        expense =>
          expense.expenseDate < journey?.startDate! ||
          expense.expenseDate > journey?.endDate!
      );
    } else {
      const day = Number(tab);
      if (isNaN(day)) return [];
      const date = dayjs(journey?.startDate)
        .add(day - 1, "day")
        .format("YYYY-MM-DD");
      list = journeyExpenseList.filter(expense => expense.expenseDate === date);
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
            { label: journey?.quoteCurrency!, value: journey?.quoteCurrency! },
            { label: journey?.baseCurrency!, value: journey?.baseCurrency! }
          ]}
          value={currency}
          onChange={handleChangeCurrency}
        />
      </div>
      <div className="text-[12px] font-semibold mb-2">{`${
        journey?.members[0].name
      } 외 ${(journey?.members.length ?? 1) - 1}명`}</div>
      <div className="text-[24px] font-bold flex items-center gap-1">
        총 {totalAmount.toLocaleString()} <HiChevronDown />
      </div>
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
          <div className="text-[12px] font-semibold mb-3">
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
                    <ShotCutIcon className="mr-2" />
                    <span className="text-[14px] font-semibold">항목명</span>
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

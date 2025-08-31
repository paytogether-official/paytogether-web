import { ToggleSwitch } from "components/ToggleSwitch";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { useJourney } from "store/useJourney";
import { useJourneyExpense } from "store/useJourneyExpense";
import { Header, HeaderType } from "../components/Header";

export const JourneyResult = () => {
  const navigate = useNavigate();

  const { id } = useParams<{
    id: string;
  }>();

  const [currency, setCurrency] = useState("");
  const [showSummary, setShowSummary] = useState(false);

  const { journey, fetchJourney, fetchJourneyWithCurrency } = useJourney();
  const { journeyExpenseList, fetchJourneyExpenseList } = useJourneyExpense(); // Assuming this is a custom hook to fetch journey expense data

  useEffect(() => {
    // 여정 정보를 불러온다.
    fetchJourney(id!);
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

  useEffect(() => {
    if (journey && !journey?.closedAt) {
      // 종료되지 않은 여정은 여정 페이지로 이동
      navigate(`/journey/${id}`);
    }
  }, [journey]);

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

  return (
    <div className="journey-result">
      <Header
        leftType="back"
        title={"정산결과"}
        onClickLeft={() => {
          navigate(`/journey/${id}`);
        }}
        rightType={["kebab"]}
        onClickRight={(type: HeaderType) => {
          console.log("click right menu");
        }}
      />

      <div className="flex justify-between items-center">
        <div className="text-[16px] font-bold">{journey?.title}</div>
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
    </div>
  );
};

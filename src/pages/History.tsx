import dayjs from "dayjs";
import "dayjs/locale/ko";
import _ from "lodash";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useJourneyList } from "store/useJourneyList";
import { Header } from "../components/Header";
dayjs.locale("ko");

export const History = () => {
  const { closedJourneyList, fetchJourneyList } = useJourneyList();
  const navigate = useNavigate();

  useEffect(() => {
    fetchJourneyList();
  }, []);

  const groupByMonth = _.groupBy(
    _.sortBy(closedJourneyList, "closedAt").reverse(),
    journey => {
      return dayjs(journey.closedAt!).format("YY년 MM월");
    }
  );

  return (
    <div className="history">
      <Header
        leftType="back"
        onClickLeft={() => {
          navigate(`/`);
        }}
        title="지난 여정"
      />
      <div className="pt-3">
        {_.isEmpty(closedJourneyList) ? (
          <div className="text-center py-10 text-[16px]">
            지난 여정이 없습니다
          </div>
        ) : (
          Object.entries(groupByMonth).map(([month, journeys]) => (
            <div key={month} className="mb-3">
              <div className="text-[12px] font-semibold mb-2">{month}</div>
              {journeys.map(journey => (
                <div
                  key={journey.journeyId}
                  className="rounded-2xl bg-[#FAFAFB] mb-2 cursor-pointer p-3"
                  onClick={() => {
                    navigate(`/journey/${journey.journeyId}`);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-[16px] font-bold flex-1">
                      {journey.title}
                    </div>
                    <div className="text-[12px] text-[#6D7582]">
                      {`${dayjs(journey.startDate!).format("MM")}월 ${dayjs(
                        journey.startDate!
                      ).format("DD")}일(${dayjs(journey.startDate!).format(
                        "ddd"
                      )}) `}
                      -
                      {` ${dayjs(journey.endDate!).format("MM")}월 ${dayjs(
                        journey.endDate!
                      ).format("DD")}일(${dayjs(journey.endDate!).format(
                        "ddd"
                      )})`}
                    </div>
                  </div>
                  <div className="text-[12px] font-semibold">
                    {`${journey.members[0].name}`}
                    {journey.members.length > 1
                      ? `외 ${journey.members.length - 1}명`
                      : ""}
                  </div>
                  <div className="h-[2px] border-1 border-[#2C7EFF] my-2" />
                  <div className="flex items-end justify-between">
                    <div className="flex items-center">
                      <div className="text-[24px] font-bold text-[#2C7EFF]">
                        {journey.totalExpenseAmount.toLocaleString()}
                      </div>
                      <span className="h-[20px] px-2 text-[14px] font-semibold text-white bg-[#2C7EFF] rounded-full ml-1">
                        {journey.baseCurrency}
                      </span>
                    </div>
                    <div className="text-[12px] font-semibold pb-1">
                      총 {journey.totalExpenseCount} 항목
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

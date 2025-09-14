import { HiArrowRight } from "react-icons/hi2";
import { useJourneyResult } from "store/useJourneyResult";

export const JourneyResultResult = () => {
  const { journeyResult } = useJourneyResult();

  // 정산 데이터가 없거나 로딩 중일 때
  if (!journeyResult?.settlements?.length) {
    return (
      <div className="pt-[30px] text-center text-gray-500">
        정산 내역이 없습니다.
      </div>
    );
  }

  return (
    <div className="pt-[30px]">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-2 px-2">
        <div className="flex-1 text-center text-[12px] font-semibold">
          보내는 사람
        </div>
        <div className="flex-1 flex justify-center">
          <HiArrowRight size={22} color="#2C7EFF" strokeWidth={1} />
        </div>
        <div className="flex-1 text-center text-[12px] font-semibold">
          받는 사람
        </div>
      </div>

      {/* 정산 내역 리스트 */}
      <div className="flex flex-col gap-3 mb-4">
        {journeyResult.settlements.map((settlement, index) => (
          <div
            key={index}
            className="rounded-2xl bg-[#FAFAFB] h-[48px] text-[14px] font-semibold flex items-center p-2"
          >
            <div className="flex-1 rounded-xl bg-white text-[#151719] h-[32px] leading-[1] text-center p-2 overflow-hidden text-ellipsis whitespace-nowrap">
              {settlement.fromMemberName}
            </div>

            <div className="flex-1 text-center text-[#2C7EFF]">
              {settlement.amount.toLocaleString()}
            </div>

            <div className="flex-1 rounded-xl bg-white text-[#151719] h-[32px] leading-[1] text-center p-2 overflow-hidden text-ellipsis whitespace-nowrap">
              {settlement.toMemberName}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#F3F4F8] h-[4px] ml-[-16px] mr-[-16px] mb-4" />

      {/* 개인 별 지출 내역 */}
      <div className="text-[12px] font-semibold mb-2">개인별 지출 금액</div>
      <div className="flex flex-col gap-3">
        {journeyResult?.memberExpenses.map((memberExpense, index) => (
          <div
            key={index}
            className="rounded-2xl bg-[#FAFAFB] h-[48px] text-[14px] font-semibold flex items-center justify-between p-2"
          >
            <div className="text-[14px] font-semibold">
              {memberExpense.name}
            </div>

            <div className="text-[14px] font-semibold text-[#2C7EFF]">
              {memberExpense.amount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from "react";
import { ToggleSwitch } from "../components/ToggleSwitch";
import { HiChevronDown } from "react-icons/hi2";
import { Tab, Tabs } from "react-bootstrap";
import { FaCaretDown } from "react-icons/fa";
import { SortBottomSheet } from "../components/bottomSheets/SortBottomSheet";
import { ReactComponent as ShotCutIcon } from "../assets/svg/shotcut.svg";
import { useNavigate, useParams } from "react-router-dom";

export const JourneyExpenseList = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [tab, setTab] = React.useState("ALL");
  const [showSortModal, setShowSortModal] = React.useState(false);

  return (
    <div className="journey-expense-list">
      <div className="flex justify-between items-center">
        <div className="text-[16px] font-bold">여정제목</div>
        <ToggleSwitch
          options={[
            { label: "KRW", value: "KRW" },
            { label: "JPY", value: "JPY" }
          ]}
          value="JPY"
          onChange={() => {}}
        />
      </div>
      <div className="text-[12px] font-semibold mb-2">여정 생산자 외 3명</div>
      <div className="text-[24px] font-bold flex items-center gap-1">
        총 123,432 <HiChevronDown />
      </div>
      <div className="text-[12px] mb-3">24년 4월 13일 - 4월 17일</div>
      <div className="bg-[#F3F4F8] h-[4px] ml-[-16px] mr-[-16px]" />
      <div className="text-[16px] font-bold pt-3 pb-2">상세내역</div>
      <Tabs activeKey={tab} onSelect={t => setTab(t!)}>
        <Tab eventKey="ALL" title="전체" />
        <Tab eventKey="D1" title="1일차" />
        <Tab eventKey="D2" title="2일차" />
        <Tab eventKey="D3" title="3일차" />
        <Tab eventKey="D4" title="4일차" />
        <Tab eventKey="D5" title="5일차" />
        <Tab eventKey="D6" title="6일차" />
        <Tab eventKey="D7" title="7일차" />
        <Tab eventKey="D8" title="8일차" />
        <Tab eventKey="D9" title="9일차" />
        <Tab eventKey="D10" title="10일차" />
        <Tab eventKey="D11" title="11일차" />
      </Tabs>
      <div className="bg-[#F3F4F8] h-[1px] ml-[-16px] mr-[-16px] mb-2" />
      <div className="text-right text-[12px] font-semibold flex justify-end mb-2">
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => setShowSortModal(true)}
        >
          오래된 순 <FaCaretDown />
        </div>
      </div>

      <div className="text-[12px] font-semibold mb-2">4월 13일</div>
      <div
        className="py-2 px-3 rounded-2xl bg-[#FAFAFB] mb-2 cursor-pointer"
        onClick={() => {
          navigate(`/journey/${id}/1`);
        }}
      >
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <ShotCutIcon className="mr-2" />
              <span className="text-[14px] font-semibold">항목명</span>
            </div>
            <div className="text-[12px] text-[#343942]">
              정산 입력자 외 몇명
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-[20px] font-bold mr-1">343,123</span>
            <span className="rounded-lg bg-[#343942] text-[#fff] text-[10px] font-semibold p-1">
              JPY
            </span>
          </div>
        </div>
      </div>
      <div className="py-2 px-3 rounded-2xl bg-[#FAFAFB] mb-2">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <ShotCutIcon className="mr-2" />
              <span className="text-[14px] font-semibold">항목명</span>
            </div>
            <div className="text-[12px] text-[#343942]">
              정산 입력자 외 몇명
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-[20px] font-bold mr-1">343,123</span>
            <span className="rounded-lg bg-[#343942] text-[#fff] text-[10px] font-semibold p-1">
              JPY
            </span>
          </div>
        </div>
      </div>
      <div className="py-2 px-3 rounded-2xl bg-[#FAFAFB] mb-3">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <ShotCutIcon className="mr-2" />
              <span className="text-[14px] font-semibold">항목명</span>
            </div>
            <div className="text-[12px] text-[#343942]">
              정산 입력자 외 몇명
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-[20px] font-bold mr-1">343,123</span>
            <span className="rounded-lg bg-[#343942] text-[#fff] text-[10px] font-semibold p-1">
              JPY
            </span>
          </div>
        </div>
      </div>

      <div className="text-[12px] font-semibold mb-2">4월 14일</div>
      <div className="py-2 px-3 rounded-2xl bg-[#FAFAFB] mb-2">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <ShotCutIcon className="mr-2" />
              <span className="text-[14px] font-semibold">항목명</span>
            </div>
            <div className="text-[12px] text-[#343942]">
              정산 입력자 외 몇명
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-[20px] font-bold mr-1">343,123</span>
            <span className="rounded-lg bg-[#343942] text-[#fff] text-[10px] font-semibold p-1">
              JPY
            </span>
          </div>
        </div>
      </div>
      <div className="py-2 px-3 rounded-2xl bg-[#FAFAFB] mb-2">
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <ShotCutIcon className="mr-2" />
              <span className="text-[14px] font-semibold">항목명</span>
            </div>
            <div className="text-[12px] text-[#343942]">
              정산 입력자 외 몇명
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-[20px] font-bold mr-1">343,123</span>
            <span className="rounded-lg bg-[#343942] text-[#fff] text-[10px] font-semibold p-1">
              JPY
            </span>
          </div>
        </div>
      </div>

      <SortBottomSheet
        showModal={showSortModal}
        onClose={() => setShowSortModal(false)}
        defaultSort="oldest"
        onChange={sort => {
          console.log("Selected sort:", sort);
          setShowSortModal(false);
        }}
      />
    </div>
  );
};

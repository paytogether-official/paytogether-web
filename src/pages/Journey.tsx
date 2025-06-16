import classNames from "classnames";
import { BottomSheet } from "components/BottomSheet";
import React, { useEffect } from "react";
import { Modal, Tab, Tabs } from "react-bootstrap";
import { HiDotsVertical } from "react-icons/hi";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useJourney } from "store/useJourney";
import { useJourneyList } from "store/useJourneyList";
import { Header } from "../components/Header";
import { SideModal } from "../components/SideModal";
import { JourneyAddExpense } from "./JourneyAddExpense";
import { JourneyExpenseList } from "./JourneyExpenseList";

export const Journey = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation(); // 현재 URL 정보 가져오기
  const navigate = useNavigate();

  const [tab, setTab] = React.useState("ADD");
  const [showSideModal, setShowSideModal] = React.useState(false);
  const [showBottomSheet, setShowBottomSheet] = React.useState(false);
  const [showCloseConfirmModal, setShowCloseConfirmModal] =
    React.useState(false);

  const { journeyList, fetchJourneyList, closeJourney } = useJourneyList();
  const { journey, fetchJourney } = useJourney();

  useEffect(() => {
    fetchJourneyList();
    fetchJourney(id!);

    const queryParams = new URLSearchParams(location.search); // 쿼리 문자열 파싱
    const menuParam = queryParams.get("menu"); // ?example=value 읽기
    if (menuParam) {
      setTab(menuParam);
      navigate(location.pathname, { replace: true }); // URL에서 쿼리 문자열 제거
    }
  }, [id]);

  return (
    <div className="journey">
      <Header
        leftType="menu"
        title={journey?.title}
        onClickLeft={() => setShowSideModal(true)}
      />
      <div className="pt-3">
        <div className="flex justify-between items-center mb-3">
          <Tabs activeKey={tab} onSelect={k => setTab(k!)}>
            <Tab eventKey="ADD" title="지출 추가" />
            <Tab eventKey="LIST" title="목록 보기" />
          </Tabs>
          <div
            className="cursor-pointer"
            onClick={() => setShowBottomSheet(true)}
          >
            <HiDotsVertical className="text-[22px]" />
          </div>
        </div>

        {tab === "ADD" && <JourneyAddExpense />}
        {tab === "LIST" && <JourneyExpenseList />}
      </div>

      <SideModal show={showSideModal} onHide={() => setShowSideModal(false)}>
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="text-[16px] font-bold mb-4">여정관리</div>
            <div className="flex flex-col gap-2">
              {journeyList.map(item => (
                <div
                  key={item.journeyId}
                  className={classNames(
                    "rounded-lg bg-[#FAFAFB] px-3 h-[48px] flex items-center",
                    {
                      "cursor-pointer": item.journeyId !== journey?.journeyId
                    }
                  )}
                  onClick={() => {
                    if (item.journeyId !== journey?.journeyId) {
                      setShowSideModal(false);
                      navigate(`/journey/${item.journeyId}`);
                    }
                  }}
                >
                  <span
                    className={classNames("text-[14px] font-semibold mr-2", {
                      "text-[#2C7EFF]": item.journeyId === journey?.journeyId
                    })}
                  >
                    {item.title}
                  </span>
                  {item.journeyId === journey?.journeyId && (
                    <span className="text-[12px] font-semibold rounded-lg bg-[#2C7EFF] text-[#fff] px-2 py-1">
                      현재
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              to="/journey/create"
              className="btn btn-primary w-full h-[48px] flex justify-center items-center"
            >
              새 여정 만들기
            </Link>
            <Link
              to="/"
              className="btn btn-info w-full h-[48px] flex justify-center items-center"
            >
              홈으로
            </Link>
          </div>
        </div>
      </SideModal>

      <BottomSheet
        isOpen={showBottomSheet}
        onClose={() => setShowBottomSheet(false)}
      >
        <div className="flex flex-col gap-2 mb-5">
          <div
            className="rounded-lg bg-[#FAFAFB] text-[14px] font-medium h-[48px] flex justify-center items-center cursor-pointer"
            onClick={() => {
              setShowBottomSheet(false);
              setShowCloseConfirmModal(true);
            }}
          >
            여정 마무리
          </div>
        </div>
      </BottomSheet>

      <Modal
        centered
        show={showCloseConfirmModal}
        onHide={() => setShowCloseConfirmModal(false)}
      >
        <Modal.Body>
          <div className="text-center">
            <img
              src="/images/Travel_Insurance.png"
              alt="Close Confirm"
              className="inline-block mb-1"
            />
            <div className="text-[18px] font-bold mb-1">
              여정을 마무리하시겠어요?
            </div>
            <div className="text-[14px] mb-4">
              더 이상 항목을 추가할 수 없어요
            </div>
            <div className="flex justify-center gap-2">
              <button
                className="btn btn-light btn-lg text-[16px] font-semibold flex-1"
                onClick={() => setShowCloseConfirmModal(false)}
              >
                닫기
              </button>
              <button
                className="btn btn-primary btn-lg text-[16px] font-semibold flex-1"
                onClick={() => {
                  setShowCloseConfirmModal(false);
                  closeJourney(id!);
                }}
              >
                마무리하기
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

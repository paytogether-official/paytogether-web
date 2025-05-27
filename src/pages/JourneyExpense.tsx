import React from "react";
import { Header } from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { ToggleSwitch } from "../components/ToggleSwitch";
import { BottomSheet } from "../components/BottomSheet";
import { Modal } from "react-bootstrap";
import { ReactComponent as DeleteIcon } from "../assets/svg/Delete.svg";

export const JourneyExpense = () => {
  const navigate = useNavigate();

  const { id, journeyExpenseId } = useParams<{
    id: string;
    journeyExpenseId: string;
  }>();

  const [showModal, setShowModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  return (
    <div className="journey-expense">
      <Header
        leftType="back"
        onClickLeft={() => {
          navigate(`/journey/${id}`); // 여정 페이지로 돌아가기
        }}
        rightType="kebab" // TODO: 완료된 아이콘은 표시 안함
        onClickRight={() => setShowModal(true)}
      />
      <div className="flex justify-between items-center mt-2">
        <div className="text-[18px] font-bold">여정제목</div>
        <ToggleSwitch
          options={[
            { label: "KRW", value: "KRW" },
            { label: "JPY", value: "JPY" }
          ]}
          value="JPY"
          onChange={() => {}}
        />
      </div>
      <div className="text-[12px] text-[#6D7582] mb-2">여정 생산자 외 3명</div>
      <div className="mb-3">
        <span className="text-[24px] font-bold text-[#2C7EFF] mr-1">
          321,212
        </span>
        <span className="text-[14px] font-bold text-[#343942]">KRW</span>
      </div>

      <div className="flex flex-col gap-2 mb-3">
        <div className="journey-add-expense__user">
          <div className="flex gap-2">
            <span className="journey-add-expense__user-name">가망이</span>
            <span className="journey-add-expense__calculate-badge">계산</span>
          </div>
          <div className="journey-add-expense__user-amount">3,423</div>
        </div>
        <div className="journey-add-expense__user">
          <div className="flex gap-2">
            <span className="journey-add-expense__user-name">나망이</span>
          </div>
          <div className="journey-add-expense__user-amount">3,423</div>
        </div>
        <div className="journey-add-expense__user">
          <div className="flex gap-2">
            <span className="journey-add-expense__user-name">다망이</span>
          </div>
          <div className="journey-add-expense__user-amount">3,423</div>
        </div>
        <div className="journey-add-expense__user">
          <div className="flex gap-2">
            <span className="journey-add-expense__user-name">라망이</span>
          </div>
          <div className="journey-add-expense__user-amount">3,423</div>
        </div>
      </div>

      <div className="rounded-2xl bg-[#FAFAFB] flex items-center p-5 text-[14px] text-[#343942] font-semibold mb-3">
        고기는 대철님이 먹기위해서 구매했음
      </div>

      <div className="rounded-2xl bg-[#FAFAFB] flex justify-center items-center p-5 text-[14px] text-[#B1B8C0] font-semibold mb-3">
        기록된 메모가 없습니다.
      </div>

      <BottomSheet isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="rounded-lg bg-[#FAFAFB] text-[#151719] text-[14px] py-3 text-center font-medium mb-2 cursor-pointer">
          항목 수정하기
        </div>
        <div className="rounded-lg bg-[#FAFAFB] text-[#151719] text-[14px] py-3 text-center font-medium mb-2 cursor-pointer">
          항목 공유하기
        </div>
        <div
          className="rounded-lg bg-[#FAFAFB] text-[#E6533E] text-[14px] py-3 text-center font-medium mb-2 cursor-pointer"
          onClick={() => {
            setShowModal(false);
            setShowDeleteModal(true);
          }}
        >
          항목 삭제하기
        </div>
      </BottomSheet>

      <Modal
        centered
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
      >
        <Modal.Body>
          <div className="text-center">
            <DeleteIcon className="inline-block mb-1" />
            <div className="text-[18px] font-bold mb-1">
              항목을 삭제하시겠어요?
            </div>
            <div className="text-[14px] mb-4">
              삭제시 모든 데이터가 사라집니다.
            </div>
            <div className="flex justify-center gap-2">
              <button
                className="btn btn-light btn-lg text-[16px] font-semibold flex-1"
                onClick={() => setShowDeleteModal(false)}
              >
                닫기
              </button>
              <button
                className="btn btn-danger btn-lg text-[16px] font-semibold flex-1"
                onClick={() => {
                  // TODO: 항목 삭제 로직 추가
                  setShowDeleteModal(false);
                  navigate(`/journey/${id}?menu=LIST`); // 여정 페이지로 돌아가기
                }}
              >
                삭제하기
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

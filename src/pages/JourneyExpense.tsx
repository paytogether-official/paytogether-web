import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useJourney } from "store/useJourney";
import { useJourneyExpense } from "store/useJourneyExpense";
import { ReactComponent as DeleteIcon } from "../assets/svg/Delete.svg";
import { ReactComponent as AirplaneCheckedButton } from "../assets/svg/status=icn_Airplane_on.svg";
import { ReactComponent as BusCheckedButton } from "../assets/svg/status=icn_bus_on.svg";
import { ReactComponent as FoodCheckedButton } from "../assets/svg/status=icn_food_on.svg";
import { ReactComponent as HotelCheckedButton } from "../assets/svg/status=icn_hotel_on.svg";
import { ReactComponent as EtcCheckedButton } from "../assets/svg/status=icn_input_on.svg";
import { ReactComponent as ShoppingCheckedButton } from "../assets/svg/status=icn_shopping_on.svg";
import { ReactComponent as TicketCheckedButton } from "../assets/svg/status=icn_ticket_on.svg";
import { BottomSheet } from "../components/BottomSheet";
import { Header, HeaderType } from "../components/Header";
import { ToggleSwitch } from "../components/ToggleSwitch";

export const JourneyExpense = () => {
  const navigate = useNavigate();

  const { id, journeyExpenseId } = useParams<{
    id: string;
    journeyExpenseId: string;
  }>();

  const [currency, setCurrency] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const { journey, fetchJourney } = useJourney();
  const { journeyExpense, fetchJourneyExpense, deleteJourneyExpense } =
    useJourneyExpense();

  useEffect(() => {
    if (!journey) {
      fetchJourney(id!); // 여정 정보가 없으면 가져오기
    }
  }, []);

  useEffect(() => {
    if (journey?.baseCurrency) {
      setCurrency(journey.baseCurrency);
      fetchJourneyExpense(id!, journeyExpenseId!, journey.baseCurrency);
    }
  }, [journey?.baseCurrency]);

  const handleChangeCurrency = (newCurrency: string) => {
    setCurrency(newCurrency);
    fetchJourneyExpense(id!, journeyExpenseId!, newCurrency);
  };

  return (
    <div className="journey-expense">
      <Header
        leftType="back"
        onClickLeft={() => {
          navigate(`/journey/${id}?menu=LIST`); // 여정 페이지로 돌아가기
        }}
        rightType={journey?.closedAt ? ["share"] : ["kebab"]}
        onClickRight={(type: HeaderType) => {
          if (type === "kebab") {
            setShowModal(true);
          }
        }}
      />
      <div className="flex justify-between items-start mt-2 mb-2">
        <div className="flex items-center">
          <div className="w-[36px] h-[36px] mr-2 bg-[#DCEAFF] rounded-lg flex items-center justify-center">
            {journeyExpense?.category === "기타" && (
              <EtcCheckedButton className="w-[30px]" />
            )}
            {journeyExpense?.category === "식비" && (
              <FoodCheckedButton className="w-[30px]" />
            )}
            {journeyExpense?.category === "교통" && (
              <BusCheckedButton className="w-[30px]" />
            )}
            {journeyExpense?.category === "관광" && (
              <TicketCheckedButton className="w-[30px]" />
            )}
            {journeyExpense?.category === "쇼핑" && (
              <ShoppingCheckedButton className="w-[30px]" />
            )}
            {journeyExpense?.category === "숙소" && (
              <HotelCheckedButton className="w-[30px]" />
            )}
            {journeyExpense?.category === "항공" && (
              <AirplaneCheckedButton className="w-[30px]" />
            )}
          </div>
          <div>
            <div className="text-[18px] font-bold">
              {journeyExpense?.categoryDescription}
            </div>
            <div className="text-[12px] text-[#6D7582]">
              {journeyExpense?.expenseDate}
            </div>
          </div>
        </div>
        <ToggleSwitch
          options={[
            { label: "KRW", value: "KRW" },
            { label: journey?.baseCurrency!, value: journey?.baseCurrency! }
          ]}
          value={currency}
          onChange={handleChangeCurrency}
        />
      </div>

      <div className="mb-3">
        <span className="text-[24px] font-bold text-[#2C7EFF] mr-1">
          {journeyExpense?.amount?.toLocaleString()}
        </span>
        <span className="text-[14px] font-bold text-[#343942]">
          {journeyExpense?.quoteCurrency}
        </span>
      </div>

      <div className="flex flex-col gap-2 mb-3">
        {journeyExpense?.members.map(member => (
          <div className="journey-add-expense__user">
            <div className="flex gap-2">
              <span className="journey-add-expense__user-name">
                {member.name}
              </span>
              {journeyExpense?.payerName === member.name && (
                <span className="journey-add-expense__calculate-badge">
                  계산
                </span>
              )}
            </div>
            <div className="journey-add-expense__user-amount">
              {member.amount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {journeyExpense?.memo ? (
        <div className="rounded-2xl bg-[#FAFAFB] flex items-center p-5 text-[14px] text-[#343942] font-semibold mb-3">
          {journeyExpense.memo}
        </div>
      ) : (
        <div className="rounded-2xl bg-[#FAFAFB] flex justify-center items-center p-5 text-[14px] text-[#B1B8C0] font-semibold mb-3">
          기록된 메모가 없습니다.
        </div>
      )}

      <BottomSheet isOpen={showModal} onClose={() => setShowModal(false)}>
        <div
          className="rounded-lg bg-[#FAFAFB] text-[#151719] text-[14px] py-3 text-center font-medium mb-2 cursor-pointer"
          onClick={() => {
            setShowModal(false);
            navigate(`/journey/${id}/${journeyExpenseId}/edit`); // 항목 수정 페이지로 이동
          }}
        >
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
                  setShowDeleteModal(false);
                  deleteJourneyExpense(id!, journeyExpenseId!, () => {
                    navigate(`/journey/${id}?menu=LIST`); // 여정 페이지로 돌아가기
                  });
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

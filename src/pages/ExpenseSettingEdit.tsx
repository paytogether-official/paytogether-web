import _ from "lodash";
import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router";
import { useCommon } from "store/useCommon";
import { useJourney } from "store/useJourney";

import { BottomSheet } from "../components/BottomSheet";
import { Header } from "../components/Header";
import { useJourneyExpenseEdit } from "../store/useJourneyExpenseEdit";

export const ExpenseSettingEdit = () => {
  const navigate = useNavigate();

  const { id, journeyExpenseId } = useParams<{
    id: string;
    journeyExpenseId: string;
  }>();

  const [showModal, setShowModal] = React.useState(false);

  const { journey, fetchJourney } = useJourney();
  const {
    journeyExpenseEdit,
    fetchJourneyExpenseEdit,
    changeJourneyExpenseEdit
  } = useJourneyExpenseEdit();

  useEffect(() => {
    if (id && _.isEmpty(journey)) {
      fetchJourney(id);
    }
  }, [id, journey]);

  useEffect(() => {
    if (
      id &&
      journeyExpenseId &&
      !_.isEmpty(journey) &&
      _.isEmpty(journeyExpenseEdit)
    ) {
      fetchJourneyExpenseEdit(id!, journeyExpenseId!, journey.baseCurrency);
    }
  }, [id, journeyExpenseId, journey, journeyExpenseEdit]);

  const handleClickMember = (memberName: string) => {
    if (!journeyExpenseEdit?.members.map(m => m.name).includes(memberName)) {
      // 이미 비활성화된 멤버를 클릭하면 활성화
      const member = journey?.members.find(m => m.name === memberName);
      if (!member) return;

      changeJourneyExpenseEdit("members", [
        ...(journeyExpenseEdit?.members ?? []),
        {
          ...member,
          amount: 0
        }
      ]);
    } else {
      // 멤버를 비활성화
      // 결제자 일 경우 비활성화 할 수 없다.
      if (journeyExpenseEdit.payerName === memberName) {
        useCommon.getState().addToast({
          type: "error",
          text: "결제자는 비활성화 할 수 없습니다."
        });
        return;
      }

      changeJourneyExpenseEdit(
        "members",
        journeyExpenseEdit.members.filter(m => m.name !== memberName)
      );
    }
  };

  return (
    <div className="expense-setting">
      <Header
        leftType="back"
        title="정산 설정"
        onClickLeft={() => {
          // 총금액 재계산
          if (journeyExpenseEdit) {
            const totalAmount = journeyExpenseEdit.members.reduce(
              (sum, member) => sum + (member.amount || 0),
              0
            );
            changeJourneyExpenseEdit("amount", totalAmount);
            changeJourneyExpenseEdit("remainingAmount", 0);
          }

          navigate(`/journey/${id}/${journeyExpenseId}/edit`);
        }}
      />
      <div className="pt-4">
        <Form>
          <Form.Group className="mb-[20px]">
            <Form.Label>결제자 설정</Form.Label>
            <div
              className="form-control flex justify-between items-center cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <span>{journeyExpenseEdit?.payerName}</span>
              <FaCaretDown className="text-[22px]" />
            </div>
          </Form.Group>

          <Form.Group className="mb-[20px]">
            <Form.Label>정산인원 설정</Form.Label>
            {journey?.members.map(member => (
              <div
                key={member.name}
                className="rounded-2xl bg-[#FAFAFB] text-[#151719] text-[14px] h-[40px] font-medium mb-2 cursor-pointer flex justify-between items-center px-4"
                onClick={() => handleClickMember(member.name)}
              >
                <span>{member.name}</span>
                {journeyExpenseEdit?.members
                  .map(m => m.name)
                  .includes(member.name) && (
                  <FaCheckCircle className="text-[22px] text-[#2C7EFF]" />
                )}
              </div>
            ))}
          </Form.Group>
        </Form>
      </div>

      <BottomSheet
        title="결제자 설정"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        {journeyExpenseEdit?.members.map(member => (
          <div
            key={member.name}
            className="px-3 py-2 mb-2 flex justify-between items-center cursor-pointer"
            onClick={() => {
              changeJourneyExpenseEdit("payerName", member.name);
              setShowModal(false);
            }}
          >
            <span className="text-[14px] font-semibold">{member.name}</span>
            {journeyExpenseEdit?.payerName === member.name && (
              <FaCheckCircle className="text-[22px] text-[#2C7EFF]" />
            )}
          </div>
        ))}
      </BottomSheet>
    </div>
  );
};

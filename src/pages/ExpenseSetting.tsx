import _ from "lodash";
import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router";
import { useCommon } from "store/useCommon";
import { useJourney } from "store/useJourney";
import { useJourneyExpenseSetting } from "store/useJourneyExpenseSetting";
import { BottomSheet } from "../components/BottomSheet";
import { Header } from "../components/Header";

export const ExpenseSetting = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [showModal, setShowModal] = React.useState(false);

  const { journey, fetchJourney } = useJourney();
  const { journeyExpenseSettingData, changeData } = useJourneyExpenseSetting();

  useEffect(() => {
    if (id && _.isEmpty(journey)) {
      fetchJourney(id);
    }
  }, [id]);

  const handleClickMember = (memberName: string) => {
    if (journeyExpenseSettingData.disabledMembers.includes(memberName)) {
      // 이미 비활성화된 멤버를 클릭하면 활성화
      changeData(
        "disabledMembers",
        journeyExpenseSettingData.disabledMembers.filter(
          name => name !== memberName
        )
      );
    } else {
      // 멤버를 비활성화
      // 결제자 일 경우 비활성화 할 수 없다.
      if (journeyExpenseSettingData.payer === memberName) {
        useCommon.getState().addToast({
          type: "error",
          text: "결제자는 비활성화 할 수 없습니다."
        });
        return;
      }

      // 비활성화된 멤버 목록에 추가
      changeData("disabledMembers", [
        ...journeyExpenseSettingData.disabledMembers,
        memberName
      ]);
    }
  };

  return (
    <div className="expense-setting">
      <Header
        leftType="back"
        title="정산 설정"
        onClickLeft={() => {
          navigate(`/journey/${id}`);
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
              <span>{journeyExpenseSettingData.payer}</span>
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
                {!journeyExpenseSettingData.disabledMembers.includes(
                  member.name
                ) && <FaCheckCircle className="text-[22px] text-[#2C7EFF]" />}
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
        {journey?.members
          .filter(
            member =>
              !journeyExpenseSettingData.disabledMembers.includes(member.name)
          )
          .map(member => (
            <div
              key={member.name}
              className="px-3 py-2 mb-2 flex justify-between items-center cursor-pointer"
              onClick={() => {
                changeData("payer", member.name);
                setShowModal(false);
              }}
            >
              <span className="text-[14px] font-semibold">{member.name}</span>
              {journeyExpenseSettingData.payer === member.name && (
                <FaCheckCircle className="text-[22px] text-[#2C7EFF]" />
              )}
            </div>
          ))}
      </BottomSheet>
    </div>
  );
};

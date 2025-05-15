import React from "react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router";
import { Form } from "react-bootstrap";
import { FaCaretDown } from "react-icons/fa6";
import { BottomSheet } from "../components/BottomSheet";
import { FaCheckCircle } from "react-icons/fa";

export const ExpenseSetting = () => {
  const navigate = useNavigate();

  const [payer, setPayer] = React.useState<string>("");
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className="expense-setting">
      <Header
        leftType="back"
        title="정산 설정"
        onClickLeft={() => {
          navigate("/journey");
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
              <span>{payer}</span>
              <FaCaretDown className="text-[22px]" />
            </div>
          </Form.Group>
        </Form>
      </div>

      <BottomSheet
        title="결제자 설정"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <div className="px-3 py-2 mb-2 flex justify-between items-center cursor-pointer">
          <span className="text-[14px] font-semibold">가망이</span>
          <FaCheckCircle className="text-[22px] text-[#2C7EFF]" />
        </div>
        <div className="px-3 py-2 mb-2 flex justify-between items-center cursor-pointer">
          <span className="text-[14px] font-semibold">나망이</span>
        </div>
        <div className="px-3 py-2 mb-2 flex justify-between items-center cursor-pointer">
          <span className="text-[14px] font-semibold">다망이</span>
        </div>
        <div className="px-3 py-2 mb-2 flex justify-between items-center cursor-pointer">
          <span className="text-[14px] font-semibold">라망이</span>
        </div>
      </BottomSheet>
    </div>
  );
};

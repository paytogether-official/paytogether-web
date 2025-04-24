import React from "react";
import { Header } from "../components/Header";
import { useNavigate } from "react-router";

export const ExpenseSetting = () => {
  const navigate = useNavigate();

  return (
    <div className="expense-setting">
      <Header
        leftType="back"
        title="정산 설정"
        onClickLeft={() => {
          navigate("/journey");
        }}
      />
    </div>
  );
};

import React from "react";
import { Header } from "../components/Header";
import { Tab, Tabs } from "react-bootstrap";
import { JourneyAddExpense } from "./JourneyAddExpense";

export const Journey = () => {
  const [tab, setTab] = React.useState("ADD");

  return (
    <div className="journey">
      <Header leftType="menu" title="여정명" />
      <div className="pt-4">
        <Tabs activeKey={tab} onSelect={k => setTab(k!)} className="mb-3">
          <Tab eventKey="ADD" title="지출 추가" />
          <Tab eventKey="LIST" title="목록 보기" />
        </Tabs>
        {tab === "ADD" && <JourneyAddExpense />}
      </div>
    </div>
  );
};

import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { Tab, Tabs } from "react-bootstrap";
import { JourneyAddExpense } from "./JourneyAddExpense";
import { useParams } from "react-router-dom";
import { JourneyExpenseList } from "./JourneyExpenseList";

export const Journey = () => {
  const { id } = useParams<{ id: string }>();
  const [tab, setTab] = React.useState("ADD");

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <div className="journey">
      <Header leftType="menu" title="여정명" />
      <div className="pt-4">
        <Tabs activeKey={tab} onSelect={k => setTab(k!)} className="mb-3">
          <Tab eventKey="ADD" title="지출 추가" />
          <Tab eventKey="LIST" title="목록 보기" />
        </Tabs>
        {tab === "ADD" && <JourneyAddExpense />}
        {tab === "LIST" && <JourneyExpenseList />}
      </div>
    </div>
  );
};

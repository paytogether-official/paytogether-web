import dayjs from "dayjs";
import React from "react";
import { Form, Tab, Tabs } from "react-bootstrap";
import { HiOutlineCalendar } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import { useAddJourneyExpense } from "store/useAddJourneyExpense";
import { useJourney } from "store/useJourney";
import { ReactComponent as AirplaneNormalButton } from "../assets/svg/status=icn_Airplane.svg";
import { ReactComponent as AirplaneCheckedButton } from "../assets/svg/status=icn_Airplane_on.svg";
import { ReactComponent as BusNormalButton } from "../assets/svg/status=icn_bus.svg";
import { ReactComponent as BusCheckedButton } from "../assets/svg/status=icn_bus_on.svg";
import { ReactComponent as FoodNormalButton } from "../assets/svg/status=icn_food.svg";
import { ReactComponent as FoodCheckedButton } from "../assets/svg/status=icn_food_on.svg";
import { ReactComponent as HotelNormalButton } from "../assets/svg/status=icn_hotel.svg";
import { ReactComponent as HotelCheckedButton } from "../assets/svg/status=icn_hotel_on.svg";
import { ReactComponent as EtcNormalButton } from "../assets/svg/status=icn_input.svg";
import { ReactComponent as EtcCheckedButton } from "../assets/svg/status=icn_input_on.svg";
import { ReactComponent as ShoppingNormalButton } from "../assets/svg/status=icn_shopping.svg";
import { ReactComponent as ShoppingCheckedButton } from "../assets/svg/status=icn_shopping_on.svg";
import { ReactComponent as TicketNormalButton } from "../assets/svg/status=icn_ticket.svg";
import { ReactComponent as TicketCheckedButton } from "../assets/svg/status=icn_ticket_on.svg";
import { ReactComponent as MemoNormalButton } from "../assets/svg/status=memo.svg";
import { ReactComponent as MemoCheckedButton } from "../assets/svg/status=memo_on.svg";
import { DateBottomSheet } from "../components/bottomSheets/DateBottomSheet";
import { MemoBottomSheet } from "../components/bottomSheets/MemoBottomSheet";
import { CategoryButton } from "../components/CategoryButton";
import { SvgButton } from "../components/SvgButton";
import "./JourneyAddExpense.scss";

type ExpenseType = "1/N" | "DIRECT";

export const JourneyAddExpense = () => {
  const { id } = useParams<{ id: string }>();

  const [showDateModal, setShowDateModal] = React.useState(false);
  const [tab, setTab] = React.useState<ExpenseType>("1/N");
  const [showMemoModal, setShowMemoModal] = React.useState(false);

  const { journey } = useJourney();
  const { addJourneyExpenseData, changeData, addExpense } =
    useAddJourneyExpense();

  const handleChangeAmount = (value: number) => {
    const newValue = Math.floor(value * 100) / 100;
    changeData("amount", newValue);
    if (tab === "1/N") {
      // 소수점 둘째 자리에서 버림
      const memberAmount =
        Math.floor((newValue / addJourneyExpenseData.members.length) * 100) /
        100;
      changeData(
        "members",
        addJourneyExpenseData.members.map(member => ({
          ...member,
          amount: memberAmount
        }))
      );

      let remainingAmount = newValue;
      addJourneyExpenseData.members.forEach(() => {
        remainingAmount =
          Math.round((remainingAmount - memberAmount) * 100) / 100;
      });
      changeData("remainingAmount", remainingAmount);
    }
  };

  const handleChangeMemberAmount = (name: string, value: number) => {
    const newValue = Math.floor(value * 100) / 100;
    const members = addJourneyExpenseData.members.map(member => {
      if (member.name === name) {
        return { ...member, amount: newValue };
      }
      return member;
    });
    changeData("members", members);

    let amount = 0;
    members.forEach(member => {
      amount = Math.round((amount + member.amount) * 100) / 100;
    });
    changeData("amount", amount);
    changeData("remainingAmount", 0);
  };

  return (
    <div className="journey-add-expense pb-16">
      <Form.Group className="mb-2">
        <div
          className="form-control flex justify-between items-center cursor-pointer"
          onClick={() => setShowDateModal(true)}
        >
          <div>
            {addJourneyExpenseData.expenseDate
              ? dayjs(addJourneyExpenseData.expenseDate).format("YY.MM.DD")
              : ""}
          </div>
          <HiOutlineCalendar className="text-[22px]" />
        </div>
      </Form.Group>
      <div className="flex justify-between items-center mb-2">
        <CategoryButton
          label="기타"
          normalSvg={<EtcNormalButton />}
          checkedSvg={<EtcCheckedButton />}
          checked={addJourneyExpenseData.category === "기타"}
          onClick={() => changeData("category", "기타")}
        />

        <CategoryButton
          label="식비"
          normalSvg={<FoodNormalButton />}
          checkedSvg={<FoodCheckedButton />}
          checked={addJourneyExpenseData.category === "식비"}
          onClick={() => changeData("category", "식비")}
        />

        <CategoryButton
          label="교통"
          normalSvg={<BusNormalButton />}
          checkedSvg={<BusCheckedButton />}
          checked={addJourneyExpenseData.category === "교통"}
          onClick={() => changeData("category", "교통")}
        />

        <CategoryButton
          label="관광"
          normalSvg={<TicketNormalButton />}
          checkedSvg={<TicketCheckedButton />}
          checked={addJourneyExpenseData.category === "관광"}
          onClick={() => changeData("category", "관광")}
        />

        <CategoryButton
          label="쇼핑"
          normalSvg={<ShoppingNormalButton />}
          checkedSvg={<ShoppingCheckedButton />}
          checked={addJourneyExpenseData.category === "쇼핑"}
          onClick={() => changeData("category", "쇼핑")}
        />

        <CategoryButton
          label="숙소"
          normalSvg={<HotelNormalButton />}
          checkedSvg={<HotelCheckedButton />}
          checked={addJourneyExpenseData.category === "숙소"}
          onClick={() => changeData("category", "숙소")}
        />

        <CategoryButton
          label="항공"
          normalSvg={<AirplaneNormalButton />}
          checkedSvg={<AirplaneCheckedButton />}
          checked={addJourneyExpenseData.category === "항공"}
          onClick={() => changeData("category", "항공")}
        />
      </div>
      <div className="d-flex mb-2">
        <Form.Control
          className="text-[14px] mr-2"
          type="text"
          placeholder="어디에 사용하셨나요?"
          value={addJourneyExpenseData.categoryDescription}
          onChange={e => changeData("categoryDescription", e.target.value)}
        />
        <div>
          <SvgButton
            normalSvg={<MemoNormalButton />}
            hoverSvg={<MemoCheckedButton />}
            checkedSvg={<MemoCheckedButton />}
            checked={!!addJourneyExpenseData.memo}
            onClick={() => setShowMemoModal(true)}
          />
        </div>
      </div>
      <Tabs
        activeKey={tab}
        onSelect={k => setTab(k as ExpenseType)}
        className="mb-3"
      >
        <Tab eventKey="1/N" title="1/N 하기" />
        <Tab eventKey="DIRECT" title="직접입력" />
      </Tabs>

      <div>
        <Form.Group className="mb-[16px] border-b-2 border-[#2C7EFF]">
          <Form.Control
            className="text-[28px] mb-1 transparent disabled:text-[#B1B8C0]"
            type="number"
            placeholder={`금액입력(${journey?.baseCurrency})`}
            value={addJourneyExpenseData.amount || ""}
            max={9999999999}
            onChange={e => {
              if (Number(e.target.value) <= 9999999999) {
                handleChangeAmount(Number(e.target.value));
              }
            }}
            disabled={tab === "DIRECT"}
          />
        </Form.Group>

        <div className="flex flex-col gap-2">
          <div className="text-right">
            <Link
              to={`/journey/${id}/expense-setting`}
              className="inline-flex justify-between items-center h-[20px] rounded-lg bg-[#DCEAFF] px-2 text-[14px] text-[#2C7EFF] font-semibold"
            >
              정산설정
            </Link>
          </div>
          {addJourneyExpenseData.members.map(member => (
            <div key={member.name} className="journey-add-expense__user">
              <div className="flex gap-2">
                <span className="journey-add-expense__user-name whitespace-nowrap">
                  {member.name}
                </span>
                {addJourneyExpenseData.payerName === member.name && (
                  <span className="journey-add-expense__calculate-badge whitespace-nowrap">
                    계산
                  </span>
                )}
              </div>
              {tab === "1/N" && (
                <div className="journey-add-expense__user-amount">
                  {member.amount}
                </div>
              )}
              {tab === "DIRECT" && (
                <Form.Control
                  className="journey-add-expense__user-amount w-[unset] transparent pr-0"
                  type="number"
                  value={member.amount || ""}
                  max={9999999999}
                  onChange={e => {
                    if (Number(e.target.value) <= 9999999999) {
                      handleChangeMemberAmount(
                        member.name,
                        Number(e.target.value)
                      );
                    }
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="footer">
        <button
          type="button"
          className="btn btn-primary w-full text-center h-[48px] py-0"
          disabled={
            !addJourneyExpenseData.amount || addJourneyExpenseData.amount <= 0
          }
          onClick={addExpense}
        >
          지출추가
        </button>
      </div>

      <DateBottomSheet
        selectedDate={
          addJourneyExpenseData.expenseDate
            ? new Date(addJourneyExpenseData.expenseDate)
            : undefined
        }
        showModal={showDateModal}
        onChange={date => {
          changeData("expenseDate", dayjs(date).format("YYYY-MM-DD"));
          setShowDateModal(false);
        }}
        onClose={() => setShowDateModal(false)}
      />

      <MemoBottomSheet
        initMemo={addJourneyExpenseData.memo}
        showModal={showMemoModal}
        onClose={() => setShowMemoModal(false)}
        onChange={memo => changeData("memo", memo)}
      />
    </div>
  );
};

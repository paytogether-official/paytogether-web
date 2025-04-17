import React from "react";
import { Form } from "react-bootstrap";
import dayjs from "dayjs";
import { HiOutlineCalendar } from "react-icons/hi";
import { DateBottomSheet } from "../components/bottomSheets/DateBottomSheet";
import { ReactComponent as EtcNormalButton } from "../assets/svg/status=icn_input.svg";
import { ReactComponent as EtcCheckedButton } from "../assets/svg/status=icn_input_on.svg";
import { ReactComponent as FoodNormalButton } from "../assets/svg/status=icn_food.svg";
import { ReactComponent as FoodCheckedButton } from "../assets/svg/status=icn_food_on.svg";
import { ReactComponent as BusNormalButton } from "../assets/svg/status=icn_bus.svg";
import { ReactComponent as BusCheckedButton } from "../assets/svg/status=icn_bus_on.svg";
import { ReactComponent as TicketNormalButton } from "../assets/svg/status=icn_ticket.svg";
import { ReactComponent as TicketCheckedButton } from "../assets/svg/status=icn_ticket_on.svg";
import { ReactComponent as ShoppingNormalButton } from "../assets/svg/status=icn_shopping.svg";
import { ReactComponent as ShoppingCheckedButton } from "../assets/svg/status=icn_shopping_on.svg";
import { ReactComponent as HotelNormalButton } from "../assets/svg/status=icn_hotel.svg";
import { ReactComponent as HotelCheckedButton } from "../assets/svg/status=icn_hotel_on.svg";
import { ReactComponent as MemoNormalButton } from "../assets/svg/status=memo.svg";
import { ReactComponent as MemoCheckedButton } from "../assets/svg/status=memo_on.svg";
import { CategoryButton } from "../components/CategoryButton";
import { SvgButton } from "../components/SvgButton";

export const JourneyAddExpense = () => {
  const [showDateModal, setShowDateModal] = React.useState(false);
  const [expenseDate, setExpenseDate] = React.useState<Date>(new Date());
  const [category, setCategory] = React.useState<string>("기타");
  const [payerName, setPayerName] = React.useState<string>("");

  return (
    <div className="journey-add-item">
      <Form.Group className="mb-2">
        <div
          className="form-control flex justify-between items-center cursor-pointer"
          onClick={() => setShowDateModal(true)}
        >
          <div>{dayjs(expenseDate).format("YY.MM.DD")}</div>
          <HiOutlineCalendar className="text-[22px]" />
        </div>
      </Form.Group>
      <div className="flex justify-between items-center mb-2">
        <CategoryButton
          label="기타"
          normalSvg={<EtcNormalButton />}
          checkedSvg={<EtcCheckedButton />}
          checked={category === "기타"}
          onClick={() => setCategory("기타")}
        />

        <CategoryButton
          label="식비"
          normalSvg={<FoodNormalButton />}
          checkedSvg={<FoodCheckedButton />}
          checked={category === "식비"}
          onClick={() => setCategory("식비")}
        />

        <CategoryButton
          label="교통"
          normalSvg={<BusNormalButton />}
          checkedSvg={<BusCheckedButton />}
          checked={category === "교통"}
          onClick={() => setCategory("교통")}
        />

        <CategoryButton
          label="관광"
          normalSvg={<TicketNormalButton />}
          checkedSvg={<TicketCheckedButton />}
          checked={category === "관광"}
          onClick={() => setCategory("관광")}
        />

        <CategoryButton
          label="쇼핑"
          normalSvg={<ShoppingNormalButton />}
          checkedSvg={<ShoppingCheckedButton />}
          checked={category === "쇼핑"}
          onClick={() => setCategory("쇼핑")}
        />

        <CategoryButton
          label="숙소"
          normalSvg={<HotelNormalButton />}
          checkedSvg={<HotelCheckedButton />}
          checked={category === "숙소"}
          onClick={() => setCategory("숙소")}
        />
      </div>
      <div className="d-flex mb-2">
        <Form.Control
          className="text-[14px] mr-2"
          type="text"
          placeholder="어디에 사용하셨나요?"
          value={payerName}
          onChange={e => setPayerName(e.target.value)}
        />
        <div>
          <SvgButton
            normalSvg={<MemoNormalButton />}
            hoverSvg={<MemoCheckedButton />}
            onClick={() => console.log("Clicked")}
          />
        </div>
      </div>

      <DateBottomSheet
        selectedDate={expenseDate}
        showModal={showDateModal}
        onChange={setExpenseDate}
        onClose={() => setShowDateModal(false)}
      />
    </div>
  );
};

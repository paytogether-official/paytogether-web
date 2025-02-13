import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import { HiOutlineCalendar } from "react-icons/hi";
import { Header } from "../components/Header";
import "./Create.scss";

export const Create = () => {
  const [showDateModal, setShowDateModal] = useState(false);
  const [selectionRange, setSelectionRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
  });

  useEffect(() => {
    setSelectionRange({
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
    });
  }, [showDateModal]);

  const handleSelect = (ranges: RangeKeyDict) => {
    console.log(ranges); // native Date object
    setSelectionRange(ranges["selection"]);
  };

  return (
    <div className="create">
      <Header leftType="back" title="여정 참여하기" />
      <div className="pt-4">
        <Form>
          <Form.Group className="mb-[20px]">
            <Form.Label>여정명</Form.Label>
            <Form.Control type="text" placeholder="어떤 여정인가요?" />
          </Form.Group>
          <Form.Group className="mb-[20px]">
            <Form.Label>여행기간</Form.Label>
            <div
              className="form-control flex justify-between items-center cursor-pointer"
              onClick={() => setShowDateModal(true)}
            >
              <span className="text-[#B1B8C0]">언제 여행을 떠나시나요?</span>
              <HiOutlineCalendar className="text-[22px]" />
            </div>
          </Form.Group>
        </Form>
      </div>

      <Modal
        className="create__date-modal"
        show={showDateModal}
        onHide={() => setShowDateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>여행기간 설정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <span className="create__date">
              {dayjs(selectionRange.startDate).format("YY.MM.DD")} -{" "}
              {dayjs(selectionRange.endDate).format("YY.MM.DD")}
            </span>
            <span className="ml-2 create__date">
              {dayjs(selectionRange.endDate).diff(
                dayjs(selectionRange.startDate),
                "days"
              ) + 1}
              일
            </span>
          </div>

          <div className="flex justify-center">
            <DateRange
              showDateDisplay={false}
              ranges={[selectionRange]}
              onChange={handleSelect}
            />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

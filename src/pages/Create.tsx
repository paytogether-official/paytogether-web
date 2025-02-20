import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import { HiOutlineCalendar } from "react-icons/hi";
import { useNavigate } from "react-router";
import { BottomSheet } from "../components/BottomSheet";
import { Header } from "../components/Header";
import "./Create.scss";

export const Create = () => {
  const [showDateModal, setShowDateModal] = useState(false);
  const [name, setName] = useState("");
  const [selectionRange, setSelectionRange] = useState<Range>({
    startDate: undefined,
    endDate: undefined,
    key: "selection"
  });

  const navigate = useNavigate();

  useEffect(() => {
    setSelectionRange({
      startDate: undefined,
      endDate: undefined,
      key: "selection"
    });
  }, []);

  const handleSelect = (ranges: RangeKeyDict) => {
    console.log(ranges); // native Date object
    setSelectionRange(ranges["selection"]);
  };

  return (
    <div className="create">
      <Header
        leftType="back"
        title="여정 참여하기"
        onClickLeft={() => {
          navigate("/");
        }}
      />
      <div className="pt-4">
        <Form>
          <Form.Group className="mb-[20px]">
            <Form.Label>여정명</Form.Label>
            <Form.Control
              type="text"
              placeholder="어떤 여정인가요?"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-[20px]">
            <Form.Label>여행기간</Form.Label>
            <div
              className="form-control flex justify-between items-center cursor-pointer"
              onClick={() => setShowDateModal(true)}
            >
              {selectionRange.endDate && selectionRange.startDate ? (
                <div>
                  {`${dayjs(selectionRange.startDate).format(
                    "YY.MM.DD"
                  )} -${dayjs(selectionRange.endDate).format("YY.MM.DD")}`}
                </div>
              ) : (
                <span className="text-[#B1B8C0]">언제 여행을 떠나시나요?</span>
              )}
              <HiOutlineCalendar className="text-[22px]" />
            </div>
          </Form.Group>
        </Form>
      </div>

      <BottomSheet
        title="여행기간 설정"
        isOpen={showDateModal}
        onClose={() => setShowDateModal(false)}
      >
        <div className="mb-3">
          {selectionRange.endDate && selectionRange.startDate && (
            <span className="create__date">
              {`${dayjs(selectionRange.startDate).format("YY.MM.DD")} -${dayjs(
                selectionRange.endDate
              ).format("YY.MM.DD")}`}
            </span>
          )}
          {selectionRange.endDate && selectionRange.startDate && (
            <span className="ml-2 create__date">
              {dayjs(selectionRange.endDate).diff(
                dayjs(selectionRange.startDate),
                "days"
              ) + 1}
              일
            </span>
          )}
        </div>

        <div className="flex justify-center">
          <DateRange
            showDateDisplay={false}
            ranges={[selectionRange]}
            onChange={handleSelect}
          />
        </div>
      </BottomSheet>
    </div>
  );
};

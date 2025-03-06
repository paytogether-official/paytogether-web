import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import { FaEquals } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";
import { HiOutlineCalendar } from "react-icons/hi";
import { useNavigate } from "react-router";
import { BottomSheet } from "../components/BottomSheet";
import { Header } from "../components/Header";
import {
  Country,
  SelectCountryBottomSheet
} from "../components/bottomSheets/SelectCountryBottomSheet";
import "./Create.scss";

export const Create = () => {
  const [showDateModal, setShowDateModal] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [name, setName] = useState("");
  const [country, setCountry] = useState<Country | null>(null);
  const [exchangeRate, setExchangeRate] = useState("");
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
          <Form.Group className="mb-[20px]">
            <Form.Label>국가설정</Form.Label>
            <div
              className="form-control flex justify-between items-center cursor-pointer"
              onClick={() => setShowCountryModal(true)}
            >
              {country ? (
                <div>{country.name}</div>
              ) : (
                <span className="text-[#B1B8C0]">
                  어디로 여행을 떠나시나요?
                </span>
              )}
              <FaCaretDown className="text-[22px]" />
            </div>
          </Form.Group>
          {country && (
            <Form.Group className="mb-[20px]">
              <Form.Label>환율설정</Form.Label>
              <div className="flex items-center">
                <div className="w-[40%] form-control flex justify-between items-center text-[#B1B8C0]">
                  <span>1</span>
                  <span>{country?.code}</span>
                </div>
                <div className="w-[24px] h-[24px] flex justify-center items-center rounded-[50%] bg-[#E7E9EC] mx-2">
                  <FaEquals className="text-[12px] text-[#6D7582]" />
                </div>
                <InputGroup className="flex-1">
                  <Form.Control
                    type="number"
                    value={exchangeRate}
                    onChange={e => setExchangeRate(e.target.value)}
                  />
                  <InputGroup.Text>원</InputGroup.Text>
                </InputGroup>
              </div>
            </Form.Group>
          )}
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

      <SelectCountryBottomSheet
        show={showCountryModal}
        onChangeCountry={v => {
          // TODO: set exchange rate
          setExchangeRate("1");
          setCountry(v);
        }}
        onClose={() => setShowCountryModal(false)}
      />
    </div>
  );
};

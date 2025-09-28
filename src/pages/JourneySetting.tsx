import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { DateRange, RangeKeyDict } from "react-date-range";
import { FaEquals } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";
import { HiOutlineCalendar } from "react-icons/hi";
import { useLocation, useNavigate, useParams } from "react-router";
import { useUpdateJourney } from "store/useUpdateJourney";
import { BottomSheet } from "../components/BottomSheet";
import { Header } from "../components/Header";
import { Locale } from "../interfaces/Locale";
import { useCreateJourney } from "../store/useCreateJourney";

interface JourneySettingState {
  title: string;
  startDate: string;
  endDate: string;
  country: Locale | null;
}

export const JourneySetting = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const location = useLocation();

  const { locales, fetchLocales } = useCreateJourney();
  const { originalJourney, journey, fetchJourney, updateJourney, changeData } =
    useUpdateJourney();

  const [showDateModal, setShowDateModal] = useState(false);

  // Fetch journey data when component mounts
  useEffect(() => {
    if (id) {
      fetchJourney(id);
    }
    fetchLocales();
  }, [id, fetchJourney]);

  const selectionRange = useMemo(() => {
    return {
      startDate: journey?.startDate ? new Date(journey.startDate) : undefined,
      endDate: journey?.endDate ? new Date(journey.endDate) : undefined,
      key: "selection"
    };
  }, [journey?.startDate, journey?.endDate]);

  const handleSelect = (ranges: RangeKeyDict) => {
    changeData(
      "startDate",
      ranges["selection"].startDate
        ? dayjs(ranges["selection"].startDate).format("YYYY-MM-DD")
        : ""
    );
    changeData(
      "endDate",
      ranges["selection"].endDate
        ? dayjs(ranges["selection"].endDate).format("YYYY-MM-DD")
        : ""
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    const success = await updateJourney(id);
    if (success) {
      setTimeout(() => {
        navigate(`/journey/${id}`);
      }, 1000);
    }
  };

  if (!journey) return null;

  return (
    <div className="create pb-16">
      <Header
        leftType="back"
        title="여정 설정"
        onClickLeft={() => {
          const previousPath = location.state?.from;
          if (previousPath === `/journey/${id}`) {
            navigate(-1);
          } else {
            navigate(`/journey/${id}`);
          }
        }}
      />

      <Form className="pt-4">
        <Form.Group className="mb-[20px]">
          <Form.Label>여정명</Form.Label>
          <Form.Control
            className="bg-light text-[#6D7582]"
            type="text"
            value={journey?.title}
            disabled
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
                )} - ${dayjs(selectionRange.endDate).format("YY.MM.DD")}`}
              </div>
            ) : (
              <span className="text-[#B1B8C0]">언제 여행을 떠나시나요?</span>
            )}
            <HiOutlineCalendar className="text-[22px]" />
          </div>
        </Form.Group>

        <Form.Group className="mb-[20px]">
          <Form.Label>국가설정</Form.Label>
          <div className="form-control flex justify-between items-center text-[#6D7582]">
            <div>
              {
                locales.find(
                  locale => locale.localeCode === journey?.localeCode
                )?.countryKoreanName
              }
            </div>
            <FaCaretDown className="text-[22px] text-[#6D7582]" />
          </div>
        </Form.Group>

        <Form.Group className="mb-[20px]">
          <Form.Label>환율설정</Form.Label>
          <div className="flex items-center">
            <div className="w-[40%] form-control flex justify-between items-center text-[#B1B8C0]">
              <span>1</span>
              <span>{journey?.baseCurrency}</span>
            </div>
            <div className="w-[24px] h-[24px] flex justify-center items-center rounded-[50%] bg-[#E7E9EC] mx-2">
              <FaEquals className="text-[12px] text-[#6D7582]" />
            </div>
            <InputGroup className="flex-1">
              <Form.Control
                type="number"
                value={journey?.exchangeRate}
                min={0}
                onChange={e => changeData("exchangeRate", e.target.value)}
              />
              <InputGroup.Text>원</InputGroup.Text>
            </InputGroup>
          </div>
        </Form.Group>
        <Form.Group className="mb-[20px]">
          <Form.Label>인원설정</Form.Label>
          {journey?.members.map((member, i) => (
            <div className="relative" key={i}>
              <Form.Control
                className="text-center px-5 text-[14px] mb-2 h-[40px] bg-light text-[#6D7582]"
                type="text"
                value={member.name}
                disabled
              />
            </div>
          ))}
        </Form.Group>
      </Form>

      <div className="footer">
        <button
          type="button"
          className="btn btn-primary w-full text-center h-[48px] py-0"
          disabled={
            originalJourney?.exchangeRate === journey?.exchangeRate &&
            originalJourney?.startDate === journey?.startDate &&
            originalJourney?.endDate === journey?.endDate
          }
          onClick={handleSubmit}
        >
          수정완료
        </button>
      </div>

      <BottomSheet
        title="여행기간 설정"
        isOpen={showDateModal}
        onClose={() => setShowDateModal(false)}
      >
        <div className="mb-3">
          {selectionRange.endDate && selectionRange.startDate && (
            <span className="create__date">
              {`${dayjs(selectionRange.startDate).format("YY.MM.DD")} - ${dayjs(
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

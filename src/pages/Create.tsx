import dayjs from "dayjs";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { DateRange, RangeKeyDict } from "react-date-range";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaEquals } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";
import { HiOutlineCalendar } from "react-icons/hi";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useCommon } from "store/useCommon";
import { useCurrency } from "store/useCurrency";
import { BottomSheet } from "../components/BottomSheet";
import { Header } from "../components/Header";
import { SelectCountryBottomSheet } from "../components/bottomSheets/SelectCountryBottomSheet";
import { Locale } from "../interfaces/Locale";
import { useCreateJourney } from "../store/useCreateJourney";
import "./Create.scss";

export const Create = () => {
  const [showDateModal, setShowDateModal] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [country, setCountry] = useState<Locale | null>(null);

  const {
    createJourneyData,
    initialize,
    fetchLocales,
    changeData,
    createJourney
  } = useCreateJourney();
  const { currencies, fetchCurrency } = useCurrency();
  const { addToast } = useCommon();

  const navigate = useNavigate();

  const selectionRange = useMemo(() => {
    return {
      startDate: createJourneyData.startDate
        ? new Date(createJourneyData.startDate)
        : undefined,
      endDate: createJourneyData.endDate
        ? new Date(createJourneyData.endDate)
        : undefined,
      key: "selection"
    };
  }, [createJourneyData.startDate, createJourneyData.endDate]);

  useEffect(() => {
    initialize();
    fetchLocales();
  }, []);

  useEffect(() => {
    if (country && !currencies[country.currency]) {
      fetchCurrency(country.currency);
    }
  }, [country, currencies]);

  useEffect(() => {
    if (country?.currency && currencies[country?.currency!]) {
      changeData(
        "exchangeRate",
        currencies[country.currency]?.exchangeRate?.toString() ?? ""
      );
    }
  }, [currencies, country]);

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

  const handleClickNewMember = () => {
    let newMemberName = "";
    if (createJourneyData.members.every(member => member.name !== "")) {
      const lastNameList: string[] = [
        "정산",
        "페이",
        "나눔",
        "돈",
        "머니",
        "여행"
      ];
      const firstNameList: string[] = [
        "빌런",
        "귀신",
        "도둑",
        "거지",
        "만수르",
        "부자",
        "마법사",
        "요정"
      ];

      const nameList = _.flatMap(lastNameList, a =>
        _.map(firstNameList, b => `${a}${b}`)
      );
      newMemberName = _.without(
        _.shuffle(nameList),
        ...createJourneyData.members.map(member => member.name)
      )[0];
    }

    changeData("members", [
      ...createJourneyData.members,
      { name: newMemberName }
    ]);
  };

  const handleClickCreateJourney = () => {
    // 에러 체크
    // 이름 중복
    if (
      createJourneyData.members.length !==
      _.uniqBy(createJourneyData.members, "name").length
    ) {
      addToast({
        type: "error",
        text: "인원이 중복됩니다."
      });
      return;
    }

    createJourney();
  };

  return (
    <div className="create pb-16">
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
              value={createJourneyData.title}
              onChange={e => changeData("title", e.target.value)}
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
                <div>{country.countryKoreanName}</div>
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
                  <span>{country?.currency}</span>
                </div>
                <div className="w-[24px] h-[24px] flex justify-center items-center rounded-[50%] bg-[#E7E9EC] mx-2">
                  <FaEquals className="text-[12px] text-[#6D7582]" />
                </div>
                <InputGroup className="flex-1">
                  <Form.Control
                    type="number"
                    value={createJourneyData.exchangeRate}
                    min={0}
                    onChange={e => changeData("exchangeRate", e.target.value)}
                  />
                  <InputGroup.Text>원</InputGroup.Text>
                </InputGroup>
              </div>
            </Form.Group>
          )}
          <Form.Group className="mb-[20px]">
            <Form.Label>인원설정</Form.Label>
            {createJourneyData.members.map((member, i) => (
              <div className="relative" key={i}>
                <Form.Control
                  className="text-center px-5 text-[14px] mb-2 h-[40px]"
                  type="text"
                  placeholder="이름을 입력해주세요"
                  value={member.name}
                  onChange={e => {
                    const newMemberList = [...createJourneyData.members];
                    newMemberList[i].name = e.target.value;
                    changeData("members", newMemberList);
                  }}
                />
                <AiFillCloseCircle
                  className="text-[28px] text-[#343942] absolute top-[6px] right-[6px] cursor-pointer"
                  onClick={() => {
                    if (createJourneyData.members.length === 1) {
                      changeData("members", [{ name: "" }]);
                    } else {
                      const newMemberList = [...createJourneyData.members];
                      newMemberList.splice(i, 1);
                      changeData("members", newMemberList);
                    }
                  }}
                />
              </div>
            ))}
            {createJourneyData.members.length < 30 && (
              <button
                type="button"
                className="btn btn-outline-primary w-full text-center h-[40px] py-0"
                onClick={handleClickNewMember}
              >
                <IoAddCircleOutline className="text-[28px] inline-block" />
              </button>
            )}
          </Form.Group>
        </Form>
      </div>

      <div className="footer">
        <button
          type="button"
          className="btn btn-primary w-full text-center h-[48px] py-0"
          disabled={
            !createJourneyData.title ||
            !selectionRange.startDate ||
            !selectionRange.endDate ||
            !country ||
            !createJourneyData.exchangeRate ||
            createJourneyData.members.some(member => member.name === "")
          }
          onClick={handleClickCreateJourney}
        >
          생성하기
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

      <SelectCountryBottomSheet
        show={showCountryModal}
        onChangeCountry={v => {
          setCountry(v);
          changeData("baseCurrency", v.currency);
          changeData("localeCode", v.localeCode);
        }}
        onClose={() => setShowCountryModal(false)}
      />
    </div>
  );
};

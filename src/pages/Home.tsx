import { BottomSheet } from "components/BottomSheet";
import _ from "lodash";
import { useEffect, useState } from "react";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useJourneyList } from "store/useJourneyList";
import { ReactComponent as JourneyIcon1 } from "../assets/svg/Property 1=Travel Bag.svg";
import { ReactComponent as JourneyIcon2 } from "../assets/svg/Property 1=Travel Ticket.svg";
import { ReactComponent as JourneyIcon3 } from "../assets/svg/Property 1=Travel.svg";
import { ReactComponent as JourneyIcon4 } from "../assets/svg/Property 1=Travel2.svg";
import { ReactComponent as JourneyIcon5 } from "../assets/svg/Property 1=World Tour.svg";
import "./Home.scss";

export const Home = () => {
  const { journeyList, fetchJourneyList } = useJourneyList();
  const navigate = useNavigate();

  const [showJourneyListModal, setShowJourneyListModal] = useState(false);
  const [iconIndex] = useState(_.random(0, 4));

  useEffect(() => {
    // 진행중인 여정 데이터를 불러 온다. 완료 되었는지 확인
    fetchJourneyList();
  }, []);

  const icons = [
    <JourneyIcon1 className="mr-2" />,
    <JourneyIcon2 className="mr-2" />,
    <JourneyIcon3 className="mr-2" />,
    <JourneyIcon4 className="mr-2" />,
    <JourneyIcon5 className="mr-2" />
  ];

  const handleClickMoveToJourney = () => {
    if (journeyList.length === 1) {
      navigate(`/journey/${journeyList[0].journeyId}`);
    } else {
      setShowJourneyListModal(true);
    }
  };

  return (
    <div className="home">
      <div className="home__header flex items-center font-bold">
        <img
          src={`${process.env.PUBLIC_URL}/logo.png`}
          width={36}
          height={24}
          alt={"logo"}
        />
        <div className="ml-1.5">Pay To</div>
      </div>
      <div className="pt-[22px]">
        <Link to="/journey/create">
          <div className="mb-2 pt-4 pl-4 pr-2 pb-2 bg-[#2C7EFF] text-white rounded-3xl">
            <div className="text-sm mb-0.5">
              새로운 여행을
              <br />
              준비하고 있다면
            </div>
            <div className="font-bold mb-3">여정 생성하기</div>
            <div className="flex justify-end">
              <div className="arrow-icon">
                <HiOutlineArrowRight />
              </div>
            </div>
          </div>
        </Link>
        <div className="flex gap-2 mb-2">
          <Link to="/join" className="flex-1">
            <div className="pt-4 pl-4 pr-2 pb-2 bg-[#DCEAFF] rounded-3xl">
              <div className="text-sm mb-0.5">
                이미 생성된
                <br />
                여정이 있다면
              </div>
              <div className="font-bold mb-3">여정 참여하기</div>
              <div className="flex justify-end">
                <div className="arrow-icon">
                  <HiOutlineArrowRight />
                </div>
              </div>
            </div>
          </Link>

          <Link to="/history" className="flex-1">
            <div className="pt-4 pl-4 pr-2 pb-2 bg-[#FAFAFB] rounded-3xl">
              <div className="text-sm mb-0.5">
                마무리된 정산을
                <br />
                확인하고 싶다면?
              </div>
              <div className="font-bold mb-3">지난 여정</div>
              <div className="flex justify-end">
                <div className="arrow-icon">
                  <HiOutlineArrowRight />
                </div>
              </div>
            </div>
          </Link>
        </div>
        {!_.isEmpty(journeyList) && (
          <div
            className="flex justify-center items-center bg-[#0A0A0B] text-white text-[16px] font-bold rounded-3xl py-6 cursor-pointer"
            onClick={handleClickMoveToJourney}
          >
            {icons[iconIndex]} 여정으로 돌아가기
          </div>
        )}
      </div>

      <BottomSheet
        title="진행중인 여정"
        isOpen={showJourneyListModal}
        onClose={() => setShowJourneyListModal(false)}
      >
        <div className="h-[40vh] overflow-y-auto">
          {journeyList.map(journey => (
            <div
              key={journey.journeyId}
              className="rounded-2lg bg-[#FAFAFB] text-[#151719] text-[14px] h-[48px] font-medium mb-2 cursor-pointer flex items-center pl-4"
              onClick={() => {
                navigate(`/journey/${journey.journeyId}`);
              }}
            >
              {journey.title}
            </div>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
};

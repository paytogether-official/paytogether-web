import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import "./Home.scss";

export const Home = () => {
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
        <Link to="/create">
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
        <div className="flex gap-2">
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
      </div>
    </div>
  );
};

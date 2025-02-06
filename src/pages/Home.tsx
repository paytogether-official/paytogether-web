import "./Home.scss";

export const Home = () => {
  return (
    <div className="home">
      <div className="home__header flex items-center font-bold">Pay To</div>
      <div className="pt-[22px]">
        <div className="mb-2 pt-4 pl-4 pr-2 pb-2 bg-[#2C7EFF] text-white rounded-3xl">
          <div className="text-sm mb-0.5">
            새로운 여행을
            <br />
            준비하고 있다면
          </div>
          <button className="font-bold mb-4">여정 생성하기</button>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 pt-4 pl-4 pr-2 pb-2 bg-[#DCEAFF] rounded-3xl">
            <div className="text-sm mb-0.5">
              이미 생성된
              <br />
              여정이 있다면
            </div>
            <button className="font-bold mb-4">여정 참여하기</button>
          </div>
          <div className="flex-1 pt-4 pl-4 pr-2 pb-2 bg-[#FAFAFB] rounded-3xl">
            <div className="text-sm mb-0.5">
              마무리된 정산을
              <br />
              확인하고 싶다면?
            </div>
            <button className="font-bold mb-4">지난 여정</button>
          </div>
        </div>
      </div>
    </div>
  );
};

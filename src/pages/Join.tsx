import axios from "api";
import { Journey } from "interfaces/Journey";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useCommon } from "store/useCommon";
import { Header } from "../components/Header";
import { CONST } from "../CONST";

export const Join = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [inviteCode, setInviteCode] = useState("");

  // 쿼리스트링에서 code 파라미터가 있으면 자동 세팅
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    if (code) {
      setInviteCode(code);
    }
  }, [location.search]);

  const handleClickJoin = async () => {
    try {
      const response = await axios.get<Journey>(
        `https://api.paytogether.kr/journeys/${inviteCode}`
      );

      if (response.status === 200) {
        if (response.data.closedAt) {
          const journeyIds: string[] = (
            localStorage.getItem(CONST.LOCAL_STORAGE_KEY.CLOSED_JOURNEY_IDS) ??
            ""
          )
            .split(",")
            .filter(Boolean);
          if (!journeyIds.includes(inviteCode)) {
            journeyIds.push(inviteCode);
            localStorage.setItem(
              CONST.LOCAL_STORAGE_KEY.CLOSED_JOURNEY_IDS,
              journeyIds.join(",")
            );
          }
        } else {
          const journeyIds: string[] = (
            localStorage.getItem(CONST.LOCAL_STORAGE_KEY.JOURNEY_IDS) ?? ""
          )
            .split(",")
            .filter(Boolean);
          if (!journeyIds.includes(inviteCode)) {
            journeyIds.push(inviteCode);
            localStorage.setItem(
              CONST.LOCAL_STORAGE_KEY.JOURNEY_IDS,
              journeyIds.join(",")
            );
          }
        }
      } else {
        useCommon.getState().addToast({
          type: "error",
          text: "초대코드를 확인해주세요."
        });
        return;
      }

      useCommon.getState().addToast({
        type: "success",
        text: "초대된 여정으로 이동합니다"
      });

      setTimeout(() => {
        navigate(`/journey/${inviteCode}`);
      }, 2000); // 2초 후에 여정 페이지로 이동
    } catch (error) {
      useCommon.getState().addToast({
        type: "error",
        text: "초대코드를 확인해주세요."
      });
    }
  };

  return (
    <div className="journey-expense">
      <Header
        leftType="back"
        onClickLeft={() => {
          navigate(`/`);
        }}
        title="여정 참여하기"
      />
      <div className="pt-4">
        <div className="text-[20px] font-bold mb-3">
          초대코드를 입력해주세요!
        </div>
        <div className="text-[14px] mb-[20px]">
          공유받은 초대코드를 입력해주세요. 초대코드를 입력한 후 버튼을 누르면
          해당 여정으로 들어갈 수 있습니다.
        </div>
        <Form>
          <Form.Group className="mb-[20px]">
            <Form.Label>초대코드</Form.Label>
            <Form.Control
              type="text"
              placeholder="공유 받은 초대코드를 입력해주세요."
              value={inviteCode}
              onChange={e => setInviteCode(e.target.value)}
            />
          </Form.Group>
        </Form>
      </div>

      <div className="footer">
        <button
          type="button"
          className="btn btn-primary w-full text-center h-[48px] py-0"
          disabled={!inviteCode}
          onClick={handleClickJoin}
        >
          참여하기
        </button>
      </div>
    </div>
  );
};

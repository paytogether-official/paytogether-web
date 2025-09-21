import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import { BottomSheet } from "../BottomSheet";

interface Props {
  initMemo: string;
  showModal: boolean;
  onClose: () => void;
  onChange: (memo: string) => void;
}

export const MemoBottomSheet = (props: Props) => {
  const [memo, setMemo] = React.useState<string>("");

  useEffect(() => {
    if (props.showModal) {
      setMemo(props.initMemo);
    }
  }, [props.showModal, props.initMemo]);

  return (
    <BottomSheet title="메모" isOpen={props.showModal} onClose={props.onClose}>
      <Form.Group className="mb-2 border-b-2 border-[#2C7EFF]">
        <Form.Control
          className="text-[14px] p-1 h-[20px] mb-1 transparent"
          type="text"
          placeholder="어떤 특이 사항이 있었나요?"
          value={memo}
          maxLength={25}
          onChange={e => setMemo(e.target.value)}
        />
      </Form.Group>
      <div className="text-[14px] text-[#6D7582] mb-9">
        25자까지 입력할 수 있어요
      </div>
      <button
        className="btn btn-primary w-[calc(100%+2rem)] ml-[-1rem] text-center rounded-0 h-[48px]"
        onClick={() => {
          props.onChange(memo);
          props.onClose();
        }}
      >
        확인
      </button>
    </BottomSheet>
  );
};

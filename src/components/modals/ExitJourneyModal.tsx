import { Modal } from "react-bootstrap";
import { ReactComponent as DeleteIcon } from "../../assets/svg/Delete.svg";

interface Props {
  show: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const ExitJourneyModal = (props: Props) => {
  return (
    <Modal centered show={props.show} onHide={() => props.onClose()}>
      <Modal.Body>
        <div className="text-center">
          <DeleteIcon className="inline-block mb-1" />
          <div className="text-[18px] font-bold mb-1">여정을 나가시겠어요?</div>
          <div className="text-[14px] mb-4">
            목록에서 해당 여정이 사라집니다.
          </div>
          <div className="flex justify-center gap-2">
            <button
              className="btn btn-light btn-lg text-[16px] font-semibold flex-1"
              onClick={() => props.onClose()}
            >
              닫기
            </button>
            <button
              className="btn btn-danger btn-lg text-[16px] font-semibold flex-1"
              onClick={() => {
                props.onSubmit();
              }}
            >
              나가기
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

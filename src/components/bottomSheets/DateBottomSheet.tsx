import { Calendar } from "react-date-range";
import { BottomSheet } from "../BottomSheet";

interface Props {
  selectedDate: Date | undefined;
  showModal: boolean;
  onChange: (date: Date) => void;
  onClose: () => void;
}

export const DateBottomSheet = (props: Props) => {
  return (
    <BottomSheet
      title="여행기간 설정"
      isOpen={props.showModal}
      onClose={props.onClose}
    >
      <div className="flex justify-center">
        <Calendar date={props.selectedDate} onChange={props.onChange} />
      </div>
    </BottomSheet>
  );
};

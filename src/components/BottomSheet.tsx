import React from "react";
import { MdClose } from "react-icons/md";
import { Sheet } from "react-modal-sheet";
import "./BottomSheet.scss";

interface Props {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const BottomSheet = (props: Props) => {
  return (
    <Sheet
      className="bottom-sheet"
      isOpen={props.isOpen}
      onClose={props.onClose}
      detent="content-height"
    >
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <div className="p-3">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold">{props.title}</div>
              <MdClose
                className="text-2xl cursor-pointer"
                onClick={props.onClose}
              />
            </div>
            {props.children}
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
};

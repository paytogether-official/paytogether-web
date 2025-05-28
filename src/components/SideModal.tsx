import React from "react";
import classNames from "classnames";
import "./SideModal.scss";

interface Props {
  show: boolean;
  children?: React.ReactNode;
  onHide?: () => void;
}

type State = "HIDE" | "SHOW";

export const SideModal = (props: Props) => {
  return (
    <div className="side-modal">
      <div
        className={classNames(
          "side-modal__backdrop",
          props.show ? "SHOW" : "HIDE"
        )}
        onClick={() => props.onHide?.()}
      >
        <div className="side-modal__container">
          <div
            className={classNames(
              "side-modal__body",
              props.show ? "SHOW" : "HIDE"
            )}
            onClick={e => e.stopPropagation()}
          >
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

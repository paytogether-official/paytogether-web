import React from "react";
import classNames from "classnames";
import "./CategoryButton.scss";

interface Props {
  label: string;
  normalSvg: React.ReactNode;
  checkedSvg: React.ReactNode;
  checked: boolean;
  onClick: () => void;
}
export const CategoryButton = (props: Props) => {
  return (
    <div
      className={classNames("category-button cursor-pointer", {
        checked: props.checked
      })}
      onClick={props.onClick}
    >
      {!props.checked && props.normalSvg}
      {props.checked && props.checkedSvg}
      <div className="category-button__label">{props.label}</div>
    </div>
  );
};

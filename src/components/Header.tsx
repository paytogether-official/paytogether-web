import classNames from "classnames";
import { HiMenuAlt2, HiOutlineChevronLeft } from "react-icons/hi";
import "./Header.scss";
import { HiDotsVertical } from "react-icons/hi";

export type HeaderType = "back" | "menu" | "kebab";

interface Props {
  title?: string;
  leftType?: HeaderType;
  rightType?: HeaderType;
  onClickLeft?: () => void;
  onClickRight?: () => void;
}

export const Header = (props: Props) => {
  return (
    <div className="header">
      <div className="header__left">
        <div
          onClick={props.onClickLeft}
          className={classNames(props.leftType && "cursor-pointer")}
        >
          {props.leftType === "back" && <HiOutlineChevronLeft />}
          {props.leftType === "menu" && <HiMenuAlt2 />}
        </div>
      </div>
      <div className="header__title">{props.title}</div>
      <div className="header__right">
        <div
          onClick={props.onClickRight}
          className={classNames(props.rightType && "cursor-pointer")}
        >
          {props.rightType === "kebab" && <HiDotsVertical />}
        </div>
      </div>
    </div>
  );
};

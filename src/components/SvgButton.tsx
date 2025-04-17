import React, { useMemo } from "react";

interface Props {
  normalSvg: React.ReactNode;
  checkedSvg?: React.ReactNode;
  hoverSvg?: React.ReactNode;
  checked?: boolean;
  onClick?: () => void;
}
export const SvgButton = (props: Props) => {
  const [hover, setHover] = React.useState(false);

  const currentSvg = useMemo(() => {
    if (props.checked) {
      return props.checkedSvg ?? props.normalSvg;
    }

    if (hover) {
      return props.hoverSvg ?? props.normalSvg;
    }

    return props.normalSvg;
  }, [props.checked, hover, props.normalSvg, props.hoverSvg, props.checkedSvg]);

  return (
    <div
      className="cursor-pointer"
      onClick={props.onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {currentSvg}
    </div>
  );
};

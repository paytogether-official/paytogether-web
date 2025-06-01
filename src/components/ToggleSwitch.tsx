import classNames from "classnames";
import "./ToggleSwitch.scss";

interface Props {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}

export const ToggleSwitch = (props: Props) => {
  return (
    <div className="toggle-switch">
      {props.options.map(option => (
        <div
          key={option.value}
          className={classNames("toggle-switch__label", {
            active: props.value === option.value,
            "cursor-pointer": props.value !== option.value
          })}
          onClick={() => props.onChange(option.value)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

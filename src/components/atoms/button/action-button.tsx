import { useTokens } from "@/src/app/(context)/ColorContext";
import { CSSProperties } from "react";

type ActionButtonProps = {
  onClick: () => void;
  icon: React.ReactElement;
  text: string;
  bgColor: string;
  color: string;
};

const ActionButton = (props: ActionButtonProps) => {
  const token = useTokens();
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  const actionButtonCss: CSSProperties = {
    display: "flex",
    padding: "8px 16px",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    backgroundColor: props.bgColor,
    color: props.color,
    borderRadius: "4px",
    border: `0.5px solid ${token.default.grey}`,
    opacity: "0.8",
  };

  return (
    <button type="button" onClick={handleClick} style={actionButtonCss}>
      {props.icon}
      {props.text && (
        <span style={{ color: props.color }} className="action-text">
          {props.text}
        </span>
      )}
    </button>
  );
};

export default ActionButton;

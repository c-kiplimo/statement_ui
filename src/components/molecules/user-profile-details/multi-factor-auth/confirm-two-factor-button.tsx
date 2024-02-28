import { FontType } from "@/src/types/context.types";
import React from "react";

type confirmationMethodButton = {
  onClick: () => void;
  isActive: boolean;
  height: string;
  width: string;
  font: FontType;
  textColor: string;
  buttonText: string;
  borderSecondaryColor: string;
  backgroundColor: string;
};

const ConfirmationMethodButton = (props: confirmationMethodButton) => {
  return (
    <>
      <div
        onClick={props.onClick}
        style={{
          width: props.width,
          height: props.height,
          padding: "16px 24px",
          display: "flex ",
          borderRadius: "3px",
          background: props.backgroundColor,
          boxShadow: "0px 2px 12px -2px rgba(26, 38, 0, 0.14)",
          border: `0.5px solid ${props.borderSecondaryColor}`,
        }}
        className="flex justify-between items-center px-4 py-2 rounded cursor-pointer hover:bg-primary-dark"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div className="text-left">
            <div
              style={{
                ...props.font.typography.body.regular,
                color: props.textColor,
              }}
            >
              {props.buttonText}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationMethodButton;

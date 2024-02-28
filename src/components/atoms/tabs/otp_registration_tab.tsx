import {
  AppColorToken,
  FontProperties,
} from "@/src/types/context.types";
import { useState } from "react";

type ButtonTabProps = {
  items: { title: string; content: React.JSX.Element }[];
  colorToken: AppColorToken;
  onClick: (event: React.MouseEvent<HTMLElement>, index: number) => void;
  tabWidth?: string;
  tabHeight?: string;
  backgroundColor?: string;
  activeBackgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  activeTextColor?: string;
  fontProperties: FontProperties;
};

const OTPRegistrationTab = (props: ButtonTabProps) => {
  const {
    tabWidth = "140px",
    tabHeight = "88px",
    borderColor = props.colorToken.border.primary,
    textColor = props.colorToken.text.primary,
    activeTextColor = props.colorToken.brand.primary,
    backgroundColor = props.colorToken.background.secondary,
    activeBackgroundColor = props.colorToken.default.white,
  } = props;

  const [active, activate] = useState(0);

  const onTabClicked = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    activate(index);
    props.onClick(event, index);
  };

  return (
    <div className="provider-tabs">
      <div
        className="provider-tab-item"
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          alignSelf: "stretch",
          borderRadius: "4px",
          gap: "16px",
          marginBottom: "32px",
          background: props.colorToken.default.white,
        }}
      >
        {props.items.map(
          (
            item: {
              title: string;
              content: React.JSX.Element;
            },
            index: number
          ) => (
            <div
              key={index}
              onClick={(event) => onTabClicked(event, index)}
              className="text-left"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "32px",
              }}
            >
              <div
                style={{
                  ...props.fontProperties,
                  color: `${isActive(index) ? activeTextColor : textColor}`,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "16px 16px",
                  display: "flex",
                  flexDirection: "column",
                  width: tabWidth,
                  height: tabHeight,
                  background: `${
                    isActive(index) ? activeBackgroundColor : backgroundColor
                  }`,
                  boxShadow: "0px 2px 12px -2px rgba(26, 38, 0, 0.14)",
                  border: `0.5px solid ${borderColor}`,
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                {item.title}
              </div>
            </div>
          )
        )}
      </div>
      <div>
        {props.items.map(
          (
            item: {
              title: string;
              content: React.JSX.Element;
            },
            index: number
          ) => isActive(index) && <div key={index}>{item.content}</div>
        )}
      </div>
    </div>
  );

  function isActive(index: number) {
    return active == index;
  }
};

export default OTPRegistrationTab;

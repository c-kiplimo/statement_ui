import { AppColorToken, FontType } from "@/src/types/context.types";

import { useState } from "react";
import Underline from "../underline";

const ButtonTab = (props: {
  items: { title: string; content: React.JSX.Element }[];
  colorToken: AppColorToken;
  font: FontType;
}) => {
  const [toggleState, setToggleState] = useState(0);

  const onTabClicked = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    setToggleState(index);
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
          borderRadius: "none",
          gap: "16px",
          background: props.colorToken.default.white,
        }}
      >
        {props.items.map(
          (
            item: {
              title: string;
              content: React.JSX.Element;
            },
            index: any
          ) => (
            <button
              key={index}
              onClick={(event) => onTabClicked(event, index)}
              className={toggleState == index ? "active-tab" : "button-tab"}
              style={{
                display: "flex",
                padding: "8px 16px",
                justifyContent: "center",

                alignItems: "center",
                gap: "10px",
                borderRadius: "4px",
                opacity: "0.8",
                border:
                  toggleState === index
                    ? ``
                    : `1px solid ${props.colorToken.border.primary}`,
                background:
                  toggleState === index
                    ? props.colorToken.border.primary
                    : props.colorToken.default.white,
              }}
            >
              {item.title}
            </button>
          )
        )}
      </div>
      <Underline
        customStyles={{
          borderBottom: `0.5px solid  ${props.colorToken.border.primary}`,
        }}
      />
      <div>
        {props.items.map(
          (
            item: {
              title: string;
              content: React.JSX.Element;
            },
            index: any
          ) =>
            toggleState == index && (
              <div key={index} style={{ paddingTop: "24px" }}>
                {item.content}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ButtonTab;

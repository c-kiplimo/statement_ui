import { useTokens } from "@/src/app/(context)/ColorContext";
import { AppColorToken } from "@/src/types/context.types";
import { CSSProperties, useState } from "react";

export type MTabProp = {
  items: { title: string; content: React.JSX.Element; contentwidth?: string }[];
  colorToken: AppColorToken;
};

const MTab = (props: MTabProp) => {
  const [selected, setSelected] = useState(0);
  return (
    <>
      <MTabBarHeader
        items={props.items}
        onSelected={(index) => {
          setSelected(index);
        }}
        tabLineColor={props.colorToken.border.primary}
        style={{
          borderBottomColor: props.colorToken.border.primary,
        }}
      />
      {props.items.map(
        (
          item: {
            title: string;
            content: React.JSX.Element;
            contentwidth?: string;
          },
          index: any
        ) =>
          selected == index && (
            <div key={index} style={{ width: item.contentwidth }}>
              {item.content}
            </div>
          )
      )}
    </>
  );
};

type MTabBarHeaderProps = {
  items: { title: string }[];
  onSelected: (index: number) => void;
  style?: CSSProperties;
  tabLineColor: string;
};

const MTabBarHeader = (props: MTabBarHeaderProps) => {
  const [select, setSelected] = useState(0);
  const token = useTokens();
  const handleClick = (number: number) => {
    setSelected(number);
    props.onSelected(number);
  };

  return (
    <div
      style={{
        display: "flex",
        minWidth: "954px",
        justifyContent: "space-between",
        alignItems: "flex-start",
        borderBottom: `1px solid ${props.tabLineColor}`,
        ...props.style,
      }}
    >
      {props.items?.map((item: { title: string }, index: number) => (
        <button
          {...item}
          key={index}
          onClick={() => handleClick(index)}
          style={{
            display: "flex",
            padding: "8px 16px",
            outline: "none",
            justifyContent: "center",
            alignItems: "center",
            color: `${index === select ? token.brand.secondary : ""}`,
            gap: "10px",
            borderBottom: `2px solid ${
              index === select ? token.brand.secondary : "transparent"
            }`,
            opacity: "0.8",
            background: token.default.white,
          }}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default MTab;

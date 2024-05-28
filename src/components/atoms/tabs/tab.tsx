"use client";

import { useTokens } from "@/src/app/(context)/ColorContext";
import { CSSProperties, ReactNode, useEffect, useRef } from "react";

type TabItem = {
  title: string;
  content: ReactNode;
};

type TabsProps = {
  tabsItems: TabItem[];
  onSelectTab: (index: number) => void;
  selectedTab: number;
  backgroundColor: string;
  borderBottom?: string;
  isUnderlined?: boolean;
  fontWeight: number;
  borderColor: string;
  textColor: string;
  textColorActive?: string;
};

const Tab: React.FC<TabsProps> = ({
  tabsItems,
  textColor,
  textColorActive,
  borderColor,
  backgroundColor,
  borderBottom,
  isUnderlined = true,
  fontWeight,
  onSelectTab,
  selectedTab,
}) => {
  const firstBtnRef = useRef<HTMLButtonElement>(null);
  const token = useTokens();
  const TabCss: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
  };

  useEffect(() => {
    if (firstBtnRef.current) {
      firstBtnRef.current.focus();
    }
  }, []);

  return (
    <div style={TabCss}>
      <div
        style={{
          display: "flex",
          padding: "0px 6px",
          borderBottom: isUnderlined ? `1px solid ${borderBottom}` : "none",
          justifyContent: "center",
          alignItems: "center",
          gap: "32px",
          borderRadius: isUnderlined ? "" : "4px",
          background: token.default.white,
        }}
      >
        {tabsItems.map((item, index) => (
          <button
            ref={index === 0 ? firstBtnRef : null}
            key={index}
            onClick={() => onSelectTab(index)}
            style={{
              padding: "5px 16px",
              margin: "0px",
              outline: "none",
              border:
                index === selectedTab && isUnderlined
                  ? ``
                  : `1px solid ${borderColor}`,
              borderRadius: "4px",
              boxShadow:
                index === selectedTab && isUnderlined
                  ? ``
                  : index === selectedTab
                  ? `0px 10px 18px -2px rgba(10, 9, 11, 0.07)`
                  : "",
              background: index === selectedTab ? backgroundColor : "",
              cursor: "pointer",
              color:
                index === selectedTab && isUnderlined
                  ? textColorActive
                  : index === selectedTab
                  ? textColor
                  : "",
              fontWeight: index === selectedTab ? fontWeight : "",
            }}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tab;

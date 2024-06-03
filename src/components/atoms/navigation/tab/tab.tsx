"use client";

import { useTokens } from "@/src/app/(context)/ColorContext";
import styles from "./tab.module.css";
import classNames from "classnames/bind";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

type TabItem = {
  title: string;
  content: ReactNode;
};

type CombinedTabsProps = {
  tabsItems: TabItem[];
  initialSelectedTab?: number;
  backgroundColor?: string;
  borderBottom?: string;
  isUnderlined?: boolean;
  fontWeight: number;
  borderColor: string;
  textColor: string;
  textColorActive?: string;
  contentPadding?: string;
  contentMarginTop?: string;
};

const cx= classNames.bind(styles);

const CombinedTabs: React.FC<CombinedTabsProps> = ({
  tabsItems,
  initialSelectedTab = 0,
  textColor,
  textColorActive,
  borderColor,
  backgroundColor,
  borderBottom,
  isUnderlined = true,
  fontWeight,
  contentPadding,
  contentMarginTop,
}) => {
  const [selectedTab, setSelectedTab] = useState(initialSelectedTab);
  const firstBtnRef = useRef<HTMLButtonElement>(null);
  const token = useTokens();

  useEffect(() => {
    if (firstBtnRef.current) {
      firstBtnRef.current.focus();
    }
  }, []);

  const TabCss: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
  };

  const tabContainerStyles: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "32px",
    padding: "0 6px",
    borderBottom: "1px solid ${borderBottom}",
    borderRadius: isUnderlined ? undefined : "4px",
    background: token.default.white,
  };

  return (
    <>
      <div className={styles.container}>
        <div style={{
          display: "flex",
          padding: "0px 6px",
          borderBottom: isUnderlined ? `1px solid ${borderBottom}` : "none",
          justifyContent: "center",
          alignItems: "center",
          gap: "32px",
          borderRadius: isUnderlined ? "" : "4px",
          background: token.default.white,
        }}>
          {tabsItems.map((item, index) => (
            <button
              ref={index === 0 ? firstBtnRef : null}
              key={index}
              onClick={() => setSelectedTab(index)}              
              className={`${cx({
                button: true,
                "button-active": selectedTab === index,
              })} bodyr`}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.body}>
        {tabsItems.map((item, index) => (
          <div
            key={index}
            className={`${selectedTab === index ? "" : "hidden"}`}
            style={{
               display: selectedTab === index ? 'block' : 'none',
              marginTop: contentMarginTop,
              padding: contentPadding,
            }}
          >
            {item.content}
          </div>
        ))}
      </div>
    </>
  );
};

export default CombinedTabs;

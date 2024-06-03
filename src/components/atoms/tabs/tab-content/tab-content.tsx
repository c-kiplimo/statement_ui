import React from "react";
import styles from "./tab-content.module.css";

type TabContentProps = {
  tabsItems: { content: React.ReactNode }[];
  selectedTab: number;
  textColor: string;
  borderColor?: string;
  border?: string;
  backgroundColor: string;
  fontWeight: number;
  marginTop?: string;
  padding?: string;
};

const TabContent: React.FC<TabContentProps> = ({
  tabsItems,
  selectedTab,
  padding,
  marginTop,
}) => {
  return (
    <div className={styles.container}>
      {tabsItems.map((item, index) => (
        <div
          key={index}
          className={`${selectedTab === index ? "" : "hidden"}`}
          style={{
            marginTop: marginTop,
            padding: padding,
          }}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
};

export default TabContent;

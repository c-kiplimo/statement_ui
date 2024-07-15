
import React, { ReactNode, useState } from "react";
import styles from "./tab-nav.module.css";
import Link from "next/link";

interface DataType {
  buttonName: string;
  bodyContent: ReactNode;
}
type TabProps = {
  tabItems: DataType[];
};

const TabNav = (props: TabProps) => {
  const [activeTab, setActiveTab] = useState(props.tabItems[0]?.buttonName);

  const handleButtonClick = (buttonName: string) => {
    setActiveTab(buttonName);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.buttonsContainer}>
          {props.tabItems.map((item) => (
            <div key={item.buttonName}>
              <TabNav.Buttons
                buttonname={item.buttonName}
                isActive={activeTab === item.buttonName}
                onClick={() => handleButtonClick(item.buttonName)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bodyContent}>
        {props.tabItems.map((item) => (
          <div
            key={item.buttonName}
            style={{
              display: activeTab === item.buttonName ? "block" : "none",
            }}
          >
            {item.bodyContent}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabNav;

type ButtonProps = {
  buttonname: string;
  isActive?: boolean;
  onClick?: () => void;
};

TabNav.Buttons = (props: ButtonProps) => (
  <div>
    <Link
      href={""}
      style={{
        backgroundColor: props.isActive ? "#E6E6E6" : "",
        borderRadius: "4px",
        padding: "8px",
        opacity: "80%",
        color: "#151E00",
      }}
      onClick={props.onClick}
    >
      {props.buttonname}
    </Link>
  </div>
);

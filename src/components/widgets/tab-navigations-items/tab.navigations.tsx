import React, { ReactNode, useEffect, useState } from "react";
import styles from "./tab.navigations.module.css";
import Link from "next/link";

interface DataType {
  buttonName: string;
  bodyContent: ReactNode;
}
type TestProps = {
  tabItems: DataType[];
};
function TabNavigations(props: TestProps) {
  const [activeTab, setActiveTab] = useState(props.tabItems[0]?.buttonName);

  const handleButtonClick = (buttonName: string) => {
    setActiveTab(buttonName);
    localStorage.setItem("activeTab", buttonName); 

  
  };

  useEffect(() => {
    const storedTab = localStorage.getItem("activeTab");
    if (storedTab && props.tabItems.some((item) => item.buttonName === storedTab)) {
      setActiveTab(storedTab);
    }
  }, [props.tabItems]);
  
  
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.buttonsContainer}>
          {props.tabItems.map((item) => (
            <div key={item.buttonName}>
              <TabNavigations.Buttons
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
}

export default TabNavigations;

type ButtonProps = {
  buttonname: string;
  isActive?: boolean;
  onClick?: () => void;
};

TabNavigations.Buttons = (props: ButtonProps) => (
  <div>
    <Link href={""} style={{backgroundColor: props.isActive ? "#E6E6E6" : "",
        borderRadius: "4px",
        padding: "8px",
        opacity: "80%",
        color: "#151E00",}}      
         onClick={props.onClick}
        >
    {props.buttonname}

    </Link>
  </div>
);

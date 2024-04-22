import React from "react";
import styles from "./tabnavigation.module.css";

export type Button = {
  buttonName: string;
  bodyContent: React.ReactNode;
};

type TabsProps = {
  buttons: Button[];
  activeTab: number; // New prop to indicate active tab index
  onTabClick: (index: number) => void; // Callback function for tab click
};

const TabNav: React.FC<TabsProps> = ({ buttons, activeTab, onTabClick }) => {
  return (
    <div className={styles.container}>
      {buttons.map((button, index) => (
        <div
          className={`${styles.tab} ${index === activeTab ? styles.active : ''}`}
          key={`button${index + 1}`}
          onClick={() => onTabClick(index)}
        >
          <div className={styles.text}>
            <button>{button.buttonName}</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TabNav;

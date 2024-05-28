import React,{ ReactNode, useEffect, useRef } from "react";
import styles from "./tab-item.module.css";
import classNames from "classnames/bind";

type TabItem = {
  title: string;
  content: ReactNode;
};

type TabsProps = {
  tabsItems: TabItem[];
  onSelectTab: (index: number) => void;
  selectedTab: number;
};

const cx = classNames.bind(styles);

const Tabs: React.FC<TabsProps> = ({
  tabsItems,
  onSelectTab,
  selectedTab,
}) => {
  const firstBtnRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (firstBtnRef.current) {
      firstBtnRef.current.focus();
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {tabsItems.map((item, index) => (
          <button
            ref={index === 0 ? firstBtnRef : null}
            key={index}
            onClick={() => onSelectTab(index)}
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
  );
};

export default Tabs;

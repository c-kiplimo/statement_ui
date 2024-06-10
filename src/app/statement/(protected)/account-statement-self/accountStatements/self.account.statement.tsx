import React, { useState, useEffect } from "react";
import styles from "./self.account.statement.module.css";
import CompletedStatement from "./completed-statement/completed.statement";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import TabNavigations from "../tab-navigations-items/tab.navigations";
import dynamic from "next/dynamic";
const ActiveStatement = dynamic(() => import("./active-statement-item/active.statement.item"), { ssr: false });

const tabitems = [
  {
    buttonName: "Active Statement",
    bodyContent: <ActiveStatement />,
  },
  {
    buttonName: "Completed",
    bodyContent: <CompletedStatement />,
  },
];

function SelfAccountStatement() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={styles.start}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <SelfAccountStatement.Header description="Search Account statement by providing Customers Account Number" />
          </div>
          <div>
            {isMounted && <TabNavigations tabItems={tabitems} />}
          </div>
        </div>
      </div>
      <div className={styles.bottomitem}></div>
    </div>
  );
}

export default SelfAccountStatement;

type HeaderProps = {
  title?: string;
  description: string;
};

SelfAccountStatement.Header = (props: HeaderProps) => (
  <VerticalInfoDescription
    title={props.title!} 
    description={props.description}
    titleStyle={{ fontSize: "20px", fontWeight: "500", marginBottom: "16px" }}
    descriptionStyle={{ fontWeight: "300", width: "100%", fontSize:'18px'}}
  />
);

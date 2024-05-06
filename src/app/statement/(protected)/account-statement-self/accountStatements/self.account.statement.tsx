import React, { useState } from "react";
import styles from "./self.account.statement.module.css";
import ActiveStatement from "./active-statement-item/active.statement.item";
import CompletedStatement from "./completed-statement/completed.statement";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import TabNavigations from "../tab-navigations-items/tab.navigations";

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
  return (
    <div className={styles.start}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <SelfAccountStatement.Header description="Search Account statement by providing Customers Account Number" />
          </div>
          <div>
            <TabNavigations tabItems={tabitems} />
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
    descriptionStyle={{ fontWeight: "300", width: "100%" }}
  />
);

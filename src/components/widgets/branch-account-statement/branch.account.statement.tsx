import React, { useState } from "react";
import styles from "./branch.account.statement.module.css";
import TabNavigations from "../tab-navigations-items/tab.navigations";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";
import ActiveStatement from "./active-statement-item/active.statement.item";
import PendingStatement from "./pending-statement-item/pending.statement";
import CompletedStatement from "./completed-statement/completed.statement";
import {AccountContext } from './context/accountStatementcontext'
import StatementTable from "./activity-history-table/activity.history.table";

const tabitems = [
  {
    buttonName: "Active Statement",
    bodyContent: <ActiveStatement />,
  },
  {
    buttonName: "Pending Statement",
    bodyContent: <PendingStatement />,
  },
  {
    buttonName: "Completed",
    bodyContent: <CompletedStatement />,
  },
];

function BranchAccountStatement() {
  const [completedata, setcompleteData] =useState<CompleteTransactions[]>([])

  return (
    <AccountContext.Provider value={{completedata,setcompleteData}}>
    <div className={styles.start}>
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <BranchAccountStatement.Header
            title="Provide Account Details"
            description="Search Account statement by providing customers account number"
          />
        </div>
        <div>
          <TabNavigations tabItems={tabitems} />
        </div>
      </div>
    </div>
    <div className={styles.bottomitem}>
    {/* <StatementTable statementdata={completedata}/> */}
    </div>
    </div>
    </AccountContext.Provider>
  );
}

export default BranchAccountStatement;

type HeaderProps = {
  title: string;
  description: string;
};

BranchAccountStatement.Header = (props: HeaderProps) => (
  <VerticalInfoDescription
    title={props.title}
    description={props.description}
    titleStyle={{ fontSize: "20px", fontWeight: "500", marginBottom: "16px" }}
    descriptionStyle={{ fontWeight: "300", width: "100%" }}
  />
);

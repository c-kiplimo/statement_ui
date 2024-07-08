import React, { useEffect, useState } from "react";
import styles from "./branch.account.statement.module.css";
import CompletedStatement from "./completed-statement/completed.statement";
import { AccountStatementContext } from "./context/getAccountNumberContext";
import { QueryClient, QueryClientProvider } from 'react-query';
import TabNavigations from "@/src/components/widgets/tab-navigations-items/tab.navigations";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import dynamic from "next/dynamic";

const ActiveStatement = dynamic(() => import("./active-statement-item/active.statement.item"), { ssr: false });

const queryClient = new QueryClient();

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

function BranchAccountStatement() {
  const [accountNo, setAccountNo] = useState();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <AccountStatementContext.Provider value={{ accountNo, setAccountNo }}>
      <QueryClientProvider client={queryClient}>

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
            {isMounted && <TabNavigations tabItems={tabitems} />}
            </div>
          </div>
        </div>
      </div>
      </QueryClientProvider>
    </AccountStatementContext.Provider>
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
    descriptionStyle={{ fontWeight: "300", width: "100%", fontSize:'18px'}}
  />
);

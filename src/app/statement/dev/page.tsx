"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import RecentTransactionsCard from "@/src/components/widgets/recent-transaction-history/recent.transaction.history";
import AccountsSummaryItem from "@/src/components/widgets/accounts-summary-item/accounts.summary.item";

const data = [
  {
    id: 1,
    icon: <img src="/deposit.svg" alt="" />,
    accountName: "Deposits Accounts(8)",
    accountBalance: "$50,000",
    bgcolor: "",
    imgcolor: "#17D05B",
  },
  {
    id: 2,
    icon: <img src="/checking.svg" alt="" />,
    accountName: "Checking Accounts(2)",
    accountBalance: "$35,000",
    bgcolor: "",
    imgcolor: "#4272DD",
  },
  {
    id: 3,
    icon: <img src="/saving.svg" alt="" />,
    accountName: "Saving accounts(2)",
    accountBalance: "$30,000",
    bgcolor: "",
    imgcolor: "#F30039",
  },
  {
    id: 4,
    icon: <img src="/loans.svg" alt="" />,
    accountName: "Loans (4)",
    accountBalance: "$35,000",
    bgcolor: "",
    imgcolor: "#FFBD66",
  },
];

const Dev = () => {
  return (
    <Fragment>
      <div className="p-9 bg-slate-100">
        <AccountsSummaryItem
          cardTitle={"Summary"}
          placeholder={"Search"}
          buttonname={"Filter"}
          icon={<img src="/funnel.svg" />}
          accountData={data}
        />
      </div>
    </Fragment>
  );
};

export default withContainer(Dev);

"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import SavingAccountBalance from "@/src/components/widgets/saving-account-balances/saving.account.balance";

const accountBalances = [
  {
    id: 1,
    titleIcon: <img src="/openingbal.svg" />,
    summaryTitle: "Opening Balance",
    titleDescription: "(No 10)",
    amount: "$560,025",
    arrowIcon: <img src="/openingarrowIcon.svg" />,
    percentage: "2.45%",
    date: "This Month",
  },
  {
    id: 2,
    titleIcon: <img src="/spending.svg" />,
    summaryTitle: "Spending",
    titleDescription: "(No 100)",
    amount: "$560,025",
    arrowIcon: <img src="/spendingarrowIcon.svg" />,
    percentage: "+0.47%",
    date: "This Month",
  },
  {
    id: 3,
    titleIcon: <img src="/received.svg" />,
    summaryTitle: "Received",
    titleDescription: "(No 10)",
    amount: "$560,025",
    arrowIcon: <img src="/arrowLeftIcon.svg" />,
    percentage: "2.45%",
    date: "This Month",
  },
  {
    id: 4,
    titleIcon: <img src="/closing.svg" />,
    summaryTitle: "Closing Balance",
    titleDescription: "(No 10)",
    amount: "$700,000",
    arrowIcon: <img src="/closingarrowIcon.svg" />,
    percentage: "2.45%",
    date: "This Month",
  },
];
const Dev = () => {
  return (
    <Fragment>
      <div className="p-9 bg-slate-100">
        <SavingAccountBalance accounBalances={accountBalances} />
      </div>
    </Fragment>
  );
};

export default withContainer(Dev);

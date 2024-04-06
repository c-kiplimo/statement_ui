"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import AccountsTableInfo from "@/src/components/widgets/accounts-table-info/accounts.table.info";
const data = [
  {
    id: 1,
    accountIcon: <img src="/saving.svg" />,
    accountTitle: "Saving account(2)",
    amount: "$35,000",
    accountsbreakdownInfo: [
      {
        key: 1,
        accountName: "Free checking",
        accountNumber: "4556 677 888",
        currentBalance: "$5,6000",
      },
      {
        key: 2,
        accountName: "Minor Saving",
        accountNumber: "4556 677 888",
        currentBalance: "$5,6000",
      },
    ],
  },

  {
    id: 2,
    accountIcon: <img src="/loans.svg" />,
    accountTitle: "Loans(4)",
    amount: "$35,000",
    accountsbreakdownInfo: [
      {
        key: 1,
        accountName: "Free checking",
        accountNumber: "4556 677 888",
        currentBalance: "$5,6000",
      },
      {
        key: 2,
        accountName: "Minor Saving",
        accountNumber: "4556 677 888",
        currentBalance: "$5,6000",
      },
    ],
  },
  {
    id: 3,
    accountIcon: <img src="/checking.svg" />,
    accountTitle: "Checking accounts(2)",
    amount: "$35,000",
    accountsbreakdownInfo: [
      {
        key: 1,
        accountName: "Free checking",
        accountNumber: "4556 677 888",
        currentBalance: "$5,6000",
      },
      {
        key: 2,
        accountName: "Minor Saving",
        accountNumber: "4556 677 888",
        currentBalance: "$5,6000",
      },
    ],
  },
  {
    id: 4,
    accountIcon: <img src="/deposit.svg" />,
    accountTitle: "Deposit accounts(8)",
    amount: "$50,000",
    accountsbreakdownInfo: [
      {
        key: 1,
        accountName: "Free checking",
        accountNumber: "4556 677 888",
        currentBalance: "$5,6000",
      },
      {
        key: 2,
        accountName: "Minor Saving",
        accountNumber: "4556 677 888",
        currentBalance: "$5,6000",
      },
    ],
  },
];

const Dev = () => {
  return (
    <Fragment>
      <div className="p-9 bg-slate-100">
        <AccountsTableInfo
          accountsData={data}
          title={"Accounts"}
          inputPlaceholder={"Search"}
        />
      </div>
    </Fragment>
  );
};

export default withContainer(Dev);

"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import CashflowCardHome from "@/src/components/widgets/cash-flow-card-home/cashflow.card.home";
import AccountTransactionSummary from "@/src/components/widgets/accounts-transactions-summary/accounts.transactions.summary";

const data = [
  {
    id: 1,
    icon: <img src="/spotifie.svg" />,
    title: "Paypal",
    description: "$47,000",
    percentage: 60,
    strokecolor: "#FFBD66",
  },
  {
    id: 2,
    icon: <img src="/spotifie.svg" />,
    title: "Paypal",
    description: "$47,000",
    percentage: 25,
    strokecolor: "#4272DD",
  },
];

const optiondata = [
  {
    key: 1,
    value: "onemonth",
    option: "This Month",
  },
  {
    key: 2,
    value: "twomonth",
    option: "2 Month",
  },
  {
    key: 3,
    value: "threemonth",
    option: "3 Month",
  },
];

const transactionData = [
  {
    id: 1,
    icon: <img src="/spotify.svg" />,
    title: "Spotify",
    date: "Tue, 21 Jan,2024",
    amount: "20.00",
  },
  {
    id: 2,
    icon: <img src="/udemy.svg" />,
    title: "Udemy",
    date: "Tue, 21 Jan,2024",
    amount: "-35.00",
  },
  {
    id: 3,
    icon: <img src="/paypal.svg" />,
    title: "Pay Pal",
    date: "Tue, 21 Jan,2024",
    amount: "47,000.12",
  },
];
const Dev = () => {
  return (
    <Fragment>
      <div className="p-9 bg-slate-100 flex gap-4">
        <div className="">
          <AccountTransactionSummary
            headerTitle={"Recent Transactions"}
            options={optiondata}
            data={transactionData}
          />
        </div>

        <div>
          <CashflowCardHome
            headerTitle={"Cash Flow"}
            moneyInIcon={<img src="/moneyin.svg" alt="moneyin" />}
            moneyInTitle={"Money In"}
            moneyInbalance={"$37,890"}
            moneyOutIcon={<img src="/moneyout.svg" alt="moneyout" />}
            moneyOutTitle={"Mooney Out"}
            moneyOutbalance={"$37,890"}
            progressdata={data}
            options={optiondata}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default withContainer(Dev);

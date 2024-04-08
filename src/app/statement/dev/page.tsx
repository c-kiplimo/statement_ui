"use client";
import React, { Fragment} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import ChartOverview from "@/src/components/widgets/chart-overview/chart.overview";

const piechartdata = [
  { name: "Deposit Account", value: 300 },
  { name: "Saving Accounts", value: 300 },
  { name: "Loans", value: 400 },
  { name: "Checking Accounts", value: 300 },
];

const currencyBalances = [
  {
    currency: "EUR",
    amount: "82,924.65",
    dollarEquivalent: "$70000",
  },
  {
    currency: "CAD",
    amount: "26,906",
    dollarEquivalent: "$5000",
  },
  {
    currency: "KES",
    amount: " 5,092,500",
    dollarEquivalent: "$50,000  ",
  },
];
const Dev = () => {
  return (
    <Fragment>
      <div className="p-9 bg-slate-100">
        <ChartOverview
          cardTitle={"Overview"}
          piechartData={piechartdata}
          totalchartaccounts={"Accounts (17)"}
          totalChartamount={"$150,000"}
          currencyBalances={currencyBalances}
        />
      </div>
    </Fragment>
  );
};

export default withContainer(Dev);

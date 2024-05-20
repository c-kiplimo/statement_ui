import dynamic from "next/dynamic";
import React from "react";
import styles from "./chart.overview.module.css";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";
const Piechart = dynamic(() => import("../../atoms/pieChart/piechart"), {
  ssr: false,
});

export type CurrencyBalances = {
  currency: string;
  amount: string;
  dollarEquivalent: string;
};
type DataTypes = {
  name: string;
  value: number;
};
type ChartOverviewProps = {
  cardTitle: string;
  piechartData: DataTypes[];
  totalchartaccounts: string;
  totalChartamount: string;
  currencyBalances: CurrencyBalances[];
};

const ChartOverview = (props: ChartOverviewProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <VerticalInfoDescription
          title={props.cardTitle}
          titleStyle={{ fontWeight: "700", fontSize: "20px", color: "#151E00" }}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.chart}>
          <Piechart
            chartData={props.piechartData}
            totalamount={props.totalChartamount}
            accounts={props.totalchartaccounts}
          />
        </div>
        <div className={styles.content}>
          <ChartOverview.Body currencyBalances={props.currencyBalances} />
        </div>
      </div>
    </div>
  );
};

export default ChartOverview;

type BodyProps = {
  currencyBalances: CurrencyBalances[];
};

ChartOverview.Body = (props: BodyProps) => {
  return (
    <div>
      {props.currencyBalances.map((balances) => (
        <p className="mt-3">
          <span className={styles.currency}>{balances.currency}</span>{" "}
          <span className={styles.amount}>{balances.amount}</span> /{" "}
          <span className={styles.dollaramount}>
            {balances.dollarEquivalent}
          </span>
        </p>
      ))}
    </div>
  );
};

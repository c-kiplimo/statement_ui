import React, { ReactNode } from "react";
import SummaryItem from "../summary-items/summary-items";
import styles from "./saving.account.balance.module.css";

type DataType = {
  id: number;
  titleIcon: ReactNode;
  summaryTitle: string;
  titleDescription: string;
  amount: string;
  arrowIcon: ReactNode;
  percentage: string;
  date: string;
};
type SavingAccountBalanceProps = {
  accounBalances: DataType[];
};

const SavingAccountBalance = (props: SavingAccountBalanceProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        {props.accounBalances.map((balances) => (
          <div className={styles.content}>
            <SummaryItem
              svgIcon={balances.titleIcon}
              summaryTitle={balances.summaryTitle}
              titleDescription={balances.titleDescription}
              amount={balances.amount}
              svgIcons={balances.arrowIcon}
              percentage={balances.percentage}
              date={balances.date}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavingAccountBalance;

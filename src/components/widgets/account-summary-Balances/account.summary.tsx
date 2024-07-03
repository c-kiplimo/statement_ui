import React, { ReactNode } from "react";
import styles from "./account.summary.module.css";

type AcccountSummaryProps = {
  balances: AccountsDara[];
};

export type AccountsDara = {
  type: string;
  value: string;
  icon?: ReactNode;
};

const AccountSummaryBalances = (props: AcccountSummaryProps) => {
  return (
    <div className={styles.container}>
      {props.balances.map((data) => (
        <div className={styles.balancetype}>
          <div className={styles.icondivs}>
            <span>{<img src={`/${data.icon!}`} />}</span>
            <span className={`${styles.balancetext} bodyr`}>{data.type}</span>
          </div>
          <span className={`h6b`}>{"$ " + `${data.value}`}</span>
        </div>
      ))}
    </div>
  );
};

export default AccountSummaryBalances;

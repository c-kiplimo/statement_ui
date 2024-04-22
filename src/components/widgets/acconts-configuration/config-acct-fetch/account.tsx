import React, { ReactNode } from "react";
import styles from "./account.module.css";

export type ContentProps = {
  headIcon?: ReactNode;
  currency: string;
  name: string;
  account: number;
  lastSubmissionTime: string;
  availableAmount: string;
  availableTitle:string;
  inforIcon?: ReactNode;
  amountInKES?: string;
  amountIn$?: string;
  workingBaltitle?: string;
  workingBal: string;
  termTitle?: string;
  termDuration: string;
  onClick?: () => void;
};

const StatementAccounts = (props: ContentProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.titleicon}>
          <div className={styles.icondiv}>
            <div className={styles.icon}>{props.headIcon}</div>
          </div>
          <div className={styles.titledescription}>
            <div className={`${styles.header} h6r`}>{props.name}</div>
            <div className={`${styles.description} bodyl`}>
              <span>{props.currency}</span>|<span>{props.account}</span>
            </div>
          </div>
        </div>
        <div className={`${styles.status} bodyr`}>
          Last activity: {props.lastSubmissionTime}
        </div>
      </div>
      <div className={styles.transactionsDiv}>
        <div className={styles.avilableBal}>
          <div className={`${styles.avBaltitle} bodyr`}>
            {props.availableTitle}
            <button className={styles.infoIcon}>{props.inforIcon}</button>
          </div>
          <div className={`${styles.bal} h6r`}>
            <span style={{ color: "#151E00", fontSize: "20px" }}>
              {props.amountIn$}{" "}
            </span>
            |
            <span style={{ color: "#6F7269", fontSize: "20px" }}>
              {props.amountInKES}
            </span>
          </div>
        </div>
        <div className={styles.workingBal}>
          <div className={`${styles.workbaltitle} bodyr`}>
            {props.workingBaltitle}
            <button className={styles.infoIcon}>{props.inforIcon}</button>
          </div>
          <div className={`${styles.workbalamount} h6r`}>
            <span>{props.currency}</span>
            <span>{props.workingBal}</span>
          </div>
        </div>
        <div className={styles.termDiv}>
          <div className={`${styles.termTitle} bodyr`}>
            {props.termTitle}
            <button className={styles.infoIcon}>{props.inforIcon}</button>
          </div>
          <div className={`${styles.termname} h6r`}>{props.termDuration}</div>
        </div>
      </div>
    </div>
  );
};

export default StatementAccounts;

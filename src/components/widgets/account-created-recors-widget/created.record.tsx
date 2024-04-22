import React, { ReactNode } from "react";
import styles from "./created.record.module.css";
import Link from "next/link";

type recordsProps = {
  hideicon?: ReactNode;
  editicon?: ReactNode;
  creationDate: string;
  acctNumber: string;
  numberofTimes: string;
  fileformart?: string;
  acctStatus: string;
  date: string;
  status: string;
  custName: string;
  duration: string;
  filetype?: string;
  time?: string;
  acctbal?: string;
  timefrequency?: string;
  default?: string;
  onClick?: () => void;
};

const Createdrecord = (props: recordsProps) => {
  return (
    <div className={styles.container} onClick={props.onClick}>
      <div className={styles.bodydiv}>
        <table className={styles.recordTable}>
          <thead>
            <tr className={styles.column}>
              <th className={styles.column}>{props.creationDate}</th>
              <th className={styles.column}>{props.acctNumber}</th>
              <th className={styles.column}>{props.numberofTimes}</th>
              <th className={styles.column}>{props.acctStatus}</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.column}>
              <td className={styles.description}>
                <span className={styles.text}>{props.date}</span>
              </td>
              <td className={styles.description}>
                <span className={styles.text}>{props.custName}</span>
              </td>
              <td className={styles.description}>
                <span className={styles.text}>{props.duration}</span>
              </td>
              <td className={styles.state}>
                <span className={styles.active}>{props.status}</span>
              </td>
            </tr>

            <tr>
              <td className={styles.description}>
                <span className={styles.text}>{props.time}</span>
              </td>
              <td className={styles.description}>
                <span className={styles.text}>{props.acctbal}</span>
              </td>
              <td className={styles.description}>
                <span className={styles.text}>{props.timefrequency}</span>
              </td>
              <td className={styles.description}>
                <span className={styles.text}>{props.default}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.icondiv}>

        <Link href={"/statement/accountsetup/accounts"}>
        <button className={styles.iconstyle} onClick={props.onClick}>
          {props.hideicon}
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Createdrecord;

import React, { ReactNode } from "react";
import styles from "./created.record.module.css";
import Link from "next/link";

export type DataSearch =  {
  customerName: string;
  industry: string;
  customerType: string;
  customerStatus: string;
}

type AccountSearch = {
  hideicon?: ReactNode;
  editicon?: ReactNode;
  data:DataSearch[];
  onClick?: () => void;
};

const Createdrecord = (props: AccountSearch) => {
  return (
    <div className={styles.container} onClick={props.onClick}>
      <div className={styles.bodydiv}>
        <table className={styles.recordTable}>
          <thead>
            <tr className={styles.column}>
              <th className={styles.column}>Customer Name</th>
              <th className={styles.column}>Industry</th>
              <th className={styles.column}>Customer Type</th>
              <th className={styles.column}>Status</th>
            </tr>
          </thead>
          <tbody>
            {props.data.map((item, index) => (
              <tr key={index} className={styles.column}>
                <td className={styles.description}>
                  <span className={styles.text}>{item.customerName}</span>
                </td>
                <td className={styles.description}>
                  <span className={styles.text}>{item.industry}</span>
                </td>
                <td className={styles.description}>
                  <span className={styles.text}>{item.customerType}</span>
                </td>
                <td className={styles.state}>
                  <span className={styles.active}>{item.customerStatus}</span>
                </td>
              </tr>
            ))}
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

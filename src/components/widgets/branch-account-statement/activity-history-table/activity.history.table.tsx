import React from "react";
import styles from "./activity.history.table.module.css";
import { EyeOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";
export type TransactionsDataType = {
  id: number;
  date: string;
  time: string;
  accountname: string;
  accountnumber: string;
  description: string;
  status: string;
}

type StatementProps = {
  statementdata: TransactionsDataType[];
  onEyeIconClick?: (e: any) => void;
};

const StatementTable = (props: StatementProps) => {
  const path = usePathname()

  const handleEyeIconClick = (id: number) => {
    if (props.onEyeIconClick) {
      props.onEyeIconClick(id);
    }
  };

  return (
    <div>
      <table className={styles.table}>
        <thead className={``}>
          <tr className={`${styles.theadrow}`}>
            <th className={"bodyb"}>Date</th>
            <th className={"bodyb"}>Account Number</th>
            <th className={"bodyb"}>Description</th>
            <th className={"bodyb"}>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="bodyr">
          {props.statementdata.map((data) => (
            <tr key={data.id}>
              <td className={`${styles.dateTime} `}>
                <span className={`${styles.date} `}>{data.date}</span>
                <span className={`${styles.time} captionr`}>{data.time}</span>
              </td>
              <td className={styles.accountdata}>
                <span className={styles.accountname}>{data.accountname}</span>
                <span className={`${styles.accountnumber} captionr`}>
                  {data.accountnumber}
                </span>
              </td>
              <td className={styles.dateTime}>
                <span className={styles.date}>{data.description}</span>
                <span className={styles.time}></span>
              </td>
              <td>
                <span
                  className={
                    data.status === "COMPLETE" 
                      ? styles.statusComplete
                      : styles.statusPending
                  }
                >
                  {data.status}
                </span>
              </td>
              <td>
                <span
                  className={
                    data.status === "COMPLETE" ? styles.activeicon : styles.icon
                  }
                >
                  <EyeOutlined
                  style={{ width: "11px", height: "8px", cursor: "pointer" }}
                  onClick={() => handleEyeIconClick(data.id)}
                />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatementTable;

import React, { ReactNode } from "react";
import styles from "./created.record.module.css";


export type DataSearch =  {
  customerName: string;
  industry: string;
  customerType: string;
  customerStatus: string;
  id?:number,

}

type AccountSearch = {
  hideicon?: ReactNode;
  editicon?: ReactNode;
  data: DataSearch[];  
  columnNames: string[];
  onClick?: () => void;
};

const Createdrecord = (props: AccountSearch) => {
  return (
    <div className={styles.container} onClick={props.onClick}>
      <div className={styles.bodydiv}>
        <table className={styles.recordTable}>
          <thead>
            <tr className={styles.column}>
              {props.columnNames.map((columnName, index) => (
                <th key={index} className={styles.column}>
                  {columnName}
                </th>
              ))}
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
                <td>
                <div className={styles.icondiv}>
      <a href={`/statement/accountsetup/user-profile/` + item.id}>
          <button className={styles.iconstyle} onClick={props.onClick}>
            {props.hideicon}
          </button>
          </a>
      </div>
      </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  );
};

export default Createdrecord;

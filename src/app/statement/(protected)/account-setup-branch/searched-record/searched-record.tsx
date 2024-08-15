import React, { ReactNode } from "react";
import classNames from "classnames";
import styles from "./searched-record.module.css";

type AccountSearch = {
  icon?: ReactNode;
  data: DataSearch[];
  columns: string[];
  onClick?: (customerId: string) => void;
};

const SearchedRecord = ({ icon, data, columns, onClick }: AccountSearch) => (
  <div className={styles.container}>
    <table>
      <thead>
        <tr className={styles.column}>
          {columns.map((column, index) => (
            <th key={index} className={styles.column}>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className={styles.column}>
            <td>
              <span className={`bodyr`}>{item.customerName}</span>
            </td>
            <td>
              <span className={`bodyr`}>{item.industry}</span>
            </td>
            <td>
              <span className={`bodyr`}>{item.customerType}</span>
            </td>
            <td
              className={classNames(styles.state, {
                [styles.active]: item.customerStatus === "ACTIVE",
                [styles.deactivated]: item.customerStatus === "DEACTIVATED",
              })}
            >
              <span>{item.customerStatus}</span>
            </td>
            <td>
              <div className={styles.iconWrapper}>
                <div className={styles.icon} onClick={() => onClick?.(item.id!)}>
                  {icon}
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SearchedRecord;

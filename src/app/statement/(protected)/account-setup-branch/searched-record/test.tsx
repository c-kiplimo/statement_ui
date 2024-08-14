import React, { ReactNode } from "react";
import styles from "./searched-record.module.css";
import Link from "next/link";
import { Button } from "antd";

export type DataSearch = {
  customerName: string;
  email: string;
  industry: string;
  customerType: string;
  customerStatus: string;
  id?: number;
};

type AccountSearch = {
  icon?: ReactNode;
  data: DataSearch[];
  columns: string[];
  onClick?: () => void;
};

const SearchedRecord = ({ icon, data, columns, onClick }: AccountSearch) => (
  <div className={styles.container} onClick={onClick}>
    <div className={styles.bodydiv}>
      <table className={styles.recordTable}>
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
              <td className={styles.description}>
                <span className={styles.text}>{item.customerName}</span>
              </td>
              <td className={styles.description}>
                <span className={styles.text}>{item.email}</span>
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
                  <Link href={`branch/customer-profile/${item.id}`}>
                    <Button icon={icon} className={styles.icondiv} onClick={onClick} />
                  </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default SearchedRecord;

import React, { useState } from "react";
import styles from "./activity.history.table.module.css";
import Pagination from "@/src/components/atoms/pagination/pagination";
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
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const currentTransactions = props.statementdata.slice(startIndex, endIndex);

  const totalPages = Math.ceil(props.statementdata.length / transactionsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
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
          {currentTransactions.map((data) => (
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
                  <button style={{ width: "auto", height: "auto", cursor: "pointer", background:'rgb(230, 230, 230)',color:'grey', padding:'8px', borderRadius:'4px' }}
                  onClick={() => handleEyeIconClick(data.id)}>
                    View
                  </button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
    </div>
  );
};

export default StatementTable;

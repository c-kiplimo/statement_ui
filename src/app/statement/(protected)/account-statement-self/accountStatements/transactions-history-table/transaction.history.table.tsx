import React, { useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import styles from "./transaction.history.table.module.css";

export interface TransactionHistoryData {
  key: React.Key;
  valuedate: string;
  transferRef: string;
  paymentDetails: string;
  moneyIn: string;
  moneyOut: string;
  balance: string;
}

const columns: ColumnsType<TransactionHistoryData> = [
  {
    title: "Date",
    dataIndex: "valuedate",
  },
  {
    title: "Transfer ref",
    dataIndex: "transferRef",
  },
  {
    title: "Payment details",
    dataIndex: "paymentDetails",
  },
  {
    title: "Money In",
    dataIndex: "moneyIn",
    render: (text) => <span style={{ color: "#17D05B" }}>{text}</span>,
  },
  {
    title: "Money Out",
    dataIndex: "moneyOut",
    render: (text) => {
      if (text && parseFloat(text) !== 0) {
        return <span style={{ color: "#F30039" }}>{`-${text}`}</span>;
      }
      return null;
    },
  },
  {
    title: "Balance",
    dataIndex: "balance",
  },
];

type TableProps = {
  data: TransactionHistoryData[];
};

const BranchTransactionsHistory = ({data}: TableProps) => {
  const [pageSize, setPageSize] = useState<number>(5);

  return (
    <Table
      columns={columns}
      dataSource={data}
      className={styles.redHeaderTable}
      pagination={{
        pageSize: pageSize,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20", "35", "50"],
        onShowSizeChange: (_, size) => setPageSize(size),
      }}
    />
  );
};

export default BranchTransactionsHistory;

import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/lib/table";
import styles from "./transaction.history.table.module.css";

interface DataType {
  key: React.Key;
  valuedate: string;
  transferRef: string;
  paymentDetails: string;
  moneyIn: string;
  moneyOut: string;
  balance: string;
}

const columns: ColumnsType<DataType> = [
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
  data: DataType[];
};

const BranchTransactionsHistory = (props: TableProps) => {
  const { data } = props;

  const pageSize = 10;
  const totalItems = data.length;

  return (
    <Table
      columns={columns}
      dataSource={data}
      className={styles.redHeaderTable}
      pagination={{
        pageSize: pageSize,
        total: totalItems,
        showSizeChanger: true,
      }}
    />
  );
};

export default BranchTransactionsHistory;

import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";

interface DataType {
  key: React.Key;
  date: string;
  transRef: string;
  paymentDetails: string;
  moneyIn: string;
  moneyOut: string;
  balance: string;
}

const TransactionHistory = ({ data }: { data: DataType[] }) => {
  const columns: TableColumnsType<DataType> = [
    {
      title: "Value date",
      dataIndex: "date",
    },
    {
      title: "Transfer ref",
      dataIndex: "transRef",
    },
    {
      title: "Payment details",
      dataIndex: "paymentDetails",
    },
    {
      title: "Money in",
      dataIndex: "moneyIn",
      ellipsis: true,
      render: (text: string) => (
        <span
          style={{
            color:
              parseFloat(text.replace(/,/g, "")) >= 0 ? "green" : "inherit",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Money out",
      dataIndex: "moneyOut",
      ellipsis: true,
      render: (text: string) => (
        <span
          style={{
            color: parseFloat(text.replace(/,/g, "")) < 0 ? "red" : "inherit",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Balance",
      dataIndex: "balance",
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        pagination={{ pageSize: 4 }}
        dataSource={data}
        rowClassName={() => 'white-row'}
      />
    </div>
  );
};

export default TransactionHistory;

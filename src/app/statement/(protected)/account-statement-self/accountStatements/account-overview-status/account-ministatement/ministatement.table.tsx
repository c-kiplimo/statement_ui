import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";

export type MinistatementTableData = {
  key?: React.Key;
  transferDate: string;
  paymentDetails: string;
  valueDate: string;
  moneyOut: string;
  moneyIn: string;
  Balance: number;
};

const columns: TableColumnsType<MinistatementTableData> = [
  {
    title: "Trans Date",
    dataIndex: "transferDate",
  },
  {
    title: "Payment Details",
    dataIndex: "paymentDetails",
  },
  {
    title: "Value Date",
    dataIndex: "valueDate",
  },
  {
    title: "Money Out",
    dataIndex: "moneyOut",
  },
  {
    title: "Money In",
    dataIndex: "moneyIn",
  },
  {
    title: "Balance",
    dataIndex: "balance",
  },
];

type MinistatementableProps = {
  data: MinistatementTableData[];
};

const MinistatementTable = ({ data }: MinistatementableProps) => {
  const rowClassName = (_: any, index: number) => {
    return index % 2 === 0 ? "" : "odd-row";
  };
  return (
    <>
      <style>{`
        .odd-row {
          background-color: #F5F5F5;
        }
      `}</style>
      <Table
        columns={columns}
        dataSource={data}
        size="middle"
        rowClassName={rowClassName}
      />
    </>
  );
};

export default MinistatementTable;

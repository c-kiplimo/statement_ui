import React, { ReactNode } from "react";
import { Table, Pagination } from "antd";
import type { TableColumnsType } from "antd";
import styles from "./table.module.css";

interface DataType {
  key: React.Key;
  accnumber: ReactNode;
  name: string;
  accstatus: ReactNode;
}

const Accountdetails = ({ data }: { data: DataType[] }) => {
  const columns: TableColumnsType<DataType> = [
    {
      title: "Account Number",
      dataIndex: "accnumber",
      key: "accnumber",
    },
    {
      title: "Account Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Account Status",
      dataIndex: "accstatus",
      key: "accstatus",
    },
  ];

  return (
    <div className={`${styles.tableContainer}`}>
      <Table columns={columns} dataSource={data} pagination={false} />
      <div className={`${styles.paginationContainer}`}>
        <Pagination total={data.length} showSizeChanger />
      </div>
    </div>
  );
};

export default Accountdetails;

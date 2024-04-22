import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import styles from "./table.module.css";


interface DataType {
  id: React.Key;
  createdOn?: any;
  userName?:string;
  role?: string;
  status?: string;
  icons?:React.ReactNode;
  settings?:React.ReactNode;
}

interface Datatype {
  title: string;
  dataIndex: string;
  render?: (text: any, record: DataType, index: number) => React.ReactNode;
}

interface CustomTableProps {
  columns: Datatype[];
  data: DataType[];
  pageSize: number;
  total: number;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  pageSize,
  total,
}) => {
  const antdColumns: TableColumnsType<DataType> = columns.map((column) => ({
    title: column.title,
    dataIndex: column.dataIndex,
    render: column.render,
  }));

  return (
    <div className={styles.container}>
      
      <Table
        columns={antdColumns}
        pagination={{
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ["4", "10", "20", "50"],
        }}
        dataSource={data}
      />
    </div>
  );
};

export default CustomTable;

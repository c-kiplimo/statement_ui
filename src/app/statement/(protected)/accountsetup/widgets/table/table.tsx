import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import styles from "./table.module.css";
import { columns } from "@/src/app/statement/(auth)/data";

export interface DataFetcher{
  id: React.Key;
  createdOn?: any;
  userName?: string;
  role?: string;
  status?: string;
  icons?: React.ReactNode;
  settings?: React.ReactNode;
  currency?: string;
}

interface Datatype {
  title: string;
  dataIndex: string;
  render?: (text: any, record: DataFetcher, index: number) => React.ReactNode;
}


interface CustomTableProps {
  columns: Datatype[];
  data: DataFetcher[];
  pageSize?: any;
  total?: any;
  pagination?: boolean;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  pageSize,
  total,
  pagination = true, 
}) => {
  const antdColumns: TableColumnsType<DataFetcher> = columns.map((column) => ({
    title: column.title,
    dataIndex: column.dataIndex,
    render: column.render,
  }));

  return (
    <div className={styles.container}>
      
      <Table
        columns={antdColumns}
        pagination={pagination ? { 
          pageSize: pageSize,
          total: total,
          showSizeChanger: true,
          pageSizeOptions: ["4", "10", "20", "50"],
        } : false}
        dataSource={data}
      />
    </div>
  );
};

export default CustomTable;

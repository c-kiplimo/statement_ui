import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import styles from "./table.module.css";

export interface DataFetcher {
  viewClicked?: any;
  settingsClicked?: any;
  joinedOn?:string;
  id?: React.Key;
  entryId?:number;
  userId?:string;
  restrictionId?:number;
  createdOn?: any;
  userName?: string;
  role?: string;
  status?: string;
  icons?: React.ReactNode;
  settings?: React.ReactNode;
  currency?: string;
  description?:string;
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
        pagination={{ pageSize: 4 }}
        dataSource={data}
        rowKey="id" 
      />
    </div>
  );
};

export default CustomTable;

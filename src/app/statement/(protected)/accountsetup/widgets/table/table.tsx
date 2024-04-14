import React, { ReactNode } from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import styles from "./table.module.css";
import AddItem from "@/src/components/atoms/add-item/add.item";
import Search from "@/src/components/atoms/search/search";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";

interface DataType {
  id: React.Key;
  createdOn: string;
  userName: string;
  role: string;
  status: string;
  icons: ReactNode;
}

interface Datatype {
  title: string;
  dataIndex: string;
  render?: (text: any, record: DataType, index: number) => React.ReactNode;
}

interface CustomTableProps {
  columns: Datatype[];
  data: DataType[];
  titleText: string;
  searchIcon: ReactNode;
  sortIcon: ReactNode;
  filterIcon: ReactNode;
  addIcon: ReactNode;
  pageSize: number;
  total: number;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  titleText,
  searchIcon,
  sortIcon,
  filterIcon,
  addIcon,
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
      <div className={styles.headerdiv}>
        <div className={styles.textdiv}>{titleText}</div>
        <div className={styles.atomsdiv}>
          <Filter title={"Filter"} icon={filterIcon} />
          <Sort title={"Sort"} icon={sortIcon} />
          <AddItem
            title={"Add User"}
            icon={addIcon}
            iconStyle={{ color: "gray" }}
            titleStyle={{ color: "gray" }}
          />
          <Search title={"Search"} icon={searchIcon} />
        </div>
      </div>
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

import SearchBar from "@/src/components/widgets/user-management/shared-features/search-bar/table-search-bar";
import { UserDetails } from "@/src/types/user.type";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";
import styles from "./register.user.branch.module.css";

type RegisterUserProps = {
  columns: ColumnsType<UserDetails>;
  data: UserDetails[];
};

const RegisterBranch = ({ columns, data }: RegisterUserProps) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: data.length,
  });

  const handleTableChange = (pagination: any) => {
    setPagination({
      ...pagination,
      total: data.length,
    });
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: UserDetails[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  return (
    <div className={styles.container}>
      <SearchBar />
      <Table
        style={{width:"100%"}}
        rowSelection={rowSelection}
        pagination={{
          pageSize: 3,
          itemRender: (current, type, originalElement) => {
            if (type === "page") {
              return <span style={{ margin: "0 8px" }}>{current}</span>;
            }
            return originalElement;
          },
          style: {
            display: "flex",
            textAlign: "center",
          },
        }}
        columns={columns}
        dataSource={data}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default RegisterBranch;

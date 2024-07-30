import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React, { useState } from "react";
import styles from "./table-widget.module.css";

type TableProps = {
  columns: ColumnsType<RegisteredUser>;
  data: RegisteredUser[];
};

const TableWidget: React.FC<TableProps> = ({ columns, data }) => {
  const [pageSize, setPageSize] = useState<number>(5);

  return (
    <div className={styles.container}>
      <Table
        className={styles.table}
        style={{ width: "100%" }}
        size="middle"
        pagination={{
          pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "35", "50"],
          onShowSizeChange: (_, size) => setPageSize(size),
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default TableWidget;

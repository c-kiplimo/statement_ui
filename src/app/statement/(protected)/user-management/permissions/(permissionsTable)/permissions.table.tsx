import React, { useState } from "react";
import { Table, Button } from "antd";
import type { TableColumnsType } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import styles from "./permissions.table.module.css";

export interface PermissionTypes {
  key?: React.Key;
  permissionName: string;
  permissionDescription: string;
  createdOn: string;
  tags:string;
}

type PermissionsTableProps = {
  permissions: PermissionTypes[];
};

const PermissionsTable: React.FC<PermissionsTableProps> = ({
  permissions,
}: PermissionsTableProps) => {
  const [pageSize, setPageSize] = useState<number>(5);
  const [selectedKey, setSelectedKey] = useState<React.Key | null>(null);

  const handleEyeClick = (key: React.Key) => {
    setSelectedKey(key);
  };

  const columns: TableColumnsType<PermissionTypes> = [
    {
      title: "Permission",
      dataIndex: "permissionName",
    },
    {
      title: "Description",
      dataIndex: "permissionDescription",
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
    },
    {
      title: "Tags",
      dataIndex: "tags",
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={permissions}
        pagination={{
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "35", "50"],
          onShowSizeChange: (_, size) => setPageSize(size),
        }}
        className={styles.customTable}
      />
    </div>
  );
};

export default PermissionsTable;

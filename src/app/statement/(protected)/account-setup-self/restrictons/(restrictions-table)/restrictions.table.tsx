import React, { useState } from "react";
import { Table, Button } from "antd";
import type { TableColumnsType } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import styles from "./restrictions.table.module.css";

export interface RestrictionTypes {
  key: React.Key;
  date: string;
  restrictionName: string;
  restrictionDescription: string;
  status: string;
}

type RestrictionsTableProps = {
  restrictions: RestrictionTypes[];
};

const RestrictionsTable: React.FC<RestrictionsTableProps> = ({
  restrictions,
}: RestrictionsTableProps) => {
  const [pageSize, setPageSize] = useState<number>(5);
  const [selectedKey, setSelectedKey] = useState<React.Key | null>(null);

  const handleEyeClick = (key: React.Key) => {
    setSelectedKey(key);
  };

  const splitDateTime = (dateTimeString: string) => {
    const dateObj = new Date(dateTimeString);
    // Formating date to YYYY-MM-DD format
    const datePart = dateObj.toLocaleDateString("en-CA");
    // Get hours, minutes and format time to 12-hour with AM/PM
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const timePart = `${formattedHours}:${formattedMinutes} ${amPm}`;
    return { date: datePart, time: timePart };
  };

  const columns: TableColumnsType<RestrictionTypes> = [
    {
      title: "Date",
      dataIndex: "date",
      render: (date: string) => {
        const { date: datePart, time: timePart } = splitDateTime(date);
        return (
          <div className={styles.dateTime}>
            <div className={styles.date}>{datePart}</div>
            <div className={styles.time}>{timePart}</div>
          </div>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "restrictionName",
    },
    {
      title: "Description",
      dataIndex: "restrictionDescription",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <div className={styles.icon}>
          <span
            className={styles.moreicon}
            onClick={() => handleEyeClick(record.key)}
          >
            {<DeleteOutlined style={{ color: "#979992" }} />}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Table
        columns={columns}
        dataSource={restrictions}
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

export default RestrictionsTable;

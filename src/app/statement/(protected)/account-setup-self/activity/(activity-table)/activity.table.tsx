import React, { useState } from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import styles from "./activity.table.module.css";

export interface ActivitiesTypes {
  key: React.Key;
  date: string;
  activityName: string;
  activityDescription: string;
  status: string;
}

type ActivitiesTableProps = {
  restrictions: ActivitiesTypes[];
};

const ActivitiesTable: React.FC<ActivitiesTableProps> = ({
  restrictions,
}: ActivitiesTableProps) => {
  const [pageSize, setPageSize] = useState<number>(5);
  const [selectedKey, setSelectedKey] = useState<React.Key | null>(null);

  const handleEyeClick = (key: React.Key) => {
    setSelectedKey(key);
  };

  const splitDateTime = (dateTimeString: string) => {
    const dateObj = new Date(dateTimeString);
    const datePart = dateObj.toLocaleDateString("en-CA");
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const timePart = `${formattedHours}:${formattedMinutes} ${amPm}`;
    return { date: datePart, time: timePart };
  };

  const columns: TableColumnsType<ActivitiesTypes> = [
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
      dataIndex: "activityName",
    },
    {
      title: "Description",
      dataIndex: "activityDescription",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => {
        const normalizedStatus = status.toLowerCase();
        const dotClass =
          normalizedStatus === "complete"
            ? styles.statusSuccess
            : styles.statusFail;

        return (
          <div>
            <span className={`${styles.statusDot} ${dotClass}`} />
            {status}
          </div>
        );
      },
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

export default ActivitiesTable;

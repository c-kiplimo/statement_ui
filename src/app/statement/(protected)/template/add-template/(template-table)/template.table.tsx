import React, { useState } from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import styles from "./template.table.module.css";

export interface TemplatesTypes {
  key?: React.Key;
  dateCreated: string;
  templateName: string;
  category: string;
  dateModified: string;
}

type TemplatesTableProps = {
  templates: TemplatesTypes[];
};

const TemplatesTable: React.FC<TemplatesTableProps> = ({
  templates,
}: TemplatesTableProps) => {
  const [pageSize, setPageSize] = useState<number>(5);

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

  const columns: TableColumnsType<TemplatesTypes> = [
    {
      title: "Date Created",
      dataIndex: "dateCreated",
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
      title: "Template Name",
      dataIndex: "templateName",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Created On",
      dataIndex: "dateModified",
      render: (date: string) => {
        const { date: datePart, time: timePart } = splitDateTime(date);
        return (
          <div className={styles.dateTime}>
            <div className={styles.date}>{datePart}</div>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <div className={styles.icon}>
          <span className={styles.moreicon}>
            {<MoreOutlined style={{ color: "#979992" }} />}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={templates}
        pagination={{
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "35", "50"],
          onShowSizeChange: (_, size) => setPageSize(size),
        }}
        className={styles.customTable}
      />
    </div>
  );
};

export default TemplatesTable;

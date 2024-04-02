import React, { ReactNode, useState } from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import styles from "./transaction.table.module.css";

interface DataType {
  key: React.Key;
  account: string;
  dateTime: string;
  number: string;
  description: string;
  currency: string;
  status: string;
  icon?: ReactNode;
}
let successIcon=(<svg width="38" height="39" viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="32" height="32" rx="6" fill="#EDF2E1"/>
<rect x="8" y="8" width="16" height="16" rx="6" fill="#EDF2E1"/>
<path d="M23.36 9.44H20V8.16C20 8.072 19.928 8 19.84 8H18.72C18.632 8 18.56 8.072 18.56 8.16V9.44H13.44V8.16C13.44 8.072 13.368 8 13.28 8H12.16C12.072 8 12 8.072 12 8.16V9.44H8.64C8.286 9.44 8 9.726 8 10.08V23.36C8 23.714 8.286 24 8.64 24H23.36C23.714 24 24 23.714 24 23.36V10.08C24 9.726 23.714 9.44 23.36 9.44ZM22.56 22.56H9.44V10.88H12V11.84C12 11.928 12.072 12 12.16 12H13.28C13.368 12 13.44 11.928 13.44 11.84V10.88H18.56V11.84C18.56 11.928 18.632 12 18.72 12H19.84C19.928 12 20 11.928 20 11.84V10.88H22.56V22.56ZM18.55 14.04H17.65C17.59 14.04 17.534 14.074 17.508 14.128L16.04 17.036H15.984L14.516 14.128C14.5027 14.1017 14.4825 14.0795 14.4574 14.064C14.4323 14.0485 14.4035 14.0402 14.374 14.04H13.454C13.428 14.04 13.4 14.046 13.378 14.06C13.3 14.102 13.272 14.2 13.314 14.278L15.1 17.558H14.128C14.04 17.558 13.968 17.63 13.968 17.718V18.144C13.968 18.232 14.04 18.304 14.128 18.304H15.43V18.978H14.128C14.04 18.978 13.968 19.05 13.968 19.138V19.564C13.968 19.652 14.04 19.724 14.128 19.724H15.43V20.8C15.43 20.888 15.502 20.96 15.59 20.96H16.416C16.504 20.96 16.576 20.888 16.576 20.8V19.724H17.884C17.972 19.724 18.044 19.652 18.044 19.564V19.138C18.044 19.05 17.972 18.978 17.884 18.978H16.576V18.304H17.884C17.972 18.304 18.044 18.232 18.044 18.144V17.718C18.044 17.63 17.972 17.558 17.884 17.558H16.902L18.688 14.276C18.7 14.252 18.708 14.226 18.708 14.2C18.71 14.112 18.64 14.04 18.55 14.04Z" fill="#151E00"/>
<rect x="30.0522" y="38.9299" width="12" height="12" rx="6" transform="rotate(-138.968 30.0522 38.9299)" fill="#17D05B"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M27.4953 32.5612C27.3895 32.5757 27.2879 32.5471 27.2129 32.4818C27.1378 32.4166 27.0956 32.3199 27.0953 32.2131L27.0876 28.7945C27.0874 28.6876 27.1292 28.5794 27.2039 28.4936C27.2786 28.4078 27.38 28.3515 27.4858 28.3369L30.8727 27.8726C30.9774 27.8601 31.0772 27.8896 31.1507 27.9549C31.2243 28.0202 31.2656 28.116 31.2658 28.2216C31.2661 28.3273 31.2252 28.4343 31.152 28.5197C31.0788 28.6051 30.9792 28.662 30.8745 28.6782L28.4512 29.0105L31.7287 31.8628C31.8037 31.9281 31.846 32.0248 31.8462 32.1316C31.8464 32.2385 31.8046 32.3467 31.7299 32.4325C31.6553 32.5184 31.5538 32.5747 31.448 32.5892C31.3421 32.6037 31.2405 32.5752 31.1655 32.5099L27.888 29.6576L27.8935 32.1036C27.8937 32.2105 27.8519 32.3187 27.7772 32.4045C27.7025 32.4903 27.6011 32.5466 27.4953 32.5612Z" fill="white"/>
</svg>);

let failIcon = (<svg width="38" height="39" viewBox="0 0 38 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="32" height="32" rx="6" fill="#EDF2E1"/>
<rect x="8" y="8" width="16" height="16" rx="6" fill="#EDF2E1"/>
<path d="M23.36 9.44H20V8.16C20 8.072 19.928 8 19.84 8H18.72C18.632 8 18.56 8.072 18.56 8.16V9.44H13.44V8.16C13.44 8.072 13.368 8 13.28 8H12.16C12.072 8 12 8.072 12 8.16V9.44H8.64C8.286 9.44 8 9.726 8 10.08V23.36C8 23.714 8.286 24 8.64 24H23.36C23.714 24 24 23.714 24 23.36V10.08C24 9.726 23.714 9.44 23.36 9.44ZM22.56 22.56H9.44V10.88H12V11.84C12 11.928 12.072 12 12.16 12H13.28C13.368 12 13.44 11.928 13.44 11.84V10.88H18.56V11.84C18.56 11.928 18.632 12 18.72 12H19.84C19.928 12 20 11.928 20 11.84V10.88H22.56V22.56ZM18.55 14.04H17.65C17.59 14.04 17.534 14.074 17.508 14.128L16.04 17.036H15.984L14.516 14.128C14.5027 14.1017 14.4825 14.0795 14.4574 14.064C14.4323 14.0485 14.4035 14.0402 14.374 14.04H13.454C13.428 14.04 13.4 14.046 13.378 14.06C13.3 14.102 13.272 14.2 13.314 14.278L15.1 17.558H14.128C14.04 17.558 13.968 17.63 13.968 17.718V18.144C13.968 18.232 14.04 18.304 14.128 18.304H15.43V18.978H14.128C14.04 18.978 13.968 19.05 13.968 19.138V19.564C13.968 19.652 14.04 19.724 14.128 19.724H15.43V20.8C15.43 20.888 15.502 20.96 15.59 20.96H16.416C16.504 20.96 16.576 20.888 16.576 20.8V19.724H17.884C17.972 19.724 18.044 19.652 18.044 19.564V19.138C18.044 19.05 17.972 18.978 17.884 18.978H16.576V18.304H17.884C17.972 18.304 18.044 18.232 18.044 18.144V17.718C18.044 17.63 17.972 17.558 17.884 17.558H16.902L18.688 14.276C18.7 14.252 18.708 14.226 18.708 14.2C18.71 14.112 18.64 14.04 18.55 14.04Z" fill="#151E00"/>
<rect x="30.2764" y="22.0186" width="12" height="12" rx="6" transform="rotate(50.4868 30.2764 22.0186)" fill="#4272DD"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M31.7524 28.7208C31.8592 28.7239 31.9547 28.7688 32.018 28.8455C32.0813 28.9222 32.1071 29.0245 32.0898 29.1299L31.5358 32.5033C31.5185 32.6087 31.4595 32.7086 31.3717 32.781C31.284 32.8534 31.1747 32.8923 31.0679 32.8892L27.6507 32.7909C27.5454 32.7861 27.4518 32.7405 27.39 32.664C27.3282 32.5876 27.3032 32.4863 27.3203 32.3821C27.3374 32.2778 27.3953 32.1789 27.4815 32.1067C27.5678 32.0345 27.6754 31.9947 27.7813 31.9959L30.2263 32.0663L27.4618 28.7143C27.3986 28.6376 27.3727 28.5353 27.3901 28.4298C27.4074 28.3244 27.4664 28.2245 27.5542 28.1521C27.6419 28.0797 27.7513 28.0408 27.8581 28.0439C27.9649 28.0469 28.0604 28.0918 28.1237 28.1685L30.8881 31.5204L31.2845 29.1068C31.3018 29.0013 31.3608 28.9015 31.4486 28.8291C31.5363 28.7567 31.6456 28.7178 31.7524 28.7208Z" fill="white"/>
</svg>);


const columns: TableColumnsType<DataType> = [
  {
    title: "Account Type",
    dataIndex: "account",
    ellipsis: true,
    render: (text: string, record: DataType) => (
      <div className={styles.accountStyles}>
        <span>{record.status === "Failed" ? failIcon : successIcon}</span>
        {text}
      </div>
    ),
  },
  {
    title: "Date & Time",
    dataIndex: "dateTime",
    ellipsis: true,
    render: (text: string) => <div className={styles.dateTime}>{text}</div>,
  },
  {
    title: "Number",
    dataIndex: "number",
    ellipsis: true,
  },
  {
    title: "Description",
    dataIndex: "description",
    ellipsis: true,
  },
  {
    title: "Currency",
    dataIndex: "currency",
    ellipsis: true,
  },
  {
    title: "Status",
    dataIndex: "status",
    ellipsis: true,
    render: (status: string) => {
      let dotColor = "";
      let borderStyle = "1px solid #E6E6E6";
      switch (status) {
        case "Failed":
          dotColor = "red";
          borderStyle;
          break;
        case "Pending":
          dotColor = "blue";
          borderStyle;
          break;
        case "Completed":
          dotColor = "green";
          borderStyle;
          break;
        default:
          break;
      }
      return (
        <div className={styles.statusStyles} style={{ border: borderStyle }}>
          <div
            className={styles.dotAcctStyles}
            style={{ backgroundColor: dotColor }}
          />
          {status}
        </div>
      );
    },
  },
];

const TransactionTable = ({ data }: { data: DataType[] }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        pagination={{ pageSize: 4 }}
        dataSource={data}
        style={{
          borderCollapse: "collapse",
          borderRadius: "16px",
          border: "1px solid #E6E6E6",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default TransactionTable;

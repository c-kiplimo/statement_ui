import React from "react";
import UserAcctStatus from "../../widgets/users-view-widget/user.groups";
import styles from "./contacts.module.css";
import Link from "next/link";
import { CloseOutlined } from "@ant-design/icons";
import CustomTable from "../../widgets/table/table";

const columns = [
  {
    title: "User Name",
    dataIndex: "createdOn",
    render: (text: string) => <span className={styles.rowsdiv}>{text}</span>,
  },
  {
    title: "National Id",
    dataIndex: "userName",
    render: (text: string) => <span className={styles.rowsdiv}>{text}</span>,
  },
  {
    title: "Nationality",
    dataIndex: "currency",
    render: (text: string) => <span className={styles.rowsdiv}>{text}</span>,
  },
  {
    title: "Segment",
    dataIndex: "settings",
    render: (text: string) => <span className={styles.rowsdiv}>{text}</span>,
  },
  {
    title: "User Type",
    dataIndex: "icons",
    render: (text: string) => <span className={styles.rowsdiv}>{text}</span>,
  },

  {
    title: "Status",
    dataIndex: "role",
    render: (text: string) => <span className={styles.status}>{text}</span>,
  },
];

const data = [
  {
    id: 1,
    createdOn: "Meraki Systems Tech",
    currency: "Rwandan",
    userName: " 11220207866",
    settings: "Government",
    role: "Active",
    icons: "Individual",
  },
];

const ContactDetails = () => {
  return (
    <div className={styles.container}>
      <CustomTable columns={columns} data={data} pagination={false} />
    </div>
  );
};

export default ContactDetails;

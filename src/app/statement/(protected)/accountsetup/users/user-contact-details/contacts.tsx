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
      <div className={styles.cancel}>
        <CloseOutlined />
      </div>
      <UserAcctStatus
        userIcon={<img src="/userIcon.svg" alt="userIcon" />}
        title={"Abia Mbabazi"}
        titleDescript={"Viewer"}
        lastseen={"Last login on 45 minutes ago"}
        button1={"Groups"}
        button2={"Accounts"}
        button3={"Activity"}
        button4={"Contact Details"}
        button5={"Two-factor Authentication"}
        mail={"abbymbabazi@gmail.com"}
        location={"Kigali-Rwanda"}
        timezone={"( GMT -11:46) Greenwich mean Time zone"}
        updatebttn={"Update User"}
      />

      <CustomTable columns={columns} data={data} pagination={false} />
    </div>
  );
};

export default ContactDetails;

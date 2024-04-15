import React from "react";
import CustomTable from "../widgets/table/table";
import { Select } from "antd";
import {
  EditOutlined,
  EyeOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import styles from "./restrictions.overview.module.css";
import LastLogin from "@/src/components/widgets/userStatus/user.login.status";

interface DataType {
  id: React.Key;
  createdOn: string;
  userName: string;
  role: string;
  status: string;
  icons: React.ReactNode;
}

interface Datatype {
  title: string;
  dataIndex: keyof DataType;
  render?: (text: any, record: DataType) => React.ReactNode;
}

const columns: Datatype[] = [
  {
    title: "Date",
    dataIndex: "createdOn",
    render: (text) => <span className={styles.createdOn}>{text}</span>,
  },

  {
    title: "Name",
    dataIndex: "userName",
    render: (text) => <span className={styles.columnstyles}>{text}</span>,
  },
  {
    title: "Description",
    dataIndex: "role",
    render: (text) => <span className={styles.columnstyles}>{text}</span>,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text, record) => <span className={styles.activediv}>{text}</span>,
  },
  {
    title: "Icons",
    dataIndex: "icons",
  },
];

const data: DataType[] = [
  {
    id: 1,
    createdOn: "23-05-2023 10:45 a.m",
    userName: "Staff expenses",
    role: "Staff exp",
    status: "Active",
    icons: (
      <div className={styles.icons}>
        <EyeOutlined /> <MinusOutlined /> <EditOutlined />
      </div>
    ),
  },
  {
    id: 2,
    createdOn: "2024-04-10",
    userName: "Send money",
    role: "1,000,000 per day",
    status: "Active",
    icons: (
      <div className={styles.icons}>
        <EyeOutlined /> <MinusOutlined /> <EditOutlined />
      </div>
    ),
  },
  {
    id: 3,
    createdOn: "2024-04-10",
    userName: "Withdraw money",
    role: "Staff exp",
    status: "Active",
    icons: (
      <div className={styles.icons}>
        <EyeOutlined /> <MinusOutlined /> <EditOutlined />
      </div>
    ),
  },
];

const RestrictionsOverview = () => {
  return (
    <div className={styles.container}>
      <LastLogin
        userName={"Meraki System Tech"}
        mail={"Banking Industry"}
        town={"Kampala Uganda"}
        timezone={"( GMT -11:46) Greenwich mean Time zone"}
        icon={<img src="/teamusericon.png" alt="teamusericon" />}
        lastSeenTime={"Last login on 45 minutes ago"}
        button1={"Accounts"}
        button2={"Users"}
        button3={"Activity"}
        button4={"Restrictions"}
      />
      <CustomTable
        data={data}
        titleText={"Restrictions"}
        searchIcon={<img src="/searchicon.svg" alt="searchicon" />}
        sortIcon={<img src="/sort.svg" alt="sort" />}
        filterIcon={<img src="/funnel.svg" alt="funnel" />}
        addIcon={<PlusOutlined />}
        pageSize={1}
        total={10}
        columns={columns}
      />
    </div>
  );
};

export default RestrictionsOverview;

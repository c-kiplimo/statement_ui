import React from "react";
import CustomTable from "../widgets/table/table";
import { Select } from "antd";
import {
  EditOutlined,
  EyeOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import styles from "./users.status.module.css";
import LastLogin from "@/src/components/widgets/userStatus/user.login.status";
import Search from "@/src/components/atoms/search/search";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import Link from "next/link";

const { Option } = Select;

interface DataType {
  id: React.Key;
  createdOn?: string;
  userName?: string;
  role?: string;
  status?: string;
  icons?: React.ReactNode;
}

interface Datatype {
  title: string;
  dataIndex: keyof DataType;
  render?: (text: any, record: DataType) => React.ReactNode;
}

const columns: Datatype[] = [
  {
    title: "Created On",
    dataIndex: "createdOn",
    render: (text) => <span className={styles.createdOn}>{text}</span>,
  },

  {
    title: "User Name",
    dataIndex: "userName",
  },
  {
    title: "Role",
    dataIndex: "role",
    render: (text, record) => (
      <Select
        className={styles.selectdiv}
        defaultValue={text}
        onChange={(value) => handleRoleChange(value, record.id)}
      >
        <Option value="Admin">Admin</Option>
        <Option value="Viewer">Viewer</Option>
      </Select>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text, record) => (
      <span
        className={styles.activediv}
        style={{
          color: record.status === "Disabled" ? "red" : "",
          background: record.status === "Disabled" ? "#FEDEE5" : "",
        }}
      >
        {text}
      </span>
    ),
  },
  {
    title: "",
    dataIndex: "icons",
  },
];

const data: DataType[] = [
  {
    id: 1,
    createdOn: "23-05-2023 10:45 a.m",
    userName: "Abia Mbabazi",
    role: "Admin",
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
    userName: "Luqman Doe",
    role: "Admin",
    status: "Disabled",
    icons: (
      <div className={styles.icons}>
        <EyeOutlined /> <MinusOutlined /> <EditOutlined />
      </div>
    ),
  },
  {
    id: 3,
    createdOn: "2024-04-10",
    userName: "Delle Rasaq",
    role: "Admin",
    status: "Disabled",
    icons: (
      <div className={styles.icons}>
        <EyeOutlined /> <MinusOutlined /> <EditOutlined />
      </div>
    ),
  },
];

const handleRoleChange = (value: string, id: React.Key) => {};

const Accountsstatus = () => {
  return (
    <div className={styles.container}>
      <LastLogin
        userName={"Meraki System Tech"}
        mail={"Banking Industry"}
        town={"Kampala Uganda"}
        timezone={"( GMT -11:46) Greenwich mean Time zone"}
        icon={<img src="/teamusericon.png" alt="teamusericon" />}
        lastSeenTime={"Last login on 45 minutes ago"}
        button1={
          <Link href="/statement/accountsetup/accounts">
            Accounts
          </Link>
        }
        button3={
          <Link href="/statement/accountsetup/users">
            Users
          </Link>
        }
        button2={
          <Link href="/statement/accountsetup/activities">
            Activity
          </Link>
        }
        button4={
          <Link href="/statement/accountsetup/restrictions/restrictions-overview">
            Restrictions
          </Link>
        }
        titleDescription={"Corporate customer"}
      />   






<div className={styles.headerdiv}>
        <div className={styles.textdiv}>Users Overview</div>
        <div className={styles.atomsdiv}>
          <Search title={"Search"} icon={<img src="/searchicon.svg" alt="searchicon" />} />
          <Filter title={"Filter"} icon={<img src="/funnel.svg" alt="funnel" />} />
          <Sort title={"Sort"} icon={<img src="/sort.svg" alt="sort" />} />
        </div>
      </div>
      <CustomTable
        data={data}
        pageSize={3}
        total={10}
        columns={columns}/>
    </div>
  );
};

export default Accountsstatus;

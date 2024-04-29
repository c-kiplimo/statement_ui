import React, { useState } from "react";
import { Select } from "antd";
import styles from "./account.status.module.css"
import LastLogin from "@/src/components/widgets/userStatus/user.login.status";
import Search from "@/src/components/atoms/search/search";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import CustomTable from "../../widgets/table/table";
import Link from "next/link";
import RemoveUserModal from "../../page-manupilation/remove-from-page/user/remove.user";
import AddItem from "@/src/components/atoms/add-item/add.item";
import { PlusOutlined } from "@ant-design/icons";

let removeUserClick: React.MouseEventHandler<HTMLSpanElement> | undefined;

const { Option } = Select;

interface DataType {
  id: React.Key;
  createdOn?: string;
  userName?: string;
  role?: string;
  status?: string;
  icons?: React.ReactNode;
  currency?: string;
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
    render: (text: any, record: any) => (
      <span className={`${styles.date} bodyr`}>
        <span className={styles.account}>{text}</span>
        <span className={styles.currency}>{record.currency}</span>
      </span>
    ),
  },

  {
    title: "User Name",
    dataIndex: "userName",
    render: (text: any, record: any) => (
      <span className={`${styles.userName} bodyr`}>{text}</span>
    ),
  },
  {
    title: "Role",
    dataIndex: "role",
    render: (text, record) => (
      <Select
        className={`${styles.selectdiv} bodyr`}
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
        className={`${styles.activediv} bodyr`}
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
    render: () => (
      <button className={styles.iconsdiv}>
        <img src="/delete.svg" alt="delete" onClick={removeUserClick} />
      </button>
    ),
  },
];

const data: DataType[] = [
  {
    id: 1,
    createdOn: "23-05-2023",
    currency: "10:45 a.m",
    userName: "Abia Mbabazi",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    createdOn: "2024-04-10",
    currency: "10:45 a.m",
    userName: "Luqman Doe",
    role: "Admin",
    status: "Disabled",
  },
  {
    id: 3,
    createdOn: "2024-04-10",
    currency: "10:45 a.m",
    userName: "Delle Rasaq",
    role: "Admin",
    status: "Disabled",
  },
];

const handleRoleChange = (value: string, id: React.Key) => {};

const AccountsDelete = () => {
  const [modalVisible1, setModalVisible1] = useState(false);

  const handleModalCancel1 = () => {
    setModalVisible1(false);
  };

  removeUserClick = function click() {
    setModalVisible1(true);
  };

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
        titleDescription={"(12 Users)"}
      />

      <div className={styles.headerdiv}>
        <div className={`${styles.textdiv} h6b`}>Account Users</div>
        <div className={styles.atomsdiv}>
          <Search
            title={"Search"}
            icon={<img src="/searchicon.svg" alt="searchicon" />}
          />
          <Filter
            title={"Filter"}
            icon={<img src="/funnel.svg" alt="funnel" />}
          />
          <Sort title={"Sort"} icon={<img src="/sort.svg" alt="sort" />} />
          <AddItem
            title={"Add User"}
            icon={<PlusOutlined />}
            iconStyle={{ color: "#6F7269" }}
            titleStyle={{ color: "#6F7269" }}
          />
        </div>
      </div>
      <CustomTable data={data} pageSize={3} total={10} columns={columns} />

      <RemoveUserModal visible={modalVisible1} onCancel={handleModalCancel1} />
    </div>
  );
};

export default AccountsDelete;

import React, { useEffect, useState } from "react";
import { Select } from "antd";
import styles from "./account.deletion.module.css";
import Search from "@/src/components/atoms/search/search";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import AddItem from "@/src/components/atoms/add-item/add.item";
import { PlusOutlined } from "@ant-design/icons";
import AccountProfilePage from "@/src/components/widgets/userStatus/account.profile/account.profile";

import { UsersAction } from "@/src/lib/actions/account.users.action";
import CustomTable, { DataFetcher } from "../widgets/table/table";
import RemoveUserModal from "../page-manupilation/remove-from-page/user/remove.user";


type userid = {
  userId?: number;
};

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

sessionStorage.getItem("accountNo")

const columns: Datatype[] = [

  {
    title: "Created On",
    dataIndex: "createdOn",
    render: (text: string) => {
      const dateTime = new Date(text);
      const date = dateTime.toLocaleDateString();
      const time = dateTime.toLocaleTimeString();

      return (
        <div className={styles.createdOn}>
          <div className={`${styles.date} bodyr`}>{date}</div>
          <div>{time}</div>
        </div>
      );
    },
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
    render: (_text, record) => (
      <button className={styles.iconsdiv}>
        <img src="/delete.svg" alt="delete" onClick={removeUserClick} />
        
      </button>
    ),
  },
];

const handleRoleChange = (value: string, id: React.Key) => {};

const AccountsDelete = (props: userid) => {
  const [modalVisible1, setModalVisible1] = useState(false);
  const [incomingData, setIncomingData] = useState<DataFetcher[]>([]);

  const handleModalCancel1 = () => {
    setModalVisible1(false);
  };

  removeUserClick = function click() {
    setModalVisible1(true);
  };

  sessionStorage.setItem("accountNo", "123300014567")
  const AccID =sessionStorage.getItem("accountNo")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await UsersAction(1026272611);
        setIncomingData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  

  return (
    <div className={styles.container}>

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
      <CustomTable
        data={incomingData}
        pageSize={3}
        total={10}
        columns={columns}
      />

      <RemoveUserModal visible={modalVisible1} onCancel={handleModalCancel1} accountId={0} />
    </div>
  );
};

export default AccountsDelete;

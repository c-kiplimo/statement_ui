"use client"
import React, { ReactNode, useEffect, useState } from "react";

import { Select } from "antd";
import {
  EditOutlined,
  EyeOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import styles from "./users.status.module.css";
import Search from "@/src/components/atoms/search/search";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import { UsersAction } from "@/src/lib/actions/account.users.action";
import CustomTable, { DataFetcher } from "../../widgets/table/table";

type userid={
  userId?:number
}

const { Option } = Select;

interface DataType {
  id?: React.Key;
  createdOn?: string;
  userName?: string;
  role?: string;
  status?: string;
  icon?:ReactNode;
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
        onChange={(value) => handleRoleChange(value, record.id!)}
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
    dataIndex: "icon",
    render: () => (
      <div className={styles.icons}>
        <EyeOutlined /> <MinusOutlined /> <EditOutlined />
      </div>
    ),
  },
];



const data: DataType[] = [
  {
    id: 1,
    createdOn: "23-05-2023 10:45 a.m",
    userName: "Abia Mbabazi",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    createdOn: "2024-04-10",
    userName: "Luqman Doe",
    role: "Admin",
    status: "Disabled",
  },
  {
    id: 3,
    createdOn: "2024-04-10",
    userName: "Delle Rasaq",
    role: "Admin",
    status: "Disabled",
  },
];

const handleRoleChange = (value: string, id: React.Key) => {};

const Accountsstatus =  (props:userid) => {

  
  const [incomingData, setIncomingData] = useState<DataFetcher[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await UsersAction(props.userId!);
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
        <div className={styles.textdiv}>Users Overview</div>
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
        </div>
      </div>
      <CustomTable
        data={incomingData}
        pageSize={3}
        total={10}
        columns={columns}
      />
    </div>
  );
};

export default Accountsstatus;

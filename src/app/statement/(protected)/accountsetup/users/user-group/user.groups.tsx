import React from "react";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import styles from "./user.groups.module.css";
import Search from "@/src/components/atoms/search/search";
import Link from "next/link";
import {PlusOutlined } from "@ant-design/icons";
import AddItem from "@/src/components/atoms/add-item/add.item";
import CustomTable from "../../widgets/table/table";

const columns = [
  {
    title: "Groups",
    dataIndex: "createdOn",
    render: (text: string) => (
      <span className={`${styles.groupStyles} bodyr`}>{text}</span>
    ),
  },
  {
    title: "Description",
    dataIndex: "userName",
    render: (text: string) => (
      <span className={`${styles.groupStyles} bodyr`}>{text}</span>
    ),
  },
  {
    title: "Date Created",
    dataIndex: "currency",
    render: (text: string) => (
      <span className={`${styles.groupStyles} bodyr`}>{text}</span>
    ),
  },
  {
    title: "Joined On",
    dataIndex: "settings",
    render: (text: string) => ( 
      <span className={`${styles.groupStyles} bodyr`}>{text}</span>
    ),
  },
  {
    title: "",
    dataIndex: "icons",
    render: () => (
      <Link href="/statement/accountsetup/users">
        <button className={styles.icon}>
          <img src="/delete.svg" alt="delete" />
        </button>
      </Link>
    ),
  },
];

const data = [
  {
    id: 1,
    createdOn: "Developers",
    currency: "08-03-2021",
    userName: "Description",
    settings: "10-03-2022",
  },

  {
    id: 2,
    createdOn: "Developers",
    currency: "08-03-2021",
    userName: "Description",
    settings: "10-03-2022",
  },

  {
    id: 3,
    createdOn: "Developers",
    currency: "08-03-2021",
    userName: "Description",
    settings: "10-03-2022",
  },

  {
    id: 4,
    createdOn: "Developers",
    currency: "08-03-2021",
    userName: "Description",
    settings: "10-03-2022",
  },

  {
    id: 5,
    createdOn: "Developers",
    currency: "08-03-2021",
    userName: "Description",
    settings: "10-03-2022",
  },
];

const UserGroups = () => {
  return (
    <div className={styles.container}>
      <div className={styles.lowerDiv}>
        <div className={styles.tableHeader}>
          <div className={styles.headerdiv}>
            <div className= {`${styles.textdiv} h6b`}>Groups</div>
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
                title={"Add user"}
                icon={<PlusOutlined />}
                iconStyle={{ color: "gray" }}
                titleStyle={{ color: "gray" }}
              />
            </div>
          </div>
        </div>
      </div>
      <CustomTable data={data}columns={columns} pagination={false}/>
    </div>
  );
};

export default UserGroups;

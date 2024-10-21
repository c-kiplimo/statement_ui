import React, { useState } from "react";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import styles from "./user.groups.page.module.css";
import Search from "@/src/components/atoms/search/search";
import { EyeOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import AddItem from "@/src/components/atoms/add-item/add.item";

const columns = [
  {
    title: "Groups",
    dataIndex: "userName",
    render: (text: string) => (
      <span className={`${styles.groupStyles} bodyr`}>{text}</span>
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
    render: (text: string) => (
      <span className={`${styles.groupStyles} bodyr`}>{text}</span>
    ),
  },
  {
    title: "Date",
    dataIndex: "createdOn",
    render: (text: string) => {
      const dateTime = new Date(text);
      const date = dateTime.toLocaleDateString();
      const time = dateTime.toLocaleTimeString();
      return (
        <div className={styles.date}>
          <div className={styles.dateStyles}>{date}</div>
          <div className={styles.timestyle}>{time}</div>
        </div>
      );
    },
  },
  {
    title: "Joined On",
    dataIndex: "joinedOn",
    render: (text: string) => {
      const dateTime = new Date(text);
      const date = dateTime.toLocaleDateString();
      const time = dateTime.toLocaleTimeString();
      return (
        <div className={styles.date}>
          <div className={styles.dateStyles}>{date}</div>
          <div className={styles.timestyle}>{time}</div>
        </div>
      );
    },
  },
  {
    title: "",
    dataIndex: "icon",
    render: () => (
      <div className={styles.icon}>
        <EyeOutlined />
        <MinusOutlined />
      </div>
      
    ),
  },
];

const dummyData = [
  {
    key: "1",
    userName: "Group A",
    description: "Description for Group A",
    createdOn: "2022-01-01T10:00:00Z",
    joinedOn: "2022-01-02T11:00:00Z",
  },
  {
    key: "2",
    userName: "Group B",
    description: "Description for Group B",
    createdOn: "2022-02-01T10:00:00Z",
    joinedOn: "2022-02-02T11:00:00Z",
  },
  {
    key: "3",
    userName: "Group C",
    description: "Description for Group C",
    createdOn: "2022-03-01T10:00:00Z",
    joinedOn: "2022-03-02T11:00:00Z",
  },
];

type IdProps = {
  userId: string;
};

const UserGroupsHomePage = ({ userId }: IdProps) => {
  const [data, setData] = useState(dummyData);

  const handleAddItem = () => {
    const newItem = {
      key: (data.length + 1).toString(),
      userName: `Group ${String.fromCharCode(65 + data.length)}`,
      description: `Description for Group ${String.fromCharCode(65 + data.length)}`,
      createdOn: "2022-04-01T10:00:00Z",
      joinedOn: "2022-04-02T11:00:00Z",
    };
    setData([...data, newItem]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.lowerDiv}>
        <div className={styles.tableHeader}>
          <div className={styles.headerdiv}>
            <div className={`${styles.textdiv} h6b`}>Groups</div>
            <div className={styles.atomsdiv}>
              <Search
                title="Search"
                icon={<img src="/searchicon.svg" alt="search icon" />}
              />
              <Filter
                title="Filter"
                icon={<img src="/funnel.svg" alt="funnel icon" />}
              />
              <Sort title="Sort" icon={<img src="/sort.svg" alt="sort icon" />} />
              <AddItem
                title="Add user"
                icon={<PlusOutlined />}
                onClick={handleAddItem}
                iconStyle={{ color: "gray" }}
                titleStyle={{ color: "gray" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGroupsHomePage;

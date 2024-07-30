import React, { useState } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
import styles from "./add-user-group.module.css";
import Image from "next/image";
import moment from "moment";
import { UserGroupData } from "../user-groups/user-groups";
import Texter from "@/src/components/atoms/text/texter";
import SearchBar from "@/src/components/widgets/search-bar/search-bar";

type AddUserProps = {
    onCancel: () => void;
    handleOk: (e: any) => void;
};

const AddUserToGroup = ({onCancel,handleOk}:AddUserProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    console.log("Search term:", term);
  };

  const handleButtonClick = () => {
    console.log("Button clicked with search term:", searchTerm);
  };

  const filteredData: UserGroupData[] = [
    {
      key: "1",
      groupName: "Customer Service",
      description: "Supports clients",
      createdOn: "2024-07-30T10:00:00Z",
    },
    {
      key: "2",
      groupName: "HR Team",
      description: "Handles employee matters",
      createdOn: "2024-07-30T10:00:00Z",
    },
    {
      key: "3",
      groupName: "Management",
      description: "Senior executives",
      createdOn: "2024-07-30T10:00:00Z",
    },
  ];

  const handleDelete = (key: string) => {
    console.log("Delete user with key:", key);
  };

  const columns: ColumnsType<UserGroupData> = [
    {
      title: "Group Name",
      dataIndex: "groupName",
      render: (text: string) => (
        <span className={`${styles.groupStyles} bodyr`}>{text}</span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text: string) => (
        <div className={`${styles.selectdiv} bodyr`}>{text}</div>
      ),
    },
    {
      title: "Date Created",
      dataIndex: "createdOn",
      render: (createdOn: string) => {
        const date = moment(createdOn).format("DD-MM-YYYY");
        return (
          <div className={styles.date}>
            <div className={`${styles.dateStyles} bodyr`}>{date}</div>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <button
          className={styles.deleteBtn}
          aria-label="Delete user"
          onClick={() => handleDelete(record.key)}
        >
          <Image src="/bin.svg" alt="Delete button" width={16} height={16} />
        </button>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Texter
          text="Platform Group Management"
          className={`${styles.title} h4b`}
        />
        <Texter
          text="Are you sure you want to assign user to a group. Please review the details before proceeding."
          className={`${styles.description} h5r`}
        />
      </div>
      <div className={styles.input}>
        <Texter
          text="Search by group name"
          className={`${styles.inputTitle} bodyr`}
        />
        <SearchBar>
          <SearchBar.Input
            value={searchTerm}
            onSearch={handleSearch}
            placeholder="Enter group name"
          />
          <SearchBar.Button onClick={handleButtonClick} text="Add group">
            <PlusOutlined />
          </SearchBar.Button>
        </SearchBar>
      </div>
      <div className={styles.table}>
        <Table
          className={styles.antdtable}
          columns={columns}
          dataSource={filteredData}
          size="middle"
          pagination={false}
        />
        <div className={styles.buttons}>
        <button className={`${styles.canceButton} bodym`} onClick={onCancel}>Cancel</button>
        <button className={`${styles.addButton} bodyr`} onClick={handleOk}>Add Group</button>
      </div>
      </div>
      
    </div>
  );
};

export default AddUserToGroup;

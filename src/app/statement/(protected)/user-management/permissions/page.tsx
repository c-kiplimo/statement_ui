"use client";
import React from "react";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import styles from "./permissions.module.css";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import {
  DownloadOutlined,
  FilterOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import PermissionsTable from "./(permissionsTable)/permissions.table";

const data = [
  {
    key: "1",
    permissionName: "CREATE:ACCOUNT",
    permissionDescription: "Allows creation of an account",
    createdOn: "10-03-2022",
  },
  {
    key: "2",
    permissionName: "READ:ACCOUNT",
    permissionDescription: "Allows View of Account",
    createdOn: "10-03-2022",
  },
  {
    key: "3",
    permissionName: "UPDATE:ACCOUNT",
    permissionDescription: "Allows Update of Account",
    createdOn: "10-03-2022",
  },
  {
    key: "4",
    permissionName: "UPDATE:ACCOUNT",
    permissionDescription: "Allows Update of Account",
    createdOn: "10-03-2022",
  },
  {
    key: "5",
    permissionName: "UPDATE:ACCOUNT",
    permissionDescription: "Allows Update of Account",
    createdOn: "10-03-2022",
  },
  {
    key: "6",
    permissionName: "UPDATE:ACCOUNT",
    permissionDescription: "Allows Update of Account",
    createdOn: "10-03-2022",
  },
  {
    key: "7",
    permissionName: "UPDATE:ACCOUNT",
    permissionDescription: "Allows Update of Account",
    createdOn: "10-03-2022",
  },
  {
    key: "8",
    permissionName: "UPDATE:ACCOUNT",
    permissionDescription: "Allows Update of Account",
    createdOn: "10-03-2022",
  },
  {
    key: "9",
    permissionName: "UPDATE:ACCOUNT",
    permissionDescription: "Allows Update of Account",
    createdOn: "10-03-2022",
  },
  {
    key: "10",
    permissionName: "UPDATE:ACCOUNT",
    permissionDescription: "Allows Update of Account",
    createdOn: "10-03-2022",
  },
  {
    key: "11",
    permissionName: "UPDATE:ACCOUNT",
    permissionDescription: "Allows Update of Account",
    createdOn: "10-03-2022",
  },
  {
    key: "12",
    permissionName: "UPDATE:ACCOUNT",
    permissionDescription: "Allows Update of Account",
    createdOn: "10-03-2022",
  },
  {
    key: "13",
    permissionName: "UPDATE:ACCOUNT",
    permissionDescription: "Allows Update of Account",
    createdOn: "10-03-2022",
  },
  {
    key: "14",
    permissionName: "UPDATE:ACCOUNT",
    permissionDescription: "Allows Update of Account",
    createdOn: "10-03-2022",
  },
  {
    key: "15",
    permissionName: "UPDATE:ACCOUNT",
    permissionDescription: "Allows Update of Account",
    createdOn: "10-03-2022",
  },
  {
    key: "16",
    permissionName: "UPDATE:ACCOUNT",
    permissionDescription: "Allows Update of Account",
    createdOn: "10-03-2022",
  },
  {
    key: "17",
    permissionName: "UPDATE:ACCOUNT",
    permissionDescription: "Allows Update of Account",
    createdOn: "10-03-2022",
  },
];
const PermissionPage = () => {
  const handleClick = () => {};
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <VerticalInfoDescription
            title={"Permissions"}
            titleStyle={{ fontWeight: "700", fontSize: "20px" }}
          />
        </div>
        <div className={styles.iconset}>
          <FilterButton onClick={handleClick} />
        </div>
      </div>
      <PermissionsTable permissions={data} />
    </div>
  );
};

export default PermissionPage;

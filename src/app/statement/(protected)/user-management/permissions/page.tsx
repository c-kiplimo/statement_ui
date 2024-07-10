"use client";
import React, { useEffect, useState } from "react";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import styles from "./permissions.module.css";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import {
  CloudDownloadOutlined,
  DownloadOutlined,
  FilterOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import PermissionsTable from "./(permissionsTable)/permissions.table";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import DownloadWidget from "@/src/components/widgets/download-widget/download";
import AddItems from "@/src/components/widgets/add-item-widget/add.item";
import PermissionButton from "@/src/components/widgets/permission-button/permission.button";

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
  }
];

const PermissionPage = () => {
  const [searchValue, setSearchValue] =useState('')
  const [permissions, setPermissions] = useState(data);

  const handleClick = () => {};

  const handleSearchChange = (value:string) => {
    setSearchValue(value);
    const filtered = data.filter(item =>
      item.permissionName.toLowerCase().includes(value.toLowerCase()) || 
      item.permissionDescription.toLowerCase().includes(value.toLowerCase())
    );
    setPermissions(filtered);
  };

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
          <SearchButton>
            <SearchButton.Icon>
              <SearchOutlined size={16} />
            </SearchButton.Icon>
            <SearchButton.Input text="Search" onSearch={handleSearchChange} />
          </SearchButton>
          <FilterButton onClick={handleClick} />
          <DownloadWidget>
            <DownloadWidget.Icon>
              <CloudDownloadOutlined />
            </DownloadWidget.Icon>
            <DownloadWidget.text text="Download" />
          </DownloadWidget>
          <PermissionButton onClick={handleClick} buttonStyles={{background:'#003A49', color:'#FFFFFF'}}/>
        </div>
      </div>
      <PermissionsTable permissions={permissions} />
    </div>
  );
};

export default PermissionPage;

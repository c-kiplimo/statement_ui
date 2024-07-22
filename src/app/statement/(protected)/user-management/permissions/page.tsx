"use client";
import React, { useEffect, useState } from "react";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import styles from "./permissions.module.css";
import { CloudDownloadOutlined, SearchOutlined } from "@ant-design/icons";
import PermissionsTable, { PermissionTypes } from "./(permissionsTable)/permissions.table";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import DownloadWidget from "@/src/components/widgets/download-widget/download";
import { fetchUserPermissions } from "@/src/lib/actions/permissions.action";
import useProfileCreated from "@/src/hooks/useProfileCreated";
import { Spin } from "antd";
import TagsButton from "@/src/components/widgets/tags-buttton/tags.button";

const PermissionPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [permissionData, setPermissionData] = useState<PermissionTypes[]>([]);
  const [permissions, setPermissions] = useState<PermissionTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const profile = useProfileCreated();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = profile?.userId;
        if (userId) {
          const fetchedPermissions = await fetchUserPermissions();
          setPermissionData(fetchedPermissions);
          setPermissions(fetchedPermissions);
        } else {
          console.error("User ID is not available");
        }
      } catch (error) {
        console.error("Error fetching permissions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (profile) {
      fetchData();
    }
  }, [profile]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    const filtered = permissionData.filter(item =>
      item.permissionName.toLowerCase().includes(value.toLowerCase()) || 
      item.permissionDescription.toLowerCase().includes(value.toLowerCase())
    );
    setPermissions(filtered);
  };
  
  const handleClick = () => {
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <VerticalInfoDescription
            title="Permissions"
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
          <TagsButton onClick={handleClick}/>
          <DownloadWidget>
            <DownloadWidget.Icon>
              <CloudDownloadOutlined />
            </DownloadWidget.Icon>
            <DownloadWidget.text text="Download" />
          </DownloadWidget>
        </div>
      </div>
      <PermissionsTable permissions={permissions} />
    </div>
  );
};

export default PermissionPage;

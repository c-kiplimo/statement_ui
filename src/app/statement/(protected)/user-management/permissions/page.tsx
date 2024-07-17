"use client";
import React, { useEffect, useState } from "react";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import styles from "./permissions.module.css";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import { CloudDownloadOutlined, SearchOutlined } from "@ant-design/icons";
import PermissionsTable, { PermissionTypes } from "./(permissionsTable)/permissions.table";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import DownloadWidget from "@/src/components/widgets/download-widget/download";
import PermissionButton from "@/src/components/widgets/permission-button/permission.button";
import { fetchUserPermissions } from "@/src/lib/actions/permissions.action";
import useProfileCreated from "@/src/hooks/useProfileCreated";
import { Spin } from "antd";
import { useRouter } from "next/navigation";

const PermissionPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [permissionData, setPermissionData] = useState<PermissionTypes[]>([]);
  const [permissions, setPermissions] = useState<PermissionTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const profile = useProfileCreated();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = profile?.userId;
        if (userId) {
          const fetchedPermissions = await fetchUserPermissions(userId);
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
    router.push('/statement/user-management/permissions/create-permission');
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
          <FilterButton onClick={handleClick} />
          <DownloadWidget>
            <DownloadWidget.Icon>
              <CloudDownloadOutlined />
            </DownloadWidget.Icon>
            <DownloadWidget.text text="Download" />
          </DownloadWidget>
          <PermissionButton onClick={handleClick} buttonStyles={{ background: '#003A49', color: '#FFFFFF' }} />
        </div>
      </div>
      <PermissionsTable permissions={permissions} />
    </div>
  );
};

export default PermissionPage;

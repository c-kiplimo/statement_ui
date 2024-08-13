"use client";
import React, { useEffect, useState } from "react";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import styles from "./permissions.module.css";
import { CloudDownloadOutlined, SearchOutlined } from "@ant-design/icons";
import PermissionsTable, { PermissionTypes } from "./(permissionsTable)/permissions.table";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import DownloadWidget from "@/src/components/widgets/download-widget/download";
import { fetchUserPermissions, fetchUserTags } from "@/src/lib/actions/permissions.action";
import { Spin, Checkbox, Popover } from "antd";
import TagsButton from "@/src/components/widgets/tags-buttton/tags.button";

export type TagsTypes ={
  label:string;
  value:string;
}

const PermissionPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [permissionData, setPermissionData] = useState<PermissionTypes[]>([]);
  const [permissions, setPermissions] = useState<PermissionTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState<TagsTypes[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
          const fetchedPermissions = await fetchUserPermissions();
          setPermissionData(fetchedPermissions);
          setPermissions(fetchedPermissions);
        
      } catch (error) {
        console.error("Error fetching permissions:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTags = async()=>{
      try {
        const tagdata = await fetchUserTags();
        setTags(tagdata);
      } catch (error) {
        console.log('Error fetching tag data', error);
        
      }
    }

      fetchData();
      fetchTags();
    
  }, []);

  

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    filterPermissions(value, selectedTags);
  };

  const handleTagChange = (checkedValues: string[]) => {
    setSelectedTags(checkedValues);
    filterPermissions(searchValue, checkedValues);
  };

  const filterPermissions = (search: string, tags: string[]) => {
    let filtered = permissionData;
  
    if (search) {
      filtered = filtered.filter(item =>
        (item.permissionName && item.permissionName.toLowerCase().includes(search.toLowerCase())) ||
        (item.permissionDescription && item.permissionDescription.toLowerCase().includes(search.toLowerCase()))
      );
    }
  
    if (tags.length > 0) {
      filtered = filtered.filter(item =>
        item.tags && tags.includes(item.tags.toLocaleLowerCase())
      );
    }
    setPermissions(filtered);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const tagsContent = (
    <Checkbox.Group
      options={tags}
      value={selectedTags}
      onChange={handleTagChange}
      className={styles.checkgroup}
    />
  );

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
          <Popover content={tagsContent} trigger="click" title='Tags'>
            <TagsButton/>
          </Popover>
        </div>
      </div>
      <PermissionsTable permissions={permissions} />
    </div>
  );
};

export default PermissionPage;

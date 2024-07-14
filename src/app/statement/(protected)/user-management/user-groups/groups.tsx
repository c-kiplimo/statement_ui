import React, { useState, useMemo } from "react";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { CloudDownloadOutlined, MoreOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import styles from "./groups.module.css";
import AddItems from "@/src/components/widgets/add-item-widget/add.item";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import DownloadWidget from "@/src/components/widgets/download-widget/download";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";

interface GroupData {
  key: string;
  userName: string;
  description: string;
  createdOn: string;
  onClick?: () => void;
}

const columns: ColumnsType<GroupData> = [
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
    title: "Created On",
    dataIndex: "createdOn",
    render: (text: string) => (
      <span className={`${styles.groupStyles} bodyr`}>{text}</span>
    ),
  },
  {
    title: "",
    dataIndex: "icon",
    render: () => (
      <div className={styles.icons}>
        <Button type="text" icon={<MoreOutlined />} />
      </div>
    ),
  },
];

const dummyData: GroupData[] = [
  {
    key: "1",
    userName: "Group A",
    description: "Description for Group A",
    createdOn: "2022-03-10",
  },
  {
    key: "2",
    userName: "Group B",
    description: "Description for Group B",
    createdOn: "2022-03-10",
  },
  {
    key: "3",
    userName: "Group C",
    description: "Description for Group C",
    createdOn: "2022-03-10",
  },
  {
    key: "4",
    userName: "Group D",
    description: "Description for Group D",
    createdOn: "2022-03-10",
  },
  {
    key: "5",
    userName: "Group E",
    description: "Description for Group E",
    createdOn: "2022-03-10",
  },
];

const UserGroupsHomePage: React.FC = () => {
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (terms: string) => {
    setSearchTerm(terms);
  };

  const filteredData = useMemo(() => {
    return dummyData.filter((item) => {
      return Object.values(item).some(value =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm]);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.headDiv}>
          <div className={`${styles.title} h6b`}>Group</div>
          <div className={styles.buttonsDiv}>
            <SearchButton>
              <SearchButton.Icon>
                <SearchOutlined />
              </SearchButton.Icon>
              <SearchButton.Input text="Search" onSearch={handleSearch} />
            </SearchButton>
            <FilterButton onClick={() => {}} />
            <DownloadWidget>
              <DownloadWidget.Icon>
                <CloudDownloadOutlined />
              </DownloadWidget.Icon>
              <DownloadWidget.text text="Download" />
            </DownloadWidget>
            <AddItems onClick={() => {}} buttonStyles={{ backgroundColor: "#003A49", color: "white" }}>
              <AddItems.Icon>
                <PlusOutlined />
              </AddItems.Icon>
              <AddItems.Text text="Add Group " />
            </AddItems>
          </div>
        </div>
        <div className={styles.body2}>
          <Table
            columns={columns}
            dataSource={filteredData}
            size="middle"
            pagination={{
              pageSize: pageSize,
              showSizeChanger: true,
              onShowSizeChange: (_, size) => setPageSize(size),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserGroupsHomePage;

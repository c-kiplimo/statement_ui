import React, { useCallback, useState, useMemo } from "react";
import { Button, Table, Select } from "antd";
import { ColumnsType } from "antd/es/table";
import styles from "./group.permissions.module.css";
import { CloudDownloadOutlined, FilterOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import DownloadWidget from "@/src/components/widgets/download-widget/download";
import Tags from "@/src/components/widgets/tags-widget/tags";

const { Option } = Select;

interface MembersData {
  key: string;
  createdOn: string;
  permissions: string;
  description: string;
  tags: string;
}

const initialData: MembersData[] = [
  {
    key: "1",
    createdOn: "2023-01-01",
    permissions: "VIEW_ACCOUNT",
    description: "Allows view transaction",
    tags: "Account",
  },
  {
    key: "2",
    createdOn: "2023-02-01",
    permissions: "VIEW_TRANSACTION",
    description: "Allows view account",
    tags: "Loan",
  },
];

const GroupsPermissions = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<MembersData[]>(initialData);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, data]);

  const handleRoleChange = useCallback((value: string, key: string) => {
    console.log(`Role for user ${key} changed to ${value}`);
  }, []);

  const handleSearch = useCallback((terms: string) => {
    setSearchTerm(terms);
  }, []);

  const handleDelete = useCallback(
    (key: string) => {
      const newData = data.filter((item) => item.key !== key);
      setData(newData);
    },
    [data]
  );

  const columns: ColumnsType<MembersData> = [
    {
      title: "Permission",
      dataIndex: "permissions",
      render: (text: string) => (
        <span className={`${styles.groupStyles} bodyr`}>{text}</span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text: string) => (
        <div className={`${styles.selectdiv} bodyr`}>
          {text}
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdOn",
      render: (text: string) => {
        const dateTime = new Date(text);
        const date = dateTime.toLocaleDateString();
        return (
          <div className={styles.date}>
            <div className={`${styles.dateStyles} bodyr`}>{date}</div>
          </div>
        );
      },
    },
    {
      title: "Tags",
      dataIndex: "tags",
      render: (text: string) => (
        <div className={`${styles.tags} bodyr`}>{text}</div>
      ),
    },
    {
      title: "",
      dataIndex: "icon",
      render: (_, record) => (
        <button
          type="button"
          className={styles.deleteButton}
          aria-label="Delete user"
          onClick={() => handleDelete(record.key)}
        >
          <img src="/bin.svg" alt="Delete" />
        </button>
      ),
    },
  ];

  return (
    <div className={styles.groupUsersContainer}>
      <div className={styles.header}>
        <div className={`${styles.title} h6b`}>Group Members</div>
        <div className={styles.components}>
          <SearchButton>
            <SearchButton.Icon>
              <SearchOutlined />
            </SearchButton.Icon>
            <SearchButton.Input text="Search" onSearch={handleSearch} />
          </SearchButton>
          <Tags  buttonStyle={{color:"#6F7269"}}>
      <Tags.Icon >
        <FilterOutlined />
      </Tags.Icon>
      <Tags.Text title="Tags" />
    </Tags>
          <DownloadWidget >
        <DownloadWidget.Icon iconStyles={{color:"#4272DD"}}>
          <CloudDownloadOutlined/>
        </DownloadWidget.Icon>
        <DownloadWidget.Text text="Download"/>
      </DownloadWidget>
        </div>
      </div>
      <div className={styles.table}>
        <Table
          className={styles.antdtable}
          columns={columns}
          dataSource={filteredData}
          size="middle"
          pagination={{
            pageSize: pageSize,
            showSizeChanger: true,
            onShowSizeChange: (_, size) => setPageSize(size),
            onChange: (page) => setCurrentPage(page),
          }}
        />
      </div>
    </div>
  );
};

export default GroupsPermissions;

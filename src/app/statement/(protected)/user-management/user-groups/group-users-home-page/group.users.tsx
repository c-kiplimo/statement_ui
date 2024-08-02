import React, { useCallback, useState, useMemo } from "react";
import { Button, Table, Select, Checkbox, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import styles from "./group.users.module.css";
import { PlusOutlined, SearchOutlined, SwapOutlined } from "@ant-design/icons";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import AddItems from "@/src/components/widgets/add-item-widget/add.item";
import Sort from "@/src/components/atoms/sort/sort";
import Delete from "@/src/components/widgets/delete-widget/delete";
import AddUserToGroup from "../add-user-to-group/addUserToGroup";
import { useRouter } from "next/navigation";

const { Option } = Select;

interface MembersData {
  key: string;
  createdOn: string;
  userName: string;
  role: string;
  status: string;
  checked: boolean;
}

type PermissionsType = {
  groupId: string;
};

const initialData: MembersData[] = [
  {
    key: "1",
    createdOn: "2023-01-01",
    userName: "John Doe",
    role: "Admin",
    status: "Active",
    checked: false,
  },
  {
    key: "2",
    createdOn: "2023-02-01",
    userName: "Jane Smith",
    role: "Viewer",
    status: "Disabled",
    checked: false,
  },
];

const GroupUsers = ({groupId}:PermissionsType) => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<MembersData[]>(initialData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const router = useRouter();


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
    
  }, []);

  const handleSearch = useCallback((terms: string) => {
    setSearchTerm(terms);
  }, []);

  const handleCheckboxChange = useCallback(
    (key: string) => {
      const newData = data.map((item) => {
        if (item.key === key) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
      setData(newData);
    },
    [data]
  );

  const handleDelete = useCallback(
    (key: string) => {
      const newData = data.filter((item) => item.key !== key);
      setData(newData);
    },
    [data]
  );

  const handleAddItemsClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const columns: ColumnsType<MembersData> = [
    {
      title: "",
      dataIndex: "checkbox",
      render: (_, record) => (
        <Checkbox
          checked={record.checked}
          onChange={() => handleCheckboxChange(record.key)}
          aria-label={`Select ${record.userName}`}
        />
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
            <div className={`${styles.dateStyles} bodyr`}>{date}</div>
            <div className={`${styles.timestyles} captionr`}>{time}</div>
          </div>
        );
      },
    },
    {
      title: "User Name",
      dataIndex: "userName",
      render: (text: string) => (
        <span className={`${styles.groupStyles} bodyr`}>{text}</span>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text, record) => (
        <Select
          className={`${styles.selectdiv} ${styles.noBorder} bodyr`}
          defaultValue={text}
          onChange={(value) => handleRoleChange(value, record.key)}
          aria-label={`Role for ${record.userName}`}
        >
          <Option className={styles.option} value="Admin">
            Admin
          </Option>
          <Option className={styles.option} value="Viewer">
            Viewer
          </Option>
        </Select>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <span
          className={`${styles.activediv} bodym`}
          style={{
            color: record.status === "Disabled" ? "red" : "",
            background: record.status === "Disabled" ? "#FEDEE5" : "",
          }}
        >
          {text}
        </span>
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
          <FilterButton onClick={() => {}} />
          <Sort title={"Sort"} icon={<img src="/swap.svg" alt="swap" />} />
          <Delete onClick={() => console.log("Deleted!")}>
            <Delete.Icon style={{ color: "#6F7269" }}>
              <img src="/trashbin.svg" alt="trashbin" />
            </Delete.Icon>
            <Delete.text text="Delete" style={{ color: "gray" }} />
          </Delete>
          <AddItems
            onClick={handleAddItemsClick} 
            buttonStyles={{ backgroundColor: "#003A49", color: "white" }}
          >
            <AddItems.Icon>
              <PlusOutlined />
            </AddItems.Icon>
            <AddItems.Text text="Invite" />
          </AddItems>
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

     
      <Modal
        width={"45%"}
        visible={isModalVisible} 
        onCancel={handleModalCancel} 
        footer={null} 
      >
        <AddUserToGroup
          title={"Platform Members Management"}
          titleDescription={"Are you sure you want to add this user to the group? Please review the details before proceeding."}
          typeOfInvite={"Invite by email"} handleModalCancel={handleModalCancel}        />
      </Modal>
    </div>
  );
};

export default GroupUsers;

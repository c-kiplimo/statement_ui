import React, { useEffect, useMemo, useState } from "react";
import { Modal, Select, Spin } from "antd";
import {
  CloseOutlined,
  EditOutlined,
  EyeOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import styles from "./users.status.module.css";
import Search from "@/src/components/atoms/search/search";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import { UsersAction } from "@/src/lib/actions/account.users.action";
import AddItem from "@/src/components/atoms/add-item/add.item";
import CustomTable, { DataFetcher } from "../../widgets/table/table";
import { CustomersUsersAction } from "@/src/lib/actions/customer.users.action";
import RemoveUserModal from "./remove-customer-user/remove.customer.user";
import AddUserModal from "./add-customer-user/add.customer.user";
import UserViewProfilePageModal from "../../user-view-profile/user.view.profile";

const { Option } = Select;

type UserIdProps = {
  userId?: number;
};

interface DataType {
  id?: React.Key;
  createdOn?: string;
  userName?: string;
  role?: string;
  status?: string;
  icon?: React.ReactNode;
}

interface Datatype {
  title: string;
  dataIndex: keyof DataType;
  render?: (text: any, record: DataType) => React.ReactNode;
}

const CustomerUsers = (props: UserIdProps) => {
  const [incomingData, setIncomingData] = useState<DataFetcher[]>([]);
  const [removeUser, setRemoveUser] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [dataId, setDataId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const fetchData = async () => {
    if (props.userId !== undefined) {
      setLoading(true);
      try {
        const incomingAccountId = await CustomersUsersAction(props.userId);
        setIncomingData(incomingAccountId);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.userId]);

  const handleRoleChange = async (value: string, id: React.Key) => {
    try {
      await UsersAction;
      fetchData();
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const showModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleRemoveClick = (entryId: number) => {
    setDataId(entryId);
    setRemoveUser(true);
  };

  const handleAddUserClick = (p0: boolean) => {
    setAddUser(true);
  };

  const columns: Datatype[] = [
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
      render: (text) => <span className={`${styles.UserName} bodyr`}>{text}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text, record) => (
        <Select 
          className={styles.selectdiv}
          defaultValue={text}
          onChange={(value) => handleRoleChange(value, record.id!)}
        >
          <Option className={styles.option} value="Admin">
            ADMIN
          </Option>
          <Option className={styles.option} value="Viewer">
            VIEWER
          </Option>
        </Select>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <span
          className={styles.activediv}
          style={{
            color: record.status === "DISABLED" ? "red" : "",
            background: record.status === "DISABLED" ? "#FEDEE5" : "",
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
        <div className={styles.icons}>
          <EyeOutlined
            key="eyeicon"
            onClick={() => showModal(Number(record.id))}
          />
          <MinusOutlined
            key="minus"
            onClick={() => handleRemoveClick(Number(record.id))}
          />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.headerdiv}>
        <div className={`${styles.textdiv} h6b`}>Users Overview</div>
        <div className={styles.atomsdiv}>
          <Search
            title={"Search"}
            icon={<img src="/searchicon.svg" alt="searchicon" />}
          />
          <Filter
            title={"Filter"}
            icon={<img src="/funnel.svg" alt="funnel" />}
          />
          <Sort title={"Sort"} icon={<img src="/sort.svg" alt="sort" />} />
          <AddItem
            title={"Add User"}
            icon={<PlusOutlined />}
            iconStyle={{ color: "gray" }}
            titleStyle={{ color: "gray" }}
            onClick={() => handleAddUserClick(true)}
          />
        </div>
      </div>
      <CustomTable
        data={incomingData}
        pageSize={2}
        total={500}
        columns={columns}
      />
      <RemoveUserModal
        visible={removeUser}
        onCancel={() => setRemoveUser(false)}
        userId={dataId!}
        onRefreshData={fetchData}
      />
      <AddUserModal
        visible={addUser}
        roleOptions={["ADMIN", "VIEWER"]}
        statusOptions={["ACTIVE", "DISABLED"]}
        customerId={dataId!}
        closeIcon={<CloseOutlined />}
        onCancel={() => setAddUser(false)}
        onRefreshData={fetchData}
      />

      {loading && (
        <div className={styles.spinnerContainer}>
          <Spin size="large" />
        </div>
      )}

      <Modal
        footer={false}
        width={"60%"}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        {selectedUserId !== null && (
          <UserViewProfilePageModal userId={selectedUserId} />
        )}
      </Modal>
    </div>
  );
};

export default CustomerUsers;

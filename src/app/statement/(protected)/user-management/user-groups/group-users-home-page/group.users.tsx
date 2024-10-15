import React, {
  useCallback,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { Table, Select, Checkbox, Modal, Alert, notification } from "antd";
import { ColumnsType } from "antd/es/table";
import styles from "./group.users.module.css";
import {
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  SearchOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import AddItems from "@/src/components/widgets/add-item-widget/add.item";
import Sort from "@/src/components/atoms/sort/sort";
import Delete from "@/src/components/widgets/delete-widget/delete";
import AddUserToGroup from "../add-user-to-group/addUserToGroup";
import { useRouter } from "next/navigation";
import GroupsHandler from "@/src/services/usermanagement/usergroups.services";
import {
  fetchGroupUsers,
  fetchUserInfo,
} from "@/src/lib/actions/user.groups.action";
import { usePlatformId } from "@/src/hooks/platformId";
import GroupUserDeletion from "./(user-deletion-modal)/user.deletion.modal";
import DeleteGroupUsersFail from "./(user-deletion-error)/confirm.failure";
import Successful from "@/src/components/widgets/success-widget/successfull/successful";

const { Option } = Select;

export interface MembersData {
  key: string;
  createdOn: string;
  userName: string;
  role: string;
  status: string;
  checked?: boolean;
}

export type GroupUserInformation = {
  name: string;
  phoneno: string;
  email: string;
};

type PermissionsType = {
  groupId: string;
  setTotalUsers: (count: (prevCount: number) => number) => void;
};

const GroupUsers = ({ groupId, setTotalUsers }: PermissionsType) => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<MembersData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [removeUserModal, setRemoveUserModal] = useState(false);
  const [groupFailOpen, setGroupFailOpen] = useState(false);
  const [userToRemove, setUserToRemove] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<GroupUserInformation | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const router = useRouter();
  const platformId = usePlatformId();
  const handler = GroupsHandler();

  const showNotification = (message: string, description: ReactNode) => {
    notification.open({
      message,
      description,
      className: styles.customNotification,
      icon: null,
      style: {
        width: "max-content",
        height: "80px",
        background: "#17D05B",
        color: "white",
      },
      closeIcon: null,
    });
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertVisible(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (groupId) {
          const membersData = await fetchGroupUsers(
            Number(groupId),
            platformId
          );
          setData(membersData);
          setTotalUsers(() => membersData.length);
        }
      } catch (error) {}
    };

    fetchData();
  }, [groupId, platformId]);

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
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, role: value } : item
      )
    );
  }, []);

  const handleSearch = useCallback((terms: string) => {
    setSearchTerm(terms);
  }, []);

  const handleCheckboxChange = useCallback((key: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, checked: !item.checked } : item
      )
    );
  }, []);

  const handleDeleteIconClick = useCallback(async (key: string) => {
    setUserToRemove(key);
    setRemoveUserModal(true);
    try {
      const userInfo = await fetchUserInfo(key);
      setUserInfo(userInfo);
    } catch (error) {}
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    try {
      if (userToRemove) {
        await handler.deleteGroupMembers(
          platformId.toString(),
          groupId,
          userToRemove
        );
        setData((prevData) => {
          const updatedData = prevData.filter(
            (item) => item.key !== userToRemove
          );
          setTotalUsers(() => updatedData.length);
          return updatedData;
        });
        setRemoveUserModal(false);

        showNotification(
          "",
          <Successful>
            <Successful.Icon style={{ color: "#17D05B" }}>
              <CheckOutlined />
            </Successful.Icon>
            <Successful.Text
              text={`User ${userInfo?.name} has been removed successfully.`}
            />
            <Successful.Icon
              style={{
                color: "white",
                background: "none",
                justifyContent: "flex-end",
              }}
            >
              <CloseOutlined />
            </Successful.Icon>
          </Successful>
        );

        setUserToRemove(null);
        setUserInfo(null);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      setGroupFailOpen(true);
    }
  }, [userToRemove, userInfo]);

  const handleAddItemsClick = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleRemoveUserCancel = () => {
    setRemoveUserModal(false);
    setUserToRemove(null);
    setUserInfo(null);
  };

  const handleGroupFailClose = () => {
    setGroupFailOpen(false);
  };

  const ConfirmUserDeletion = () => {
    
  };
  const handleAddUserSuccess = async () => {
    try {
      if (groupId && platformId) {
        const membersData = await fetchGroupUsers(Number(groupId), platformId);
        setData(membersData);
        setTotalUsers(() => membersData.length);
      }
    } catch (error) {}
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
          onClick={() => handleDeleteIconClick(record.key)}
        >
          <img src="/bin.svg" alt="Delete" />
        </button>
      ),
    },
  ];

  const handleDeleteCheckedUsers = useCallback(async () => {
    const checkedUsers = data.filter((item) => item.checked);

    if (checkedUsers.length === 0) {
      setGroupFailOpen(true);
      return;
    }

    const userKeys = checkedUsers.map((item) => item.key);

    try {
      await Promise.all(
        userKeys.map(async (key) => {
          await handler.deleteGroupMembers(platformId.toString(), groupId, key);
        })
      );

    
      setData((prevData) => prevData.filter((item) => !item.checked));
      setTotalUsers((prevCount: number) => prevCount - checkedUsers.length);

      showNotification(
        "",
        <Successful>
          <Successful.Icon style={{ color: "#17D05B" }}>
            <CheckOutlined />
          </Successful.Icon>
          <Successful.Text
            text={`Selected users have been deleted successfully.`}
          />
          <Successful.Icon
            style={{
              color: "white",
              background: "none",
              justifyContent: "flex-end",
            }}
          >
            <CloseOutlined />
          </Successful.Icon>
        </Successful>
      );
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  }, [data, groupId, platformId]);

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
          <Delete onClick={handleDeleteCheckedUsers}>
            <Delete.Icon style={{ color: "#6F7269" }}>
              <img src="/trashbin.svg" alt="trashbin" />
            </Delete.Icon>
            <Delete.text text="Delete" style={{ color: "gray" }} />
          </Delete>
          <AddItems
            onClick={handleAddItemsClick}
            buttonStyles={{ backgroundColor: "#003A49", color: "white" }}
          >
            <AddItems.Icon iconStyles={{ color: "white" }}>
              <PlusOutlined />
            </AddItems.Icon>
            <AddItems.Text text="Invite" />
          </AddItems>
        </div>
      </div>
      <div className={styles.table}>
        {alertVisible && (
          <Alert
            message={alertMessage}
            type="success"
            closable
            onClose={() => setAlertVisible(false)}
            className={styles.alert}
            showIcon
          />
        )}
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
        width={"min-content"}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <AddUserToGroup
          title={"Platform Members Management"}
          titleDescription={
            "Are you sure you want to add this user to the group? Please review the details before proceeding."
          }
          typeOfInvite={"Invite by email:"}
          handleModalCancel={handleModalCancel}
          onSuccess={handleAddUserSuccess}
        />
      </Modal>

      <Modal
        open={removeUserModal}
        onCancel={handleRemoveUserCancel}
        footer={null}
      >
        <GroupUserDeletion
          onCancel={handleRemoveUserCancel}
          onConfirm={handleConfirmDelete}
          name={userInfo?.name || ""}
          phoneno={userInfo?.phoneno || ""}
          email={userInfo?.email || ""}
        />
      </Modal>

      <Modal 
      open={groupFailOpen}
       onCancel={handleGroupFailClose}
       footer={null}
       >
        <DeleteGroupUsersFail
          title={"Error Removing User"}
          description={
            "There was an error removing the user from the group. Please try again later"
          }
          onTryAgain={ConfirmUserDeletion}
          onCancel={handleGroupFailClose}
        />
      </Modal>
    </div>
  );
};

export default GroupUsers;

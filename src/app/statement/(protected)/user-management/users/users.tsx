import React, { useEffect, useState, useMemo } from "react";
import styles from "./users.module.css";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import {
  CloseCircleOutlined,
  SearchOutlined,
  EyeOutlined,
  UserOutlined,
  EditOutlined,
  TeamOutlined,
  MoreOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import TableWidget from "@/src/components/widgets/table-widget/table-widget";
import { RegisteredUserAction } from "@/src/lib/actions/registered.user.action";
import { Modal, Dropdown, Button, Menu, notification, Spin } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import AddUserButton from "@/src/components/widgets/add.user.button/add.user.button";
import { useRouter } from "next/navigation";
import { createUserHandler } from "@/src/services/usermanagement/create.user.service";
import DeactivateUser from "./(deactivateUser)/deactivate.user";
import CreationSuccess from "../permissions/(confirmsuccess)/creation.success";
import ConfirmFail from "../permissions/(confirmfailure)/confirm.failure";
import { fetchUserGroupsAction } from "@/src/lib/actions/fetch.groups.action";

type userProps = {
  customerId: number;
  platformId: number;
};

const UsersHome = ({ customerId, platformId }: userProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<RegisteredUser | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [openDeactivateModal, setOpenDeactivateModal] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failureModalVisible, setFailureModalVisible] = useState(false);
  const [retryDeactivate, setRetryDeactivate] = useState(false);
  const [userGroups, setUserGroups] = useState<User_Group[]>([]);
  const router = useRouter();
  const { deactivateUserService } = createUserHandler();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<RegisteredUser[]>([]);

  const handleModalClose = () => {
    setOpenDeactivateModal(false);
    setSelectedUser(null);
    setUserGroups([]);
  };

  const fetchUsers = async () => {
    if (customerId !== null && customerId !== undefined) {
      setLoading(true);
      try {
        const response = await RegisteredUserAction(
          customerId,
          platformId.toString(),
          0,
          10
        );
        const usersWithKey = response.map((user: RegisteredUser) => ({
          ...user,
          key: user.userId || user.email,
        }));
        setUsers(usersWithKey);
      } catch (error) {
        console.error("Error fetching data:", error);
        notification.error({
          message:
            "There was an error while fetching users. Please try again later.",
          description: "",
          icon: <CloseCircleOutlined style={{ color: "white" }} />,
          className: "bodyr failure-notification",
          placement: "topRight",
          duration: 1,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [customerId]);

  const fetchGroups = async (userId: string) => {
    try {
      const data = await fetchUserGroupsAction(userId);
      const transformedGroups = data.map((group: any) => ({
        id: group.groupId,
        name: group.groupName,
        icon: <TeamOutlined />,
        description: group.description,
      }));
      setUserGroups(transformedGroups);
    } catch (error) {
      console.error("Error fetching groups data:", error);
    }
  };

  useEffect(() => {
    if (openDeactivateModal && selectedUser) {
      fetchGroups(selectedUser?.userId);
    }
  }, [openDeactivateModal, selectedUser]);

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;

    return users.filter((user) =>
      [user.username, user.mobileNumber, user.email].some((field) =>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  const handleMenuClicks = (e: any, user: RegisteredUser) => {
    if (e.key === "3") {
      setSelectedUser(user);
      setOpenDeactivateModal(true);
    } else if (e.key === "2") {
      setSelectedUserId(user.userId);
      router.push(
        `/statement/user-management/users/user-profile?userId=${user.userId}`
      );
    } else if (e.key === "4") {
      setSelectedUserId(user.userId);
      router.push(
        `/statement/user-management/users/updateUser?userId=${user.userId}`
      );
    } else {
      return;
    }
  };

  const handleDeactivate = async (userId: string) => {
    if (selectedUser) {
      console.log("Deactivating user:", selectedUser.userId);
      try {
        const response = await deactivateUserService(selectedUser.userId!);
        console.log(response);
        setSuccessModalVisible(true);
      } catch (error) {
        console.error("Error deactivating user:", error);
        setFailureModalVisible(true);
      } finally {
        setRetryDeactivate(false);
      }
    }
  };

  const handleSuccessModalClose = () => {
    setSuccessModalVisible(false);
    handleModalClose();
    fetchUsers();
  };

  const handleCancel = () => {
    setFailureModalVisible(false);
    setSelectedUser(null);
    setOpenDeactivateModal(false);
  };

  useEffect(() => {
    if (retryDeactivate && selectedUser) {
      handleDeactivate(selectedUser?.userId);
    }
  }, [retryDeactivate]);

  const userColumns: ColumnsType<RegisteredUser> = [
    {
      title: "User Name",
      dataIndex: "userName",
      render: (text: string) => (
        <span className={`${styles.rowStyles} bodyr`}>{text}</span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "mobileNumber",
      render: (text: string) => (
        <span className={`${styles.rowStyles} bodyr`}>{text}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text: string) => (
        <span className={`${styles.rowStyles} bodyr`}>{text}</span>
      ),
    },
    {
      title: "Joined On",
      dataIndex: "createdAt",
      render: (createdAt: string) => moment(createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record: RegisteredUser) => (
        <div className={styles.icons}>
          <Dropdown
            overlay={
              <Menu onClick={(e) => handleMenuClicks(e, record)}>
                <Menu.Item key="1">
                  <span className={styles.menu}>
                    <GlobalOutlined />{" "}
                    <h1 className={`bodyb`}>Choose Action</h1>
                  </span>
                </Menu.Item>
                <hr />
                <Menu.Item key="2">
                  <Button type="text" style={{ background: "none" }}>
                    <span className={styles.menu}>
                      <EyeOutlined />{" "}
                      <span className={`bodyr`}>View</span>
                    </span>
                  </Button>
                </Menu.Item>
                <Menu.Item key="3">
                  <Button type="text" style={{ background: "none" }}>
                    <span className={styles.menu}>
                      <UserOutlined />{" "}
                      <span className={`bodyr`}>Deactivate</span>
                    </span>
                  </Button>
                </Menu.Item>
                <Menu.Item key="4">
                  <Button type="text" style={{ background: "none" }}>
                    <span className={styles.menu}>
                      <EditOutlined />{" "}
                      <span className={`bodyr`}>Update</span>
                    </span>
                  </Button>
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
            placement="bottom"
          >
            <Button
              type="text"
              className={styles.icon}
              icon={<MoreOutlined />}
            />
          </Dropdown>
        </div>
      ),
    },
  ];

  const handleSearch = (terms: string) => {
    setSearchTerm(terms);
  };

  const handleCreateUser = () => {
    router.push("/statement/user-management/users/create-user");
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
        <VerticalInfoDescription
          title={"Registered User"}
          titleStyle={{ fontWeight: "700", fontSize: "20px" }}
        />
        <div className={styles.buttons}>
          <SearchButton>
            <SearchButton.Icon>
              <SearchOutlined size={16} />
            </SearchButton.Icon>
            <SearchButton.Input text="Search" onSearch={handleSearch} />
          </SearchButton>
          <AddUserButton
            onClick={handleCreateUser}
            buttonStyles={{ background: "#003A49", color: "#FFFFFF" }}
          />
        </div>
      </div>
      <TableWidget columns={userColumns} data={filteredUsers} />
      <Modal
        open={openDeactivateModal}
        onCancel={handleModalClose}
        footer={false}
        className={styles.modal}
        width={"max-content"}
      >
        {selectedUser && (
          <DeactivateUser
            selectedId={selectedUser.userId}
            onCancel={handleModalClose}
            firstName={selectedUser.firstName}
            lastName={selectedUser.lastName}
            email={selectedUser.email}
            mobileNumber={selectedUser.mobileNumber}
            userGroups={userGroups}
            handleOk={handleDeactivate}
          />
        )}
      </Modal>
      <Modal
        open={successModalVisible}
        onCancel={handleSuccessModalClose}
        footer={null}
        className={styles.modal}
        width={"max-content"}
      >
        <CreationSuccess
          title="User Deactivation Successful"
          description="The user has been successfully deactivated. Their account will be permanently deleted after 30 days. During this period, the account can be reactivated if needed."
          onClick={handleSuccessModalClose}
        />
      </Modal>
      <Modal
        open={failureModalVisible}
        onCancel={handleCancel}
        footer={null}
        className={styles.modal}
        width={"max-content"}
      >
        {selectedUser && (
          <ConfirmFail
            title="User Deactivation Failed"
            description={`There was an error while trying to deactivate the user, ${selectedUser?.username!}. Please try again`}
            onClick={() => setRetryDeactivate(true)}
            onCancel={handleCancel}
          />
        )}
      </Modal>
    </div>
  );
};

export default UsersHome;

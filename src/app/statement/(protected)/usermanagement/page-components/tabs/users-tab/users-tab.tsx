import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ColumnsType } from "antd/es/table";
import PrimaryButton from "@/src/components/atoms/button/primary-button/primary-button";
import TabContent from "@/src/components/atoms/tabs/tab-content/tab-content";
import Tab from "@/src/components/atoms/tabs/tab";
import RegisterUser from "./register-user/register-user";
import PendingAuthorization from "./pending-authorization/pending-authorization";
import { useAccountStatementContext } from "@/src/app/(context)/account-statement-context";
import { useTokens } from "@/src/app/(context)/ColorContext";
import { UserDetails } from "@/src/types/user.type";
import { UserHandler } from "@/src/services/usermanagement/user.service";
import styles from "./users-tab.module.css";
import { EyeIcon } from "lucide-react";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import classNames from "classnames";
import PendingAuthorizationModalContent from "@/src/components/molecules/user-management/modal-content/pendingAuthorizationModal";


const Users: React.FC = () => {
  const { accountId } = useAccountStatementContext();
  const token = useTokens();
  const { fetchAllUsers,fetchPendingUser, deleteUser } = UserHandler();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isRegisteredUserModalOpen, setIsRegisteredUserModalOpen] =
    useState<boolean>(false);
  const [isPendingAuthorizationModalOpen, setIsPendingAuthorizationModalOpen] =
    useState<boolean>(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("add");
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  // const [data, setData] = useState<UserDetails[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<UserDetails[]>([]);
  const [pendingUsers, setPendingUsers] = useState<UserDetails[]>([]);
  const [hoveredButton, setHoveredButton] = useState<
    "confirm" | "cancel" | null
  >(null);
  const [activeButton, setActiveButton] = useState<"check" | "cancel" | null>(
    null
  );

  const handleButtonClick = (buttonType: "check" | "cancel") => {
    setActiveButton(buttonType);
  };

  const handleMouseEnter = (buttonType: "confirm" | "cancel") => {
    setHoveredButton(buttonType);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };


  const fetchUsers = async () => {
    try {
      const response = await fetchAllUsers();
      setRegisteredUsers(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const displayPendingUsers = async () => {
    try {
      const response = await fetchPendingUser(); 
      setPendingUsers(response); 
      console.log(response);
    } catch (error) {
      console.error("Error fetching pending users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    // displayPendingUsers();
  }, []);
 
  const openModal = (type: string, record: UserDetails) => {
    setModalType(type);
    setSelectedUser(record);
    if (selectedTab === 0) {
      setIsRegisteredUserModalOpen(true);
    } else if (selectedTab === 1) {
      setIsPendingAuthorizationModalOpen(true);
    }
    if (type === "delete") {
      setDeleteModalVisible(true);
    }
  };

  const handleOk = () => {
    if (selectedTab === 0) {
      setIsRegisteredUserModalOpen(false);
    } else if (selectedTab === 1) {
      setIsPendingAuthorizationModalOpen(false);
    }
  };

  const handleCancel = () => {
    if (selectedTab === 0) {
      setIsRegisteredUserModalOpen(false);
    } else if (selectedTab === 1) {
      setIsPendingAuthorizationModalOpen(false);
    }
    setDeleteModalVisible(false);
  };

  const handleCreate = (registeredUsers: UserDetails): void => {
    console.log("handleCreate");
  };

  const handleEdit = (registeredUsers: UserDetails): void => {
    console.log("handleEdit");
  };

  const handleView = (registeredUsers: UserDetails): void => {
    console.log("handleView");
  };

  const handleDelete = async () => {
    if (selectedUser && selectedUser.username) {
      try {
        await deleteUser(selectedUser.username);
        setDeleteModalVisible(false);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleDeleteOk = handleDelete;

  const getColumns = (
    actions: (record: UserDetails) => JSX.Element
  ): ColumnsType<UserDetails> => [
    { title: "First name", dataIndex: "firstName", key: "firstName" },
    { title: "Last name", dataIndex: "lastName", key: "lastName" },
    { title: "Phone number", dataIndex: "mobileNumber", key: "mobileNumber" },
    { title: "Email Address", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Staff number", dataIndex: "staff", key: "staff" },
    {
      title: "",
      dataIndex: "",
      key: "actions",
      render: (record) => actions(record),
    },
  ];

  const modalWidth = () => {
    switch (modalType) {
      case "add":
        return "800px";
      case "edit":
        return "500px";
      case "delete":
        return "500px";
      default:
        return "700px";
    }
  };

  const pendingAuthorizationColumn = (
    actions: (record: UserDetails) => JSX.Element
  ): ColumnsType<UserDetails> => [
    { title: "First name", dataIndex: "first", key: "first" },
    { title: "Last name", dataIndex: "last", key: "last" },
    { title: "Phone number", dataIndex: "phone", key: "phone" },
    { title: " Email Address", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
    { title: "Staff number", dataIndex: "staff", key: "Staff" },
    {
      title: "",
      dataIndex: "",
      key: "actions",
      render: (record) => actions(record),
    },
  ];

  const tabsItems = [
    {
      title: "Registered user",
      content: (
        <RegisterUser
          columns={getColumns((record) => (
            <div className={styles.tableAction}>
              <button
                className={styles.btn}
                onClick={() =>
                  router.push(
                    "/statement/user-management/user-management-profile"
                  )
                }
              >
                <EyeIcon style={{ color: "#c9c9cc" }} size={16} />
              </button>
              <button
                className={styles.btn}
                onClick={() => openModal("delete", record)}
              >
                <DeleteOutlined style={{ color: "#c9c9cc" }} size={16} />
              </button>
            </div>
          ))}
          data={registeredUsers}
          modalTitle=""
          isModalOpen={isRegisteredUserModalOpen}
          setIsModalOpen={setIsRegisteredUserModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          accountId={accountId}
          handleCreate={handleCreate}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          modalType={modalType}
          setModalType={setModalType}
        />
      ),
    },
    {
      title: "Pending Authorisation",
      content: (
        <PendingAuthorization
          columns={pendingAuthorizationColumn((record) => (
            <div className={styles.actionBtn}>
              <button
                className={styles.btn}
                onClick={() => {
                  router.push(
                    "/statement/user-management/user-management-profile"
                  );
                }}
              >
                <EyeIcon style={{ color: "#c9c9cc" }} size={16} />
              </button>
              <button
                className={`${styles.btn} ${activeButton === "check" ? styles.tickBtn : ""}`}
                onClick={() => handleButtonClick("check")}
              >
                <CheckOutlined size={16} />
              </button>
              <button
                className={`${styles.btn} ${activeButton === "cancel" ? styles.cancelBtn : ""}`}
                onClick={() => {
                  handleButtonClick("cancel");
                }}
              >
                <CloseOutlined size={16} />
              </button>
            </div>
          ))}
          data={pendingUsers}
          modalTitle=""
          isModalOpen={isPendingAuthorizationModalOpen}
          setIsModalOpen={setIsPendingAuthorizationModalOpen}
          modalWidth={modalWidth()}
          handleOk={handleOk}
          handleCancel={handleCancel}
          modalContentComponent={PendingAuthorizationModalContent}
          accountId={accountId}
          handleCreate={handleCreate}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          modalType={modalType}
          setModalType={setModalType}
        />
      ),
    },
  ];

  return (
    <Fragment>
      <div className={styles.userTab}>
        <div className={styles.tabButton}>
          <div className={styles.tabContainer}>
            <div className={styles.tab}>
              <Tab
                tabsItems={tabsItems}
                onSelectTab={(index) => setSelectedTab(index)}
                selectedTab={selectedTab}
                backgroundColor={token.border.primary}
                fontWeight={0}
                borderColor={token.border.primary}
                textColor={""}
              />
              {selectedTab === 0 && (
                <PrimaryButton
                  buttonType="default"
                  iconPosition="right"
                  shape="default"
                  size="large"
                  customStyles={{
                    background: token.brand.primary,
                    color: token.default.white,
                  }}
                  onClick={() =>
                    router.push("/statement/usermanagement/user-registration")
                  }
                >
                  Register
                </PrimaryButton>
              )}
            </div>
            <TabContent
              marginTop="20px"
              padding="20px"
              tabsItems={tabsItems}
              selectedTab={selectedTab}
              textColor={""}
              backgroundColor={token.border.primary}
              fontWeight={0}
            />
          </div>
        </div>
      </div>
      <Modal
        className={styles.modal}
        footer={null}
        visible={deleteModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles.modalContainer}>
          <div className={styles.modalDesc}>
            <div className={styles.textField}>
              <span className={`${styles.title} h6m`}>Remove Group</span>
              <span className={`${styles.titleDesc} bodyr`}>
                Are you sure you want to delete this group?
              </span>
            </div>
          </div>
          <div className={styles.btnContainer}>
            <button
              className={classNames(styles.modalBtn, {
                [styles.activeBtn]: hoveredButton === "cancel",
              })}
              onMouseEnter={() => handleMouseEnter("cancel")}
              onMouseLeave={handleMouseLeave}
              onClick={handleCancel}
            >
              No
            </button>
            <button
              className={classNames(styles.modalBtn, {
                [styles.activeBtn]: hoveredButton === "confirm",
              })}
              onMouseEnter={() => handleMouseEnter("confirm")}
              onMouseLeave={handleMouseLeave}
              onClick={handleDeleteOk}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Users;

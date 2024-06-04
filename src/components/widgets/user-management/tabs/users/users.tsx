import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ColumnsType } from "antd/es/table";
import PrimaryButton from "@/src/components/atoms/button/primary-button/primary-button";
import {
  deleteIcon,
  eyeIcon,
  tickIcon,
  xIcon,
} from "@/src/components/atoms/svg/document_svg";
import TabContent from "@/src/components/atoms/tabs/tab-content/tab-content";
import Tab from "@/src/components/atoms/tabs/tab";
import RegisterUser from "./register-user/register-user";
import PendingAuthorization from "./pending-authorization/pending-authorization";
import RegisterUserModalContent from "@/src/components/molecules/user-management/modal-content/registerUserModal";
import PendingAuthorizationModalContent from "@/src/components/molecules/user-management/modal-content/pendingAuthorizationModal";
import { useAccountStatementContext } from "@/src/app/(context)/account-statement-context";
import { useTokens } from "@/src/app/(context)/ColorContext";
import { UserDetails } from "@/src/types/user.type";
import { UserHandler } from "@/src/services/usermanagement/user.service";
import styles from "./users.module.css";
import DeleteUserModal from "../../modal/modal";
import ReusableModal from "../../modal/modal";

const Users: React.FC = () => {
  const { accountId } = useAccountStatementContext();
  const token = useTokens();
  const { fetchAllUsers, deleteUser } = UserHandler();
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isRegisteredUserModalOpen, setIsRegisteredUserModalOpen] = useState<boolean>(false);
  const [isPendingAuthorizationModalOpen, setIsPendingAuthorizationModalOpen] = useState<boolean>(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("add");
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [data, setData] = useState<UserDetails[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetchAllUsers();
    setData(response);
  };

  const openModal = (type: string, record: UserDetails) => {
    setModalType(type);
    setSelectedUser(record);
    if (selectedTab === 0) {
      setIsRegisteredUserModalOpen(true);
    } else if (selectedTab === 1) {
      setIsPendingAuthorizationModalOpen(true);
    }
    if (type === "delete") {
      setIsDeleteUserModalOpen(true);
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
    setIsDeleteUserModalOpen(false);
  };

  const handleCreate = (data: UserDetails): void => {
    console.log("handleCreate");
  };

  const handleEdit = (data: UserDetails): void => {
    console.log("handleEdit");
  };

  const handleView = (data: UserDetails): void => {
    console.log("handleView");
  };

  const handleDelete = async () => {
    if (selectedUser) {
      await deleteUser(selectedUser.email);
      setIsDeleteUserModalOpen(false);
      fetchUsers();
    }
  };

  const getColumns = (actions: (record: UserDetails) => JSX.Element): ColumnsType<UserDetails> => [
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

  const dynamicData = {
    data: {
      title: "Meraki Systems tech",
      description: "234353",
      lastActivity: "July, 07 2023",
      availableBalance: "$146,786.33",
      workingBalance: "$67,990.24",
      terms: "12 months",
    },
  };

  const tabsItems = [
    {
      title: "Registered user",
      content: (
        <RegisterUser
          columns={getColumns((record) => (
            <div className={styles.tableAction}>
              <PrimaryButton
                buttonType="default"
                iconPosition="right"
                shape="default"
                size="small"
                icon={eyeIcon}
                customStyles={{
                  background: token.default.white,
                  color: token.default.grey,
                  padding: "8px 16px",
                  gap: "16px",
                  width: "32px",
                  height: "32px",
                }}
                onClick={() => router.push("/statement/user-management/user-management-profile")}
              />
              <PrimaryButton
                buttonType="default"
                iconPosition="right"
                shape="default"
                size="small"
                icon={deleteIcon}
                customStyles={{
                  background: token.default.white,
                  color: token.default.grey,
                  padding: "8px 16px",
                  gap: "16px",
                  width: "32px",
                  height: "32px",
                }}
                onClick={() => openModal("delete", record)}
              />
            </div>
          ))}
          data={data}
          modalTitle=""
          isModalOpen={isRegisteredUserModalOpen}
          setIsModalOpen={setIsRegisteredUserModalOpen}
          modalWidth={modalWidth()}
          handleOk={handleOk}
          handleCancel={handleCancel}
          accountId={accountId}
          handleCreate={handleCreate}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          modalType={modalType}
          dynamicData={dynamicData}
          setModalType={setModalType}
        />
      ),
    },
    {
      title: "Pending Authorisation",
      content: (
        <PendingAuthorization
          columns={getColumns((record) => (
            <div className={styles.tableAction}>
              <PrimaryButton
                buttonType="default"
                iconPosition="right"
                shape="default"
                size="small"
                icon={eyeIcon}
                customStyles={{
                  background: token.default.white,
                  color: token.default.grey,
                  padding: "8px 16px",
                  gap: "8px",
                  width: "32px",
                  height: "32px",
                }}
                onClick={() => router.push("/statement/user-management/user-management-profile")}
              />
              <PrimaryButton
                buttonType="default"
                iconPosition="right"
                shape="default"
                size="small"
                icon={tickIcon}
                customStyles={{
                  background: token.default.white,
                  border: `1px solid ${token.accent.success}`,
                  color: token.accent.success,
                  padding: "8px 16px",
                  gap: "8px",
                  width: "32px",
                  height: "32px",
                }}
                onClick={() => openModal("edit", record)}
              />
              <PrimaryButton
                buttonType="default"
                iconPosition="right"
                shape="default"
                size="small"
                icon={xIcon}
                customStyles={{
                  background: token.default.white,
                  border: `1px solid ${token.accent.danger}`,
                  color: token.accent.danger,
                  padding: "8px 16px",
                  gap: "8px",
                  width: "32px",
                  height: "32px",
                }}
                onClick={() => openModal("delete", record)}
              />
            </div>
          ))}
          data={data}
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
          dynamicData={dynamicData}
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
                  onClick={() => openModal("add", {} as UserDetails)}
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
      <ReusableModal
        visible={isDeleteUserModalOpen}
          title="Remove User"
          titleDesc="Are you sure you want to delete this user?"
          onConfirm={handleOk}
          confirmButtonStyles={{
            border: "2px solid var(--functional-colors-danger)",
            background: "var(--functional-colors-danger)",
          }}
          cancelButtonStyles={{
            border: "2px solid var(--functional-colors-danger)",
            background: "var(--functional-colors-danger)",
          }}
          onCancel={handleCancel}
          confirmText={"Yes"}
          cancelText={"No"}
          confirmLoading={true}

      />
    </Fragment>
  );
};

export default Users;

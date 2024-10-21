import { RegisteredUsersAction } from "@/src/lib/actions/registered.users.actions";
import { UserDetails } from "@/src/types/user.type";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./users.module.css";
import { ColumnsType } from "antd/lib/table";
import { Button } from "antd";
import { EyeIcon } from "lucide-react";
import { DeleteOutlined } from "@ant-design/icons";
import RegisterUser from "../../../../page-components/tabs/users-tab/register-user/register-user";
import { useAccountStatementContext } from "@/src/app/(context)/account-statement-context";
import { UserHandler } from "@/src/services/usermanagement/user.service";
import Tab from "@/src/components/atoms/tabs/tab";
import PrimaryButton from "@/src/components/atoms/button/primary-button/primary-button";
import TabContent from "@/src/components/atoms/tabs/tab-content/tab-content";
import { useTokens } from "@/src/app/(context)/ColorContext";


type userProps = {
  userId?: number;
};

const UsersBranch = ({ userId }: userProps) => {
  const { accountId } = useAccountStatementContext();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [isRegisteredUserModalOpen, setIsRegisteredUserModalOpen] =
    useState<boolean>(false);
  const [isPendingAuthorizationModalOpen, setIsPendingAuthorizationModalOpen] =
    useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("add");
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<UserDetails[]>([]);
  const [pendingUsers, setPendingUsers] = useState<UserDetails[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const {deleteUser} = UserHandler();
  const token = useTokens();

  const fetchRegisteredUsers = async () => {
    if (userId !== undefined) {
      setLoading(true);
      try {
        const response = await RegisteredUsersAction(userId);
        const usersWithKeys = response.map((user, index) => ({
          ...user,
          key: index.toString(),
        }));
        console.log(response)
        setRegisteredUsers(usersWithKeys);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchRegisteredUsers();
  }, [userId]);

  const openModal = (type: string, record: UserDetails) => {
    console.log("record", record);
    setModalType(type);
    setSelectedUser(record);
    if (selectedTab === 0) {
      setIsRegisteredUserModalOpen(true);
    } else if (selectedTab === 1) {
      setIsPendingAuthorizationModalOpen(true);
    }
    if (type === "delete") {
      setModalVisible(true);
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
    setModalVisible(false);
  };

  const handleDelete = async () => {
    if (selectedUser && selectedUser.username) {
      try {
        await deleteUser(selectedUser.username);
        setModalVisible(false);
        fetchRegisteredUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };
  
  const RegisterUserColumns: ColumnsType<UserDetails> = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber", 
      key: "mobileNumber", 
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Staff Number",
      dataIndex: "staffNumber",
      key: "staffNumber",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: UserDetails) => (
        <span className={styles.tableAction}>
          <Button
            className={styles.btn}
            onClick={() => {
              router.push(
                `/statement/usermanagement/user-profile?userId=${record.username}` // Corrected to match UserDetails
              );
            }}
            icon={<EyeIcon style={{ color: "#c9c9cc" }} size={16} />}
          />
          <Button
            className={styles.btn}
            onClick={() => openModal("delete", record)}
            icon={<DeleteOutlined style={{ color: "#c9c9cc" }} size={16} />}
          />
        </span>
      ),
    },
  ];

  const tabsItems = [
    {
      title: "Registered user",
      content: (
        <RegisterUser
          columns={RegisterUserColumns}
          data={registeredUsers}
          modalTitle=""
          isModalOpen={isRegisteredUserModalOpen}
          setIsModalOpen={setIsRegisteredUserModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          accountId={accountId}
          handleDelete={handleDelete}
          modalType={modalType}
          setModalType={setModalType}
        />
      ),
    },
  ]
  return (
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
              // iconPosition="right"
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
  );
};

export default UsersBranch;


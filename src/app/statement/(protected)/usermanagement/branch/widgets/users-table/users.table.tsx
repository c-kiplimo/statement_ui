import React, { useEffect, useState } from "react";
import { Button, Modal, Pagination, Table } from "antd";
import type { TableColumnsType } from "antd";
import { CheckOutlined, CloseOutlined, MoreOutlined } from "@ant-design/icons";
import styles from "./users.table.module.css";
import SelectedOption from "./(selectedOption)/select.option";
import { useQuery } from "react-query";
import { RegisteredUsersAction } from "@/src/lib/actions/registered.users.actions";
import { UserDetails } from "@/src/types/user.type";
import RegisterBranch from "../shared/register-user-branch/register.user.branch";
import Tab from "@/src/components/atoms/tabs/tab";
import TabContent from "@/src/components/atoms/tabs/tab-content/tab-content";
import { useTokens } from "@/src/app/(context)/ColorContext";
import PrimaryButton from "@/src/components/atoms/button/primary-button/primary-button";
import { useRouter } from "next/navigation";
import { EyeIcon } from "lucide-react";
import PendingAuthorization from "@/src/components/widgets/user-management/tabs/users/pending-authorization";
import PendingModal from "../../../page-components/shared/modal/pending-modal";
import { UserHandler } from "@/src/services/usermanagement/user.service";

type userProps = {
  customerId?: number;
};

export interface UserInfoType {
  key: React.Key;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  role: string;
  staffNumber: string;
}

const BranchUsersTable = ({ customerId }: userProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPendingAuthorizationModalOpen, setIsPendingAuthorizationModalOpen] =
    useState<boolean>(false);
    const [isRegisteredUserModalOpen, setIsRegisteredUserModalOpen] =
    useState<boolean>(false);
    const [modalType, setModalType] = useState<string>("add");
  const [selectedKey, setSelectedKey] = useState<React.Key | null>(null);
  const [registeredUsers, setRegisteredUsers] = useState<UserDetails[]>([]);
  const [pendingUsers, setPendingUsers] = useState<UserDetails[]>([]);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const {fetchPendingUser} =UserHandler();
  const token = useTokens();
  const router = useRouter();

  const fetchStatusData = async () => {
    if (customerId !== undefined) {
      try {
        const result = await RegisteredUsersAction(customerId);
        const keyedUsers = result.map((user: UserDetails, index: number) => ({
          ...user,
          key: user.id || index,
        }));
        setRegisteredUsers(keyedUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const displayPendingUsers = async () => {
    try {
      const response = await fetchPendingUser();
      const usersWithKeys = response.map((user, index) => ({
        ...user,
        key: index.toString(),
      }));
      setPendingUsers(usersWithKeys);
      console.log("Pending users", response);
    } catch (error) {
      console.error("Error fetching pending users:", error);
    }
  };

  useEffect(() => {
    displayPendingUsers();
  }, []);

  const {
    data: userDetails,
    error,
    isError,
    isLoading,
  } = useQuery(["accountSchedule", customerId], fetchStatusData,{
    enabled: !!customerId,
    refetchInterval: 5000,
  });

  const openModal = (type: string,id: React.Key) => {
    console.log("record", id);
    setModalType(type);
    setSelectedKey(id);
    if (selectedTab === 0) {
      setIsRegisteredUserModalOpen(true);
    } else if (selectedTab === 1) {
      setIsPendingAuthorizationModalOpen(true);
    }
    if (type === "delete") {
      setIsModalVisible(true);
    }
  };

  const handleViewMoreOptions = (id: React.Key) => {
    setSelectedKey(id);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedKey(null);
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
    setIsModalVisible(false);
  };

  const handleDelete=(e:any)=>{
    console.log("Button clicked!",e)
  }

  const handleDeleteOk = handleDelete;
  const modalWidth = () => {
    switch (modalType) {
      case "add":
        return "800px";
      case "authorize":
        return "500px";
      case "unauthorize":
        return "500px";
      default:
        return "700px";
    }
  };

  const RegisterUserColumns: TableColumnsType<UserDetails> = [
    {
      title: "First Name",
      dataIndex: "firstName",
      width: "15%",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      width: "15%",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      width: "15%",
    },
    {
      title: "Email Address",
      dataIndex: "email",
      width: "15%",
    },
    {
      title: "Role",
      dataIndex: "role",
      width: "15%",
    },
    {
      title: "Staff Number",
      dataIndex: "staffNumber",
      width: "15%",
    },
    {
      title: "",
      dataIndex: "edit",
      width: "15%",
      render: (_, record) => (
        <div className={styles.moreIcon}>
          <MoreOutlined
            className={styles.icon}
            onClick={() => handleViewMoreOptions(record.key)}
          />
        </div>
      ),
    },
  ];

  const pendingAuthorizationColumn: TableColumnsType<UserDetails> = [
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
      dataIndex: "mobile",
      key: "mobile",
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
      title: "Staff number",
      dataIndex: "staff",
      key: "staff",
    },

    {
      title: "Actions",
      key: "actions",
      render: (record: UserDetails) => (
        <span className={styles.actionBtn}>
          <Button
            className={styles.btn}
            onClick={() => {
              router.push(
                `/statement/usermanagement/user-profile?userId=${record.username}`
              );
            }}
            icon={<EyeIcon style={{ color: "#c9c9cc" }} size={16} />}
          />
          <Button
            className={styles.btn}
            onClick={() => openModal("authorize", record.id!)}
            style={{
              background: token.default.white,
              border: `1px solid ${token.accent.success}`,
              color: token.accent.success,
            }}
            icon={<CheckOutlined size={16} />}
          />
          <Button
            className={styles.btn}
            style={{
              color: token.accent.danger,
              background: token.default.white,
              border: `1px solid ${token.accent.danger}`,
            }}
            onClick={() => {
              console.log(record);
              openModal("unauthorize", record.id!);
            }}
            icon={<CloseOutlined size={16} />}
          />
          
        </span>
      ),
    },
  ];

  const tabsItems = [
    {
      title: "Registered user",
      content: (
        <RegisterBranch columns={RegisterUserColumns} data={registeredUsers} />
      ),

    },
    {
      title: "Pending Authorization",
      content: (
        <PendingAuthorization
          columns={pendingAuthorizationColumn}
          data={pendingUsers}
          modalTitle=""
          isModalOpen={isPendingAuthorizationModalOpen}
          setIsModalOpen={setIsPendingAuthorizationModalOpen}
          modalWidth={modalWidth()}
          handleOk={handleOk}
          handleCancel={handleCancel}
          modalContentComponent={PendingModal}
          handleDelete={handleDelete}
          modalType={modalType}
          setModalType={setModalType}
        />
      ),
    },
  ];


  return (
    <div className={styles.userTab}>
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
        tabsItems={tabsItems}
        selectedTab={selectedTab}
        textColor={""}
        backgroundColor={token.border.primary}
        fontWeight={0}
      />

      <div>
        <Modal
          open={isModalVisible}
          onCancel={handleModalClose}
          footer={false}
          width={250}
        >
          {selectedKey !== null && (
            <SelectedOption
              key={selectedKey}
              selectedId={selectedKey.toString()}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default BranchUsersTable;

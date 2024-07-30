import React, { useEffect, useState, useMemo } from "react";
import styles from "./users.module.css";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import {
  CloseCircleOutlined,
  CloudDownloadOutlined,
  SearchOutlined,
  EyeOutlined,
  UserOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import DownloadWidget from "@/src/components/widgets/download-widget/download";
import TableWidget from "@/src/components/widgets/table-widget/table-widget";
import { RegisteredUserAction } from "@/src/lib/actions/registered.user.action";
import { Modal, Dropdown, Button, Menu, notification } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import AddUserButton from "@/src/components/widgets/add.user.button/add.user.button";
import { useRouter } from "next/navigation";
import { createUserHandler } from "@/src/services/usermanagement/create.user.service";
import DeactivateUser from "./(deactivateUser)/deactivate.user";
import CreationSuccess from "../permissions/(confirmsuccess)/creation.success";
import ConfirmFail from "../permissions/(confirmfailure)/confirm.failure";

type userProps = {
  customerId: number;
};

const UsersHome = ({ customerId }: userProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<RegisteredUser | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failureModalVisible, setFailureModalVisible] = useState(false);
  const [retryDeactivate, setRetryDeactivate] = useState(false);
  const router = useRouter();
  const { deactivateUserService } = createUserHandler();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<RegisteredUser[]>([]);

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  const fetchUsers = async () => {
    if (customerId !== null && customerId !== undefined) {
      setLoading(true);
      try {
        const response = await RegisteredUserAction(customerId);
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

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;

    return users.filter((user) =>
      [user.userName, user.phone, user.email].some((field) =>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  const handleMenuClick = (e: any) => {
    const { key } = e;
    const record = e.item.props["data-record"];
    console.log("Action clicked:", key, "for record:", record);
    switch (key) {
      case "view":
        router.push(
          `/statement/user-management/users/user-profile?userId=${record.username}`
        );
      break;
      case "update":
        router.push(`/statement/users/update/${record.userId}`);
        break;
      case "deactivate":
        setSelectedUser(record);
        setOpenModal(true);
        break;
      default:
        break;
    }
  };
  

  const handleDeactivate = async () => {
    if (selectedUser) {
      try {
        const response = await deactivateUserService(selectedUser.userId!);
        if (response.message === "User Deactivated Successfully") {
          setSuccessModalVisible(true);
          fetchUsers();
          handleModalClose();
        } else {
          setFailureModalVisible(true);
        }
      } catch (error) {
        console.error("Error deactivating user:", error);
        setFailureModalVisible(true);
      } finally {
        setRetryDeactivate(false);
      }
    }
  };

  useEffect(() => {
    if (retryDeactivate && selectedUser) {
      handleDeactivate();
    }
  }, [retryDeactivate]);

  const menuItems = (record: RegisteredUser) => [
    {
      key: "view",
      label: "View",
      icon: <EyeOutlined />,
      onClick: handleMenuClick,
      "data-record": record,
    },
    {
      key: "deactivate",
      label: "Deactivate",
      icon: <UserOutlined />,
      onClick: handleMenuClick,
      "data-record": record,
    },
    {
      key: "update",
      label: "Update",
      icon: <EditOutlined />,
      onClick: handleMenuClick,
      "data-record": record,
    },
  ];

  const menu = (record: RegisteredUser) => <Menu items={menuItems(record)} />;

  const userColumns: ColumnsType<RegisteredUser> = [
    {
      title: "User Name",
      dataIndex: "userName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Joined On",
      dataIndex: "createdAt",
      render: (createdAt: string) => moment(createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <Dropdown
          menu={{ items: menuItems(record) }}
          trigger={["click"]}
          dropdownRender={(menu) => (
            <div className={styles.dropDown}>
              <div className={`${styles.dropDownTitle} bodyb`}>
                Choose Action
              </div>
              {menu}
            </div>
          )}
        >
          <Button type="text" icon={<EllipsisOutlined rotate={90} />} />
        </Dropdown>
      ),
    },
  ];

  const handleSearch = (terms: string) => {
    setSearchTerm(terms);
  };

  const handleClick = () => {
    router.push("/statement/user-management/users/create-user");
  };

  const handleCancel = () => {
    setFailureModalVisible(false);
    setSelectedUser(null);
    setOpenModal(false);
  };

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
          <FilterButton onClick={handleClick} />
          <DownloadWidget>
            <DownloadWidget.Icon>
              <CloudDownloadOutlined />
            </DownloadWidget.Icon>
            <DownloadWidget.text text="Download" />
          </DownloadWidget>
          <AddUserButton
            onClick={handleClick}
            buttonStyles={{ background: "#003A49", color: "#FFFFFF" }}
          />
        </div>
      </div>
      <TableWidget columns={userColumns} data={filteredUsers} />
      <Modal
        open={openModal}
        onCancel={handleModalClose}
        footer={false}
        className={styles.modal}
        width={600}
      >
        {selectedUser && (
          <DeactivateUser
            selectedId={selectedUser.userId}
            onCancel={handleModalClose}
            firstName={selectedUser.userName.split(" ")[0]}
            lastName={selectedUser.userName.split(" ").slice(1).join(" ")}
            email={selectedUser.email}
            mobileNumber={selectedUser.phone}
            userGroups={[]}
            handleOk={handleDeactivate}
          />
        )}
      </Modal>
      <Modal
        open={successModalVisible}
        onCancel={() => setSuccessModalVisible(false)}
        footer={null}
        className={styles.modal}
        width={350}
      >
        <CreationSuccess
          title="User Deactivation Successful"
          description="The user has been successfully deactivated. Their account will be permanently deleted after 30 days. During this period, the account can be reactivated if needed."
          onClick={() => setSuccessModalVisible(false)}
        />
      </Modal>
      <Modal
        open={failureModalVisible}
        onCancel={() => setFailureModalVisible(false)}
        footer={null}
        className={styles.modal}
        width={350}
      >
        <ConfirmFail
          title="User Deactivation Failed"
          description={`There was an error while trying to deactivate the user, ${selectedUser?.userName}. Please try again`}
          onClick={() => setRetryDeactivate(true)} // Updated to setRetryDeactivate to true
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default UsersHome;

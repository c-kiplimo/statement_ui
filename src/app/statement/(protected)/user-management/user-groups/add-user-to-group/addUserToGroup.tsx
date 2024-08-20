import React, { ReactNode, useState } from "react";
import { Modal, Table, notification } from "antd";
import { ColumnsType } from "antd/es/table";
import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./addUserToGroup.module.css";
import FailureModal from "@/src/components/widgets/failure-widget/failure";
import Successful from "@/src/components/widgets/success-widget/successfull/successful";
import { fetchUseremailDetails } from "@/src/lib/actions/assign.userTo.group.action";
import { CREATEGROUPMEMBER } from "@/src/services/usermanagement/crea.group.member.service";
import { usePlatformId } from "@/src/hooks/platformId";
import { useSearchParams } from "next/navigation";
import useProfileId from "@/src/hooks/profileId";

type InviteProps = {
  title: string;
  titleDescription: string;
  typeOfInvite: string;
  handleModalCancel: () => void;
  onSuccess?: () => void;
};

export type MemberData = {
  key: string;
  username: string;
  Phone: string;
  createdOn: string;
  email: string;
  icon?: ReactNode;
};

const AddUserToGroup = ({
  title,
  titleDescription,
  typeOfInvite,
  handleModalCancel,
  onSuccess,
}: InviteProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userData, setUserData] = useState<MemberData[]>([]);
  const [searchEmail, setSearchEmail] = useState("");
  const platformId = usePlatformId();
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");
  const customerId = useProfileId();

  const showNotification = (message: string, description: ReactNode) => {
    notification.open({
      message,
      description,
      className: styles.customNotification,
      icon: null,
      style: {
        width: "max-content",
        height: "min-content",
        background: "#17D05B",
        color: "white",
      },
      closeIcon: null,
    });
  };

  const onCancel = () => {};

  const handleSearch = async () => {
    try {
      if (!searchEmail) return;

      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(searchEmail);
      if (!isValidEmail) {
        notification.error({
          message: "Invalid Email Format",
        });
        return;
      }

      const data = await fetchUseremailDetails(searchEmail, customerId!, 0, 10);

      if (data.length > 0) {
        setUserData((prevData) => [...prevData, ...data]);
      } else {
        notification.error({
          message: "Email Not Found!",
        });
      }
      setSearchEmail("");
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      setIsModalVisible(true);
    }
  };

  const handleDelete = (key: string) => {
    setUserData((prevData) => prevData.filter((user) => user.key !== key));
    showNotification(
      "",
      <Successful>
        <Successful.Icon style={{ color: "#17D05B" }}>
          <CheckOutlined />
        </Successful.Icon>
        <Successful.Text text={`User has been removed successfully`} />
        <Successful.Icon
          style={{
            color: "white",
            background: "none",
            justifyContent: "flex-end",
          }}
        >
          <CloseOutlined onClick={onCancel} />
        </Successful.Icon>
      </Successful>
    );
  };

  const handleInviteUser = async () => {
    try {
      if (!groupId) return;

      if (userData.length === 0) {
        notification.info({
          message: "No Users to Invite",
          description:
            "Please select a user to invite.",
        });
        return;
      }

      const userPayload = {
        groupId: parseInt(groupId),
        platformId,
      };

      for (const user of userData) {
        await CREATEGROUPMEMBER(user.key, userPayload);
        showNotification(
          "",
          <Successful>
            <Successful.Icon style={{ color: "#17D05B" }}>
              <CheckOutlined />
            </Successful.Icon>
            <Successful.Text
              text={`User ${user.username} has been invited successfully`}
            />
            <Successful.Icon
              style={{
                color: "white",
                background: "none",
                justifyContent: "flex-end",
              }}
            >
              <CloseOutlined onClick={onCancel} />
            </Successful.Icon>
          </Successful>
        );
      }

      setUserData([]);
      handleModalCancel();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Failed to invite user:", error);
      setIsModalVisible(true);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleTryAgain = () => {
    setIsModalVisible(false);
    handleInviteUser();
  };

  const columns: ColumnsType<MemberData> = [
    {
      title: "User Name",
      dataIndex: "username",
      render: (text: string) => (
        <span className={`${styles.groupStyles} bodyr`}>{text}</span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      render: (text: string) => (
        <div className={`${styles.selectdiv} bodyr`}>{text}</div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text: string) => (
        <div className={`${styles.tags} bodyr`}>{text}</div>
      ),
    },
    {
      title: "Created On",
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
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.haed}>
          <div className={`${styles.title} h4b`}>{title}</div>
          <div className={`${styles.titleDescription} h6r`}>
            {titleDescription}
          </div>
        </div>
        <div className={styles.input}>
          <div className={styles.inviteBy}>{typeOfInvite}</div>
          <div className={styles.inputStyle}>
            <input
              type="email"
              required
              placeholder="Enter user's email"
              className={styles.inputdiv}
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
            />
            <button className={`${styles.adduserButton} bodyr`} onClick={handleSearch}>
              Add User <PlusOutlined />
            </button>
          </div>
        </div>
        <div className={styles.table}>
          <Table
            className={styles.antdtable}
            columns={columns}
            dataSource={userData}
            size="middle"
            pagination={false}
          />
        </div>
        <div className={styles.buttons}>
          <button
            className={`${styles.canceButton} bodym`}
            onClick={handleModalCancel}
          >
            Cancel
          </button>
          <button
            className={`${styles.inviteButton} bodyr`}
            onClick={handleInviteUser}
          >
            Invite User
          </button>
        </div>
      </div>

      <Modal
        visible={isModalVisible}
        width={"max-content"}
        onCancel={handleCancel}
        footer={null}
      >
        <FailureModal
          onCancelClick={handleCancel}
          onTryAgainClick={handleTryAgain}
        >
          <FailureModal.Icon>
            <img src={"/warning.svg"} width={56} height={56} alt="warning" />
          </FailureModal.Icon>
          <FailureModal.title title="Error Inviting User" />
          <FailureModal.description description="There was an error inviting the user to the group. Please try again later." />
        </FailureModal>
      </Modal>
    </div>
  );
};

export default AddUserToGroup;

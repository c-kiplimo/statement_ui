import React, { ReactNode, useState } from "react";
import { Modal, Table, notification } from "antd";
import { ColumnsType } from "antd/es/table";
import { CheckOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./addUserToGroup.module.css";
import FailureModal from "@/src/components/widgets/failure-widget/failure";
import Successful from "@/src/components/widgets/success-widget/successfull/successful";

type InviteProps = {
  title: string;
  titleDescription: string;
  typeOfInvite: string;
};

type MembersData = {
  key: string;
  username: string;
  Phone: string;
  createdOn: string;
  email: string;
  icon: ReactNode;
};

const AddUserToGroup = ({
  title,
  titleDescription,
  typeOfInvite,
}: InviteProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const filteredData: MembersData[] = [
    {
      key: "1",
      username: "JohnDoe",
      Phone: "+1234567890",
      createdOn: "2024-07-30T10:00:00Z",
      email: "john.doe@example.com",
      icon: <img src="/bin.svg" alt="Delete" />,
    },
    {
      key: "2",
      username: "JaneSmith",
      Phone: "+0987654321",
      createdOn: "2024-07-29T14:30:00Z",
      email: "jane.smith@example.com",
      icon: <img src="/bin.svg" alt="Delete" />,
    },
    {
      key: "3",
      username: "AliceJohnson",
      Phone: "+1122334455",
      createdOn: "2024-07-28T09:15:00Z",
      email: "alice.johnson@example.com",
      icon: <img src="/bin.svg" alt="Delete" />,
    },
    {
      key: "4",
      username: "BobBrown",
      Phone: "+5566778899",
      createdOn: "2024-07-27T16:45:00Z",
      email: "bob.brown@example.com",
      icon: <img src="/bin.svg" alt="Delete" />,
    },
  ];

  const handleDelete = (key: string) => {
  
  };

  const columns: ColumnsType<MembersData> = [
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

  const handleInviteUser = () => {

    const inviteUser = async () => {
      try {
        const success = true; 
        if (success) {
          notification.open({
            message: '',
            description: (
              <Successful>
                <Successful.Icon style={{ color: "#17D05B" }}><CheckOutlined /></Successful.Icon>
                <Successful.Text text="User Mbabazi Abia has been invited successfully" />
              </Successful>
            ),
            className:styles.customNotification,
            icon: null, 
            style: { width: '460px', height: '99px' },
            closeIcon:null
          });
        } else {
          setIsModalVisible(true);
        }
      } catch (error) {
        setIsModalVisible(true);
      }
    };

    inviteUser();
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.cancel}></div>
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
              type="text"
              placeholder="Enter users email"
              className={styles.inputdiv}
            />
            <button className={styles.adduserButton}>
              Add user <PlusOutlined />
            </button>
          </div>
        </div>
        <div className={styles.table}>
          <Table
            className={styles.antdtable}
            columns={columns}
            dataSource={filteredData}
            size="middle"
            pagination={false}
          />
        </div>
        <div className={styles.buttons}>
          <button className={`${styles.canceButton} bodym`}>Cancel</button>
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
        width={"57%"}
        onCancel={handleModalCancel}
        footer={null}
      >
        <FailureModal>
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

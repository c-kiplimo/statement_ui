import React, { ReactNode,  useState } from "react";
import { Modal, notification, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./add-user-group.module.css";
import Image from "next/image";
import moment from "moment";
import { UserGroupData } from "../user-group-data/user-groups-data";
import Texter from "@/src/components/atoms/text/texter";
import { useSearchParams } from "next/navigation";
import { usePlatformId } from "@/src/hooks/platformId";
import Successful from "@/src/components/widgets/success-widget/successfull/successful";
import FailureModal from "@/src/components/widgets/failure-widget/failure";
import { CREATEGROUPMEMBER } from "@/src/services/usermanagement/crea.group.member.service";
import useProfileId from "@/src/hooks/profileId";
import { searchGroupsData } from "@/src/lib/actions/user.groups.action";

type AddUserProps = {
  userId: string;
  title: string;
  titleDescription: string;
  typeOfInvite: string;
  onCancel: () => void;
  onSuccess: () => void;
};

const AddUserToGroup = ({
  userId,
  title,
  titleDescription,
  typeOfInvite,
  onCancel,
  onSuccess
}: AddUserProps) => {
  const profId =useProfileId();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [groupData, setGroupData] = useState<UserGroupData[]>([]);
  const [searchGroup, setSearchGroup] = useState("");
  const platformId = usePlatformId();

  const showNotification = (message: string, description: ReactNode) => {
    notification.open({
      message,
      description,
      icon: null,
      style: {
        width: "460px",
        height: "80px",
        background: "#17D05B",
        color: "white",
      },
      closeIcon: null,
    });
  };

  const handleSearch = async () => {
    let customerId ="";

    if(profId !== null && profId !== undefined) {
      customerId=profId.toString();
    }
    console.log(customerId)
    try {
      if (!searchGroup) return;
      const data = await searchGroupsData(customerId, platformId.toString(), 0, 1,searchGroup);
      console.log(data)
      if (data.length > 0) {
        setGroupData((prevData) => [...prevData, ...data]);
        console.log(groupData)
      } else {
        showNotification(
          "Group Not Found!!",
          <img src="/warning.svg" width={35} height={15} alt="warning" />
        );
      }
      setSearchGroup("");
      console.log(searchGroup)
    } catch (error) {
      console.error("Failed to fetch group details:", error);
      setIsModalVisible(true);
    }
  };

  const handleSuccess = () => {
    onSuccess();
    onCancel();
  };

  const handleAddUser = async () => {
    try {
      const userPayloads = groupData.map((group) => ({
        groupId: Number(group.groupId),
        platformId: platformId,
      }));
  
      for (const payload of userPayloads) {
        await CREATEGROUPMEMBER(userId, payload);
      }
  
      notification.success({
        message: "User successfully added to the selected groups",
      });
      handleSuccess()
      setGroupData([]);
    } catch (error) {
      console.error("Error adding user to group:", error);
      setIsModalVisible(true);
    }
  };
  
  const handleDelete = (key: string) => {
    setGroupData((prevData) => prevData.filter((group) => group.key !== key));
    showNotification(
      "",
      <Successful>
        <Successful.Icon style={{ color: "#17D05B" }}>
          <CheckOutlined />
        </Successful.Icon>
        <Successful.Text text={`Group has been removed successfully`} />
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
    console.log("Delete user with key:", key);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleTryAgain = () => {
    setIsModalVisible(false);
    handleAddUser();
  };

  const columns: ColumnsType<UserGroupData> = [
    {
      title: "Group Name",
      dataIndex: "groupName",
      render: (text: string) => (
        <span className={`${styles.groupStyles} bodyr`}>{text}</span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text: string) => (
        <div className={`${styles.selectdiv} bodyr`}>{text}</div>
      ),
    },
    {
      title: "Date Created",
      dataIndex: "createdOn",
      render: (createdOn: string) => {
        const date = moment(createdOn).format("DD-MM-YYYY");
        return (
          <div className={styles.date}>
            <div className={`${styles.dateStyles} bodyr`}>{date}</div>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <button
          className={styles.deleteBtn}
          aria-label="Delete user"
          onClick={() => handleDelete(record.key)}
        >
          <Image src="/bin.svg" alt="Delete button" width={16} height={16} />
        </button>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Texter text={title} className={`${styles.title} bm1`} />
        <Texter
          text={titleDescription}
          className={`${styles.description} br1`}
        />
      </div>
      <div className={styles.input}>
        <Texter text={typeOfInvite} className={`${styles.inputTitle} bodyr`} />
        <div className={styles.inputStyle}>
          <input
            type="text"
            required
            placeholder="Enter group name"
            className={styles.inputdiv}
            value={searchGroup}
            onChange={(e) => setSearchGroup(e.target.value)}
          />
          <button className={styles.adduserButton} onClick={handleSearch}>
            Add group <PlusOutlined />
          </button>
        </div>
      </div>
      <div className={styles.table}>
        <Table
          className={`${styles.antdtable} bodyr`}
          columns={columns}
          dataSource={groupData}
          size="middle"
          pagination={false}
        />
        <div className={styles.buttons}>
          <button className={`${styles.canceButton} bodym`} onClick={onCancel}>
            Cancel
          </button>
          <button
            className={`${styles.addButton} bodyr`}
            onClick={handleAddUser}
          >
            Add Group
          </button>
        </div>
      </div>
      <Modal
        visible={isModalVisible}
        className={styles.modal}
        width={"30%"}
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
          <FailureModal.title title="Error Assigning user to group" />
          <FailureModal.description description="There was an error assigning user to the group. Please try again later." />
        </FailureModal>
      </Modal>
    </div>
  );
};

export default AddUserToGroup;
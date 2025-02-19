import React, { useEffect, useMemo, useState } from "react";
import styles from "./user-groups-data.module.css";
import { Modal, notification, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import Image from "next/image";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import {
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Button from "@/src/components/atoms/buttons/button";
import { fetchUserGroupsAction } from "@/src/lib/actions/fetch.groups.action";
import AddUserToGroup from "../add-user-group/add-user-group";
import RemoveUser from "../../../(removeUser)/removeUser";
import ConfirmFail from "../../../../permissions/(confirmfailure)/confirm.failure";
import GroupsHandler from "@/src/services/usermanagement/usergroups.services";

export interface UserGroupData {
  key: string;
  groupId:string;
  groupName: string;
  description: string;
  createdOn: string;
  joinedOn?: string;
}

type userGroupProps = {
  userId: string;
  platformId: number;
};

const UserGroups = ({ userId, platformId }: userGroupProps) => {
  const handler = GroupsHandler();
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState<UserGroupData[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<UserGroupData>({
    groupId: "",
    key: "",
    groupName: "",
    description: "",
    createdOn: "",
    joinedOn: "",
  });
  
  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const data = await fetchUserGroupsAction(userId);
          setGroups(data);
        } catch (error) {
          console.error("Error fetching groups data:", error);
        }
      };
      fetchData();
    }
  }, [userId]);

  console.log(groups);

  const groupsColumns: ColumnsType<UserGroupData> = [
    {
      title: "Group Name",
      dataIndex: "groupName",
      render: (text: string) => (
        <span className={`${styles.rowStyles} bodyr`}>{text}</span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text: string) => (
        <span className={`${styles.rowStyles} bodyr`}>{text}</span>
      ),
    },
    {
      title: "Date Created",
      dataIndex: "createdOn",
      render: (createdOn: string) => moment(createdOn).format("DD-MM-YYYY"),
    },
    {
      title: "Joined On",
      dataIndex: "joinedOn",
      render: (joinedOn: string) => moment(joinedOn).format("DD-MM-YYYY"),
    },
    {
      title: "",
      dataIndex: "action",
      render: (_, record) => (
        <div
          className={styles.actionBtn}
          onClick={() => handleDelete(record)}
        >
          <Image
            src="/DeleteOutlined.svg"
            alt="Delete button"
            width={16}
            height={16}
          />
        </div>
      ),
    },
  ];

  const handleSearch = (terms: string) => {
    setSearchTerm(terms);
  };

  const filteredGroup = useMemo(() => {
    return groups.filter((item) => {
      return Object.values(item).some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, groups]);

  const handleAddUser = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };
  
  const handleGroupAssignmentSuccess = () => {
    setOpenModal(false);
    const fetchData = async () => {
      try {
        const data = await fetchUserGroupsAction(userId);
        setGroups(data);
      } catch (error) {
        console.error("Error fetching groups data:", error);
      }
    };
    fetchData();
  };

  const handleModalVisible = () => {
    setModalOpen(false);
  };

  const handleDelete = (group: UserGroupData) => {
    setSelectedGroup(group);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await handler.deleteGroupMembers(platformId.toString(), selectedGroup.groupId, userId);
      notification.success({
        message: "The group has been successfully removed",
      });
      setModalOpen(false);
      setGroups(groups.filter(group => group.groupName !== selectedGroup.groupName));
    } catch (error) {
      setModalOpen(false);
      setErrorModalVisible(true);
    }
  };

  const handleRetry = () => {
    setErrorModalVisible(false);
    handleConfirmDelete();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <VerticalInfoDescription
          title={"Assigned Groups"}
          titleStyle={{ fontWeight: "700", fontSize: "20px" }}
        />
        <div className={styles.buttons}>
          <SearchButton>
            <SearchButton.Icon>
              <SearchOutlined size={16} />
            </SearchButton.Icon>
            <SearchButton.Input text="Search" onSearch={handleSearch} />
          </SearchButton>
          <Button
            onClick={handleAddUser}
            buttonStyle={{
              background: "#003A49",
              color: "#FFFFFF",
            }}
          >
            <Button.Icon>
              <PlusOutlined />
            </Button.Icon>
            <Button.Text title="Add user to a group" />
          </Button>
        </div>
      </div>
      <div className={styles.table}>
        <Table
          columns={groupsColumns}
          dataSource={filteredGroup}
          size="middle"
          pagination={{
            pageSize: pageSize,
            showSizeChanger: true,
            onShowSizeChange: (_, size) => setPageSize(size),
          }}
        />
      </div>
      <Modal
        open={openModal}
        onCancel={handleModalClose}
        footer={false}
        className={styles.modal}
        width={"max-content"}
      >
        <AddUserToGroup
          userId={userId}
          title={"Platform Members Management"}
          titleDescription={
            "Are you sure you want to assign user to a group. Please review the details before proceeding."
          }
          typeOfInvite={"Search by group name"}
          onCancel={handleModalClose}
          onSuccess={handleGroupAssignmentSuccess}
        />
      </Modal>
      <Modal
        open={modalOpen}
        onCancel={handleModalVisible}
        footer={false}
        className={styles.modal}
        width={"max-content"}
      >
        <RemoveUser
          onCancel={handleModalVisible}
          handleOk={handleConfirmDelete}
          groupName={selectedGroup.groupName}
          description={selectedGroup.description}
        />
      </Modal>
    </div>
  );
};

export default UserGroups

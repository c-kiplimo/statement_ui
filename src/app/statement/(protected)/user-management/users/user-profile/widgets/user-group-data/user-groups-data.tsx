import React, { useEffect, useMemo, useState } from "react";
import styles from './user-groups-data.module.css'
import { notification, Modal, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import Image from "next/image";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import {
  CloudDownloadOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import DownloadWidget from "@/src/components/widgets/download-widget/download";
import Button from "@/src/components/atoms/buttons/button";
import { fetchUserGroups
  }
    from "@/src/lib/actions/fetch.groups.action";
import AddUserToGroup from "../add-user-group/add-user-group";
import RemoveUser from "../../../(removeUser)/removeUser";
import ConfirmFail from "../../../../permissions/(confirmfailure)/confirm.failure";

export interface UserGroupData {
  key: string;
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
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState<UserGroupData[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<{
    groupName: string;
    description: string;
  }>({ groupName: "", description: "" });

  useEffect(() => {
    if (userId && platformId) {
      const fetchData = async () => {
        try {
          const data = await fetchUserGroups(
            userId,
            platformId.toString(),
            0,
            10
          );
          setGroups(data);
        } catch (error) {
          console.error("Error fetching groups data:", error);
        }
      };
      fetchData();
    }
  }, [userId, platformId]);

  console.log(groups);

  const groupsColumns: ColumnsType<UserGroupData> = [
    {
      title: "Group Name",
      dataIndex: "groupName",
    },
    {
      title: "Description",
      dataIndex: "description",
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
          onClick={() => handleDelete(record.groupName, record.description)}
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

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleModalVisible = () => {
    setModalOpen(false);
  };

  const handleDelete = (groupName: string, description: string) => {
    setSelectedGroup({ groupName, description });
    setModalOpen(true);
  };

  const handleClick = () => {
    setOpenModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // await removeUserFromGroup(userId, selectedGroup.groupName); 
      // Assuming you have this API call defined
      // notification.success({
      //   message: "The group has been successfully removed",
      // });
      setModalOpen(false);
      setErrorModalVisible(true);
      // Optionally, refresh the group list here
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
          <FilterButton onClick={handleClick} />
          <DownloadWidget>
            <DownloadWidget.Icon>
              <CloudDownloadOutlined />
            </DownloadWidget.Icon>
            <DownloadWidget.text text="Download" />
          </DownloadWidget>
          <Button
            onClick={handleClick}
            buttonStyle={{
              background: "#003A49",
              color: "#FFFFFF",
              width: "192px",
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
        width={600}
      >
        <AddUserToGroup onCancel={handleModalClose} handleOk={() => {}} />
      </Modal>
      <Modal
        open={modalOpen}
        onCancel={handleModalVisible}
        footer={false}
        className={styles.modal}
        width={600}
      >
        <RemoveUser
          onCancel={handleModalVisible}
          handleOk={handleConfirmDelete}
          groupName={selectedGroup.groupName}
          description={selectedGroup.description}
        />
      </Modal>
      <Modal
        open={errorModalVisible}
        onCancel={() => setErrorModalVisible(false)}
        footer={false}
        className={styles.modal}
        width={600}
      >
        <ConfirmFail
          title="Error Removing User"
          description="There was an error Removing the user from the group. Please try again later"
          onClick={handleRetry}
          onCancel={() => setErrorModalVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default UserGroups;

import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./user-group-branch.module.css";
import { CustomerUserGroupsAction} from "@/src/lib/actions/customer.user.groups.action";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Modal, Table, notification } from "antd";
import PrimaryButton from "@/src/components/atoms/button/primary-button/primary-button";
import moment from "moment";
import { deleteIcon, editIcon } from "@/src/components/atoms/svg/document_svg";
import { useTokens } from "@/src/app/(context)/ColorContext";
import { ColumnsType } from "antd/es/table";
import { deleteUserGroupAction } from "@/src/lib/actions/deleteUserGroup.action";

type GroupProps = {
    customerId: string;
    setActive: (active: boolean) => void;
  };

  const UserGroupBranch = ({ customerId, setActive }: GroupProps) => {
    const [customerData, setCustomerData] = useState<DataFetcher[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const token = useTokens();
  
    useEffect(() => {
      const fetchData = async () => {
        if (customerId !== undefined) {
          try {
            const data = await CustomerUserGroupsAction(parseInt(customerId));
            setCustomerData(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      };
      fetchData();
    }, [customerId]);
  
    const handleSearch = (terms: any) => {
      setSearchTerm(terms);
      console.log("search-terms", searchTerm);
    };
  
    const handleDelete = async () => {
      if (selectedGroupId !== null) {
        try {
          const response = await deleteUserGroupAction(selectedGroupId);
          console.log(response)
          notification.success({
            message: "Success",
            description: "The user group was deleted successfully.",
          });
          setCustomerData(prevData => prevData.filter(group => group.id !== selectedGroupId));
          setIsModalOpen(false); 
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Error deleting group:", error.message);
          } else {
            console.error("Error deleting group: Unknown error");
          }
        }
      }
    };
  
    const columns: ColumnsType<DataFetcher> = [
      {
        title: "Group Name",
        dataIndex: "userName",
        key: "groupName",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Date Created",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (createdAt: string) => moment(createdAt).format("DD-MM-YYYY HH:MM"),
      },
      {
        title: "Joined On",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (createdAt: string) => moment(createdAt).format("DD-MM-YYYY"),
      },
      {
        title: "",
        key: "actions",
        render: (record: DataFetcher) => (
          <div className={styles.actionBtn}>
            <PrimaryButton
              buttonType="default"
              // iconPosition="right"
              shape="default"
              size="small"
              icon={editIcon}
              customStyles={{
                background: token.default.white,
                color: token.default.grey,
              }}
              // onClick={() => handleEdit(record.id!)}
            />
            <PrimaryButton
              buttonType="default"
              // iconPosition="right"
              shape="default"
              size="small"
              icon={deleteIcon}
              customStyles={{
                background: token.default.white,
              }}
              onClick={() => {
                setSelectedGroupId(Number(record.id));  // Set the selected group id
                setIsModalOpen(true);  // Open the modal
              }}
            />
          </div>
        ),
      },
    ];
  
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.tableHeader}>
            <UserGroupBranch.Search onSearch={handleSearch} />
            <button
              className={`${styles.groupBtn} bodyr`}
              onClick={() => {
                setActive(true);
              }}
            >
              Add New Group
            </button>
          </div>
        </div>
        <div className={styles.table}>
          <Table
            pagination={{
              pageSize: 5,
              itemRender: (current, type, originalElement) => {
                if (type === "page") {
                  return <span style={{ margin: "0 8px" }}>{current}</span>;
                }
                return originalElement;
              },
              style: {
                display: "flex",
                textAlign: "center",
              },
            }}
            style={{ marginTop: "15px", width: "100%" }}
            columns={columns}
            dataSource={customerData}
          />
        </div>
        <UserGroupBranch.ConfirmModal
        visible={isModalOpen}
        onConfirm={handleDelete}
        onCancel={() => setIsModalOpen(false)}
        title="Remove Group"
        description="Are you sure you want to delete this group?"
      />
      </div>
    );
  };
  
  export default UserGroupBranch;
  
  type SearchInputProps = {
    onSearch: (searchTerm: string) => void;
  };
  
  UserGroupBranch.Search = ({ onSearch }: SearchInputProps) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const searchTerm = event.target.value;
      onSearch(searchTerm);
    };
  
    return (
      <div className={styles.searchContainer}>
        <input
          className={`${styles.searchInput} captionr`}
          type="text"
          placeholder="Search"
          onChange={handleInputChange}
        />
        <SearchOutlined size={8} />
      </div>
    );
  };

type ConfirmModalProps = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
};

UserGroupBranch.ConfirmModal= ({ visible, onConfirm, onCancel, title, description }:ConfirmModalProps) => {
  return (
    <Modal
        className={styles.modal}
      title={title}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel} className={styles.noButton}>
          No
        </Button>,
        <Button key="submit" type="primary" onClick={onConfirm} className={styles.yesButton}>
          Yes
        </Button>,
      ]}
    >
      <p>{description}</p>
    </Modal>
  );
};


import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { Modal, Table } from "antd";
import styles from "./user-group.module.css";
import GroupDetails from "@/src/components/widgets/user-management/tabs/user-group/group-details/group-details";
import { SearchOutlined } from "@ant-design/icons";
import { useTokens } from "@/src/app/(context)/ColorContext";
import moment from "moment";
import { deleteIcon, editIcon } from "@/src/components/atoms/svg/document_svg";
import PrimaryButton from "@/src/components/atoms/button/primary-button/primary-button";
import { ColumnsType } from "antd/es/table";
import { GroupHandler } from "@/src/services/usermanagement/user.goups.service";
import classNames from "classnames";
import useProfileId from "@/src/hooks/profileId";
import EditRolesStepper from "@/src/app/statement/(protected)/usermanagement/page-components/edit-roles/edit-roles-stepper/edit-roles-stepper";

const UserGroup = React.memo(({ setActive }: any) => {
  const profId = useProfileId();
  const [customerData, setCustomerData] = useState<customerInfo | null>(null);
  const { fetchCustomerData } = GroupHandler();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);   
  const fetchCustomerDetails = async () => {
    if (profId !== null && profId !== undefined) {
      try {
        const response = await fetchCustomerData(profId);
        setCustomerData(response);
        console.log("Customer Data", response);
      } catch (error) {
        console.error("Failed to fetch customer data:", error);
      }
    }
  };

  useEffect(() => {
    fetchCustomerDetails();
  }, [profId]);

  const handleSearch = (terms: any) => {
    setSearchTerm(terms);
    console.log("search-terms", searchTerm);
  };

  const handleGroupSelection = (groupId: number) => {
    setSelectedGroupId(groupId); 
  };

  return (
    <div className={styles.container}>
      {selectedGroupId !== null ? (
          <EditRolesStepper groupId={selectedGroupId} />
        ):(
          <Fragment>
            <div className={styles.groupDetails}>
        {customerData && (
          <GroupDetails
            userName={customerData.payload.customerName}
            userId={customerData.payload.customerId.toString()}
            userType={customerData.payload.customerGroup}
            country={customerData.payload.country}
            town={customerData.payload.branch}
            email={customerData.payload.email}
            mobileNumber={customerData.payload.mobileNumber}
            customerStatus={customerData.payload.customerStatus}
          />
        )}
      </div>
      <div className={styles.tableFrame}>
        <div className={styles.tableHeader}>
          <div className={styles.tableSearch}>
            <Search onSearch={handleSearch} />
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
        <DisplayTable onGroupSelect={handleGroupSelection} setSelectedGroupId={setSelectedGroupId}/>        
      </div>
          </Fragment>
        )}
      
    </div>
  );
});

export default UserGroup;

type SearchInputProps = {
  onSearch: (searchTerm: string) => void;
};

const Search = ({ onSearch }: SearchInputProps) => {
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

type DisplayTableProps = {
  onGroupSelect: (groupId: number) => void;
  setSelectedGroupId: (groupId: number | null) => void;
};

const DisplayTable = ({onGroupSelect,setSelectedGroupId}:DisplayTableProps) => {
  const token = useTokens();
  const [data, setData] = useState<UserGroup[]>([]);
  const { fetchUserGroups } = GroupHandler();
  const profId = useProfileId();

  useEffect(() => {
    const fetchGroupData = async () => {
      if (profId !== null && profId !== undefined) {
        try {
          const response = await fetchUserGroups(profId);
          setData(response);
          console.log("Table Data", response);
        } catch (error) {
          console.error("Failed to fetch user groups:", error);
        }
      }
    };

    fetchGroupData();
  }, [profId]);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<UserGroup | null>(null);
  const [hoveredButton, setHoveredButton] = useState<
    "confirm" | "cancel" | null
  >(null);

  const handleEdit = (groupId: number) => {
    setSelectedGroupId(groupId);
  };

  const handleMouseEnter = (buttonType: "confirm" | "cancel") => {
    setHoveredButton(buttonType);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const handleDelete = (record: UserGroup) => {
    setCurrentRecord(record);
    setDeleteModalVisible(true);
  };

  const handleDeleteOk = () => {
    setDeleteModalVisible(false);
  };

  const handleCancel = () => {
    setDeleteModalVisible(false);
  };


  const columns: ColumnsType<UserGroup> = [
    {
      title: "Group Name",
      dataIndex: "groupName",
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
      render: (createdAt: string) =>
        moment(createdAt).format("DD-MM-YYYY HH:MM"),
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
      render: (record: UserGroup) => (
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
            onClick={() => handleEdit(record.groupId!)}
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
            onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      <div className={styles.table}>
        <Table
          pagination={{
            pageSize: 10,
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
          dataSource={data}
          onRow={(record) => ({
            onClick: () => {
              onGroupSelect(record.groupId!); 
            },
          })}
        />
      </div>      
      <Modal
        className={styles.modal}
        footer={null}
        visible={deleteModalVisible}
        onOk={handleDeleteOk}
        onCancel={handleCancel}
      >
        <div className={styles.modalContainer}>
          <div className={styles.modalDesc}>
            <div className={styles.textField}>
              <span className={`${styles.title} h6m`}>Remove Group</span>
              <span className={`${styles.titleDesc} bodyr`}>
                Are you sure you want to delete this group?
              </span>
            </div>
          </div>
          <div className={styles.button}>
            <button
              className={classNames(styles.btn, {
                [styles.activeBtn]: hoveredButton === "cancel",
              })}
              onMouseEnter={() => handleMouseEnter("cancel")}
              onMouseLeave={handleMouseLeave}
              onClick={handleCancel}
            >
              No
            </button>
            <button
              className={classNames(styles.btn, {
                [styles.activeBtn]: hoveredButton === "confirm",
              })}
              onMouseEnter={() => handleMouseEnter("confirm")}
              onMouseLeave={handleMouseLeave}
              onClick={handleDeleteOk}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};

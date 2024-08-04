import React, { useState, useMemo, useEffect } from "react";
import { Button, Dropdown, Menu, Modal, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  CloudDownloadOutlined,
  DeleteFilled,
  EditFilled,
  EyeOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined
} from "@ant-design/icons";
import styles from "./groups.module.css";
import AddItems from "@/src/components/widgets/add-item-widget/add.item";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import DownloadWidget from "@/src/components/widgets/download-widget/download";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import { fetchGroupsData } from "@/src/lib/actions/user.groups.action";
import useProfileCreated from "@/src/hooks/useProfileCreated";
import { usePlatformId } from "@/src/hooks/platformId";
import DeleteGroup from "./delete-group/delete.group";
import CreateUserroups from "../../usermanagement/user-groups-home-page/create-user-groups-form/create.user.groups";
import useProfileId from "@/src/hooks/profileId";
import { useRouter } from "next/navigation";

export interface GroupData {
  key: string;
  userName: string;
  description: string;
  createdOn: string;
  onClick?: () => void;
}

const UserGroupsHomePage: React.FC = () => {
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupsData, setGroupsData] = useState<GroupData[]>([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [createGroupModalVisible, setCreateGroupModalVisible] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const custId = useProfileId();
  const platformId = usePlatformId();  
  const router = useRouter();

  useEffect(() => {
    if (custId && platformId) {
      const fetchData = async () => {
        try {
          const data = await fetchGroupsData(custId.toString(), platformId.toString(), 0, 10);
          setGroupsData(data);
        } catch (error) {
          console.error("Error fetching groups data:", error);
        }
      };
      fetchData();
    }
  }, [custId, platformId]);

  const handleMenuClick = (e: any, groupId: string) => {
    if (e.key === "3") {
      setSelectedGroupId(groupId);
      setDeleteModalVisible(true);
    }

    else if (e.key==="2"){
      setSelectedGroupId(groupId)
      router.push (`/statement/user-management/user-groups/tabs?groupId=${groupId}`)
    }
     else if (e.key==="4"){
      setSelectedGroupId(groupId)
      router.push(`/statement/user-management/user-groups/update-user-group?groupId=${groupId}`)
     }

     else{
      return
     }
  };

  const columns: ColumnsType<GroupData> = [
    {
      title: "Groups",
      dataIndex: "userName",
      render: (text: string) => (
        <span className={`${styles.groupStyles} bodyr`}>{text}</span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (text: string) => (
        <span className={`${styles.groupStyles} bodyr`}>{text}</span>
      ),
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
      render: (text: string) => (
        <span className={`${styles.groupStyles} bodyr`}>{text}</span>
      ),
    },
    {
      title: "",
      dataIndex: "icon",
      render: (text: string, record: GroupData) => (
        <div className={styles.icons}>
          <Dropdown
            overlay={
              <Menu onClick={(e) => handleMenuClick(e, record.key)}>
                <Menu.Item key="1">
                  <h1 className={`bodyb`}>Choose Action</h1>
                </Menu.Item>
                <hr />
                <Menu.Item key="2">
                  <Button type="text">
                    <span className={`${styles.menu}`}>
                      <EyeOutlined /> <span className={`bodyr`}>View</span>
                    </span>
                  </Button>
                </Menu.Item>
                <Menu.Item key="3">
                  <Button type="text" style={{ background: 'none' }}>
                    <span className={`${styles.menu}`}>
                      <DeleteFilled /> <span className={`bodyr`}>Delete</span>
                    </span>
                  </Button>
                </Menu.Item>
                <Menu.Item key="4">
                  <Button type="text">
                    <span className={`${styles.menu}`}>
                      <EditFilled /> <span className={`bodyr`}>Update</span>
                    </span>
                  </Button>
                </Menu.Item>
              </Menu>
            }
            trigger={["click"]}
            placement="bottom"
          >
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        </div>
      ),
    },
  ];

  const handleDeleteModalCancel = () => {
    setDeleteModalVisible(false);
  };


  const handleCreateGroupModalOpen = () => {
    router.push("/statement/user-management/user-groups/create-user-groups-form")
  };

  const handleCreateGroupModalCancel = () => {
    setCreateGroupModalVisible(false);
  }
  const handleSuccessfulDeletion = () => {
    setDeleteModalVisible(false);
    setGroupsData(prevData => prevData.filter(group => group.key !== selectedGroupId));
  };

  
  const handleSearch = (terms: string) => {
    setSearchTerm(terms);
  };

  const filteredData = useMemo(() => {
    return groupsData.filter((item) => {
      return Object.values(item).some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, groupsData]);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.headDiv}>
          <div className={`${styles.title} h6b`}>Group</div>
          <div className={styles.buttonsDiv}>
            <SearchButton>
              <SearchButton.Icon>
                <SearchOutlined />
              </SearchButton.Icon>
              <SearchButton.Input text="Search" onSearch={handleSearch} />
            </SearchButton>
            <FilterButton onClick={() => {}} />
            <DownloadWidget>
              <DownloadWidget.Icon>
                <CloudDownloadOutlined />
              </DownloadWidget.Icon>
              <DownloadWidget.text text="Download" />
            </DownloadWidget>
            <AddItems
              onClick={handleCreateGroupModalOpen} 
              buttonStyles={{ backgroundColor: "#003A49", color: "white" }}
            >
              <AddItems.Icon>
                <PlusOutlined />
              </AddItems.Icon>
              <AddItems.Text text="Add Group " />
            </AddItems>
          </div>
        </div>
        <div className={styles.body2}>
          <Table
            columns={columns}
            dataSource={filteredData}
            size="middle"
            pagination={{
              pageSize: pageSize,
              showSizeChanger: true,
              onShowSizeChange: (_, size) => setPageSize(size),
            }}
          />
        </div>
      </div>
            <Modal
        open={createGroupModalVisible} 
        footer={null}
        width={"38%"}
        onCancel={handleCreateGroupModalCancel} 
      >
        <CreateUserroups />
      </Modal>
          <Modal
          open={deleteModalVisible}
          onCancel={handleDeleteModalCancel}
          width={700}
          footer={false}
          >
            <DeleteGroup groupId={selectedGroupId!} onCancel={handleDeleteModalCancel} onSuccessfulDeletion={handleSuccessfulDeletion}
            />
          </Modal>
    </div>
  );
};

export default UserGroupsHomePage;

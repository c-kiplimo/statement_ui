import React, { useState, useMemo, useEffect } from "react";
import { Button, Dropdown, Menu,Table } from "antd";
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

export interface GroupData {
  key: string;
  userName: string;
  description: string;
  createdOn: string;
  onClick?: () => void;
}

const dummyData: GroupData[] = [
  {
    key: "1",
    userName: "Group A",
    description: "Description for Group A",
    createdOn: "2022-03-10",
  },
  {
    key: "2",
    userName: "Group B",
    description: "Description for Group B",
    createdOn: "2022-03-10",
  },
  {
    key: "3",
    userName: "Group C",
    description: "Description for Group C",
    createdOn: "2022-03-10",
  },
  {
    key: "4",
    userName: "Group D",
    description: "Description for Group D",
    createdOn: "2022-03-10",
  },
  {
    key: "5",
    userName: "Group E",
    description: "Description for Group E",
    createdOn: "2022-03-10",
  },
];

const UserGroupsHomePage: React.FC = () => {
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupsData, setGroupsData] = useState<GroupData[]>([]);
  const profile = useProfileCreated();
  const userId = profile?.userId;
  const platformId = usePlatformId();

  console.log(userId, platformId);
  

  useEffect(() => {
    if (userId && platformId) {
      const fetchData = async () => {
        try {
          const data = await fetchGroupsData(userId, platformId.toString(), 0, 10);
          setGroupsData(data);
        } catch (error) {
          console.error("Error fetching groups data:", error);
        }
      };
      fetchData();
    }
  }, [userId, platformId]);
  
  
  console.log(groupsData);

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
      render: () => (
        <div className={styles.icons}>
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            placement="bottom"
          >
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        </div>
      ),
    },
  ];

  const handleMenuClick = (e: any) => {
    console.log("click", e);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
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
        <Button type="text">
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
  );

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
              onClick={() => {}}
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

      
    </div>
  );
};

export default UserGroupsHomePage;

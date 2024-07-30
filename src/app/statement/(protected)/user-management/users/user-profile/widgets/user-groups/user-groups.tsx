import React, { useEffect, useMemo, useState } from "react";
import styles from "./user-groups.module.css";
import { Table } from "antd";
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
import { useRouter } from "next/navigation";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import DownloadWidget from "@/src/components/widgets/download-widget/download";
import Button from "@/src/components/atoms/buttons/button";
import { fetchUserGroupByUserId } from "@/src/lib/actions/fetch.groups.action";

export interface UserGroupData {
  key: string;
  groupName: string;
  description: string;
  createdOn: string;
  joinedOn: string;
}

type userGroupProps = {
  userId: string;
};

const UserGroups = ({ userId }: userGroupProps) => {
  const router = useRouter();
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState<userGroup[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log(userId)
      if (userId !== undefined) {
        try {
          const data = await fetchUserGroupByUserId(parseInt(userId));
          setGroups(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [userId]);

  console.log(groups);

  const groupsColumns: ColumnsType<userGroup> = [
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
      dataIndex: "createdAt",
      render: (createdAt: string) => moment(createdAt).format("DD-MM-YYYY"),
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
        <div className={styles.actionBtn}>
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
    if (!searchTerm) return groups;

    return groups.filter((group) => {
      [group.groupName, group.description].some((field) =>
        field?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, groups]);

  const handleClick = () => {
    router.push("/statement/user-management/users/create-user");
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
    </div>
  );
};

export default UserGroups;

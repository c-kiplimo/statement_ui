import React, { useEffect, useMemo, useState } from "react";
import styles from "./user-activity.module.css";
import { SearchOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import Texter from "@/src/components/atoms/text/texter";
import { fetchActivityLogAction } from "@/src/lib/actions/activity.log.action";
import moment from "moment";

type ActivityProps = {
  userId: string;
};

const UserActivity = ({ userId }: ActivityProps) => {
  console.log(userId);
  const [activity, setActivity] = useState<ActivityData[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [searchTerm, setSearchTerm] = useState("");

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const columns: ColumnsType<ActivityData> = [
    {
      title: "Date",
      dataIndex: "createdOn",
      render: (createdOn: string) => {
        const date = moment(createdOn).format("DD-MM-YYYY");
        const time = moment(createdOn).format("HH:MM a");

        return (
          <div className={`${styles.date} bodyr`}>
            {date}
            <span className="captionr">{time}</span>
          </div>
        );
      },
    },
    {
      title: "Activity Name",
      dataIndex: "activityName",
      render: (activity: string) => (
        <span className={`${styles.activityName} bodyr`}>{activity}</span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      render: (description: string) => (
        <span className={`${styles.description} bodyr`}>{description}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string, record) => {
        let dotColor = "";

        switch (record.status) {
          case "COMPLETED":
            dotColor = "green";
            break;
          case "PENDING":
            dotColor = "orange";
            break;
          case "FAILED":
            dotColor = "orange";
            break;

          default:
            break;
        }

        return (
          <div className={`${styles.status} bodyr`}>
            <div
              className={styles.dotStatus}
              style={{ backgroundColor: dotColor }}
            />
            {capitalizeFirstLetter(status)}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId !== undefined) {
          const data = await fetchActivityLogAction(parseInt(userId));
          setActivity(data);
          console.log(activity);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const filteredActivity = useMemo(() => {
    return activity.filter((item) => {
      return Object.values(item).some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, activity]);

  const handleSearch = (terms: string) => {
    setSearchTerm(terms);
  };

  const handleClick = () => {
    console.log("Filter button clicked!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Texter text="Activity Log" className={`${styles.title} h6b`} />
        <div className={styles.buttons}>
          <SearchButton>
            <SearchButton.Icon>
              <SearchOutlined size={16} />
            </SearchButton.Icon>
            <SearchButton.Input text="Search" onSearch={handleSearch} />
          </SearchButton>
          <FilterButton onClick={handleClick} />
        </div>
      </div>
      <div className={styles.table}>
        <Table
          columns={columns}
          dataSource={filteredActivity}
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

export default UserActivity;

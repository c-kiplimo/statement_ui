import React, { useEffect, useState } from 'react';
import styles from "./activity.popup.module.css";
import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import CustomTable, { DataFetcher } from '../../widgets/table/table';
import AddItem from "@/src/components/atoms/add-item/add.item";
import Search from "@/src/components/atoms/search/search";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import { UserActivitiesAction } from '@/src/lib/actions/customer.user.activities.action';

interface ActivityData extends DataFetcher {
  // Extend DataFetcher with any additional properties if necessary
}

interface CustomColumn {
  title: string;
  dataIndex: keyof ActivityData;
  render?: (text: any, record: ActivityData, index: number) => React.ReactNode;
}

const columns: CustomColumn[] = [
  {
    title: "Date",
    dataIndex: "createdOn",
    render: (text: string) => {
      const dateTime = new Date(text);
      const date = dateTime.toLocaleDateString();
      const time = dateTime.toLocaleTimeString();

      return (
        <div className={styles.date}>
          <div className={styles.dateStyles}>{date}</div>
          <div className={styles.timestyle}>{time}</div>
        </div>
      );
    },
  },
  {
    title: "Activity Name",
    dataIndex: "userName",
    render: (text) => <span className={styles.ActivityName}>{text}</span>,
  },
  {
    title: "Description",
    dataIndex: "role",
    render: (text) => <span className={styles.description}>{text}</span>,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text, record) => {
      let color = "";
      let backgroundColor = "";

      switch (record.status) {
        case "COMPLETED":
          color = "#17D05B";
          backgroundColor = "#DFF0D8";
          break;
        case "PENDING":
          color = "orange";
          backgroundColor = "#FCF8E3";
          break;
        default:
          color = "";
          backgroundColor = "";
          break;
      }

      return (
        <span
          style={{ color: color, backgroundColor: backgroundColor }}
          className={styles.status}
        >
          {text}
        </span>
      );
    },
  },
  {
    title: "",
    dataIndex: "icons",
    render: () => (
      <button className={styles.iconsdiv}>
        <EyeOutlined />
      </button>
    )
  },
];

type IdProps = {
  userId: string;
};

const ActivityPopup: React.FC<IdProps> = ({ userId }) => {
  const [activityData, setActivityData] = useState<DataFetcher[]>([]);

  console.log("userId>>",userId)
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userId !== undefined) {
          const data = await UserActivitiesAction(parseInt(userId));
          setActivityData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className={styles.container}>
      <div className={styles.lowerDiv}>
        <div className={styles.tableHeader}>
          <div className={styles.headerdiv}>
            <div className={`${styles.textdiv} h6b`}>Account Activities</div>
            <div className={styles.atomsdiv}>
              <Search
                title={"Search"}
                icon={<img src="/searchicon.svg" alt="searchicon" />}
              />
              <Filter
                title={"Filter"}
                icon={<img src="/funnel.svg" alt="funnel" />}
              />
              <Sort title={"Sort"} icon={<img src="/sort.svg" alt="sort" />} />
              <AddItem
                title={"Add user"}
                icon={<PlusOutlined />}
                iconStyle={{ color: "gray" }}
                titleStyle={{ color: "gray" }}
              />
            </div>
          </div>
          <CustomTable
            data={activityData}
            pageSize={4}
            total={10}
            columns={columns as any} 
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityPopup;

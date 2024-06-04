import React, { useEffect, useState } from "react";
import CustomTable, { DataFetcher } from "../widgets/table/table";
import { EyeOutlined } from "@ant-design/icons";
import styles from "./activities.status.module.css";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import Search from "@/src/components/atoms/search/search";
import Link from "next/link";
import { ActivitiesAction } from "@/src/lib/actions/activities.action";

interface ActivityData {
  id?: React.Key;
  createdOn?: string;
  userName?: string;
  role?: string;
  status?: string;
  currency?: string;
  icons?:any;
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
        case "COMPLETE":
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
      <Link href="/statement/accountsetup/users">
        <button className={styles.iconsdiv}>
          <EyeOutlined />
        </button>
      </Link>
    ),
  },
];

const ActivitiesStatus = (props: { userId?: number }) => {
  const [activityData, setActivityData] = useState<DataFetcher[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.userId !== undefined) {
          const data = await ActivitiesAction(props.userId);
          setActivityData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.userId]);

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <div className={styles.headerdiv}>
          <div className={styles.textdiv}>Account Activity</div>
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
          </div>
        </div>

        <CustomTable data={activityData} columns={columns} />
      </div>
    </div>
  );
};

export default ActivitiesStatus;

import React, { useEffect, useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import styles from "./activities.status.module.css";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import Search from "@/src/components/atoms/search/search";
import Link from "next/link";
import { ActivitiesAction } from "@/src/lib/actions/activities.action";
import CustomTable, { DataFetcher } from "../../widgets/table/table";

interface ActivityData {
  id?: React.Key;
  createdOn?: string;
  userName?: string;
  role?: string;
  status?: string;
  icons?: React.ReactNode;
  currency?: string;
  userId?: number;
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
          <div>{date}</div>
          <div>{time}</div>
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
        case "Completed":
          color = "#17D05B";
          backgroundColor = "#DFF0D8";
          break;
        case "Pending":
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

const ActivitiesStatus: React.FC<ActivityData> = (props) => {
  const [datacall, setdatacall] = useState<DataFetcher[]>([]);

  useEffect(() => {
    const passedAccid = sessionStorage.getItem("passedaccountId");
console.log(passedAccid);


    const fetchData = async () => {
      try {
        const data = await ActivitiesAction(parseInt(passedAccid!));
        console.log(data);
        
        setdatacall(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [props.userId]);

  console.log(datacall);
  

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
      </div>
      <CustomTable data={datacall} columns={columns} />
      <Link href="/statement/accountsetup/users">
      </Link>
    </div>
  );
};

export default ActivitiesStatus;

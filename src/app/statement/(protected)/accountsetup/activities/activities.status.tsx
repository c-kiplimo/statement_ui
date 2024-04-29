import React, { useState } from "react";
import CustomTable from "../widgets/table/table";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./activities.status.module.css";
import LastLogin from "@/src/components/widgets/userStatus/user.login.status";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import Search from "@/src/components/atoms/search/search";
import Link from "next/link";
import { ActivitiesAction } from "@/src/lib/actions/activities.action";

interface ActivityData {
  id: React.Key;
  createdOn?: string;
  userName?: string;
  role?: string;
  status?: string;
  icons?: React.ReactNode;
  currency?:string;
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
    render: (text: any, record: any) => ( 
      <span className={styles.date}>
        <span className={styles.account}>{text}</span>
        <span className={styles.currency}>{record.currency}</span>
      </span>
    ),
  },
  {
    title: "Activity Name",
    dataIndex: "userName",
    render: (text) => <span className={styles.ActivityName}>{text}</span>,
  },
  {
    title: "Description",
    dataIndex: "role",
    render: (text) => (
      <span className={styles.description}>{text}</span>
    ),
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

const data: ActivityData[] = [
  {
    id: 1,
    createdOn: "23-05-2023",
    currency: "10:45 a.m",
    userName: "Downloaded statement",
    role: "Description",
    status: "Active",
  },
  {
    id: 2,
    createdOn: "23-05-2023",
    currency: "10:45 a.m",
    userName: "Downloaded statement",
    role: "Description",
    status: "Completed",
  },
  {
    id: 3,
    createdOn: "23-05-2023 ",
    currency: "10:45 a.m",
    userName: "Downloaded statement",
    role: "Description",
    status: "Pending",
  },
];

const ActivitiesStatus = async () => {
  const [settingsClicked, setClicked] = useState<number | null>(null);


  let dataCall = await ActivitiesAction(1)
  console.log(ActivitiesStatus)

  const setClick=(index:number)=>{
    setClicked(index)
  };

  
  return (
    <div className={styles.container}>
      <LastLogin
        userName={"Meraki System Tech"}
        mail={"Banking Industry"}
        town={"Kampala Uganda"}
        timezone={"( GMT -11:46) Greenwich mean Time zone"}
        icon={<img src="/teamusericon.png" alt="teamusericon" />}
        lastSeenTime={"Last login on 45 minutes ago"}
        button1={
          <Link href="/statement/accountsetup/accounts">
            Accounts
          </Link>
        }
        button3={
          <Link href="/statement/accountsetup/users">
            Users
          </Link>
        }
        button2={
          <Link href="/statement/accountsetup/activities">
            Activity
          </Link>
        }
        button4={
          <Link href="/statement/accountsetup/restrictions/restrictions-overview">
            Restrictions
          </Link>
        }
        titleDescription={"Corporate customer"}      />

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

     
      <CustomTable
        data={dataCall}
        pageSize={4}
        total={10}
        columns={columns}
      />
      </div>
      </div>
  );
};

export default ActivitiesStatus;

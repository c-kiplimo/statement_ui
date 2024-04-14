import React from "react";
import CustomTable from "../widgets/table/table";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "./activities.status.module.css";
import LastLogin from "@/src/components/widgets/userStatus/user.login.status";

interface ActivityData {
  id: React.Key;
  createdOn: string;
  userName: string;
  role: string;
  status: string;
  icons: React.ReactNode;
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
    render: (text) => <span className={styles.date}>{text}</span>,
  },
  {
    title: "Activity Name",
    dataIndex: "userName",
    render: (text) => <span className={styles.ActivityName}>{text}</span>,
  },
  {
    title: "Description",
    dataIndex: "role",
    render: (text, record) => (
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
  },
];

const data: ActivityData[] = [
  {
    id: 1,
    createdOn: "23-05-2023 10:45 a.m",
    userName: "Downloaded statement",
    role: "Description",
    status: "Active",
    icons: (
      <div className={styles.icons}>
        <EyeOutlined />
      </div>
    ),
  },
  {
    id: 2,
    createdOn: "23-05-2023 10:45 a.m",
    userName: "Downloaded statement",
    role: "Description",
    status: "Completed",
    icons: (
      <div className={styles.icons}>
        <EyeOutlined />
      </div>
    ),
  },
  {
    id: 3,
    createdOn: "23-05-2023 10:45 a.m",
    userName: "Downloaded statement",
    role: "Description",
    status: "Pending",
    icons: (
      <div className={styles.icons}>
        <EyeOutlined />
      </div>
    ),
  },
];

const handleRoleChange = (value: string, id: React.Key) => {};

const ActivitiesStatus = () => {
  return (
    <div className={styles.container}>
      <LastLogin
        userName={"Meraki System Tech"}
        mail={"Banking Industry"}
        town={"Kampala Uganda"}
        timezone={"( GMT -11:46) Greenwich mean Time zone"}
        icon={<img src="/teamusericon.png" alt="teamusericon" />}
        lastSeenTime={"Last login on 45 minutes ago"}
        button1={"Accounts"}
        button2={"Users"}
        button3={"Activity"}
        button4={"Restrictions"}
      />
      <CustomTable
        data={data}
        titleText={"Account Activity "}
        searchIcon={<img src="/searchicon.svg" alt="searchicon" />}
        sortIcon={<img src="/sort.svg" alt="sort" />}
        filterIcon={<img src="/funnel.svg" alt="funnel" />}
        addIcon={<PlusOutlined />}
        pageSize={4}
        total={10}
        columns={columns}
      />
    </div>
  );
};

export default ActivitiesStatus;

import React, { useState } from "react";
import CustomTable from "../widgets/table/table";
import { EyeOutlined, SettingOutlined } from "@ant-design/icons";
import styles from "./accounts.module.css";
import LastLogin from "@/src/components/widgets/userStatus/user.login.status";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import Search from "@/src/components/atoms/search/search";
import Link from "next/link";


interface ActivityData {
  id: React.Key;
  createdOn: string;
  currency: string;
  userName: string;
  status: string;
  settings?: React.ReactNode;
  icons?: React.ReactNode;
}

const ActivitiesStatus = () => {
  const [settingsClicked, setSettingsClicked] = useState<number | null>(null);

  const handleSettingsClick = (index: number) => {
    setSettingsClicked(index);
  };

  const columns = [
    {
      title: "Account Number",
      dataIndex: "createdOn",
      render: (text: any, record: any) => ( 
        <span className={styles.date}>
          <span className={styles.account}>{text}</span>
          <span className={styles.currency}>{record.currency}</span>
        </span>
      ),
    },
    {
      title: "Account Name",
      dataIndex: "userName",
      render: (text: any) => (
        <span className={styles.ActivityName}>{text}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text: any, record: any) => {
        let color = "";
        switch (record.status) {
          case "Done":
            color = "#17D05B";
            break;
          case "Pending":
            color = "orange";
            break;
        }
        return (
          <span style={{ color: color }} className={styles.status}>
            {text}
          </span>
        );
      },
    },
    {
      title: "Settings",
      dataIndex: "settings",
      render: (text: any, record: any, index: number) => (
        <button
          key={`settings-${record.id}`}
          className={`${styles.settingsButton} ${
            settingsClicked === index
              ? styles.settingsButtonClicked
              : styles.test
          }`}
          onClick={() => handleSettingsClick(index)}
        >
          {text}
          <SettingOutlined />
        </button>
      ),
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
      createdOn: "000129899",
      currency: "KES",
      userName: "Debit Account",
      status: "Done",
      settings: "Setup",
    },
    {
      id: 2,
      createdOn: "000129899",
      currency: "USD", 
      userName: "Loan Account",
      status: "Pending",
      settings: "Setup",
    },
    {
      id: 3,
      createdOn: "000129899",
      currency: "EUR",
      userName: "Savings Account",
      status: "Pending",
      settings: "Setup",
    },
    {
      id: 4,
      createdOn: "000129899",
      currency: "GBP", 
      userName: "Meraki Systems Tech",
      status: "Done",
      settings: "Setup",
    },
  ];

  return (
    <div className={styles.container}>

      <div className={styles.topdiv}>
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
          titleDescription={"Corporate customer"} />
      </div>

      <div className={styles.tableHeader}>
      <div className={styles.headerdiv}>
        <div className={styles.textdiv}>Accounts</div>
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
      <CustomTable data={data} pageSize={2} total={10} columns={columns} />
    </div>
    </div>
  );
};

export default ActivitiesStatus;

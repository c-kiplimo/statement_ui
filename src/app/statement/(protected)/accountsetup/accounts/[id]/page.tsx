'use client'
import React, { useState } from "react";
import CustomTable from "../../widgets/table/table";
import { EyeOutlined, SettingOutlined } from "@ant-design/icons";
import styles from "../accounts.module.css";
import LastLogin from "@/src/components/widgets/userStatus/user.login.status";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import Search from "@/src/components/atoms/search/search";
import Link from "next/link";
import { AccountAction } from "@/src/lib/actions/accounts.action";
import { profileDetails } from "@/src/lib/actions/profile.action";


export type profilesType={
userName:string,
industry:string,
town:string,
customerType:string,
}


const AccountsPage = async () => {
  const [settingsClicked, setSettingsClicked] = useState<number | null>(null);


  let incomingDta = await AccountAction(1)
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
        <Link href="/statement/dev">
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
            setup
          </button>
        </Link>
      ),
    },
    
    {
      title: "",
      dataIndex: "icons",
      render: () => (
        <Link href={"/statement/accountsetup/accounts/account-deletion"}> 
        <button className={styles.iconsdiv}>
          <EyeOutlined />
        </button>
        </Link>
      ),
    },
  ]


  let profile:profilesType = await profileDetails('3')

  const getLastLoginTime = () => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${date} ${time}`;
  };
  
  

  return (
    <div className={styles.container}>
      <div className={styles.topdiv}>
        <LastLogin
          userName={profile.userName}
          industry={profile.industry}
          town={profile.town}
          customerType={profile.customerType}
          timezone={`GMT ${Intl.DateTimeFormat().resolvedOptions().timeZone}`}
          lastSeenTime={`Last login on ${getLastLoginTime()}`}
          icon={<img src="/teamusericon.png" alt="teamusericon" />}
        
            button1={<a href="/statement/accountsetup/accounts">Accounts</a>}
            button3={<a href="/statement/accountsetup/users">Users</a>}
            button2={<a href="/statement/accountsetup/activities">Activity</a>}
            button4={<a href="/statement/accountsetup/restrictions/restrictions-overview">Restrictions</a>}
          
        />
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
        <CustomTable
          data={incomingDta}
          pageSize={5}
          total={10}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default AccountsPage;

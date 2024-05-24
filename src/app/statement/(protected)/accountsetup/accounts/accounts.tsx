import React, { useState, useEffect, useCallback } from "react";
import CustomTable, { DataFetcher } from "../widgets/table/table";
import { EyeOutlined, SettingOutlined } from "@ant-design/icons";
import styles from "./accounts.module.css";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import Search from "@/src/components/atoms/search/search";
import Link from "next/link";
import { AccountAction } from "@/src/lib/actions/accounts.action";
import { AccountProfileProvider, useAccountProfileContext } from '../context/account.contex'; 



type UserIdProps = {
  userId?: number;
};

const AccountsPage = (props: UserIdProps) => {
  const [settingsClicked, setSettingsClicked] = useState<number | null>(null);
  const [viewClicked, setViewClicked] = useState<number | null>(null);
  const [incomingData, setIncomingData] = useState<DataFetcher[]>([]);
  const {accountId,updateAccount}=useAccountProfileContext();


  console.log(accountId);
  
  
  

sessionStorage.setItem("passedaccountId", accountId.toString())





  useEffect(() => {
    const fetchData = async () => {
      if (props.userId !== undefined) {
        try {
          const data = await AccountAction(props.userId);
          setIncomingData(data);
        } catch (error) {
          console.error("Error fetching data:", error);

        }
      }
    };



    fetchData();
  }, [props.userId]);



  const handleSettingsClick = useCallback((id: number) => {
    setIncomingData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, settingsClicked: !item.settingsClicked  } : item
      )
    );
    setSettingsClicked(id);
  }, []);



  const handleViewClick = useCallback((id: number) => {
    setIncomingData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, viewClicked: !item.viewClicked} : item
      )
    );
    setViewClicked(id);
  }, []);

  
  useEffect(() => {
    if (settingsClicked !== null) {
      updateAccount(settingsClicked);
    }
  }, [settingsClicked, updateAccount]);



  useEffect(() => {
    if (viewClicked !== null) {
      updateAccount(viewClicked);
    }
  }, [viewClicked, updateAccount]);
  
  

  const columns = [
    {
      Key:"accountNumber",
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
      Key:"accountName",
      title: "Account Name",
      dataIndex: "userName",
      render: (text: any) => <span className={styles.ActivityName}>{text}</span>,
    },
    {
      Key:"status",
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
          default:
            color = "black";
        }
        return (
          <span style={{ color: color }} className={styles.status}>
            {text}
          </span>
        );
      },
    },
    {
      Key:"settings",
      title: "Settings",
      dataIndex: "settings",
      render: (text: any, record: any, index: number) => (
        <Link href="/statement/accountsetup/widgets/configuration-form" key={`settings-${record.id}`}>
          <button
            className={`${styles.settingsButton} ${
              settingsClicked === record.id
                ? styles.settingsButtonClicked
                : styles.test
            }`}
            onClick={() => handleSettingsClick(record.id)}
          >
            {text}
            <SettingOutlined />
            setup
          </button>
        </Link>
      ),
    },
    {
      Key:"icons",
      title: "",
      dataIndex: "icons",
      render: (text: any, record: any, index: number) => (
        <Link href="/statement/accountsetup/account-profile" key={`icons-${record.id}`}>
          <button
            className={`${styles.settingsButton} ${
              viewClicked === record.id
                ? styles.viewButtonClicked
                : styles.test
            }`}
            onClick={() => handleViewClick(record.id)}
          >
            {text}
            <EyeOutlined />
          </button>
        </Link>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <div className={styles.headerdiv}>
          <div className={styles.textdiv}>Accounts</div>
          <div className={styles.atomsdiv}>
            <Search
              title="Search"
              icon={<img src="/searchicon.svg" alt="searchicon" />}
            />
            <Filter
              title="Filter"
              icon={<img src="/funnel.svg" alt="funnel" />}
            />
            <Sort title="Sort" icon={<img src="/sort.svg" alt="sort" />} />
          </div>
        </div>
       
        <CustomTable
          data={incomingData}
          pageSize={5}
          total={10}
          columns={columns}
        />
        
      </div>
    </div>
  );
};

export default AccountsPage;

import React, { useState, useEffect, useCallback } from "react";
import CustomTable, { DataFetcher } from "../widgets/table/table";
import { EyeOutlined, SettingOutlined } from "@ant-design/icons";
import styles from "./accounts.module.css";
import Filter from "@/src/components/atoms/filter/filter";
import Sort from "@/src/components/atoms/sort/sort";
import Search from "@/src/components/atoms/search/search";
import Link from "next/link";
import { AccountAction } from "@/src/lib/actions/accounts.action";
import { useAccountProfileContext } from '../context/account.contex';
import { Modal } from "antd";
import AccountConfifModal from "../widgets/configuration-form/accounts.configuration";

type UserIdProps = {
  userId?: number;
};

const AccountsPage = (props: UserIdProps) => {
  const [settingsClicked, setSettingsClicked] = useState<number | null>(null);
  const [viewClicked, setViewClicked] = useState<number | null>(null);
  const [incomingData, setIncomingData] = useState<DataFetcher[]>([]);
  const { accountId, updateAccount } = useAccountProfileContext();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    sessionStorage.setItem("passedaccountId", accountId.toString());
  }, [accountId]);

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
    setIncomingData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, settingsClicked: !item.settingsClicked } : item
      )
    );
    setSettingsClicked(id);
  }, []);

  const handleViewClick = useCallback((id: number) => {
    setIncomingData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, viewClicked: !item.viewClicked } : item
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

  const openModal = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalSuccess = () => {
    if (selectedUserId !== null) {
      setIncomingData((prevData) =>
        prevData.map((item) =>
          item.id === selectedUserId ? { ...item, status: "DONE" } : item
        )
      );
    }
    setIsModalOpen(false); 
  };

  const columns = [
    {
      key: "accountNumber",
      title: "Account Number",
      dataIndex: "createdOn",
      render: (text: any, record: any) => (
        <span className={styles.date}>
          <span className={`${styles.account} bodyr`}>{text}</span>
          <span className={`${styles.currency} captionl`}>{record.currency}</span>
        </span>
      ),
    },
    {
      key: "accountName",
      title: "Account Name",
      dataIndex: "userName",
      render: (text: any) => <span className={`${styles.ActivityName} bodyr`}>{text}</span>,
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      render: (text: any, record: any) => {
        let color = "";
        switch (record.status) {
          case "DONE":
            color = "#17D05B";
            break;
          case "PENDING":
            color = "orange";
            break;
          default:
            color = "black";
        }
        return (
          <span style={{ color: color }} className={`${styles.status} bodyr`}>
            {text}
          </span>
        );
      },
    },
    {
      key: "settings",
      title: "Settings",
      dataIndex: "settings",
      render: (text: any, record: any) => (
        <button
          className={`${styles.settingsButton} captionr ${
            settingsClicked === record.id ? styles.settingsButtonClicked : styles.test
          }`}
          onClick={() => {
            handleSettingsClick(record.id);
            openModal(record.id);
          }}
        >
          {text}
          <SettingOutlined />
          setup
        </button>
      ),
    },
    {
      Key:"icons",
      title: "",
      dataIndex: "icons",
      render: (text: any, record: any, index: number) => (
        <Link href="/statement/accountsetup/users" key={`icons-${record.id}`}>
          <button
            className={`${`${styles.eyeIconDiv} captionr`} ${
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
            <Search title="Search" icon={<img src="/searchicon.svg" alt="searchicon" />} />
            <Filter title="Filter" icon={<img src="/funnel.svg" alt="funnel" />} />
            <Sort title="Sort" icon={<img src="/sort.svg" alt="sort" />} />
          </div>
        </div>

        <CustomTable data={incomingData} pageSize={5} total={10} columns={columns} />

        <Modal footer={false} width={"55%"} visible={isModalOpen} onCancel={handleCancel}>
          {selectedUserId !== null && (
            <AccountConfifModal
              fileformartHeader={"Statement Frequency"}
              optiona={"Monthly"}
              optionb={"Bi Weekly"}
              optionc={"Weekly"}
              optiond={"Daily"}
              date={"Start date"}
              time={"Time"}
              dateIcon={<img src="/calendar.svg" alt="calendar" />}
              timeIcon={<img src="/time.svg" alt="time" />}
              onSuccess={handleModalSuccess}
              accountId={selectedUserId}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default AccountsPage;

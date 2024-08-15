import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  CloudDownloadOutlined,
  EyeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Table, Modal, notification } from "antd";
import styles from "./schedules.table.module.css";
import Filter from "@/src/components/atoms/filter/filter";
import Search from "@/src/components/atoms/search/search";
import Link from "next/link";
import DownloadWidget from "@/src/components/widgets/download-widget/download";
import SettingsModal from "../settings-modal/settings.modal";
import { SchedulesAccountAction } from "@/src/lib/actions/schedules.accounts.action";
import { AccountInfoContext } from "../schedules-context/accountInforContext";

export interface SchedulesDataTypes {
  id?: React.Key;
  accountNumber: string;
  accountName: string;
  status: string;
  currency: string;
}

const SchedulesTable = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [incomingData, setIncomingData] = useState<SchedulesDataTypes[]>([]);

  const context = useContext(AccountInfoContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await SchedulesAccountAction(9);
        setIncomingData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        notification.error({
          message: "Data Fetch Error",
          description: "Failed to fetch account data.",
        });
      }
    };

    fetchData();
  }, []);

  const handleSettingsClick = useCallback((id: number) => {
    setSelectedUserId(id);
    if (context) {
      const selectedData = incomingData.find(item => item.id === id);

      if (selectedData) {
        context.setAccountInfo({
          accountName: selectedData.accountName,
          accountNumber: selectedData.accountNumber,
          currency: selectedData.currency,
        });
      }
    } else {
      console.error("AccountInfoContext is not available");
    }

    setIsModalOpen(true);
  }, [incomingData, context]);

  const handleViewClick = useCallback((id: number) => {
    console.log("View clicked for ID:", id);
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalSuccess = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      key: "accountNumber",
      title: "Account Number",
      dataIndex: "accountNumber",
      render: (text: string, record: any) => (
        <span className={styles.date}>
          <span className={`${styles.account} bodyr`}>{text}</span>
          <span className={`${styles.currency} captionl`}>
            {record.currency}
          </span>
        </span>
      ),
    },
    {
      key: "accountName",
      title: "Account Name",
      dataIndex: "accountName",
      render: (text: string) => (
        <span className={`${styles.ActivityName} bodyr`}>{text}</span>
      ),
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <span className={`${styles.statusDiv} bodyr`}>
          <span
            className={`${styles.statusDot} ${
              status === "COMPLETE" ? styles.statusDone : styles.statusPending
            }`}
          ></span>
          {status}
        </span>
      ),
    },
    {
      key: "settings",
      title: "Settings",
      render: (text: any, record: any) => (
        <button
          className={`${styles.settingsButton} captionr ${
            selectedUserId === record.id
              ? styles.settingsButtonClicked
              : styles.test
          }`}
          onClick={() => handleSettingsClick(record.id)}
        >
          <SettingOutlined />
          Setup
        </button>
      ),
    },
    {
      key: "icons",
      title: "",
      render: (text: any, record: any) => (
        <Link href="/statement/accountsetup/users" key={`icons-${record.id}`}>
          <button
            className={`${styles.eyeIconDiv} captionr ${
              selectedUserId === record.id
                ? styles.viewButtonClicked
                : styles.test
            }`}
            onClick={() => handleViewClick(record.id)}
          >
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
          <div className={`${styles.textdiv} h6b`}>Accounts</div>
          <div className={styles.atomsdiv}>
            <Search
              title="Search"
              icon={<img src="/searchicon.svg" alt="searchicon" />}
            />
            <Filter
              title="Filter"
              icon={<img src="/funnel.svg" alt="funnel" />}
            />
            <DownloadWidget>
              <DownloadWidget.Icon>
                <CloudDownloadOutlined />
              </DownloadWidget.Icon>
              <DownloadWidget.text text="Download" />
            </DownloadWidget>
          </div>
        </div>

        <Table
          dataSource={incomingData}
          columns={columns}
          pagination={{
            pageSize: pageSize,
            showSizeChanger: true,
            onShowSizeChange: (_, size) => setPageSize(size),
            onChange: (page) => setCurrentPage(page),
          }}
          rowKey="id"
          className={styles.customTable}
        />

        <Modal
          footer={null}
          width={"max-content"}
          visible={isModalOpen}
          onCancel={handleCancel}
        >
          {selectedUserId !== null && (
            <SettingsModal
              date={"Start date"}
              time={"Time"}
              onClick={handleCancel}
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

export default SchedulesTable;

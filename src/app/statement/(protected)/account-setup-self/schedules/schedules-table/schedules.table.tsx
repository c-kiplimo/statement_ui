import React, { useState, useCallback, useEffect, useContext } from "react";
import {
  CloudDownloadOutlined,
  EyeOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Table, Modal, notification } from "antd";
import styles from "./schedules.table.module.css";
import Link from "next/link";
import DownloadWidget from "@/src/components/widgets/download-widget/download";
import { SchedulesAccountAction } from "@/src/lib/actions/schedules.accounts.action";
import Texter from "@/src/components/atoms/text/texter";
import SearchButton from "@/src/components/widgets/search-button/search-button";
import FilterButton from "@/src/components/widgets/filter-button/filter.button";
import { ColumnsType } from "antd/lib/table";
import SettingsModal from "../settings-modal/settings.modal";
import { AccountInfoContext } from "../schedules-context/accountInforContext";

type scheduleProps = {
  customerId: number;
};

const SchedulesTable = ({ customerId }: scheduleProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [incomingData, setIncomingData] = useState<SchedulesData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const context = useContext(AccountInfoContext);

  const fetchData = async () => {
    try {
      const data = await SchedulesAccountAction(customerId);
      setIncomingData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      notification.error({
        message: "Data Fetch Error",
        description: "Failed to fetch account data.",
      });
    }
  };

  useEffect(() => {
      
      fetchData();
  }, []);

  const handleSettingsClick = useCallback(
    (id: number) => {
      setSelectedUserId(id);
      if (context) {
        const selectedData = incomingData.find((item) => item.id === id);

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
    },
    [incomingData, context]
  );
  const handleViewClick = useCallback((id: number) => {
    console.log("View clicked for ID:", id);
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleModalSuccess = async () => {
    setIsModalOpen(false);
    await fetchData();
  };

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const columns: ColumnsType<SchedulesData> = [
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
          {capitalizeFirstLetter(status)}
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
      ),
    },
  ];

  const handleSearch = (terms: string) => {
    setSearchTerm(terms);
  };

  const handleClick = () => {
    console.log("Filter button clicked!");
  };

  return (
    <div className={styles.container}>
        <div className={styles.headerdiv}>
        <Texter text="Accounts" className={`${styles.textdiv} h6b`} />
          <div className={styles.atomsdiv}>
          <SearchButton>
            <SearchButton.Icon>
              <SearchOutlined size={16} />
            </SearchButton.Icon>
            <SearchButton.Input text="Search" onSearch={handleSearch} />
          </SearchButton>
          <FilterButton onClick={handleClick} />
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
           size="middle"
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
          open={isModalOpen}
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
  );
};

export default SchedulesTable;

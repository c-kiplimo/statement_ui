import React, { useContext, useEffect, useState } from "react";
import styles from "./account.schedule.module.css";
import { SelectedAcountContext } from "../context/accoint.overview.context";
import {
  AccountScheduleAction,
  AccountStatusAction,
} from "@/src/lib/account.status.action";
import { EditOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Modal, Spin } from "antd";
import AccountScheduleForm from "../account-schedule-form/account.scedule.form";
import DeleteSchedule from "../delete-schedule/delete.schedule";
import EditScheduleForm from "../edit-schedule-form/account.scedule.form";
import { useQuery } from 'react-query';


export type AccountSheduleData = {
  key: number;
  date: string;
  time?: string;
  accountNumber: string;
  accountTitle: string;
  frequency: string;
  status: string;
  currency: string;
  templateType: string;
  templateFormat: string;
};

type AccountScheduleProps = {
  accountSchedule: AccountSheduleData[];
};

function AccountSchedule() {
  const { selectedAccount } = useContext(SelectedAcountContext);
  // const [statusData, setStatusData] = useState<AccountSheduleData[]>();
  // const [error, setError] = useState<string | null>(null);
  const [addScheduleModal, setAddScheduleModal] = useState(false);
  const [removeScheduleModal, setRemoveScheduleModal] = useState(false);
  const [editScheduleModal, setEditScheduleModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);


  const fetchStatusData = async () => {
    const result = await AccountScheduleAction(selectedAccount);
    return result;
  };

  const { data: statusData, error , isError, isLoading } = useQuery(
    ['accountSchedule', selectedAccount],
    fetchStatusData,
    {
      enabled: !!selectedAccount,
      refetchInterval: 5000, 
    }
  );

  const handleAddButtonClick = () => {
    setAddScheduleModal(true);
  };

  const closeModal = () => {
    setAddScheduleModal(false);
    setRemoveScheduleModal(false);
    setSelectedItemId(null);
    setEditScheduleModal(false);
  };

  const handleEditButtonClick = (id: number) => {
    setSelectedItemId(id);
    setEditScheduleModal(true);
  };

  const handleRemoveClick = (id: number) => {
    setSelectedItemId(id);
    setRemoveScheduleModal(true);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center p-4">
        <Spin size="large" />
      </div>
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'An error occurred'}</div>;
  }

  return (
    <div className={styles.container}>
      {error && (
        <div
          style={{
            color: "red",
            padding: "8px",
            border: "1px solid red",
            borderRadius: "4px",
          }}
        >
          {error}
        </div>
      )}
        <div className={styles.tableContainer}>
          {statusData!.length === 0  && (
          <div className={styles.buttons}>
            <button onClick={handleAddButtonClick}>
              <PlusOutlined /> Add
            </button>
          </div>
          )}

          {statusData && statusData.length > 0 ? (
          <table>
            <thead>
              <tr className={styles.tablerow}>
                <th className={`${styles.tablehrad} bodyr`}>Open Date</th>
                <th className={`${styles.tablehrad} bodyr`}>Account Number</th>
                <th className={`${styles.tablehrad} bodyr`}>Frequency</th>
                <th className={`${styles.tablehrad} bodyr`}>Template</th>
                <th className={`${styles.tablehrad} bodyr`}>Status</th>
                <th></th>
              </tr>
            </thead>
            {statusData.map((scheduleData) => (
              <tbody className={`${styles.body} ${styles.tablerow}`}>
                <tr>
                  <td>
                    <span>{scheduleData.date.split("T")[0]}</span> <br />
                    <span className={` bodyl `}>{scheduleData.time}</span>
                  </td>
                  <td>
                    <span>{scheduleData.accountTitle}</span> <br />
                    <span className={` bodyl `}>
                      {scheduleData.currency} {scheduleData.accountNumber}
                    </span>
                  </td>
                  <td>
                    <span>{scheduleData.frequency}</span> <br />
                    <span className={` bodyl `}>{scheduleData.time}</span>
                  </td>
                  <td>
                    <span>{scheduleData.templateFormat}</span> <br />
                    <span className={` bodyl `}>
                      {scheduleData.templateType}
                    </span>
                  </td>
                  <td>
                    {" "}
                    <span
                      style={{
                        textAlign: "center",
                        padding: "8px",
                        borderRadius: "4px",
                        color: "#17D05B",
                        backgroundColor: "#E0FFEB",
                      }}
                    >
                      {scheduleData.status}
                    </span>
                  </td>
                  <td className={styles.icons}>
                    {" "}
                    <button className={styles.button}>
                      <MinusOutlined
                        onClick={() => handleRemoveClick(scheduleData.key)}
                      />
                    </button>{" "}
                    <button className={styles.button}>
                      <EditOutlined
                        onClick={() => handleEditButtonClick(scheduleData.key)}
                      />
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          ) : (
            <div className="text-center p-2 font-bold"> The Account Has No Schedule! </div>
          )}
        </div>
      

      <div>
        <Modal
          width={"55%"}
          open={addScheduleModal}
          onCancel={closeModal}
          footer={null}
        >
          <AccountScheduleForm closeModal={closeModal} />
        </Modal>
      </div>
      <div>
        <Modal
          width={"25%"}
          open={removeScheduleModal}
          onCancel={closeModal}
          footer={null}
        >
          <DeleteSchedule id={selectedItemId!} closeModal={closeModal} />
        </Modal>
      </div>

      <div>
        <Modal
          width={"55%"}
          open={editScheduleModal}
          onCancel={closeModal}
          footer={null}
        >
          <EditScheduleForm id={selectedItemId!} closeModal={closeModal} />
        </Modal>
      </div>
    </div>
  );
}
export default AccountSchedule;

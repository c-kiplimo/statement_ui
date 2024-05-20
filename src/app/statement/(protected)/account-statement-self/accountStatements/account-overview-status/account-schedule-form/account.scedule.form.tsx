import React, { useContext, useState } from "react";
import { AccountHeader } from "../account-ministatement/account.header";
import styles from "./account.scedule.form.module.css";
import { DatePicker, TimePicker, notification } from "antd";
import { SelectedAcountContext } from "../context/accoint.overview.context";
import { createAccountSchedule } from "@/src/services/account/account.schedule.service";
import { usePathname, useRouter } from "next/navigation";
import moment from "moment";
import dayjs from "dayjs";

type AccountScheduleFormProps = {
  closeModal: () => void;
};

function AccountScheduleForm({ closeModal }: AccountScheduleFormProps) {
  const [statementFrequency, setStatementFrequency] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [fileformat, setFileFormat] = useState<string>("");
  const [templateType, setTemplateType] = useState<string>("");
  const { selectedAccount } = useContext(SelectedAcountContext);
  const path = usePathname();
  const router = useRouter();

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatementFrequency(e.target.value);
  };

  const onDateChange = (date: any, dateString: any) => {
    setDate(dateString);
  };

  const onTimeChange = (time: any, timeString: any) => {
    setTime(timeString || "");
  };

  const templateFormatChange = (e: any) => {
    setTemplateType(e.target.value);
  };

  const fileFormatChange = (e: any) => {
    setFileFormat(e.target.value);
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    const accountScheduleFormData = {
      accountId: selectedAccount,
      frequency: statementFrequency!,
      template: templateType!,
      fileFormat: fileformat,
      startTime: `${date}T${time}`,
    };

    try {
      await createAccountSchedule(accountScheduleFormData);

      setStatementFrequency("");
      setDate("");
      setTime("");
      setFileFormat("");
      setTemplateType("");

      notification.success({
        message: "Account Schedule Created Successfully!",
      });

      router.push("/statement/account-statement-self");
      closeModal();
    } catch (error) {
      if (error === "Network Error") {
        notification.error({
          message: "Network Error",
        });
      } else if (error === 400) {
        notification.error({
          message: "Please ensure all inputs are valid.",
        });
      } else if (error === 500) {
        notification.error({
          message: "Internal server Error",
        });
      } else {
        notification.error({
          message: "Something went wrong. Please try again...!",
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <AccountHeader />
      </div>
      <div className={styles.formcontainer}>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.formBody}>
            <p>Statement Frequency</p>
            <div className={styles.radioContainer}>
              <div>
                <input
                  type="radio"
                  name="frequency"
                  value="MONTHLY"
                  checked={statementFrequency === "MONTHLY"}
                  onChange={handleFrequencyChange}
                />
                <label htmlFor="MONTHLY"> MONTHLY</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="frequency"
                  value="BI WEEKLY"
                  checked={statementFrequency === "BI WEEKLY"}
                  onChange={handleFrequencyChange}
                />
                <label htmlFor="BI WEEKLY"> BI WEEKLY</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="frequency"
                  value="WEEKLY"
                  checked={statementFrequency === "WEEKLY"}
                  onChange={handleFrequencyChange}
                />
                <label htmlFor="WEEKLY"> WEEKLY</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="frequency"
                  value="DAILY"
                  checked={statementFrequency === "DAILY"}
                  onChange={handleFrequencyChange}
                />
                <label htmlFor="DAILY"> DAILY</label>
              </div>
            </div>
            <div className={styles.datetime}>
              <div className={styles.date}>
                <DatePicker
                  value={date ? moment(date) : null}
                  onChange={onDateChange}
                />
              </div>
              <div className={styles.time}>
                <TimePicker
                  value={time ? dayjs(time, "HH:mm:ss") : null}
                  onChange={onTimeChange}
                />
              </div>
            </div>
            <div className={styles.fileformat}>
              <div className={styles.format}>
                <p>File Format</p>
                <select
                  name="format"
                  id="format"
                  value={fileformat}
                  onChange={fileFormatChange}
                >
                  <option value="PDF">PDF</option>
                  <option value="CSV">CSV</option>
                </select>
              </div>
              <div className={styles.template}>
                <p>Template</p>
                <select
                  name="template"
                  id="template"
                  value={templateType}
                  onChange={templateFormatChange}
                >
                  <option value="CORPORATE">CORPORATE</option>
                  <option value="INDIVIDUAL">INDIVIDUAL</option>
                </select>
              </div>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountScheduleForm;

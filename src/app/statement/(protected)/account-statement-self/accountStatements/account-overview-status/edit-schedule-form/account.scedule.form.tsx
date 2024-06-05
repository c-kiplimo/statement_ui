import React, { useContext, useEffect, useState } from "react";
import { AccountHeader } from "../account-ministatement/account.header";
import styles from "./account.scedule.form.module.css";
import { DatePicker, TimePicker, notification } from "antd";
import { SelectedAcountContext } from "../context/accoint.overview.context";
import { editAccountSchedule } from "@/src/services/account/account.schedule.service";
import { usePathname, useRouter } from "next/navigation";
import moment from "moment";
import dayjs from "dayjs";
import { getEditScheduleData } from "@/src/lib/account.status.action";

export type EditScheduletypes = {
  frequency: string;
  time: string;
  date: string;
  fileformat: string;
  templateFormat: string;
};

interface EditScheduleFormProps {
  id: number;
  closeModal: () => void;
}

function EditScheduleForm({ closeModal, id }: EditScheduleFormProps) {
  const [statementFrequency, setStatementFrequency] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [fileformat, setFileFormat] = useState<string>("");
  const [templateType, setTemplateType] = useState<string>("");
  const { selectedAccount } = useContext(SelectedAcountContext);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      let data = await getEditScheduleData(id);
      setStatementFrequency(data.frequency);
      setDate(data.date);
      setTime(data.time);
      setFileFormat(data.fileformat);
      setTemplateType(data.templateFormat);
    }
    fetchData();
  }, [id]);

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
  const FileFormatChange = (e: any) => {
    setFileFormat(e.target.value);
  };

  const fileFormatChange = (e: any) => {
    setFileFormat(e.target.value);
    console.log(e.target.value);
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    const editScheduleFormData = {
      accountId: selectedAccount,
      frequency: statementFrequency,
      template: templateType,
      fileFormat: fileformat,
      startTime: `${date}T${time}`,
    };

    try {
      await editAccountSchedule(id, editScheduleFormData);

      setStatementFrequency("");
      setDate("");
      setTime("");
      setFileFormat("");
      setTemplateType("");

      notification.success({
        message: "Account Schedule Updated Successfully!",
      });

      router.push("/statement/account-statement-self");
      closeModal()
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
          <input type="hidden" value={id} />
          <div className={styles.formBody}>
            <p>Statement Frequency</p>
            <div className={styles.radioContainer}>
              {["MONTHLY", "BI WEEKLY", "WEEKLY", "DAILY"].map((freq) => (
                <div key={freq}>
                  <input
                    type="radio"
                    name="frequency"
                    value={freq}
                    checked={statementFrequency === freq}
                    onChange={handleFrequencyChange}
                  />
                  <label htmlFor={freq}>{freq}</label>
                </div>
              ))}
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
                <div className={styles.selectDiv}>
                <select
                  name="format"
                  id="format"
                  value={fileformat}
                  onChange={FileFormatChange}
                >
                  <option value="PDF">PDF</option>
                  <option value="CSV">CSV</option>
                </select>
                </div>
              </div>
              <div className={styles.template}>
                <p>Template</p>
                <div className={styles.selectDiv}>
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
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button}>
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditScheduleForm;

import React, { useContext, useEffect, useState } from "react";
import { AccountHeader } from "../account-ministatement/account.header";
import styles from "./account.scedule.form.module.css";
import { SelectedAcountContext } from "../context/accoint.overview.context";
import { editAccountSchedule } from "@/src/services/account/account.schedule.service";
import { usePathname, useRouter } from "next/navigation";
import { getEditScheduleData } from "@/src/lib/account.status.action";
import notification from 'antd/lib/notification';
import moment from 'moment';

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
    const fetchData = async () => {
      try {
        const data = await getEditScheduleData(id);
        setStatementFrequency(data.frequency);
        setDate(moment(data.date).format("YYYY-MM-DD"));
        setTime(moment(data.time, "HH:mm:ss").format("HH:mm"));
        setFileFormat(data.fileformat);
        setTemplateType(data.templateFormat);
      } catch (error) {
        notification.error({
          message: "Failed to load schedule data. Please try again later.",
        });
      }
    };
    fetchData();
  }, [id]);

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatementFrequency(e.target.value);
  };

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const onTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  const templateFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTemplateType(e.target.value);
  };

  const fileFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFileFormat(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      closeModal();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Network Error") {
          notification.error({
            message: "Network Error",
          });
        } else if ((error as any).response?.status === 400) {
          notification.error({
            message: "Please ensure all inputs are valid.",
          });
        } else if ((error as any).response?.status === 500) {
          notification.error({
            message: "Internal Server Error",
          });
        } else {
          notification.error({
            message: "Something went wrong. Please try again...!",
          });
        }
      } else {
        notification.error({
          message: "An unexpected error occurred. Please try again...!",
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
                <div key={freq} className={styles.frequencyoptions}>
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
                <input
                  type="date"
                  value={date}
                  onChange={onDateChange}
                />
              </div>
              <div className={styles.time}>
                <input
                  type="time"
                  value={time}
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
                    onChange={fileFormatChange}
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

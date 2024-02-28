import React, { useState, useCallback, CSSProperties } from "react";
import { DatePicker } from "antd";
import { Dayjs } from "dayjs";
import styles from "./element.module.css";

type AccountDatePickerProps<T> = {
  title?: string;
  marginRight?: string;
  onDateChange: (date: T) => void;
  styles?: CSSProperties;
};

const AccountDatePicker = <T extends Dayjs | string>(
  props: AccountDatePickerProps<T>
) => {
  const [selectedDate, setSelectedDate] = useState<T | null>(null);

  const handleDateChange = useCallback(
    (date: Dayjs | null, dateString: string) => {
      const formattedDate: T = date ? (date as T) : (dateString as T);
      setSelectedDate(formattedDate);
      props.onDateChange(formattedDate);
    },
    [props.onDateChange]
  );

  return (
    <div className={styles.container}>
      <label htmlFor="endDate">{props.title}</label>
      <DatePicker
        style={{
          borderRadius: "4px",
          border: "0.5px solid var(--Text-Text-Description-02, #979992)",
          position: "relative",
          zIndex: "1",
          ...props.styles,
        }}
        id="endDate"
        placement="bottomLeft"
        onChange={handleDateChange}
      />
    </div>
  );
};

export default AccountDatePicker;

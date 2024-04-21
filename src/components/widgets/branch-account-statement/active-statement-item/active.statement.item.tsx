import React, { useState } from "react";
import { DatePicker } from "antd";
import styles from "./active.statement.item.module.css";
import { SearchOutlined } from "@ant-design/icons";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import StatementTable from "../activity-history-table/activity.history.table";

const completedstatementdata = [
  {
    id: 1,
    date: "23-05-24",
    time: "11:00 pm",
    accountname: "Meraki Account",
    accountnumber: "KES 234578998",
    description: "Account Statement Genaration",
    status: "Complete",
  },
];

function ActiveStatement() {
  const [accountNumber, setAccountNumber] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isInputComplete, setIsInputComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e: any) => {
    setAccountNumber(e.target.value);
    setIsInputComplete(e.target.value.trim() !== "");
  };

  const handleStartDateChange = (date: any, dateString: any) => {
    setStartDate(dateString);
  };

  const handleEndDateChange = (date: any, dateString: any) => {
    setEndDate(dateString);
  };

  const handleSearchClick = (e: any) => {
    e.preventDefault();
    // API calls will be performed here before showing results
    if (accountNumber.trim() !== "" && startDate && endDate) {
      setShowResults(true);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className={styles.contentContainer}>
      <div>
        <form className={styles.container}>
          <div className={styles.inputhead}>
            <VerticalInfoDescription title={"Account Number"} />
            <ActiveStatement.Input
              value={accountNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.datehead}>
            <div>
              <VerticalInfoDescription title={"Period"} />
            </div>
            <div className={styles.datePicker}>
              <ActiveStatement.Date
                onChange={handleStartDateChange}
                placeholder={"Start Date"}
              />
              <ActiveStatement.Date
                onChange={handleEndDateChange}
                placeholder={"End Date"}
              />
            </div>
          </div>
          <div className={styles.search}>
            <button onClick={handleSearchClick} disabled={!isInputComplete}>
              <SearchOutlined />
            </button>
          </div>
        </form>
      </div>

      {showResults && (
        <div className={styles.searchoutput}>
          <StatementTable statementdata={completedstatementdata} />
        </div>
      )}
    </div>
  );
}

ActiveStatement.Input = ({ value, onChange }: any) => (
  <input
    type="text"
    placeholder="Enter account number"
    value={value}
    onChange={onChange}
    name="accountNumber"
    className={styles.input}
    required
  />
);
export default ActiveStatement;

ActiveStatement.Date = ({ onChange, placeholder, value }: any) => (
  <div>
    <DatePicker
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.inputDate}
      style={{ border: "0.5px solid #979992" }}
      required
    />
  </div>
);

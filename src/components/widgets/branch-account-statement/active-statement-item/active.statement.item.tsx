import React, { useState } from "react";
import { DatePicker } from "antd";
import styles from "./active.statement.item.module.css";
import { SearchOutlined } from "@ant-design/icons";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import StatementTable from "../activity-history-table/activity.history.table";
import { AccountStatementRequestHandler } from "@/src/services/account/account.statement.request.service";
import { SEARCH_DATA_URL } from "@/src/constants/environment";


const accountStatement =AccountStatementRequestHandler();

let statement;
let activeData:any;
function ActiveStatement() {
  const [accountNumber, setAccountNumber] = useState("");
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isInputComplete, setIsInputComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e: any) => {
    setAccountNumber(e.target.value);
    setIsInputComplete(e.target.value.trim() !== "");
    setAccountNumber('1026272611');
  };

  const handleStartDateChange = (date: any, dateString: any) => {
    setStartDate(dateString);
  };

  const handleEndDateChange = (date: any, dateString: any) => {
    setEndDate(dateString);
  };

  const handleSearchClick = async (e: any) => {
    e.preventDefault();
   
    const accountStatementRequest: AccountStatementRequest = {
      accountId: accountNumber,
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    };

    console.log(accountStatement);
    
try {
 statement = await accountStatement.createAccountStatementRequest(accountStatementRequest);
 sessionStorage.setItem('statementRequestId', statement.statementRequestId?.toString() || '');

  activeData = [
        {
          id: statement.statementRequestId,
          date: statement.startDate,
          time: "11:00 pm",
          accountname: statement.accountTitle,
          accountnumber: statement.accountId,
          description: statement.accountTitle,
          status: statement.status,
        },
      ];   
      

      
  } catch (error) {
    console.error("Error fetching account statement:", error);
  }
    if (accountNumber !== "" && startDate !== "" &&  endDate !=="") {
      setShowResults(true);
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className={styles.contentContainer}>
      <div>
        <form className={styles.container} onSubmit={handleSearchClick}>
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
                name='startDate'
              />
              <ActiveStatement.Date
                onChange={handleEndDateChange}
                placeholder={"End Date"}
                name = 'endDate'
              />
            </div>
          </div>
          <div className={styles.search}>
            <button type="submit" disabled={!isInputComplete}>
              <SearchOutlined />
            </button>
          </div>
        </form>
      </div>
      {}
      {showResults && (
        <div className={styles.searchoutput}>
          <StatementTable statementdata={activeData} />
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

ActiveStatement.Date = ({ onChange, placeholder, value,name }: any) => (
  <div>
    <DatePicker
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.inputDate}
      style={{ border: "0.5px solid #979992" }}
      name ={name}
      required
    />
  </div>
);
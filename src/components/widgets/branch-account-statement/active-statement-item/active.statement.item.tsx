import React, { useContext, useState } from "react";
import { DatePicker, notification } from "antd";
import styles from "./active.statement.item.module.css";
import { SearchOutlined } from "@ant-design/icons";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import StatementTable from "../activity-history-table/activity.history.table";
import { AccountStatementRequestHandler } from "@/src/services/account/account.statement.request.service";
import { ActiveTransactionAction } from "@/src/lib/completed.transactions.actions";
import { usePathname, useRouter } from "next/navigation";
import moment from "moment";
import { AccountStatementContext } from "../context/getAccountNumberContext";



const accountStatement =AccountStatementRequestHandler();

let statement;
let activeDataid:any;
let result:any;
const  ActiveStatement= ()=> {
  const [accountNumber, setAccountNumber] = useState("");
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isInputComplete, setIsInputComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const {accountNo, setAccountNo}= useContext(AccountStatementContext);

  const path = usePathname()
  const router = useRouter()

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


const handleSearchClick = async (e: any) => {
  e.preventDefault();

  // Validate form inputs
  if (accountNumber === "" || startDate === "" || endDate === "") {
    alert("Please fill in all required fields.");
    return;
  }
  const accountStatementRequest: AccountStatementRequest = {
    accountId: accountNumber,
    startDate: new Date(startDate),
    endDate: new Date(endDate)
  };
  try {
    // Perform account statement request
    statement = await accountStatement.createAccountStatementRequest(accountStatementRequest);
    sessionStorage.setItem('statementRequestId', statement.statementRequestId?.toString() || '');
    sessionStorage.setItem('selectedacountnumber', accountNumber);

    activeDataid = sessionStorage.getItem('statementRequestId')
    result = await ActiveTransactionAction(activeDataid);

    setAccountNumber("");
    setStartDate("");
    setEndDate("");
    setIsInputComplete(false);
    setShowResults(true);

    // Redirect to path using router
    window.location.reload();
    router.push(path);
  } catch (error) {
    console.error("Error fetching account statement:", error);
  }
};

   
console.log('num',accountNo);

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
               value={startDate !== '' ? moment(startDate) : null}

                onChange={handleStartDateChange}
                placeholder={"Start Date"}
                name='startDate'
              />
              <ActiveStatement.Date
                value={endDate !== '' ? moment(endDate) : null}

                onChange={handleEndDateChange}
                placeholder={"End Date"}
                name = 'endDate'
              />
            </div>
          </div>
          <div className={styles.search}>
            <button type="submit" disabled={!isInputComplete} >
              <SearchOutlined />
            </button>
          </div>
        </form>
      </div>
      
      {showResults && (
        <div className={styles.searchoutput}>
          <StatementTable statementdata={result} />
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
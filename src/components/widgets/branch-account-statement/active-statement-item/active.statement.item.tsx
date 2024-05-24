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
import useUserId from "@/src/hooks/userId";
import { useQuery } from "react-query";
import useProfileCreated from "@/src/hooks/useProfileCreated";



const accountStatement =AccountStatementRequestHandler();

const  ActiveStatement= ()=> {
  const [accountNumber, setAccountNumber] = useState("");
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isInputComplete, setIsInputComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const {accountNo, setAccountNo}= useContext(AccountStatementContext);

  let userinfo = useProfileCreated()
  let userId = userinfo?.userId;
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
    endDate: new Date(endDate),
    userId: parseInt(userId!)
  };
  
  try {
    // Perform account statement post request
    const statement = await accountStatement.createAccountStatementRequest(accountStatementRequest);
    sessionStorage.setItem("statementRequestId", statement.statementRequestId?.toString() || "");

    setShowResults(true);
    router.push(path);
    
  } catch (error) {
    console.error("Error fetching account statement:", error);
  }
  setAccountNumber('');
  setEndDate('');
  setStartDate('');
};

// Query to fetch active transactions based on the statementRequestId 
const statementRequestId = sessionStorage.getItem("statementRequestId");

const { data: result, isLoading, error } = useQuery(
  ['activeTransactions', statementRequestId],
  () => ActiveTransactionAction(statementRequestId!),
  {
    enabled: !!statementRequestId,
    refetchInterval: 5000,
  }
);

if (isLoading) {
  return (
    <div className="flex justify-center items-center p-3">
      Loading...
    </div>
  );
}

if (error) {
  return (
    <div className="text-center font-bold p-3">
      An error occurred: {error instanceof Error ? error.message : 'Unknown error'}
    </div>
  );
}

   

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
      
      {showResults && result && result.length > 0 && (
        <div className={styles.searchoutput}>
          <StatementTable statementdata={result!} />
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
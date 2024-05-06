import React, { CSSProperties, useEffect, useState } from "react";
import { DatePicker, notification } from "antd";
import styles from "./active.statement.item.module.css";
import { SearchOutlined } from "@ant-design/icons";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import StatementTable from "../activity-history-table/activity.history.table";
import { AccountStatementRequestHandler } from "@/src/services/account/account.statement.request.service";
import { ActiveTransactionAction } from "@/src/lib/completed.transactions.actions";
import { usePathname, useRouter } from "next/navigation";
import SelectedInput from "@/src/components/atoms/select/select.input";
import { singleUsersAccounts } from "@/src/lib/account.overview.actions";
import getProfileId from "@/src/hooks/profileId";

export type UsersAccounts = {
  key: number;
  value: number;
  option: string;
};

const accountStatement = AccountStatementRequestHandler();

let statement;
let activeDataid: any;
let result: any;
const ActiveStatement = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isInputComplete, setIsInputComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [usersAccounts, setUsersAccounts] = useState<UsersAccounts[] | null>(
    null
  );
  const path = usePathname();
  const router = useRouter();

  let profileId = getProfileId();

  useEffect(() => {
    const fetchUsersAccounts = async () => {
      try {
        const accounts = await singleUsersAccounts(profileId);
        setUsersAccounts(accounts);
      } catch (error) {
        // throw error;
        notification.error({
          message:'An Error Occured',
          description:`${error}`
        })
      }
    };
    fetchUsersAccounts();
  }, []);

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
    };

    try {
      // Perform account statement request
      statement = await accountStatement.createAccountStatementRequest(
        accountStatementRequest
      );
      sessionStorage.setItem(
        "statementRequestId",
        statement.statementRequestId?.toString() || ""
      );
      sessionStorage.setItem("selectedacountnumber", accountNumber);

      activeDataid = sessionStorage.getItem("statementRequestId");
      result = await ActiveTransactionAction(activeDataid);

      // Clear form inputs
      setAccountNumber("");
      setStartDate("");
      setEndDate("");
      setIsInputComplete(false);
      setShowResults(true);

      window.location.reload();

      router.push(path);
    } catch (error) {
      console.error("Error fetching account statement:", error);
    }
  };

  return (
    <div className={styles.contentContainer}>
      <div>
        {usersAccounts ? (
          <form className={styles.container} onSubmit={handleSearchClick}>
            <div className={styles.inputhead}>
              <VerticalInfoDescription title={"Account Number"} />
              <ActiveStatement.Selection
                options={usersAccounts!}
                onChange={handleInputChange}
                selectionStyles={{
                  outline: "none",
                  background: "#E0FFEB",
                  height: "40px",
                  borderRadius: "4px",
                  width: "290px",
                  padding: "8px",
                }}
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
                  name="startDate"
                />
                <ActiveStatement.Date
                  onChange={handleEndDateChange}
                  placeholder={"End Date"}
                  name="endDate"
                />
              </div>
            </div>
            <div className={styles.search}>
              <button type="submit" disabled={!isInputComplete}>
                <SearchOutlined />
              </button>
            </div>
          </form>
        ) : (
          <div>No Accounts Found!</div>
        )}
      </div>

      {showResults && (
        <div className={styles.searchoutput}>
          <StatementTable statementdata={result} />
        </div>
      )}
    </div>
  );
};
type selectionProps = {
  options: UsersAccounts[];
  onChange?: (e: any) => void;
  onClick?: (e: any) => void;
  selectionStyles: CSSProperties;
};

ActiveStatement.Selection = (props: selectionProps) => (
  <select
    name="period"
    id="period"
    style={props.selectionStyles}
    onChange={props.onChange}
  >
    <option value="">Select The Account</option>
    {props.options.map((option) => (
      <option value={option.value} onClick={props.onClick}>
        {option.option}
      </option>
    ))}
  </select>
);
export default ActiveStatement;

ActiveStatement.Date = ({ onChange, placeholder, value, name }: any) => (
  <div>
    <DatePicker
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.inputDate}
      style={{ border: "0.5px solid #979992" }}
      name={name}
      required
    />
  </div>
);

import React, { CSSProperties, useEffect, useState } from "react";
import { DatePicker, Modal, notification } from "antd";
import styles from "./active.statement.item.module.css";
import { SearchOutlined } from "@ant-design/icons";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import StatementTable from "../activity-history-table/activity.history.table";
import { AccountStatementRequestHandler } from "@/src/services/account/account.statement.request.service";
import { ActiveTransactionAction } from "@/src/lib/completed.transactions.actions";
import { usePathname, useRouter } from "next/navigation";
import SelectedInput from "@/src/components/atoms/select/select.input";
import { singleUsersAccounts } from "@/src/lib/account.overview.actions";
import useUserId from "@/src/hooks/userId";
import { useQuery } from 'react-query';
import { PROFILE_ID } from "@/src/constants/common";
import useProfileId from "@/src/hooks/profileId";
import useProfileCreated from "@/src/hooks/useProfileCreated";
import AccountDetailTable from "../account-detail-table/account.detail.table";

export type UsersAccounts = {
  key: number;
  value: number;
  option: string;
};

const accountStatement = AccountStatementRequestHandler();

const ActiveStatement = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isInputComplete, setIsInputComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [usersAccounts, setUsersAccounts] = useState<UsersAccounts[] | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const path = usePathname();
  const router = useRouter();

  let profileId = useProfileId();
  let userinfo = useProfileCreated()
  let userId = userinfo?.userId;

  useEffect(() => {
    if (profileId !== null && profileId !== undefined) {

    const fetchUsersAccounts = async () => {
      try {
        const accounts = await singleUsersAccounts(profileId!);
        setUsersAccounts(accounts);
      } catch (error) {
        notification.error({
          message: 'An Error Occurred',
          description: `${error}`
        });
      }
    };
    fetchUsersAccounts();
  }
  }, [profileId]);

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
      userId: parseInt(userId!),
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

  const handleEyeIconClick = (id: number) => {
    setSelectedItemId(id);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedItemId(null);
  };

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

      {showResults && result && result.length > 0 && (
        <div className={styles.searchoutput}>
          <StatementTable statementdata={result}
          onEyeIconClick={handleEyeIconClick}
           />
           <Modal
            width={"70%"}
            open={isModalVisible}
            onCancel={closeModal}
            footer={null}
          >
            {selectedItemId !== null && (
              <AccountDetailTable itemId={selectedItemId} />
            )}
          </Modal>
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
      <option key={option.key} value={option.value} onClick={props.onClick}>
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

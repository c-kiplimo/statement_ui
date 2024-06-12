import React, { useState, useEffect } from "react";
import styles from "./account.overview.status.module.css";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import AccountStatus from "./overview-status/accounts-status";
import { SelectedAcountContext } from "./context/accoint.overview.context";
import AccountMinistatement from "./account-ministatement/account.ministatement";
import SelfAccountStatement from "../self.account.statement";
import AccountSchedule from "./account-schedule/account.schedule";
import { singleUsersAccounts } from "@/src/lib/account.overview.actions";
import { UsersAccounts } from "../active-statement-item/active.statement.item";
import { notification } from "antd";
import { QueryClient, QueryClientProvider } from 'react-query';
import useProfileId from "@/src/hooks/profileId";

const queryClient = new QueryClient();

const AccountStatementSelf = () => {
  const [selectedAccount, setSelectedAccount] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("fullStatement");
  const [options, setOptions] = useState<UsersAccounts[] | null>(null);

  let profileId = useProfileId();

  useEffect(() => {
    const storedTab = localStorage.getItem("activeTab");
    if (storedTab) {
      setActiveTab(storedTab);
    }
  }, []);

  useEffect(() => {
    if (profileId !== null && profileId !== undefined) {

    const fetchUsersAccounts = async () => {
      try {
        const accounts = await singleUsersAccounts(profileId!);
        setOptions(accounts);
      } catch (error) {
        notification.error({
          message:'An Error Occurred',
          description:`${error}`
        })
        // throw error;
      }
    };
    fetchUsersAccounts();
  }
  }, [profileId]);

  const handleAccountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    setSelectedAccount(value);
  };

  const handleButtonClick = (tabName: string) => {
    setActiveTab(tabName);
    localStorage.setItem("activeTab", tabName);
  };

  return (
    <SelectedAcountContext.Provider value={{ selectedAccount }}>
    <QueryClientProvider client={queryClient}>

      <div className={styles.container}>
        <div className={styles.header}>
          <VerticalInfoDescription
            title={"Meraki Systems - Accounts"}
            description={
              "Check and configure all accounts to be accessed by Simba Portal"
            }
            titleStyle={{
              fontSize: "20px",
              fontWeight: "500",
              marginBottom: "16px",
            }}
            descriptionStyle={{ fontSize: "20px", fontWeight: "300" }}
          />
        </div>
        {activeTab !== "fullStatement" && (
          <div className={styles.select}>
            {options ? (
              <>
                <h3>Provide Account Details</h3>
                <div>
                  <select
                    name="account"
                    id="account"
                    onChange={handleAccountChange}
                    value={selectedAccount || ""}
                    className={styles.selectoption}
                  >
                    <option value="">Select The Account</option>
                    {options!.map((option) => (
                      <option key={option.key} value={option.value}>
                        {option.option}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            ) : (
              <div>No Accounts Under This Profile</div>
            )}
          </div>
        )}

        <div className={styles.buttons}>
          <button
            className={`${styles.tabButton} ${activeTab === "fullStatement" ? styles.activeButton : ""}`}
            onClick={() => handleButtonClick("fullStatement")}
          >
            Account Full Statement
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "miniStatement" ? styles.activeButton : ""}`}
            onClick={() => handleButtonClick("miniStatement")}
          >
            Account Mini Statement
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "overview" ? styles.activeButton : ""}`}
            onClick={() => handleButtonClick("overview")}
          >
            Account Overview
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "schedules" ? styles.activeButton : ""}`}
            onClick={() => handleButtonClick("schedules")}
          >
            Schedules
          </button>
        </div>

        <div className={styles.body}>
          {activeTab === "fullStatement" && <SelfAccountStatement />}
          {selectedAccount && activeTab === "miniStatement" && (
            <AccountMinistatement />
          )}
          {selectedAccount && activeTab === "overview" && <AccountStatus />}
          {selectedAccount && activeTab === "schedules" && <AccountSchedule />}
        </div>
      </div>
      </QueryClientProvider>
    </SelectedAcountContext.Provider>
  );
};

export default AccountStatementSelf;

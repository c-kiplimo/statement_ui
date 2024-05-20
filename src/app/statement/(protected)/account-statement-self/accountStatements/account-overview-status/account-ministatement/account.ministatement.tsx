import React, { useContext, useEffect, useState } from "react";
import { SelectedAcountContext } from "../context/accoint.overview.context";
import MinistatementTable from "./ministatement.table";
import { GetMinistatementAction } from "@/src/lib/accounts.ministatement.action";
import styles from "./account.ministatement.module.css";
import { AccountHeader } from "./account.header";

export type ministatementAccountDetails = {
  title: string;
  currency: string;
  accountNumber: string;
  lastActivityDate: string;
  availableBalance: string;
  workingBalance: string;
  term: string;
};
function AccountMinistatement() {
  const [ministatement, setMinistatement] = useState<any>([]);
  const { selectedAccount } = useContext(SelectedAcountContext);
  const [statusData, setStatusData] = useState<ministatementAccountDetails>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMinistatementData = async () => {
      try {
        const result = await GetMinistatementAction(selectedAccount);
        setMinistatement(result);
        setError(null);
      } catch (error) {
        setError("Failed to fetch account status");
        setMinistatement(null!);
      }
    };

    if (selectedAccount) {
      fetchMinistatementData();
    }
  }, [selectedAccount]);

  return (
    <div className={styles.container}>
      {error && (
        <div
          style={{
            color: "red",
            padding: "8px",
            border: "1px solid red",
            borderRadius: "4px",
          }}
        >
          {error}
        </div>
      )}
      <div className={styles.headerContent}>
        <AccountHeader />
      </div>
      <div className={styles.table}>
        {ministatement.length > 0 ? (
          <MinistatementTable data={ministatement} />
        ) : (
          <div className={styles.notFound}>
            The Account Has No Transactions!
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountMinistatement;

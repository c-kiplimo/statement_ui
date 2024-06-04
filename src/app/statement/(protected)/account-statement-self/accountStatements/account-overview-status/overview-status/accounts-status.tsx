import React, { useContext, useEffect, useState } from "react";
import styles from "./accounts-status.module.css";
import { SelectedAcountContext } from "../context/accoint.overview.context";
import { AccountStatusAction } from "@/src/lib/account.status.action";

export type AccountOverviewStatus = {
  openDate: string;
  accountNumber: string;
  category: string;
  customerNumber: number;
  status: string;
  currency: string;
  accountTitle: string;
};

function AccountStatus() {
  const { selectedAccount } = useContext(SelectedAcountContext);
  const [statusData, setStatusData] = useState<AccountOverviewStatus>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatusData = async () => {
      try {
        const result = await AccountStatusAction(selectedAccount);
        setStatusData(result);
        setError(null);
      } catch (error) {
        throw error;
        setStatusData(null!);
      }
    };

    if (selectedAccount) {
      fetchStatusData();
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
      {statusData ? (
        <table>
          <thead>
            <tr className={styles.tablerow}>
              <th className={`${styles.tablehrad} bodyr`}>Open Data</th>
              <th className={`${styles.tablehrad} bodyr`}>Account Number</th>
              <th className={`${styles.tablehrad} bodyr`}>Category</th>
              <th className={`${styles.tablehrad} bodyr`}>Customer Number</th>
              <th className={`${styles.tablehrad} bodyr`}>Status</th>
            </tr>
          </thead>
          <tbody className={styles.body}>
            <td>
              <span>{statusData?.openDate}</span> <br />
              <span></span>
            </td>
            <td>
              <span>{statusData?.accountTitle}</span> <br />
              <span className={` bodyl `}>
                {statusData?.currency} {statusData?.accountNumber}
              </span>
            </td>
            <td>
              <span>1046</span> <br />
              <span className={` bodyl `}>{statusData?.category}</span>
            </td>
            <td>{statusData?.customerNumber}</td>
            <td>
              <span className={styles.statusspan}>{statusData?.status}</span>
            </td>
          </tbody>
        </table>
      ) : (
        <div className="font-bold "> No Account Data Found </div>
      )}
    </div>
  );
}
export default AccountStatus;

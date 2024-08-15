import React from "react";
import styles from "./account.info.module.css";


type CompanyInfoProps = {
  accNumber: number;
  accName:string;
  currency:string;
};

const AccountInfo = ({ accNumber,accName,currency }: CompanyInfoProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.firstLatter}>
        <div className={styles.icon}>M</div>
      </div>
      <div className={styles.details}>
        <div className={styles.accountInfo}>
          <div className={`${styles.accountName} h6m`}>
            {accName}
          </div>
          <div className={`${styles.accountNumber} bodyr`}>{accNumber}</div>
          <div className={`${styles.accountCurrency} bodyr`}>
            {currency}
          </div>
        </div>
        <div className={styles.statusDiv}>ACTIVE</div>
      </div>
    </div>
  );
};

export default AccountInfo;

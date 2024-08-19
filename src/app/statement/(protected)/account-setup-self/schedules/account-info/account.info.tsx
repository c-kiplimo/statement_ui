import React from "react";
import styles from "./account.info.module.css";


type CompanyInfoProps = {
  accNumber: string;
  accName:string;
  currency:string;
  abbreviation:string;
};

const AccountInfo = ({ accNumber,accName,currency, abbreviation }: CompanyInfoProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.firstLatter}>
        <div className={styles.icon}>{abbreviation}</div>
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

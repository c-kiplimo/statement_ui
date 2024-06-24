import React from 'react'
import styles from './account.summary.module.css'

type AcccountSummaryProps ={
openingBalance:string;
spending:string;
received:string;
closingBalance:string;
}

const AccountSummaryBalances = (props:AcccountSummaryProps) => {
  return (
    <div className={styles.container}>
            <div className={styles.balancetype}>
              <div className={styles.icondivs}>
                <span>{<img src="/openingbal.svg"/>}</span>
                <span className={`${styles.balancetext} bodyr`}>Opening Balance</span>
              </div>
              <span className={`h6b`}>{ '$ ' + `${props.openingBalance}`}</span>
            </div>
            <div className={styles.balancetype}>
              <div className={styles.icondivs}>
                <span>{<img src="/spending.svg"/>}</span>
                <span className={ `${styles.balancetext} bodyr`}>Spending</span>
              </div>
              <span className={`h6b`}>{'$ ' + `${props.spending}`}</span>
            </div>
            <div className={styles.balancetype}>
              <div className={styles.icondivs}>
                <span>{<img src="/received.svg"/>}</span>
                <span className={`${styles.balancetext} bodyr`}>Received</span>
              </div>
              <span className={`h6b`}>{'$ ' + `${props.received}`}</span>
            </div>
            <div className={styles.balancetype}>
              <div className={styles.icondivs}>
                <span>{<img src="/closing.svg"/>}</span>
                <span className={`${styles.balancetext} bodyr`}>Closing Balance</span>
              </div>
              <span className={`h6b`}>{'$ ' + `${props.closingBalance}`}</span>
            </div>
          </div>
  )
}

export default AccountSummaryBalances
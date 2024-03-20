import React, { ReactNode } from "react";
import styles from "./form.module.css";
type cardDetailsProps = {
  cardName: string;
  cardNumber: string;
  cardType: string;
  cardLimit: string;
  IssueDate: string;
  expiryDate: string;
};

function CardDetails(props: cardDetailsProps) {
  return (
    <div style={{}} className={styles.container}>
      <div className={styles.formInformation}>
        <div className={styles.divstyle}>
          <label htmlFor="fname">Card Name:</label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            value={props.cardName}
            disabled
          />
        </div>
        <div className={styles.divstyle}>
          <label htmlFor="lname">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={props.cardNumber}
            disabled
          />
        </div>
        <div className={styles.divstyle}>
          <label htmlFor="lname">Card Type</label>
          <input
            type="text"
            id="cardType"
            name="cardType"
            value={props.cardType}
            disabled
          />
        </div>
        <div className={styles.divstyle}>
          <label htmlFor="lname">Card Limit</label>
          <input
            type="text"
            id="cardLimit"
            name="cardLimit"
            value={props.cardLimit}
            disabled
          />
        </div>
        <div className={styles.divstyle}>
          <label htmlFor="lname">Issue Date</label>
          <input
            type="text"
            id="issueDate"
            name="issueDate"
            value={props.IssueDate}
            disabled
          />
        </div>
        <div className={styles.divstyle}>
          <label htmlFor="lname">Expiry</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={props.expiryDate}
            disabled
          />
        </div>
      </div>
    </div>
  );
}

export default CardDetails;

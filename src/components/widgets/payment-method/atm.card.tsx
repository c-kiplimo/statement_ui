import React, { ReactNode } from "react";
import styles from "./atm.card.module.css";
import Text from "@/src/components/atoms/text/vertical-info-description";

type atmCard = {
  cardName: string;
  cardNumber: string;
  cardType: string;
  custName: string;
  chips: string;
  chips1: string;
  cardlogo: ReactNode;
};

const AtmCard = (props: atmCard) => {
  return (
    <div className={styles.container}>
      <div className={styles.descriptcontainer}>
        <div className={styles.header}>
          <div className={styles.textChip}>
            <div className={styles.text}>
              <Text title={props.cardType} titleStyle={{ color: "white" }} />
            </div>
            <div className={styles.chips}>
              <img src={props.chips} />
              <img src={props.chips1} />
            </div>
          </div>

          <div className={styles.logo}>{props.cardlogo} </div>
        </div>
        <div className={styles.description}>
          <div className={styles.accName}>
            <div className={styles.acct}>{props.cardNumber}</div>
            <div className={styles.custname}> {props.custName}</div>
          </div>
          <div className={styles.visa}>{props.cardName}</div>
        </div>
      </div>
    </div>
  );
};

export default AtmCard;

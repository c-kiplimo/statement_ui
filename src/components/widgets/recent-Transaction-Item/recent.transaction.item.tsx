import React, { ReactNode } from "react";
import styles from "./recent.transaction.item.module.css";
import Text from "@/src/components/atoms/text/vertical-info-description";

type cardDescription = {
  amount: string;
  title: string;
  date: string;
  icon: ReactNode;
  onClick?: (e: any) => {};
};
const RecentTransactionItem = (props: cardDescription) => {
  const formattedAmount =
    parseInt(props.amount) >= 0
      ? `$${parseInt(props.amount).toFixed(2)}`
      : `-$${Math.abs(parseInt(props.amount)).toFixed(2)}`;
  const amountColor = parseInt(props.amount) >= 0 ? "green" : "red";

  return (
    <div className={styles.container} onClick={props.onClick}>
      <div className={styles.icon}>{props.icon}</div>
      <div className={styles.bodyDescription}>
        <div className={styles.text}>
          <Text
            title={props.title}
            description={props.date}
            descriptionStyle={{ color: "#6f726" }}
          />
        </div>
      </div>
      <div className={styles.rcontainer}>
        <Text
          title={formattedAmount}
          description={props.date}
          titleStyle={{ color: amountColor, fontWeight: "bold" }}
          descriptionStyle={{ color: "#6f7269" }}
        />
      </div>
    </div>
  );
};

export default RecentTransactionItem;

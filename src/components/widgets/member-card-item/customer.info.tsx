import React, { ReactNode } from "react";
import styles from "./customer.info.module.css";
import Text from "@/src/components/atoms/text/vertical-info-description";

type CustomerDetailsProps = {
  src: string;
  alt?: string;
  title: string;
  amount: string;
  arrow: any;
  onClick?: () => void;
};

const CustomerDetails = (props: CustomerDetailsProps) => {
  return (
    <div className={styles.container} onClick={props.onClick}>
      <div className={styles.description}>
        <div className={styles.icon}>
          <img src={props.src} alt={props.alt} />
        </div>
        <div className={styles.custname}>
          <Text
            title={props.title}
            titleStyle={{
              color: "#6F7269",
            }}
          />
        </div>
      </div>

      <div className={styles.arrowAmount}>
        <Text
          title={props.amount}
          titleStyle={{
            color: "#151E00",
            lineHeight: "24px",
            width: "72px",
            height: "24px",
          }}
        />
        <div className={styles.arrow}>{props.arrow}</div>
      </div>
    </div>
  );
};

export default CustomerDetails;

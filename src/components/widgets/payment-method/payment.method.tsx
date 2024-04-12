import React, { ReactNode } from "react";
import styles from "./payment.method.module.css";

import VerticalInfoDescription from "../../atoms/text/vertical-info-description";
import CardDetails from "../../atoms/forms/form";
import AtmCard from "./atm.card";
import Button from "../../atoms/dropDownButton/button";
import { CaretDownOutlined } from "@ant-design/icons";

const options = [
  {
    key:1,
    value:'card',
    option:'Card'
  },
]
type paymentmethodProps = {
  cardName: string;
  cardTtype: string;
  cardNumber: string;
  cardLimit: string;
  issueDate: string;
  expiryDate: string;
  custName: string;
  chips: string;
  chips1: string;
  cardLogo: ReactNode;
  title: string;
  icon: ReactNode;
  CaretDownOutlined: ReactNode;
  onClick?:()=>void;
};

const PaymentMethod = (props: paymentmethodProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.drptcontainer}>
        <Button icon={<CaretDownOutlined />} options={options} textColor={"#6F7269"} iconColor={"#6F7269"} bgColor={"#F5F5F5"} icon1={props.icon}/>
      </div>
      <div className={styles.bodycontainer}>
        <div className={styles.card}>
          <AtmCard
            cardName={props.cardName}
            cardNumber={props.cardNumber}
            cardType={props.cardTtype}
            custName={props.custName}
            chips={props.chips}
            cardlogo={props.cardLogo}
            chips1={props.chips1}
          />
        </div>
        <div>
          <div className={styles.formcontainer}>
            <div className={styles.header}>
              <VerticalInfoDescription
                title={props.title}
                titleStyle={{
                  color: "#151E00",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              />
            </div>
            <div>
              <CardDetails
                cardName={props.cardName}
                cardNumber={props.cardNumber}
                cardType={props.cardTtype}
                cardLimit={props.cardLimit}
                IssueDate={props.issueDate}
                expiryDate={props.expiryDate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;

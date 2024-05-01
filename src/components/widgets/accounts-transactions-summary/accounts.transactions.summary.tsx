import React, { ReactNode } from "react";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";
import styles from "./accounts.transactions.summary.module.css";
import SelectedInput from "../../atoms/select/select.input";
import CustomButton from "../../atoms/button/custom.button";
import RecentTransactionItem from "../recent-Transaction-Item/recent.transaction.item";

interface DataTypes {
  key: number;
  value: string;
  option: string;
}

export interface TransfersData {
  id: number;
  icon?: ReactNode;
  title: string;
  date: string;
  amount: string;
}

type accountProps = {
  headerTitle: string;
  options: DataTypes[];
  data: TransfersData[];
  onChange?:(e:any)=>void
};

const AccountTransactionSummary = (props: accountProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <AccountTransactionSummary.Title title={props.headerTitle} />
        </div>
        <div>
          <AccountTransactionSummary.Selection option={props.options} onChange={props.onChange}/>
        </div>
      </div>
      <div>
        <AccountTransactionSummary.Body transactionData={props.data} />
      </div>

      <div className={styles.btn}>
        <AccountTransactionSummary.Btn />
      </div>
    </div>
  );
};

export default AccountTransactionSummary;

type titleProps = {
  title: string;
  titleStles?: string;
};

AccountTransactionSummary.Title = (props: titleProps) => (
  <VerticalInfoDescription
    title={props.title}
    titleStyle={{ color: "#1A2600", fontSize: "20px", fontWeight: "700" }}
  />
);

type selectionProps = {
  option: DataTypes[];
  onChange?:(e:any)=>void;
  onClick?:(e:any)=>void;
};
AccountTransactionSummary.Selection = (props: selectionProps) => (
  <SelectedInput
    options={props.option}
    onchange={props.onChange}
    onclick={props.onClick}
    selectionStyles={{
      border: "1px solid #E6E6E6",
      outline: "none",
      height: "24px",
      borderRadius: "4px",
    }}
  />
);

type bodyprops = {
  transactionData: TransfersData[];
};

AccountTransactionSummary.Body = (props: bodyprops) => {
  return (
    <div>
      {props.transactionData.map((data) => (
        <div key={data.id}>
          <RecentTransactionItem
            amount={data.amount}
            title={data.title}
            icon={data.icon}
            description={data.date}
          />
        </div>
      ))}
    </div>
  );
};

AccountTransactionSummary.Btn = () => (
  <CustomButton
    buttonName={"View More"}
    buttonStyle={{
      color: "#84BD00",
      backgroundColor: "#EFF2E6",
      borderRadius: "27px",
      width: "138px",
      height: "40px",
    }}
  />
);

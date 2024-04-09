import React, { ReactNode } from "react";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";
import CashFlow from "../cashFlow/cashFlow";
import TransactionCard from "../transaction-flow/transactionFlow";
import styles from "./cashflow.card.home.module.css";
import SelectedInput from "../../atoms/select/select.input";
import CustomButton from "../../atoms/button/custom.button";

interface DataType {
  id: number;
  icon: ReactNode;
  title: string;
  description: string;
  percentage: number;
  strokecolor: string;
}

interface DataTypes {
  key: number;
  value: string;
  option: string;
}

type cashflowProp = {
  headerTitle: string;
  moneyInIcon: ReactNode;
  moneyInTitle: string;
  moneyInbalance: string;
  moneyOutIcon: ReactNode;
  moneyOutTitle: string;
  moneyOutbalance: string;
  progressdata: DataType[];
  options: DataTypes[];
};

const CashflowCardHome = (props: cashflowProp) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <CashflowCardHome.Title title={props.headerTitle} />
        </div>
        <div>
          <CashflowCardHome.Selection option={props.options} />
        </div>
      </div>

      <div className={styles.amount}>
        <CashflowCardHome.Amount
          icon={props.moneyInIcon}
          title={props.moneyInTitle}
          amount={props.moneyInbalance}
          bgcolor="#84BD00"
        />
        <CashflowCardHome.Amount
          icon={props.moneyOutIcon}
          title={props.moneyOutTitle}
          amount={props.moneyOutbalance}
          bgcolor="#FEDEE5"
        />
      </div>

      <div className={styles.progress}>
        <CashflowCardHome.Progress progressdata={props.progressdata} />
      </div>

      <div className={styles.btn}>
        <CashflowCardHome.Btn />
      </div>
    </div>
  );
};

export default CashflowCardHome;

type titleProps = {
  title: string;
  titleStles?: string;
};

CashflowCardHome.Title = (props: titleProps) => (
  <VerticalInfoDescription
    title={props.title}
    titleStyle={{ color: "#1A2600", fontSize: "20px", fontWeight: "700" }}
  />
);

type selectionProps = {
  option: DataTypes[];
};
CashflowCardHome.Selection = (props: selectionProps) => (
  <SelectedInput
    options={props.option}
    selectionStyles={{
      border: "1px solid #E6E6E6",
      outline: "none",
      height: "24px",
      borderRadius: "4px",
    }}
  />
);

type amountProp = {
  icon: ReactNode;
  title: string;
  amount: string;
  bgcolor: string;
};
CashflowCardHome.Amount = (props: amountProp) => (
  <CashFlow
    icon={props.icon}
    title={props.title}
    description={props.amount}
    backgroundcolor={props.bgcolor}
  />
);

type progressProp = {
  progressdata: DataType[];
};

CashflowCardHome.Progress = (props: progressProp) => {
  return (
    <div>
      {props.progressdata.map((progress) => (
        <div className="mb-1">
          <TransactionCard
            icon={progress.icon}
            title={progress.title}
            description={progress.description}
            percentage={progress.percentage}
            strokeColor={progress.strokecolor}
          />
        </div>
      ))}
    </div>
  );
};

CashflowCardHome.Btn = () => (
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

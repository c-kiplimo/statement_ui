import React, { CSSProperties, ReactNode, useState } from "react";
import SummaryItem from "../summary-items/summary-items";
import styles from "./saving.account.balance.module.css";
import CustomButton from "../../atoms/button/custom.button";
import { CaretDownOutlined } from "@ant-design/icons";
import Button from "../../atoms/dropDownButton/button";


type AccountOptions ={
    key: number,
    value: string,
    option: string,
}


type DataType = {
  id: number;
  titleIcon: ReactNode;
  summaryTitle: string;
  titleDescription: string;
  amount: string;
  arrowIcon: ReactNode;
  percentage: string;
  date: string;
};

type SavingAccountBalanceProps = {
  accountBalances: DataType[];
  accountSelectionOptions:AccountOptions[]
  onChange?:(e:any)=>void
};

const SavingAccountBalance = (props: SavingAccountBalanceProps) => {
  const [activeButton, setActiveButton] = useState<string>("");

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.select}>
          <SavingAccountBalance.SelectAccount accountOptions={props.accountSelectionOptions} onChange={props.onChange}/>
        </div>

        <div className={styles.button}>
          <SavingAccountBalance.Btn
            buttonName="1D"
            isActive={activeButton === "1D"}
            onClick={() => handleButtonClick("1D")}
          />
          <SavingAccountBalance.Btn
            buttonName="7D"
            isActive={activeButton === "7D"}
            onClick={() => handleButtonClick("7D")}
          />
          <SavingAccountBalance.Btn
            buttonName="1M"
            isActive={activeButton === "1M"}
            onClick={() => handleButtonClick("1M")}
          />
          <SavingAccountBalance.Btn
            buttonName="1Y"
            isActive={activeButton === "1Y"}
            onClick={() => handleButtonClick("1Y")}
          />
        </div>
      </div>
      <div className={styles.month}>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {props.accountBalances.map((balance) => (
          <div key={balance.id}>
            <SummaryItem
              svgIcon={balance.titleIcon}
              summaryTitle={balance.summaryTitle}
              titleDescription={balance.titleDescription}
              amount={balance.amount}
              svgIcons={balance.arrowIcon}
              percentage={balance.percentage}
              date={balance.date}
            />
          </div>
        ))}s
      </div>
      </div>
    </div>
  );
};

export default SavingAccountBalance;

type selectProps={
  onClick?:(e:any)=>void,
  onChange?:(e:any)=>void,
  accountOptions:AccountOptions[]

}
SavingAccountBalance.SelectAccount = (props:selectProps) => (
  <Button
    icon={<CaretDownOutlined />}
    options={props.accountOptions}
    textColor="#6F7269"
    iconColor="#6F7269"
    bgColor="#F5F5F5"
    icon1={<img src="/savingss.svg" alt="icon" />}
    onChange={props.onChange}
    onClick={props.onClick}
  />
);

type ButtonProps = {
  buttonName: string;
  isActive: boolean;
  buttonStyles?: CSSProperties;
  onClick?: () => void;
};

SavingAccountBalance.Btn = (props: ButtonProps) => (
  <CustomButton
    buttonName={props.buttonName}
    buttonStyle={{
      borderRadius: "4px",
      padding: "4px",
      backgroundColor: props.isActive ? "#F5F5F5" : "",
    }}
    onClick={props.onClick}
  />
);

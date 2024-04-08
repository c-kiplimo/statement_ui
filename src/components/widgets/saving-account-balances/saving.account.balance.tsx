import React, { CSSProperties, ReactNode, useState } from "react";
import SummaryItem from "../summary-items/summary-items";
import styles from "./saving.account.balance.module.css";
import CustomButton from "../../atoms/button/custom.button";
import { CaretDownOutlined } from "@ant-design/icons";
import Button from "../../atoms/dropDownButton/button";

const accountOptions = [
  {
    key: 1,
    value: "savingAccount",
    option: "Saving Account",
  },
  {
    key: 2,
    value: "currentAccount",
    option: "Current Account",
  },
  {
    key: 1,
    value: "fixedAccount",
    option: "Fixed Account",
  },
  {
    key: 1,
    value: "savingAccount",
    option: "Money Market Fund",
  },
];
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
  accounBalances: DataType[];
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
          <SavingAccountBalance.SelectAccount />
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
      <div className={styles.body}>
        {props.accounBalances.map((balances) => (
          <div className={styles.content}>
            <SummaryItem
              svgIcon={balances.titleIcon}
              summaryTitle={balances.summaryTitle}
              titleDescription={balances.titleDescription}
              amount={balances.amount}
              svgIcons={balances.arrowIcon}
              percentage={balances.percentage}
              date={balances.date}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavingAccountBalance;
SavingAccountBalance.SelectAccount = () => (
  <Button
    icon={<CaretDownOutlined />}
    options={accountOptions}
    textColor={"#6F7269"}
    iconColor={"#6F7269"}
    bgColor={"#F5F5F5"}
    icon1={<img src="/savingss.svg" />}
  />
);
type ButtonProps = {
  buttonName: string;
  isActive: boolean;
  buttonStyles?: CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
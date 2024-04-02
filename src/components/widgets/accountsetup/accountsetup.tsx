import React, { ReactNode, useState } from "react";
import { Radio, Input, RadioChangeEvent } from "antd";
import Styles from "./accountsetup.module.css";

type accountSetupprops = {
  title: string;
  instruction: string;
  option: string;
  icon: ReactNode;
  account: string;
  customer: string;
  onClick?: () => void;
};

const Accountsetup = (props: accountSetupprops) => {
  const [searchOption, setSearchOption] = useState<string>("customer");
  const [accountNumber, setAccountNumber] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");

  const handleOptionChange = (e: RadioChangeEvent) => {
    setSearchOption(e.target.value);
  };

  return (
    <div className={Styles.container} onClick={props.onClick}>
      <div className={Styles.titleContainer}>
        <div className={Styles.textcontainer}>
          <div className={Styles.title}>{props.title}</div>
          <div className={Styles.description}>{props.instruction}</div>
        </div>
      </div>
      <div className={Styles.details}>
        <div className={Styles.radioContainer}>
          <div className={Styles.querry}>{props.option}</div>

          <Radio.Group
            onChange={handleOptionChange}
            value={searchOption}
            className={Styles.radioGroup}
          >
            <Radio
              value="account"
              style={{ color: "#6F7269", fontFamily: "Roboto" }}
            >
              {props.account}{" "}
            </Radio>

            <Radio
              value="customer"
              style={{ color: "#6F7269", fontFamily: "Roboto" }}
            >
              {props.customer}
            </Radio>
          </Radio.Group>
        </div>

        {searchOption && (
          <div className={Styles.formcontainer}>
            <div className={Styles.header}>
              Enter {searchOption === "account" ? "Account" : "Customer"}{" "}
              Number:
            </div>
            <Input
              value={
                searchOption === "account" ? accountNumber : customerNumber
              }
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) =>
                searchOption === "account"
                  ? setAccountNumber(e.target.value)
                  : setCustomerNumber(e.target.value)
              }
              placeholder={` ${
                searchOption === "account" ? "0002 4544 9206" : "56809"
              } `}
            />
          </div>
        )}
        <div className={Styles.searchbutton}>
          <div className={Styles.icon}>{props.icon}</div>
        </div>
      </div>
    </div>
  );
};

export default Accountsetup;

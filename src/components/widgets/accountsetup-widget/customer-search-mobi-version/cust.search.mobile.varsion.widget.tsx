import React, { useState } from "react";
import { Radio, Input, RadioChangeEvent, Form } from "antd";
import Styles from "./cust.search.mobile.varsion.module.css";
import { SearchOutlined } from "@ant-design/icons";

type AccountSetupProps = {
  title: string;
  instruction: string;
  option: string;
  icon: React.ReactNode;
  account: string;
  customer: string;
  onClick?: (searchOption: string, searchValue: string) => void; 
};


export let profId=localStorage.getItem("searchedValue")
export let profileId=10

const Accountsetup = (props: AccountSetupProps) => {
  const [searchOption, setSearchOption] = useState<string>("customer");
  const [accountNumber, setAccountNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleOptionChange = (e: RadioChangeEvent) => {
    setSearchOption(e.target.value);
  };

  const handleSubmit = async () => {
    const onboardingType = searchOption === "account" ? "ACCOUNT_NUMBER" : "CUSTOMER_NUMBER";
    const searchValue = searchOption === "account" ? accountNumber : customerName;   

    if (!searchValue) {
      alert("Please enter a valid id.");
      return;
    }

    try {
      setSearchResult(null);
      if (props.onClick) {
        props.onClick(onboardingType, searchValue);
      }
    } catch (error) {
      console.error("Error occurred during search:", error);
      setSearchResult("notFound");
    }
  };

  return (
  
    <Form className={Styles.form} onFinish={handleSubmit}>
        <div className={Styles.titleContainer}>
          
            <div className={`${Styles.title} bodyb`}>{props.title}</div>
            <div className={`${Styles.description} captionl`}>{props.instruction}</div>
          
        </div>

        
         
            <div className={Styles.radioContainer}>
              <div className={`${Styles.querry} captionr`}>{props.option}</div>
              <Radio.Group
                onChange={handleOptionChange}
                value={searchOption}
                className={Styles.radioGroup}
              >
                <Radio className={`${Styles.radio} captionr`} value="account">{props.account}</Radio>
                <Radio className={`${Styles.radio} captionr`} value="customer">{props.customer}</Radio>
              </Radio.Group>
            </div>

            {searchOption && (
              <div className={Styles.formContainer}>
                <div className={Styles.input}>
                <div className={`${Styles.header} captionr`}>
                  Enter {searchOption === "account" ? "Account" : "Customer"}{" "}
                  {searchOption === "account" ? "Number" : "Number"}:
                </div>
                <Input className={Styles.label}
                  value={searchOption === "account" ? accountNumber : customerName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    searchOption === "account"
                      ? setAccountNumber(e.target.value)
                      : setCustomerName(e.target.value)
                  }
                  placeholder={`${
                    searchOption === "account" ? "0002 4544 9206" : "Enter Customer ID"
                  }`}
                />
                </div>
            <div className={Styles.button}>
            <button className={Styles.icon} style={{ color: "white" }} type="submit">
              {props.icon}
            </button>
          </div>
              </div>
            )}
        </Form>
  );
};

export default Accountsetup;

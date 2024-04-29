import React, { useState } from "react";
import { Radio, Input, RadioChangeEvent, Form } from "antd";
import Styles from "./cust.details.search.module.css";
import { useRouter } from "next/navigation";

type AccountSetupProps = {
  title: string;
  instruction: string;
  option: string;
  icon?: React.ReactNode;
  account: string;
  customer: string;
  onClick?: () => void;
};

const Accountsetup = (props: AccountSetupProps) => {
  const [searchOption, setSearchOption] = useState<string>("customer");
  const [accountNumber, setAccountNumber] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const router = useRouter();

  const handleOptionChange = (e: RadioChangeEvent) => {
    setSearchOption(e.target.value);
  };

  const handleSubmit = (values: any) => {
    // Handle form submission here
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.titleContainer}>
        <div className={Styles.textcontainer}>
          <div className={Styles.title}>{props.title}</div>
          <div className={Styles.description}>{props.instruction}</div>
        </div>
      </div>

      <Form className={Styles.form} onFinish={handleSubmit}>
        <div className={Styles.details}>
          <div className={Styles.radioContainer}>
            <div className={Styles.querry}>{props.option}</div>

            <Radio.Group
              onChange={handleOptionChange}
              value={searchOption}
              className={Styles.radioGroup}
            >
              <Radio value="account">
                {props.account}
              </Radio>

              <Radio value="customer">
                {props.customer}
              </Radio>
            </Radio.Group>
          </div>

          {searchOption && (          
            <div className={Styles.formContainer}>
              <div className={Styles.header}>
                Enter {searchOption === "account" ? "Account" : "Customer"}{" "}
                Number:
              </div>
              <Input
                value={
                  searchOption === "account" ? accountNumber : customerNumber
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
        </div>

        <div className={Styles.button}>
          <button className={Styles.icon} style={{ color: "white" }} type="submit">
            {props.icon}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Accountsetup;

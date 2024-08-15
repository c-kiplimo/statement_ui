import React, { useState } from "react";
import styles from "./customer-search.module.css";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import { Form, Input, notification, Radio, RadioChangeEvent } from "antd";
import { CloseCircleOutlined, SearchOutlined } from "@ant-design/icons";

type CustomerSearchProps = {
  option: string;
  account: string;
  customer: string;
  onClick?: (searchOption: string, searchValue: string) => void;
};

const CustomerSearch = ({ option, account, customer,onClick }: CustomerSearchProps) => {
  const [searchOption, setSearchOption] = useState<string>("customer");
  const [accountNumber, setAccountNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [searchResult, setSearchResult] = useState<string | null>(null);

  const handleOptionChange = (e: RadioChangeEvent) => {
    setSearchOption(e.target.value);
  };

  const handleFinish = async () => {
    const onboardingType = searchOption === "account" ? "ACCOUNT_NUMBER" : "CUSTOMER_NUMBER";
    const searchValue = searchOption === "account" ? accountNumber : customerName;   

    if (!searchValue) {
        notification.error({
            style:{color:"white"},
            message: "Please enter valid account details.",
            description: "",
            icon: <CloseCircleOutlined style={{ color: "white" }} />,
            className: 'bodyr failure-notification', 
            placement: "topRight",
            duration: 1,
          });
      return;
    }

    try {
      setSearchResult(null);
      if (onClick) {
        onClick(onboardingType, searchValue);
      }
    } catch (error) {
      console.error("Error occurred during search:", error);
      notification.error({
        style:{color:"white"},
        message: "An error occured during search.Please try again.",
        description: "",
        icon: <CloseCircleOutlined style={{ color: "white" }} />,
        className: 'bodyr failure-notification', 
        placement: "topRight",
        duration: 1,
      });
      setSearchResult("notFound");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <VerticalInfoDescription
          title="Customer Details Search"
          titleStyle={{ fontWeight: "500", fontSize: "20px",paddingBottom:"16px"}}
          description="Setup the customer by using account number or customer number"
          descriptionStyle={{ fontWeight: "300", fontSize: "16px" }}
        />
      </div>
     
        <Form
          style={{ width: "100%" }}
            layout="horizontal"
          onFinish={handleFinish}
        >
         <div className={styles.searchCriteria}>
          <div className={styles.inputFrame}>
            <div className={styles.inputContainer}>
              <div className={styles.radioContainer}>
                <div className={`${styles.querry} bodyr`}>{option}</div>
                <div className={styles.radioBtn}>
                  <Radio.Group
                    onChange={handleOptionChange}
                    value={searchOption}
                    className={styles.radioGroup}
                  >
                    <Radio className={styles.radio} value="account">
                      {account}
                    </Radio>
                    <Radio className={styles.radio} value="customer">
                      {customer}
                    </Radio>
                  </Radio.Group>
                </div>
              </div>
              {searchOption && (
                <div className={styles.searchInput}>
                  <div className={`${styles.searchTitle} bodyr`}>
                    Enter {searchOption === "account" ? "Account" : "Customer"}{" "}
                    {searchOption === "account" ? "Number" : "Number"}:
                  </div>
                  <Input
                    className={styles.input}
                    value={
                      searchOption === "account" ? accountNumber : customerName
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      searchOption === "account"
                        ? setAccountNumber(e.target.value)
                        : setCustomerName(e.target.value)
                    }
                    placeholder={`${
                      searchOption === "account"
                        ? "Enter account number"
                        : "Enter customer number"
                    }`}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.button}>
            <button className={styles.icon} type="submit">
              <SearchOutlined size={16} />
            </button>
          </div>
         </div>
        </Form>
     
    </div>
  );
};

export default CustomerSearch;

import React, { useState } from "react";
import styles from "./search-profile.module.css";
import { Form, Select, Input } from "antd";
import VerticalInfoDescription from "../../../../../../components/atoms/text/vertical-info-description";
import { useTokens } from "@/src/app/(context)/ColorContext";
import { Label } from "../../../../../../components/atoms/label/label";
import CustomButton from "../../../../../../components/atoms/button/customButton";
import { SEARCH_CUSTOMER_URL } from "@/src/constants/environment";
import { onBoardingHandler } from "@/src/services/auth/onboarding.service";

const ProfileSearch = ({ inputLabel }: { inputLabel: string }) => {
  const token = useTokens();
  const { searchCustomerService } = onBoardingHandler();
  const [accountNumber, setAccountNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleSubmit = async () => {
    if (accountNumber === "") {
      alert("Please fill all inputs");
    } else {
      try {
        const result = await searchCustomerService(
          `${SEARCH_CUSTOMER_URL}${accountNumber}/${selectedCountry}`
        );
        console.log("result", result);
        alert("Successful form submit");
        setAccountNumber("");
      } catch (error) {
        console.error("API call failed:", error);
      }
    }
  };

  const countries = [
    { value: "", label: "Select a country" },
    { value: "kenya", label: "Kenya" },
    { value: "rwanda", label: "Rwanda" },
    { value: "uganda", label: "Uganda" },
    { value: "tanzania", label: "Tanzania" },
  ];

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formBody}>
          <div className={styles.header}>
            <VerticalInfoDescription
              title="Provide Details to allow us create your profile"
              description="We provide ability for you to on board to any country of your choice and ability to switch between different countries"
              titleStyle={{
                color: token.text.secondary,
                fontSize: "20px",
                fontWeight: "700",
              }}
            />
          </div>

          <div className={styles.inputContainer}>
            <Label htmlFor="country" label="Which Country" />
            <Form.Item
              name="country"
              rules={[{ required: true, message: "Please select a country" }]}
              style={{ width: "100%" }}
            >
              <Select
                className="w-full"
                value={selectedCountry}
                onChange={setSelectedCountry}
              >
                {countries.map((country) => (
                  <Select.Option key={country.value} value={country.value}>
                    {country.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className={styles.inputContainer}>
            <Label htmlFor="account" label={inputLabel} />
            <Form.Item
              name="account"
              rules={[
                { required: true, message: `Please enter your ${inputLabel}` },
              ]}
              style={{ width: "100%" }}
            >
              <input
                type="text"
                name="accountNumber"
                placeholder="Enter your Account Number   "
                value={accountNumber}
                onChange={(event) => setAccountNumber(event.target.value)}
                className={styles.input}
              />
            </Form.Item>
          </div>

          <div className={styles.button}>
            <CustomButton
              bgColor="var(--brand-brand-primary)"
              type="submit"
              className={`${styles.searchBtn} bodyr`}
              text="Search"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileSearch;

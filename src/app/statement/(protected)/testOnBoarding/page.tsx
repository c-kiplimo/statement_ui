"use client"

import React, { useState } from "react";
import styles from "@/src/app/statement/(protected)/onBoarding/onBoardingComponents/profile/profile.module.css";
import {
  ContactsOutlined,
  IdcardOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Form, Modal, Select, notification } from "antd";
import ProfileSearch from "@/src/app/statement/(protected)/onBoarding/onBoardingComponents/profileSearch/search-profile";
import Texter from "@/src/components/atoms/text/texter";
import SelectionItem from "@/src/components/widgets/selectionItem/selectionItem";
import CustomButton from "@/src/components/atoms/button/customButton";
import { Label } from "@/src/components/atoms/label/label";
import { SearchCustomerHandler } from "@/src/services/auth/searchCustomer.service";
import { useTokens } from "@/src/app/(context)/ColorContext";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";

const LoginCard = [
  {
    id: 1,
    icon: <UserAddOutlined />,
    CardTitle: "Customer  Number",
    CardDescription: "View Statements",
  },
  {
    id: 2,
    icon: <UsergroupAddOutlined />,
    CardTitle: "Account  Number",
    CardDescription: "Manage corporate users",
  },
  {
    id: 3,
    icon: <IdcardOutlined />,
    CardTitle: "ID Number",
    CardDescription: "Use your National id number",
  },
  {
    id: 4,
    icon: <ContactsOutlined />,
    CardTitle: "Passport  Number",
    CardDescription: "Use your National id number",
  },
];

const Profile = ({ onProfileSuccess }: { onProfileSuccess: (success: boolean) => void }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCardTitle, setSelectedCardTitle] = useState<string>(" ");

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const handleSearchResults = (results: unknown) => {
    console.log("Search results:", results);
    onProfileSuccess(true);
  };

  const handleOptionChange = (newValue: string | null) => {
    setSelectedOption(newValue);
    openModalHandler();
    const selectedCard = LoginCard.find((card) => card.id.toString() === newValue);
    if (selectedCard) {
      setSelectedCardTitle(selectedCard.CardTitle);
    }
  };

  const token = useTokens();
  const { SearchCustomerService } = SearchCustomerHandler();
  const [searchType, setSearchType] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleSubmit = async () => {
    if (searchType === "" || selectedCountry === "") {
      notification.info({
        message: "Please fill all the fields",

      });
    }else {
        try{
        const response = await  SearchCustomerService(selectedOption,selectedCountry)
          console.log ("Response>>",response);

          if(response.status === 200){
            notification.success({
              message: "Account found",
            })
          }else{
            console.error("Account search failed:",response);
            notification.error({
              message: `${selectedCardTitle} not found`,
              description:
                `There was an error while searching for your ${selectedCardTitle}. Please try again later.`,
            });
          }
        }catch(error){
            console.error("API call failed:", error);
        };
    };
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
      <div className={styles.header}>
        <Texter
          text="Select the option you prefer for to use for onboarding?"
          className="h6b"
        />
      </div>
      <div className={styles.logCard}>
        {LoginCard.map((card) => (
          <SelectionItem
            key={card.id}
            id={card.id.toString()}
            icon={card.icon}
            text={card.CardTitle}
            textDesc={card.CardDescription}
            onClick={handleOptionChange}
            activeCardId={selectedOption}
          />
        ))}

        {showModal && (
          <Modal
            open={showModal}
            onCancel={closeModalHandler}
            footer={null}
            className={styles.modal}
          >
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
            <Label htmlFor="account" label={selectedCardTitle} />
            <Form.Item
              name="account"
              rules={[
                { required: true, message: `Please enter your ${selectedCardTitle}` },
              ]}
              style={{ width: "100%" }}
            >
              <input
                type="text"
                name={`${selectedCardTitle}`}
                placeholder={`Enter your ${selectedCardTitle}`}
                value={searchType}
                onChange={(event) => setSearchType(event.target.value)}
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
           
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Profile;
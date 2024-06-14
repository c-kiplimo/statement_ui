import React, { useState } from "react";
import styles from "./search-details.module.css";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ContactsOutlined,
  IdcardOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Form, Modal, Select, notification } from "antd";
import Texter from "@/src/components/atoms/text/texter";
import SelectionItem from "@/src/components/widgets/selectionItem/selectionItem";
import CustomButton from "@/src/components/atoms/button/customButton";
import { Label } from "@/src/components/atoms/label/label";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import { useOnboardingContext } from "../../context/onBoardingContext";
import { SearchCustomerHandler } from "@/src/services/auth/searchCustomer.service";
import { useTokens } from "@/src/app/(context)/ColorContext";

interface SearchDetailsProps {
  onSuccess: () => void;
}

const LoginCard = [
  {
    id: "CUSTOMER_NUMBER",
    icon: <UserAddOutlined />,
    CardTitle: "Customer Number",
    CardDescription: "View Statements",
  },
  {
    id: "ACCOUNT_NUMBER",
    icon: <UsergroupAddOutlined />,
    CardTitle: "Account Number",
    CardDescription: "Manage corporate users",
  },
  {
    id: "ID_NUMBER",
    icon: <IdcardOutlined />,
    CardTitle: "ID Number",
    CardDescription: "Use your National id number",
  },
  {
    id: "PASSPORT_NUMBER",
    icon: <ContactsOutlined />,
    CardTitle: "Passport Number",
    CardDescription: "Use your National id number",
  },
];

const SearchDetails: React.FC<SearchDetailsProps> = ({ onSuccess }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCardTitle, setSelectedCardTitle] = useState<string>(" ");
  const token = useTokens();
  const [searchType, setSearchType] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const handler = SearchCustomerHandler();
  const { profile, updateProfile } = useOnboardingContext();

  const countries = [
    { value: "", label: "Select a country" },
    { value: "Kenya", label: "Kenya" },
    { value: "Rwanda", label: "Rwanda" },
    { value: "Uganda", label: "Uganda" },
    { value: "Tanzania", label: "Tanzania" },
  ];

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);  
  };

  const handleOptionChange = (newValue: string | null) => {
    console.log("Option selected:", newValue);
    setSelectedOption(newValue);
    openModalHandler();
    const selectedCard = LoginCard.find((card) => card.id.toString() === newValue);
    if (selectedCard) {
      setSelectedCardTitle(selectedCard.CardTitle);
    }
  };

  const handleSubmit = async () => {
    let account = searchType;
    let country = selectedCountry;
    let option = selectedOption;

    try {
      await handler.SearchCustomerService(option!, account, country).then((response) => {
        console.log(response);
        notification.success({
          message: "Account found",
          description: '',
          icon: <CheckCircleOutlined style={{ color: "white" }} />,
          className: 'bodyr success-notification', 
          placement: 'topRight',
          duration: 1,
        });

        let newProfile: OnBoarding = {
          email: response.email,
          mobileNumber: response.mobileNumber,
          customerId: response.customerId,
          country: response.country,
          customerName: response.customerName,
        };
        updateProfile({ ...profile, ...newProfile });
        console.log("Values>>", newProfile);
        onSuccess();
      });
      setShowModal(false);
    } catch (error) {
      console.error("Account search failed:", error);
      notification.error({
        message: "Account not found.Please try again.",
        description: '',
        icon: <CloseCircleOutlined style={{ color: "white" }} />,
        className: 'bodyr failure-notification', 
        placement: 'topRight',
        duration: 1,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Texter
          text="Select the option you prefer for onboarding"
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
            <div className={styles.modalContainer}>
              <Form onFinish={handleSubmit}>
                <div className={styles.formBody}>
                  <div className={styles.formHeader}>
                    <VerticalInfoDescription
                      title="Provide Details to allow us create your profile"
                      description="We provide the ability for you to onboard to any country of your choice and the ability to switch between different countries."
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
                      rules={[
                        { required: true, message: "Please select a country" },
                      ]}
                      style={{ width: "100%" }}
                    >
                      <Select
                        className="w-full"
                        defaultValue="Select country"
                        onChange={setSelectedCountry}
                      >
                        {countries.map((country) => (
                          <Select.Option
                            key={country.value}
                            value={country.value}
                          >
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
                        {
                          required: true,
                          message: `Please enter your ${selectedCardTitle}`,
                        },
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
              </Form>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default SearchDetails;

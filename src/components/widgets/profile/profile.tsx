import React, { CSSProperties, useState } from "react";
import styles from "./profile.module.css";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";
import SelectionItem from "../selection-item/selectionItem";
import {
  ContactsOutlined,
  IdcardOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import Modal from "../modals/modal";
import CustomerProfile from "../profileForm/profileForm";

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

const fields = [
  {
    id: "country",
    label: "Which country?",
    type: "select",
    placeholder: "Select country",
    options: ["Kenya", "Rwanda", "USA", "Europe"],
    htmlFor: "country",
  },
  {
    id: "account-number",
    label: "Account number",
    type: "text",
    placeholder: "Enter your account number",
  },
];

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");

  const handleOptionChange = (newValue: string | null) => {
    setSelectedOption(newValue);
    openModalHandler();
  };

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const handleAccountNumberChange = (value: string) => {
    setAccountNumber(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <VerticalInfoDescription
          title="Select the option you prefer for onboarding"
          titleStyle={{ fontWeight: "700", fontSize: "20px" }}
        />
      </div>
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
      {/* Modal */}
      {showModal && (
        <Modal
          isOpen={showModal}
          onDismiss={closeModalHandler}
          title="Provide Details to allow us create your profile"
          description="We provide ability for you to on board to any country of your choice and ability to switch between different countries."
        >
          <div className="my-4 w-[695px] max-w-full">
            <CustomerProfile
              fields={fields}
              onChange={handleAccountNumberChange}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Profile;

type HeaderProps = {
  title: string;
  titleStyle?: CSSProperties;
  description?: string;
  descStyle?: CSSProperties;
};
Profile.Header = ({
  title,
  titleStyle,
  description,
  descStyle,
}: HeaderProps) => {
  return (
    <VerticalInfoDescription
      title={title}
      titleStyle={titleStyle}
      description={description}
      descriptionStyle={descStyle}
    />
  );
};

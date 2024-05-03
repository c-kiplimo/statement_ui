import React, { useState } from "react";
import styles from "./profile.module.css";
import {
  ContactsOutlined,
  IdcardOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import Texter from "../../../../../../components/atoms/text/texter";
import SelectionItem from "../../../../../../components/widgets/selectionItem/selectionItem";
import { Modal } from "antd";
import ProfileSearch from "@/src/app/statement/(protected)/onBoarding/onBoardingComponents/profileSearch/search-profile";

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
  const [selectedCardTitle, setSelectedCardTitle] = useState<string | null>(null);

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
            <ProfileSearch inputLabel={selectedCardTitle || ""} onSearch={handleSearchResults} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Profile;
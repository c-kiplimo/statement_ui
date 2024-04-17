import React, { useState } from "react";
import styles from "./account-found.module.css";
import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import Modal from "../modals/modal";
import Texter from "../../atoms/text/texter";
import EnterOtpToVerify from "../otp-verify/enter_otp_to_verify";
import SelectionItem from "../selectionItem/selectionItem";

const IdentityCard = [
  {
    id: 1,
    icon: <UserAddOutlined />,
    CardTitle: "Mobile Number",
    CardDescription: "Configured Mobile Number",
  },
  {
    id: 2,
    icon: <UsergroupAddOutlined />,
    CardTitle: "Email Address",
    CardDescription: "Configured Email Address",
  },
];

const AccountFound = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Texter text="Congratulations your profile was found" className="h6m" />
        <Texter
          text="Where would you want your OTP notification delivered?"
          className="captionr"
        />
      </div>
      <div className={styles.logCard}>
        {IdentityCard.map((card) => (
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
            title=""
            description=""
          >
            {/* <otp popup> */}
            <EnterOtpToVerify />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AccountFound;

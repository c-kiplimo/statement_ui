import React, { ReactNode, useState } from "react";
import styles from "./vertical-navigations.module.css";
import ProfileForm from "../profile-form/profile.form";
import CloseAccount from "../close-account/close.account";
import { Modal, Button } from "antd";
import { QueryClient, QueryClientProvider } from 'react-query';
import HelpCenterItem from "../help-center/help.center.item";

const queryClient = new QueryClient();


const SettingsNavigations = () => {
  const [content, setContent] = useState<ReactNode>(<ProfileForm />);
  const [activeButton, setActiveButton] = useState("General Information");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = (newContent: ReactNode, buttonLabel: string) => {
    if (buttonLabel === "Close Account") {
      setIsModalVisible(true);
      setActiveButton(buttonLabel);
    } else {
      setContent(newContent);
      setActiveButton(buttonLabel);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <QueryClientProvider client={queryClient}>

    <div className={styles.container}>
      <div className={styles.bodyContent}>{content}</div>
      <div className={styles.navigations}>
        
        <div>
        <button
          className={
            activeButton === "General Information"
              ? styles.activeButton
              : styles.buttons
          }
          onClick={() => handleClick(<ProfileForm />, "General Information")}
        >
          General Information
        </button>
        <button
          className={
            activeButton === "Close Account"
              ? styles.activeButton
              : styles.buttons
          }
          onClick={() => handleClick(<CloseAccount />, "Close Account")}
        >
          Close Account
        </button>
        <button
          className={
            activeButton === "Notification"
              ? styles.activeButton
              : styles.buttons
          }
          onClick={() => handleClick("Notification Content", "Notification")}
        >
          Notification
        </button>
        </div>

        <div className={styles.helpcenter}>
        <button
          className={
            activeButton === "Help Center"
              ? styles.activeButton
              : styles.buttons
          }
          onClick={() => handleClick(<HelpCenterItem/>, "Help Center")}
        >
          Help Center
        </button>
        </div>
        
      </div>

      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={false}
        width={600}
      >
        <CloseAccount onModalCancel={handleCancel} />
      </Modal>
    </div>

    </QueryClientProvider>
  );
};

export default SettingsNavigations;

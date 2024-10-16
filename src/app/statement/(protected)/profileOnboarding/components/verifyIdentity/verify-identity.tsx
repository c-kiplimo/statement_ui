import React, { useState } from "react";
import styles from "./verify-identity.module.css";
import { CheckCircleOutlined, CloseCircleOutlined, UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import Texter from "../../../../../../components/atoms/text/texter";
import SelectionItem from "../../../../../../components/widgets/selectionItem/selectionItem";
import { Modal, notification } from "antd";
import { SearchCustomerHandler } from "@/src/services/auth/searchCustomer.service";
import OnboardingOtp from "../onBoardingOtp/onBoardingOtp";
import { useOnboardingContext } from "../../context/onBoardingContext";
import useUserSession from "@/src/hooks/useUserSession";


const VerifyIdentity = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { accessToken,user } = useUserSession();
  const { profile } = useOnboardingContext();
  const { onBoardingOtpService } = SearchCustomerHandler();

  const IdentityCard = [
    {
      id: "SMS",
      icon: <UserAddOutlined />,
      CardTitle: "Mobile Number",
      CardDescription: profile.mobileNumber ? `${profile.mobileNumber}` : "Configured Mobile Number",
    },
    {
      id: "EMAIL",
      icon: <UsergroupAddOutlined />,
      CardTitle: "Email Address",
      CardDescription: profile.email ? `${profile.email}` : "Configured Email Address",
    },
  ];

  const openModalHandler = () => {
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const handleOptionChange = async (newValue: string | null) => {
    setSelectedOption(newValue);
    if (newValue && accessToken && profile && user) {
      let option: "EMAIL" | "SMS";
      let contactValue: string;

      if (newValue === "EMAIL") {
        option = "EMAIL";
        contactValue = profile.email;
      } else if (newValue === "SMS") {
        option = "SMS";
        contactValue = profile.mobileNumber;
      } else {
        return;
      }
      console.log(selectedOption)
      try {

        const response = await onBoardingOtpService(option, accessToken,user?.id, contactValue);
        if (response) {
          notification.success({
            message: 'An OTP has been sent to your selected contact method.',
            description: '',
            icon: <CheckCircleOutlined style={{ color: "white" }} />,
            className: 'bodyr success-notification', 
            placement: 'topRight',
            duration: 1,
          });
          openModalHandler();
        } else {
          notification.error({
            message: "Failed to send OTP. Please try again.",
            description: '',
            icon: <CloseCircleOutlined style={{ color: "white" }} />,
            className: 'bodyr failure-notification', 
            placement: 'topRight',
            duration: 1,
          });
        }
      } catch (error) {
        notification.error({
          message: "An error may have occured.Please try again.",
          description: '',
          icon: <CloseCircleOutlined style={{ color: "white" }} />,
          className: 'bodyr failure-notification', 
          placement: 'topRight',
          duration: 1,
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Texter text="Customer Details Found" className="h6m" />
        <Texter
          text="Where would you want your OTP notification delivered?"
          className="captionr"
        />
      </div>
      <div className={styles.logCard}>
        {IdentityCard.map((card) => (
          <SelectionItem
            key={card.id}
            id={card.id}
            icon={card.icon}
            text={card.CardTitle}
            textDesc={card.CardDescription}
            onClick={() => handleOptionChange(card.id)}
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
            <OnboardingOtp selectedOption={selectedOption}/>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default VerifyIdentity;
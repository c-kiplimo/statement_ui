import React, { useState } from "react";
import styles from "./verify-identity.module.css";
import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import Texter from "../../../../../../components/atoms/text/texter";
import SelectionItem from "../../../../../../components/widgets/selectionItem/selectionItem";
import { Modal, notification } from "antd";
import { SearchCustomerHandler } from "@/src/services/auth/searchCustomer.service";
import OnboardingOtp from "../onBoardingOtp/onBoardingOtp";
import { useOnboardingContext } from "../../context/onBoardingContext";
import { ONBOARDING_OTP_REQUEST_URL } from "@/src/constants/environment";
import useUserSession from "@/src/hooks/useUserSession";


const VerifyIdentity = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { accessToken,user } = useUserSession();
  const { profile } = useOnboardingContext();
  const { onBoardingOtpService } = SearchCustomerHandler();

  const IdentityCard = [
    {
      id: "MOBILE_NUMBER",
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
      let option: "EMAIL" | "MOBILE_NUMBER";
      let contactValue: string;

      if (newValue === "EMAIL") {
        option = "EMAIL";
        contactValue = profile.email;
      } else if (newValue === "MOBILE_NUMBER") {
        option = "MOBILE_NUMBER";
        contactValue = profile.mobileNumber;
      } else {
        return;
      }

      try {

        const response = await onBoardingOtpService(option, accessToken,user?.id, contactValue);
        if (response) {
          notification.success({
            message: "OTP Sent",
            description: "An OTP has been sent to your selected contact method.",
          });
          openModalHandler();
        } else {
          notification.error({
            message: "Error",
            description: "Failed to send OTP. Please try again.",
          });
        }
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Failed to send OTP. Please try again.",
        });
      }
    }
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
            <OnboardingOtp />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default VerifyIdentity;
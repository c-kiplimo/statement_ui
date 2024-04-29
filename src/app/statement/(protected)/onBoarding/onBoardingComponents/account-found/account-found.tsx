import React, { useState } from "react";
import styles from "./account-found.module.css";
import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import Texter from "../../../../../../components/atoms/text/texter";
import SelectionItem from "../../../../../../components/widgets/selectionItem/selectionItem";
import { Modal, notification } from "antd";
import OnboardingOtp from "../onBoardingOtp/onBoardingOtp";
import { onBoardingHandler } from "@/src/services/auth/onboarding.service";
import { SEARCH_CUSTOMER_URL } from "@/src/constants/environment";
import { AuthServiceProvider } from "@/src/services/auth/authserviceProvider";

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
  type LoginProps = {
    login: {
      username: string;
      password: string;
      confirm?: boolean;
    };
  };
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { searchCustomerService, onBoardingOtpService } = onBoardingHandler();
  const { storeToken } = AuthServiceProvider();

  const openModalHandler = async () => {
    const response = await searchCustomerService(SEARCH_CUSTOMER_URL)
      .then((response) => {
        const tokenData = {
          accessToken: response.data?.access_token,
          refreshToken: response.data?.refresh_token,
          tokenType: response.data?.token_type,
          expiresIn: response.data?.expires_in,
        };
        storeToken(tokenData);
        console.log("saving");
        return tokenData;
      })
      .then((tokenData) => {
        return onBoardingOtpService(tokenData.accessToken);
      })
      .then((data) => {
        notification.info({
          message: "OTP Generated",
          description: "A new OTP has been generated. Please check your email.",
        });
      })
      .catch((error) => {
        console.error("Profile Creation failed:", error);
        notification.error({
          message: "Profile Creation failed",
          description: "The OTP was not sent.",
        });
      });
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const handleOptionChange = (newValue: string | null) => {
    setSelectedOption(newValue);
    openModalHandler();
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

export default AccountFound;

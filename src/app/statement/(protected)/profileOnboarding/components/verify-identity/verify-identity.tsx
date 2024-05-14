import React, { useState } from "react";
import styles from "./verify-identity.module.css";
import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import Texter from "../../../../../../components/atoms/text/texter";
import SelectionItem from "../../../../../../components/widgets/selectionItem/selectionItem";
import { Modal, notification } from "antd";
import { AuthServiceProvider } from "@/src/services/auth/authserviceProvider";
import { SearchCustomerHandler } from "@/src/services/auth/searchCustomer.service";
import OnboardingOtp from "../onBoardingOtp/onBoardingOtp";
import { useOnboardingContext } from "../../context/onBoardingContext";

const IdentityCard = [
  {
    id: "MOBILE_NUMBER",
    icon: <UserAddOutlined />,
    CardTitle: "Mobile Number",
    CardDescription: "Configured Mobile Number",
  },
  {
    id: "EMAIL" ,
    icon: <UsergroupAddOutlined />,
    CardTitle: "Email Address",
    CardDescription: "Configured Email Address",
  },
];

const VerifyIdentity = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { storeToken } = AuthServiceProvider();
  const {onBoardingOtpService  } = SearchCustomerHandler();
  const { profile, updateProfile } = useOnboardingContext();
  const openModalHandler = async () => {

      let option = selectedOption
      await onBoardingOtpService('EMAIL','token')
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

    // acticate activity indicator
    // call otp service

    //on success show otp modal 

    //on failure show failure message
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
            id={card.id}
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
            <OnboardingOtp />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default VerifyIdentity;

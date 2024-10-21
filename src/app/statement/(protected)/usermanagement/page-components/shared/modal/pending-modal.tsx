import { Fragment } from "react";
import styles from "./pending-modal.module.css"
import { CustomText } from "@/src/components/atoms/typography/primary_text";
import PrimaryButton from "@/src/components/atoms/button/primary-button/primary-button";
import { useFont, useTokens } from "@/src/app/(context)/ColorContext";
import { UserDetails } from "@/src/types/user.type";
import { UserHandler } from "@/src/services/usermanagement/user.service";
import { notification } from "antd";

interface PendingAuthorizationProps {
  handleEdit: (data: UserDetails) => void;
  handleDelete: (data: UserDetails) => void;
  modalType: string;
  dynamicData: any;
  setIsModalOpen: (isOpen: boolean) => void;
}

const PendingModal = ({
  handleEdit,
  handleDelete,
  modalType,
  setIsModalOpen,
  dynamicData,
}: PendingAuthorizationProps) => {
  const token = useTokens();
  const font = useFont();
  // const {
  //   authorizeUser,
  //   unauthorizeUser,
  // } = UserHandler();

  const handleAuthorize = async () => {
    try {
      // await authorizeUser(dynamicData.username);
      setIsModalOpen(false);
      handleEdit(dynamicData);
    } catch (error) {
      console.error("Error authorizing user:", error);
    }
  };

  const handleUnauthorize = async () => {
    try {
      // await unauthorizeUser(dynamicData.username);
      setIsModalOpen(false);
      handleDelete(dynamicData);
      notification.success({
        message: "Success!",
        description: "The user was deleted successfully!",
      });
    } catch (error) {
        notification.error({
            message: "Error!",
            description: "The user was not deleted!",
          });
      console.error("Error unauthorizing user:", error);
    }
  };

  switch (modalType) {
    case "authorize":
      return (
        <Fragment>
          <div className={styles.modalContainer}>
            <div className={styles.modalDesc}>
              <CustomText
                title="Approve Pending Authorization"
                fontSize={font.typography.h6.medium.fontSize}
                textColor={token.text.secondary}
                lineHeight={font.typography.h6.medium.lineHeight}
                fontWeight={font.typography.h6.medium.fontWeight}
                className={styles.title}
              />
              <CustomText
                title="Are you sure you want to approve pending authorization?"
                fontSize={font.typography.body.regular.fontSize}
                textColor={token.text.description_01}
                lineHeight={font.typography.body.regular.lineHeight}
                fontWeight={font.typography.body.regular.fontWeight}
                className={styles.titleDesc}
              />
            </div>
            <div className={styles.btnContainer}>
              <PrimaryButton
                buttonType="default"
                // iconPosition="right"
                shape="default"
                size="large"
                customStyles={{
                  background: token.default.white,
                  color: token.brand.primary,
                  border: `1px solid ${token.brand.primary}`,
                }}
                onClick={() => setIsModalOpen(false)}
              >
                NO
              </PrimaryButton>
              <PrimaryButton
                buttonType="default"
                // iconPosition="right"
                shape="default"
                size="large"
                customStyles={{
                  background: token.brand.primary,
                  color: token.default.white,
                  border: `1px solid ${token.brand.primary}`,
                }}
                onClick={handleAuthorize}
              >
                YES
              </PrimaryButton>
            </div>
          </div>
        </Fragment>
      );
    case "unauthorize":
      return (
        <Fragment>
          <div className={styles.modalContainer}>
            <div className={styles.modalDesc}>
              <CustomText
                title="Reject Pending Authorization"
                fontSize={font.typography.h6.medium.fontSize}
                textColor={token.text.secondary}
                lineHeight={font.typography.h6.medium.lineHeight}
                fontWeight={font.typography.h6.medium.fontWeight}
                className={styles.title}
              />
              <CustomText
                title="Are you sure you want to reject pending authorization?"
                fontSize={font.typography.body.regular.fontSize}
                textColor={token.text.description_01}
                lineHeight={font.typography.body.regular.lineHeight}
                fontWeight={font.typography.body.regular.fontWeight}
                className={styles.titleDesc}
              />
            </div>
            <div className={styles.btnContainer}>
              <PrimaryButton
                buttonType="default"
                // iconPosition="right"
                shape="default"
                size="large"
                customStyles={{
                  background: token.default.white,
                  color: token.accent.danger,
                  border: `1px solid ${token.accent.danger}`,
                }}
                onClick={() => setIsModalOpen(false)}
              >
                NO
              </PrimaryButton>
              <PrimaryButton
                buttonType="default"
                // iconPosition="right"
                shape="default"
                size="large"
                customStyles={{
                  background: token.accent.danger,
                  color: token.default.white,
                  border: `1px solid ${token.accent.danger}`,
                }}
                onClick={handleUnauthorize}
              >
                YES
              </PrimaryButton>
            </div>
          </div>
        </Fragment>
      );
    default:
      return null;
  }
};

export default PendingModal;

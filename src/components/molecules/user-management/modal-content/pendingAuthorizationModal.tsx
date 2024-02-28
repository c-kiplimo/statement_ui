import { Fragment } from "react";

import { CustomText } from "@/src/components/atoms/typography/primary_text";
import PrimaryButton from "@/src/components/atoms/button/primary-button/primary-button";
import { useFont, useTokens } from "@/src/app/(context)/ColorContext";
import { UserDetails } from "@/src/types/user.type";

interface PendingAuthorizationProps {
  accountId: string;
  fetchData?: () => void;
  handleCreate: (data: UserDetails) => void;
  handleEdit: (data: UserDetails) => void;
  handleDelete: (data: UserDetails) => void;
  modalType: string;
  dynamicData: any;
  setIsModalOpen: (isOpen: boolean) => void;
  setModalType: (type: string) => void;
  isModalOpen: boolean;
}

const PendingAuthorizationModalContent = ({
  handleCreate,
  handleEdit,
  handleDelete,
  modalType,
  setIsModalOpen,
  dynamicData,
}: PendingAuthorizationProps) => {
  const token = useTokens();
  const font = useFont();
  switch (modalType) {
    case "add":
      return <>Add Content to here.here..</>;
    case "edit":
      return (
        <Fragment>
          <div
            style={{
              display: "inline-flex",
              padding: "32px 32px 32px 0px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                padding: "5px",
              }}
            >
              <CustomText
                title="Approve Pending Authorization"
                fontSize={font.typography.h6.medium.fontSize}
                textColor={token.text.secondary}
                lineHeight={font.typography.h6.medium.lineHeight}
                fontWeight={font.typography.h6.medium.fontWeight}
                className="custom-text"
              />
              <CustomText
                title="Are you Sure you want to approve pending authorization?"
                fontSize={font.typography.body.regular.fontSize}
                textColor={token.text.description_01}
                lineHeight={font.typography.body.regular.lineHeight}
                fontWeight={font.typography.body.regular.fontWeight}
                className="custom-text"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "40px",
              }}
            >
              <PrimaryButton
                buttonType="default"
                iconPosition="right"
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
                iconPosition="right"
                shape="default"
                size="large"
                customStyles={{
                  background: token.brand.primary,
                  color: token.default.white,
                  border: `1px solid ${token.brand.primary}`,
                }}
                onClick={() => handleEdit(dynamicData.data)}
              >
                YES
              </PrimaryButton>
            </div>
          </div>
        </Fragment>
      );
    case "delete":
      return (
        <Fragment>
          <div
            style={{
              display: "inline-flex",
              padding: "32px 32px 32px 0px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <div
              style={{
                textAlign: "center",
              }}
            >
              <CustomText
                title="Reject Pending Authorization"
                fontSize={font.typography.h6.medium.fontSize}
                textColor={token.text.secondary}
                lineHeight={font.typography.h6.medium.lineHeight}
                fontWeight={font.typography.h6.medium.fontWeight}
                className="custom-text"
              />
              <CustomText
                title="Are you Sure you want to Reject pending authorization?"
                fontSize={font.typography.body.regular.fontSize}
                textColor={token.text.description_01}
                lineHeight={font.typography.body.regular.lineHeight}
                fontWeight={font.typography.body.regular.fontWeight}
                className="custom-text"
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "40px",
              }}
            >
              <PrimaryButton
                buttonType="default"
                iconPosition="right"
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
                iconPosition="right"
                shape="default"
                size="large"
                customStyles={{
                  background: token.accent.danger,
                  color: token.default.white,
                  border: `1px solid ${token.accent.danger}`,
                }}
                onClick={() => handleDelete(dynamicData.data)}
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
export default PendingAuthorizationModalContent;

import { Fragment } from "react";

import { CustomText } from "@/src/components/atoms/typography/primary_text";
import PrimaryButton from "@/src/components/atoms/button/primary-button/primary-button";
import { useFont, useTokens } from "@/src/app/(context)/ColorContext";

interface UserGroupProps {
  handleEdit: (data: any) => void;
  handleDelete: (data: any) => void;
  modalType: string;

  setIsModalOpen: (isOpen: boolean) => void;
  setModalType: (type: string) => void;
  isModalOpen: boolean;
}

const UserGroupRolesModal = ({
  handleEdit,
  handleDelete,
  modalType,
  setIsModalOpen,
}: UserGroupProps) => {
  const token = useTokens();
  const font = useFont();
  switch (modalType) {
    case "edit":
      return <Fragment>edit</Fragment>;
    case "delete":
      return (
        <Fragment>
          <div
            style={{
              display: "flex",
              paddingBottom: "24px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "40px",
            }}
          >
            <div
              style={{
                textAlign: "center",
              }}
            >
              <CustomText
                title="Remove Account"
                fontSize={font.typography.h6.medium.fontSize}
                textColor={token.text.secondary}
                lineHeight={font.typography.h6.medium.lineHeight}
                fontWeight={font.typography.h6.medium.fontWeight}
                className="custom-text"
              />
              <CustomText
                title="Are you Sure you want to delete this account?"
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
                  border: `1px solid ${token.accent.danger}`,
                  color: token.accent.danger,
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
                  border: `1px solid ${token.accent.danger}`,
                  color: token.default.white,
                }}
                onClick={handleDelete}
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
export default UserGroupRolesModal;

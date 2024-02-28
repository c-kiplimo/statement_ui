import { Fragment, useEffect, useState } from 'react';
import FrequencyMoleculeComponent from '../../frequency-molecule-component/frequency-molecule-component';
import ModalHeader from './modal-header-molecule';
import { CustomText } from '@/src/components/atoms/typography/primary_text';
import PrimaryButton from '@/src/components/atoms/button/primary-button/primary-button';
import { useFont, useTokens } from '@/src/app/(context)/ColorContext';
import { AccountSchedulesHandler } from '@/src/services/account/account.schedules.service';
interface AccountScheduleProps {
  accountId: string;
  fetchData: () => void;
  handleCreate: (data: AccountSchedule) => void;
  handleEdit: (data: AccountSchedule) => void;
  handleDelete: (data: AccountSchedule) => void;
  modalType: string;
  dynamicData: any;
  setIsModalOpen: (isOpen: boolean) => void;
  setModalType: (type: string) => void;
  isModalOpen: boolean;
}

const ModalContent = ({
  handleCreate,
  handleEdit,
  handleDelete,
  modalType,
  setIsModalOpen,
  dynamicData,
}: AccountScheduleProps) => {
  const token = useTokens();
  const font = useFont();
  switch (modalType) {
    case 'add':
      return (
        <>
          <ModalHeader {...dynamicData} />
          <FrequencyMoleculeComponent onSubmit={handleCreate} />
        </>
      );
    case 'edit':
      return (
        <Fragment>
          <ModalHeader {...dynamicData} />
          <FrequencyMoleculeComponent onSubmit={handleEdit} />
        </Fragment>
      );
    case 'delete':
      return (
        <Fragment>
          <div
            style={{
              display: 'flex',
              paddingBottom: '24px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '40px',
            }}
          >
            <div
              style={{
                textAlign: 'center',
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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '40px',
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
export default ModalContent;

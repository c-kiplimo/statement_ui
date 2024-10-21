import { useTokens } from '@/src/app/(context)/ColorContext';
import { Modal, Tag } from 'antd';
import { Fragment, useEffect, useState } from 'react';
import PrimaryButton from '@/src/components/atoms/button/primary-button/primary-button';
import {
  addIcon,
  editIcon,
  minusIcon,
} from '@/src/components/atoms/svg/document_svg';
import { AccountSchedulesHandler } from '@/src/services/account/account.schedules.service';
import { useAccountStatementContext } from '@/src/app/(context)/account-statement-context';
import moment from 'moment';
import ModalContent from './modal-content';
import AccountSearchResults from '@/src/components/widgets/account-search-results/account-search-results';
const AccountScheduleTable = () => {
  const [accountSchedules, setAccountSchedules] = useState<AccountSchedule>();
  const { accountId } = useAccountStatementContext();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('add');

  const {
    fetchAccountSchedules,
    createAccountSchedules,
    updateAccountSchedule,
    deleteAccountSchedule,
  } = AccountSchedulesHandler();
  const token = useTokens();
  useEffect(() => {
    fetchData();
  }, [accountId]);
  const fetchData = async () => {
    if (!accountId) return;
    const result = await fetchAccountSchedules(accountId);
    setAccountSchedules(result);
    console.log(result);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const openModal = (type: string) => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const handleEdit = (data: any) => {
    console.log('Edit data:', data);
    let updateData = {
      frequency: data.frequency,
    };

    let update = async () => {
      let response = await updateAccountSchedule(accountId, updateData);
      console.log(response);
      if (response) {
        setIsModalOpen(false);
      }
    };
    update();
    fetchData();
  };
  const handleDelete = (data: any) => {
    console.log('Delete data:', data);
    let deleteSchedule = async () => {
      let response = await deleteAccountSchedule(accountId);
      setIsModalOpen(false);
    };
    deleteSchedule();
    fetchData();
  };
  const handleCreate = (data: AccountSchedule) => {
    console.log('Add data:', data);
    let startTime = moment(data.startTime).format('YYYY-MM-DDTHH:mm:ss');
    const { frequency, template } = data;
    let createData = {
      accountId,
      frequency,
      startTime: new Date(startTime),
      template,
    };
    console.log(createData);
    let create = async () => {
      let response = await createAccountSchedules(createData);
      console.log(response);
      if (response) {
        setIsModalOpen(false);
      }
    };
    create();
    fetchData();
  };

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const time_of_day = hours >= 12 ? 'PM' : 'AM';
  const formatted_hours = hours % 12 || 12;

  const cards = [
    {
      title: 'Date',
      content: `${day}-${month}-${year}`,
      additionalContent: `${formatted_hours}:${minutes} ${time_of_day}`,
    },
    {
      title: 'Account Number',
      content: accountSchedules?.accountName,
      additionalContent: accountSchedules?.accountId,
    },
    {
      title: 'Frequency',
      content: accountSchedules?.frequency,
      additionalContent: accountSchedules?.startTime
        ? new Date(accountSchedules.startTime).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
        : null,
    },
    {
      title: 'Template',
      content: accountSchedules?.template,
      additionalContent: 'PDF',
    },
    {
      title: 'Status',
      additionalContent: (
        <Tag
          bordered={false}
          style={{
            padding: '4px 16px',
            fontSize: '14px',
            fontWeight: '500',
            color: token.accent.success,
            lineHeight: '24px',
            background: token.accent.success_invert_01,
            borderRadius: '4px',
            alignItems: 'flex-start',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          {accountSchedules?.status}
        </Tag>
      ),
    },
    {
      title: '',
      content: (
        <div
          style={{
            display: 'flex',
            gap: '15px',
          }}
        >
          <div style={{ display: 'flex', gap: '1rem' }}>
            <PrimaryButton
              buttonType="default"
              // iconPosition="right"
              shape="default"
              size="small"
              icon={minusIcon}
              customStyles={{
                background: token.default.white,
                color: token.default.grey,
              }}
              onClick={() => openModal('delete')}
            ></PrimaryButton>

            <PrimaryButton
              buttonType="default"
              // iconPosition="right"
              shape="default"
              size="small"
              icon={editIcon}
              customStyles={{
                background: token.default.white,
                color: token.default.white,
              }}
              onClick={() => openModal('edit')}
            ></PrimaryButton>
          </div>
        </div>
      ),
      additionalContent: '',
    },
  ];

  const modalWidth = () => {
    switch (modalType) {
      case 'add':
        return '900px';
      case 'edit':
        return '900px';
      case 'delete':
        return '400px';
      default:
        return '700px';
    }
  };
  const dynamicData = {
    data: {
      title: 'Meraki Systems tech',
      description: '234353',
      lastActivity: 'July, 07 2023',
      availableBalance: '$146,786.33',
      workingBalance: '$67,990.24',
      terms: '12 months',
    },
  };

  return (
    <Fragment>
      <div
        style={{
          display: 'flex',
          padding: '0px 40px',
          marginBottom: '20px',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '10px',
          alignSelf: 'stretch',
        }}
      >
        <PrimaryButton
          buttonType="default"
          // iconPosition="right"
          shape="default"
          size="small"
          icon={addIcon}
          customStyles={{
            background: token.brand.primary,
            color: token.default.white,
          }}
          onClick={() => openModal('add')}
        >
          Add
        </PrimaryButton>
      </div>
      <AccountSearchResults
        customStyle={{ boxShadow: 'none', alignItems: 'baseline' }}
        cards={cards}
      />
      <Modal
        title=""
        open={isModalOpen}
        width={modalWidth()}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <ModalContent
          accountId={accountId}
          fetchData={fetchData}
          handleCreate={handleCreate}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          modalType={modalType}
          dynamicData={dynamicData}
          setIsModalOpen={setIsModalOpen}
          setModalType={setModalType}
          isModalOpen={isModalOpen}
        />
      </Modal>
    </Fragment>
  );
};

export default AccountScheduleTable;

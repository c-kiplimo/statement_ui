import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import VerticalInfoDescription from '@/src/components/atoms/text/vertical-info-description';
import styles from './notifications.module.css';
import { Modal, Switch, notification } from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import EnableAccountsItem from './enable-accounts/enable.accounts';
import { createUserNotifications } from '@/src/services/account/notification.setttings.service';
import useProfileCreated from '@/src/hooks/useProfileCreated';
import { getAccountNotificationAction } from '@/src/lib/account.notifications.action';

type SwitchStates = {
  marketingContent: boolean,
  events: boolean,
  serviceUpdates: boolean
};

type AccountSwitches = {
  [key: string]: boolean,
  allAccounts: boolean
};

const SettingsNotifications = () => {
  const [isOn, setIsOn] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [switchStates, setSwitchStates] = useState<SwitchStates>({
    marketingContent: false,
    events: false,
    serviceUpdates: false
  });
  const [accountSwitches, setAccountSwitches] = useState<AccountSwitches>({
    allAccounts: false
  });
  const [selectedEmail, setSelectedEmail] = useState('');

  const profile = useProfileCreated();
  const userId = profile?.userId;

  const { data, error, isLoading } = useQuery(
    ['getAccountNotification', userId], 
    () => getAccountNotificationAction(parseInt(userId!)), {
      enabled: !!userId,
      onSuccess: (data) => {
        setSwitchStates({
          marketingContent: data.allowMarketing,
          events: data.allowEvents,
          serviceUpdates: data.allowServiceUpdates
        });

        setSelectedEmail(data.notificationMode);
      }
  });

  useEffect(() => {
    if (!isOn) {
      setAccountSwitches(prevState => {
        const newState: AccountSwitches = { allAccounts: false };
        Object.keys(prevState).forEach(key => {
          if (key !== 'allAccounts') {
            newState[key] = false;
          }
        });
        return newState;
      });
    }
  }, [isOn]);

  const handleToggle = () => {
    setIsOn(!isOn);
    setIsModalVisible(!isOn);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleSwitchChange = (key: string, checked: boolean) => {
    setSwitchStates(prevState => ({ ...prevState, [key]: checked }));
  };

  const handleAccountSwitchChange = (key: string, checked: boolean) => {
    setAccountSwitches(prevState => ({ ...prevState, [key]: checked }));
  };

  const handleEmailChange = (email: string) => {
    setSelectedEmail(email);
  };

  const handleSubmit = async () => {
    const accountIds = Object.keys(accountSwitches)
      .filter(key => key !== 'allAccounts' && accountSwitches[key]);

    const notificationData = {
      notificationMode: selectedEmail,
      allowMarketing: switchStates.marketingContent,
      allowEvents: switchStates.events,
      allowServiceUpdates: switchStates.serviceUpdates,
      userId: parseInt(userId!),
      accountId: accountIds
    };

    console.log('Submitting data:', notificationData);
    try {
      await createUserNotifications(notificationData);
      notification.success({
        message: 'Notifications Updated Successfully'
      });
    } catch (error) {
      if (error instanceof Error) {
        notification.error({
          message: 'Failed to update Notification.',
          description: error.message
        });
      } else {
        notification.error({
          message: 'Failed to update Notification.',
          description: 'An unexpected error occurred. Please try again later.'
        });
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading notification settings</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <VerticalInfoDescription 
          title="Notifications" 
          titleStyle={{ fontWeight: '700', fontSize: '25px' }} 
        />
        <p className={`${styles.selectText} h6r`}>
          Select which notification you would like to receive
        </p>
      </div>
      <div>
        <div className={styles.textcontainer}>
          <VerticalInfoDescription 
            title="Debits and credit alerts" 
            titleStyle={{ fontSize: '20px', paddingBottom: '8px' }} 
            description="Get alerts about your account activity" 
          />
          <p className={`${isOn ? styles.onactive : styles.offactive}`} onClick={handleToggle}>
            <span>{isOn ? 'ON' : 'OFF'}</span> <span>{isOn ? <CaretRightOutlined /> : <CaretLeftOutlined />}</span>
          </p>
        </div>
        <SettingsNotifications.Body 
          title="Marketing content" 
          description="Get alerts about your account activity" 
          checked={switchStates.marketingContent} 
          onChange={(checked) => handleSwitchChange('marketingContent', checked)} 
        />
        <SettingsNotifications.Body 
          title="Events" 
          description="Get alerts about the upcoming important events" 
          checked={switchStates.events} 
          onChange={(checked) => handleSwitchChange('events', checked)} 
        />
        <SettingsNotifications.Body 
          title="Service Updates" 
          description="Get alerts about any upgrades, outages or scheduled downtime" 
          checked={switchStates.serviceUpdates} 
          onChange={(checked) => handleSwitchChange('serviceUpdates', checked)} 
        />
      </div>
      <Modal 
        open={isModalVisible} 
        onCancel={handleModalClose} 
        footer={false}
        width={800}
      >
        <EnableAccountsItem 
          switches={accountSwitches} 
          onSwitchChange={handleAccountSwitchChange} 
          onEmailChange={handleEmailChange}
          selectedEmail={selectedEmail}
        />
      </Modal>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SettingsNotifications;

type BodyProps = {
  title: string,
  description: string,
  onChange: (checked: boolean) => void,
  checked: boolean
};

SettingsNotifications.Body = (props: BodyProps) => (
  <div className={styles.textcontainer}>
    <VerticalInfoDescription 
      title={props.title} 
      titleStyle={{ fontSize: '20px', paddingBottom: '8px' }} 
      description={props.description} 
    />
    <div>
      <Switch 
        checked={props.checked} 
        onChange={props.onChange} 
        className={styles.switchColor} 
      />
    </div>
  </div>
);

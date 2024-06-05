import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import VerticalInfoDescription from '@/src/components/atoms/text/vertical-info-description';
import styles from './notifications.module.css';
import { notification, Switch } from 'antd';
import { createUserNotifications, editAccountNotification } from '@/src/services/account/notification.setttings.service';
import useProfileCreated from '@/src/hooks/useProfileCreated';
import { getAccountNotificationAction } from '@/src/lib/account.notifications.action';

type SwitchStates = {
  marketingContent: boolean,
  events: boolean,
  serviceUpdates: boolean
};

const SettingsNotifications = () => {
  const [switchStates, setSwitchStates] = useState<SwitchStates>({
    marketingContent: false,
    events: false,
    serviceUpdates: false
  });

  const [initialSwitchStates, setInitialSwitchStates] = useState<SwitchStates>({
    marketingContent: false,
    events: false,
    serviceUpdates: false
  });

  const profile = useProfileCreated();
  const userId = profile?.userId;

  const { data, error, isLoading } = useQuery(
    ['getAccountNotification', userId], 
    () => getAccountNotificationAction(userId!), {
      enabled: !!userId,
      onSuccess: (data) => {
        if (data) {
          const initialStates = {
            marketingContent: data.allowMarketing ?? false,
            events: data.allowEvents ?? false,
            serviceUpdates: data.allowServiceUpdates ?? false
          };
          setSwitchStates(initialStates);
          setInitialSwitchStates(initialStates);
        }
      }
  });

  const handleSwitchChange = (key: string, checked: boolean) => {
    setSwitchStates(prevState => ({ ...prevState, [key]: checked }));
  };

  const handleSubmit = async () => {
    const notificationData = {
      allowMarketing: switchStates.marketingContent,
      allowEvents: switchStates.events,
      userId: parseInt(userId!),
      allowServiceUpdates: switchStates.serviceUpdates,
    };

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

  const handleNotificationUpdate = async () =>{
    const notificationData = {
      allowMarketing: switchStates.marketingContent,
      allowEvents: switchStates.events,
      userId: parseInt(userId!),
      allowServiceUpdates: switchStates.serviceUpdates,
    };

    try {
      await editAccountNotification(userId!, notificationData);
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
    
  }

  const handleCancel = () => {
    setSwitchStates(initialSwitchStates);
  };

  if (isLoading) return <div>Loading...</div>;


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
      <div className={styles.buttons}>
        <button className={styles.cancelsubmit} onClick={handleCancel}>Cancel</button>
        {data ? (
          <button className={styles.submitbutton} onClick={handleNotificationUpdate}>Update</button>
        ) : (
          <button className={styles.submitbutton} onClick={handleSubmit}>Submit</button>
        )}
      </div>
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


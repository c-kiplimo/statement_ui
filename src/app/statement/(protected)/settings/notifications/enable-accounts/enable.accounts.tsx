import React, { useEffect, useState } from 'react';
import styles from './enable.accounts.module.css';
import VerticalInfoDescription from '@/src/components/atoms/text/vertical-info-description';
import { Switch, notification } from 'antd';
import Image from 'next/image';
import useProfileId from '@/src/hooks/profileId';
import { notificationsersAccounts } from '@/src/lib/account.overview.actions';

export type NotificationAccounts = {
  accountNumber: string,
  accountDescription: string
};

const EnableAccountsItem = ({ switches, onSwitchChange, onEmailChange, selectedEmail }: any) => {
  const [accounts, setAccounts] = useState<NotificationAccounts[] | null>(null);
  const profileId = useProfileId();

  useEffect(() => {
    if (profileId) {
      const fetchUsersAccounts = async () => {
        try {
          const accounts = await notificationsersAccounts(profileId);
          setAccounts(accounts);
        } catch (error) {
          notification.error({
            message: 'An Error Occurred',
            description: `${error}`
          });
        }
      };
      fetchUsersAccounts();
    }
  }, [profileId]);

  const handleAllAccountsChange = (checked: boolean) => {
    onSwitchChange('allAccounts', checked);
    if (accounts) {
      accounts.forEach(account => {
        onSwitchChange(account.accountNumber, checked);
      });
    }
  };

  const handleIndividualChange = (accountNumber: string, checked: boolean) => {
    onSwitchChange(accountNumber, checked);
    if (accounts) {
      const allChecked = accounts.every(account => switches[account.accountNumber]);
      onSwitchChange('allAccounts', allChecked);
    }
  };

  const handleEmailChange = (event: any) => {
    onEmailChange(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <VerticalInfoDescription
          title="Which account do you want to get updated for?"
          titleStyle={{ fontSize: '25px', fontWeight: '700', paddingBottom: '16px' }}
          description="Select account you would like to get updated for"
          descriptionStyle={{ fontSize: '20px' }}
        />
      </div>
      <div className={styles.bodycontent}>
        <EnableAccountsItem.Body
          title="Enable all accounts"
          description="Notification enabled"
          onChange={handleAllAccountsChange}
          checked={switches.allAccounts}
          imageSource="notifications.svg"
        />
        {accounts?.map(account => (
          <EnableAccountsItem.Body
            key={account.accountNumber}
            title={account.accountNumber}
            description={account.accountDescription}
            onChange={(checked) => handleIndividualChange(account.accountNumber, checked)}
            checked={switches[account.accountNumber]}
            imageSource="selectaccount.svg"
          />
        ))}
      </div>
      <div>
        <VerticalInfoDescription
          title="How do you want to receive your notifications?"
          titleStyle={{ fontWeight: '600' }}
        />
        <select 
          name="email" 
          id="email" 
          onChange={handleEmailChange} 
          className={styles.emailSelection} 
          value={selectedEmail}
        >
          <option value="EMAIL">{selectedEmail}</option>
        </select>
      </div>
    </div>
  );
};

export default EnableAccountsItem;

type BodyProps = {
  title: string,
  description: string,
  imageSource?: string,
  onChange?: (checked: boolean) => void,
  checked?: boolean
};

EnableAccountsItem.Body = (props: BodyProps) => (
  <div className={styles.containerDiv}>
    <Image src={`/${props.imageSource}`} alt="image" width={24} height={24} />
    <div className={styles.textcontainer}>
      <VerticalInfoDescription
        title={props.title}
        titleStyle={{ fontSize: '20px', paddingBottom: '8px' }}
        description={props.description}
      />
      <div>
        <Switch
          onChange={props.onChange}
          checked={props.checked}
          className={styles.switchColor}
        />
      </div>
    </div>
  </div>
);

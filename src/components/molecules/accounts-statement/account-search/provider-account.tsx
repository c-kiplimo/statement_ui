import React from 'react';
import { useTokens, useFont } from '@/src/app/(context)/ColorContext';
import './account_statement_search.css';
import styles from "./provider-account.module.css"
import ButtonTab from '@/src/components/atoms/tabs/button_tab';
import AccountMiniStatement from '../account-mini-statement/account-mini-statement';
import AccountScheduleTable from '../account-schedule/account-schedule';
import AccountDatePicker from '../../../widgets/datepicker/account.datepicker';
import SubmitButton from '../../shared/statement-search-button/statement.search.button';

const TabContent = React.memo(
  ({
    selectedAccount,
    title,
  }: {
    selectedAccount: string | null;
    title: string;
  }) => {
    switch (title) {
      case 'Account Full Statement':
        return (

          <div
            className={styles.provider}
          >
            <AccountDatePicker
              onDateChange={() => {
                console.log('clicked');
              }}
              title={'Start Date:'}
            />
            <AccountDatePicker
              onDateChange={() => {
                console.log('clicked');
              }}
              title={'End Date:'}
            />
            <div className={styles.submitButtonContainer}>
              <SubmitButton  />
            </div>

          </div>
        );
      case 'Account Mini statement':
        return (
          <div className="border-blue-400 rounded-lg p-4">
            <AccountMiniStatement  />
          </div>
        );
      case 'Account Overview':
        return (
          <div className="border-blue-400 rounded-lg p-4">
          </div>
        );
      case 'Schedules':
        return (
          <div className="border-blue-400 rounded-lg p-4">
            <AccountScheduleTable />
          </div>
        );
      default:
        return (
          <div className="border-blue-400 flex  rounded-lg p-4">
            <div
              className={styles.providerContainer}
            >
              <AccountDatePicker
                onDateChange={() => {
                  console.log('clicked');
                }}
                title={'Start Date:'}
              />
              <AccountDatePicker
                onDateChange={() => {
                  console.log('clicked');
                }}
                title={'End Date:'}
              />
              <SubmitButton />
            </div>
          </div>
        );
    }
  },
);

const ProviderAccount = ({
  selectedAccount,
}: {
  selectedAccount: string | null;
}) => {
  const token = useTokens();
  const font = useFont();

  const tabsItems = [
    {
      title: 'Account Full Statement',
      content: (
        <TabContent
          selectedAccount={selectedAccount}
          title="Account Full Statement"
        />
      ),
    },
    {
      title: 'Account Mini statement',
      content: (
        <TabContent
          selectedAccount={selectedAccount}
          title="Account Mini statement"
        />
      ),
    },
    {
      title: 'Account Overview',
      content: (
        <TabContent
          selectedAccount={selectedAccount}
          title="Account Overview"
        />
      ),
    },
    {
      title: 'Schedules',
      content: (
        <TabContent selectedAccount={selectedAccount} title="Schedules" />
      ),
    },
  ];

  const updatedTabs = tabsItems.map((tab) => ({
    ...tab,
    content: React.cloneElement(tab.content, { selectedAccount }),
  }));

  return (
    <div className="provider-account">
      <ButtonTab items={updatedTabs} colorToken={token} font={font}></ButtonTab>
    </div>
  );
};

export { ProviderAccount };

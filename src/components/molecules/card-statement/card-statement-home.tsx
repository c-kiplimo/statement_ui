import CustomerAccountSetup from '@/src/components/molecules/account-setup/select-account/customer-account-setup';
import React, { CSSProperties, useState } from 'react';
import style from '../../features/account-setup/select-account/select-account.module.css';
import { useFont, useTokens } from '@/src/app/(context)/ColorContext';
import Tabs from '@/src/components/atoms/tabs/tab-item/tab-item';
import TabContent from '@/src/components/atoms/tabs/tab-content/tab-content';

const CardStatementHome = () => {
  const token = useTokens();
  const font = useFont();
  const [selectedTab, setSelectedTab] = useState(0);

  const accountSetupActivityCss: CSSProperties = {
    background: token.default.white,
  };

  const handleDelete = (record: any) => {
    console.log('Delete clicked for:', record);
  };

  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    description: string;
    date: string;
    join: string;
  }

  const items: {
    title: string;
    content: React.JSX.Element;
    contentwidth?: string;
  }[] = [
    {
      title: 'Setup',
      content: (
        <div style={{ width: '100%' }}>
          <CustomerAccountSetup
            title="Provide Customer Details"
            description="Setup the customer by using  Account number or customer Number "
            coreProps={{ colorToken: token, font: useFont() }}
            paddingBottom="20px"
          />
        </div>
      ),
    },
    {
      title: 'Users',
      content: (
        <div style={{ width: '100%' }}>
          <h1>Users</h1>
        </div>
      ),
    },
    {
      title: 'Activity',
      content: (
        <div style={{ width: '100%' }}>
          <h1>Activity</h1>
        </div>
      ),
      contentwidth: '100%',
    },
    {
      title: 'Restrictions',
      content: (
        <div style={{ width: '100%' }}>
          <h1>Restrictions</h1>
        </div>
      ),
    },
    {
      title: 'Cards',
      content: (
        <div style={{ width: '100%' }}>
          <h1>Cards</h1>
        </div>
      ),
    },
  ];
  const accountSetupCss: CSSProperties = {
    background: token.default.white,
    display: ' flex',

    alignItems: 'flex-start',
    gap: '48px',
    alignSelf: 'stretch',
  };

  return (
    <div style={accountSetupCss}>
      <div className={style.activitysetupheader}>
        <div className={style.activitysetupheadertabs}>
          <Tabs
            textColor={token.default.black}
            textColorActive={token.accent.info}
            borderColor={token.accent.info}
            backgroundColor={token.default.white}
            borderBottom={token.default.grey}
            isUnderlined={true}
            fontWeight={font.typography.body.medium.fontWeight}
            tabsItems={items}
            onSelectTab={(index) => setSelectedTab(index)}
            selectedTab={selectedTab}
          />
        </div>
        <div style={{ width: '100%' }}>
          <TabContent
            textColor={token.default.black}
            backgroundColor={token.accent.warning_invert_01}
            fontWeight={font.typography.body.medium.fontWeight}
            tabsItems={items}
            selectedTab={selectedTab}
            marginTop="0px"
            padding="0px"
          />
        </div>
      </div>
    </div>
  );
};

export default CardStatementHome;

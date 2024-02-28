'use client';
import withContainer from '../../../../../components/molecules/shared/statement-core/statement.container.hoc';
import AccountScheduleTable from '../../../../../components/molecules/accounts-statement/account-schedule/account-schedule';
import AccountMiniStatement from '../../../../../components/molecules/accounts-statement/account-mini-statement/account-mini-statement';
import AccountsProvider from '../../../../../components/molecules/shared/statement-core/account/statement.account.provider';
import { useRef } from 'react';
import { useCoreProps } from '@/src/app/(context)/ColorContext';
import StatementWrapper from '@/src/components/molecules/shared/statement-core/statement.wrapper';
import { StatementSelectionContainer } from '@/src/components/molecules/shared/statement-core/statement.accounts.selection';
import ButtonTab from '@/src/components/atoms/tabs/button_tab';
import { useAccountStatementContext } from '@/src/app/(context)/account-statement-context';
import AccountOverview from '@/src/components/molecules/accounts-statement/account-overview/account-overview';
import AccountStatementTab from '@/src/components/molecules/accounts-statement/account-full-statement/account-full-statement';

const AccountStatementModule = () => {
  const { colorToken, font } = useCoreProps();
  const selectedAccount = useRef<string | null>(null);

  const { setAccountId } = useAccountStatementContext();
  const onAccountChange = (el: string) => {
    console.log(`selected ${el}`);
    selectedAccount.current = el;
    if (!selectedAccount.current) return;
    setAccountId(selectedAccount.current);
  };
  const tabsItems = [
    {
      title: 'Account Full Statement',
      content: <AccountStatementTab />,
    },
    {
      title: 'Account Mini Statement',
      content: <AccountMiniStatement />,
    },
    {
      title: 'Account Overview',
      content: (
        <div className="border-blue-400 flex  rounded-lg p-4">
          <div
            style={{
              display: 'flex',
              alignItems: 'end',
              alignSelf: 'stretch',
              marginRight: '2rem',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <AccountOverview />
          </div>
        </div>
      ),
    },
    {
      title: ' Schedule',
      content: <AccountScheduleTable />,
    },
  ];

  const TabSection = () => {
    return (
      <ButtonTab
        items={tabsItems}
        colorToken={colorToken}
        font={font}
      ></ButtonTab>
    );
  };

  const Providers = () => {
    return (
      <StatementSelectionContainer>
        <AccountsProvider onAccountChange={onAccountChange} />
      </StatementSelectionContainer>
    );
  };

  return (
    <StatementWrapper
      providerRender={<Providers />}
      tabRender={<TabSection />}
      title="Practice"
    />
  );
};

export default withContainer(AccountStatementModule);

import { CoreProps } from '@/src/types/context.types';
import { CSSProperties, useState } from 'react';
import AccountSearchHeader from './account-search-header';
import { ProviderAccount } from './provider-account';
import ProviderAccountSection from './provide-account-selection';

const AccountSearch = (props: CoreProps) => {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  console.log(selectedAccount);
  const accountSearchStyles: CSSProperties = {
    display: 'flex',
    width: '100%',
    padding: '16px 24px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    borderRadius: '8px',
    background: props.colorToken.default.white,
    boxShadow: '0px 4px 16px 0px rgba(149, 154, 136, 0.25',
  };

  return (
    <div className="account-search" style={accountSearchStyles}>
      <AccountSearchHeader
        title="My Accounts"
        description="Check and configure all accounts to be accessed by Simba Portal"
        coreProps={props}
      />

      <ProviderAccountSection
        colorToken={props.colorToken}
        font={props.font}
        onAccountChange={setSelectedAccount}
      />

      <ProviderAccount selectedAccount={selectedAccount} />
    </div>
  );
};

export default AccountSearch;

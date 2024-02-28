'use client';

import ContactCard from '@/src/components/atoms/cards/contactCard';
import { useTokens } from '@/src/app/(context)/ColorContext';
import { InfoCircleFilled } from '@ant-design/icons';

const AccountSettingsCards = () => {
  const token = useTokens();
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
      }}
    >
      <ContactCard
        title="Available Balance"
        content="$146,786.33 / KES 21,356,071.28"
        icon={<InfoCircleFilled />}
        style={{
          width: '30%',
          borderRight: `1px solid ${token.default.grey}`,
          background: token.default.white,
          textOverflow: 'ellipsis',
        }}
      />
      <ContactCard
        title="Working Balance"
        content="$67,990.24"
        icon={<InfoCircleFilled />}
        style={{
          width: '30%',
          borderRight: `1px solid ${token.default.grey}`,
          background: token.default.white,
        }}
      />
      <ContactCard
        title="Term"
        content="12 months"
        icon={<InfoCircleFilled />}
        style={{
          width: '30%',

          background: token.default.white,
        }}
      />
    </div>
  );
};

export default AccountSettingsCards;

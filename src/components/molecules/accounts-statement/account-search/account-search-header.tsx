import React, { CSSProperties } from 'react';
import { useTokens, useFont } from '@/src/app/(context)/ColorContext';
import { CoreProps, FontProperties } from '@/src/types/context.types';

interface AccountHeaderDetailsProps {
  title?: string;
  description?: string;
  coreProps: CoreProps;
  borderBottom?: string;
  paddingBottom?: string;
}

const AccountSearchHeader = (props: AccountHeaderDetailsProps) => {
  const token = props.coreProps.colorToken;
  const font = props.coreProps.font;

  const {
    title = 'Meraki Systems - Accounts',
    description = 'Check and configure all accounts to be accessed by Simba Portal',
  } = props;

  const style: CSSProperties = {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '16px',
    alignSelf: 'stretch',
    borderBottom: props.borderBottom,
    paddingBottom: props.paddingBottom,
  };

  return (
    <div className="account-search-header" style={style}>
      <TextLabel
        description={title}
        style={{
          fontProp: font.typography.h6?.bold,
          color: token.brand.secondary,
        }}
      />
      <TextLabel
        description={description}
        style={{
          fontProp: font.typography.h6?.light,
          color: token.brand.secondary,
        }}
      />
    </div>
  );
};

const TextLabel = (props: {
  description: string;
  style: {
    fontProp?: FontProperties;
    color: string;
  };
}) => {
  return (
    <div
      style={{
        ...props.style.fontProp,
        color: props.style.color,
      }}
    >
      {props.description}
    </div>
  );
};

export default AccountSearchHeader;

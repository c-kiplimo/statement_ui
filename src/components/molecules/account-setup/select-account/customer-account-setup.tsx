import React from 'react';
import style from './select-account.module.css';
import AccountSearchHeader from '../../accounts-statement/account-search/account-search-header';
import { CoreProps } from '@/src/types/context.types';

type CustomerAccountSetupProps = {
  coreProps: CoreProps;
  title: string;
  description: string;
  borderBottom?: string;
  paddingBottom?: string;
};

export default function CustomerAccountSetup(props: CustomerAccountSetupProps) {
  const {
    title = 'Provide Customer Details',
    description = 'Setup the customer by using  Account number or customer Number ',
    borderBottom = '1px solid #E5E5E5',
    paddingBottom = '16px',
  } = props;
  return (
    <div className={style.selectAccountHeader}>
      <AccountSearchHeader
        coreProps={props.coreProps}
        borderBottom={borderBottom}
        paddingBottom={paddingBottom}
        title={title}
        description={description}
      />
    </div>
  );
}

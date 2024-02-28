import React, { ReactNode } from 'react';
import styles from './statement.account.module.css';
import { useCoreProps } from '@/src/app/(context)/ColorContext';
import CardHeader from './statement.header';

type StatementWrapperProp = {
  providerRender?: ReactNode;
  tabRender?: ReactNode;
  title?: string;
};

const StatementWrapper = ({
  providerRender,
  tabRender,
  title,
}: StatementWrapperProp) => {
  const coreProps = useCoreProps();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '19px',
        alignSelf: 'stretch',
        background: '#FFFFFF',
        padding: '16px 24px',
        borderRadius: '8px',
        width: '100%',
      }}
    >
      <div className={styles.statementCard}>
        <CardHeader
          title="My Accounts"
          description="Check and configure all accounts to be accessed by Simba Portal"
          coreProps={coreProps}
        />
        <div style={{ flex: 1, width: '100%' }}>{providerRender}</div>
        <div style={{ flex: 1, width: '100%' }}>{tabRender}</div>
      </div>
    </div>
  );
};

export default StatementWrapper;

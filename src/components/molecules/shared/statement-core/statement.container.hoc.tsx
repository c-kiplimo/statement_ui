import { AccountStatementContextProvider } from '@/src/app/(context)/account-statement-context';
import React from 'react';

const withContainer = (Component: any) => {
  return (props: any) => {
    return (
      <section
        className="content"
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <section
          className="content"
          style={{
            width: '95%',
            padding: '24px',
            display: 'flex',
            marginTop: '16px',
            justifyContent: 'flex-start',
            background: 'white',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <AccountStatementContextProvider>
            <Component {...props} />
          </AccountStatementContextProvider>
        </section>
      </section>
    );
  };
};

export default withContainer;

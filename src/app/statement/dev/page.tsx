"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import AccountsBalanceOverview from "@/src/components/widgets/accounts-balance-summary/accounts.balance.overview";

const svg=(<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.66667 3.22222L5 5.44444M5 5.44444L6.33333 3.22222M5 5.44444V7.22222M3.66667 5H6.33333M3.66667 6.33333H6.33333M9 5C9 5.52529 8.89654 6.04543 8.69552 6.53073C8.4945 7.01604 8.19986 7.45699 7.82843 7.82843C7.45699 8.19986 7.01604 8.4945 6.53073 8.69552C6.04543 8.89654 5.52529 9 5 9C4.47471 9 3.95457 8.89654 3.46927 8.69552C2.98396 8.4945 2.54301 8.19986 2.17157 7.82843C1.80014 7.45699 1.5055 7.01604 1.30448 6.53073C1.10346 6.04543 1 5.52529 1 5C1 3.93913 1.42143 2.92172 2.17157 2.17157C2.92172 1.42143 3.93913 1 5 1C6.06087 1 7.07828 1.42143 7.82843 2.17157C8.57857 2.92172 9 3.93913 9 5Z" stroke={"#17D05B"} stroke-linecap="round" stroke-linejoin="round"/>
</svg>);

const Dev = () => {
 
  return (
    <Fragment>
      <div>
          <AccountsBalanceOverview 
            icon={svg}
            accountName='Deposits Accounts(8)' 
            accountBalance='$50,000'
          >  
          </AccountsBalanceOverview>
        </div>
    </Fragment>
  );
};

export default withContainer(Dev);

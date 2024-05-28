"use client";
import React, { Fragment, useEffect, useState } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import BranchAccountStatement from "@/src/components/widgets/branch-account-statement/branch.account.statement";
import StatementAccounts from "@/src/components/widgets/acconts-configuration/config-acct-fetch/account";
import AccountsRictions, { EntriesProps } from "@/src/components/widgets/account-restrictions/restrictions";
import RestrictionEntries from "@/src/components/widgets/account-restrictions/restriction-entries/restriction.entries";
import AccountDetailsCard from "@/src/components/widgets/accounts-details-card/account.details.card";
import { AllAccountRestrictionsAction } from "@/src/lib/actions/all.restrictions.action";


const Dev = () => {
  const [datain, setdatain] = useState<EntriesProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AllAccountRestrictionsAction();
        
        setdatain(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <Fragment>
      <AccountsRictions
        titleName={"Restrictions"}
        addIcon={<img src="/addIcon.svg" alt="addIcon" />}
        filterIcon={<img src="/filterIcon.svg" alt="filterIcon" />}
         restrictionArray={datain}      />
    </Fragment>
  );
};

export default withContainer(Dev);

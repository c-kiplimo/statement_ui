"use client";
import React, { Fragment, useEffect} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import BranchAccountStatement from "@/src/components/widgets/branch-account-statement/branch.account.statement";
import Accountstype from "@/src/components/widgets/acconts-configuration/configuration-form/accounts.configuration";
import StatementAccounts from "@/src/components/widgets/acconts-configuration/config-acct-fetch/account";
import { AccountProfileProvider } from "../(protected)/accountsetup/context/account.contex";


const Dev = () => {
  return (
    <Fragment>
      <AccountProfileProvider>
      <Accountstype
        fileformartHeader={"Statement Frequency"}
        optiona={"Monthly"}
        optionb={"Bi Weekly"}
        optionc={"Weekly"}
        optiond={"Daily"}
        date={"Start date"}
        time={"Time"}
        dateIcon={<img src="/calendar.svg" alt="calendar" />}
        timeIcon={<img src="/time.svg" alt="time"/>}  />
</AccountProfileProvider>


    </Fragment>
  );
};

export default withContainer(Dev);
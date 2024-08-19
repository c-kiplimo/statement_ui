"use client";
import React, { Fragment, useState } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import SchedulesTable from "../(protected)/account-setup-self/schedules/schedules-table/schedules.table";
import { AccountInfoProvider } from "../(protected)/account-setup-self/schedules/schedules-context/accountInforContext";

const Dev = () => {
  const [status, setStatus] = useState(true);

  const handleStatusChange = (checked: boolean) => {
    setStatus(checked);
  };
  return (
    <Fragment>
      <AccountInfoProvider>
        <SchedulesTable customerId={1}/>
      </AccountInfoProvider>
    </Fragment>
  );
};

export default withContainer(Dev);

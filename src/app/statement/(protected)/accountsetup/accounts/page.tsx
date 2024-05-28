import React, { Fragment } from "react";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import AccountsPage from "./accounts";
import { AccountProfileProvider } from "../context/account.contex";

const Dev = () => {
  return (
    <Fragment>
        <AccountsPage />
     
    </Fragment>
  );
};

export default withContainer(Dev);

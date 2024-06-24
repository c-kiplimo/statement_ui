"use client";
import React, {Fragment} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import CustomerSearchPage from "../(protected)/accountsetup/mobile-version/search/customer.search.mobile.version";

const Dev = () => {
    return (
    <Fragment>
      <CustomerSearchPage/>
    </Fragment>
  );
};

export default withContainer(Dev);

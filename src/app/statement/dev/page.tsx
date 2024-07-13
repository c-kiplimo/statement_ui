"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import CompanyInfo from "../(protected)/user-management/company-info/company-info";
import useProfileId from "@/src/hooks/profileId";


const Dev = () => {
  const profId = useProfileId();
  return (
    <Fragment>
     <CompanyInfo customerId={profId!}/>
    </Fragment>
  );
};

export default withContainer(Dev);
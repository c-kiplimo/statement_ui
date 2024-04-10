"use client";
import React, { Fragment} from "react";
import Createdrecord from "@/src/components/widgets/account-created-recors-widget/created.record";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";

const Dev = () => {      
  return (
    <Fragment>
      <Createdrecord/>
    </Fragment>
  );
};

export default withContainer(Dev);

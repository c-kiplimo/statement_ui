"use client";
import React, { Fragment} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import Usersoverview from "@/src/components/widgets/users-overview/users.overview";

const Dev = () => {      
  return (
    <Fragment>
      <Usersoverview title={"Users Overview"}/>
    </Fragment>
  );
};

export default withContainer(Dev);

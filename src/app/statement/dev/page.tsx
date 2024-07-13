"use client";
import React, { Fragment} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import Users from "../(protected)/user-management/users/users";
import useProfileId from "@/src/hooks/profileId";

const Dev = () => {
  const profId = useProfileId();

  return (
    <Fragment>
      <Users customerId={profId!}/>
    </Fragment>
  );
};

export default withContainer(Dev);

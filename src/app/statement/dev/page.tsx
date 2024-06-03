"use client";
import React, { Fragment} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import RegisterUserForm from "@/src/components/widgets/user-management/form-content/registerUserForm";


const Dev = () => {
    return (
    <Fragment>
      <RegisterUserForm/>
    </Fragment>
  );
};

export default withContainer(Dev);

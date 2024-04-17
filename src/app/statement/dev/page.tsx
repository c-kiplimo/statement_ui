"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import EnterOtpToVerify from "@/src/components/widgets/otp-verify/enter_otp_to_verify";

const Dev = () => {
  return (
    <Fragment>
      <EnterOtpToVerify/>
    </Fragment>
  );
};

export default withContainer(Dev);

import LoanStatementModule from "@/src/app/statement/(protected)/(module)/loan-statement/loan-statement";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import React, { Fragment } from "react";

const LoanStatement = () => {
  return (
          <LoanStatementModule />
  );
};

export default withContainer(LoanStatement);

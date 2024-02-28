import CardStatementModule from "@/src/app/statement/(protected)/(module)/card-statement/card-statement";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import React, { Fragment } from "react";

const CardStatement = () => {
  return (
    <Fragment>
      <CardStatementModule />
    </Fragment>
  );
};

export default withContainer(CardStatement);

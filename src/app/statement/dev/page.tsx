"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import CurrencySummaryCard from "@/src/components/widgets/currency-summary-card/currency.summary.card";

const Dev = () => {

  return (
    <Fragment>
      <div style={{ background: "var(--Background-Background-Primary, #F5F5F5)" }}>
        <CurrencySummaryCard></CurrencySummaryCard>
      </div>

    </Fragment>
  );
};

export default withContainer(Dev);

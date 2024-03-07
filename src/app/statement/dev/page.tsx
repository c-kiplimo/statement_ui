"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import CurrencySummaryCard from "@/src/components/widgets/currency-summary-card/currency.summary.card";
import BalanceInfoCard from "@/src/components/widgets/balance-info-card/balance.info.card";
import { svgIcon } from "@/src/components/atoms/imageIcon/imageIcon";

const Dev = () => {
  return (
    <Fragment>
      <div style={{}}>
        <CurrencySummaryCard></CurrencySummaryCard>
        <BalanceInfoCard
          svgImage={svgIcon}
          currencyTitle="Kenya Shillings"
          balanceDescription="Available balance"
          availableBalance="23456"
          currencyCode="KES"
        />
      </div>
    </Fragment>
  );
};

export default withContainer(Dev);

"use client";
import React, { Fragment, useState } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import CashFlowCard from "@/src/components/widgets/cash-flow-card/cashFlowCard";

const Dev = () => {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  const buttonProps = [
    { label: "1D", onClick: handleClick, className: "1d" },
    { label: "7D", onClick: handleClick, className: "7d" },
    { label: "1M", onClick: handleClick, className: "1m" },
    { label: "1Y", onClick: handleClick, className: "1y" },
  ];

  const textData = [
    { text: "Money in", textInfo: "$1,276.00" },
    { text: "Money out", textInfo: "$4,050.10" },
  ];
  return (
    <Fragment>
      <CashFlowCard
        title="CashFlow"
        buttonProps={buttonProps}
        texts={textData}
      ></CashFlowCard>
    </Fragment>
  );
};

export default withContainer(Dev);

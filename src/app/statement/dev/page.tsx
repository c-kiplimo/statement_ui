"use client";
import React, { Fragment, useState } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import CashFlowCard from "@/src/components/widgets/cashFlowCard/cashFlowCard";

const Dev = () => {
  const buttons = [
    { label: "1D" },
    { label: "7D" },
    { label: "1M" },
    { label: "1Y" },
  ];

  const handleClick: any = () => {};
  const [activeButton, setActiveButton] = useState<string | null>(null);

  const handleButtonClick = (label: string) => {
    setActiveButton((prevActiveButton) => {
      if (prevActiveButton === label) {
        return null;
      } else {
        return label;
      }
    });
  };

  const textData = [
    { text: "Money in", textInfo: "$1,276.00" },
    { text: "Money out", textInfo: "$4,050.10" },
  ];
  return (
    <Fragment>
      <CashFlowCard
        title="Cash Flow"
        buttons={buttons}
        texts={textData}
        onButtonClick={handleButtonClick}
      ></CashFlowCard>
    </Fragment>
  );
};

export default withContainer(Dev);

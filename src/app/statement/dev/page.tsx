"use client";
import React, { Fragment, useState } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import TotalAvailableBalanceCard from "@/src/components/widgets/total-available-balance-card/total.available.balance.card";



const Dev = () => {
  

  return (
    <Fragment>
     <TotalAvailableBalanceCard/>
    </Fragment>
  );
};

export default withContainer(Dev);

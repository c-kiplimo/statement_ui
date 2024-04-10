"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import Accountstype from "@/src/components/widgets/acconts-type-widget/accounts.type";
const Dev = () => {
  return (
    <Fragment>
      <Accountstype
        headIcon={<img src="/dice.svg" alt="dice" />}
        header={"Meraki Current Account"}
        totalAmount={"KES | 132314245"}
        accStatus={"Last activity July, 07 2023"}
        amountHeader={"Available Balance"}
        inforIcon1={<img src="/info.svg" alt="info" />}
        inforIcon2={<img src="/info.svg" alt="info" />}
        inforIcon3={<img src="/info.svg" alt="info" />}
        amountInKES={"/ KES 21,356,071.28"}
        amountIn$={"$146,786.33"}
        workingBalHead={"Working Balance"}
        workingBal={"$67,990.24"}
        termHeader={"Term"}
        termDuration={"12 months"}
        fileformartHeader={"Statement Frequency"}
        optiona={"Monthly"}
        optionb={"Bi Weekly"}
        optionc={"Weekly"}
        optiond={"Daily"}
        date={"Start date"}
        time={"time"}
        dateIcon={<img src="/calendar.svg" alt="calendar" />}
        timeIcon={<img src="/clock.svg" alt="clock" />}
      />
    </Fragment>
  );
};

export default withContainer(Dev);

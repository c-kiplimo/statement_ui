"use client";
import React, { Fragment } from "react";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import dynamic from "next/dynamic";

const Accountstype = dynamic(() => import("./accounts.configuration"), { ssr: false });



const Dev = () => {
  return (
    <Fragment>
    
      <Accountstype
        fileformartHeader={"Statement Frequency"}
        optiona={"Monthly"}
        optionb={"Bi Weekly"}
        optionc={"Weekly"}
        optiond={"Daily"}
        date={"Start date"}
        time={"Time"}
        dateIcon={<img src="/calendar.svg" alt="calendar" />}
        timeIcon={<img src="/time.svg" alt="time" />}
         accountId={0}  />



    </Fragment>
  );
};

export default withContainer(Dev);

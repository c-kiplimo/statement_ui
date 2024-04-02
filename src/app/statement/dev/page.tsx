"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import Restrictions from "@/src/components/widgets/restrictions/restrictions";


const Dev = () => {
  return (
    <Fragment>
     <Restrictions title={"Create Restriction"} name={"Restriction Name"} description={"Description"} placeholder1={"Enter Name"} placeholder2={"Enter Description"} submitbutton={"Create Restriction"}/>
    </Fragment>
  );
};

export default withContainer(Dev);

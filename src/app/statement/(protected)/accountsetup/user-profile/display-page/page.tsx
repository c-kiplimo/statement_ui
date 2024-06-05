"use client"
import React, { Fragment, useState } from "react";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import Userprofile from "../user.profile";



const Dev = () => {
  
  return (
    <Fragment>
      
      <Userprofile/>
        
    
    </Fragment>
  );
};

export default withContainer(Dev);


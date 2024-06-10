"use client"
import React, { Fragment, useState } from "react";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import Userprofile from "./user.profile";
import {AccountProfileProvider } from "../context/account.contex";


const Dev = () => {
  
  return (
    <Fragment>
      <AccountProfileProvider>
      <Userprofile/>
      </AccountProfileProvider>    
    
    </Fragment>
  );
};

export default withContainer(Dev);


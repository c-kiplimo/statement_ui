"use client"
import React, { Fragment, useState } from "react";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import { UserProfileProvider } from "../context/customer.view.contex";
import dynamic from 'next/dynamic';


const UserViewProfilePageModal = dynamic(() => import('./user.view.profile'), { ssr: false });

const Dev = () => {
  
  return (
    <Fragment>
      <UserProfileProvider>
      <UserViewProfilePageModal/>
      </UserProfileProvider>    
    
    </Fragment>
  );
};

export default withContainer(Dev);


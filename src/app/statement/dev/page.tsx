"use client";
import React, { Fragment, useState } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import ActivePaymentsRequests from "@/src/components/widgets/active-payment-requests/active.payment.requests";


const Dev = () => {

  return (
    <Fragment>
      <div className="p-7" style={{backgroundColor:'whitesmoke', width:'100%', height:'100vh'}}>
      <ActivePaymentsRequests 
          title={"Active payment request" }
          description={"You requested $40.00 For Monthly dues"} 
          image={"/Ellipse.png"} 
          imageHeight={24} 
          imageWidth={24} 
          participants={'283 Participant . Optional . Feb 19,2023'}
          progressPercent={70} 
          paidAmount={'$180.14 (32%)'} 
          goalAmount={'Goal: $420.00'}/>
      </div>
    </Fragment>
  );
};

export default withContainer(Dev);

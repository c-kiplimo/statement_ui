"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import Accountstype from "@/src/components/widgets/acconts-type-widget/accounts.type";
import Createdrecord from "@/src/components/widgets/account-created-recors-widget/created.record";
import { AuthFlowSideBar } from "@/src/components/widgets/sidebar/common.sidebar";
import simbaPic from '@/src/components/widgets/sidebar/simbaportallogo.svg'
const Dev = () => {
  return (
    <Fragment>
      {/*<Createdrecord
        hideicon={<img src="/hide.svg" alt="hide" />}
        editicon={<img src="/edit.svg" alt="edit" />}
        creationDate={"Date Created"}
        acctNumber={"Account Number"}
        numberofTimes={"Frequency"}
        fileformart={"Template"}
        acctStatus={"Status"}
        date={"23-05-2023 "}
        status={"Active"}
        custName={"Meraki systems tech"}
        duration={"Daily"}
        filetype={"PDF"}
        time={"10:45 a.m"}
        acctbal={"KES  132314245"}
        timefrequency={"12.00 A.m"}
        default={"Default"}
      />*/}
      <AuthFlowSideBar title='Simba' description='Portal' icon={simbaPic}></AuthFlowSideBar>
    </Fragment>
  );
};

export default withContainer(Dev);

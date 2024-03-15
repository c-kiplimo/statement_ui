"use client";
import React, { Fragment, useState } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import MemberCard from "@/src/components/widgets/member-card-item/member.card";

const Dev = () => {
  return (
    <Fragment>
      <MemberCard title="Member Card" title2="View more" />
    </Fragment>
  );
};

export default withContainer(Dev);

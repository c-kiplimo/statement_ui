"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import Usersoverview from "@/src/components/widgets/users-overview/users.overview";
import LastLogin from "@/src/components/widgets/userStatus/user.login.status";

const Dev = () => {
  return <Fragment><LastLogin userName={""} mail={""} town={""} titleDescription={""} timezone={""} icon={undefined} lastSeenTime={""} button1={""} button2={""} button3={""} button4={""}/></Fragment>;
};

export default withContainer(Dev);

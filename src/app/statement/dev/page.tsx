"use client";
import React, { Fragment} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import UserGroupsprofile from "@/src/components/widgets/user-groups-profile/user.groups.profile";
import GroupsUserprofile from "@/src/components/widgets/user-groups-profile/user.groups.profile";
import { FontColorsOutlined } from "@ant-design/icons";

const Dev = () => {

  return (
    <Fragment>
      <GroupsUserprofile icon={"F"} title={"Financial Managers"} totalusers={"(12 Members)"} address={"Meraki Systems Co"} editbutton={"Edit Group "} deletebutton={"Delete group"} status={"ACTIVE"}/>
    </Fragment>
  );
};

export default withContainer(Dev);
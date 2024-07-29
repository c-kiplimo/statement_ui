"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import UserGroupsprofile from "@/src/components/widgets/user-groups-profile/user.groups.profile";
import GroupsUserprofile from "@/src/components/widgets/user-groups-profile/user.groups.profile";
import { CheckOutlined, FontColorsOutlined } from "@ant-design/icons";
import AddUserToGroup from "../(protected)/user-management/user-groups/add-user-to-group/addUserToGroup";
import GroupUsers from "../(protected)/user-management/user-groups/group-users-home-page/group.users";
import Successful from "@/src/components/widgets/success-widget/successfull/successful";

const Dev = () => {
  return (
    <Fragment>
      <GroupUsers/>
     
    </Fragment>
  );
};

export default withContainer(Dev);

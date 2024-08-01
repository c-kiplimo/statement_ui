"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import UserGroupsprofile from "@/src/components/widgets/user-groups-profile/user.groups.profile";
import GroupsUserprofile from "@/src/components/widgets/user-groups-profile/user.groups.profile";
import { FontColorsOutlined } from "@ant-design/icons";
import PermissionAssign from "../(protected)/user-management/user-groups/assign-permission-to-group/permission.assign";
import UpdateUserGroup from "../(protected)/user-management/user-groups/update-user-group/update.user.group";

const Dev = () => {
  return (
    <Fragment>
      <UpdateUserGroup/>
    </Fragment>
  );
};

export default withContainer(Dev);

"use client";
import React, { Fragment} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import UserInfo from "@/src/components/widgets/user-info/user-info";
import { InfoCircleFilled } from "@ant-design/icons";

const Dev = () => {
  return (
    <Fragment>
      <UserInfo>
      <UserInfo.Title title="Country">
      <InfoCircleFilled />
      </UserInfo.Title>
      <UserInfo.Description title="KENYA" description="Nairobi"/>
    </UserInfo>
    </Fragment>
  );
};

export default withContainer(Dev);

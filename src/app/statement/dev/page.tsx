"use client";
import React, { Fragment, useEffect} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import { useProfile } from "../(protected)/context/useProfileContext";
import { notification } from "antd";

const Dev = () => {
  const {profileInfo}=useProfile();
  useEffect(() => {
    if (profileInfo) {
      console.log("Profile Data:", profileInfo);
    } else {
      notification.error({
        message: "Error",
        description: "Profile data not found.",
      });
    }
  }, [profileInfo]); 
  return (
    <Fragment>
      <div>
        <h1 className="h1b">Welcome {profileInfo?.profileName}!</h1>
        <p className="h2m">Your profile Id: {profileInfo?.profileId}</p>
      </div>
    </Fragment>
  );
};

export default withContainer(Dev);
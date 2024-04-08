"use client";
import React, { Fragment} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import Profile from "@/src/components/widgets/profile/profile";
import {
  ContactsOutlined,
  IdcardOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

const Dev = () => {
  const items = [
    {
      title: "Search Details",
    },
    {
      title: "Verify Identity",
    },
  ];

  const LoginCard = [
    {
      id: 1,
      icon: <UserAddOutlined />,
      CardTitle: "Customer  Number",
      CardDescription: "View Statements",
    },
    {
      id: 2,
      icon: <UsergroupAddOutlined />,
      CardTitle: "Account  Number",
      CardDescription: "Manage corporate users",
    },
    {
      id: 3,
      icon: <IdcardOutlined />,
      CardTitle: "ID Number",
      CardDescription: "Use your National id number",
    },
    {
      id: 4,
      icon: <ContactsOutlined />,
      CardTitle: "Passport  Number",
      CardDescription: "Use your National id number",
    },
  ];
  return (
    <Fragment>
      <Profile
        profileSteps={items}
        header={"Select the option you prefer to use for onboarding?"}
        cardData={LoginCard}
      />
    </Fragment>
  );
};

export default withContainer(Dev);

"use client";
import React, { Fragment} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import CustomerProfile from "@/src/components/widgets/profileForm/profileForm";

const Dev = () => {

  const fields = [
    {
      id: "country",
      label: "Which country?",
      type: "select",
      placeholder: "Select country",
      options: ["Kenya", "Rwanda", "USA", "Europe"],
      htmlFor: "country",
    },
    {
      id: "account-number",
      label: "Account number",
      type: "text",
      placeholder: "Enter your account number",
    },
  ];
  return (
    <Fragment>
      <CustomerProfile header="Provide Details to allow us create your profile" headerDesc="We provide ability for you to on board to any country of your choice and ability to switch between different countries" fields={fields}/>
    </Fragment>
  );
};

export default withContainer(Dev);

"use client";

import React from "react";
import { ProfileProvider } from "../../../../context/useProfileContext";
import CustomerProfile from "./customer-profile";

const Page = ({ params }: { params: { id: number } }) => {
  return (
    <ProfileProvider>
      <CustomerProfile customerId={params.id} />
    </ProfileProvider>
  );
};

export default Page;

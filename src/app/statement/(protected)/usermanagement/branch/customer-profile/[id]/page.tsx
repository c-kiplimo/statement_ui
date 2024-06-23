"use client";

import React from "react";
import { ProfileProvider } from "../../../../context/useProfileContext";
import CustomerProfile from "./customer-profile";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const Page = ({ params }: { params: { id: number } }) => {
  return (
    <QueryClientProvider client={queryClient}>
        <ProfileProvider>
          <CustomerProfile customerId={params.id} />
        </ProfileProvider>
      </QueryClientProvider>
  );
};

export default Page;

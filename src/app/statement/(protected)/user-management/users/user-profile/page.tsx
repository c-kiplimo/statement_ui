"use client";

import React, { Suspense } from "react";
import UserProfile from "./widgets/user-profile";

const UserProfilePage = () => {
  return (
    <Suspense>
      <UserProfile />
    </Suspense>
  );
};

export default UserProfilePage;

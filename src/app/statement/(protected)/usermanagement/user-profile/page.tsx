"use client";

import React, { Suspense } from "react";
import UserProfile from "./widgets/user-profile";
const UserProfilePage = () => {
  return (
    <div className="w-full min-h-screen bg-[var(--Background-Background-Primary)] overflow-hidden">
      <Suspense>
        <UserProfile />
      </Suspense>
    </div>
  );
};

export default UserProfilePage;

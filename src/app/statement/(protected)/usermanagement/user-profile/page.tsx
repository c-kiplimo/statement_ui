"use client";

import React from "react";
import UserProfile from "./widgets/user-profile";
const UserProfilePage = () => {
  return (
    <div className="w-full min-h-screen bg-[var(--Background-Background-Primary)] overflow-hidden">      
        <UserProfile />      
    </div>
  );
};

export default UserProfilePage;

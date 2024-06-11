"use client"

import React from "react";
import RegisterUserForm from "./registerUserForm";


const UserManagementPage = () => {
  return (
    <div className="w-full min-h-screen bg-[var(--white)] overflow-hidden">
      <RegisterUserForm/>
    </div>
  );
};

export default UserManagementPage;

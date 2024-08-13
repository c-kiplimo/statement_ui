"use client";
import React, { Suspense } from "react";
import UpdateUser from "./widgets/updateUser";

const UpdateUserPage = () => {
  return (
    <Suspense>
      <div className="flex flex-col p-8 w-full bg-[var(--Background-Background-Primary)] h-auto overflow-hidden">
        <UpdateUser/>
      </div>
    </Suspense>
  );
};

export default UpdateUserPage;

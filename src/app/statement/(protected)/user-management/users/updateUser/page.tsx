"use client";
import React, { Suspense } from "react";
import UpdateUser from "./widgets/updateUser";
import {useSearchParams } from "next/navigation";

const UpdateUserPage = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  return (
    <Suspense>
      <div className="flex flex-col p-8 w-full bg-[var(--Background-Background-Primary)] h-auto overflow-hidden">
        <UpdateUser userId={userId as string} />
      </div>
    </Suspense>
  );
};

export default UpdateUserPage;

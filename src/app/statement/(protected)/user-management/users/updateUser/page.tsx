"use client"
import React from "react";
import UpdateUser from "./widgets/updateUser";
import { useRouter, useSearchParams } from "next/navigation";

const UpdateUserPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  
  return (
    <div className="flex flex-col p-4 w-full h-auto overflow-hidden">
       <UpdateUser userId={userId as string}/>
    </div>
  );
};

export default UpdateUserPage;

import React from "react";
import UpdateUser from "./widgets/updateUser";
import { useRouter } from "next/router";

const UpdateUserPage = () => {
  const router = useRouter();
  const { userId } = router.query; 
  return (
    <div className="flex flex-col p-4 w-full h-auto overflow-hidden">
       <UpdateUser userId={userId as string}/>
    </div>
  );
};

export default UpdateUserPage;

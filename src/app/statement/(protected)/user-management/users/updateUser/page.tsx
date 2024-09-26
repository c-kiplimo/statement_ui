"use client";
import React, { Suspense } from "react";
import styles from "./widgets/page.module.css";
import UpdateUser from "./widgets/updateUser";

const UpdateUserPage = () => {
  return (
    <Suspense>
      <div className={styles.container}>
        <UpdateUser/>
      </div>
    </Suspense>
  );
};

export default UpdateUserPage;

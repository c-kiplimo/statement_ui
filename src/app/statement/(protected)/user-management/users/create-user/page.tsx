"use client";

import React from "react";
import styles from "./widgets/page.module.css"
import CreateUser from "./widgets/create-user";

const CreateUserPage = () => {
  return (
    <div className={styles.container}>
      <CreateUser />
    </div>
  );
};

export default CreateUserPage;

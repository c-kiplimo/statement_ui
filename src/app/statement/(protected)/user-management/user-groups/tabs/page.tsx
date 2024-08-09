"use client";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import React, { Fragment, Suspense } from "react";
import styles from "./userGroupsTabs.module.css"
import GroupsTabs from "./userGroupsTabs";



const Dev = () => {
  return (
    <Suspense >
        <div className={styles.container}>
      <GroupsTabs/>
      </div>
    </Suspense>
  );
};

export default withContainer(Dev);

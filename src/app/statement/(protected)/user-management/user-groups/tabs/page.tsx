"use client";
import withContainer from "@/src/components/molecules/shared/statement-core/statement.container.hoc";
import React, { Fragment } from "react";
import styles from "./userGroupsTabs.module.css"
import GroupsTabs from "./userGroupsTabs";



const Dev = () => {
  return (
    <Fragment >
        <div className={styles.container}>
      <GroupsTabs/>
      </div>
    </Fragment>
  );
};

export default withContainer(Dev);

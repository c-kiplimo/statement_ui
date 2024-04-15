"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import Modal from "@/src/components/widgets/modals/modal";

const Dev = () => {
  return (
    <Fragment>
      <Modal
        isOpen={true}
        title="Modal Test"
        description="This is a test modal"
      />
    </Fragment>
  );
};

export default withContainer(Dev);

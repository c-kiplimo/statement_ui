"use client";
import React, { Fragment, useState} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import CustomerStatus from "@/src/components/widgets/customer-status/customer-status";

const Dev = () => {
  const [status, setStatus] = useState(true);

  const handleStatusChange = (checked: boolean) => {
    setStatus(checked);
  };
  return (
    <Fragment>
      <CustomerStatus
        customerName="Meraki Systems Tech"
        industry="Banking Industry"
        customerType="Corporate"
        status={status}
        onStatusChange={handleStatusChange}
      />
    </Fragment>
  );
};

export default withContainer(Dev);

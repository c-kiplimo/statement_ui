"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import Customerdetails from "@/src/components/widgets/member-card-item/customer-details/customer.info";
import { RightOutlined } from "@ant-design/icons";
import FundsAlocation from "@/src/components/widgets/member-card-item/funds-alocation/funds.alocation";

const Dev = () => {
  return (
    <Fragment>
      <Customerdetails
        amount="$2,360.00"
        image="/Ellipse.png"
        arrow={<RightOutlined />}
        title="John Doe"
      />

      <Customerdetails
        amount="$2,630.00"
        image="/Ellipse.png"
        arrow={<RightOutlined />}
        title="Mira Carder"
      />
      <FundsAlocation
        title="Total Alocated"
        description="$1,94.00"
        title2="Total Members"
        description2="184"
      />
    </Fragment>
  );
};

export default withContainer(Dev);

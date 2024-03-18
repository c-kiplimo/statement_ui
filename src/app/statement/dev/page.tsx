"use client";
import React, { Fragment, useState } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import { RiseOutlined } from "@ant-design/icons";
import TransactionCard from "@/src/components/widgets/transaction-flow/transactionflow";

const Dev = () => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("Widget clicked!");
  };
  return (
    <Fragment>
      <div>
        <TransactionCard
          onClick={handleClick}
          icon={
            <TransactionCard.Icon
              icon={<RiseOutlined size={13} />}
              iconStyle={{ backgroundColor: "#FFF2E0", color: "#FFBD66" }}
            />
          }
          title={"PayPal"}
          description={"$47,000"}
          percentage={60}
          strokeColor={"#FFBD66"}
        ></TransactionCard>
      </div>
    </Fragment>
  );
};

export default withContainer(Dev);

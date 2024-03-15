"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import CashFlow from "@/src/components/widgets/cashFlow/cashFlow";
import { DownloadOutlined } from "@ant-design/icons";

const Dev = () => {
  const handleCashFlowClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    console.log("CashFlow clicked!");
  };
  return (
    <Fragment>
      <div>
        <CashFlow
          onClick={handleCashFlowClick}
          icon={
            <CashFlow.Icon
              icon={
                <DownloadOutlined
                  size={16}
                  style={{
                    color: "white",
                  }}
                />
              }
              iconStyle={{ backgroundColor: " var(--brand-brand-primary)" }}
            />
          }
          title="Money In"
          description="$37,890"
          borderColor="var(--brand-brand-primary)"
        ></CashFlow>
      </div>
    </Fragment>
  );
};

export default withContainer(Dev);

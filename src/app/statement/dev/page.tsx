"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import SummaryItem from "@/src/components/widgets/summary-items/summary-items";
import { ArrowRightOutlined, RetweetOutlined } from "@ant-design/icons";

const Dev = () => {
  return (
    <Fragment>
      <div
        style={{ background: "var(--Background-Background-Primary, #F5F5F5)" }}
      >
        <SummaryItem
          svgIcon={<RetweetOutlined />}
          summaryTitle="Opening Balance"
          titleDescription="(No 10)"
          amount="$560725"
          svgIcons={
            <ArrowRightOutlined
              style={{ transform: "rotate(-48deg)", color: "#4272DD" }}
            />
          }
          percentage="2.45%"
          date="This month"
        />
      </div>
    </Fragment>
  );
};

export default withContainer(Dev);

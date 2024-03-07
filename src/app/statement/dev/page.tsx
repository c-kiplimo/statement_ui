"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import SummaryItem from "@/src/components/widgets/summary-items/summary-items";
import CurrencySummaryCard from "@/src/components/widgets/currency-summary-card/currency.summary.card";
<<<<<<< HEAD
import BalanceInfoCard from "@/src/components/widgets/balance-info-card/balance.info.card";
import { svgIcon } from "@/src/components/atoms/imageIcon/imageIcon";

=======
import { ArrowRightOutlined, RetweetOutlined } from "@ant-design/icons";
>>>>>>> 5ad10d72fb5ec778b710a431169f56799e5e44a7

const Dev = () => {
  return (
    <Fragment>
<<<<<<< HEAD
        <SummaryItem />
        <HorizontalInfoDescription title="2.45%" description="This Month"/>

=======
      <div
        style={{ background: "var(--Background-Background-Primary, #F5F5F5)" }}
      >
        <CurrencySummaryCard></CurrencySummaryCard>
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
>>>>>>> 5ad10d72fb5ec778b710a431169f56799e5e44a7
      </div>
    </Fragment>
  );
};

export default withContainer(Dev);

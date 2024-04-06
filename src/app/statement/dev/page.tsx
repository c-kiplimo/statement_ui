"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import CardtypeDetailsInfo from "@/src/components/widgets/cardtype-details-info/cardtype.details.info";

const cardData = [
  {
    id: 1,
    icon: <img src="/Visa.svg" alt="Visa" />,
    accountName: "Master Card ****4322",
    accountInfo: "Expires 09/2023",
  },
  {
    id: 2,
    icon: <img src="/Master.svg" alt="Visa" />,
    accountName: "Master Card ****7921",
    accountInfo: "Expires 10/2023",
  },
  {
    id: 3,
    icon: <img src="/Visa.svg" alt="Visa" />,
    accountName: "Master Card ****9344",
    accountInfo: "Expires11/2023",
  },
  {
    id: 4,
    icon: <img src="/Master.svg" alt="Visa" />,
    accountName: "Master Card ****1527",
    accountInfo: "Expires 12/2024",
  },
];
const Dev = () => {
  return (
    <Fragment>
      <CardtypeDetailsInfo
        cardTitle={"Cards"}
        filterIcon={<img src="/funnel.svg" />}
        addIcon={<img src="/plussIcon.svg" alt="add" />}
        cardTypedata={cardData}
      />
    </Fragment>
  );
};

export default withContainer(Dev);

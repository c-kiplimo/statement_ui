"use client";
import React, { Fragment} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import GraphItem from "@/src/components/widgets/graph-item/graph.item";
const data = [
  {
    name: "Dec",
    Revenue: 13000,
    NetIncome: 5000,
  },
  {
    name: "Jan",
    Revenue: 21000,
    NetIncome: 9000,
  },
  {
    name: "Feb",
    Revenue: 20000,
    NetIncome: 15800,
  },
  {
    name: "Mar",
    Revenue: 22000,
    NetIncome: 13000,
  },
  {
    name: "Apr",
    Revenue: 20000,
    NetIncome: 9000,
  },
  {
    name: "May",
    Revenue: 21000,
    NetIncome: 10000,
  },
  {
    name: "Jun",
    Revenue: 30000,
    NetIncome: 18000,
  },
  {
    name: "Jul",
    Revenue: 38000,
    NetIncome: 20000,
  },
  {
    name: "Aug",
    Revenue: 32000,
    NetIncome: 15000,
  },
];
const Dev = () => {
  return (
    <Fragment>
      <div className="p-9 bg-slate-100">
        <GraphItem
          data={data}
          balanceTitle={"Current Balance"}
          amount={"$21,850.50"}
          moneyIntitle={"Money In"}
          moneyoutTitle={"Money Out"}
        />
      </div>
    </Fragment>
  );
};

export default withContainer(Dev);

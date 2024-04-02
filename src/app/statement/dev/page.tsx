"use client";
import React, { Fragment, useState } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import TransactionHistoryTable from "@/src/components/widgets/transaction-history-card/transaction.history.card";

const data= [
  {
    key: '1',
    account: 'John Brown',
    dateTime: 'July 25, 2024\n\n11:00 PM',
    number: '124 902 223 ',
    description: 'Received money',
    currency: 'KES',
    status: 'Failed',
  },
  {
    key: '2',
    account: 'John Brown',
    dateTime: 'July 25, 2024\n\n11:00 PM',
    number: '124 902 223 ',
    description: 'Received money',
    currency: 'KES',
    status: 'Failed',
  },
  {
    key: '3',
    account: 'John Brown',
    dateTime: 'July 25, 2024\n\n11:00 PM',
    number: '124 902 223 ',
    description: 'Received money',
    currency: 'KES',
    status: 'Completed',
  },{
    key: '4',
    account: 'John Brown',
    dateTime: 'July 25, 2024\n\n11:00 PM',
    number: '124 902 223 ',
    description: 'Received money',
    currency: 'KES',
    status: 'Pending',
  },
  {
    key: '5',
    account: 'John Brown',
    dateTime: 'July 25, 2024\n\n11:00 PM',
    number: '124 902 223 ',
    description: 'Received money',
    currency: 'KES',
    status: 'Completed',
  },
  {
    key: '6',
    account: 'John Brown',
    dateTime: 'July 25, 2024\n\n11:00 PM',
    number: '124 902 223 ',
    description: 'Received money',
    currency: 'KES',
    status: 'Failed',
  },
];

const Dev = () => {
  
  return (
    <Fragment>
      <div className="p-9 bg-slate-100">
        <TransactionHistoryTable data={data} cardTitle={"Transaction History"} deleteBtnlabel={"Delete"} filterBtnlabel={"Filter"} sortBtnlabel={"Sort"}/>
      </div>
    </Fragment>
  );
};

export default withContainer(Dev);

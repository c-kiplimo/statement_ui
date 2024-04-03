"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import TotalAvailableBalanceCard from "@/src/components/widgets/total-available-balance-card/total.available.balance.card";



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
const option = [
  {
    key:1,
    value:'period',
    period:'Period'
  },
  {
    key:1,
    value:'onemonth',
    period:'1 Month'
  },
  {
    key:1,
    value:'onemonth',
    period:'2 Month'
  }
]
const Dev = () => {
  
  return (
    <Fragment>
     <TotalAvailableBalanceCard/>
    </Fragment>
  );
};

export default withContainer(Dev);

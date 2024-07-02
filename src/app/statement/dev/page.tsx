"use client";
import React, {Fragment} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import HomePageMobileVersion from "../(protected)/dashboard/mobile-version/homepage/homepage";
const options = [
  {
    key: 1,
    value: "period",
    period: "Period",
  },
  {
    key: 2,
    value: "onemonth",
    period: "1 Month",
  },
  {
    key: 3,
    value: "twomonth",
    period: "2 Month",
  },
];
const data = [
  {
    key: '1',
    account: 'string;',
    dateTime: 'string',
    time:'string',
    number: 'string',
    description: 'string',
    currency: 'string',
    status: 'completed'
  },
  {
    key: '2',
    account: 'num;',
    dateTime: 'string',
    time:'string',
    number: 'string',
    description: 'string',
    currency: 'string',
    status: 'Pending'
  },
  {
    key: '3',
    account: 'and;',
    dateTime: 'string',
    time:'string',
    number: 'string',
    description: 'string',
    currency: 'string',
    status: 'completed'
  }
]
const Dev = () => {
    return (
    <Fragment>
      <HomePageMobileVersion transactions={data} options={options}/>
    </Fragment>
  );
};

export default withContainer(Dev);

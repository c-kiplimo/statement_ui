"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import RecentTransactionsCard from "@/src/components/widgets/recent-transaction-history/recent.transaction.history";

const optiondata = [
  {
      key: 1,
      value: 'onemonth',
      option: 'This Month'
  },
  {
      key: 2,
      value: 'twomonth',
      option: '2 Month'
  },
  {
      key: 3,
      value: 'threemonth',
      option: '3 Month'
  },
];

const transaction =[
  {
      id:1,
      amount:'-49.55',
      title:'Spotify',
      date:'Dec 21, 2021',
      description:'Tue, 21 Jan,2024',
      icon:<img src='/spotify.svg' alt='spotify'/>
  },
  {
      id:2,
      amount:'-49.55',
      title:'Spotify',
      date:'Tue, 21 Jan,2024 ',
      description:'Dec 21, 2021',
      icon:<img src='/DocumentRemove.svg' alt='spotify'/>
  },{
      id:3,
      amount:'150.88',
      title:'Alex Kog - > Alef bet gimmel',
      date:'Dec 21, 2021',
      description:'Bank Deposit . Fill Account',
      icon:<img src='/import.svg' alt='spotify'/>
  },{
      id:4,
      amount:'-49.55',
      title:'Netflix',
      date:'Dec 21, 2021',
      description:'Tue, 21 Jan,2024  ',
      icon:<img src='/DocumentRemoved.svg' alt='spotify'/>
  },{
      id:5,
      amount:'150.88',
      title:'John Doe - > Mpesa transaction',
      date:'Dec 21, 2021',
      description:'Bank Deposit . Fill Account',
      icon:<img src='/import.svg' alt='spotify'/>
  },
]
const Dev = () => {
  return (
    <Fragment>
      <div className="p-9 bg-slate-100">
      <RecentTransactionsCard title={"Recent Transactons"} options={optiondata} transactions={transaction}/>

      </div>
    </Fragment>
  );
};

export default withContainer(Dev);

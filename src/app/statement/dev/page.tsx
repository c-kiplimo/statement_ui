"use client";
import React, { Fragment } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import AccountDetailsCard from "@/src/components/widgets/accounts-details-card/account.details.card";

const filtersvg = (<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.09803 1.28273L5.99237 7.9332C6.06556 8.03126 6.10622 8.15664 6.10701 8.28665V12.3262C6.10653 12.3828 6.1214 12.4382 6.1495 12.4843C6.17759 12.5305 6.21746 12.5651 6.26343 12.5832L8.58944 13.4861C8.6242 13.4997 8.66124 13.5034 8.69747 13.4969C8.73371 13.4904 8.7681 13.474 8.79778 13.4489C8.82747 13.4238 8.85159 13.3908 8.86815 13.3526C8.88471 13.3145 8.89323 13.2722 8.89299 13.2295V8.28665C8.89418 8.15642 8.93537 8.03101 9.00908 7.9332L13.902 1.28273C13.9526 1.21398 13.9852 1.12974 13.996 1.04001C14.0069 0.95028 13.9954 0.858809 13.963 0.776437C13.9307 0.694065 13.8787 0.624246 13.8134 0.575252C13.748 0.526258 13.672 0.500143 13.5943 0.500001H1.4071C1.3293 0.499819 1.2531 0.5257 1.18754 0.574567C1.12197 0.623434 1.06982 0.693233 1.03727 0.775668C1.00472 0.858103 0.993142 0.949707 1.00391 1.03959C1.01469 1.12948 1.04735 1.21387 1.09803 1.28273Z" stroke="#151E00" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
)
const addsvg =(<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.60999 0H6.38906C6.28053 0 6.22627 0.0518519 6.22627 0.155556V6.26111H0.162791C0.0542636 6.26111 0 6.31296 0 6.41667V7.58333C0 7.68704 0.0542636 7.73889 0.162791 7.73889H6.22627V13.8444C6.22627 13.9481 6.28053 14 6.38906 14H7.60999C7.71852 14 7.77278 13.9481 7.77278 13.8444V7.73889H13.8372C13.9457 7.73889 14 7.68704 14 7.58333V6.41667C14 6.31296 13.9457 6.26111 13.8372 6.26111H7.77278V0.155556C7.77278 0.0518519 7.71852 0 7.60999 0Z" fill="#4272DD"/>
</svg>
)
const Dev = () => {

  return (
    <Fragment>
      <div>
      <AccountDetailsCard headerTitle={"Accounts"} filterIcon={filtersvg} addIcon={addsvg} buttonName={"View More"} padding={"8px"} width={"138px"} height={"40px"} backgroundColor={"#EFF2E6"} color={"#84BD00"} borderRadius={"27px"}/>
      </div>
    </Fragment>
  );
};

export default withContainer(Dev);

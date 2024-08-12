"use client";
import React from "react";
import RestrictionsTable from "./(restrictions-table)/restrictions.table";

const data = [
  {
    key: "1",
    date: "2024-08-12T10:23:23.043Z",
    restrictionName: "Staff expenses",
    restrictionDescription: "Staff exp",
    status: "Active",
  },
  {
    key: "2",
    date: "2024-08-12T10:23:23.043Z",
    restrictionName: "Send Money ",
    restrictionDescription: "1,000,000,000 per day",
    status: "Active",
  },
  {
    key: "3",
    date: "2024-08-12T10:23:23.043Z",
    restrictionName: "Staff Expenses",
    restrictionDescription: "Staff Expe",
    status: "Active",
  },
  {
    key: "4",
    date: "2024-08-12T12:23:23.043Z",
    restrictionName: "Withdraw Money",
    restrictionDescription: "1,000,000,000 per day",
    status: "Active",
  },
  {
    key: "5",
    date: "2024-08-12T04:55:23.111Z",
    restrictionName: "Staff Expenses",
    restrictionDescription: "Staff Expe",
    status: "Active",
  },
  {
    key: "6",
    date: "2024-08-12T10:55:23.111Z",
    restrictionName: "Staff Expenses",
    restrictionDescription: "Staff Expe",
    status: "Active",
  },
];

const RestrictionsPage = () => {
  return (
    <div>
      <RestrictionsTable restrictions={data} />
    </div>
  );
};

export default RestrictionsPage;

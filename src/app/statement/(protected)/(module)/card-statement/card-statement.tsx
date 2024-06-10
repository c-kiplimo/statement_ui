"use client";

import { useFont, useTokens } from "@/src/app/(context)/ColorContext";
import React, { Fragment, useRef, useState } from "react";
import DateCard from "@/src/components/molecules/shared/statement-core/pickdate/pickdate.submit";
import StatementSelectionContainer from "@/src/components/molecules/shared/statement-core/statement.accounts.selection";
import CardProvider from "@/src/components/molecules/shared/statement-core/card/statement.cards.provider";
import StatementWrapper from "../../../../../components/molecules/shared/statement-core/statement.wrapper";

import ViewEyeIcon from "@/src/components/atoms/view-eye-icon/view-eye-icon";
import { Tag } from "antd";
import TableDisplay from "@/src/components/molecules/accounts-statement/accounts-table/account-statement-table";
import AccountSearchResults from "@/src/components/widgets/account-search-results/account-search-results";

const CardStatementModule = () => {
  let startDate = useRef(null);
  let endDate = useRef(null);
  let accountNumber = useRef(null);

  const token = useTokens();
  const font = useFont();

  const selectedAccount = useRef<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [tagContent, setTagContent] = useState<string>("Pending");
  const [viewDetails, setViewDetails] = useState(false);
  const [createResponseId, setCreateResponseId] = useState<
    number | undefined
  >();

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const time_of_day = hours >= 12 ? "PM" : "AM";
  const formatted_hours = hours % 12 || 12;

  const onStartDateChanged = (el:any) => {
    if (el) {
      startDate.current = el.format("YYYY-MM-DD");
      console.log(`on Start Date selected ${el.format("YYYY-MM-DD")}`);
    }
  };

  const onEndDateChanged = (el:any) => {
    if (el) {
      endDate.current = el.format("YYYY-MM-DD");
      console.log(`on End Date selected  ${el.format("YYYY-MM-DD")}`);
    }
  };

  const onSubmit = (el:any) => {
    console.log(
      `startDate ${startDate.current} and end date ${endDate.current} account statement ${accountNumber.current}`
    );
    setLoading(true);
  };

  const onAccountChange = (el:any) => {
    console.log(`selected ${el}`);
    accountNumber.current = el;
  };

  const onEyeIconClick = (apiId?: string | undefined) => {
    console.log(`Viewing account ${apiId}`);
    setViewDetails(true);
  };

  const Providers = () => {
    return (
      <StatementSelectionContainer>
        <CardProvider onValueChange={onAccountChange} />
      </StatementSelectionContainer>
    );
  };

  const cards = [
    {
      title: "Date",
      content: `${day}-${month}-${year}`,
      additionalContent: `${formatted_hours}:${minutes} ${time_of_day}`,
    },
    {
      title: "Account Number",
      content: "Meraki Current Account",
      additionalContent: `KES ${selectedAccount.current}`,
    },
    {
      title: "Description",
      content: "Account Statement Generation ",
    },
    {
      title: "Status",
      additionalContent: (
        <Tag
          bordered={false}
          style={{
            padding: "4px 16px",
            fontSize: "14px",
            fontWeight: "500",
            color: token.accent.success,
            lineHeight: "24px",
            background: token.accent.success_invert_01,
            borderRadius: "4px",
            alignItems: "flex-start",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
          }}
        >
          {tagContent}
        </Tag>
      ),
    },

    {
      title: "",
      content: (
        <ViewEyeIcon
          style={{
            cursor: "pointer",
            color: "#979992",
          }}
          onClick={(createResponseId) => {
            onEyeIconClick(createResponseId);
            setViewDetails(true);
            console.log(`Viewing account ${createResponseId}`);
          }}
        />
      ),
      additionalContent: "",
    },
  ];

  return (
    <StatementWrapper
      providerRender={
        <Fragment>
          <Providers />
          <DateCard
            onStartDateChange={onStartDateChanged}
            onEndDateChange={onEndDateChanged}
            onSubmitChange={onSubmit}
          />
          {viewDetails ? (
            <TableDisplay
              colorTokens={token}
              font={font}
              statementRequestId={createResponseId}
            />
          ) : (
            <Fragment>
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    gap: "19px",
                    width: "100%",
                  }}
                >
                  <AccountSearchResults
                    customStyle={{ boxShadow: "none", alignItems: "baseline" }}
                    cards={cards}
                  />
                </div>
              ) : null}
            </Fragment>
          )}
        </Fragment>
      }
      title="Practice"
    />
  );
};

export default CardStatementModule;

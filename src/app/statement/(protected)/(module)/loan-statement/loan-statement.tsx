"use client";

import {
  useCoreProps,
  useFont,
  useTokens,
} from "@/src/app/(context)/ColorContext";
import React, { useRef, useState } from "react";
import ButtonTab from "@/src/components/atoms/tabs/button_tab";
import DateCard from "@/src/components/molecules/shared/statement-core/pickdate/pickdate.submit";
import StatementWrapper from "@/src/components/molecules/shared/statement-core/statement.wrapper";
import StatementSelectionContainer from "@/src/components/molecules/shared/statement-core/statement.accounts.selection";
import LoanProvider from "../../../../../components/molecules/shared/statement-core/loan/loan.provider";
import { Tag } from "antd";
import ViewEyeIcon from "@/src/components/atoms/view-eye-icon/view-eye-icon";
import TableDisplay from "@/src/components/molecules/accounts-statement/accounts-table/account-statement-table";
import AccountSearchResults from "@/src/components/widgets/account-search-results/account-search-results";

const LoanStatementModule = () => {
  let startDate = useRef(null);
  let endDate = useRef(null);
  let accountNumber = useRef(null);

  const selectedAccount = useRef<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tagContent, setTagContent] = useState<string>("Pending");
  const [viewDetails, setViewDetails] = useState(false);
  const [createResponseId, setCreateResponseId] = useState<
    number | undefined
  >();

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

  const onAccountChange = (el:any) => {
    console.log(`selected ${el}`);
    accountNumber.current = el;
  };

  const LoanStatement = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [tagContent, setTagContent] = useState<string>("Pending");
    const [viewDetails, setViewDetails] = useState(false);
    const [createResponseId, setCreateResponseId] = useState<
      number | undefined
    >();

    const token = useTokens();
    const font = useFont();

    const onSubmit = (el:any) => {
      console.log(
        `startDate ${startDate.current} and end date ${endDate.current} account statement ${accountNumber.current}`
      );
      setLoading(true);
    };

    const onEyeIconClick = (apiId?: string | undefined) => {
      console.log(`Viewing account ${apiId}`);
      setViewDetails(true);
    };

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    const time_of_day = hours >= 12 ? "PM" : "AM";
    const formatted_hours = hours % 12 || 12;

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "19px",
          alignSelf: "stretch",
          background: colorToken.default.white,
        }}
      >
        <div
          style={{
            alignItems: "end",
            alignSelf: "stretch",
            marginRight: "2rem",
            justifyContent: "center",
            marginBottom: "5px",
          }}
        >
          <DateCard
            onStartDateChange={onStartDateChanged}
            onEndDateChange={onEndDateChanged}
            onSubmitChange={onSubmit}
          />
        </div>

        {viewDetails ? (
          <TableDisplay
            colorTokens={token}
            font={font}
            statementRequestId={createResponseId}
          />
        ) : (
          <>
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
          </>
        )}
      </div>
    );
  };

  const LoanOverview = () => {
    const token = useTokens();
    const font = useFont();

    const selectedAccount = useRef<string | null>(null);
    const startDateRef = useRef<string | null>(null);
    const endDateRef = useRef<string | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
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
    ];
    return (
      <div
        style={{
          display: "flex",
          alignItems: "end",
          alignSelf: "stretch",
          marginRight: "2rem",
          justifyContent: "center",
        }}
      >
        <>
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
        </>
      </div>
    );
  };

  const tabsItems = [
    {
      title: "Loan Statement",
      content: <LoanStatement />,
    },
    {
      title: "Loan Overview",
      content: <LoanOverview />,
    },
  ];

  const TabSection = () => {
    return (
      <ButtonTab
        items={tabsItems}
        colorToken={colorToken}
        font={font}
      ></ButtonTab>
    );
  };

  const Providers = () => {
    return (
      <StatementSelectionContainer>
        <LoanProvider onValueChange={onAccountChange} />
      </StatementSelectionContainer>
    );
  };
  //
  const { colorToken, font } = useCoreProps();
  return (
    <StatementWrapper
      providerRender={<Providers />}
      tabRender={<TabSection />}
    />
  );
};

export default LoanStatementModule;

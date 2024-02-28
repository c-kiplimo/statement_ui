"use client";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { AppColorToken, FontType } from "@/src/types/context.types";
import AccountStatementHeaderComponent from "../../shared/account-statement-header/statement-header-component";
import { ColumnsType } from "antd/es/table";
import { AccountStatementRequestHandler } from "@/src/services/account/account.statement.request.service";
import { useFont, useTokens } from "@/src/app/(context)/ColorContext";

interface AccountStatementHeaderDataItem {
  title: string;
  description: string;
  key?: string;
}

const TableDisplay = (props: {
  colorTokens: AppColorToken;
  font: FontType;
  statementRequestId: number | undefined;
}) => {
  const [data, setData] = useState<AccountStatementRequest[]>([]);
  const [accountDetails, setAccountDetails] =
    useState<AccountStatementRequest>();
  const [response, setResponse] = useState<AccountStatementRequest>();
  const { statementRequestId } = props;
  useEffect(() => {
    const fetchData = async () => {
      const { fetchStatementRequestById } = AccountStatementRequestHandler();
      try {
        if (statementRequestId) {
          const response = await fetchStatementRequestById(statementRequestId);
          console.log(response);
          setResponse(response);
          //convert json object to array
          let parsedResponse;
          if (response.data) {
            parsedResponse = JSON.parse(response?.data);
            console.log(parsedResponse);
          }
          if (response) {
            setData(parsedResponse.statementEntries);
            setAccountDetails(parsedResponse.accountDTO);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [statementRequestId]);
  const tokenColor = useTokens();
  const fonts = useFont();
  const columns: ColumnsType<AccountStatementRequest> = [
    {
      title: "Value Date",
      dataIndex: "valueDate",
      key: "valueDate",
      render: (text) => {
        const dateString = text.toString();
        const year = dateString.slice(0, 4);
        const month = dateString.slice(4, 6);
        const day = dateString.slice(6, 8);

        const eventDate = new Date(`${year}-${month}-${day}`);

        const dayFormatted = String(eventDate.getDate()).padStart(2, "0");
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const monthFormatted = monthNames[eventDate.getMonth()];
        const yearFormatted = eventDate.getFullYear();

        return `${dayFormatted}-${monthFormatted}-${yearFormatted}`;
      },
    },
    {
      title: "Transfer Ref",
      dataIndex: "transactionCode",
      key: "transactionCode",
    },
    {
      title: "Payment Details",
      dataIndex: "transactionDetails",
      key: "transactionDetails",
    },
    {
      title: "Money Out",
      dataIndex: "amount",
      key: "amount1",
      render: (text, record) => {
        if (record.data) {
          return (
            <span
              style={{
                color: tokenColor.accent.danger,
                fontSize: fonts.typography.body.regular.fontSize,
                fontWeight: fonts.typography.body.regular.fontWeight,
                lineHeight: fonts.typography.body.regular.lineHeight,
              }}
            >
              -{text}
            </span>
          );
        }
        return null;
      },
    },
    {
      title: "Money In",
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => {
        if (!record.data) {
          return (
            <span
              style={{
                color: tokenColor.accent.success,
                fontSize: fonts.typography.body.regular.fontSize,
                fontWeight: fonts.typography.body.regular.fontWeight,
                lineHeight: fonts.typography.body.regular.lineHeight,
              }}
            >
              {text}
            </span>
          );
        }
        return null;
      },
    },
    {
      title: "Running Balance",
      dataIndex: "runningBalance",
      key: "runningBalance",
    },
  ];

  const statementData: AccountStatementHeaderDataItem[] = [
    {
      title: "Account Name",
      description: accountDetails?.accountTitle ?? "",
      key: "1",
    },
    {
      title: "Account Number",
      description: accountDetails?.accountId ?? "",
      key: "2",
    },
    {
      title: "Account Currency",
      description: accountDetails?.currency ?? "",
      key: "3",
    },
    {
      title: "Statement Period",
      description: `${response?.startDate} - ${response?.endDate}`,
      key: "4",
    },
  ];
  return (
    <section
      style={{
        width: "100%",
        padding: "20px",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          marginTop: "30px",
          flexDirection: "column",
          alignItems: "flex-start",
          alignSelf: "stretch",
          borderRadius: "8px",
          background: props.colorTokens.default.white,
        }}
      >
        <AccountStatementHeaderComponent data={statementData} />
        <DisplayTable columns={columns} data={data} />
      </div>
    </section>
  );
};
const DisplayTable = ({
  columns,
  data,
}: {
  columns: ColumnsType<AccountStatementRequest>;
  data: AccountStatementRequest[];
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "16px",
        alignSelf: "stretch",
      }}
    >
      <Table
        style={{ marginTop: "40px", width: "100%" }}
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 2,
          itemRender: (current, type, originalElement) => {
            if (type === "page") {
              return <span style={{ margin: "0 8px" }}>{current}</span>;
            }
            return originalElement;
          },
          style: {
            display: "flex",
            textAlign: "center",
          },
        }}
      />
    </div>
  );
};

export default TableDisplay;

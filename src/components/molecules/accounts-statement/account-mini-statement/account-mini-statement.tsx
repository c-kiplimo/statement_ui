"use client";

import React, { useEffect, useState } from "react";
import { useFont, useTokens } from "@/src/app/(context)/ColorContext";
import ContactCard from "@/src/components/atoms/cards/contact.card";
import { InfoCircleFilled } from "@ant-design/icons";
import { CustomText } from "@/src/components/atoms/typography/primary_text";
import CustomSvgIcon from "@/src/components/atoms/svg/svg-icons";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import CardDescItem from "@/src/components/atoms/cards/card.desc.item";
import { useAccountStatementContext } from "@/src/app/(context)/account-statement-context";
import { AccountMiniStatementHandler } from "@/src/services/account/acccount.ministatement.service";

const AccountMiniStatement = React.memo(() => {
  const tokenColor = useTokens();
  const font = useFont();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "19px",
        alignSelf: "stretch",
        background: tokenColor.default.white,
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "8px 32px 16px 24px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "16px",
          alignSelf: "stretch",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            alignSelf: "stretch",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <CardDescItem
              title="Meraki Systems - Accounts"
              description="KES  |  132314245"
              icon={
                <CustomSvgIcon width={16} height={16} fillColor="#F5F5F5" />
              }
            />

            <div style={{ marginLeft: "auto" }}>
              <CustomText
                title="Last activity July, 07 2023"
                fontSize={font.typography.body.regular.fontSize}
                textColor={tokenColor.text.description_01}
                lineHeight={font.typography.body.regular.lineHeight}
                fontWeight={font.typography.body.regular.fontWeight}
                className="custom-text"
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <ContactCard
            title="Available Balance"
            content="$146,786.33"
            additonalContent="/KES 21,356,071.28"
            icon={<InfoCircleFilled />}
            style={{
              borderRight: `1px solid ${tokenColor.default.grey}`,
              background: tokenColor.default.white,
            }}
          />

          <ContactCard
            title="Working Balance"
            content="$67,990.24"
            icon={<InfoCircleFilled />}
            style={{
              borderRight: `1px solid ${tokenColor.default.grey}`,
              background: tokenColor.default.white,
            }}
          />

          <ContactCard
            title="Term"
            content="12 months"
            icon={<InfoCircleFilled />}
            style={{
              background: tokenColor.default.white,
            }}
          />
        </div>
      </div>
      <DisplayTable />
    </div>
  );
});

const DisplayTable = () => {
  const { accountId } = useAccountStatementContext();
  const [data, setData] = useState<MiniStatement[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { fetchAccountMiniStatement } = AccountMiniStatementHandler();
      try {
        if (accountId) {
          const response = await fetchAccountMiniStatement(accountId);
          console.log(response);
          if (response) {
            setData(response);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [accountId]);

  const columns: ColumnsType<MiniStatement> = [
    {
      title: "Date",
      dataIndex: "eventTime",
      key: "eventTime",
      render: (text) => {
        const eventDate = new Date(text);

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
      title: "Payment Details",
      dataIndex: "transactionDetails",
      key: "transactionDetails",
    },
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
      title: "Money Out",
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => (record.debit ? text : null),
    },
    {
      title: "Money In",
      dataIndex: "amount",
      key: "amount",
      render: (text, record) => (record.credit ? text : null),
    },
    { title: "Balance", dataIndex: "runningBalance", key: "runningBalance" },
  ];
  return (
    <div
      style={{
        display: "flex",
        padding: "0px 24px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "16px",
        alignSelf: "stretch",
      }}
    >
      <Table
        style={{ marginTop: "15px", width: "100%" }}
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

export default AccountMiniStatement;

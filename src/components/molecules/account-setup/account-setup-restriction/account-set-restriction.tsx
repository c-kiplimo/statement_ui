"use client";

import React, { CSSProperties, useState } from "react";
import style from "../../account-setup-activity/account-setup-activity.module.css";

import { useFont, useTokens } from "@/src/app/(context)/ColorContext";

import { DeleteOutlined } from "@ant-design/icons";

import Tabs from "@/src/components/atoms/tabs/tab-item/tab-item";
import TabContent from "@/src/components/atoms/tabs/tab-content/tab-content";
import Button from "@/src/components/atoms/button/button";
import Table, { ColumnsType } from "antd/es/table";
import { Space } from "antd";
import ActivityHeaderComponent from "@/src/components/molecules/account-setup-activity/activity-setup-header";
import UserSetupDetails from "@/src/components/molecules/account-setup-activity/user-setup-details";
import CustomerSetupRestrictionSearchBar from "./Customer-setup-restriction-search-bar";
import CustomSearchInput from "@/src/components/atoms/input/custom-search";
import CustomerSetupActivitySearchBar from "../../account-setup-activity/customer-setup-activity-search-bar";
import ActionButton from "@/src/components/atoms/button/action-button";
import { AddUserIcon } from "@/src/components/atoms/svg/document_svg";

const AccountSetupRestriction = () => {
  const token = useTokens();
  const font = useFont();
  const [selectedTab, setSelectedTab] = useState(0);

  const accountSetupActivityCss: CSSProperties = {
    background: token.default.white,
  };

  const handleSearch = (searchTerm: string): void => {
    console.log(searchTerm);
  };

  const handleDelete = (record: any) => {
    console.log("Delete clicked for:", record);
  };

  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    description: string;
    date: string;
    join: string;
  }

  const columns: ColumnsType<DataType> = [
    { title: "Group", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "age", key: "age" },
    { title: "Status", dataIndex: "address", key: "address" },
    { title: "Date Created", dataIndex: "date", key: "date" },
    { title: "Joined On", dataIndex: "join", key: "join" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <Space>
          <Button
            icon={<DeleteOutlined />}
            label="Delete"
            bgColor={token.default.white}
            borderColor={token.border.primary}
            textColor={token.default.black}
            onClick={() => handleDelete(record)}
            style={{}}
          />
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: 1,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description:
        "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
      date: "12/03/2023",
      join: "12/03/2023",
    },
    {
      key: 2,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
      date: "12/03/2023",
      join: "12/03/2023",
    },
    {
      key: 3,
      name: "Not Expandable",
      age: 29,
      address: "Jiangsu No. 1 Lake Park",
      description: "This not expandable",
      date: "12/03/2023",
      join: "12/03/2023",
    },
    {
      key: 4,
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.",
      date: "12/03/2023",
      join: "12/03/2023",
    },
  ];

  const items: {
    title: string;
    content: React.JSX.Element;
    contentwidth?: string;
  }[] = [
    {
      title: "Accounts",
      content: (
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              padding: "16px 24px",
              alignItems: "center",
              backgroundColor: token.default.white,
              justifyContent: "space-between",
              alignSelf: "stretch",
            }}
          >
            <CustomSearchInput
              onSearch={handleSearch}
              borderColor={token.default.grey}
              color={token.text.primary}
              borderWidth="none"
              iconHeight="20px"
            />

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <ActionButton
                onClick={() => console.log("clicked")}
                icon={AddUserIcon}
                bgColor="var(--blue-bg-color)"
                text="Add New  User"
                color={token.default.grey}
              />
            </div>
          </div>
          <Table
            style={{ width: "100%" }}
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record.description}</p>
              ),
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}
            dataSource={data}
          />
        </div>
      ),
    },
    {
      title: "Users",
      content: (
        <div
          style={{
            display: "flex",
            padding: "16px 24px",
            alignItems: "center",
            backgroundColor: token.default.white,
            justifyContent: "space-between",
            alignSelf: "stretch",
          }}
        >
          <CustomSearchInput
            onSearch={handleSearch}
            borderColor={token.default.grey}
            color={token.text.primary}
            borderWidth="none"
            iconHeight="20px"
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <ActionButton
              onClick={() => console.log("clicked")}
              icon={AddUserIcon}
              bgColor="var(--blue-bg-color)"
              text="Add New  User"
              color={token.default.grey}
            />
          </div>
        </div>
      ),
    },
    {
      title: "Activity",
      content: (
        <div style={{ width: "100%" }}>
          <CustomerSetupActivitySearchBar />
          <Table
            style={{ width: "100%" }}
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record.description}</p>
              ),
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}
            dataSource={data}
          />
        </div>
      ),
      contentwidth: "100%",
    },
    {
      title: "Restrictions",
      content: (
        <div style={{ width: "100%" }}>
          <CustomerSetupRestrictionSearchBar />
          <Table
            style={{ width: "100%" }}
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record.description}</p>
              ),
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}
            dataSource={data}
          />
        </div>
      ),
    },
    {
      title: "Cards",
      content: (
        <div
          style={{
            display: "flex",
            padding: "16px 24px",
            alignItems: "center",
            backgroundColor: token.default.white,
            justifyContent: "space-between",
            alignSelf: "stretch",
          }}
        >
          <CustomSearchInput
            onSearch={handleSearch}
            borderColor={token.default.grey}
            color={token.text.primary}
            borderWidth="none"
            iconHeight="20px"
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <ActionButton
              onClick={() => console.log("clicked")}
              icon={AddUserIcon}
              bgColor="var(--blue-bg-color)"
              text="Add New  User"
              color={token.default.grey}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div
      className={style.accountSetupActivityContainer}
      style={accountSetupActivityCss}
    >
      <div className={style.activitysetupheader}>
        <ActivityHeaderComponent />
        <UserSetupDetails />
        <div className={style.activitysetupheadertabs}>
          <Tabs
            textColor={token.default.black}
            borderColor={token.default.grey}
            backgroundColor={token.border.primary}
            fontWeight={font.typography.body.medium.fontWeight}
            tabsItems={items}
            onSelectTab={(index) => setSelectedTab(index)}
            selectedTab={selectedTab}
          />
        </div>
        <div
          style={{
            border: `1px solid ${token.default.grey}`,
            width: "100%",
          }}
        >
          <TabContent
            textColor={token.default.black}
            backgroundColor={token.accent.warning_invert_01}
            fontWeight={font.typography.body.medium.fontWeight}
            tabsItems={items}
            selectedTab={selectedTab}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountSetupRestriction;

"use client";

import React, { CSSProperties, useEffect, useState } from "react";

import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import { useTokens } from "@/src/app/(context)/ColorContext";
import { Tabs } from "antd";
import Button from "@/src/components/atoms/button/button";
import { PermissionHandler } from "@/src/services/usermanagement/user.permissions.service";

const RoleTable = () => {
  const { fetchAllPermissions, fetchAllUserPermissions } = PermissionHandler();
  const [data, setData] = useState<Permission[]>([]);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    const response = await fetchAllPermissions();
    console.log("response", response);
    setData(response);
  };
  const token = useTokens();
  const onChange = (key: string) => {
    console.log(key);
  };

  const handleEdit = (record: any) => {
    console.log("Edit clicked for:", record);
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
  }

  const columns: ColumnsType<Permission> = [
    { title: "Role Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "age", key: "age" },
    { title: "Status", dataIndex: "address", key: "address" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <Space>
          <Button
            label="Edit"
            bgColor={token.default.white}
            borderColor={token.border.primary}
            textColor={token.default.black}
            onClick={() => handleEdit(record)}
            style={{}}
          />

          <Button
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

  const contentCss: CSSProperties = {
    width: "100%",
    padding: "40px",
    display: "flex",
    justifyContent: "flex-start",
    position: "relative",
    background: token.default.white,
    flexDirection: "column",
    alignItems: "flex-start",
  };

  return (
    <section
      className="content"
      style={{
        display: "flex",
        position: "relative",
        width: "100%",
        justifyContent: "start",
      }}
    >
      <section className="content" style={contentCss}>
        <Button
          label="Create new roles"
          width="124px"
          position="absolute"
          top="30px"
          right="80px"
          bgColor={token.brand.primary}
          textColor={token.default.white}
          onClick={() => console.log("clicked")}
          disabled={false}
          style={{}}
        />
        <Tabs
          onChange={onChange}
          style={{ width: "100%" }}
          type="card"
          items={new Array(1).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
              label: `Roles`,
              key: id,
              children: (
                <Table
                  style={{ marginTop: "15px", width: "100%" }}
                  columns={columns}
                  dataSource={data}
                />
              ),
            };
          })}
        />
      </section>
    </section>
  );
};

export default RoleTable;

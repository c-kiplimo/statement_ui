"use client";

import React, { CSSProperties, useState } from "react";
import { Modal, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import {useTokens } from "@/src/app/(context)/ColorContext";
import { Tabs } from "antd";
import Button from "@/src/components/atoms/button/button";
import PrimaryButton from "@/src/components/atoms/button/primary-button/primary-button";
//remove molecule file
import PermissionModalContent from "@/src/components/molecules/user-management/modal-content/permission-modal-content";
//import PermissionModalContent from "../../modal-content/permission-modal-content";

const RoleTable = ({ setActive }: any) => {
  const token = useTokens();

  const [modalType, setModalType] = useState<string>("add");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = (type: string, record: {}) => {
    console.log("record", record);
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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

  const columns: ColumnsType<DataType> = [
    { title: "Role Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "age", key: "age" },
    { title: "Status", dataIndex: "address", key: "address" },
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <Space>
          <PrimaryButton
            buttonType="default"
            iconPosition="right"
            shape="default"
            size="small"
            customStyles={{
              background: token.default.white,
              color: token.default.black,
            }}
            onClick={() => openModal("edit", record)}
          >
            Edit
          </PrimaryButton>

          <PrimaryButton
            buttonType="default"
            iconPosition="right"
            shape="default"
            size="small"
            customStyles={{
              background: token.default.white,
              color: token.default.black,
            }}
            onClick={() => openModal("delete", record)}
          >
            Delete
          </PrimaryButton>
        </Space>
      ),
    },
  ];

  const modalWidth = () => {
    switch (modalType) {
      case "edit":
        return "500px";
      case "delete":
        return "500px";
      default:
        return "700px";
    }
  };

  const data: DataType[] = [
    {
      key: 1,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      description:
        "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
    },
    {
      key: 2,
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      description:
        "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
    },
    {
      key: 3,
      name: "Not Expandable",
      age: 29,
      address: "Jiangsu No. 1 Lake Park",
      description: "This not expandable",
    },
    {
      key: 4,
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      description:
        "My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.",
    },
  ];

  const contentCss: CSSProperties = {
    width: "100%",
    padding: "20px",
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
        <div style={{ width: "100%" }}>
          <Tabs
            onChange={onChange}
            style={{ width: "100%" }}
            type="card"
            items={new Array(1).fill(null).map((_, i) => {
              const id = String(i + 1);
              return {
                label: `USER GROUPS`,
                key: id,
                children: (
                  <Table
                    pagination={{
                      pageSize: 2,
                      itemRender: (current, type, originalElement) => {
                        if (type === "page") {
                          return (
                            <span style={{ margin: "0 8px" }}>{current}</span>
                          );
                        }
                        return originalElement;
                      },
                      style: {
                        display: "flex",
                        textAlign: "center",
                      },
                    }}
                    style={{ marginTop: "15px", width: "100%" }}
                    columns={columns}
                    dataSource={data}
                  />
                ),
              };
            })}
          />
        </div>
        <div>
          <Button
            label="Create new roles"
            width="124px"
            position="absolute"
            top="10px"
            right="80px"
            bgColor={token.brand.primary}
            textColor={token.default.white}
            onClick={() => {
              console.log("clicked");
              setActive(true);
            }}
            disabled={false}
            style={{}}
          />
        </div>
      </section>

      <Modal
        title=""
        open={isModalOpen}
        width={modalWidth()}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <PermissionModalContent
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          modalType={modalType}
          setIsModalOpen={setIsModalOpen}
          setModalType={setModalType}
          isModalOpen={isModalOpen}
        />
      </Modal>
    </section>
  );
};

export default RoleTable;

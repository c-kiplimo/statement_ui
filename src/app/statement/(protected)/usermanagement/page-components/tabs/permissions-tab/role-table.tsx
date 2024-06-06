import React, { CSSProperties, useState } from "react";
import styles from "./role-table.module.css";
import { Modal, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useTokens } from "@/src/app/(context)/ColorContext";
import { Tabs } from "antd";
import Button from "@/src/components/atoms/button/button";
import PermissionModalContent from "../../shared/modal/permission-modal-content";

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
    description: string;
    status: string;
  }

  const columns: ColumnsType<DataType> = [
    { title: "Role Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <div className={styles.actions}>
          <button
            className={`${styles.actionBtn} bodyr`}
            onClick={() => openModal("edit", record)}
          >
            Edit
          </button>
          <button
            className={`${styles.actionBtn} bodyr`}
            onClick={() => openModal("delete", record)}
          >
            Delete
          </button>
        </div>
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
      name: "CHANNEL_SUPPORT",
      status: "Create-user _user view Dashboard Sync view customer",
      description: "Data details",
    },
    {
      key: 2,
      name: "RECONCILIATION",
      status: "Create-user _user view Dashboard Sync view customer",
      description: "ReconTeam",
    },
    {
      key: 3,
      name: "CUSTOMER CARE",
      status: "Create-user _user view Dashboard Sync view customer",
      description: "Customer Care",
    },
    {
      key: 4,
      name: "BUSINESS_ANALYST",
      status: "Create-user _user view Dashboard Sync view customer",
      description: "Analyst",
    },
    {
      key: 5,
      name: "TESTER",
      status: "Create-user _user view Dashboard Sync view customer",
      description: "Test Team",
    },
  ];

  return (
    <section className={styles.content}>
      <section className={styles.wrapper}>
        <div className={styles.tab}>
          <Tabs
            onChange={onChange}
            type="card"
            items={new Array(1).fill(null).map((_, i) => {
              const id = String(i + 1);
              return {
                label: `USER GROUPS`,
                key: id,
                children: (
                  <Table
                    pagination={{
                      pageSize: 5,
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
                    className={styles.table}
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

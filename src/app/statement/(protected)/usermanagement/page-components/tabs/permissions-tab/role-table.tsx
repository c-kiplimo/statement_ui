import React, { useEffect, useState } from "react";
import { Modal, Table, Tabs } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useTokens } from "@/src/app/(context)/ColorContext";
import styles from "./role-table.module.css";
import Button from "@/src/components/atoms/button/button";
import PermissionModalContent from "../../shared/modal/permission-modal-content";
import { GroupHandler } from "@/src/services/usermanagement/user.goups.service";
import useProfileId from "@/src/hooks/profileId";


const RoleTable = ({ setActive }: any) => {
  const token = useTokens();
  const [modalType, setModalType] = useState<string>("add");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<UserGroup[]>([]);
  const { fetchUserGroups } = GroupHandler();
  const profId = useProfileId();

  useEffect(() => {
    const fetchGroupData = async () => {
      if (profId !== null && profId !== undefined) {
        try {
          const response = await fetchUserGroups(profId);          
          setData(response);
          console.log("Fetched and formatted data: ", response);
        } catch (error) {
          console.error("Failed to fetch user groups:", error);
        }
      }
    };

    fetchGroupData();
  }, [profId, fetchUserGroups]);

  const columns: ColumnsType<UserGroup> = [
    { title: "Role Name", dataIndex: "groupName", key: "groupName" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Status", dataIndex: "permission", key: "permission" },
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: (record:UserGroup) => (
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

  const openModal = (type: string, record: UserGroup) => {
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

  const handleEdit = (record: UserGroup) => {
    console.log("Edit clicked for:", record);
  };

  const handleDelete = (record: UserGroup) => {
    console.log("Delete clicked for:", record);
  };

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

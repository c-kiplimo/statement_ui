import React, { Key, useState } from "react";
import { Modal, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { UserDetails } from "@/src/types/user.type";
import SearchBar from "../shared-features/search-bar/table-search-bar";

type ModalContentComponentType = React.ComponentType<{
  accountId: string;
  handleCreate: (data: UserDetails) => void;
  handleEdit: (data: UserDetails) => void;
  handleDelete: (data: UserDetails) => void;
  modalType: string;
  dynamicData: { data: any };
  setIsModalOpen: (isOpen: boolean) => void;
  setModalType: (type: string) => void;
  isModalOpen: boolean;
}>;

interface RegisterUserProps {
  columns: ColumnsType<UserDetails>;
  data: UserDetails[];
  modalTitle: string;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  modalWidth: string;
  handleOk: () => void;
  handleCancel: () => void;
  modalContentComponent?: ModalContentComponentType;
  accountId: string;
  handleCreate: (data: UserDetails) => void;
  handleEdit: (data: UserDetails) => void;
  handleDelete: (data: UserDetails) => void;
  modalType: string;
  setModalType: (type: string) => void;
  dynamicData: { data: any };
}

const RegisterUser: React.FC<RegisterUserProps> = ({
  columns,
  data,
  modalTitle,
  isModalOpen,
  setIsModalOpen,
  modalWidth,
  handleOk,
  handleCancel,
  modalContentComponent: ModalContent,
  accountId,
  handleCreate,
  handleEdit,
  handleDelete,
  setModalType,
  modalType,
  dynamicData,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  const onSelectChange = (selectedRowKeys: Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  return (
    <div>
      <SearchBar />
      <Table
        style={{ marginTop: "15px", width: "100%" }}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
          checkStrictly: true,
        }}
        pagination={{
          pageSize: 1,
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
        columns={columns}
        dataSource={data}
      />

      <Modal
        title={modalTitle}
        open={isModalOpen}
        width={modalWidth}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        {ModalContent && (
          <ModalContent
            accountId={accountId}
            handleCreate={handleCreate}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            modalType={modalType}
            dynamicData={dynamicData}
            setIsModalOpen={setIsModalOpen}
            setModalType={(type) => setModalType(type)}
            isModalOpen={isModalOpen}
          />
        )}
      </Modal>
    </div>
  );
};

export default RegisterUser;

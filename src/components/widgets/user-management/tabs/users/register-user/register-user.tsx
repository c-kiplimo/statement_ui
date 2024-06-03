import React, { Key, useState } from "react";
import { Modal, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { UserDetails } from "@/src/types/user.type";
import SearchBar from "../../../shared-features/search-bar/table-search-bar";

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
  columns, //Configuration for table columns.
  data, //The data to display in the table.
  modalTitle, //Title of the modal dialog.
  isModalOpen, //Boolean indicating whether the modal is open.
  setIsModalOpen, // Function to set the modal's open state.
  modalWidth, //Width of the modal dialog.
  handleOk, //Functions to handle modal actions.
  handleCancel, //Functions to handle modal actions.
  modalContentComponent: ModalContent, //Component to render inside the modal.
  accountId, //Functions and identifiers for managing user data.
  handleCreate, //Functions and identifiers for managing user data.
  handleEdit, //Functions and identifiers for managing user data.
  handleDelete, //Functions and identifiers for managing user data.
  setModalType, //Function to set the modal type.
  modalType, //Indicates the type of operation (create, edit, delete) to be performed.
  dynamicData, //Additional data to be passed to the modal content component.
}) => {
  //Keeps track of the keys of selected rows in the table
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);

  //Updates the selected rows when the selection changes.
  const onSelectChange = (selectedRowKeys: Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  return (
    <>
    {/* A search bar component for filtering the table data. */}
      <SearchBar />

    {/*Configured with row selection, pagination, columns, and data source.*/}
      <Table
        className=""
        style={{ boxSizing:"border-box",marginTop: "15px", width: "100%" }}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
          checkStrictly: true,
        }}
        pagination={{
          pageSize: 5,
          itemRender: (current, type, originalElement) => {
            if (type === "page") {
              return <span style={{ margin: "0 8px" }}>{current}</span>;
            }
            return originalElement;
          },
          style: {
            display: "flex",
            justifyContent:"flex-end",
            alignItems:"flex-end",
            padding:"0px 32px",
            gap:"16px",
            width:"100%",
            textAlign: "center",
          },
        }}
        columns={columns}
        dataSource={data}
      />
{/* Conditionally renders the ModalContent component if it's provided. */}
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
    </>
  );
};

export default RegisterUser;

import React, { Fragment, useState } from "react";
import { Table, Modal } from "antd";
import { ColumnsType } from "antd/es/table";
import { UserDetails } from "@/src/types/user.type";
import SearchBar from "../../shared-features/search-bar/table-search-bar";

type ModalContentComponentType = React.ComponentType<{
  accountId: string;
  handleCreate: (data: UserDetails) => void;
  handleEdit: (data: UserDetails) => void;
  handleDelete: (data: UserDetails) => void;
  modalType: string;
  dynamicData: UserDetails | null;
  setIsModalOpen: (isOpen: boolean) => void;
  setModalType: (type: string) => void;
  isModalOpen: boolean;
}>;

interface PendingAuthorization {
  columns: ColumnsType<UserDetails>;
  data: UserDetails[];
  modalTitle: string;
  setModalType: (type: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  modalWidth: string;
  handleOk: () => void;
  handleCancel: () => void;
  modalContentComponent?: ModalContentComponentType;
  accountId?: string;
  handleCreate?: (data: UserDetails) => void;
  handleEdit?: (data: UserDetails) => void;
  handleDelete: (data: UserDetails) => void;
  modalType: string;
  dynamicData?: UserDetails | null;
}

const PendingAuthorization = (props: PendingAuthorization) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[], selectedRows: UserDetails[]) => {
      console.log('Selected Row Keys:', newSelectedRowKeys);
      console.log('Selected Rows:', selectedRows);
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <Fragment>
      <SearchBar />
      <Table
        style={{ marginTop: "15px", width: "100%" }}
        rowSelection={rowSelection}
        columns={props.columns}
        pagination={{
          pageSize: 3,
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
        dataSource={props.data}
      />

      <Modal
        title={props.modalTitle}
        open={props.isModalOpen}
        width={props.modalWidth}
        onOk={props.handleOk}
        onCancel={props.handleCancel}
        footer={null}
        style={{
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 32px 32px 0px",
          gap: "24px",
          position: "absolute",
          left: "650px",
          top: "200px",
        }}
      >
        {props.modalContentComponent && (
          <props.modalContentComponent
            accountId={props.accountId!}
            handleCreate={props.handleCreate!}
            handleEdit={props.handleEdit!}
            handleDelete={props.handleDelete}
            modalType={props.modalType}
            dynamicData={props.dynamicData!}
            setIsModalOpen={props.setIsModalOpen}
            setModalType={props.setModalType}
            isModalOpen={props.isModalOpen}
          />
        )}
      </Modal>
    </Fragment>
  );
};

export default PendingAuthorization;

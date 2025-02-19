import React, { Key, useState } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { UserDetails } from "@/src/types/user.type";
import SearchBar from "../../../../../../../../components/widgets/user-management/shared-features/search-bar/table-search-bar";

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
  handleOk: () => void;
  handleCancel: () => void;
  modalContentComponent?: ModalContentComponentType;
  accountId: string;
  handleCreate?: (data: UserDetails) => void;
  handleEdit?: (data: UserDetails) => void;
  handleDelete: (data: UserDetails) => void;
  modalType: string;
  setModalType: (type: string) => void;
  dynamicData?: { data: any };
}

const RegisterUser: React.FC<RegisterUserProps> = ({ columns, data }) => {
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
    <>
      <SearchBar />
      <Table
        style={{ boxSizing: "border-box", marginTop: "15px", width: "100%" }}
        rowSelection={rowSelection}
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
            justifyContent: "flex-end",
            alignItems: "flex-end",
            gap: "16px",
            width: "100%",
            textAlign: "center",
          },
        }}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};

export default RegisterUser;

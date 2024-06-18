import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'antd';
import { EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { UserDetails } from '@/src/types/user.type';
import { UserHandler } from '@/src/services/usermanagement/user.service';
import type { ColumnsType } from 'antd/es/table';

interface User {
  key: string;
  firstName: string;
  lastName: string;
  age: number;
  mobile: string;
}

const UserTable = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [users, setUsers] = useState<UserDetails[]>([]);

  const { fetchAllUsers } = UserHandler();

  const columns: ColumnsType<UserDetails> = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Staff number',
      dataIndex: 'staff',
      key: 'staff',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: UserDetails) => (
        <span>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </span>
      ),
    },
  ];

  const fetchUsers = async () => {
    try {
      const response = await fetchAllUsers();
      // Assign unique keys to each user
      const usersWithKeys = response.map((user, index) => ({ ...user, key: index.toString() }));
      setUsers(usersWithKeys);
      console.log(usersWithKeys);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleView = (record: UserDetails) => {
    setSelectedUser(record);
    setIsViewModalVisible(true);
  };

  const handleEdit = (record: UserDetails) => {
    setSelectedUser(record);
    setIsEditModalVisible(true);
  };

  const handleDelete = (record: UserDetails) => {
    setSelectedUser(record);
    setIsDeleteModalVisible(true);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[], selectedRows: UserDetails[]) => {
      console.log('Selected Row Keys:', newSelectedRowKeys);
      console.log('Selected Rows:', selectedRows);
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <div style={{ width: "100%" }}>
      <Table
        style={{ boxSizing: "border-box", marginTop: "15px", width: "100%" }}
        dataSource={users}
        columns={columns}
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
            padding: "0px 32px",
            gap: "16px",
            width: "100%",
            textAlign: "center",
          },
        }}
      />

      {/* View Modal */}
      <Modal
        title="View User"
        visible={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={null}
      >
        {selectedUser && (
          <div>
            <p>First Name: {selectedUser.firstName}</p>
            <p>Last Name: {selectedUser.lastName}</p>
            <p>User status: {selectedUser.status}</p>
            <p>Mobile: {selectedUser.mobileNumber}</p>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit User"
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
      >
        {selectedUser && (
          <div>
            {/* Add your form or edit logic here */}
            <p>Edit user: {selectedUser.firstName} {selectedUser.lastName}</p>
          </div>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        title="Delete User"
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setIsDeleteModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              // Add your delete logic here
              setIsDeleteModalVisible(false);
            }}
          >
            Delete
          </Button>,
        ]}
      >
        {selectedUser && (
          <p>Are you sure you want to delete {selectedUser.firstName} {selectedUser.lastName}?</p>
        )}
      </Modal>
    </div>
  );
};

export default UserTable;

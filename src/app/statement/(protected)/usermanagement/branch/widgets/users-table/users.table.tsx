import React, { useState } from 'react';
import { Modal, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import styles from './users.table.module.css';
import SelectedOption from './(selectOption)/select.option';
import { fetchAvailableUsers } from '@/src/lib/actions/users.management.users';
import { useQuery } from 'react-query';



export interface UserInfoType {
  key: React.Key;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  role: string;
  staffNumber: string;
}


const BranchUsersTable = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState<React.Key | null>(null);
  
  let custId='1'
  const fetchStatusData = async () => {
    const result = await fetchAvailableUsers(custId);
    return result;
  };

  const { data: userDetails, error , isError, isLoading } = useQuery(
    ['accountSchedule', custId],
    fetchStatusData,
    {
      enabled: !!custId,
      refetchInterval: 5000, 
    }
  );

  const handleViewMoreOptions = (id: React.Key) => {
    setSelectedKey(id);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedKey(null);
  };

  const columns: TableColumnsType<UserInfoType> = [
    {
      title: 'First name',
      dataIndex: 'firstName',
      width: '15%',
    },
    {
      title: 'Last name',
      dataIndex: 'lastName',
      width: '15%',
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      width: '15%',
    },
    {
      title: 'Email Address',
      dataIndex: 'emailAddress',
      width: '15%',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      width: '15%',
    },
    {
      title: 'Staff number',
      dataIndex: 'staffNumber',
      width: '15%',
    },
    {
      title: '',
      dataIndex: 'edit',
      width: '15%',
      render: (_, record) => (
        <div className={styles.moreIcon}>
          <MoreOutlined
            className={styles.icon}
            onClick={() => handleViewMoreOptions(record.key)}
          />
        </div>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: UserInfoType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    }
  };

  return (
    <div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={userDetails} />
      <div>
        <Modal open={isModalVisible} onCancel={handleModalClose} footer={false} width={250}>
          {selectedKey !== null && <SelectedOption key={selectedKey} selectedId={selectedKey.toString()} />}
        </Modal>
      </div>
    </div>
  );
};

export default BranchUsersTable ;



import React from 'react';
import { Table, Button, Dropdown, Menu } from 'antd';
import { EllipsisOutlined, EyeOutlined, UserOutlined, EditOutlined } from '@ant-design/icons';

interface UserRecord {
  key: string;
  name: string;
  age: number;
  address: string;
}

const UserTable: React.FC<{ data: UserRecord[] }> = ({ data }) => {
  const handleMenuClick = (e: any) => {
    const { key, domEvent } = e;
    const record = JSON.parse((domEvent.currentTarget as HTMLElement).dataset.record!);
    console.log('Action clicked:', key, 'for record:', record);
    // Add your action handling logic here
  };

  const menu = (record: UserRecord) => (
    <div>
      <div style={{ padding: '8px', fontWeight: 'bold', borderBottom: '1px solid #f0f0f0' }}>Choose Action</div>
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="view" icon={<EyeOutlined />} data-record={JSON.stringify(record)}>
          View
        </Menu.Item>
        <Menu.Item key="deactivate" icon={<UserOutlined />} data-record={JSON.stringify(record)}>
          Deactivate
        </Menu.Item>
        <Menu.Item key="update" icon={<EditOutlined />} data-record={JSON.stringify(record)}>
          Update
        </Menu.Item>
      </Menu>
    </div>
  );

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: UserRecord) => (
        <Dropdown overlay={menu(record)} trigger={['click']}>
          <Button type="text" icon={<EllipsisOutlined rotate={90}/>} />
        </Dropdown>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default UserTable;

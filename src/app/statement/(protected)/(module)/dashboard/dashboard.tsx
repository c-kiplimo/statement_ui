'use client';
import DashboardLayout from '@/src/components/molecules/dashboard/layout/dashboardLayout';
import React, { useEffect, useState } from 'react';
import { useTokens } from '@/src/app/(context)/ColorContext';
import { ColumnsType } from 'antd/es/table';
import { Space } from 'antd';
import qs from 'qs';
import HomeMenu from '@/src/components/molecules/dashboard/menu_item/home_menu';
import Account from '@/src/components/molecules/dashboard/acounts/account';
import Card from '@/src/components/molecules/dashboard/cards/card';
import { DeleteOutlined } from '@ant-design/icons';
import Button from '@/src/components/atoms/button/button';
import Activities from '@/src/components/molecules/dashboard/activities/activities';
const getRandomuserParams = (params: any) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const Dashboard = () => {
  const token = useTokens();
  const [isChecked, setIsChecked] = useState(false);

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleDelete = (record: any) => {
    console.log('Delete clicked for:', record);
  };
  interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    description: string;
    date: string;
    join: string;
  }

  const columns: ColumnsType<DataType> = [
    { title: 'Group', dataIndex: 'name', key: 'name' },
    { title: 'Description', dataIndex: 'age', key: 'age' },
    { title: 'Status', dataIndex: 'address', key: 'address' },
    { title: 'Date Created', dataIndex: 'date', key: 'date' },
    { title: 'Joined On', dataIndex: 'join', key: 'join' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, record) => (
        <Space>
          <Button
            icon={<DeleteOutlined />}
            label="Delete"
            bgColor={token.default.white}
            borderColor={token.border.primary}
            textColor={token.default.black}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  const datae: DataType[] = [
    {
      key: 1,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      description:
        'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
      date: '12/03/2023',
      join: '12/03/2023',
    },
    {
      key: 2,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      description:
        'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
      date: '12/03/2023',
      join: '12/03/2023',
    },
    {
      key: 3,
      name: 'Not Expandable',
      age: 29,
      address: 'Jiangsu No. 1 Lake Park',
      description: 'This not expandable',
      date: '12/03/2023',
      join: '12/03/2023',
    },
    {
      key: 4,
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      description:
        'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
      date: '12/03/2023',
      join: '12/03/2023',
    },
  ];
  const fetchData = () => {
    setLoading(true);
    fetch(
      `https://randomuser.me/api?${qs.stringify(
        getRandomuserParams(tableParams),
      )}`,
    )
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
    }
  };

  return (
    <DashboardLayout bgColor={token.background.primary}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '16px',
          alignSelf: 'stretch',
        }}
        className="frame-1058"
      >
        <div
          style={{
            display: 'inline-flex',
            padding: '17px 24px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '24px',
            width: '100%',
          }}
          className="menu-header"
        >
          <HomeMenu />
          <div
            className="frame-1054"
            style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              alignSelf: 'stretch',
            }}
          >
            <Account />
            <Card />
          </div>
          <Activities />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

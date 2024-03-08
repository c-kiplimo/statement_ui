import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';

type DataType = {
  key: React.Key;
  accountName: string;
  accountNumber: string;
  currentBalance: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Account Name',
    dataIndex: 'accountName',
    width: '33%',
    align: 'center',
  },
  {
    title: 'Account Number',
    dataIndex: 'accountNumber',
    width: '33%',
    align: 'center',
  },
  {
    title: 'Current Balance',
    dataIndex: 'currentBalance',
    width: '34%',
    align: 'center',
  },
];

const AcctTable = ({ data }: { data: DataType[] }) => (
  <div style={{}}>
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      size="middle"
      style={{ borderCollapse: 'collapse', borderRadius: '16px', border: '1px solid #E6E6E6', overflow:'hidden'}}
    />
  </div>
);

export default AcctTable;

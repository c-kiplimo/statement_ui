"use client";
import React, { Fragment} from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import UserTable from "../(protected)/user-management/test";

const Dev = () => {
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];
  
  return (
    <Fragment>
      <div style={{ padding: '20px' }}>
    <UserTable data={data} />
  </div>
    </Fragment>
  );
};

export default withContainer(Dev);

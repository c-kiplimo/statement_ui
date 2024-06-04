import React from 'react';
import { Pagination } from 'antd';

const PaginationWidget: React.FC = () => <Pagination defaultCurrent={6} total={500} />;

export default PaginationWidget;
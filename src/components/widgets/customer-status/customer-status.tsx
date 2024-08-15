import React from 'react';
import styles from './customer-status.module.css';
import { Tag, Switch } from 'antd';

interface CustomerStatusProps {
  customerName: string;
  industry: string;
  customerType: string;
  status: boolean;
  onStatusChange: (checked: boolean) => void;
}

const CustomerStatus: React.FC<CustomerStatusProps> = ({
  customerName,
  industry,
  customerType,
  status,
  onStatusChange,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <span className={styles.label}>Customer Name</span>
        <span className={styles.value}>{customerName}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>Industry</span>
        <span className={styles.value}>{industry}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>Customer Type</span>
        <span className={styles.value}>{customerType}</span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>Status</span>
        <Tag color={status ? 'green' : 'red'}>
          {status ? 'Active' : 'Inactive'}
        </Tag>
        <Switch checked={status} onChange={onStatusChange} />
      </div>
    </div>
  );
};

export default CustomerStatus;

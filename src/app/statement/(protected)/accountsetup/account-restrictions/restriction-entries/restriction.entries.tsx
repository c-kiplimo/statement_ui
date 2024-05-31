import React, { useState, ReactNode } from 'react';
import styles from './restriction.entries.module.css';
import { Radio } from 'antd';


type EntriesProps = {
  restrictionName: string;
  icon: ReactNode;
  description: string;
  amount?: string;
  currency?: string;
};

const RestrictionEntries = ({
  restrictionName,
  icon,
  description,
  amount,
  currency,
}: EntriesProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const onChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentDiv}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.nameDescription}>
          <div className={`${styles.name} bodyr`}>{restrictionName}</div>
          <div className={styles.description}>
            <span className={`${styles.descriptionText} captionr`}>{description}</span>
            {amount && <span className={styles.amount}>{amount}</span>}
            {currency && <span className={styles.currency}>{currency}</span>}
          </div>
        </div>
      </div>
      <Radio.Group onChange={onChange} value={selectedValue}>
        <Radio value={restrictionName} />
      </Radio.Group>
    </div>
  );
};

export default RestrictionEntries;

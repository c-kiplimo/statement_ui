import React from 'react';
import { AutoComplete } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import styles from './customSearch.module.css';

interface SearchInputProps {
  onSearch: (value: string) => void;
  dataSource: string[];
  isValid?: boolean | null;
  placeholder?: string;
  style?: React.CSSProperties;
  options?: string[];
}

const CustomSearch: React.FC<SearchInputProps> = ({
  onSearch,
  dataSource,
  isValid,
  placeholder = 'Enter Details',
  style,
  options,
}) => {
  return (
    <div>
      <div className={styles.customSeach}>
        <AutoComplete
          style={style}
          placeholder={placeholder}
          bordered={false}
        />
        <span className={styles.icon}>
          <CheckCircleOutlined style={{ color: isValid ? 'green' : '' }} />{' '}
          <CloseCircleOutlined style={{ color: !isValid ? '' : 'red' }} />
        </span>
      </div>
    </div>
  );
};

export default CustomSearch;

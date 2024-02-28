import React from 'react';
import { AutoComplete, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface SearchInputProps {
  onSearch: (value: string) => void;
  dataSource: string[];
  placeholder?: string;
  borderColor?: string;
  style?: React.CSSProperties;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  dataSource,
  placeholder = 'Search...',
  borderColor = 'grey',
  style,
}) => {
  return (
    <AutoComplete
      style={{ width: '100%', ...style }}
      onSearch={onSearch}
      options={dataSource.map((item) => ({
        value: item,
      }))}
      placeholder={placeholder}
      dataSource={dataSource}
      filterOption={true}
      onSelect={() => {
        console.log('selected');
      }}
    />
  );
};

export default SearchInput;

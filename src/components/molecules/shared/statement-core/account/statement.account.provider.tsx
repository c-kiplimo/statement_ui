import { useCoreProps } from '@/src/app/(context)/ColorContext';
import { CoreProps } from '@/src/types/context.types';
import { Select } from 'antd';
import React from 'react';
import '../account_statement_search.css';

type ProviderProps = {
  onAccountChange: (el: string) => void;
};

const AccountsProvider = (props: ProviderProps) => {
  //call a hooks to fetch account details

  const coreProps = useCoreProps();
  const options = [
    { label: 'KES | 1026272611', value: '1026272611' },
    { label: 'KES | 1118272726', value: '1118272726' },
    { label: 'USD | 1318272726', value: '1318272726' },
  ];

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    props.onAccountChange(value);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <div
      className="provider_account_search"
      style={{
        backgroundColor: 'var(--functional-light-colors-success-100)',
      }}
    >
      <Select
        showSearch
        placeholder={options[0].value}
        style={{
          width: 200,
          display: 'inline-block',
          color: coreProps.colorToken.text.description_01,
        }}
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        options={options}
        filterOption={filterOption}
      />
    </div>
  );
};

export default AccountsProvider;

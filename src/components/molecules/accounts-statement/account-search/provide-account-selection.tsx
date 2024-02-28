import { useFont, useTokens } from '@/src/app/(context)/ColorContext';
import { AppColorToken, FontType } from '@/src/types/context.types';
import { Select } from 'antd';
import { on } from 'events';
import { useState, useEffect, useRef } from 'react';

interface CoreProps {
  onAccountChange: (value: string) => void;
  colorToken: AppColorToken;
  font: FontType;
  // other props...
}
export const ProviderAccountSection = ({ onAccountChange }: CoreProps) => {
  const token = useTokens();
  const font = useFont();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative provider-account-select-input"
      style={{
        display: 'flex',
        height: '40px',
        paddingTop: '40px',
        paddingBottom: '40px',
        alignItems: 'center',
        gap: '32px',
      }}
    >
      <div
        className="provider-account-details"
        style={{
          ...font.typography.body?.bold,
        }}
      >
        Provide Account Details
      </div>

      <ProviderAccountSelectInput
        font={font}
        colorToken={token}
        onAccountChange={onAccountChange}
      />
    </div>
  );
};

const ProviderAccountSelectInput = (props: CoreProps) => {
  const options = [
    { label: 'KES | 1238927262', value: '1238927262' },
    { label: 'KES | 1118272726', value: '1118272726' },
    { label: 'USD | 1318272726', value: '1518272725' },
  ];
  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    props.onAccountChange(value);
  };
  return (
    <div className="provider_account_search">
      <Select
        showSearch
        placeholder={options[0].value}
        style={{
          width: 200,
          display: 'inline-block',
          color: props.colorToken.text.description_01,
        }}
        optionFilterProp="children"
        onChange={onChange}
        options={options}
      />
    </div>
  );
};

export default ProviderAccountSection;

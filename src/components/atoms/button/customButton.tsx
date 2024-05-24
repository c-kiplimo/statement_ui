import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface CustomButtonProps {
  text: string;
  icon?: React.ReactElement;
  bgColor?: string;
  textColor?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "reset" | "submit";
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  icon,
  bgColor = 'blue',
  textColor = 'white',
  onClick,
  disabled = false,
  className = '',
  style,
  type = 'button',
  loading = false,
}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: textColor }} spin />;

  return (
    <button
      className={`w-full py-2 rounded cursor-pointer ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'} ${className}`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        ...style,
      }}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? (
        <Spin indicator={antIcon} />
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {text}
        </>
      )}
    </button>
  );
};

export default CustomButton;

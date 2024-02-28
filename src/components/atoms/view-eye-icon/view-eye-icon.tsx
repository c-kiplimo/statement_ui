import { EyeOutlined } from '@ant-design/icons';
import React from 'react';

interface ViewEyeIconProps {
  onClick?: (Id?: string) => void;
  Id?: string;
  style?: React.CSSProperties;
}

const ViewEyeIcon = ({ onClick, Id, style }: ViewEyeIconProps) => {
  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.stopPropagation();
    if (onClick) {
      onClick(Id);
    } else {
      console.log('Performing other actions...');
    }
  };

  return (
    <div style={{ ...defaultStyle, ...style }} onClick={handleClick}>
      <EyeOutlined />
    </div>
  );
};

// Default styles for the icon
const defaultStyle: React.CSSProperties = {
  cursor: 'pointer',
};

export default ViewEyeIcon;

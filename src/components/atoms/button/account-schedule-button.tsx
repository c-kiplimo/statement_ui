import React from 'react';
import { useTokens } from '@/src/app/(context)/ColorContext';

type ScheduleActionButtonProps = {
  handleClick: () => void;
  icon?: React.ReactElement;
  style?: React.CSSProperties;
};

const ScheduleActionButton = ({
  handleClick,
  icon,
  style,
}: ScheduleActionButtonProps) => {
  const token = useTokens();

  return (
    <button
      style={{
        width: '28px',
        height: '28px',
        color: token.text.description_02,
        borderRadius: '4px',
        border: `0.5px solid ${token.text.description_01}`,
        display: 'flex',
        padding: '8px',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        ...style,
      }}
      onClick={handleClick}
    >
      {icon}
    </button>
  );
};

export default ScheduleActionButton;

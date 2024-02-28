import { useTokens } from '@/src/app/(context)/ColorContext';
import ScheduleActionButton from '@/src/components/atoms/button/account-schedule-button';
import React from 'react';
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
} from '@/src/components/atoms/svg/account-schedule-svgs';

function AccountScheduleButtons() {
  const tokenColor = useTokens();
  const handleAdd = () => {
    console.log('Add clicked');
  };

  const handleDelete = () => {
    console.log('Delete clicked');
  };

  const handleEdit = () => {
    console.log('Edit clicked');
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        color: tokenColor.text.description_01,
        width: 'auto 108px',
        height: 'auto 28px',
      }}
    >
      <ScheduleActionButton handleClick={handleAdd} icon={<AddIcon />} />

      <ScheduleActionButton icon={<DeleteIcon />} handleClick={handleDelete} />

      <ScheduleActionButton icon={<EditIcon />} handleClick={handleEdit} />
    </div>
  );
}

export default AccountScheduleButtons;

import React, { useState, ReactNode } from 'react';
import styles from './select.option.module.css';
import { DeleteOutlined, EditOutlined, EyeOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import DeleteUser from './(deleteUser)/delete.user';
import DeactivateUser from './(deactivateUser)/deactivate.user';

const selectionOption = [
  {
    image: <EyeOutlined />,
    title: 'Preview',
  },
  {
    image: <UserDeleteOutlined />,
    title: 'Deactivation',
  },
  {
    image: <EditOutlined />,
    title: 'Edit',
  },
  {
    image: <DeleteOutlined />,
    title: 'Delete',
  },
];

type SelectOptionsProps = {
  selectedId: string;
};

const SelectedOption = ({ selectedId }: SelectOptionsProps) => {
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [isRemoveUserModalVisible, setIsRemoveUserModalVisible] = useState(false);
  const [isDeactivateUserModalVisible, setIsDeactivateUserModalVisible] = useState(false);

  const handleOptionClick = (title: string) => {
    setActiveOption(title);
    if (title === 'Delete') {
      setIsRemoveUserModalVisible(true);
    } else if (title === 'Deactivation') {
      setIsDeactivateUserModalVisible(true);
    }
  };

  const handleRemoveUserModalClose = () => {
    setIsRemoveUserModalVisible(false);
  };

  const handleDeactivateUserModalClose = () => {
    setIsDeactivateUserModalVisible(false);
  };

  return (
    <div className={styles.container}>
      <div>
        <h2 className={`${styles.title} bodyb`}>Choose Action</h2>
      </div>
      <SelectedOption.Select
        selectionOptions={selectionOption}
        activeOption={activeOption}
        onOptionClick={handleOptionClick}
      />
      <div>
        <Modal
          open={isRemoveUserModalVisible}
          onCancel={handleRemoveUserModalClose}
          footer={false}
        >
          <DeleteUser selectedId={selectedId} onClose={handleRemoveUserModalClose}/>
        </Modal>
        <Modal
          open={isDeactivateUserModalVisible}
          onCancel={handleDeactivateUserModalClose}
          footer={false}
        >
          <DeactivateUser selectedId={selectedId} onClose={handleDeactivateUserModalClose}/>
        </Modal>
      </div>
    </div>
  );
};

export default SelectedOption;

type SelectArray = {
  image: ReactNode;
  title: string;
};

type SelectProps = {
  selectionOptions: SelectArray[];
  activeOption: string | null;
  onOptionClick: (title: string) => void;
};

SelectedOption.Select = ({ selectionOptions, activeOption, onOptionClick }: SelectProps) => (
  <div>
    {selectionOptions.map((option) => (
      <button
        key={option.title}
        className={`${activeOption === option.title ? styles.active : styles.button}`}
        onClick={() => onOptionClick(option.title)}
      >
        <span className={styles.image}>{option.image}</span>
        <span className={`bodyr`}>
          <h2>{option.title}</h2>
        </span>
      </button>
    ))}
  </div>
);

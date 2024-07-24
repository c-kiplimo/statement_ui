import React, { useState, ReactNode } from "react";
import styles from "./selectedOption.module.css";
import {
  EditOutlined,
  EyeOutlined,
  TeamOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import DeactivateUser from "../(deactivateUser)/deactivate.user";

const selectionOption = [
  {
    image: <EyeOutlined />,
    title: "View",
  },
  {
    image: <UserDeleteOutlined />,
    title: "Deactivate",
  },
  {
    image: <EditOutlined />,
    title: "Update",
  },
];

type SelectOptionsProps = {
    selectedUser: RegisteredUser;
};

const SelectedOption = ({ selectedUser }: SelectOptionsProps) => {
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [isRemoveUserModalVisible, setIsRemoveUserModalVisible] =
    useState(false);
  const [isDeactivateUserModalVisible, setIsDeactivateUserModalVisible] =
    useState(false);

  const handleOptionClick = (title: string) => {
    setActiveOption(title);
    if (title === "Delete") {
      setIsRemoveUserModalVisible(true);
    } else if (title === "Deactivate") {
        console.log("selected user>>",selectedUser)
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
          open={isDeactivateUserModalVisible}
          onCancel={handleDeactivateUserModalClose}
          footer={false}
        >
          <DeactivateUser
            selectedId={selectedUser.userId}
            onCancel={handleDeactivateUserModalClose}
            firstName={selectedUser.userName.split(" ")[0]} 
            lastName={selectedUser.userName.split(" ").slice(1).join(" ")}
            email={selectedUser.email}
            mobileNumber={selectedUser.phone}
            userGroups={[]}
            handleOk={(e: any) => {
              // Implement the deactivation logic here
              console.log("Deactivating user:", selectedUser);
              handleDeactivateUserModalClose();
            }}
          />
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

SelectedOption.Select = ({
  selectionOptions,
  activeOption,
  onOptionClick,
}: SelectProps) => (
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

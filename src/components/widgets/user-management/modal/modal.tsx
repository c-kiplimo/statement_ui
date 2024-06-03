import React from "react";
import { Button, Modal } from "antd";
//import PrimaryButton from "@/src/components/atoms/button/primary-button/primary-button";
import { UserDetails } from "@/src/types/user.type";

interface DeleteUserModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  user: UserDetails | null;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  visible,
  onConfirm,
  onCancel,
  user,
}) => {
  return (
    <Modal
      title="Remove User"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          No
        </Button>,
        <Button key="confirm" onClick={onConfirm}>
          Yes
        </Button>,
      ]}
    >
      {user ? (
        <p>
          Are you sure you want to delete user {user.firstName} {user.lastName}?
        </p>
      ) : (
        <p>Are you sure you want to delete this user?</p>
      )}
    </Modal>
  );
};

export default DeleteUserModal;

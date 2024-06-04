import React, { useState } from "react";
import { Modal } from "antd";
import styles from "./modal.module.css";
import classNames from "classnames";

type ModalProps = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  titleDesc: string;
  confirmText: string;
  cancelText: string;
  confirmLoading: boolean | undefined;
  confirmButtonStyles?: React.CSSProperties;
  cancelButtonStyles?: React.CSSProperties;
};

const ReusableModal = ({
  visible,
  onConfirm,
  onCancel,
  title,
  titleDesc,
  confirmText,
  cancelText,
  confirmLoading,
  confirmButtonStyles,
  cancelButtonStyles,
}: ModalProps) => {
  const [hoveredButton, setHoveredButton] = useState<
    "confirm" | "cancel" | null
  >(null);

  const handleMouseEnter = (buttonType: "confirm" | "cancel") => {
    setHoveredButton(buttonType);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  return (
    <Modal
      visible={visible}
      confirmLoading={confirmLoading}
      footer={null}
      className={styles.modal}
    >
      <div className={styles.container}>
        <div className={styles.description}>
          <div className={styles.textField}>
            <span className={`${styles.title} h6m`}>{title}</span>
            <span className={`${styles.titleDesc} bodyr`}>{titleDesc}</span>
          </div>
        </div>
        <div className={styles.button}>
          <button
            className={classNames(styles.btn, {
              [styles.activeBtn]: hoveredButton === "cancel",
            })}
            onMouseEnter={() => handleMouseEnter("cancel")}
            onMouseLeave={handleMouseLeave}
            onClick={onCancel}
            style={hoveredButton === "cancel" ? cancelButtonStyles : undefined}
          >
            {cancelText}
          </button>
          <button
            className={classNames(styles.btn, {
              [styles.activeBtn]: hoveredButton === "confirm",
            })}
            onMouseEnter={() => handleMouseEnter("confirm")}
            onMouseLeave={handleMouseLeave}
            onClick={onConfirm}
            style={
              hoveredButton === "confirm" ? confirmButtonStyles : undefined
            }
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ReusableModal;

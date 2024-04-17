import { CloseOutlined } from "@ant-design/icons";
import styles from "./modal.module.css";

const Modal = ({ isOpen, onDismiss, children }: any) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={styles.modalContent}
      onClick={(event) => event.stopPropagation()}
    >
      <CloseOutlined size={16} className={styles.icon} onClick={onDismiss} />
      {children}
    </div>
  );
};

export default Modal;

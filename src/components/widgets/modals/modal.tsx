import { CloseOutlined } from "@ant-design/icons";
import { useTokens } from "@/src/app/(context)/ColorContext";
import styles from "./modal.module.css";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";

const Modal = ({ isOpen, title, description, onDismiss, children }: any) => {
  const token = useTokens();
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalWrapper} onClick={onDismiss}>
      <div
        className={styles.modalContent}
        onClick={(event) => event.stopPropagation()}
      >
        <CloseOutlined size={16} className={styles.icon} onClick={onDismiss} />
        <div className={styles.header}>
          <VerticalInfoDescription
            title={title}
            description={description}
            titleStyle={{
              color: token.text.secondary,
              fontSize: "20px",
              fontWeight: "700",
            }}
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;

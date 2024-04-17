import { CloseOutlined } from "@ant-design/icons";
import { useTokens } from "@/src/app/(context)/ColorContext";
import styles from "./modal.module.css";

const Modal = ({ isOpen, title, description, onDismiss, children }: any) => {
  const token = useTokens();
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal} onClick={onDismiss}>
      <div
        style={{ bottom: "10%" }}
        className={styles.modalWrapper}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.modalContent}>
          <CloseOutlined
            className="absolute right-4 top-8 text-md text-red-600 cursor-pointer"
            onClick={onDismiss}
          />
          <div className="w-full text-left h-32 text-green-800">
            <p
              style={{ color: token.text.secondary }}
              className="flex flex-col text-left h6m"
            >
              {title}
              <span className="captionr">{description}</span>
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

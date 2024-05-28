import { CloseOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import styles from "./get.intouch.modal.module.css";

type GetIntouchModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
};

const Modal = ({ isModalOpen, onClose }: GetIntouchModalProps) => {
  const [inputQuestion, setInputQuestion] = useState("");

  if (!isModalOpen) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputQuestion(e.target.value);
  };

  return (
    <>
      <div className={styles.backdrop} onClick={onClose}></div>
      <div className={styles.container}>
        <div className={styles.header}>
          <p>KCB Simba Portal Support</p>
          <CloseOutlined onClick={onClose} />
        </div>
        <div className={styles.welcomeText}>
          <p className={`${styles.text} bodyr`}>
            Hello! Welcome to KCB Simba Portal support. <br /> How can we help
            you?
          </p>
        </div>
        <form>
          <div>
            <textarea
              placeholder="Type your question here..."
              className={styles.textarea}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className={styles.buttonContainer}>
            <button className={`${styles.button} bodyr`} type="button">
              Get In Touch
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Modal;

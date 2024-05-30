import { CloseOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import styles from "./get.intouch.modal.module.css";
import { UserInformationContext } from "../../context/user.info.context";
import { raiseQuerries } from "@/src/services/account/account.help";
import { notification } from "antd";

type GetIntouchModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
};

const Modal = ({ isModalOpen, onClose }: GetIntouchModalProps) => {
  const [inputQuestion, setInputQuestion] = useState("");
  const {userInfodetails} = useContext(UserInformationContext);  
  const userEmail = userInfodetails.email;
  const userphoneNumber = userInfodetails.phone;


  if (!isModalOpen) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputQuestion(e.target.value);
  };
  const handleFormSubmit = async (e:any)=>{
    e.preventDefault()
    const submittedQuestionData ={
      email:userEmail,
      phoneNumber:userphoneNumber,
      message:inputQuestion
    }
    try {
      await raiseQuerries(submittedQuestionData);
      notification.success({
        message:'Your Querry has been received. We will get back to you.'
      })
      onClose();
    } catch (error) {
      notification.error({
        message:'Failed to raise querry'
      })
      throw error

    }


  }

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
        <form onSubmit={handleFormSubmit}>
          <div>
            <textarea
              placeholder="Type your question here..."
              className={styles.textarea}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className={styles.buttonContainer}>
            <button type='submit' className={`${styles.button} bodyr`}>
              Get In Touch
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Modal;

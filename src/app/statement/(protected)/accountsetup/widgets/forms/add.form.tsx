import React, { ReactNode, useState } from "react";
import styles from "./add.form.module.css";
import { CloseOutlined } from "@ant-design/icons";

type AddProps = {
  headerText: string;
  onClick?: () => void;
  closeIcon:ReactNode;
  inputTitle1?: string;
  placeholder1?: string;
  inputTitle2?: string;
  placeholder2?: string;
  inputTitle3?: string;
  placeholder3?: string;
  buttonText?: string;
  roleOptions?: string[];
  statusOptions?: string[];
  inputTitle4?: string;
  placeholder4?: string;
};

const AddItem: React.FC<AddProps> = (props) => {
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");
  const [status, setStatus] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserRole(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.counceIcon}
        style={{ color: "gray" }}
        onClick={props.onClick}
      >
        {props.closeIcon}
      </div>
      <div className={styles.body}>
        <div className={styles.header}>
          <div className={styles.headerText}>{props.headerText}</div>
        </div>

        <label className={styles.inputdiv}><div className={styles.requiredUsername}>{props.inputTitle1}<span className={styles.required}>*</span></div></label>
        <input
          className={styles.input}
          type="text"
          required
          id="username"
          name="username"
          placeholder={props.placeholder1}
          value={username}
          onChange={handleInputChange}
        />

        <label className={styles.inputdiv}>{props.inputTitle4}</label>
        <input
          className={styles.input}
          type="text"
          id="description"
          name="description"
          placeholder={props.placeholder4}
        />

        {props.inputTitle2 && (
          <>
            <label className={styles.inputdiv}>{props.inputTitle2}</label>
            <select
              className={styles.input}
              value={userRole}
              onChange={handleRoleChange}
            >
              <option value="">{props.placeholder2}</option>
              {(props.roleOptions ?? []).map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </>
        )}

        {props.inputTitle3 && (
          <>
            <label className={styles.inputdiv}>{props.inputTitle3}</label>
            <select
              className={styles.input}
              value={status}
              onChange={handleStatusChange}
            >
              <option value="">{props.placeholder3}</option>
              {(props.statusOptions ?? []).map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
      <button className={`${styles.button} bodyr`}>{props.buttonText}</button>
    </div>
  );
};

AddItem.defaultProps = {
  inputTitle3: "",
  placeholder3: "",
};

export default AddItem;

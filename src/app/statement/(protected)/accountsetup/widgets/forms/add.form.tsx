import React, { ReactNode, useState } from "react";
import styles from "./add.form.module.css";

type AddProps = {
  headerText: string;
  onClick?: () => void;
  closeIcon: ReactNode;
  inputTitle1?: string;
  placeholder1?: string;
  inputTitle2?: string;
  placeholder2?: string;
  inputTitle3?: string;
  placeholder3?: string;
  inputTitle4?: string;
  placeholder4?: string;
  buttonText?: string;
  roleOptions?: string[];
  statusOptions?: string[];
};

const AddItem= (props:AddProps) => {
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "description") setDescription(value);
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
        <form>
          <label className={styles.inputdiv}>
            <div className={styles.requiredUsername}>
              {props.inputTitle1}
              <span className={styles.required}>*</span>
            </div>
          </label>
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

          {props.inputTitle4 && (
            <>
              <label className={styles.inputdiv}>{props.inputTitle4}</label>
              <select
                className={styles.input}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              >
                <option value="">{props.placeholder4}</option>
                {(props.statusOptions ?? []).map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </>
          )}
        </form>
        <button className={styles.button}>{props.buttonText}</button>
      </div>
    </div>
  );
};

export default AddItem;

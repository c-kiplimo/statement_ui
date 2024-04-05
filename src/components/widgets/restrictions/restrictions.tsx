"use client";
import React, { ReactNode, useState } from "react";
import styles from "./restrictions.module.css";
import { CloseOutlined } from "@ant-design/icons";

type restrictionProps = {
  title: string;
  name: string;
  description: string;
  placeholder1: string;
  placeholder2: string;
  submitbutton: string;
  onClick?: () => void;
};

const Restrictions = (props: restrictionProps) => {
  const [nameValue, setNameValue] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (nameValue.trim() === "") {
      setIsNameValid(false);
      return;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.cancel} onClick={props.onClick}>
        <CloseOutlined />
      </div>
      <form className={styles.bodycontainer} onSubmit={handleSubmit}>
        <div className={styles.title}>
          <div className={styles.text}>{props.title}</div>
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputName}>
            <div className={styles.inputNametext}>{props.name}</div>
            <span className={styles.missingField} style={{ color: "red" }}>
              *
            </span>
          </div>
          <div className={styles.boxStyle}>
            <input
              type="text"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              className={`${styles.input} ${isNameValid ? "" : styles.missing}`}
              placeholder={props.placeholder1}
            />
          </div>
          <div className={styles.inpuName}>
            <div className={styles.inpuNametext}>{props.description}</div>
          </div>
          <div className={styles.boxStyle}>
            <input
              type="text"
              className={styles.input}
              placeholder={props.placeholder2}
            />
          </div>
        </div>
        <button type="submit" className={styles.button}>
          {props.submitbutton}
        </button>
      </form>
    </div>
  );
};

export default Restrictions;

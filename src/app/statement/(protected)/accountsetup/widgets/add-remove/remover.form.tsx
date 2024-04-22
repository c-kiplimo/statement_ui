import React, { ReactNode, useState } from "react";
import styles from "./remover.form.module.css";

type RemoveProps = {
  closeIcon: ReactNode;
  header: string;
  description: string;
  optn1: string;
  optn2: string;
  onClose: () => void;
  onSubmit?: () => void;
  loading?: boolean;
};

const Removeruser: React.FC<RemoveProps> = (props) => {
  const [yesClicked, setYesClicked] = useState(false);
  const [noClicked, setNoClicked] = useState(false);

  const handleYesClick = () => {
    setYesClicked(true);
    setNoClicked(false);
    if (props.onSubmit) {
      props.onSubmit();
    }
    props.onClose();
  };

  const handleNoClick = () => {
    setNoClicked(true);
    setYesClicked(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.counceIcon} style={{ color: "gray" }}>
        <div onClick={props.onClose}>{props.closeIcon}</div>
      </div>
      <div className={styles.title}>
        <div className={styles.titleText}>{props.header}</div>
      </div>
      <div className={styles.confirm}>
        <div className={styles.confirmText}>{props.description}</div>
      </div>
      <section className={styles.options}>
        <button
          className={
            yesClicked ? `${styles.yes} ${styles.clicked}` : styles.yes
          }
          onClick={handleYesClick}
          disabled={props.loading}
        >
          {props.loading ? "Loading..." : props.optn1}
        </button>
        <button
          className={
            noClicked ? `${styles.Nodiv} ${styles.clicked}` : styles.Nodiv
          }
          onClick={handleNoClick}
          disabled={props.loading}
        >
          {props.optn2}
        </button>
      </section>
    </div>
  );
};

export default Removeruser;

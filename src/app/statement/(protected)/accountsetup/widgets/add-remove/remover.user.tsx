import React, { useState } from 'react';
import styles from "./remover.user.module.css";
import { CloseOutlined } from '@ant-design/icons';

type RemoveProps = {
    header: String;
    description: String;
    optn1: String;
    optn2: String;
};

const Removeruser: React.FC<RemoveProps> = (props) => {
    const [yesClicked, setYesClicked] = useState(false);

    const handleYesClick = () => {
        setYesClicked(true);
        setNoClicked(false); 
    };

    const [noClicked, setNoClicked] = useState(false);

    const handleNoClick = () => {
        setNoClicked(true);
        setYesClicked(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.counceIcon} style={{color:"gray"}}><CloseOutlined /></div>
            <div className={styles.title}><div className={styles.titleText}>{props.header}</div></div>
            <div className={styles.confirm}><div className={styles.confirmText}>{props.description}</div></div>

            <section className={styles.options}>
                <button className={yesClicked ? `${styles.yes} ${styles.clicked}` : styles.yes} onClick={handleYesClick}>{props.optn1}</button>
                <button className={noClicked ? `${styles.Nodiv} ${styles.clicked}` : styles.Nodiv} onClick={handleNoClick}>{props.optn2}</button>
            </section>
        </div>
    );
};

export default Removeruser;

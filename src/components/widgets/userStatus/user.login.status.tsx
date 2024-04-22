import React, { ReactNode, useState } from "react";
import styles from "./user.login.status.module.css";
import { CaretDownOutlined } from "@ant-design/icons";
import Button from "../../atoms/dropDownButton/button";


type StatusProps = {
  userName: string;
  mail: string;
  town: string;
  titleDescription:string;
  timezone: string;
  icon: ReactNode;
  lastSeenTime: string;
  button1?: string;
  button2?: string;
  button3?: string;
  button4?: string;
  button5?:string;
  onClick?: () => void;
};



const options = [
  {
    key: 1,
    value: "active",
    option: "Active",
  },
  {
    key: 1,
    value: "dormant",
    option: "Dormant",
  },
];
const LastLogin = (props: StatusProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.upperdiv}>
        <div className={styles.locaTiontimeDetails}>
          <div className={styles.icondiv}>{props.icon}</div>
          <div>
            <div className={styles.descriptDiv}>
              <div className={styles.userdescript}>
            <div className={styles.username}>
              <div className={styles.usernametext}>{props.userName}</div>
            </div>
            <div className={`${styles.userDescript} captionl`}>{props.titleDescription}</div>
            </div>

            <div className={styles.usermail}>{props.mail}</div>
            <div className={styles.location}>{props.town}</div>
            <div className={styles.timezone}>{props.timezone}</div>
            </div>
          </div>
        </div>

        <div className={styles.status}>
          <div className={styles.lastseen}>{props.lastSeenTime}</div>
          <Button
            icon={<CaretDownOutlined />}
            options={options}
            textColor={"#ffffff"}
            iconColor={"#ffffff"}
            bgColor={"#84bd00"}
          />
        </div>
      </div>

      <div className={styles.lowerdiv}>
        <div className={styles.account} onClick={props.onClick}>
          <div className={styles.text}>
            <button>{props.button1}</button>
          </div>
        </div>
        <div className={styles.users} onClick={props.onClick}>
          <div className={styles.text}>
            <button>{props.button2}</button>
          </div>
        </div>
        <div className={styles.activities} onClick={props.onClick}>
          <div className={styles.text}>
            <button>{props.button3}</button>
          </div>
        </div>

        <div className={styles.activities} onClick={props.onClick}>
          <div className={styles.text}>
            <button>{props.button4}</button>
          </div>
        </div>
        </div>
    </div>
  );
};

export default LastLogin;

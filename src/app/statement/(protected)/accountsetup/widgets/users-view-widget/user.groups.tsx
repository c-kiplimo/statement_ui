import React, { ReactNode } from "react";
import styles from "./user.module.css";
import { CaretDownOutlined, CloseOutlined } from "@ant-design/icons";
import Button from "@/src/components/atoms/dropDownButton/button";

type contentProps = {
  userIcon: ReactNode;
  title: string;
  titleDescript: string;
  mail: string;
  location: string;
  timezone: string;
  updatebttn?: string;
  lastseen: string;
  button1: string;
  button2: string;
  button3: string;
  button4: string;
  button5: string;
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

const UserAcctStatus = (props: contentProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.userDetails}>
        <div className={styles.icon}>{props.userIcon}</div>
        <div className={styles.detailsStatus}>
          <div className={styles.details}>
            <div className={styles.headDiv}>
              <div className={`${"title"} h6r`}>{props.title}</div>
              <div className={`${"descript"} captionl`}>
                {props.titleDescript}
              </div>
            </div>
            <div className={styles.mail}>{props.mail}</div>
            <div className={styles.location}>{props.location}</div>
            <div className={styles.timezone}>{props.timezone}</div>
            <button style={{color:"#84BD00"}}>{props.updatebttn}</button>
          </div>
          <div className={styles.status}>
            <div className={styles.lastSeen}>{props.lastseen}</div>
            <div className={styles.dropdownDiv}>
              <Button
                icon={<CaretDownOutlined />}
                options={options}
                textColor={"#ffffff"}
                iconColor={"#ffffff"}
                bgColor={"#84bd00"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.groupsDiv}>
        <button className={`${"bttnDiv"} bodyr`}>{props.button1}</button>
        <button className={`${"bttnDiv"} bodyr`}>{props.button2}</button>
        <button className={`${"bttnDiv"} bodyr`}>{props.button3}</button>
        <button className={`${"bttnDiv"} bodyr`}>{props.button4}</button>
        <button className={`${"bttnDiv"} bodyr`}>{props.button5}</button>
      </div>
      </div>
  );
};

export default UserAcctStatus;

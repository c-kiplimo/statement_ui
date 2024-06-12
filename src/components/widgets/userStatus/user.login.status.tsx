import React, { ReactNode } from "react";
import styles from "./user.login.status.module.css";
import { CaretDownOutlined } from "@ant-design/icons";
import Button from "../../atoms/dropDownButton/button";




type StatusProps = {
  userName: string;
  industry: string;
  town: string;
  customerType: string;
  userId?:number;
  timezone: string;
  icon: ReactNode;
  lastSeenTime: string;
  onClick?: () => void;
};

const options = [
  {
    key: 1,
    value: "active",
    option: "Active",
  },
  {
    key: 2,
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
                <div className={`${styles.userDescript} bl1`} style={{ color: "#979992" }}>
                  {props.customerType}
                </div>
              </div>
              <div className={styles.usermail}>{props.industry}</div>
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
            defaultValue="Active"
          />
        
        </div>
      </div>
    </div>
  );
};

export default LastLogin;

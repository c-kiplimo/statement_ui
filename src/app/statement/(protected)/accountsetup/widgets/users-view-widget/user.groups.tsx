import React, { ReactNode } from "react";
import styles from "./user.module.css";
import { CaretDownOutlined, CloseOutlined } from "@ant-design/icons";
import Button from "@/src/components/atoms/dropDownButton/button";
import UserViewTabsNavigation from "../../tabs/user-view-tabs/user.view.tabs";



type contentProps = {
  userIcon: ReactNode;
  title: string;
  titleDescript: string;
  mail: string;
  location: string;
  timezone: string;
  updatebttn?: string;
  lastseen: string;
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

const UserViewProfile = (props: contentProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.userDetails}>
        <div className={styles.icon}>{props.userIcon}</div>
        <div className={styles.detailsStatus}>
          <div className={styles.details}>
            <div className={styles.headDiv}>
              <div className={`${"title"} h6r`}>{props.title}</div>
              <div className={`${styles.descript} captionr`}>
                {props.titleDescript}
              </div>
            </div>
            <div className={`${styles.mail} bodyr`}>{props.mail}</div>
            <div className={`${styles.location} bodyr`}>{props.location}</div>
            <div className={`${styles.timezone} bodyr`}>{props.timezone}</div>
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
       <UserViewTabsNavigation/>
      </div>
      </div>
  );
};

export default UserViewProfile;

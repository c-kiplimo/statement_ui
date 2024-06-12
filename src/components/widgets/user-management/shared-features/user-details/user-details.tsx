import React, { ReactNode } from "react";
import styles from "./user-details.module.css";
import Texter from "@/src/components/atoms/text/texter";
import Button from "@/src/components/atoms/dropDownButton/button";
import { CaretDownOutlined } from "@ant-design/icons";
import Link from "next/link";

type StatusProps = {
  userName: string;
  email: string;
  town: string;
  timezone: string;
  icon: ReactNode;
  lastSeenTime: string;
  status:string;
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

const ProfileDetails = ({
  userName,
  email,
  town,
  timezone,
  lastSeenTime,
  status
}: StatusProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.profileImage}></div>
      <div className={styles.details}>
        <div className={styles.detailsContent}>
          <Texter className={`${styles.detail} h6m`} text={userName} />
          <Texter className={`${styles.detail} bodyr`} text={email} />
          <Texter className={`${styles.detail} bodyr`} text={town} />
          <Texter className={`${styles.detail} bodyr`} text={timezone} />
          <div className={styles.tab}>
            <Link
              href={""}
              className={`${styles.tabItem} bodyr`}
              style={{ color: "#003A49" }}
            >
              Edit Profile
            </Link>
            <Link
              href={""}
              className={`${styles.tabItem} bodyr`}
              style={{ color: "#003A49" }}
            >
              Reset Password
            </Link>
          </div>
        </div>
        <div className={styles.state}>
          <div className={styles.stateDetail}>
            <Texter className={`${styles.stateText} bodyr`} text={lastSeenTime} />
          </div>
          <div className={styles.stateBtn}>
            <Button
              icon={<CaretDownOutlined />}
              options={options}
              textColor={"#ffffff"}
              iconColor={"#ffffff"}
              bgColor={"#84bd00"}
              defaultValue={status}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;

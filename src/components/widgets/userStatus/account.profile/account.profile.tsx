import React, { ReactNode } from "react";
import { CaretDownOutlined } from "@ant-design/icons";
import Button from "@/src/components/atoms/dropDownButton/button";
import styles from "./account.profile.module.css"



type StatusProps = {
  userId?:number;
  icon: ReactNode;
  lastSeenTime: string;
  accountId:number;
  accountName:string;
  numberOfusers:string;
  currency:string
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

const AccountProfilePage = (props: StatusProps) => {
  return (

    
    <div className={styles.container}>
      <div className={styles.upperdiv}>
        <div className={styles.locaTiontimeDetails}>
          <div className={styles.icondiv}>{props.icon}</div>
          <div>
            <div className={styles.descriptDiv}>
              <div className={styles.userdescript}>
                <div className={styles.username}>
                  <div className={styles.usernametext}>{props.accountName}</div>
                </div>
                <div className={`${styles.userDescript} bl1`} style={{ color: "#979992" }}>
                  {props.numberOfusers}
                </div>
              </div>
              <div className={styles.usermail}>
              <span className={`${styles.account} bodyr`}>{props.accountId}</span>
              <span className={`${styles.currency} captionl`}>{props.currency}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.status}>
          <div className={`${styles.lastseen} bodyr`}>{props.lastSeenTime}</div>
          <Button
            icon={<CaretDownOutlined />}
            options={options}
            textColor={"#ffffff"}
            iconColor={"#ffffff"}
            bgColor={"#84bd00"} defaultValue={""}          />
        
        </div>
      </div>
    </div>
  
  );
};

export default AccountProfilePage;



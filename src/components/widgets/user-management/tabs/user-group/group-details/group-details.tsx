import React from 'react'
import styles from "./group-details.module.css"
import { useFont, useTokens } from "@/src/app/(context)/ColorContext";
import Button from "@/src/components/atoms/dropDownButton/button"
import HorizontalInfoDescription from '@/src/components/atoms/text/horizontal-info-description'
import Texter from '@/src/components/atoms/text/texter'
import { CaretDownOutlined, InfoCircleFilled } from '@ant-design/icons'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

type GroupProps={
  userName:string;
  userId:string;
  userType:string;
  country:string;
  town:string;
  email:string;
  mobileNumber:string;
  customerStatus:string;
}
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

const GroupDetails = ({userName,userId,userType,country,town,email,mobileNumber,customerStatus}:GroupProps) => {
  return (
    <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.icon}>
              <Image
                src="/UsersGroup.svg"
                alt="user-icon"
                width={16}
                height={16}
              />
            </div>
            <div className={styles.userDetails}>
              <div className={styles.content}>
                <Texter
                  className={"h6m"}
                  textStyle={{ color: "var(--Text-Text-Secondary" }}
                  text={userName}
                />
                <Texter
                  className={"captionr"}
                  textStyle={{ color: "var(--Text-Text-Description-01" }}
                  text={userId}
                />
                <Texter
                  className={"captionr"}
                  textStyle={{ color: "var(--Text-Text-Secondary" }}
                  text={userType}
                />
              </div>
              <div className={styles.stateBtn}>
              <Button
            icon={<CaretDownOutlined />}
            options={options}
            defaultValue={customerStatus}
            textColor={"#ffffff"}
            iconColor={"#ffffff"}
            bgColor={"#84bd00"}
          />
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <div className={styles.sectionOne}>
              <span className={styles.title}>
                <Texter className={"bodym"} text={"Country"} />
                <span>
                  <InfoCircleFilled />
                </span>
              </span>
              <span className={styles.desc}>
                <HorizontalInfoDescription
                  title={country}
                  titleStyle={{ fontWeight: "500", fontSize: "16px" }}
                  description={town}
                  descriptionStyle={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "var(--Text-Text-Description-01",
                  }}
                />
              </span>
            </div>
            <div className={styles.sectionTwo}>
              <span className={styles.titleTwo}>
                <Texter className={"bodym"} text={"Email"} />
                <span>
                  <InfoCircleFilled />
                </span>
              </span>
              <span className={styles.descTwo}>
                <HorizontalInfoDescription title={email} titleStyle={{fontWeight:"500",fontSize:"16px",lineHeight:"24px",color:"var(--shade-colors-shade-100"}}/>
              </span>
            </div>
            <div className={styles.sectionThree}>
              <span className={styles.texter}>
                <Texter className={"bodym"} text={"Mobile Number"} />
                <span>
                  <InfoCircleFilled />
                </span>
              </span>
              <span className={styles.textDesc}>
                <HorizontalInfoDescription title={mobileNumber} titleStyle={{fontWeight:"500",fontSize:"16px",lineHeight:"24px",color:"var(--shade-colors-shade-100"}}/>
              </span>
            </div>
          </div>
        </div>
  )
}

export default GroupDetails
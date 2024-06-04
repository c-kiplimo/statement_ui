"use client";
import React, { Fragment, useState } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import styles from "./page.module.css";
import Image from "next/image";
import Texter from "@/src/components/atoms/text/texter";
import ActivityBadge from "@/src/components/atoms/badge/active-badge";
import { ChevronDown } from "lucide-react";
import { useFont, useTokens } from "../../(context)/ColorContext";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import { InfoCircleFilled } from "@ant-design/icons";
import HorizontalInfoDescription from "@/src/components/atoms/text/horizontal-info-description";



const Dev = () => {
  const tokenColor = useTokens();
  const font = useFont();
  return (
    <Fragment>
      <div className={styles.container}>
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
                  text={"Meraki System Tech"}
                />
                <Texter
                  className={"captionr"}
                  textStyle={{ color: "var(--Text-Text-Description-01" }}
                  text={"123456"}
                />
                <Texter
                  className={"captionr"}
                  textStyle={{ color: "var(--Text-Text-Secondary" }}
                  text={"High Volume Customer"}
                />
              </div>
              <div className={styles.stateBtn}>
                <ActivityBadge
                  icon={<ChevronDown />}
                  token={tokenColor}
                  paragraphSelectTextStyle={{
                    ...font.typography.h6.regular,
                    color: tokenColor.default.white,
                  }}
                  title="Active"
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
                  title={"KENYA/"}
                  titleStyle={{ fontWeight: "500", fontSize: "16px" }}
                  description={"Moi Avenue"}
                  descriptionStyle={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "var(--Text-Text-Description-01",
                  }}
                />
              </span>
            </div>
            <div className={styles.sectionTwo}>
              <span className={styles.title}>
                <Texter className={"bodym"} text={"Email"} />
                <span>
                  <InfoCircleFilled />
                </span>
              </span>
              <span className={styles.desc}>
                <HorizontalInfoDescription title={"merakisystems@gmail.com"} />
              </span>
            </div>
            <div className={styles.sectionThree}>
              <span className={styles.texter}>
                <Texter className={"bodym"} text={"Mobile Number"} />
                <span>
                  <InfoCircleFilled />
                </span>
              </span>
              <span className={styles.desc}>
                <HorizontalInfoDescription title={"0728000000"} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default withContainer(Dev);

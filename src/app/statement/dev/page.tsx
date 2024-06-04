"use client";
import React, { Fragment, useState } from "react";
import withContainer from "../../../components/molecules/shared/statement-core/statement.container.hoc";
import styles from "./page.module.css"
import Image from "next/image";
import Texter from "@/src/components/atoms/text/texter";
import ActivityBadge from "@/src/components/atoms/badge/active-badge";
import { ChevronDown } from "lucide-react";
import { useFont, useTokens } from "../../(context)/ColorContext";



const Dev = () => {
  const tokenColor = useTokens();
  const font = useFont(); 
  return (
    <Fragment>
      <div className={styles.container}>
       <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.icon}><Image src="/UsersGroup.svg" alt="user-icon" width={16} height={16}/></div>
          <div className={styles.userDetails}>
            <div className={styles.content}>
              <Texter className={"h6m"} textStyle={{color: "var(--Text-Text-Secondary"}} text={"Meraki System Tech"}/>
              <Texter className={"captionr"} textStyle={{color: "var(--Text-Text-Description-01"}} text={"123456"}/>
              <Texter className={"captionr"} textStyle={{color: "var(--Text-Text-Secondary"}} text={"High Volume Customer"}/>
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
       </div>
      </div>
    </Fragment>
  );
}

export default withContainer(Dev);

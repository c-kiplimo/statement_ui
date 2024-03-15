import React, { ReactNode } from "react";
import styles from "./funds.alocation.module.css";
import Text from "@/src/components/atoms/text/vertical-info-description";

type ContainerDescription = {
  title: string;
  description: string;
  title2: string;
  description2: string;
  onClick?: () => void;
};

const FundsAllocation = (props: ContainerDescription) => {
  return (
    <div className={styles.container}>
      <div className={styles.alocationAmount}>
        <Text
          title={props.title}
          titleStyle={{
            color: " #6F7269",
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "16px",
            font: "Roboto",
            width: "81px",
            height: "16px",
          }}
          description={props.description}
          descriptionStyle={{
            color: "#151E00",
            fontWeight: "700",
            fontSize: "16px",
            lineHeight: "24px",
            width: "73px",
            height: "24px",
          }}
        />
      </div>

      <div className={styles.titleNumber}>
        <Text
          title={props.title2}
          titleStyle={{
            color: " #6F7269",
            fontWeight: "400",
            fontSize: "12px",
            lineHeight: "16px",
            font: "Roboto",
            width: "81px",
            height: "16px",
          }}
          description={props.description2}
          descriptionStyle={{
            color: "#151E00",
            fontWeight: "700",
            fontSize: "16px",
            lineHeight: "24px",
            width: "73px",
            height: "24px",
          }}
        />
      </div>
    </div>
  );
};

export default FundsAllocation;

import React from "react";
import styles from "./member.card.module.css";
import Text from "@/src/components/atoms/text/vertical-info-description";
import FundsAllocation from "@/src/components/widgets/member-card-item/funds.alocation";
import CustomerDetails from "@/src/components/widgets/member-card-item/customer.info";
import { RightCircleOutlined } from "@ant-design/icons";

type MemberCardDescription = {
  title: string;
  title2: string;
  onClick?: () => void;
};

const MemberCard = (props: MemberCardDescription) => {
  return (
    <div className={styles.container} onClick={props.onClick}>
      <div className={styles.titleContainer}>
        <Text
          title={props.title}
          titleStyle={{
            width: "132px",
            height: "32px",
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: "20px",
            lineHeight: "32px",
            color: "#151E00",
            flex: "none",
            order: "0",
            flexGrow: "0",
          }}
        />
        <div className={styles.body}>
          <FundsAllocation
            title={"Total Allocated"}
            description={"$8,194.00"}
            title2={"Total Members"}
            description2={"184"}
          />

          <CustomerDetails
            src={"/Ellipse.png"}
            title={"John Doe"}
            amount={"$2,360.00"}
            arrow={<RightCircleOutlined />}
          />
          <CustomerDetails
            src={"/Ellipse.png"}
            title={"Mira Carder"}
            amount={"$2,360.00"}
            arrow={<RightCircleOutlined />}
          />
        </div>
      </div>
      <div className={styles.buttondiv}>
        <button className={styles.button}>
          <Text
            title={props.title2}
            titleStyle={{
              height: "16px",
              color: "#151E00",
              flex: "none",
              order: "1",
              flexGrow: "0",
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default MemberCard;

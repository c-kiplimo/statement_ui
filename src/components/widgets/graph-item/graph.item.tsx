import React, { CSSProperties } from "react";
import Graph from "../../atoms/graph/graph";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";
import styles from "./graph.item.module.css";
interface DataType {
  name: string;
  Revenue: number;
  NetIncome: number;
}

type GraphItemProps = {
  data: DataType[];
  balanceTitle: string;
  amount: string;
  moneyIntitle: string;
  moneyoutTitle: string;
};
function GraphItem(props: GraphItemProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <GraphItem.Title
            balanceTitle={props.balanceTitle}
            amount={props.amount}
          />
        </div>

        <div className={styles.moneyoptions}>
          <GraphItem.Description
            descriptionTitle={props.moneyoutTitle}
            divStyles={{ background: "#fbb3c4" }}
          />
          <GraphItem.Description
            descriptionTitle={props.moneyIntitle}
            divStyles={{ background: "#17D05B" }}
          />
        </div>
      </div>
      <div className={styles.graph}>
        <Graph graphData={props.data} />
      </div>
    </div>
  );
}

export default GraphItem;

type TitleProps = {
  balanceTitle: string;
  amount: string;
};
GraphItem.Title = (props: TitleProps) => (
  <VerticalInfoDescription
    title={props.balanceTitle}
    description={props.amount}
    titleStyle={{
      color: "#6F7269",
      fontWeight: "400",
      fontSize: "12px",
      marginBottom: "8px",
    }}
    descriptionStyle={{ color: "#151E00", fontWeight: "700", fontSize: "25px" }}
  />
);

type DescriptionProp = {
  descriptionTitle: string;
  divStyles?: CSSProperties;
};
GraphItem.Description = (props: DescriptionProp) => (
  <div className={styles.desc}>
    <div className={styles.customdot} style={props.divStyles}></div>
    <VerticalInfoDescription
      title={props.descriptionTitle}
      titleStyle={{ fontWeight: "400", fontSize: "12px", color: "#151E00" }}
    />
  </div>
);

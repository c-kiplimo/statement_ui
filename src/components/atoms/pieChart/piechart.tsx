import React from "react";
import { PieChart, Pie, Cell, Label } from "recharts";
import styles from "./piechart.module.css";

type DataType = {
  name: string;
  value: number;
};

type PieChartProps = {
  chartData: DataType[];
  totalamount: string;
  accounts: string;
};
const COLORS = ["#003A49", "#4272DD", "#17D05B", "#FFBD66"];

function Piechart(props: PieChartProps) {
  return (
    <div className={styles.container}>
      <PieChart width={700} height={400}>
        <Pie
          data={props.chartData}
          cx={80}
          cy={200}
          innerRadius={60}
          outerRadius={75}
          fill="#8884d8"
          dataKey="value"
        >
          {props.chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}

          <Label
            position="centerTop"
            style={{ fontWeight: "700", color: "#151E00", fontSize: "16px" }}
          >
            {props.totalamount}
          </Label>
          <Label position="centerBottom">{props.accounts}</Label>
        </Pie>
      </PieChart>
    </div>
  );
}

export default Piechart;

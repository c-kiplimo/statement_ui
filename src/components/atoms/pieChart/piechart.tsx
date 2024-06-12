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

const COLORS = ["#17D05B", "#4272DD", "#003A49", "#FFBD66"];

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
            position="center"
            content={({ viewBox }) => {
              const { cx, cy }:any = viewBox;
              return (
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ color: "#1A2600", fontSize: "16px" }} 
                >
                  {props.accounts}
                </text>
              );
            }}
          />

          <Label
            position="center"
            content={({ viewBox }) => {
              const { cx, cy }:any = viewBox;
              return (
                <text
                  x={cx}
                  y={cy + 20}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ fontSize: "14px", fontWeight: "700" }}
                >
                  {props.totalamount}
                </text>
              );
            }}
          />
        </Pie>
      </PieChart>
    </div>
  );
}

export default Piechart;

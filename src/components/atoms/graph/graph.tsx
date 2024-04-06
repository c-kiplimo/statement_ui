import React from "react";
import styles from "./graph.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataType {
  name: string;
  Revenue: number;
  NetIncome: number;
}

type GraphProps = {
  graphData: DataType[];
};

function Graph(props: GraphProps) {
  return (
    <div className={styles.container}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={props.graphData}
          margin={{
            top: 25,
            right: 10,
            left: 0,
            bottom: 25,
          }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="" />
          <XAxis dataKey="name" />
          <YAxis
            type="number"
            domain={["auto", "auto"]}
            tickCount={6}
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <Tooltip />
          <Legend />
          <Line
            type="linear"
            dataKey="NetIncome"
            stroke="#17D05B"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="linear"
            dataKey="Revenue"
            stroke="#FBB3C4"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Graph;

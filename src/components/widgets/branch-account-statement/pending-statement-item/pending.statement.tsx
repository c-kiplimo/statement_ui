import React, { CSSProperties, ReactNode } from "react";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import styles from "./pending.statement.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import StatementTable from "../activity-history-table/activity.history.table";

const pendingstatementdata = [
  {
    id: 1,
    date: "23-05-24",
    time: "11:00 pm",
    accountname: "Meraki Account",
    accountnumber: "KES 234578998",
    description: "Account Statement Genaration",
    status: "Pending",
  },
  {
    id: 2,
    date: "23-05-24",
    time: "11:00 pm",
    accountname: "Meraki Account",
    accountnumber: "KES 234578998",
    description: "Account Statement Genaration",
    status: "Pending",
  },
  {
    id: 3,
    date: "23-05-24",
    time: "11:00 pm",
    accountname: "Meraki Account",
    accountnumber: "KES 234578998",
    description: "Account Statement Genaration",
    status: "Pending",
  },
  {
    id: 4,
    date: "23-05-24",
    time: "11:00 pm",
    accountname: "Meraki Account",
    accountnumber: "KES 234578998",
    description: "Account Statement Genaration",
    status: "Pending",
  },
];

function PendingStatement() {
  return (
    <div>
      <div className={styles.body}>
        <div>
          <VerticalInfoDescription
            title={"Activity History"}
            titleStyle={{ fontSize: "20px", fontWeight: "700" }}
          />
        </div>
        <div className={styles.headericons}>
          <PendingStatement.Button
            icon={<DeleteOutlined />}
            placeholder="Delete"
          />
          <PendingStatement.Button
            icon={<img src="/filter.svg" />}
            placeholder="Filter"
          />
          <PendingStatement.Button
            icon={<img src="/sort.svg" />}
            placeholder="Sort"
          />
        </div>
      </div>
      <div>
        <StatementTable statementdata={pendingstatementdata} />
      </div>
    </div>
  );
}

export default PendingStatement;

type ButtonProps = {
  icon: ReactNode;
  placeholder: string;
  iconStyle?: CSSProperties;
  buttonStyle?: CSSProperties;
  placeholderstyle?: CSSProperties;
};

PendingStatement.Button = (props: ButtonProps) => (
  <button style={props.buttonStyle} className={`${styles.button} bodyr`}>
    <span style={props.iconStyle}>{props.icon}</span>
    <span style={props.placeholderstyle}> {props.placeholder}</span>
  </button>
);

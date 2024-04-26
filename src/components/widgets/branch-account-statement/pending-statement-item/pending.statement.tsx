import React, { CSSProperties, ReactNode, useEffect } from "react";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import styles from "./pending.statement.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import StatementTable from "../activity-history-table/activity.history.table";
import { AccountStatementRequestHandler } from "@/src/services/account/account.statement.request.service";

function PendingStatement() {

//   useEffect(() => {
//   debugger;
//   const fetchData = async () => {
//     debugger;
//     const statementRequestId = sessionStorage.getItem("statementRequestId");
//     console.log("statementRequestId", statementRequestId);
//     const handler = AccountStatementRequestHandler();
//     const result = await handler.fetchStatementRequestById(parseInt(statementRequestId || "0"));
//     // results = result;
//     console.log("results", result);
//   };
//   fetchData();
// }, []);


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
        <StatementTable statementdata={[]}/>
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
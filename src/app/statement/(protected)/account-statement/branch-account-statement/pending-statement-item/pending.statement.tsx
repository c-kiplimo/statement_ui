import React, { CSSProperties, ReactNode, useEffect, useState } from "react";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import styles from "./pending.statement.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import StatementTable from "../activity-history-table/activity.history.table";
import { usePathname } from "next/navigation";
import { pendingTransactionAction } from "@/src/lib/completed.transactions.actions";

function PendingStatement() {
  const [data, setData] = useState<CompleteTransactions[] | null>(null);
  const path = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      const result = await pendingTransactionAction("1026272611");
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <div>
      {data && data?.length! > 0 ? (
        <>
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
            <StatementTable statementdata={data!} />
          </div>
        </>
      ) : (
        <div>No Pending Statements</div>
      )}
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

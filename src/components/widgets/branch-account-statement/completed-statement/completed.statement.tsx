import React, { CSSProperties, ReactNode, useState } from "react";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import styles from "./completed.statement.module.css";
import { DeleteOutlined } from "@ant-design/icons";
import { Modal, Pagination } from "antd";
import StatementTable from "../activity-history-table/activity.history.table";
import AccountDetailTable from "../account-detail-table/account.detail.table";

const completedstatementdata = [
  {
    id: 1,
    date: "23-05-24",
    time: "11:00 pm",
    accountname: "Meraki Account",
    accountnumber: "KES 234578998",
    description: "Account Statement Genaration",
    status: "Complete",
  },
  {
    id: 2,
    date: "23-05-24",
    time: "11:00 pm",
    accountname: "Meraki Account",
    accountnumber: "KES 234578998",
    description: "Account Statement Genaration",
    status: "Complete",
  },
  {
    id: 3,
    date: "23-05-24",
    time: "11:00 pm",
    accountname: "Meraki Account",
    accountnumber: "KES 234578998",
    description: "Account Statement Genaration",
    status: "Complete",
  },
  {
    id: 4,
    date: "23-05-24",
    time: "11:00 pm",
    accountname: "Meraki Account",
    accountnumber: "KES 234578998",
    description: "Account Statement Genaration",
    status: "Complete",
  },
];

function CompletedStatement() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

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
          <CompletedStatement.Button
            icon={<DeleteOutlined />}
            placeholder="Delete"
          />
          <CompletedStatement.Button
            icon={<img src="/filter.svg" />}
            placeholder="Filter"
          />
          <CompletedStatement.Button
            icon={<img src="/sort.svg" />}
            placeholder="Sort"
          />
        </div>
      </div>
      <div>
        <StatementTable
          statementdata={completedstatementdata}
          onEyeIconClick={handleClick}
        />

        <div className={styles.pagination}>
          <Pagination defaultCurrent={6} total={100} />
        </div>
      </div>
      <div className={styles.modalcontent}>
      <Modal
        width={'70%'}
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <AccountDetailTable/>
      </Modal>
      </div>
    </div>
  );
}

export default CompletedStatement;

type ButtonProps = {
  icon: ReactNode;
  placeholder: string;
  iconStyle?: CSSProperties;
  buttonStyle?: CSSProperties;
  placeholderstyle?: CSSProperties;
  onClick?: (e: any) => void;
};

CompletedStatement.Button = (props: ButtonProps) => (
  <button
    style={props.buttonStyle}
    className={`${styles.button} bodyr`}
    onClick={props.onClick}
  >
    <span style={props.iconStyle}>{props.icon}</span>
    <span style={props.placeholderstyle}> {props.placeholder}</span>
  </button>
);

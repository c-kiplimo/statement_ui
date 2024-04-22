import React, { CSSProperties, ReactNode, useState } from "react";
import styles from "./account.detail.table.module.css";
import { DownloadOutlined } from "@ant-design/icons";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import HorizontalInfoDescription from "@/src/components/atoms/text/horizontal-info-description";
import BranchTransactionsHistory from "../transactions-history-table/transaction.history.table";
import { Modal } from "antd";
import SelectReportFormat from "../select-report-format/select.report.format";

const data = [
  {
    key: 1,
    valuedate: " 02/02/2023",
    transferRef: "FT102QF66788",
    paymentDetails: "Monthly sales",
    moneyIn: "2,500,000",
    moneyOut: "",
    balance: "16,000,000",
  },
  {
    key: 2,
    valuedate: " 02/02/2023",
    transferRef: "FT102T667ZRX",
    paymentDetails: "Electricity",
    moneyIn: "",
    moneyOut: "1,000,000",
    balance: "15,000,000",
  },
  {
    key: 3,
    valuedate: " 02/02/2023",
    transferRef: "FT102245LOP89",
    paymentDetails: "Mobi AT-DPC",
    moneyIn: "4,500,450",
    moneyOut: "",
    balance: "16,500,400",
  },
];

function AccountDetailTable() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleClick = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <AccountDetailTable.Logo logoIcon={<img src="/kcblogo.svg" />} />
        </div>
        <div>
          <AccountDetailTable.Title headertitle="Account Statement" />
        </div>
      </div>

      <div className={styles.accountDetails}>
        <div className={styles.accouninfo}>
          <AccountDetailTable.Details
            title="Account Name :"
            description="MERAKI CURRENT ACCOUNT"
          />
          <AccountDetailTable.Details
            title="Account Number :"
            description="132314245"
          />
          <AccountDetailTable.Details title="Currency :" description="KES" />
          <AccountDetailTable.Details
            title="Statement Period :"
            description="2019-01-01 - 2023-01-10"
          />
        </div>
        <div>
          <button className={`${styles.button} bodyr`} onClick={handleClick}>
            Download <DownloadOutlined />
          </button>
        </div>
      </div>

      <div className={styles.summary}>
        <div className={styles.summaryheader}>
          <VerticalInfoDescription
            title={"ACCOUNT SUMMARY"}
            titleStyle={{ fontWeight: "700" }}
          />
        </div>
        <div className={styles.summmary}>
          <AccountDetailTable.Summary
            title="Opening Balance:"
            description="1,800 KES"
          />
          <div></div>
          <AccountDetailTable.Summary
            title="Closing Balance:"
            description="50,000 KES"
            bgcolor={{ background: "#F9FAF7" }}
          />
          <AccountDetailTable.Summary
            title="Total Debit:"
            description="40,000 KES"
          />
          <AccountDetailTable.Summary
            title="Total Credit:"
            description="10,000 KES"
            bgcolor={{ background: "#F9FAF7" }}
          />
        </div>
      </div>

      <div className={styles.transactions}>
        <div className={styles.transactionstitle}>
          <VerticalInfoDescription
            title="TRANSACTIONS"
            titleStyle={{ fontWeight: "700" }}
          />
        </div>
        <div className={styles.table}>
          <BranchTransactionsHistory data={data} />
        </div>
      </div>

      <div>
        <Modal
          width={368}
          open={isModalVisible}
          onCancel={closeModal}
          footer={null}
        >
          <SelectReportFormat />
        </Modal>
      </div>
    </div>
  );
}

export default AccountDetailTable;

type closeOutlineProps = {
  closeIcon: ReactNode;
  iconStyles?: CSSProperties;
};
AccountDetailTable.CloseOutline = (props: closeOutlineProps) => (
  <div style={props.iconStyles}>{props.closeIcon}</div>
);
type logoProps = {
  logoIcon: ReactNode;
  logoStyles?: CSSProperties;
};
AccountDetailTable.Logo = (props: logoProps) => (
  <div style={props.logoStyles}>{props.logoIcon}</div>
);

type titleProp = {
  headertitle: string;
  headerstyles?: CSSProperties;
  titlestyles?: CSSProperties;
};
AccountDetailTable.Title = (props: titleProp) => (
  <VerticalInfoDescription
    title={props.headertitle}
    titleStyle={{ fontWeight: "700", fontSize: "20px" }}
  />
);

type DetailsProps = {
  title: string;
  titleStyle?: CSSProperties;
  description: string;
  descStyle?: CSSProperties;
};
AccountDetailTable.Details = (props: DetailsProps) => (
  <HorizontalInfoDescription
    title={props.title}
    titleStyle={{ fontWeight: "700", fontSize: "16px" }}
    description={props.description}
    descriptionStyle={{ fontSize: "16px", color: "#6F7269" }}
  />
);

type SummaryProps = {
  title: string;
  titleStyle?: CSSProperties;
  description: string;
  descStyle?: CSSProperties;
  bgcolor?: CSSProperties;
};
AccountDetailTable.Summary = (props: SummaryProps) => (
  <div className={styles.summarycontainer} style={props.bgcolor}>
    <span className={`${styles.summarytitle} bodyr`}>{props.title}</span>
    <span className={`${styles.summarydescription} bodyr`}>
      {props.description}
    </span>
  </div>
);

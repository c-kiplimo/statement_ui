import React, { CSSProperties, ReactNode, useEffect, useState } from "react";
import styles from "./account.detail.table.module.css";
import { DownloadOutlined } from "@ant-design/icons";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import HorizontalInfoDescription from "@/src/components/atoms/text/horizontal-info-description";
import BranchTransactionsHistory, {
  TransactionHistoryData,
} from "../transactions-history-table/transaction.history.table";
import { Modal, Spin } from "antd";
import SelectReportFormat from "../select-report-format/select.report.format";
import {
  DateSearchAction,
  SingleDataEntriesAction,
  SingleStatementAction,
} from "@/src/lib/single.statement.action";

export interface AccountDetails {
  accountName: string;
  accountNumber: string;
  currency: string;
  openingBalance: string;
  closingBalance: string;
  startDate: string;
  endDate: string;
  totalDebitAmt: string;
  totalCreditAmt: string;
}

export type Dates = {
  startDate: string;
  endDate: string;
};

type AccountDetailTableProps = {
  itemId?: number;
};

function AccountDetailTable({ itemId }: AccountDetailTableProps) {
  const [dataset, setDataSet] = useState<TransactionHistoryData[]>([]);
  const [dataresulst, setDataResult] = useState<AccountDetails>();
  const [date, setDate] = useState<Dates>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await SingleDataEntriesAction(itemId!);
        setDataSet(result);

        const dataresult = await SingleStatementAction(itemId!);
        setDataResult(dataresult);

        const dateResult = await DateSearchAction(itemId!);
        setDate(dateResult);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [itemId]);

  const handleClick = () => {
    setSelectedItemId(itemId);
    setIsModalVisible(true);
  };

  

  const closeModal = () => {
    setIsModalVisible(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  }

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
            description={dataresulst?.accountName!}
          />
          <AccountDetailTable.Details
            title="Account Number :"
            description={dataresulst?.accountNumber!}
          />
          <AccountDetailTable.Details
            title="Currency :"
            description={dataresulst?.currency!}
          />
          <AccountDetailTable.Details
            title="Statement Period :"
            description={`${date?.startDate} - ${date?.endDate}`}
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
            description={dataresulst?.openingBalance!}
          />
          <div></div>
          <AccountDetailTable.Summary
            title="Closing Balance:"
            description={dataresulst?.closingBalance!}
            bgcolor={{ background: "#F9FAF7" }}
          />
          <AccountDetailTable.Summary
            title="Total Debit:"
            description={dataresulst?.totalDebitAmt!}
          />
          <AccountDetailTable.Summary
            title="Total Credit:"
            description={dataresulst?.totalCreditAmt!}
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
          {dataset ? (
            <BranchTransactionsHistory data={dataset} />
          ) : (
            "Loading...."
          )}
        </div>
      </div>

      <div>
        <Modal
          width={368}
          open={isModalVisible}
          onCancel={closeModal}
          footer={null}
        >
          <SelectReportFormat itemId={selectedItemId} onCancel={closeModal}/>
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

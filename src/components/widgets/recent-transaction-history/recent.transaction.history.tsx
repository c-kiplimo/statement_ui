import React, { CSSProperties, ReactNode, useState } from "react";
import VerticalInfoDescription from "../../atoms/text/vertical-info-description";
import SelectedInput from "../../atoms/select/select.input";
import styles from "./recent.transaction.history.module.css";
import RecentTransactionItem from "../recent-Transaction-Item/recent.transaction.item";
import Pagination from "../../atoms/pagination/pagination";

interface DataType {
  id: number;
  amount: string;
  title: string;
  date: string;
  description: string;
  icon: ReactNode;
}

interface DataTypes {
  key: number;
  value: string;
  option: string;
}

type recentTransactionProps = {
  title: string;
  options: DataTypes[];
  transactions: DataType[];
};

const RecentTransactionsCard = (props: recentTransactionProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 4;
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const endIndex = startIndex + transactionsPerPage;
  const currentTransactions = props.transactions.slice(startIndex, endIndex);

  const totalPages = Math.ceil(props.transactions.length / transactionsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <RecentTransactionsCard.Title title={props.title} />
        </div>
        <div className={styles.dropdown}>
          <RecentTransactionsCard.Dropdown option={props.options} />
        </div>
      </div>
      <div className={styles.body}>
        {currentTransactions.map((transaction) => (
          <RecentTransactionItem
            key={transaction.id}
            amount={transaction.amount}
            title={transaction.title}
            date={transaction.date}
            icon={transaction.icon}
            description={transaction.description}
          />
        ))}
      </div>
      <div className="mt-7">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default RecentTransactionsCard;

type titleProps = {
  title: string;
  titleStyle?: string;
};

RecentTransactionsCard.Title = (props: titleProps) => (
  <VerticalInfoDescription
    title={props.title}
    titleStyle={{ fontSize: "20px", fontWeight: "700", lineHeight: "32px" }}
  />
);

type dropdownProps = {
  optionStyles?: CSSProperties;
  option: DataTypes[];
};

RecentTransactionsCard.Dropdown = (props: dropdownProps) => (
  <SelectedInput
    options={props.option}
    selectionStyles={{
      width: "115px",
      height: "32px",
      outline: "none",
      border: "1px solid grey",
      borderRadius: "4px",
      color: "#6F7269",
    }}
  />
);

type bodyProps = {
  bodystyle?: CSSProperties;
  transactions: DataType[];
};

RecentTransactionsCard.Body = (props: bodyProps) => {
  return (
    <div>
      {props.transactions.map((transaction) => (
        <div key={transaction.id}>
          <RecentTransactionItem
            amount={transaction.amount}
            title={transaction.title}
            date={transaction.date}
            icon={transaction.icon}
            description={transaction.description}
          />
        </div>
      ))}
    </div>
  );
};

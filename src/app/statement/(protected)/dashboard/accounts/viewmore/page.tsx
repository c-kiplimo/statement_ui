"use client";
import AccountsSummaryItem from "@/src/components/widgets/accounts-summary-item/accounts.summary.item";
import AccountsTableInfo from "@/src/components/widgets/accounts-table-info/accounts.table.info";
import styles from "./view.more.module.css";
import ChartOverview from "@/src/components/widgets/chart-overview/chart.overview";
const data = [
  {
    id: 1,
    accountIcon: <img src="/saving.svg" />,
    accountTitle: "Saving account(2)",
    amount: "$35,000",
    accountsbreakdownInfo: [
      {
        key: 1,
        accountName: "Free checking",
        accountNumber: "4556 677 888",
        currentBalance: "$5,6000",
      },
      {
        key: 2,
        accountName: "Minor Saving",
        accountNumber: "4556 677 888",
        currentBalance: "$5,6000",
      },
    ],
  },

  {
    id: 2,
    accountIcon: <img src="/loans.svg" />,
    accountTitle: "Loans(4)",
    amount: "$35,000",
    accountsbreakdownInfo: [
      {
        key: 1,
        accountName: "Free checking",
        accountNumber: "4556 677 888",
        currentBalance: "$5,6000",
      },
      {
        key: 2,
        accountName: "Minor Saving",
        accountNumber: "4556 677 888",
        currentBalance: "$5,6000",
      },
    ],
  },
  {
    id: 3,
    accountIcon: <img src="/checking.svg" />,
    accountTitle: "Checking accounts(2)",
    amount: "$35,000",
    accountsbreakdownInfo: [
      {
        key: 1,
        accountName: "Free checking",
        accountNumber: "4556 677 888",
        currentBalance: "$5,6000",
      },
      {
        key: 2,
        accountName: "Minor Saving",
        accountNumber: "4556 677 888",
        currentBalance: "$5,6000",
      },
    ],
  },
  {
    id: 4,
    accountIcon: <img src="/deposit.svg" />,
    accountTitle: "Deposit accounts(8)",
    amount: "$50,000",
    accountsbreakdownInfo: [
      {
        key: 1,
        accountName: "Free checking",
        accountNumber: "4556 677 888",
        currentBalance: "$5,6000",
      },
      {
        key: 2,
        accountName: "Minor Saving",
        accountNumber: "4556 677 888",
        currentBalance: "$5,6000",
      },
    ],
  },
];

const accountdata = [
  {
    id: 1,
    icon: <img src="/deposit.svg" alt="" />,
    accountName: "Deposits Accounts(8)",
    accountBalance: "$50,000",
    bgcolor: "",
    imgcolor: "",
  },
  {
    id: 2,
    icon: <img src="/checking.svg" alt="" />,
    accountName: "Checking Accounts(2)",
    accountBalance: "$35,000",
    bgcolor: "",
    imgcolor: "#4272DD",
  },
  {
    id: 3,
    icon: <img src="/saving.svg" alt="" />,
    accountName: "Saving accounts(2)",
    accountBalance: "$30,000",
    bgcolor: "",
    imgcolor: "#F30039",
  },
  {
    id: 4,
    icon: <img src="/loans.svg" alt="" />,
    accountName: "Loans (4)",
    accountBalance: "$35,000",
    bgcolor: "",
    imgcolor: "#FFBD66",
  },
];

const piechartdata = [
  { name: "Deposit Account", value: 300 },
  { name: "Saving Accounts", value: 300 },
  { name: "Loans", value: 400 },
  { name: "Checking Accounts", value: 300 },
];
const currencyBalances = [
  {
    currency: "EUR",
    amount: "82,924.65",
    dollarEquivalent: "$70000",
  },
  {
    currency: "CAD",
    amount: "26,906",
    dollarEquivalent: "$5000",
  },
  {
    currency: "KES",
    amount: " 5,092,500",
    dollarEquivalent: "$50,000  ",
  },
];

const page = () => {
  return (
    <div className="p-9 bg-slate-100">
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <div className={styles.cardoverview}>
            <ChartOverview
              cardTitle={"Overview"}
              piechartData={piechartdata}
              totalchartaccounts={"Accounts (17)"}
              totalChartamount={"$150,000"}
              currencyBalances={currencyBalances}
            />
          </div>
          <div className={styles.summary}>
            <AccountsSummaryItem
              cardTitle={"Summary"}
              placeholder={"Search"}
              buttonname={"Filter"}
              icon={<img src="/funnel.svg" />}
              accountData={accountdata}
            />
          </div>
        </div>

        <div className={styles.accountsTable}>
          <AccountsTableInfo
            accountsData={data}
            title={"Accounts"}
            inputPlaceholder={"Search"}
          />
        </div>
      </div>
    </div>
  );
};

export default page;

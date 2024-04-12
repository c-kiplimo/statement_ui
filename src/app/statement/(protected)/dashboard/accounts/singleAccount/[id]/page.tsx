"use client";
import AccountTransactionSummary from "@/src/components/widgets/accounts-transactions-summary/accounts.transactions.summary";
import CashflowCardHome from "@/src/components/widgets/cash-flow-card-home/cashflow.card.home";
import SavingAccountBalance from "@/src/components/widgets/saving-account-balances/saving.account.balance";
import styles from "./single.account.module.css";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import GraphItem from "@/src/components/widgets/graph-item/graph.item";

const accountBalances = [
  {
    id: 1,
    titleIcon: <img src="/openingbal.svg" />,
    summaryTitle: "Opening Balance",
    titleDescription: "(No 10)",
    amount: "$560,025",
    arrowIcon: <img src="/openingarrowIcon.svg" />,
    percentage: "2.45%",
    date: "This Month",
  },
  {
    id: 2,
    titleIcon: <img src="/spending.svg" />,
    summaryTitle: "Spending",
    titleDescription: "(No 100)",
    amount: "$560,025",
    arrowIcon: <img src="/spendingarrowIcon.svg" />,
    percentage: "+0.47%",
    date: "This Month",
  },
  {
    id: 3,
    titleIcon: <img src="/received.svg" />,
    summaryTitle: "Received",
    titleDescription: "(No 10)",
    amount: "$560,025",
    arrowIcon: <img src="/arrowLeftIcon.svg" />,
    percentage: "2.45%",
    date: "This Month",
  },
  {
    id: 4,
    titleIcon: <img src="/closing.svg" />,
    summaryTitle: "Closing Balance",
    titleDescription: "(No 10)",
    amount: "$700,000",
    arrowIcon: <img src="/closingarrowIcon.svg" />,
    percentage: "2.45%",
    date: "This Month",
  },
];

const data = [
  {
    id: 1,
    icon: <img src="/spotifie.svg" />,
    title: "Paypal",
    description: "$47,000",
    percentage: 60,
    strokecolor: "#FFBD66",
  },
  {
    id: 2,
    icon: <img src="/spotifie.svg" />,
    title: "Paypal",
    description: "$47,000",
    percentage: 25,
    strokecolor: "#4272DD",
  },
];

const optiondata = [
  {
    key: 1,
    value: "onemonth",
    option: "This Month",
  },
  {
    key: 2,
    value: "twomonth",
    option: "2 Month",
  },
  {
    key: 3,
    value: "threemonth",
    option: "3 Month",
  },
];

const transactionData = [
  {
    id: 1,
    icon: <img src="/spotify.svg" />,
    title: "Spotify",
    date: "Tue, 21 Jan,2024",
    amount: "20.00",
  },
  {
    id: 2,
    icon: <img src="/udemy.svg" />,
    title: "Udemy",
    date: "Tue, 21 Jan,2024",
    amount: "-35.00",
  },
  {
    id: 3,
    icon: <img src="/paypal.svg" />,
    title: "Pay Pal",
    date: "Tue, 21 Jan,2024",
    amount: "47,000.12",
  },
];
const graphData = [
  {
    name: "Dec",
    Revenue: 13000,
    NetIncome: 5000,
  },
  {
    name: "Jan",
    Revenue: 21000,
    NetIncome: 9000,
  },
  {
    name: "Feb",
    Revenue: 20000,
    NetIncome: 15800,
  },
  {
    name: "Mar",
    Revenue: 22000,
    NetIncome: 13000,
  },
  {
    name: "Apr",
    Revenue: 20000,
    NetIncome: 9000,
  },
  {
    name: "May",
    Revenue: 21000,
    NetIncome: 10000,
  },
  {
    name: "Jun",
    Revenue: 30000,
    NetIncome: 18000,
  },
  {
    name: "Jul",
    Revenue: 38000,
    NetIncome: 20000,
  },
  {
    name: "Aug",
    Revenue: 32000,
    NetIncome: 15000,
  },
];
const page = () => {
  return (
    <div className="p-9 bg-slate-100">
      <div className={styles.cont}>
        <div>
          <VerticalInfoDescription
            title={"Overview"}
            titleStyle={{ fontWeight: "700", fontSize: "25px" }}
          />
        </div>

        <div className={styles.container}>
          <div>
            <SavingAccountBalance accountBalances={accountBalances} />
          </div>

          <div>
            <GraphItem
              data={graphData}
              balanceTitle={"Current Balance"}
              amount={"$21,850.50"}
              moneyIntitle={"Money In"}
              moneyoutTitle={"Money Out"}
            />
          </div>
        </div>

        <div className={styles.cards}>
          <div className={styles.transaction}>
            <AccountTransactionSummary
              headerTitle={"Recent Transactions"}
              options={optiondata}
              data={transactionData}
            />
          </div>

          <div className={styles.cashflow}>
            <CashflowCardHome
              headerTitle={"Cash Flow"}
              moneyInIcon={<img src="/moneyin.svg" alt="moneyin" />}
              moneyInTitle={"Money In"}
              moneyInbalance={"$37,890"}
              moneyOutIcon={<img src="/moneyout.svg" alt="moneyout" />}
              moneyOutTitle={"Mooney Out"}
              moneyOutbalance={"$37,890"}
              progressdata={data}
              options={optiondata}
            />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default page;

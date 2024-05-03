"use client";
import AccountTransactionSummary from "@/src/components/widgets/accounts-transactions-summary/accounts.transactions.summary";
import CashflowCardHome from "@/src/components/widgets/cash-flow-card-home/cashflow.card.home";
import SavingAccountBalance from "@/src/components/widgets/saving-account-balances/saving.account.balance";
import styles from "./single.account.module.css";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import GraphItem from "@/src/components/widgets/graph-item/graph.item";
import { ReactNode, SetStateAction, useState } from "react";
import { getAccountSummaryBalances, getCashFlowData, getMoneyInOut, getTransactionAccounts } from "@/src/lib/account.actions";

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
  {
    name: "Sep",
    Revenue: 32000,
    NetIncome: 15000,
  },{
    name: "Nov",
    Revenue: 32000,
    NetIncome: 15000,
  },
];
const accountOptions = [
  {
    key: 1,
    value: "savingAccount",
    option: "Saving Account",
  },
  {
    key: 2,
    value: "currentAccount",
    option: "Current Account",
  },
  {
    key: 3,
    value: "fixedAccount",
    option: "Fixed Account",
  },
  {
    key: 4,
    value: "moneyMarketFund",
    option: "Money Market Fund",
  },
];


export type AccountMoneyInOut={
  moneyIn:string,
  moneyOut:string
}

export type Accountbalances ={
  openingBalance:string,
  openingBalIcon:ReactNode
  closingBalance:string,
  closingBalIcon:ReactNode
  spending:string,
  spendingBalIcon:ReactNode
  received:string
  receivedBalIcon:ReactNode
}

const page = async ({params}:{params:{id:string}}) => {
let accountId = params.id;

  const [selectedAccount, setSelectedAccount] = useState('onemonth');
  const [selectedTransaction, setSelectedTransaction] = useState('onemonth');
  const [selectAccountType, setselectAccountType] = useState('savingAccount');


  let balancedata = await getTransactionAccounts(parseInt(accountId));

  let progress = await getCashFlowData(parseInt(accountId))

  let moneyInOut:AccountMoneyInOut = await getMoneyInOut(parseInt(accountId))

  let balances:Accountbalances = await getAccountSummaryBalances(parseInt(accountId))

  
  const handleAccountChange = (event: any) => {
    setSelectedAccount(event.target.value);
  };
  const handleTransactionChange = (event: any) => {
    setSelectedTransaction(event.target.value);
    console.log(' This Mmodel is selected',selectedAccount); 
  };

  const handleselectAccountTypeChange =(event:any)=>{
    setselectAccountType(event.target.value)
    console.log('The Selected Account is', event.target.value);
  }
  
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
          <div className={styles.balances}>
            {/* <SavingAccountBalance accountBalances={accountBalances} accountSelectionOptions={accountOptions} /> */}
            <div className={styles.balancetype}>
              <div className={styles.icondivs}>
                <span>{<img src="/openingbal.svg"/>}</span>
                <span className={`${styles.balancetext} bodyr`}>Opening Balance</span>
              </div>
              <span className={`h6b`}>{ '$ ' + `${balances.openingBalance}`}</span>
            </div>
            <div className={styles.balancetype}>
              <div className={styles.icondivs}>
                <span>{<img src="/spending.svg"/>}</span>
                <span className={ `${styles.balancetext} bodyr`}>Spending</span>
              </div>
              <span className={`h6b`}>{'$ ' + `${balances.spending}`}</span>
            </div>
            <div className={styles.balancetype}>
              <div className={styles.icondivs}>
                <span>{<img src="/received.svg"/>}</span>
                <span className={`${styles.balancetext} bodyr`}>Received</span>
              </div>
              <span className={`h6b`}>{'$ ' + `${balances.received}`}</span>
            </div>
            <div className={styles.balancetype}>
              <div className={styles.icondivs}>
                <span>{<img src="/closing.svg"/>}</span>
                <span className={`${styles.balancetext} bodyr`}>Closing Balance</span>
              </div>
              <span className={`h6b`}>{'$ ' + `${balances.closingBalance}`}</span>
            </div>
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
              data={balancedata}
              onChange={handleAccountChange}
            />
        </div>

          <div className={styles.cashflow}>
          {selectedAccount === 'onemonth' && (
              <CashflowCardHome
                headerTitle={"Cash Flow"}
                moneyInIcon={<img src="/moneyin.svg" alt="moneyin" />}
                moneyInTitle={"Money In"}
                moneyInbalance={moneyInOut.moneyIn}
                moneyOutIcon={<img src="/moneyout.svg" alt="moneyout" />}
                moneyOutTitle={'Money Out'}
                moneyOutbalance={moneyInOut.moneyOut}
                progressdata={progress}
                options={optiondata}
                onChange={handleAccountChange}
              />
            )}
            {selectedAccount === 'twomonth' && (
              // Render different content based on 'twomonth' selection
              <CashflowCardHome
                headerTitle={"Cash Flow"}
                moneyInIcon={<img src="/moneyin.svg" alt="moneyin" />}
                moneyInTitle={"Money In"}
                moneyInbalance={"$387,890"}
                moneyOutIcon={<img src="/moneyout.svg" alt="moneyout" />}
                moneyOutTitle={"Money Out"}
                moneyOutbalance={"$387,890"}
                progressdata={progress}
                options={optiondata}
                onChange={handleAccountChange}
              />
            )}
            {selectedAccount === 'threemonth' && (
              // Render different content based on 'threemonth' selection
              <CashflowCardHome
                headerTitle={"Cash Flow"}
                moneyInIcon={<img src="/moneyin.svg" alt="moneyin" />}
                moneyInTitle={"Money In"}
                moneyInbalance={"$377,890"}
                moneyOutIcon={<img src="/moneyout.svg" alt="moneyout" />}
                moneyOutTitle={"Money Out"}
                moneyOutbalance={"$377,890"}
                progressdata={progress}
                options={optiondata}
                onChange={handleAccountChange}
              />
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default page;

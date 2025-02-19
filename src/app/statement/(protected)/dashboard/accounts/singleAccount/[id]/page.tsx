"use client";
import AccountTransactionSummary from "@/src/components/widgets/accounts-transactions-summary/accounts.transactions.summary";
import CashflowCardHome from "@/src/components/widgets/cash-flow-card-home/cashflow.card.home";
import styles from "./single.account.module.css";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import GraphItem from "@/src/components/widgets/graph-item/graph.item";
import { ReactNode} from "react";
import { getAccountSummaryBalances, getCashFlowData, getMoneyInOut, getTransactionAccounts } from "@/src/lib/account.actions";
import AccountSummaryBalances from "@/src/components/widgets/account-summary-Balances/account.summary";
import SavingAccountBalance from "@/src/components/widgets/saving-account-balances/saving.account.balance";


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
  let balancedata = await getTransactionAccounts(parseInt(accountId));
  let cashflowdata = await getCashFlowData(parseInt(accountId))
  let moneyInOut:AccountMoneyInOut = await getMoneyInOut(parseInt(accountId))
  let balances = await getAccountSummaryBalances(parseInt(accountId))  
  const handleAccountChange = (event: any) => {
  };

  return (
      <div className={`${styles.cont} bg-slate-100`}>
        <div className={styles.header}>
          <VerticalInfoDescription
            title={"Overview"}
            titleStyle={{ fontWeight: "700", fontSize: "25px" }}
          />
        </div>

        <div className={styles.container}>
          <div className={styles.balances}>
            <AccountSummaryBalances balances={balances}/>
          </div>
        </div>
        
        <div className={styles.cards}>
          <div className={styles.transaction}>
            {balancedata && balancedata.length >0 ? (
            <AccountTransactionSummary
              headerTitle={"Recent Transactions"}
              options={optiondata}
              data={balancedata}
              onChange={handleAccountChange}
            />
          ):(
            <div className="text-center text-bold bg-white p-6">NO RECENT TRANSACTION HISTORY UNDER THIS ACCOUNT</div>
          )}
        </div>

          <div className={styles.cashflow}>
            {cashflowdata && cashflowdata.length > 0 ?(
              <CashflowCardHome
                headerTitle={"Cash Flow"}
                moneyInIcon={<img src="/moneyin.svg" alt="moneyin" />}
                moneyInTitle={"Money In"}
                moneyInbalance={moneyInOut.moneyIn}
                moneyOutIcon={<img src="/moneyout.svg" alt="moneyout" />}
                moneyOutTitle={'Money Out'}
                moneyOutbalance={moneyInOut.moneyOut}
                progressdata={cashflowdata}
                options={optiondata}
                onChange={handleAccountChange}
              />
            ):(
              <div className="text-center text-bold bg-white p-6">NO CASHFLOW HISTORY IN THIS ACCOUNT</div>
            )}
          </div>
          
        </div>
      </div>
  );
};

export default page;

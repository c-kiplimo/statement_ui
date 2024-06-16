"use client";
import AccountTransactionSummary from "@/src/components/widgets/accounts-transactions-summary/accounts.transactions.summary";
import CashflowCardHome from "@/src/components/widgets/cash-flow-card-home/cashflow.card.home";
import SavingAccountBalance from "@/src/components/widgets/saving-account-balances/saving.account.balance";
import styles from "./single.account.module.css";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import GraphItem from "@/src/components/widgets/graph-item/graph.item";
import { ReactNode, SetStateAction, useState } from "react";
import { getAccountSummaryBalances, getCashFlowData, getMoneyInOut, getTransactionAccounts } from "@/src/lib/account.actions";


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

  const [selectedAccount, setSelectedAccount] = useState('onemonth');
  const [selectedTransaction, setSelectedTransaction] = useState('onemonth');
  const [selectAccountType, setselectAccountType] = useState('savingAccount');


  let balancedata = await getTransactionAccounts(parseInt(accountId));
  console.log(balancedata);
  
  let cashflowdata = await getCashFlowData(parseInt(accountId))

  let moneyInOut:AccountMoneyInOut = await getMoneyInOut(parseInt(accountId))

  let balances:Accountbalances = await getAccountSummaryBalances(parseInt(accountId))

  
  const handleAccountChange = (event: any) => {
  };
  const handleTransactionChange = (event: any) => {
    setSelectedTransaction(event.target.value);
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
          {/* <div>
            <GraphItem
              data={graphData}
              balanceTitle={"Current Balance"}
              amount={"$21,850.50"}
              moneyIntitle={"Money In"}
              moneyoutTitle={"Money Out"}
            />
          </div> */}
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
    </div>
  );
};

export default page;

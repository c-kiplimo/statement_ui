"use client";
import AccountsSummaryItem from "@/src/components/widgets/accounts-summary-item/accounts.summary.item";
import AccountsTableInfo from "@/src/components/widgets/accounts-table-info/accounts.table.info";
import styles from "./view.more.module.css";
import ChartOverview from "@/src/components/widgets/chart-overview/chart.overview";
import { AccountOverview, BalancesbyCurrency, ViewMoreAccounts, ViewMoreAccountsBalances } from "@/src/lib/view.more.accounts";


export type AccountOverviewData = {
  totalaccounts:number,
  totalamount:string,
}

const page = async ({params}:{params:{id:number}}) => {
  let custId = params.id;

  let summarydata = await ViewMoreAccounts(custId);
  let balancesData = await ViewMoreAccountsBalances(custId);
  let overviewdata:AccountOverviewData = await AccountOverview(custId)
  let currencyamount = await BalancesbyCurrency(custId)

  let sumdata = summarydata.map(data=>({
      name: data.accountName,
      value: parseInt(data.accountBalance),
  }))


  return (
    <div className={` ${styles.container} bg-slate-100`}>
        <div className={styles.wrapper}>
        <div className={styles.headerContent}>
          <div className={styles.cardoverview}>
            <ChartOverview
              cardTitle={"Overview"}
              piechartData={sumdata}
              totalchartaccounts={`Accounts (${overviewdata.totalaccounts.toString()})`}
              totalChartamount={overviewdata.totalamount}
              currencyBalances={currencyamount}
            />
          </div>
          <div className={styles.summary}>
            <AccountsSummaryItem
              cardTitle={"Summary"}
              placeholder={"Search"}
              buttonname={"Filter"}
              icon={<img src="/funnel.svg" />}
              accountData={summarydata}
            />
          </div>
        </div>
        </div>
        <div className={styles.accountsTable}>
          <AccountsTableInfo
            accountsData={balancesData}
            title={"Accounts"}
            inputPlaceholder={"Search"}
          />
        </div>
      </div>
  );
};

export default page;

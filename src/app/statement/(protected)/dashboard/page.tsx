"use client";
import AccountDetailsCard, { AccountDataHome } from "@/src/components/widgets/accounts-details-card/account.details.card";
import CardtypeDetailsInfo, { CardDataHome } from "@/src/components/widgets/cardtype-details-info/cardtype.details.info";
import TotalAvailableBalanceCard, { BalanceByCurrencyHome } from "@/src/components/widgets/total-available-balance-card/total.available.balance.card";
import TransactionHistoryTable, { TranSactionHistoryHome } from "@/src/components/widgets/transaction-history-card/transaction.history.card";
import styles from "./home.module.css";
import { AccountHandler } from "@/src/services/account/account.service";
import getProfileId from "@/src/hooks/profileId";
import { AccountCardsOverviewActions, BalancesByCurrencyOverviewActions, PersonalAccountOverviewActions, TransactionOverviewActions } from "@/src/lib/account.overview.actions";
import { useEffect, useState } from "react";

const options = [
  {
    key: 1,
    value: "period",
    period: "Period",
  },
  {
    key: 1,
    value: "onemonth",
    period: "1 Month",
  },
  {
    key: 1,
    value: "twomonth",
    period: "2 Month",
  },
];

function page() {
  const profileId = getProfileId(); 
  const accountId = (profileId);
  const [accountdata, setAccountData] =useState<AccountDataHome[]>([])
  const [carddata, setCardData] =useState<CardDataHome[]>([])
  const [transactiondata, settransactionData] =useState<TranSactionHistoryHome[]>([])
  const [currencyBalancedata, setcurrencyBalanceData] =useState<BalanceByCurrencyHome[]>([])

  useEffect(() => {
    const fetchAccountData = async () => {
      const result = await PersonalAccountOverviewActions(accountId);
      setAccountData(result)    
    };
    const fetchCardData = async () => {
      const result = await AccountCardsOverviewActions(accountId);
      setCardData(result)    
    };
    const fetchTransactionHistoryData = async () => {
      const result = await TransactionOverviewActions(accountId);
      settransactionData(result)    
    };
    const fetchCurrencyBalanceData = async () => {
      const result = await BalancesByCurrencyOverviewActions(accountId);
      setcurrencyBalanceData(result)    
    };
    fetchAccountData();
    fetchCardData();
    fetchTransactionHistoryData();
    fetchCurrencyBalanceData();
  }, [accountId]);

  return (
    <div className="p-9 bg-slate-100">
      <div className={styles.container}>
        <div className={styles.header}>
          <TotalAvailableBalanceCard balancesBycurrency={currencyBalancedata} />
        </div>

        <div className={styles.accounts}>
          <div>
            <AccountDetailsCard
              headerTitle={"Accounts"}
              filterIcon={<img src="/funnel.svg" />}
              addIcon={<img src="/plusIcon.svg" />}
              buttonName={"View More"}
              padding={"8px"}
              width={"138px"}
              height={"40px"}
              backgroundColor={"#EFF2E6"}
              color={"#84BD00"}
              borderRadius={"27px"} 
              cardDetailsData={accountdata}            />
          </div>
          <div>
            <CardtypeDetailsInfo
              cardTitle={"Cards"}
              filterIcon={<img src="/funnel.svg" />}
              addIcon={<img src="/plussIcon.svg" alt="add" />}
              cardTypedata={carddata}
            />
          </div>
        </div>

        <div className={styles.table}>
          <TransactionHistoryTable
            data={transactiondata}
            option={options}
            cardTitle={"Transaction History"}
            deleteBtnlabel={"Delete"}
            filterBtnlabel={"Filter"}
            sortBtnlabel={"Sort"}
          />
        </div>
      </div>
    </div>
  );
}

export default page;



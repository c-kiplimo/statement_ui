"use client";
import AccountDetailsCard, { AccountDataHome } from "@/src/components/widgets/accounts-details-card/account.details.card";
import CardtypeDetailsInfo, { CardDataHome } from "@/src/components/widgets/cardtype-details-info/cardtype.details.info";
import TotalAvailableBalanceCard, { BalanceByCurrencyHome } from "@/src/components/widgets/total-available-balance-card/total.available.balance.card";
import TransactionHistoryTable, { TranSactionHistoryHome } from "@/src/components/widgets/transaction-history-card/transaction.history.card";
import styles from "./home.module.css";
import { AccountCardsOverviewActions, BalancesByCurrencyOverviewActions, PersonalAccountOverviewActions, TransactionOverviewActions, getCustomerId } from "@/src/lib/account.overview.actions";
import { useEffect, useState } from "react";
import { ProfileContext } from "./context/customerContext";
import { Spin } from "antd";
import useProfileId from "@/src/hooks/profileId";
import HomePageMobileVersion from "./mobile-version/homepage/homepage";

const options = [
  {
    key: 1,
    value: "period",
    period: "Period",
  },
  {
    key: 2,
    value: "onemonth",
    period: "1 Month",
  },
  {
    key: 3,
    value: "twomonth",
    period: "2 Month",
  },
];

const Page = () => {
  const profId = useProfileId();
  
  const [accountData, setAccountData] = useState<AccountDataHome[]>([]);
  const [cardData, setCardData] = useState<CardDataHome[]>([]);
  const [transactionData, setTransactionData] = useState<TranSactionHistoryHome[]>([]);
  const [currencyBalanceData, setCurrencyBalanceData] = useState<BalanceByCurrencyHome[]>([]);
  const [custId, setCustId] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (profId !== null && profId !== undefined) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
          const [
            accountResult,
            cardResult,
            transactionResult,
            balanceResult,
            customerIdResult,
          ] = await Promise.all([
            PersonalAccountOverviewActions(profId),
            AccountCardsOverviewActions(profId),
            TransactionOverviewActions(profId),
            BalancesByCurrencyOverviewActions(profId),
            getCustomerId(profId),
          ]);

          setAccountData(accountResult);
          setCardData(cardResult);
          setTransactionData(transactionResult);
          setCurrencyBalanceData(balanceResult);
          setCustId(customerIdResult);
        } catch (error) {
          setError("FAILED TO FETCH DATA. PLEASE TRY AGAIN.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [profId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-12 text-2xl font-extrabold">ERROR: {error}</div>;
  }

  return (
    <div className={`${styles.wrapper} bg-slate-100`}>
      <ProfileContext.Provider value={{ custId, setCustId }}>
        <div className={styles.container}>
          <div className={styles.header}>
            {currencyBalanceData && currencyBalanceData.length >0 ?(
              <div><TotalAvailableBalanceCard balancesBycurrency={currencyBalanceData} /></div>
          ):(
            <div>NO BALANCES.</div>
          )}
          </div>

          <div className={styles.accounts}>
            <div className={styles.carddetails}>
              {accountData && accountData.length >0 ? (
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
                cardDetailsData={accountData}
              />
            ):(
              <div>NO AVAILABLE ACCOUNTS FOR THIS PROFILE</div>
            )}
            </div>

            <div className={styles.cardstype}>
              {cardData && cardData.length > 0 ? (
              <CardtypeDetailsInfo
                cardTitle={"Cards"}
                filterIcon={<img src="/funnel.svg" />}
                addIcon={<img src="/plussIcon.svg" alt="add" />}
                cardTypedata={cardData}
              />
              ):(
                <div>YOU DONT HAVE ANY REGISTERED CARD UNDER THIS PROFILE.</div>
              )}
            </div>
          </div>

          <div className={styles.table}>
            <TransactionHistoryTable
              data={transactionData}
              option={options}
              cardTitle={"Transaction History"}
              deleteBtnlabel={"Delete"}
              filterBtnlabel={"Filter"}
              sortBtnlabel={"Sort"}
            />
            
          </div>

          <div className={styles.transactionHistory}>
          {transactionData && transactionData.length > 0 ? (

            <HomePageMobileVersion transactions={transactionData} options={options}/>
          ): (
            <div className="font-bold text-center p-6">NO TRANSACTIONS.</div>
          )}
          </div>
        </div>
      </ProfileContext.Provider>
    </div>
  );
};

export default Page;

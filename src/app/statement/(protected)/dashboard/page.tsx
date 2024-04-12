"use client";
import AccountDetailsCard from "@/src/components/widgets/accounts-details-card/account.details.card";
import CardtypeDetailsInfo from "@/src/components/widgets/cardtype-details-info/cardtype.details.info";
import TotalAvailableBalanceCard from "@/src/components/widgets/total-available-balance-card/total.available.balance.card";
import TransactionHistoryTable from "@/src/components/widgets/transaction-history-card/transaction.history.card";
import styles from "./home.module.css";

const cardTypesData = [
  {
    id: 1,
    icon: <img src="/Visa.svg" alt="Visa" />,
    accountName: "Master Card ****4322",
    accountInfo: "Expires 09/2023",
  },
  {
    id: 2,
    icon: <img src="/Master.svg" alt="Visa" />,
    accountName: "Master Card ****7921",
    accountInfo: "Expires 10/2023",
  },
  {
    id: 3,
    icon: <img src="/Visa.svg" alt="Visa" />,
    accountName: "Master Card ****9344",
    accountInfo: "Expires11/2023",
  },
  {
    id: 4,
    icon: <img src="/Master.svg" alt="Visa" />,
    accountName: "Master Card ****1527",
    accountInfo: "Expires 12/2024",
  },
];

const transactionTabledata = [
  {
    key: "1",
    account: "John Brown",
    dateTime: "July 25, 2024\n\n11:00 PM",
    number: "124 902 223 ",
    description: "Received money",
    currency: "KES",
    status: "Failed",
  },
  {
    key: "2",
    account: "John Brown",
    dateTime: "July 25, 2024\n\n11:00 PM",
    number: "124 902 223 ",
    description: "Received money",
    currency: "KES",
    status: "Failed",
  },
  {
    key: "3",
    account: "John Brown",
    dateTime: "July 25, 2024\n\n11:00 PM",
    number: "124 902 223 ",
    description: "Received money",
    currency: "KES",
    status: "Completed",
  },
  {
    key: "4",
    account: "John Brown",
    dateTime: "July 25, 2024\n\n11:00 PM",
    number: "124 902 223 ",
    description: "Received money",
    currency: "KES",
    status: "Pending",
  },
  {
    key: "5",
    account: "John Brown",
    dateTime: "July 25, 2024\n\n11:00 PM",
    number: "124 902 223 ",
    description: "Received money",
    currency: "KES",
    status: "Completed",
  },
  {
    key: "6",
    account: "John Brown",
    dateTime: "July 25, 2024\n\n11:00 PM",
    number: "124 902 223 ",
    description: "Received money",
    currency: "KES",
    status: "Failed",
  },
];
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
    value: "onemonth",
    period: "2 Month",
  },
];
function page() {
  return (
    <div className="p-9 bg-slate-100">
      <div className={styles.container}>
        <div className={styles.header}>
          <TotalAvailableBalanceCard />
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
            />
          </div>
          <div>
            <CardtypeDetailsInfo
              cardTitle={"Cards"}
              filterIcon={<img src="/funnel.svg" />}
              addIcon={<img src="/plussIcon.svg" alt="add" />}
              cardTypedata={cardTypesData}
            />
          </div>
        </div>

        <div className={styles.table}>
          <TransactionHistoryTable
            data={transactionTabledata}
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

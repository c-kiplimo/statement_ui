"use client";
import RecentTransactionsCard from "@/src/components/widgets/recent-transaction-history/recent.transaction.history";
import styles from "./single.card.module.css";
import PaymentMethod from "@/src/components/widgets/payment-method/payment.method";
import { CaretDownOutlined } from "@ant-design/icons";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";

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

const transaction = [
  {
    id: 1,
    amount: "-49.55",
    title: "Spotify",
    date: "Dec 21, 2021",
    description: "Tue, 21 Jan,2024",
    icon: <img src="/spotify.svg" alt="spotify" />,
  },
  {
    id: 2,
    amount: "-49.55",
    title: "Spotify",
    date: "Tue, 21 Jan,2024 ",
    description: "Dec 21, 2021",
    icon: <img src="/DocumentRemove.svg" alt="spotify" />,
  },
  {
    id: 3,
    amount: "150.88",
    title: "Alex Kog - > Alef bet gimmel",
    date: "Dec 21, 2021",
    description: "Bank Deposit . Fill Account",
    icon: <img src="/import.svg" alt="spotify" />,
  },
  {
    id: 4,
    amount: "-49.55",
    title: "Netflix",
    date: "Dec 21, 2021",
    description: "Tue, 21 Jan,2024  ",
    icon: <img src="/DocumentRemoved.svg" alt="spotify" />,
  },
  {
    id: 5,
    amount: "150.88",
    title: "John Doe - > Mpesa transaction",
    date: "Dec 21, 2021",
    description: "Bank Deposit . Fill Account",
    icon: <img src="/import.svg" alt="spotify" />,
  },
];
const page = () => {
  return (
    <div className="p-9 bg-slate-100">
      <div className={styles.container}>
        <div>
          <VerticalInfoDescription
            title={"Card Overview"}
            titleStyle={{ fontWeight: "700", fontSize: "20px" }}
          />
        </div>
        <div className={styles.card}>
          <PaymentMethod
            cardName={"VISA"}
            cardTtype={"Debit card"}
            cardNumber={"5674 9947 9101 2518"}
            cardLimit={"Overall period"}
            issueDate={"03/04/2019"}
            expiryDate={"03/04/2023"}
            custName={"Joel Simba Muruku"}
            chips={"/image 6.png"}
            chips1={"/Vector.png"}
            cardLogo={<img src="/MasterCard.svg" />}
            title={"Card Details"}
            icon={<img src="/cardIcon.svg" />}
            CaretDownOutlined={<CaretDownOutlined />}
          />
        </div>
        <div className={styles.table}>
          <RecentTransactionsCard
            title={"Recent Transactons"}
            options={optiondata}
            transactions={transaction}
          />
        </div>
      </div>
    </div>
  );
};

export default page;

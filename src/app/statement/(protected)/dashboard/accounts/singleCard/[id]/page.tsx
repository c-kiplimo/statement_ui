"use client";
import RecentTransactionsCard from "@/src/components/widgets/recent-transaction-history/recent.transaction.history";
import styles from "./single.card.module.css";
import PaymentMethod from "@/src/components/widgets/payment-method/payment.method";
import { CaretDownOutlined } from "@ant-design/icons";
import VerticalInfoDescription from "@/src/components/atoms/text/vertical-info-description";
import { CardTransactions, customerCardDetailsAction } from "@/src/lib/card.actions";
import { useEffect } from "react";

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

  const page = async ({params}:{params:{id:string}}) => {
    
    let cardnumber = params.id;
    const cardData = await customerCardDetailsAction(cardnumber)
    

    const transactionHistory = await CardTransactions(cardnumber) 
     

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
          {cardData.map((data)=>(
            <PaymentMethod
            cardName={data.cardType}
            cardTtype={data.cardType}
            cardNumber={data.cardNumber}
            cardLimit={data.cardLimit.toString()}
            issueDate={data.cardIssueDate}
            expiryDate={data.cardExpiryDate}
            custName={data.cardHolderName}
            chips={"/image 6.png"}
            chips1={"/Vector.png"}
            cardLogo={<img src="/MasterCard.svg" />}
            title={"Card Details"}
            icon={<img src="/cardIcon.svg" />}
            CaretDownOutlined={<CaretDownOutlined />}
          />
          ))}
          
        </div>
        <div className={styles.table}>
          <RecentTransactionsCard
            title={"Recent Transactons"}
            options={optiondata}
            transactions={transactionHistory}
          />
        </div>
      </div>
    </div>
  );
};

export default page;

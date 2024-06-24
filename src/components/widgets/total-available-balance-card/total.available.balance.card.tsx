import React, { ReactNode } from "react";
import BalanceInfoCard from "../balance-info-card/balance.info.card";
import styles from "./total.available.balance.card.module.css";



export type BalanceByCurrencyHome = {
    id?: number,
    icon?: ReactNode,
    countryCurrency: string,
    balanceDescription: string,
    availableAmount: string,
    currencyCode: string,
}

type TotalAvailableBalanceCardProps ={
  balancesBycurrency:BalanceByCurrencyHome[]
}
const TotalAvailableBalanceCard = (props:TotalAvailableBalanceCardProps) => {
  return (
    <div className={`${styles.container} `}>
      {props.balancesBycurrency.map((balance) => (
        <div key={balance.id} className="">
          <BalanceInfoCard
            svgImage={<img src={`/${balance.icon}`}/>}
            currencyTitle={balance.countryCurrency}
            balanceDescription={balance.balanceDescription}
            availableBalance={balance.availableAmount}
            currencyCode={balance.currencyCode}
          />
        </div>
      ))}
    </div>
  );
};

export default TotalAvailableBalanceCard;

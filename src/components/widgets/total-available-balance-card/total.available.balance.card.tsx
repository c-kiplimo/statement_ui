import React from "react";
import BalanceInfoCard from "../balance-info-card/balance.info.card";
import styes from "./total.available.balance.card.module.css";

const balanceArray = [
  {
    id: 1,
    icon: <img src="/KenyanFlagIcon.svg" alt="EuropeIcon" />,
    countryCurrency: "Kenyan Shillings ",
    balanceDescription: "Available balance",
    availableAmount: "354,500.00",
    currencyCode: "KES",
  },
  {
    id: 2,
    icon: <img src="/RwandanFlagIcon.svg" alt="EuropeIcon" />,
    countryCurrency: "Rwandan Francs",
    balanceDescription: "Available balance",
    availableAmount: "354,500.00",
    currencyCode: "RWF",
  },
  {
    id: 3,
    icon: <img src="/EuropeFlagIcon.svg" alt="EuropeIcon" />,
    countryCurrency: "European",
    balanceDescription: "Available balance",
    availableAmount: "354,500.00",
    currencyCode: "Euro",
  },
  {
    id: 4,
    icon: <img src="/UsFlagIcon.svg" alt="EuropeIcon" />,
    countryCurrency: "US Dollar ",
    balanceDescription: "Available balance",
    availableAmount: "354,500.00",
    currencyCode: "USD",
  },
];

const TotalAvailableBalanceCard = () => {
  return (
    <div className={'grid grid-cols-2 sm:align-middle md:grid-cols-3 lg:grid-cols-4 gap-4'}>
      {balanceArray.map((balance) => (
        <div key={balance.id} className="">
          <BalanceInfoCard
            svgImage={balance.icon}
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

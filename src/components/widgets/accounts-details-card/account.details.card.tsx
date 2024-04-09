import React, { CSSProperties, ReactNode, useState } from "react";
import AccountsFilterItem from "../accounts-filter-item/accounts.filter.item";
import styles from "./account.details.card.module.css";
import Button from "../../atoms/button/custom.button";
import SelectionCard from "../card-info/card-info-radio";
import Link from "next/link";

const cardArray = [
  {
    id: 1,
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="15" fill="#FFEBD1" />
        <path
          d="M18.2348 19.1471C18.2348 18.9589 18.2055 18.7915 18.147 18.6451C18.0926 18.4987 17.9943 18.3649 17.8521 18.2436C17.7099 18.1223 17.5091 18.0052 17.2497 17.8922C16.9946 17.7751 16.6683 17.6559 16.2709 17.5346C15.8359 17.4007 15.4343 17.2522 15.0662 17.0891C14.7023 16.9218 14.3844 16.7294 14.1125 16.5118C13.8406 16.2901 13.6294 16.0371 13.4788 15.7526C13.3282 15.464 13.2529 15.1315 13.2529 14.755C13.2529 14.3827 13.3303 14.0439 13.4851 13.7385C13.644 13.4332 13.8678 13.1697 14.1564 12.948C14.4493 12.7221 14.7943 12.5485 15.1917 12.4272C15.5891 12.3017 16.0283 12.239 16.5094 12.239C17.187 12.239 17.7705 12.3645 18.2599 12.6154C18.7535 12.8664 19.1321 13.2031 19.3956 13.6256C19.6633 14.0481 19.7971 14.5145 19.7971 15.0248H18.2348C18.2348 14.7236 18.17 14.458 18.0403 14.228C17.9148 13.9937 17.7224 13.8097 17.4631 13.6758C17.2079 13.542 16.8837 13.475 16.4905 13.475C16.1182 13.475 15.8087 13.5315 15.5619 13.6444C15.3151 13.7574 15.1311 13.9101 15.0098 14.1025C14.8885 14.2949 14.8278 14.5124 14.8278 14.755C14.8278 14.9265 14.8675 15.0834 14.947 15.2256C15.0265 15.3636 15.1478 15.4933 15.3109 15.6146C15.4741 15.7317 15.679 15.8426 15.9258 15.9471C16.1726 16.0517 16.4633 16.1521 16.798 16.2483C17.3041 16.3989 17.7454 16.5662 18.1219 16.7503C18.4983 16.9301 18.8121 17.1351 19.063 17.3652C19.314 17.5952 19.5022 17.8567 19.6277 18.1495C19.7532 18.4381 19.816 18.7664 19.816 19.1345C19.816 19.5194 19.7386 19.8666 19.5838 20.1761C19.429 20.4815 19.2073 20.7429 18.9187 20.9604C18.6343 21.1737 18.2913 21.339 17.8897 21.4561C17.4923 21.569 17.049 21.6255 16.5595 21.6255C16.1203 21.6255 15.6874 21.5669 15.2607 21.4498C14.8383 21.3327 14.4534 21.1549 14.1063 20.9165C13.7591 20.6739 13.483 20.3727 13.278 20.013C13.0731 19.649 12.9706 19.2245 12.9706 18.7393H14.5455C14.5455 19.0362 14.5957 19.2893 14.696 19.4985C14.8006 19.7076 14.9449 19.8791 15.129 20.013C15.313 20.1426 15.5264 20.2388 15.769 20.3016C16.0158 20.3643 16.2793 20.3957 16.5595 20.3957C16.9276 20.3957 17.2351 20.3434 17.4819 20.2388C17.7329 20.1343 17.9211 19.9879 18.0466 19.7996C18.1721 19.6114 18.2348 19.3939 18.2348 19.1471Z"
          fill="#FFBD66"
        />
      </svg>
    ),
    accountName: "Saving Account",
    accountInfo: "View your saving account",
  },
  {
    id: 2,
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="15" fill="#D1F6DE" />
        <path
          d="M12.0686 12.3645H13.4741L16.1156 19.4106L18.7509 12.3645H20.1563L16.6677 21.5H15.5509L12.0686 12.3645ZM11.4286 12.3645H12.7651L12.9972 18.4632V21.5H11.4286V12.3645ZM19.4599 12.3645H20.8026V21.5H19.2277V18.4632L19.4599 12.3645Z"
          fill="#17D05B"
        />
      </svg>
    ),
    accountName: "Money Market Account",
    accountInfo: "View your money market account",
  },
  {
    id: 3,
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="15" fill="#FDCCD7" />
        <path
          d="M18.8246 18.5259H20.3932C20.343 19.1241 20.1757 19.6574 19.8913 20.1259C19.6068 20.5902 19.2073 20.9562 18.6928 21.2239C18.1783 21.4916 17.553 21.6255 16.8168 21.6255C16.2521 21.6255 15.7439 21.5251 15.2921 21.3243C14.8404 21.1194 14.4534 20.8307 14.1313 20.4584C13.8093 20.082 13.5625 19.6281 13.391 19.0969C13.2236 18.5657 13.14 17.9717 13.14 17.315V16.5558C13.14 15.899 13.2257 15.3051 13.3972 14.7738C13.5729 14.2426 13.8239 13.7887 14.1502 13.4123C14.4764 13.0316 14.8675 12.7409 15.3235 12.5401C15.7836 12.3394 16.3002 12.239 16.8733 12.239C17.6011 12.239 18.216 12.3728 18.7179 12.6405C19.2199 12.9082 19.6089 13.2784 19.885 13.7511C20.1652 14.2238 20.3367 14.7655 20.3995 15.3762H18.8309C18.7891 14.983 18.697 14.6462 18.5548 14.366C18.4168 14.0857 18.2118 13.8724 17.9399 13.726C17.668 13.5754 17.3125 13.5001 16.8733 13.5001C16.5135 13.5001 16.1998 13.567 15.9321 13.7009C15.6644 13.8348 15.4406 14.0314 15.2607 14.2907C15.0809 14.55 14.9449 14.87 14.8529 15.2507C14.7651 15.6271 14.7211 16.058 14.7211 16.5432V17.315C14.7211 17.7751 14.7609 18.1934 14.8404 18.5698C14.924 18.9421 15.0495 19.2621 15.2168 19.5298C15.3883 19.7975 15.6058 20.0046 15.8694 20.151C16.1329 20.2974 16.4487 20.3706 16.8168 20.3706C17.2644 20.3706 17.6262 20.2995 17.9023 20.1573C18.1825 20.0151 18.3938 19.808 18.536 19.5361C18.6824 19.26 18.7786 18.9233 18.8246 18.5259Z"
          fill="#F30039"
        />
      </svg>
    ),
    accountName: "Current Account",
    accountInfo: "View your current account",
  },
  {
    id: 4,
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="15" fill="#D9E3F8" />
        <path
          d="M15.0035 12.3645V21.5H13.4286V12.3645H15.0035ZM18.7305 16.3613V17.6099H14.6019V16.3613H18.7305ZM19.2513 12.3645V13.6193H14.6019V12.3645H19.2513Z"
          fill="#151E00"
        />
      </svg>
    ),
    accountName: "Fixed Account",
    accountInfo: "View your Fixed account",
  },
];

type AccountDetailsCardProps = {
  headerTitle: string;
  filterIcon: ReactNode;
  addIcon: ReactNode;
  buttonName: string;
  padding: string;
  width: string;
  height: string;
  backgroundColor: string;
  color: string;
  borderRadius: string;
};
const AccountDetailsCard = (props: AccountDetailsCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (newValue: number | null) => {
    setSelectedOption((prevValue) =>
      prevValue === newValue ? null : String(newValue)
    );
  };

  return (
    <div className={`${styles.container} `}>
      <div className={styles.header}>
        <AccountDetailsCard.Title
          headerTitle={props.headerTitle}
          filterIcon={props.filterIcon}
          addIcon={props.addIcon}
        />
      </div>
      <div className={styles.cardBody}>
        {cardArray.map((account) => (
          <Link
            href={"/statement/dashboard/accounts/singleAccount/" + account.id}
            key={account.id}
          >
            <div className="mt-2">
              <SelectionCard
                id={account.id.toString()}
                icon={account.icon}
                label={account.accountName}
                description={account.accountInfo}
                name="card-info"
                borderColor="#84BD00"
                activeCardId={selectedOption}
                onSelection={() => handleOptionChange(account.id)}
              />
            </div>
          </Link>
        ))}
      </div>
      <div className={styles.button}>
        <AccountDetailsCard.ViewButton
          buttonname={props.buttonName}
          padding={props.padding}
          width={props.width}
          height={props.height}
          backgroundColor={props.backgroundColor}
          color={props.color}
          borderRadius={props.borderRadius}
        />
      </div>
    </div>
  );
};

export default AccountDetailsCard;

type titleProps = {
  headerTitle: string;
  headerStyle?: CSSProperties;
  filterIcon: ReactNode;
  filterIconStyle?: CSSProperties;
  addIcon: ReactNode;
  addIconStyle?: CSSProperties;
};
AccountDetailsCard.Title = (props: titleProps) => (
  <AccountsFilterItem
    headerTitle={props.headerTitle}
    filterIcon={props.filterIcon}
    addIcon={props.addIcon}
  />
);

type BtnProps = {
  buttonname: string;
  btnStyle?: CSSProperties;
  padding: string;
  width: string;
  height: string;
  backgroundColor: string;
  color: string;
  borderRadius: string;
};

AccountDetailsCard.ViewButton = (props: BtnProps) => (
  <div>
    <Link href={"/statement/dashboard/accounts/viewmore"}>
      <Button
        buttonName={props.buttonname}
        buttonStyle={{
          padding: props.padding,
          width: props.width,
          height: props.height,
          backgroundColor: props.backgroundColor,
          color: props.color,
          borderRadius: props.borderRadius,
        }}
      />
    </Link>
  </div>
);

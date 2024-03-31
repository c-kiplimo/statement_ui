import React, { CSSProperties, ReactNode, useState } from 'react'
import AccountsFilterItem from '../accounts-filter-item/accounts.filter.item'
import styles from './account.details.card.module.css'
import Button from '../../atoms/button/custom.button';
import { UpSquareOutlined } from '@ant-design/icons';
import SelectionCard from '../card-info/card-info-radio';
import Link from 'next/link';

const cardArray = [
  {
    id: 1,
    icon: <UpSquareOutlined />,
    accountName: "Saving Account",
    accountInfo: "View your saving account",
  },
  {
    id: 2,
    icon: <UpSquareOutlined />,
    accountName: "Money Market Account",
    accountInfo: "View your money market account",
  },
  {
    id: 3,
    icon: <UpSquareOutlined />,
    accountName: "Current Account",
    accountInfo: "View your current account",
  },
  {
    id: 4,
    icon: <UpSquareOutlined />,
    accountName: "Fixed Account",
    accountInfo: "View your Fixed account",
  },
];
type AccountDetailsCardProps = {
  headerTitle:string;
  filterIcon:ReactNode;
  addIcon:ReactNode;
  buttonName: string;
  padding: string;
  width: string;
  height: string;
  backgroundColor: string;
  color: string;
  borderRadius: string;
}
const AccountDetailsCard = (props:AccountDetailsCardProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (newValue: number | null) => {
    setSelectedOption((prevValue) => (prevValue === newValue ? null : String(newValue)));
    console.log("Selected value", selectedOption);
    console.log("value", newValue);
  };
  
  return (
    <div className={`${styles.container} `}>
      <div className={styles.header}>
        <AccountDetailsCard.Title headerTitle={props.headerTitle} filterIcon={props.filterIcon} addIcon={props.addIcon}/>
      </div>
      <div className={styles.cardBody}>
        {cardArray.map((account) => (
          <Link href={''} key={account.id}>
            <div  className="mt-3">
              <SelectionCard
                id={account.id.toString()}
                icon={account.icon}
                label={account.accountName}
                description={account.accountInfo}
                name="card-info"
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
  )
}

export default AccountDetailsCard

type titleProps ={
  headerTitle:string;
  headerStyle?:CSSProperties;
  filterIcon:ReactNode;
  filterIconStyle?:CSSProperties;
  addIcon:ReactNode;
  addIconStyle?:CSSProperties;

}
AccountDetailsCard.Title = (props:titleProps)=>(
  <AccountsFilterItem headerTitle={props.headerTitle} filterIcon={props.filterIcon} addIcon={props.addIcon}/>
)

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
  </div>
);
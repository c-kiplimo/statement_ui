import React, { CSSProperties, ReactNode } from 'react'
import VerticalInfoDescription from '../../atoms/text/vertical-info-description';
import styles from './accounts.filter.item.module.css'

type accountFilterItemProps ={
  headerTitle: string;
  filterIcon: ReactNode;
  addIcon: ReactNode;
  onClick?:  (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const AccountsFilterItem = (props:accountFilterItemProps) => {
  return (
    <div className={`${styles.container}`}>
        <div>
          <AccountsFilterItem.Title title={props.headerTitle} />
        </div>
        <div className={styles.titleIcons}>
          <AccountsFilterItem.Icon icon={props.filterIcon} onClick={props.onClick}/>
          <AccountsFilterItem.Icon icon={props.addIcon} onClick={props.onClick}/>
        </div>
    </div>
  )
}

export default AccountsFilterItem
type accountTitleProps ={
    title:string;
    titleStyle?:CSSProperties;
}

AccountsFilterItem.Title = (props: accountTitleProps) => (
    <VerticalInfoDescription
      title={props.title}
      titleStyle={{ fontWeight: "700", fontSize: "20px" }}
    />
  );
  
  type iconProps ={
    icon:ReactNode;
    iconStyle?:CSSProperties
    onClick?:(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  }
  AccountsFilterItem.Icon = (props: iconProps) => (
    <div onClick={props.onClick}>{props.icon}</div>
  );

import React, { CSSProperties, ReactNode } from 'react'
import styles from './accounts.balance.overview.module.css'
import ImageIcon from '../../atoms/imageIcon/imageIcon'
import VerticalInfoDescription from '../../atoms/text/vertical-info-description';


type acctsBalanceProps={
    icon:ReactNode,
    accountName:string,
    accountBalance:string,
    imageBackgroundcolor:string,
    imageColor:string,
    onClick?:(e:any)=>void
}

function AccountsBalanceOverview(props:acctsBalanceProps) {
  return (
    <div className={styles.container} onClick={props.onClick} style={{borderColor:props.imageColor}}>
      <div className={styles.icon} style={{background: props.imageBackgroundcolor}}>
        <AccountsBalanceOverview.Icon icon={props.icon}/>
      </div>
      <div>
        <AccountsBalanceOverview.Account title={props.accountName} description={props.accountBalance}
         textStyle={{color:'#6F7269', fontWeight:'400', fontSize:'12px'}} 

         descriptionStyle={{fontWeight:'500', color:'#151E00' }}/>
      </div>
    </div>
  )
}

export default AccountsBalanceOverview;

type iconProps ={
    icon:ReactNode,
    style?:CSSProperties
}
type accountInfoProp={
    title:string,
    description:string,
    textStyle?:CSSProperties,
    descriptionStyle?:CSSProperties
}

AccountsBalanceOverview.Icon = (props:iconProps) => <ImageIcon icon={props.icon} />
AccountsBalanceOverview.Account = (props:accountInfoProp)=> <VerticalInfoDescription title={props.title} description={props.description} titleStyle={props.textStyle} descriptionStyle={props.descriptionStyle}/>


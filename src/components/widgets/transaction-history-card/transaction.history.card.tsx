import React, { CSSProperties, ReactNode } from 'react'
import VerticalInfoDescription from '../../atoms/text/vertical-info-description'
import { DeleteOutlined, FilterOutlined, SortAscendingOutlined } from '@ant-design/icons'
import styles from './transaction.history.module.css'
import TransactionTable from '../../atoms/table/home/transaction.table'
import CustomButton from '../../atoms/button/custom.button'

interface DataType {
  key: React.Key;
  account: string;
  dateTime: string;
  number: string;
  description: string;
  currency: string;
  status: string;
  icon?: ReactNode;
}

type transactionHistoryprops={
  cardTitle:string;
  deleteBtnlabel:string;
  filterBtnlabel:string;
  sortBtnlabel:string;
  data:DataType[];
}

const TransactionHistoryTable = (props:transactionHistoryprops) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerIcons}>
            <TransactionHistoryTable.Title title={props.cardTitle} titlestyle={{fontWeight:'700',color:'#151E00', fontSize:'20px', lineHeight:'32px'}}/>
        </div>
        <div className={styles.headerIcons}>
          <TransactionHistoryTable.Selection/>
          <TransactionHistoryTable.Icon label={props.deleteBtnlabel} icon={<DeleteOutlined />}/>
          <TransactionHistoryTable.Icon label={props.filterBtnlabel} icon={<FilterOutlined />}/>
          <TransactionHistoryTable.Icon label={props.sortBtnlabel} icon={<SortAscendingOutlined />}/>
        </div>
      </div>
      <div className={styles.table}>
        <TransactionTable data={props.data}/>
      </div>
    </div>
  )
}

export default TransactionHistoryTable

type titleProps = {
    title:string;
    titlestyle?:CSSProperties;
}
TransactionHistoryTable.Title=(props:titleProps)=>(
    <VerticalInfoDescription title={props.title} titleStyle={props.titlestyle}/>
)

type iconProps ={
  label:string;
  icon?:ReactNode;
  labelStyle?:CSSProperties;
  iconStyle?:CSSProperties;
}
TransactionHistoryTable.Icon = (props:iconProps)=>(
  <CustomButton buttonName={props.label} icon={props.icon} buttonStyle={{backgroundColor:'transparent', border:'1px solid #E6E6E6',display:'flex',paddingLeft:'16px', margin:'5px', width:'98px', height:'32px', borderRadius:'4px', alignItems:'center', gap:'8px'}}/>
)
type selectionProps={

}
TransactionHistoryTable.Selection =(props:selectionProps)=>(
  <select name="period" id="period" className={styles.selection}>
    <option value="period" defaultChecked>Period</option>
    <option value="month" >1 Month</option>
  </select>
)


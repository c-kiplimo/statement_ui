import React, { CSSProperties, ReactNode } from 'react'
import styles from './user.contactdetails.module.css'
import VerticalInfoDescription from '@/src/components/atoms/text/vertical-info-description'
import { EditOutlined } from '@ant-design/icons'


type ContactsDetailsCardProps = {
  name:string;
  emailaddress:string;
  idNumber:string;
  dateOfBirth:string;
  country:string;
  street:string;
  cityName:string;
  postalCode:string;
}

const ContactsDetailsCard = (props:ContactsDetailsCardProps) => {
  return (
    <div className={styles.container}>
      <ContactsDetailsCard.Card cardTitle='Basic Information' 
      title='Legal Name' descriptionValue={props.name} 
      title1='Email Address'  descriptionValue1={props.emailaddress} 
      title2='Id Number' descriptionValue2={props.idNumber}
      title3='Date Of Birth' descriptionValue3={props.dateOfBirth}
      />

      <ContactsDetailsCard.Card cardTitle='Physical Information' 
      title='Country' descriptionValue={props.country} 
      title1='Street'  descriptionValue1={props.street}
      title2='City Name' descriptionValue2={props.cityName} 
      title3='Postal Code' descriptionValue3={props.postalCode}
      />
    </div>
  )
}

export default ContactsDetailsCard;

type EditProps ={
  buttonName:string;
  buttonIcon:ReactNode;
  textstyles?:CSSProperties;
  buttonIconstyles?:CSSProperties;
  onClick?:()=>void
}
ContactsDetailsCard.Edit =(props:EditProps)=>(
  <button className={`${styles.editBtn} bodyr`} onClick={props.onClick}> <span style={props.textstyles}>{props.buttonName}</span> <span style={props.buttonIconstyles}>{props.buttonIcon}</span> </button>
)

type BodyTextProps ={
  title:string;
  description:string;
}
ContactsDetailsCard.BodyText =(props:BodyTextProps)=>(
  <VerticalInfoDescription title={props.title} description={props.description} titleStyle={{fontWeight:'400', fontSize:'12px', color:'#737373'}} descriptionStyle={{fontWeight:'400', fontSize:'16px', color:'#737373'}}/>
)

type Cardprops ={
  cardTitle:string;
  onClick?:()=>void
  title:string;
  descriptionValue:string;
  title1:string;
  descriptionValue1:string;
  title2:string;
  descriptionValue2:string;
  title3:string;
  descriptionValue3:string;
}
ContactsDetailsCard.Card =(props:Cardprops)=>(
  <div className={styles.basicInformation}>
        <div className={styles.basicinfoHeader}>
          <VerticalInfoDescription title={props.cardTitle} titleStyle={{fontSize:'20px', fontWeight:'500', color:'#34373C'}}/>
          <ContactsDetailsCard.Edit buttonName='Edit' buttonIcon={<EditOutlined/>} onClick={props.onClick}/>
        </div>
        <div className={styles.basicinfoBody}>
          <div className={styles.basicinfoBodyContent}>
            <div className={styles.content}>
            <ContactsDetailsCard.BodyText title={props.title} description={props.descriptionValue}/>
            </div>
            <div className={styles.content}>
            <ContactsDetailsCard.BodyText title={props.title1} description={props.descriptionValue1}/>
            </div>
          </div>
          <div className={styles.basicinfoBodyContent}>
          <div className={styles.content}>
          <ContactsDetailsCard.BodyText title={props.title2} description={props.descriptionValue2}/>
          </div>
          <div className={styles.content}>
          <ContactsDetailsCard.BodyText title={props.title3} description={props.descriptionValue3}/>
          </div>
          </div>
        </div>
      </div>
)
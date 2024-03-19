import React, { CSSProperties, ReactNode } from 'react'
import VerticalInfoDescription from '../../atoms/text/vertical-info-description'
import Image from 'next/image'
import styles from './active.payment.requests.module.css'
import { Progress } from 'antd'

type ActivePaymentsRequestsProp={
    title:String,
    description:String,
    image:string,
    imageHeight:number,
    imageWidth:number,
    participants:String,
    progressPercent:number, 
    paidAmount:String,
    goalAmount:String,
}

function ActivePaymentsRequests(props:ActivePaymentsRequestsProp) {
  return (
    <div className={styles.container}>
        <ActivePaymentsRequests.Title title={props.title} />
        <ActivePaymentsRequests.Description description={props.description}/>
        <div className={styles.participants}>    
            <ul className={styles.images}>
                <li >
                    <ActivePaymentsRequests.Image image={props.image} imageHeight={props.imageHeight} imageWidth={props.imageWidth}/>
                </li>
                <li >
                    <ActivePaymentsRequests.Image image={props.image} imageHeight={props.imageHeight} imageWidth={props.imageWidth}/>
                </li>
                <li >
                    <ActivePaymentsRequests.Image image={props.image} imageHeight={props.imageHeight} imageWidth={props.imageWidth} />
                </li>
            </ul>
            <div>
                <ActivePaymentsRequests.Participants participants={props.participants}/>
            </div>
         
        </div>
        <Progress percent={props.progressPercent} strokeColor={'#16BB3F'} showInfo={false} size="small"/>
        <ActivePaymentsRequests.Payments paidAmount={props.paidAmount} goalAmount={props.goalAmount}/>
    </div>
  )
}

export default ActivePaymentsRequests


type titleProps = {
    title:String;
    titleStyle?:CSSProperties;
}
ActivePaymentsRequests.Title = (props:titleProps)=> (
    <div className={`${styles.title}` }>
        <VerticalInfoDescription title={props.title} titleStyle={{color:'#4F4D55', fontSize:'20px', fontWeight:'700'}}/>
    </div>
)
type descriptionProps={
    description:String;
}
ActivePaymentsRequests.Description = (props:descriptionProps)=>(
    <div>
        <VerticalInfoDescription title={props.description} titleStyle={{color:'#151E00'}}/>
    </div> )

type imageProp={
    image:string;
    imageWidth:number;
    imageHeight:number;
    imageStyle?:CSSProperties

}
ActivePaymentsRequests.Image = (props:imageProp)=> (
    <div style={{}}>
        <Image src={props.image} width={props.imageWidth} alt={props.image} height={props.imageHeight} style={props.imageStyle}/>

    </div>
)
type participantsProp={
    participants:String;
}
ActivePaymentsRequests.Participants = (props:participantsProp)=>(
    <div>
        <VerticalInfoDescription title={props.participants} titleStyle={{color:'#6F7269'}}/>
    </div>
)
type paymentProp={
    paidAmount:String;
    goalAmount:String
}
ActivePaymentsRequests.Payments = (props:paymentProp)=>(
    <div className={styles.payment}>
        <VerticalInfoDescription title={props.paidAmount} titleStyle={{fontSize:'12px', lineHeight:'16px', color:'#7F7D83'}}/>
        <VerticalInfoDescription title={props.goalAmount} titleStyle={{fontSize:'12px', lineHeight:'16px', color:'#7F7D83'}}/>
    </div>
)



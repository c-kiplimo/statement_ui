import React, { ReactNode, useState } from 'react';
import styles from './balance.info.card.module.css';
import VerticalInfoDescription from '../../atoms/text/vertical-info-description';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import ImageIcon from '../../atoms/imageIcon/imageIcon';

type clikCard={
  svgImage:ReactNode;
  currencyTitle:String;
  balanceDescription:String;
  availableBalance: String;
  currencyCode:String;
  onClick?:(event:any)=>{}
}

function BalanceInfoCard(props:clikCard) {
  const [isVisible, setIsVisible] = useState(false);
  
  function handleClick() {
    setIsVisible(!isVisible);
  }
  return (
    <div className={styles.container} onClick={props.onClick}>
        <div className={styles.icondiv}>
            <div className={styles.icon}> <ImageIcon icon={props.svgImage} /></div>
            <div className={styles.description}><VerticalInfoDescription  title={props.currencyTitle} description={props.balanceDescription}/> </div>
        </div>

        <div className={styles.eyeContent}>
          <div>
            {isVisible ?  <VerticalInfoDescription title={props.availableBalance} description={props.currencyCode} titleStyle={{fontWeight:'bold'}}/> : <div className={styles.displayContent}> <VerticalInfoDescription title={'*********'} description={'***'} titleStyle={{fontWeight:'bold'}} /></div>}
          </div>
          {isVisible ?(
          <div className={styles.eyeicon}>
            <EyeInvisibleOutlined onClick={handleClick} style={{}}/>
          </div>
          ):(
          <div className={styles.eyeicon}>
            <EyeOutlined  onClick={handleClick}/>
          </div>
          )}
        </div>
      
    </div>
  )
}


export default BalanceInfoCard

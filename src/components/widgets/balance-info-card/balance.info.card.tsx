import React, { useState } from 'react';
import styles from './balance.info.card.module.css';
import { svgIcon } from '../../atoms/imageIcon/imageIcon';
import VerticalInfoDescription from '../../atoms/text/vertical-info-description';
import { EyeOutlined } from '@ant-design/icons';
import ImageIcon from '../../atoms/imageIcon/imageIcon';

const currencies=
  {
    currencyTitle:'Kenya Shillings',
    availableBalance:'2344',
    currencyCode:'KES'
  }

type clikCard={
  onClick:(event:any)=>{}
}

function BalanceInfoCard(props:clikCard) {
  const [isVisible, setIsVisible] = useState(false);
  
  function handleClick() {
    setIsVisible(!isVisible);
  }
  return (
    <div className={styles.container} onClick={props.onClick}>
        <div className={styles.icondiv}>
            <div className={styles.icon}> <ImageIcon icon={svgIcon} /></div>
            <div className={styles.description}><VerticalInfoDescription  title={currencies.currencyTitle} description='Available balance'/> </div>
        </div>

        <div className={styles.eyeContent}>
          <div className={isVisible ? styles.displayContent : styles.hideContent}>
            <VerticalInfoDescription title={currencies.availableBalance} description={currencies.currencyCode} titleStyle={{fontWeight:'bold'}}/>
          </div>
          <div className={styles.eyeicon}>
            <EyeOutlined onClick={handleClick} style={{}}/>
          </div>
        </div>
      
    </div>
  )
}


export default BalanceInfoCard

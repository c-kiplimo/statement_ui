import React, { useState } from 'react'
import styles from './balance.info.card.module.css'
import CountryIcon, { svgIcon } from '../../atoms/countryIcon/countryIcon'
import VerticalInfoDescription from '../../atoms/text/vertical-info-description';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';


function BalanceInfoCard() {
  const [isVisible, setIsVisible] = useState(true);

  function handleClick() {
    setIsVisible(!isVisible);
    
  }
  
  return (
    <div className={styles.container}>
        <div className={styles.icondiv}>
            <div className={styles.icon}> <CountryIcon icon={svgIcon} /></div>
            <div className={styles.description}><VerticalInfoDescription  title='Kenyan Shillings' description='Available balance' titleStyle={{color:'#151E00', fontSize:'16px', fontWeight:'400' }} descriptionStyle={{color:'#6F7269', fontSize:'12px', fontWeight:'400'}}/> </div>
        </div>

        <div className={styles.eyeContent}>
          <div className={isVisible ? styles.displayContent : styles.hideContent}>
            <VerticalInfoDescription title='354,500.00' description='KES'/>
          </div>
          <div className={styles.eyeicon}>
            {/* {isVisible && (<EyeInvisibleOutlined onClick={handleClick}/>)} */}
            {!isVisible && (<EyeOutlined onClick={handleClick}/>)}
          </div>
        </div>
      
    </div>
  )
}


export default BalanceInfoCard

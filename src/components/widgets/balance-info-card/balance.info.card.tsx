import React from 'react'
import styles from './balance.info.card.module.css'
import CountryIcon, { svgIcon } from '../../atoms/countryIcon/countryIcon'

const icon=('tcon');

function BalanceInfoCard() {
  return (
    <div>
      <CountryIcon icon={svgIcon}/>
    </div>
  )
}

export default BalanceInfoCard

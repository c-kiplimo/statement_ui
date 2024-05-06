'use client'
import React from 'react'
import SelfAccountStatement from './accountStatements/self.account.statement'
import AccountOverviewStatus from './accountStatements/account-overview-status/account.overview.status'

function page() {
  return (
    <div>
      {/* <SelfAccountStatement/> */}
      <AccountOverviewStatus/>
    </div>
  )
}

export default page

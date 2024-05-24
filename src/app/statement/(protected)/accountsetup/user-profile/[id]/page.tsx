"use client"
import React from 'react'
import Userprofile from '../user.profile'
import { AccountProfileProvider } from '../../context/account.contex'

const Page = ({params}:{params:{id:number}}) => {
  return (
<AccountProfileProvider>
<Userprofile userId={params.id}/>
      </AccountProfileProvider>
  )
}

export default Page

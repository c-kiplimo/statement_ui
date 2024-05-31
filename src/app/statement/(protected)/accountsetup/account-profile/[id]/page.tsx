"use client"
import React from 'react'
import UserAccountprofile from '../account.profile'

const Page = ({params}:{params:{id:number}}) => {
  return (<UserAccountprofile accountId={params.id}/> )
}
export default Page



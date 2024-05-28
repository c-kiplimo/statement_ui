import React from 'react'
import UserAccountprofile from '../account.profile'
import { AccountProfileProvider } from '../../context/account.contex'


const Page = ({params}:{params:{id:number}}) => {
  return (
    <div>
    
     <UserAccountprofile accountId={params.id}/>
     
    </div>
  )
}

export default Page

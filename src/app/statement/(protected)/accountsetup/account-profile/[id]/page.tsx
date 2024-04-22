import React from 'react'
import UserAccountprofile from '../account.profile'


const Page = ({params}:{params:{id:number}}) => {
  return (
    <div>
     <UserAccountprofile accountId={params.id}/>
    </div>
  )
}

export default Page

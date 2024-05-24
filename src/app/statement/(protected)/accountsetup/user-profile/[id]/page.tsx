import React from 'react'
import Userprofile from '../user.profile'

const Page = ({params}:{params:{id:number}}) => {
  return (
    <div>
     <Userprofile userId={params.id}/>
    </div>
  )
}

export default Page

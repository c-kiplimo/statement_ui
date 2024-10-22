import HavingTrouble from '@/src/components/widgets/having-trouble/having-trouble'
import TwosidedLayout from '@/src/components/widgets/layout/two-sided-layout'
import React from 'react'
import ConfirmUser from './recover-password-components/recover-password'

const page = ({params}: any) => {
  const {userId} = params;
 
  return (
    <div>
      <TwosidedLayout>
    <HavingTrouble />
    <ConfirmUser userId={userId}/>
    </TwosidedLayout>
    </div>
  )
}

export default page

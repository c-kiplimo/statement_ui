"use client"

import TwosidedLayout from '@/src/components/widgets/layout/two-sided-layout'
import React from 'react'
import HavingTrouble from '@/src/components/widgets/having-trouble/having-trouble'
import SignUpWidget from './widgets/sign-up-widget'

const SignUpPage = () => {
  return (
    <TwosidedLayout>
          <HavingTrouble />
        <SignUpWidget/>
    </TwosidedLayout>
  )
}

export default SignUpPage
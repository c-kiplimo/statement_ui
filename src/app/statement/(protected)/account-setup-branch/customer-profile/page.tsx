"use client"

import React, { Suspense } from 'react'
import CustomerProfile from './widgets/customer-profile'

const page = () => {
  return (
    <Suspense>
    <CustomerProfile/>
    </Suspense>
  )
}

export default page
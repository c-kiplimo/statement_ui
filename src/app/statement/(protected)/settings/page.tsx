"use client"
import React, { useState } from 'react'
import ProfileForm from './profile-form/profile.form'
import SettingsNavigations from './vertical-navigations/vertical-navigations'
import { UserInformationContext } from './context/user.info.context'


const Settings = () => {
  const [userInfodetails, setUserInfodetails] = useState()
  return (
    <div className="p-9 bg-slate-100 h-screen">
      <UserInformationContext.Provider value={{userInfodetails, setUserInfodetails}}>
        <SettingsNavigations/>
      </UserInformationContext.Provider>
    </div>
  )
}

export default Settings

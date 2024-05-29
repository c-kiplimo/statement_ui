"use client"
import React from 'react'
import ProfileForm from './profile-form/profile.form'
import SettingsNavigations from './vertical-navigations/vertical-navigations'

const Settings = () => {
  return (
    <div className="p-9 bg-slate-100 h-screen">
      <SettingsNavigations/>
    </div>
  )
}

export default Settings

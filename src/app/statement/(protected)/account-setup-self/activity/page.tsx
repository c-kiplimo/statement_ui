"use client"
import React, { useState } from 'react'
import ActivitiesTable from './(activity-table)/activity.table'
import styles from './activity.module.css'
import SearchButton from '@/src/components/widgets/search-button/search-button'
import FilterButton from '@/src/components/widgets/filter-button/filter.button'
import { SearchOutlined } from '@ant-design/icons'
import SortButton from '@/src/components/widgets/sort-button/sort.button'

const activityData = [
    {
        key: '1',
        date: "2024-08-12T10:55:23.111Z",
        activityName: 'Logged In',
        activityDescription: "User logged into the system",
        status: "Success"
    },
    {
        key: '2',
        date: "2024-08-12T12:55:23.111Z",
        activityName: 'Account Details',
        activityDescription: "User viewed Account Information",
        status: "Success"
    },
    {
        key: '3',
        date: "2024-08-12T10:55:23.111Z",
        activityName: 'Failed Login Attempt',
        activityDescription: "User attempted to Login Unsuccessfully",
        status: "Failed"
    },
]

const ActivitiesPage = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = (value:string) => {
    setSearchQuery(value)
  }

  const filteredActivityData = activityData.filter(activity =>
    activity.activityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.activityDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.status.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleClick = () => {}

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={`h6b`}>Activity Log</span>
        <span className={styles.headericons}>
          <SearchButton>
            <SearchButton.Icon>
              <SearchOutlined size={16} />
            </SearchButton.Icon>
            <SearchButton.Input text="Search" onSearch={handleSearchChange} />
          </SearchButton>
          <FilterButton onClick={handleClick} />
          <SortButton onClick={handleClick} />
        </span>
      </div>
      <ActivitiesTable restrictions={filteredActivityData} />
    </div>
  )
}

export default ActivitiesPage
